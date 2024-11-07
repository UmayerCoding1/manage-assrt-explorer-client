import { Link, NavLink, Outlet } from "react-router-dom";
import useRole from "../../hooks/useRole";



const Dashboard = () => {
   const [isRole] = useRole();
   const {role,logo,companyName}= isRole;
    
    
    

    
    return (
        <div className="flex">
            <div className="w-[250px] h-screen bg-gray-100">
                {/* <img className="w-24 rounded-full" src={logo} alt="" /> */}
                <div className="h-16"></div>
            {
                role === 'hr'? <ul>
        <li className='font-bold mt-5 bg-gray-200 p-2 rounded-2xl text-xs lg:mr-5 lg:ml-3 lg:mt-5 '><NavLink to={'hr-home'}>HR Home</NavLink></li>
        <li className='font-bold mt-5 bg-gray-200 p-2 rounded-2xl text-xs lg:mr-5 lg:ml-3 lg:mt-5 '><NavLink to={'add-an-asset'}>Add an Asset</NavLink></li>
        <li className='font-bold mt-5 bg-gray-200 p-2 rounded-2xl text-xs lg:mr-5 lg:ml-3 lg:mt-5 '><NavLink to={'add-employee'}>Add an Employee</NavLink></li>
        <li className='font-bold mt-5 bg-gray-200 p-2 rounded-2xl text-xs lg:mr-5 lg:ml-3 lg:mt-5 '><NavLink to={'asset-list'}>Asset List</NavLink></li>
        <li className='font-bold mt-5 bg-gray-200 p-2 rounded-2xl text-xs lg:mr-5 lg:ml-3 lg:mt-5 '><NavLink to={'all-requests'}>All Requests</NavLink></li>
        <li className='font-bold mt-5 bg-gray-200 p-2 rounded-2xl text-xs lg:mr-5 lg:ml-3 lg:mt-5 '><NavLink to={'employee-list'}>My Employee List</NavLink></li>
                </ul> : ''
              }

              {
                role === 'admin'? 
                <ul>
        <li className='font-bold mt-5  lg:mt-0 lg:mr-5 '><NavLink to={'asset-lst'}>Admin Home</NavLink></li>
        <li className='font-bold mt-5  lg:mt-0 lg:mr-5 '><NavLink to={'dashboard'}>Manage User</NavLink></li>
                </ul>
                : ''
              }
            </div> 
            <div className="flex-1 ">
                 <div className="w-full h-16 bg-gray-100 flex justify-end pr-5">
                   <Link to={'/'}> <img className="w-14 h-14 rounded-full shadow-xl " src={logo} alt="" /></Link>
                 </div>
                 
                <Outlet/>
            </div>
            


           
            
        </div>
    );
};

export default Dashboard;