import React from 'react';
import ExternalLinkIcon from './ExternalLinkIcon';
import CodeBlock from "@/components/mdx/CodeBlock";


interface MDXComponentProps {
    children: React.ReactNode;
}

const MDXComponent: React.FC<MDXComponentProps> = ({ children }) => {
    const renderLink = (props: any) => {
        const { href } = props;
        const isExternal = href.startsWith('http') || href.startsWith('//');

        if (isExternal) {
            return (
                <a className="underline hover:bg-gray-300 rounded-md px-[0.1em]" href={href} target="_blank" rel="noopener noreferrer">
                    {props.children} <ExternalLinkIcon />
                </a>
            );
        }

        return <a {...props}>{props.children}</a>;
    };

    const renderCopyButton = (props: any) => {

        if (true) {
            return (
                <CodeBlock>{children}</CodeBlock>
            );
        }

    };

    return (
        <>
            {React.Children.map(children, (child) =>
                React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<any>, { components: { a: renderLink ,pre:renderCopyButton } }) : child
            )}
        </>
    );
};

export default MDXComponent;
