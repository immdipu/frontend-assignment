import { axiosInstance } from "@/apis/axiosInstance/AxiosInterceptor";
import axios from "axios";
import { Product } from "@/types/productTypes";

export const ProductsApis = {
  getAllProduct: async (): Promise<Product[]> => {
    const res = await axios.get(`https://fakestoreapi.com/products`);

    return res.data;
  },
  getProductByCategories: async (category: string): Promise<Product[]> => {
    const res = await axios.get(
      `https://fakestoreapi.com/products/category/${category}`
    );

    return res.data;
  },
};
