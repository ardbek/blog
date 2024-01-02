'use client';

import { useEffect, useState } from 'react';
import { getIntersectionObserver } from "@/util/Toc";

export default function TableOfContents() {
    const [headingEls, setHeadingEls] = useState<Element[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const article = document.querySelector('article');
        if (article) {
            const headingElements = Array.from(article.querySelectorAll('h2, h3'));

            if (headingElements.length > 0) {
                setHeadingEls(headingElements);
                setActiveId(headingElements[0].id);
                const observer = getIntersectionObserver(setActiveId);
                headingElements.map((element) => {
                    observer.observe(element);
                });
            }
        }
    }, []);

    const getHeadingLevel = (tagName: string): number => {
        return parseInt(tagName.slice(1), 10);
    };

    return (
        <ul className="mt-[100px] ml-10">
            {headingEls.map((headingEl: Element, index: number) => (
                <li className={`list-none text-gray-400 ${headingEl?.id === activeId ? 'text-black' : ''}`} key={index}
                    style={{ marginLeft: `${getHeadingLevel(headingEl.tagName) - 2}em` }}>
                    <a href={`#${headingEl?.id}`} className={` ${headingEl?.id === activeId ? 'text-black' : ''}`}>
                        {headingEl?.id}
                    </a>
                </li>
            ))}
        </ul>
    );
}
