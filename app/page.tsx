import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import Link from 'next/link';

export default function Home() {
    const postDir = "posts";

    const getAllFiles = (dirPath:string, arrayOfFiles:string[] = []) => {
        const files = fs.readdirSync(dirPath);

        files.forEach(file => {
            if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
            } else {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        });

        return arrayOfFiles;
    }

    // 모든 파일 가져오기
    const allFiles = getAllFiles(postDir);


    // 포스트 데이터를 추출
    const posts = allFiles.map(filePath => {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const {data: frontMatter} = matter(fileContent);

        return {
            meta: frontMatter,
            slug: filePath.replace(postDir + '/', '').replace('.mdx', '')
        }
    });

    return (
        <main className="p-3 mx-auto sm:w-10/12 md:w-10/12 lg:w-10/12 xl:w-4/12">
            <div>
                {posts.map(post => (
                    <Link href={post.slug} passHref key={post.slug}>
                        <div className='group border rounded border-slate-300 mb-1 p-2  transition-all hover:border-slate-400'>
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
    )
}
