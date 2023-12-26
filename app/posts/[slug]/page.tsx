import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {MDXRemote} from 'next-mdx-remote/rsc'

import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus'
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import "@/styles/codeBlock/prism-lucario.css"
import "@/styles/table/table.css"
import "@/styles/post.css"

import MDXComponent from "@/components/mdx/MDXComponent";
import TableOfContents from "@/components/mdx/Toc";

const options = {
    mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypePrism,rehypeAutolinkHeadings],
    },
};

export async function generateStaticParams() {
    const files = fs.readdirSync(path.join('posts'));

    return files.map((filename) => ({
        slug: filename.replace('.mdx', ''),
    }));
}

function getPost({ slug }: { slug: string }) {
    const markdownFile = fs.readFileSync(path.join('posts', slug + '.mdx'), 'utf-8');
    const { data: frontMatter, content } = matter(markdownFile);

    return {
        frontMatter,
        slug,
        content,
    };
}

interface PostProps {
    source: string;
}

export default function Post({ params }: any, source: string) {
    const props = getPost(params);

    return (
        <article className="p-3 mx-auto sm:w-10/12 md:w-10/12 lg:w-10/12 xl:w-4/12">
            <div className="date mb-5">{props.frontMatter.date}</div>
            <h1 className="title mb-3">{props.frontMatter.title}</h1>
            <div className="description mb-10">{props.frontMatter.description}</div>

            <MDXRemote source={props.content} components={{ wrapper: MDXComponent }} options={options} />
            <TableOfContents/>
        </article>
    );
}

export async function generateMetadata({ params }: any) {
    const blog = getPost(params);

    return {
        title: blog.frontMatter.title,
        description: blog.frontMatter.description,
    };
}