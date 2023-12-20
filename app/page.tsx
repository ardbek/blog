import fs from 'fs';
import path from 'path'
import matter from 'gray-matter'

import Link from 'next/link'

export default function Home() {
    const postDir = "posts"

    const files = fs.readdirSync(path.join(postDir))

    const posts = files.map(filename => {
        const fileContent = fs.readFileSync(path.join(postDir, filename), 'utf-8')

        const {data: frontMatter} = matter(fileContent)

        return {
            meta: frontMatter,
            slug: filename.replace('.mdx', '')
        }

    })

    return (
        <main className="p-3 mx-auto sm:w-10/12 md:w-10/12 lg:w-10/12 xl:w-4/12">
            <div>
                {posts.map(post => (
                    <Link href={'/posts/' + post.slug} passHref key={post.slug}>
                        <div className='border rounded border-slate-400 mb-1 p-2'>
                            <div className="flex justify-between">
                                <span className="">{post.meta.title}</span>
                                <span className="text-slate-400 text-xs">{post.meta.date}</span>
                            </div>
                            <div className="">
                                <p className="text-xs text-slate-500">{post.meta.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    )
}
