import * as yup from "yup"
export const registerValidationSchema = yup
  .object({
    userName: yup.string().required().min(5,'At least 5 characters must be entered'),
    email: yup.string().matches(/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/,'email is not valid').required(),
    password: yup
    .string()
    .required('Password is required')
    .min(7, 'Password must be at least 7 characters long')
    .matches(/[A-Z]/, 'Password must start with an uppercase letter')
    .matches(/[a-zA-Z]/, 'Password must contain letters')
    .matches(/\d/, 'Password must contain numbers')
  })
  .required()