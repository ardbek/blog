"use client";

import {useState} from "react";
import ClipBoard from "./ClipBoard";

type Text = {
    text: string;
};

export const CopyButton = ({text}: Text) => {
    const [isCopied, setIsCopied] = useState(false);

    const copy = async () => {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    return (
        <button
            className='dark:text-black flex ml-auto gap-2'
            disabled={isCopied}
            onClick={copy}
        >
            <ClipBoard/>
            {isCopied ? "Copied!" : "Copy"}
        </button>
    );
};
