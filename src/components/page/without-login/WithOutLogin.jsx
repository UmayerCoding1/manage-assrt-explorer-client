import React from 'react';
import Banner from './banner/Banner';
import About from './about/About';
import Package from './package/package';

const WithOutLogin = () => {
    return (
        <div>
            <Banner/>
            <About/>
            <Package/>
        </div>
    );
};

export default WithOutLogin;