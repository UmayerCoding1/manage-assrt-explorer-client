import { useQuery } from '@tanstack/react-query';

import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useRole = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: isRole=[],isLoading: hrLoading,refetch}=useQuery({
        queryKey:[ 'isRole',user?.email,],
        queryFn: async() => {
            const res = await axiosSecure.get(`/hr-role?email=${user?.email}`)
            // if (!res.ok) {
            //     throw new Error('Failed to fetch data');
            //   }
             return res.data[0];
        }
    })

    
    return [isRole,hrLoading,refetch]
};

export default useRole;