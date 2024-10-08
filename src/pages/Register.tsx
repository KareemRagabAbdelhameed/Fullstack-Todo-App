import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form"
import {RegisterForm} from "../data";
import InputErrorMsg from "../components/errors/InputErrorMsg";
import { yupResolver } from '@hookform/resolvers/yup';
import {registerSchema} from "../validation";
import axiosInstance from "../config/AxiosConfig";
import toast from 'react-hot-toast';
import { useState } from "react";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  username: string,
  email: string,
  password : string
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);
  const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>({
    resolver : yupResolver(registerSchema)
  })
  const onSubmit: SubmitHandler<IFormInput> = async(data) => {
    console.log(data);
    setIsLoading(true);
    try {
      const {status} = await axiosInstance.post("/auth/local/register",data);
      
      if(status===200){
        toast('Success Registeration', {
          duration: 2000,
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
      

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
     console.log( errorObj.response?.data.error.message);
     toast.error(`${errorObj.response?.data.error.message}`),{
      position: 'bottom-center',
      duration: 4000,
     }
    } finally{
      setIsLoading(false)
    }
  }
  const renderInputForm = RegisterForm.map(({name,placeholder,type,validation},i)=><div key={i}>
    <Input type={type} placeholder={placeholder} {...register(name,validation)} />
    {errors[name] && <InputErrorMsg msg={errors[name].message} /> }
    
    </div>)
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">Register to get access!</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderInputForm}
        <Button fullWidth isLoading = {isLoading}>
          
          Register</Button>
      </form>
    </div>
  );
};
export default RegisterPage;