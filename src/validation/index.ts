import * as yup from "yup";
const schema = yup.object({
  username : yup.string().required("Username is required").min(6),
  email : yup.string().required("Email is required").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Email not valid"),
  password : yup.string().required("Password is required").min(6)
}).required();
export default schema;