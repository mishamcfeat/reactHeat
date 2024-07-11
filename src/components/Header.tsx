import { Link } from 'react-router-dom';
import SearchInput from './SearchInput';
import { BsLayoutSidebarInset, BsLayoutSidebarInsetReverse } from "react-icons/bs";
import { useState } from 'react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className="flex flex-row items-center justify-between bg-gray-200 px-4 border-b h-14">
            {isOpen ?
                <BsLayoutSidebarInsetReverse className=" text-4xl m-3 ml-5 p-1 hover:bg-gray-100 hover:cursor-pointer" onClick={() => setIsOpen(false)} /> :
                <BsLayoutSidebarInset className="text-4xl m-3 ml-5 p-1 hover:bg-gray-100 hover:cursor-pointer" onClick={() => setIsOpen(true)} />}
            <SearchInput />
            <Link className="border-2 border-gray-300 rounded items-center p-1 space-x-2 text-sm hover:bg-gray-300" to="/loginpage"> Login</Link>
        </div>
    );
}
