import { Dispatch, SetStateAction } from 'react';

const option = {
    threshold: 0.4,
    rootMargin: '-80px 0px -80% 0px',
};

export function getIntersectionObserver(
    setState: Dispatch<SetStateAction<string>>
): IntersectionObserver {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setState(entry.target.id);
            }
        });
    }, option);

    return observer;
}
