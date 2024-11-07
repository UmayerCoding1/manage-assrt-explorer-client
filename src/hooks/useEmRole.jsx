import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useEmRole = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: isEmRole={},isLoading}=useQuery({
        queryKey:[ 'isEmRole',user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/em-role?email=${user.email}`)
            return res.data[0];
        }
    })
    
    
    return [isEmRole,isLoading]
};

export default useEmRole;