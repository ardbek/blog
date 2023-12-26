import { Dispatch, SetStateAction } from 'react';

const option = {
    rootMargin: '-76px 0px 0px 0px',
    threshold: 0.4,
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
