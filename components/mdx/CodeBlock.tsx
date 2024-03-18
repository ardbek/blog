import React, {ReactNode, ReactElement} from 'react';

interface CodeBlockProps {
    children: ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({children}) => {
    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code);
    };

    const isReactElement = (node: ReactNode): node is ReactElement => {
        return (node as ReactElement).props !== undefined;
    };

    const codeContent = isReactElement(children) ? children.props.children : '';

    return (
        <div>
            {children}
            <button onClick={() => copyToClipboard(codeContent.toString())}>Copy</button>
        </div>
    );
};

export default CodeBlock;

