import React from 'react'
import Link from "next/link";

const Header: React.FC = () => {
    return (
        <div>
            <Link href={"/"}>
                <h1>Header</h1>
            </Link>
        </div>
    );
};

export default Header;
