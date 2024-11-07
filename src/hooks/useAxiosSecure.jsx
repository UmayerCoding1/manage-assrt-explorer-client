import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  // baseURL: "https://manage-assrt-explorer.onrender.com",
  baseURL: 'http://localhost:5000',
});
const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("MAE access token");

      config.headers.authorization = token;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use((response) => {
      return response;
    }, async function  (error)  {
      const status = error.response.status;
      console.log("status error in the interceptors", error);
      // for 401 or 403 logout the user and move the user to the login
      if (status === 401 || status === 403) {
        logOut();
        await navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
