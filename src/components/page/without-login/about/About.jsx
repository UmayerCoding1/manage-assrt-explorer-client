import React from 'react';
import aboutImg from './../../../../assets/image/about.webp';
import { mainLogo } from '../../../../provider/ImageProvider';
const About = () => {
    return (
        <div className='my-10 lg:my-28 lg:flex items-center'>
            <div className=' lg:h-[49vh] rounded-lg mb-5 mx-1 relative lg:w-1/2 '>
               <img className='rounded-lg' src={aboutImg} alt="" />

               <div className='w-36 h-36 flex items-center justify-center rounded-full bg-white shadow-xl absolute top-[60%]  right-0 lg:top-[70%] ' > 
                   <img className='w-1/2' src={mainLogo} alt="" />
               </div>
            </div>


            <div className=' rounded-lg mb-5 ml-2 lg:w-1/2 lg:h-[55vh] '>
              <div>
              <h2 className='text-2xl font-bold mb-3'>Purpose of the system</h2>
              <p className='text-xs text-gray-500'>The purpose of the Manage Assrt Explorer (MAE) is to provide companies with an efficient, digital platform to manage and track company assets, both returnable and non-returnable. This system helps HR managers streamline asset allocation and usage, enabling them to monitor which employees are using specific assets, track inventory levels in real-time, and automate the request and approval process for asset distribution. By simplifying asset lifecycle management, enhancing accountability, and reducing administrative overhead, the system ensures companies can optimize resource utilization, minimize asset loss, and make data-driven decisions for future asset purchases and maintenance.</p>
              </div>

              <div className='mt-5'>
                <h2 className='text-2xl font-bold mb-3'>Benefits of the platform</h2>
                <p className="text-xs text-gray-500">The Manage Assrt Explorer (MAE) simplifies the management of company assets, including returnable and non-returnable items. By automating the request and approval processes, it allows employees to quickly submit asset requests while providing HR managers with clear visibility into asset usage and allocation.
                The platform enhances accountability by assigning specific assets to employees, reducing loss risk. Real-time insights into asset availability enable informed decision-making. Its user-friendly and responsive design ensures accessibility from any device, making it easy to manage assets on the go. Ultimately, the system optimizes resource utilization and improves overall operational efficiency for businesses of all sizes.</p>
              </div>
            </div>
        </div>
    );
};

export default About;