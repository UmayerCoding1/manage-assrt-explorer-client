import React, { useState } from 'react';
import sittLogo from './../../assets/image/logo.png'
import { Link, NavLink } from 'react-router-dom';
import PrimaryButton from '../Button/PrimaryButton';
import { BiMenu } from "react-icons/bi";
import { FaXmark } from "react-icons/fa6";
import Logout from '../Button/Logout';
import { MdSpaceDashboard } from "react-icons/md";
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import useEmRole from '../../hooks/useEmRole';
const Navbar = () => {
     const [showNav,setShowNav] = useState(false);
     const [userLogNav, setUserLogNav] = useState(false);
     const {user} = useAuth();
     const [isRole] = useRole();
     const {role,logo}= isRole;
     const [isEmRole] = useEmRole();
     const {emImage,companyLogo,role: emRole} = isEmRole;
    const navItem = <>
      <li onClick={() => setShowNav(!showNav)} className='font-bold mt-5  lg:mt-0 lg:mr-5 '><NavLink to={'/'}>Home</NavLink></li>
      <li onClick={() => setShowNav(!showNav)} className='font-bold mt-5  lg:mt-0 lg:mr-5 '><NavLink to={'/join-employee'}>Join as Employee</NavLink></li>
      <li onClick={() => setShowNav(!showNav)} className='font-bold mt-5  lg:mt-0 lg:mr-5 '><NavLink to={'/join-hr'}>Join as HR Manager</NavLink></li>
    </>

    const hrNavItem = <>
      <li onClick={() => setShowNav(!showNav)} className='font-bold mt-5  lg:mt-0 lg:mr-5 '><NavLink to={'/'}>Home</NavLink></li>
      <li onClick={() => setShowNav(!showNav)} className='font-bold mt-5  lg:mt-0 lg:mr-5 '><NavLink to={'dashboard/asset-list'}>Asset List</NavLink></li>
      <li onClick={() => setShowNav(!showNav)} className='font-bold mt-5  lg:mt-0 lg:mr-5 '><NavLink to={'dashboard/add-an-asset'}>Add an Asset</NavLink></li>
      <li onClick={() => setShowNav(!showNav)} className='font-bold mt-5  lg:mt-0 lg:mr-5 '><NavLink to={'dashboard/add-employee'}>Add an Employee</NavLink></li>
      <li onClick={() => setShowNav(!showNav)} className='font-bold mt-5  lg:mt-0 lg:mr-5 '><NavLink to={'dashboard/all-requests'}>All Requests</NavLink></li>
      <li onClick={() => setShowNav(!showNav)} className='font-bold mt-5  lg:mt-0 lg:mr-5 '><NavLink to={'dashboard/employee-list'}>My Employee List</NavLink></li>
    </>

    const emNavItem = <>
      <li onClick={() => setShowNav(!showNav)} className='font-bold mt-5  lg:mt-0 lg:mr-5 '><NavLink to={'/'}>Home</NavLink></li>
      <li onClick={() => setShowNav(!showNav)} className='font-bold mt-5  lg:mt-0 lg:mr-5 '><NavLink to={'/my-asset'}>My Asset</NavLink></li>
      <li onClick={() => setShowNav(!showNav)} className='font-bold mt-5  lg:mt-0 lg:mr-5 '><NavLink to={'/my-team'}>My Team</NavLink></li>
      <li onClick={() => setShowNav(!showNav)} className='font-bold mt-5  lg:mt-0 lg:mr-5 '><NavLink to={'/request-an-asset'}>Request for an asset</NavLink></li>
    </>

    // const 
    return (
        <header className='my-4'>
            <nav className='flex items-center justify-between'>
               {role === 'hr' && <img className={logo ? 'w-14 rounded-full': 'w-24'} src={isRole?.logo  ? logo  : sittLogo} alt="" />}
               {emRole === 'employee' && <img className={emRole ? 'w-14 rounded-full': 'w-24'} src={emRole?.emImage ? emImage : sittLogo} alt="" />}
                {!user && <img className={logo ? 'w-14 rounded-full': 'w-24'} src={isRole?.logo  ? logo  : sittLogo} alt="" />}
                <div className='hidden lg:block'>
                   {!user && <ul className='flex'>
                    {navItem}
                   </ul>}

                   {user && role === 'hr'? <ul className='flex'>
                    {hrNavItem}
                   </ul>: ''}

                   {user && isEmRole.role === 'employee'? <ul className='flex'>
                    {emNavItem}
                   </ul>: ''}


                </div>

            

               <div className='flex items-center'>

                {user ?  <div className='w-32 h-14 rounded-3xl border-2 bg-gray-50 flex items-center justify-between px-2 relative'>
                <button onClick={() => setUserLogNav(!userLogNav)} className='text-3xl'><BiMenu/></button>
                  <div className='ml-10'><Link to={'/profile'}> <img className=' w-10 h-10  rounded-full cursor-pointer' src={ logo ? logo :emImage || "https://img.pikbest.com/wp/202345/male-avatar-image-in-the-circle_9588978.jpg!sw800" } alt="" /></Link></div>

                   {
                    userLogNav ? <div className='w-40 h-24 absolute top-14 right-10 z-10 bg-white rounded-lg shadow-xl '>
                    <ul className='py-2 px-5 flex items-center justify-center flex-col'>
                        {user && role === 'hr' ? <li className='font-bold flex items-center '><NavLink to={'/dashboard/hr-home'} className={'flex items-center '}><MdSpaceDashboard className='mr-2'/> Dashboard</NavLink></li> : ''}
                        {user && role === 'admin' ? <li className='font-bold flex items-center '><NavLink to={'/dashboard'} className={'flex items-center '}><MdSpaceDashboard className='mr-2'/> Dashboard</NavLink></li> : ''}
                        <Logout/>
                    </ul>
               </div> : ''
                   }
               </div>  
              : 
                <div className='flex'>
               <Link to={'/login'}> <PrimaryButton text={'Login'} icon={true}/></Link>
               
               </div> 
            }
                

              
               <button onClick={() => setShowNav(!showNav)} className='text-3xl ml-2 lg:hidden'><BiMenu/></button>
               </div>
            </nav>
           {
            showNav ?  <div className='w-screen h-screen lg:hidden absolute z-10 top-0 bg-white '>
            <div className='flex items-center m-3'>
            <button onClick={() => setShowNav(!showNav)} className='text-3xl mr-3'><FaXmark/></button>
            <img className={logo ? 'w-20 rounded-full ' : 'w-28'} src={logo} alt="" />
            </div>
                 {!user && <ul className=' flex flex-col items-center '>
                     {navItem}
                 </ul>}
                 {user && role === 'hr' && <ul className=' flex flex-col items-center '>
                     {hrNavItem}
                 </ul>}
             </div>
             : ''
           }
        </header>
    );
};

export default Navbar;