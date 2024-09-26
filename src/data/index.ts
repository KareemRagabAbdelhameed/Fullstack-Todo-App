import { IRegisterInput } from "../interfaces";
 export  const REGISTER_FORM: IRegisterInput[] = [
    {
        name: "userName",
        placeholder: "Username",
        type: "text",
        validation: {
            required: true,
            minLength: 5,
        },
    },
    {
        name: "email",
        placeholder: "Email address",
        type: "email",
        validation: {
            required: true,
            pattern: /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/,
        },
    },
    {
        name: "password",
        placeholder: "Password",
        type: "password",
        validation: {
            required: true,
            minLength: 6,
        },
    },
];