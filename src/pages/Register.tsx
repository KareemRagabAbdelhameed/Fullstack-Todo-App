import InputErrorMsg from "../components/errors/InputErrorMsg";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { REGISTER_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup"
import { registerValidationSchema } from "../validation";
const RegisterPage = () => {
  interface IFormInput {
    userName: string;
    email: string;
    password: string;
  }
  const { register, handleSubmit ,formState:{errors} } = useForm<IFormInput>( { resolver:yupResolver(registerValidationSchema)} );
  const onSubmit: SubmitHandler<IFormInput> = data => console.log("%cdata", "color: green; padding: 5px; font-size: 20px;", "=>", data);
  const renderRegisterForm=REGISTER_FORM.map(({name,placeholder,type,validation} ,index )=>{
      return <div key={index} >
            <Input type={type} placeholder={placeholder} {...register(name ,validation)} />
            {errors[name]&&<InputErrorMsg msg={errors[name]?.message} /> }
          </div>
  })
  console.log(errors);
  
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">Register to get access!</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
{/*        
     <div>
          <Input placeholder="Username" {...register("userName" , {required:"user name is required" ,minLength:5 } )} />
                {errors?.userName&&errors?.userName.type==="required"&& <InputErrorMsg msg={'user name is required'} /> }
                {errors?.userName&&errors?.userName.type ==="minLength"&& <InputErrorMsg msg={' must be min length is 5 charctars '} /> }
     </div>*/}
        
{renderRegisterForm}
        <Button fullWidth>Register</Button>
      </form>
    </div>
  );
};
export default RegisterPage;