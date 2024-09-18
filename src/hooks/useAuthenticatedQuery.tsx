import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../config/AxiosConfig"
import { AxiosRequestConfig } from "axios"

interface PropAuthQuery {

    queryKey:string[],
    url:string,
    config:AxiosRequestConfig;
}


export default function useAuthenticatedQuery( {queryKey,url,config }:PropAuthQuery ) {
  return useQuery({

    queryKey,
    queryFn:async ()=>{
                    const {data}= await axiosInstance.get(url,config  )
                  return data
                  }
 })





}
