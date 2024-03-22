import React from 'react'
import {FaSquareGithub} from "react-icons/fa6";

const Footer: React.FC = () => {
    return (
        <div className="py-4 text-center flex justify-center footer">
            <a href={"https://github.com/"} target={"_blank"}>
                <FaSquareGithub style={{fontSize: '24px'}}/>
            </a>
        </div>
    );
};

export default Footer;