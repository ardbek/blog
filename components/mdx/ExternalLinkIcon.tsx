import React from 'react';

const ExternalLinkIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        className="w-4 h-4 inline-block align-text-bottom"
    >
        <path
            fill="currentColor"
            d="m13 3l3.293 3.293l-7 7l1.414 1.414l7-7L21 11V3z"
        ></path>
        <path
            fill="currentColor"
            d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"
        ></path>
    </svg>
);

export default ExternalLinkIcon;
