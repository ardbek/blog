import React from 'react'
import Link from "next/link";

const Header: React.FC = () => {
    return (
        <div>
            <Link href={"/"}>
                <div className="py-4 text-center">Header</div>
            </Link>
        </div>
    );
};

export default Header;
