import Button from "./ui/Button";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
const TodoList = () => {
    const storageKey = "loggedInUser";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) :null; 

    const {isLoading,data,error} = useAuthenticatedQuery({queryKey:["todos"],url:"/users/me?populate=todos",config:{
      headers : {
        Authorization : `Bearer ${userData.jwt}`
      }
    }})
    console.log(data);
    if(isLoading) return <h3>Loading...</h3>
    if (error) return 'An error has occurred: ' + error.message
  return (
    <div className="space-y-1 ">
      {data.todos.length? data.todos.map(todo=><div key={todo.id}  className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
        <p className="w-full font-semibold">{todo.title}</p>
        <div className="flex items-center justify-end w-full space-x-3">
          <Button size={"sm"}>Edit</Button>
          <Button variant={"danger"} size={"sm"}>
            Remove
          </Button>
        </div>
      </div>) : <h3>There is no todos</h3> }
    </div>
  );
};
export default TodoList;