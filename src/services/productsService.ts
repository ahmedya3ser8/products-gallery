import axios, { isAxiosError } from "axios";
import type { IProduct } from "../interfaces/iproduct";

export const getAllProductsAPI = async () => {
  try {
    const res = await axios.get<IProduct[]>(`https://fakestoreapi.com/products`);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Failed to fetch products.');
    } else {
      throw new Error('Something Went Wrong Please Try Again!');
    }
  }
}

export const getProductAPI = async (id: number) => {
  try {
    const res = await axios.get<IProduct>(`https://fakestoreapi.com/products/${id}`);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Failed to fetch products.');
    } else {
      throw new Error('Something Went Wrong Please Try Again!');
    }
  }
}
