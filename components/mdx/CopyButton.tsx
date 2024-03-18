"use client";

import React, {useState} from "react";
import {FaCheck} from "react-icons/fa6";
import {FaRegCopy} from "react-icons/fa";

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
            style={{
                position: 'absolute',
                right: '30px'
            }}
        >
            {isCopied ? <FaCheck /> : <FaRegCopy />}
        </button>
    );
};
