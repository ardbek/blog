import React from 'react';
import ExternalLinkIcon from './ExternalLinkIcon';
import {CopyButton} from "@/components/mdx/CopyButton";

interface MDXComponentProps {
    children: React.ReactNode;
}

function reactNodeToString(node: React.ReactNode): string {
    if (typeof node === 'string' || typeof node === 'number') {
        return node.toString();
    } else if (React.isValidElement(node) && node.props) {
        return reactNodeToString(node.props.children);
    } else if (Array.isArray(node)) {
        return node.map(reactNodeToString).join('');
    }
    return '';
}

const MDXComponent: React.FC<MDXComponentProps> = ({children}) => {
    const renderLink = (props: any) => {
        const {href} = props;
        const isExternal = href.startsWith('http') || href.startsWith('//');

        if (isExternal) {
            return (
                <a className="underline hover:bg-gray-300 rounded-md px-[0.1em]" href={href} target="_blank"
                   rel="noopener noreferrer">
                    {props.children} <ExternalLinkIcon/>
                </a>
            );
        }

        return <a {...props}>{props.children}</a>;
    };

    const renderPre = (props: any) => {
        const codeText = reactNodeToString(props.children);

        return (
            <div style={{position: 'relative'}}>
                <CopyButton text={codeText}/>
                <pre {...props} style={{overflowX: 'auto', position: 'relative', maxWidth: '100%'}}>
                {props.children}
            </pre>
            </div>
        );
    };

    return (
        <>
            {React.Children.map(children, (child) =>
                React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<any>, {
                    components: {
                        a: renderLink,
                        pre: renderPre
                    }
                }) : child
            )}
        </>
    );
};

export default MDXComponent;
