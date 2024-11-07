import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMyAsset = (assetsStatus, assetsSearch) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: MyAssets = [], isLoading,refetch } = useQuery({
    queryKey: ["MyAssets", user?.email, assetsStatus, assetsSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/asset-request?email=${
          user?.email
        }&assetsStatus=${assetsStatus.trim()}&search=${assetsSearch}`
      );
      return res.data;
    },
  });

  return [MyAssets, isLoading,refetch];
};

export default useMyAsset;
