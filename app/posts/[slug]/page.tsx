import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {MDXRemote} from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypePrism from 'rehype-prism-plus'

import "@/styles/codeBlock/prism-lucario.css"
import "@/styles/table/table.css"


import Button from '@/components/mdx/Button'

const options = {
    mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypePrism],
    }
}

export async function generateStaticParams(){
    const files = fs.readdirSync(path.join('posts'))

    return files.map(filename => ({
        slug: filename.replace('.mdx', '')
    }))
}

function getPost({slug}:{slug : string}){
    const markdownFile = fs.readFileSync(path.join('posts',slug + '.mdx'), 'utf-8')

    const {data: frontMatter, content } = matter(markdownFile)

    return {
        frontMatter,
        slug,
        content
    }

}

export default function Post({ params } :any) {
    const props = getPost(params);

    return (
        <article className='prose prose-sm md:prose-base lg:prose-lg prose-slate !prose-invert mx-auto'>
            <h1>{props.frontMatter.title}</h1>

            <MDXRemote source={props.content} components={{Button}} options={options}/>
        </article>
    )

}

export async function generateMetadata({ params } : any){
    const blog = getPost(params);

    return{
        title: blog.frontMatter.title,
        description: blog.frontMatter.description,
    }
}
