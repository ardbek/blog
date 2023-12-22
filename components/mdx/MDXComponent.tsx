import React from 'react';
import ExternalLinkIcon from './ExternalLinkIcon';

interface MDXComponentProps {
    children: React.ReactNode;
}

const MDXComponent: React.FC<MDXComponentProps> = ({ children }) => {
    const renderLink = (props: any) => {
        const { href } = props;
        const isExternal = href.startsWith('http') || href.startsWith('//');

        if (isExternal) {
            return (
                <a className="underline hover:bg-gray-300 rounded-md px-1" href={href} target="_blank" rel="noopener noreferrer">
                    {props.children} <ExternalLinkIcon />
                </a>
            );
        }

        return <a {...props}>{props.children}</a>;
    };

    return (
        <>
            {React.Children.map(children, (child) =>
                React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<any>, { components: { a: renderLink } }) : child
            )}
        </>
    );
};

export default MDXComponent;
