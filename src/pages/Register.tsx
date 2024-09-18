import InputErrorMsg from "../components/errors/InputErrorMsg";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { REGISTER_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup"
import { registerValidationSchema } from "../validation";
import axiosInstance, { isIAxiosErrorMsg } from "../config/AxiosConfig";
import { useState } from "react";
import toast from 'react-hot-toast';
import { AxiosError } from "axios";
import { IAxiosErrorMsg } from "../interfaces";
import { useNavigate } from "react-router-dom";

//  لازم تقرأ ده عشان لو عاوز تستخدم ال component  ده 

// لو عاوز تستخدم ا ل register and login  عالجاهز عشان ما تضيعش وقتك بكل بساطه كل اللى هيتغير هو الديزاين بتاع ال  inputs , api
// هنشوف هنحتاج كام حقل ونروح على ملف ال  data/index.ts ونزود الحقول من هناك 
// نروح لملف ال  config ونعدل ال  api  اللى فى  axiosInstance  
// هنعدل ال  IFormInput  على حساب الحقول اللى هنحتاجها طبعا 
// لواستعملنا حاجه غير ال axios  لازم نهندل كل اللى فى ال catch  لان انا معتمد انى بتعامل مع ال axios  ومننساش ال  isaxiosErrorMsg
//  ونبص برضه على ال validationSchema  هناك فى ملف ال  validation  
// نشوف برضه ال button component  
// نبص كمان على ال InuptErrorMsg
// ملحوظه لعدم التشتيت وهى ان ال register destructure from useForm  ملوش علاقه بأن دى صفحة ال  login or register  دى حاجه    
// ثابته فى ال  useForm  وجايه من ال  react-hook-form  ومهمتها انها بتاخد ال value  بتاعة الحقل وتابع التغيير بتاعها   



const RegisterPage = () => {

  interface IFormInput {
    username: string;
    email: string;
    password: string;
  }


const myNavigate=useNavigate()
  const [loader,setLoader]=useState(false)
  const { register, handleSubmit ,formState:{errors} } = useForm<IFormInput>( { resolver:yupResolver(registerValidationSchema)} );
  const onSubmit: SubmitHandler<IFormInput> =async (data) => {
    const successToast = () => toast.success(' success register , You will be directed to the login page during 2 second ',{ duration:1500, style:{border:"1px solid green"} });


setLoader(true)

//  case ==> fulfilled (success)
try {

  const {status,data:resData}=await axiosInstance.post('/auth/local/register',data)
  console.log("%cdata", "color: green; padding: 5px; font-size: 20px;", "=>", resData);
  if(status===200) {

    successToast()
    setTimeout(()=>{

myNavigate('/login')


    },2000)

  }
  //  case ==> Rejected 

}  
 catch (error) {
        console.log("%cErrorRegister", "color: green; padding: 5px; font-size: 20px;", "=>", error);
        const axiosErrorObject=error as AxiosError <IAxiosErrorMsg> //   السطر ده معناه ان الايرور ده من نوع ال AxiosError  علشان ال  axiosError  بتكون عارفه ومتوقعه 
        // ان اللى هيرجع كده كده  response.data  لكن مش عارفه اى اللى هيرجع جوه الداتا فأنا ببعتلها  interface  فى الجينيريك بتاعها ولما هى بتستقبله بتستمله عندها
        // فى الكود وبتدى ال interfce لل  response.data as type  وبكده ال AxiosError  بقا متوقع اللى هيكون جوه ال  response.data  لكن على فكره الكود ممكن يطلع
          // فى حالة لو اللى فى ال  response.data  اتغير وده اكيد هيحصل سعتها اال interface  اللى انت باعته لل AxiosError  مش هينفع ولكن الحل المضمون اننا  
          //  نتشك قبل ما نعمل الخطوه دى ولو ال response.data  مطلعش شايل ال property  اللى ال IAxiosErrorMsg interface  بيحتوى عليها مطلعتش موجوده نحط اى خطأ افتراضى   
        
          if (axiosErrorObject.response && isIAxiosErrorMsg(axiosErrorObject.response.data)) {
            toast.error(` ${axiosErrorObject.response.data.error.message} `, { style: { border: "1px solid red" } });
          } else {
            // إذا لم يكن النوع يطابق، يمكنك طباعة رسالة خطأ عامة
            toast.error('An unexpected error occurred.', { style: { border: "1px solid red" } });
          }
       
      } 

  
      
      finally{

  setLoader(false)
}

  }


  const renderRegisterForm=REGISTER_FORM.map(({name,placeholder,type} ,index )=>{

      return <div key={index} >

            <Input type={type} placeholder={placeholder} {...register(name )} />
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
        
        

        <Button fullWidth className="bg-indigo-600 " isLoading={loader} >
         
         Register


  </Button>
        
        
      </form>

    </div>
  );
};
export default RegisterPage;

