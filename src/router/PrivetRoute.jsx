import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loading from '../shared/loading/Loading';
import useEmRole from '../hooks/useEmRole';

const PrivetRoute = ({children}) => {
    const {user,loading} = useAuth();
    const [isEmRole,isLoading] = useEmRole();
    const {role} = isEmRole;

    const location = useLocation();
    if(isLoading) {
        return <Loading/>
    }
    if(user && role === 'employee'){
        return children;
    }

    return <Navigate to={'/login'} state={{form: location}} replace/>

};

export default PrivetRoute;