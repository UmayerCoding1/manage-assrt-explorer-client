import { useQuery } from "@tanstack/react-query";
import React from "react";
import useRole from "./useRole";
import useAxiosSecure from "./useAxiosSecure";

const useAssets = (filterAsset,assetsType) => {
  const axiosSecure = useAxiosSecure();
  const [isRole] = useRole();
  const { _id } = isRole;
  
  
  const { data: assets = [], isLoading,refetch } = useQuery({
    queryKey: ["assets", _id,filterAsset,assetsType],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assets?_id=${_id}&search=${filterAsset}&type=${assetsType.trim()}`);
      return res.data;
    },
  });

  return [assets,refetch];
};

export default useAssets;
