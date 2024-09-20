import toast from "react-hot-toast";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {

  const userDataStored=JSON.parse(` ${localStorage.getItem('StrapiToDoUserData')}`)
  const {pathname}=useLocation()
  function logOutMethod () {

    localStorage.removeItem('StrapiToDoUserData')
    toast.success(` success logOut ,you'r not user `, { style: { border: "1px solid red" } });

     setTimeout(()=>{

location.replace(pathname)
     },1200)

  }

  return (
    <nav className="max-w-lg mx-auto mt-7 mb-20 bg-indigo-600 px-3 py-3 rounded-md">
      <ul className="flex items-center justify-between">
        <li className="text-white duration-200 font-semibold text-lg">
          <NavLink to="/">Home</NavLink>
        </li>
     {

userDataStored? <div className="flex justify-center items-center gap-5" >

<li className="text-white duration-200 font-semibold text-md">
  <NavLink to="/todosPage">Pagination</NavLink>
</li>
  
   <NavLink to={'/profile'} className="text-white flex justify-center items-center h-10 w-10 rounded-full border-[1px] border-white text-2xl font-bold cursor-pointer " >
     {userDataStored.user.email.charAt(0).toUpperCase() }  </NavLink> 


   <span className="text-white cursor-pointer " onClick={logOutMethod}  > Logout</span> 
   
   
    </div> :


<p className="flex items-center space-x-3">
<li className="text-white duration-200 font-semibold text-lg">
  <NavLink to="/register">Register</NavLink>
</li>
<li className="text-white duration-200 font-semibold text-lg">
  <NavLink to="/login">Login</NavLink>
</li>
</p>

     }
      </ul>
    </nav>
  );
};

export default Navbar;
