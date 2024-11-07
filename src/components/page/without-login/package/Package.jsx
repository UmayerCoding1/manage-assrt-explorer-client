import React from 'react';
import { Link } from 'react-router-dom';
import { Parallax, Background } from 'react-parallax';
const Package = () => {
    return (
        
          <Parallax
        blur={{ min: -15, max: 50 }}
        bgImage={'http://localhost:5173/src/assets/image/about.webp'}
        bgImageAlt="the dog"
        strength={-300}
    >
        <div className='w-full rounded-lg  p-10   lg:p-0  lg:h-[70vh] flex flex-col lg:flex-row items-center justify-center'>
<div className=' text-center my-5 p-5 rounded-xl shadow shadow-black lg:mx-4 lg:w-52 lg:h-56 bg-white'>
                <h2 className='text-3xl font-bold'>5 Member</h2>
                <h2 className='text-3xl font-bold  my-7 text-red-500'>$5 <span className='text-gray-500 text-xs'>USD</span></h2>
                <Link to={'/join-hr'}><button className='btn btn-sm btn-outline'>Select Package</button></Link>
            </div>
            <div className=' text-center my-5 p-5 rounded-xl shadow shadow-black lg:mx-4 lg:w-52 lg:h-56 bg-white'>
                <h2 className='text-3xl font-bold'>10 Member</h2>
                <h2 className='text-3xl font-bold  my-7 text-red-500'>$8 <span className='text-gray-500 text-xs'>USD</span></h2>
                <Link to={'/join-hr'}><button className='btn btn-sm btn-outline'>Select Package</button></Link>
            </div>
            <div className=' text-center my-5 p-5 rounded-xl shadow shadow-black lg:mx-4 lg:w-52 lg:h-56 bg-white'>
                <h2 className='text-3xl font-bold'>20 Member</h2>
                <h2 className='text-3xl font-bold  my-7 text-red-500'>$15 <span className='text-gray-500 text-xs'>USD</span></h2>
                <Link to={'/join-hr'}><button className='btn btn-sm btn-outline'>Select Package</button></Link>
            </div>
        </div>
    </Parallax>
            
        
    );
};

export default Package;
