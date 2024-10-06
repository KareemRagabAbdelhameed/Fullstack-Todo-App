import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form"
import { LoginForm } from "../data";
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../validation";
import InputErrorMsg from "../components/errors/InputErrorMsg";
import axiosInstance from "../config/AxiosConfig";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";


interface IFormInput {
  identifier: string,
  password : string,
  
}
const LoginPage = () => {
  const [isLoading,setIsLoading] = useState(false);
  const { register, handleSubmit , formState: {errors} } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema)
  })
  const onSubmit: SubmitHandler<IFormInput> =async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      const {status} =await axiosInstance.post("/auth/local",data);
      if(status===200){
        toast('Login Successfully', {
          duration: 4000,
          position: 'top-center',
        
          // Styling
          style: {},
          className: '',
        
          // Custom Icon
          icon: '✅',
        
          // Change colors of success/error/loading icon
          iconTheme: {
            primary: '#000',
            secondary: '#fff',
          },
        
          // Aria
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
      }
      
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      console.log(errorObj.response?.data.error);
      toast.error(`${errorObj.response?.data.error.message}`),{
        position: 'bottom-center',
        duration: 4000,
       }
    } finally {
      setIsLoading(false);
    }
  }
  const renderLoginForm = LoginForm.map(({name,placeholder,type,validation},i)=><div key={i}>
    <Input placeholder={placeholder} type={type} {...register(name,validation)} />
    {errors[name] && <InputErrorMsg msg={errors[name].message} /> }
  </div>)
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">Login to get access!</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderLoginForm}
        <Button fullWidth isLoading = {isLoading}>Login</Button>
      </form>
    </div>
  );
};
export default LoginPage;