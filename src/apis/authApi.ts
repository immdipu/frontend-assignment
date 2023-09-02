import { axiosInstance } from "@/apis/axiosInstance/AxiosInterceptor";
import axios from "axios";
import { signupParamsTypes } from "@/types/userTypes";

export const userApis = {
  signUp: async (data: signupParamsTypes) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_URL}/user/signup`,
      data
    );
    return res.data;
  },

  AutoLogin: async () => {
    const res = await axiosInstance().get("/user/login");
    return res.data;
  },
  LogIn: async (data: any) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_URL}/user/login`,
      data
    );
    return res.data;
  },
};
