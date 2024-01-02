'use client';

import React, { useEffect, useState } from 'react';

export default function TableOfContents() {
    const [headingEls, setHeadingEls] = useState<Element[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const article = document.querySelector('article');
        if (article) {
            const headingElements = Array.from(article.querySelectorAll('h2, h3'));
            setHeadingEls(headingElements);

            // 처음에는 첫 번째 목차로 id 업데이트
            if (headingElements.length > 0) {
                setActiveId(headingElements[0].id);
            }

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveId(entry.target.id);
                        }
                    });
                },
                {
                    rootMargin: '0px 0px -90% 0px', // 목차가 화면의 일부만 보여도 활성화될 수 있도록 설정
                }
            );

            headingElements.map((element) => {
                if (element) {
                    observer.observe(element);
                }
            });
        }
    }, []);

    return (
        <ul className="mt-[100px] ml-10">
            {headingEls.map((headingEl: Element, index: number) => (
                <li
                    className={`list-none text-gray-400 ${
                        headingEl.id === activeId ? 'text-black' : ''
                    }`}
                    key={index}
                    style={{ marginLeft: `${getHeadingLevel(headingEl.tagName) - 2}em` }}
                >
                    <a
                        href={`#${headingEl.id}`}
                        className={` ${
                            headingEl.id === activeId ? 'text-black' : ''
                        }`}
                    >
                        {headingEl.id}
                    </a>
                </li>
            ))}
        </ul>
    );
}

function getHeadingLevel(tagName: string): number {
    return parseInt(tagName.slice(1), 10);
}
