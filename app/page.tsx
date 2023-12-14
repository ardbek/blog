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
        <main>
            <section className=''>
                <div className="">
                    {posts.map(post => (
                        <Link href={'/posts/' + post.slug} passHref key={post.slug}>
                            <div className='border border-blue-900'>
                                <div>
                                    <h3 className="">{post.meta.title}</h3>
                                    <p className="">{post.meta.description}</p>
                                </div>
                                <div className="">
                                    <p>{post.meta.date}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    )
}
