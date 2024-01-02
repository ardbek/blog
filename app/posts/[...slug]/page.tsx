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

const getAllFiles = (dirPath: string, arrayOfFiles: string[] = [], basePath: string = dirPath): string[] => {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
            arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles, basePath);
        } else {
            arrayOfFiles.push(path.join(path.relative(basePath, dirPath), file));
        }
    });

    return arrayOfFiles;
};

export async function generateStaticParams() {
    const allFiles = getAllFiles('posts');
    return allFiles.map((filePath) => {
        const slug = filePath
            .replace('.mdx', '')
            .split(path.sep);
        return { params: { slug } };
    });
}


function getPost(slugArray: string[]) {
    if (!Array.isArray(slugArray)) {
        console.error(`Invalid slugArray: `, slugArray);
        return null;
    }

    const markdownFilePath = path.join('posts', ...slugArray) + '.mdx';
    try {
        const markdownFile = fs.readFileSync(markdownFilePath, 'utf-8');
        const { data: frontMatter, content } = matter(markdownFile);
        return {
            frontMatter,
            slug: slugArray.join('/'),
            content,
        };
    } catch (error) {
        console.error(`Error reading markdown file at ${markdownFilePath}: `, error);
        return null;
    }
}

export default function Post({ params }: { params: { slug: string[] } }) {
    const props = getPost(params.slug);

    if (!props) {
        return <div>죄송합니다, 요청하신 페이지를 찾을 수 없습니다.</div>;
    }
    return (
        <article className="flex flex-col-reverse sm:flex-row justify-between p-3 mx-auto sm:w-full md:w-full lg:w-10/12 xl:w-4/12">
            <div id="1" className="flex-1">
                <div>
                    <div className="date mb-5">{props.frontMatter.date}</div>
                    <h1 className="title mb-3">{props.frontMatter.title}</h1>
                    <div className="description mb-10">{props.frontMatter.description}</div>
                    <MDXRemote source={props.content} components={{ wrapper: MDXComponent }} options={options} />
                </div>
            </div>
            <div id="2" className="sticky top-0 flex-1 max-h-screen overflow-y-auto">
                <div className="hidden lg:block">
                    <TableOfContents />
                </div>
            </div>
        </article>


    );
}


export async function generateMetadata({ params }: any) {
    const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug];
    const post = getPost(slugArray);

    if (!post) {
        return { title: 'Error', description: 'Post not found' };
    }

    return {
        title: post.frontMatter.title,
        description: post.frontMatter.description,
    };
}