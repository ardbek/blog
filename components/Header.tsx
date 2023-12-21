import React from 'react'
import Link from "next/link";

const Header: React.FC = () => {
    return (
        <div>

            <div className="py-4 text-center">
                <Link href={"/"}>
                    Header
                </Link>
            </div>
        </div>
    );
};

export default Header;
