import Button from "./ui/Button";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import { ChangeEvent, FormEvent, useState } from "react";
import Textarea from "./ui/Textarea";
import { ITodo } from "../interfaces";
import axiosInstance from "../config/AxiosConfig";
const TodoList = () => {
    const storageKey = "loggedInUser";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) :null; 
    const [isEditModal,setIsEditModal] = useState(false);
    const [todoEdit,setTodoEdit] = useState<ITodo>({
      id : 1,
      title :"",
      description : ""
    });
    const {isLoading,data,error} = useAuthenticatedQuery({queryKey:["todos"],url:"/users/me?populate=todos",config:{
      headers : {
        Authorization : `Bearer ${userData.jwt}`
      }
    }})
    console.log(data);
    if(isLoading) return <h3>Loading...</h3>
    
    // Handlers
    const onCloseModal = ()=> {
      setTodoEdit({
        id : 1,
        title : "",
        description : "",
      });
      setIsEditModal(false);
    }
    const onOpenModal = (todo:ITodo)=> {
      setTodoEdit(todo);
      setIsEditModal(true);
    }

    const onChangeHandler = (event:ChangeEvent<HTMLTextAreaElement |HTMLInputElement >)=>{
      const {value,name} = event.target;
      setTodoEdit({
        ...todoEdit,
        [name] : value,
      })
    }

    const submitHandler = async(event:FormEvent<HTMLFormElement>)=>{
      event.preventDefault();
      const {title,description} = todoEdit;
      try {
       const response =  await axiosInstance.put(`/todos/${todoEdit.id}`,{data:title,description},{
        headers : {
          Authorization : `Bearer ${userData.jwt}`
        }
       });
       console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    if (error) return 'An error has occurred: ' + error.message
  return (
    <div className="space-y-1 ">
      {data.todos.length? data.todos.map((todo : ITodo)=><div key={todo.id}  className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
        <p className="w-full font-semibold">{todo.title}</p>
        <div className="flex items-center justify-end w-full space-x-3">
          <Button size={"sm"} onClick={()=>onOpenModal(todo)}>Edit</Button>
          <Button variant={"danger"} size={"sm"}>
            Remove
          </Button>
        </div>
      </div>) : <h3>There is no todos</h3> }
      <Modal isOpen = {isEditModal} close={onCloseModal} title="Edit This Todo">
        <form className="space-y-3" onSubmit={submitHandler}>
        <Input name="title" value= {todoEdit.title} onChange={onChangeHandler} />
        <Textarea name="description" value={todoEdit.description} onChange={onChangeHandler} />
        <div className="flex items-center space-x-3 mt-4">
        <Button className="bg-indigo-700 hover:bg-indigo-800 ">Update</Button>
        <Button variant={"cancel"} onClick={onCloseModal}>Cancel</Button>
        </div>
        </form>
      </Modal>
    </div>
  );
};
export default TodoList;