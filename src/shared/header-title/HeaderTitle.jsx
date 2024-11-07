import React from 'react';
import headerImage from './../../assets/image/header-title.jpeg';
const HeaderTitle = ({title}) => {
    return (
        <div>
            <div className='w-full lg:h-[50vh] relative'>
               <img className='w-full h-full object-cover' src={headerImage} alt="" />
               <div className='w-full h-full bg-[#00000077] absolute top-0'>
                    <h2 className='text-5xl text-white absolute top-1/3  left-1/3 uppercase font-Rozha'>
                        {title}
                    </h2>
               </div>
            </div>
        </div>
    );
};

export default HeaderTitle;