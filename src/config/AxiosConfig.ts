import axios from "axios";
import { IAxiosErrorMsg } from "../interfaces";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:1337/api',
    timeout: 1000,
  });

  export const isIAxiosErrorMsg = (data: any): data is IAxiosErrorMsg => {
    return data && typeof data === 'object'
      && 'error' in data
      && typeof data.error === 'object'
      && 'message' in data.error
      && typeof data.error.message === 'string';
  };

  export default axiosInstance