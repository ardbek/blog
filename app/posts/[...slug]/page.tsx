import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {MDXRemote} from 'next-mdx-remote/rsc'

import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus'
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { PluggableList } from 'unified';

import "@/styles/codeBlock/prism-lucario.css"
import "@/styles/table/table.css"
import "@/styles/post.css"

import MDXComponent from "@/components/mdx/MDXComponent";
import TableOfContents from "@/components/mdx/Toc";

const options = {
    mdxOptions: {
        remarkPlugins: [remarkGfm] as PluggableList,
        rehypePlugins: [
            rehypeSlug,
            [rehypePrism as any, { showLineNumbers: true }],
            rehypeAutolinkHeadings
        ] as PluggableList,
    },
};

export async function generateStaticParams() {
    const postDir = path.join('posts');
    const items = fs.readdirSync(postDir);
    let paths: any[] = [];

    items.forEach(item => {
        const itemPath = path.join(postDir, item);
        const isDirectory = fs.statSync(itemPath).isDirectory();

        if (isDirectory) {
            const files = fs.readdirSync(itemPath);
            files.forEach(filename => {
                paths.push({
                    params: {
                        slug: [item, filename.replace('.mdx', '')],
                    },
                });
            });
        } else {
            paths.push({
                params: {
                    slug: [item.replace('.mdx', '')],
                },
            });
        }
    });

    return paths;
}

function getPost({ slug }: { slug: string[] }) {
    const filePath = path.join(process.cwd(), 'posts', ...slug) + '.mdx';
    const markdownFile = fs.readFileSync(filePath, 'utf-8');
    const { data: frontMatter, content } = matter(markdownFile);

    return {
        frontMatter,
        slug: slug.join('/'),
        content,
    };
}


interface PostProps {
    source: string;
}

export default function Post({ params }: any, source: string) {
    const props = getPost(params);

    return (
        <article className="flex flex-col-reverse sm:flex-row justify-between p-3 mx-auto sm:w-full md:w-full lg:lg:max-w-[768px]">
            <div id="1" className="flex-1">
                <div className="sm:w-full md:w-full lg:lg:max-w-[768px]">
                    <div className="date mb-5">{props.frontMatter.date}</div>
                    <h1 className="title mb-3">{props.frontMatter.title}</h1>
                    <div className="description mb-10">{props.frontMatter.description}</div>
                    <MDXRemote source={props.content} components={{ wrapper: MDXComponent }} options={options} />
                </div>
            </div>
            {/*<div id="2" className="sticky top-0 flex-1 max-h-screen overflow-y-auto">
                <div className="hidden lg:block">
                    <TableOfContents />
                </div>
            </div>*/}
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