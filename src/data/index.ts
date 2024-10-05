import { IRegisterInput } from "../interfaces";

const RegisterForm : IRegisterInput[] = [
    {
        name : "username",
        placeholder : "UserName",
        type : "text",
        validation : {
            required : true,
            minlingth : 6,
        }
    },
    {
        name : "email",
        placeholder : "Email",
        type : "email",
        validation : {
            required : true,
            pattern : /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        }
    },
    {
        name : "password",
        placeholder : "Password",
        type : "password",
        validation : {
            required : true,
            minlingth : 6,
        }
    },
]
   
export default RegisterForm;