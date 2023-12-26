'use client';

import { useEffect, useState } from 'react';

export default function TableOfContents() {
    const [headingEls, setHeadingEls] = useState<Element[]>([]);

    useEffect(() => {
        const article = document.querySelector('article');
        if (article) {
            const headingElements = Array.from(article.querySelectorAll('h2, h3'));
            setHeadingEls(headingElements);
        }
    }, []);

    const getHeadingLevel = (tagName: string): number => {
        // 헤딩의 레벨을 가져오는 함수
        return parseInt(tagName.slice(1), 10);
    };

    return (
        <ul>
            {headingEls.map((headingEl: Element, index: number) => (
                <li className="list-none text-gray-400" key={index} style={ { marginLeft: `${getHeadingLevel(headingEl.tagName) - 2}em` }}>
                    <a href={`#${headingEl.id}`}>{headingEl.id}</a>
                </li>
            ))}
        </ul>
    );
}
