import React from 'react';
import { IoLogOut } from "react-icons/io5";
import useAuth from './../../hooks/useAuth';
const Logout = () => {
    const {logOut} = useAuth();
    return (
        <>
        <li onClick={logOut}  className='font-bold mt-5 cursor-pointer text-red-500 flex items-center'><IoLogOut className='mr-2'/> Logout</li>
        </>
    );
};

export default Logout;