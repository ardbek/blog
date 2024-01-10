import fs from 'fs';
import path from 'path'
import matter from 'gray-matter'

import Link from 'next/link'

export default function Home() {
    const postDir = "posts";
    let posts: any[] = [];

    const items = fs.readdirSync(path.join(postDir));

    items.forEach(item => {
        const itemPath = path.join(postDir, item);
        const isDirectory = fs.statSync(itemPath).isDirectory();

        if (isDirectory) {

            const files = fs.readdirSync(itemPath).filter(file => fs.statSync(path.join(itemPath, file)).isFile());
            files.forEach(filename => {
                const filePath = path.join(itemPath, filename);
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                const {data: frontMatter} = matter(fileContent);

                posts.push({
                    category: item,
                    meta: frontMatter,
                    slug: filename.replace('.mdx', '')
                });
            });
        } else {
            const fileContent = fs.readFileSync(itemPath, 'utf-8');
            const {data: frontMatter} = matter(fileContent);

            posts.push({
                meta: frontMatter,
                slug: item.replace('.mdx', '')
            });
        }
    });

    posts.sort((a, b) => {
        return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
    });

    return (
        <main className="p-3 mx-auto sm:w-10/12 md:w-10/12 lg:max-w-[768px]">
            <div>
                {
                    posts.map(post => (
                        <Link href={post.category ? `/posts/${post.category}/${post.slug}` : `/posts/${post.slug}`} passHref
                              key={post.slug}>
                            <div
                                className='group border rounded border-slate-300 mb-1 p-2 transition-all hover:border-slate-400'>
                                <div className="flex justify-between">
                                    <span className="transition-all group-hover:underline">{post.meta.title}</span>
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
    );
}
