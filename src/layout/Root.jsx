import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';

const Root = () => {
    return (
        <div className='max-w-6xl mx-auto'>
           <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Root;