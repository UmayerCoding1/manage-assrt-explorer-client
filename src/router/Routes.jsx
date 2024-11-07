import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Login from "../components/login/Login";
// import JoinEmployee from "../components/join-em/JoinEmployee";
import JoinHr from "../components/join-hr/JoinHr";
import Home from "../components/page/home/Home";
import Profile from "../shared/profile/Profile";
import PrivetRoute from './PrivetRoute';
import Dashboard from "../components/dashboard/Dashboard";
import AssetList from "../components/dashboard/hr-dashboard/asset-list/AssetList";
import Payment from "../components/page/payment/Payment";
import HrRoutes from "./HrRoutes";
import AddEmployee from "../components/dashboard/hr-dashboard/add-employee/AddEmployee";
import AddAsset from "../components/dashboard/hr-dashboard/Add-asset/AddAsset";
import AllRequest from "../components/dashboard/hr-dashboard/all-request/AllRequest";
import EmployeeList from "../components/dashboard/hr-dashboard/employee-list/EmployeeList";

import MyAsset from "../components/page/employee/my-asset/MyAsset";
import MyTram from "../components/page/employee/my-team/MyTram";
import RequestAsset from "../components/page/employee/request-asset/RequestAsset";
import AssetDetails from "../components/page/pdf/asset-details/AssetDetails";
import HrDashBoardHome from "../components/dashboard/hr-dashboard/HrDashBoardHome";
import UpdateAsset from "../components/dashboard/hr-dashboard/update-asset/UpdateAsset";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children: [
            {
                path:'/',
                element: <Home/>
            },
            {
                path:'/profile',
                element:<PrivetRoute> <Profile/></PrivetRoute>
            },
            {
              path: 'update-asset/:id',
              loader: ({params}) => fetch(`https://manage-assrt-explorer.onrender.com/assets/${params.id}`),
              element: <UpdateAsset/>,
            },

            // employee route
            {
              path: '/my-asset',
              element: <PrivetRoute><MyAsset/></PrivetRoute>
            },
            {
              path:'/my-team',
              element: <PrivetRoute><MyTram/></PrivetRoute>
            },
            {
              path:'/request-an-asset',
              element: <PrivetRoute><RequestAsset/></PrivetRoute>
            },
            {
              path:'/asset-approved-request',
              element: <AssetDetails/>
            }
        ]
    },
    {
     path:'dashboard',
     element: <Dashboard/>,
     children: [
        // HR routes
        {
          path:'hr-home',
          element: <HrDashBoardHome/>
        },
         
          {
            path: 'add-an-asset',
            element: <HrRoutes><AddAsset/></HrRoutes>
          },
          {
            path: 'add-employee',
            element: <HrRoutes><AddEmployee/></HrRoutes>
          },
          {
            path: 'asset-list',
            element: <HrRoutes><AssetList/></HrRoutes>
          },
          {
            path:'all-requests',
            element: <HrRoutes><AllRequest/></HrRoutes>
          },
          {
            path:"employee-list",
            element: <HrRoutes><EmployeeList/></HrRoutes>
          }
     ]
    },





    {path:'/login', element: <Login/>},
    {path:'/join-employee', element: <Login/>},
    {path:'/join-hr', element: <JoinHr/>},
    {path: '/payment', element: <HrRoutes><Payment/></HrRoutes>}
])

export default router;