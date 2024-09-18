import Button from "./ui/Button";
// import { ColorRing } from "react-loader-spinner";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Modal from "./ui/Modal";
import { ChangeEvent, FormEvent, useState } from "react";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import { ItoDo } from "../interfaces";
import axiosInstance from "../config/AxiosConfig";
import ToDoSkeletonLoader from "./ui/ToDoSkeletonLoader";

const TodoList = () => {

  const userDataStored=JSON.parse(` ${localStorage.getItem('StrapiToDoUserData')}`)
 const [isEditModalOpen, setIsEditModalOpen] = useState(false)
 const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false)
 const [toDoToEdit,setToDoToEdit]=useState<ItoDo>({id:0,title:'',desc:""  })
 const [toDoToAdd,setToDoToAdd]=useState({title:'',desc:""  })
 const [todoToDelete,setTodoToDelete]=useState<ItoDo>()
 const [isLoadingUpdate,setIsLoadingUpdate]=useState<boolean> ()
 const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
 const [counterForReFetchAllTodos,setCounterForReFetchAllTodos]=useState<number> (1)
 
const defaultToDo :ItoDo ={

  id:0,
  title:'',
  desc:""
  
}

 const closeConfirmModal = () => {
  
  setIsOpenConfirmModal(false)
setTodoToDelete(defaultToDo)

 }
 const openConfirmModal = (toDoToDelete:ItoDo) => {
  
   setIsOpenConfirmModal(true);
  setTodoToDelete(toDoToDelete)


}

//  updatae CounterForReFetchAllTodos  for reFetching All todos from strapi server 


 async function removeToDoMethod (){

console.log('yes removed to do item ');

try {

  const {status}= await axiosInstance.delete(`/todos/${todoToDelete?.id}` , { 
   headers :{
Authorization:`Bearer ${userDataStored.jwt}  `

   }
  
  } )
  
  if(status==200){
    setCounterForReFetchAllTodos(prev => prev+1)
    closeConfirmModal()
  }


} catch (error) {
  console.log("Error from Deleting to do =>" , error);
  
}


 }

 function onCloseEditModal(): void {
 
   setIsEditModalOpen( false )
  setToDoToEdit(defaultToDo)
  

} 
 function onOpenEditModal(todo:ItoDo): void { 
  
   setIsEditModalOpen( true )
  setToDoToEdit(todo)
} 

function onChangeHandleFileds (event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement> ) {

  const {name,value}=event.target;
    setToDoToEdit({
 
        ...toDoToEdit,
        [name]:value
 
    })
 
 }

 // here too updatae CounterForReFetchAllTodos  for reFetching All todos from strapi server 

 const onSubmitHandler = async (evt: FormEvent<HTMLFormElement>) => {
   evt.preventDefault();
 
   const { title, desc } = toDoToEdit;
 
   setIsLoadingUpdate(true)
   try {
     const {status} = await axiosInstance.put(
       `/todos/${toDoToEdit.id}`, 
       {
         data: { title, desc },
       },
       {
         headers: {
           Authorization: `Bearer ${userDataStored.jwt}`,
         },
       }
     );
 
     if(status=== 200) {

       onCloseEditModal()
       setCounterForReFetchAllTodos(prev => prev+1)

     } 
 
 
   } catch (error) {
     console.log(error);
   } finally {
 
     setIsLoadingUpdate(false)
 
   }
 
   console.log(toDoToEdit);
 };
 


              //  A D D      T O D O       M E T H O D S
 function onOpenAddTodoModal(): void { 
  
  setIsAddTodoModalOpen( true )
} 
 function onCloseAddTodoModal(): void { 
  
  console.log(' close add todo modal');

  
  setIsAddTodoModalOpen( false )
} 

// how to make inputs from unControlld to controled 
function getValuesOfAddTodoINPUTS (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

console.log("getValuesOfAddTodoINPUTS =>",event.target.value);

const {value,name}=event.target;
setToDoToAdd({

...toDoToAdd,
[name]:value

})

}

async function sendTodoToTheServer(event:FormEvent<HTMLFormElement>) {

event.preventDefault()

try {

  const {status}=await axiosInstance.post(`/todos`, {

                       
                           data:{...toDoToAdd}
                      }
      
      
                    , {
                            headers:{

                              Authorization:`Bearer ${userDataStored.jwt}`
                            }

                      }  )


                      if(status===200)
                      {
                        setCounterForReFetchAllTodos(prev => prev+1)

                      }
  
} catch (error) {

  console.log('error because sending data to server =>',error);
  
}

}



// نركز فى ال  queryKey  
// ال  todo  اللى جوه ال string  هى ال key  اللى ماسك الداتا اللى متخزنه فى ال reactQuery  شبه اللوكال ستودج كده 
//  طب لى العنصر اللى بعد كده شايل ال toDoToEdit.id & toDoToDelete.id  عشان لما يحصل اى تغيير فيهم يحصل  reFetch  
//  طب ال  toDoToEdit.id & toDoToDelete.id  امته بيتغيرو ؟ 

// بكل بساطه الحاجتين دول شايلين قيم افتراضيه اللى هما ال defaultToDo  وطبعا ال  id  فيهم بيكون بصفر لكن لما بنعمل تحديث او حذف 
//  ال  id  بيتغير وبيشيل قيمه من الفانكشن بتاعة  openConfirmModal & openEditModal  ولما بيشيل قيمه ويتغير بيحصل  refetch  
// ولو تلاحظ ان التغيير ده بيكون عباره عن ان ال  id  بيشيل قيمة ال id  بتاع العنصر اللى انضغظ عليه وبعد ما المودل  
//  بتتقفل ال  id  بيتصفر تانى وبكده ال  id  اتغير فا هيحصل  refetch  وطبعا الكلام ده ينفع على ال 
// toDoToEdit.title or desc & toDoToDelete.title or desc 


  const {data,isLoading }= useAuthenticatedQuery( {queryKey:['todos', `${counterForReFetchAllTodos}`],url:'/users/me?populate=todos',
    
    config:{

          headers:{Authorization:`Bearer ${userDataStored.jwt}` }
     
    } } )

        //  console.log(" data,error,isLoading =>useQuery =>",{data,error,isLoading});


  if(isLoading) 
    
    {

    return <>
    
    <ToDoSkeletonLoader />
    </> 


  //   return <div className="fixed inset-0 bg-indigo-100 text-indigo-600 flex justify-center items-center" >  
  //   <ColorRing
  //   visible={true}
  //   height="80"
  //   width="80"
  //   ariaLabel="color-ring-loading"
  //   wrapperStyle={{}}
  //   wrapperClass="color-ring-wrapper"
  //   colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  //   />
  // </div> 
  

}



  return (
    <div className="space-y-1 ">


 <div className="mx-auto my-10 w-fit" >

  <Button onClick={ onOpenAddTodoModal } size={'sm'} className="bg-indigo-600 hover:bg-indigo-800 " >
    Post new todo
  </Button>
 </div>

{/*  ADD Modale  */}
 <Modal isOpen={isAddTodoModalOpen} closeModal={onCloseAddTodoModal} title='Add todo'>
                  <form onSubmit={sendTodoToTheServer}  >

                          <div className="space-y-3" >

                              <Input name="title" value={toDoToAdd.title} onChange={getValuesOfAddTodoINPUTS}  ></Input>
                           <Textarea name="desc" value={toDoToAdd.desc}   onChange={getValuesOfAddTodoINPUTS}  />


                          </div>

                        <div className="flex gap-4 mt-4 ">

                              <Button type="button" variant={"cancel"} onClick={onCloseAddTodoModal} >Cancel</Button>
                              <Button className="bg-indigo-600 hover:bg-indigo-800"   >Done ✅</Button>
                              
                        </div>
                  </form>

          </Modal>


    {
      // لو ناخد بالنا ال  id هنا جاى من الباك اند فى ال todos يعنى كل  item جواه ال  id  بتاعه ولما بيحصل اى تعديل كده كده 
      //  احنا معانا ال  id  من خلال الخطوه دى بالتالى هنقدر نعدل على العنصر اللى احنا عاوزينه بكل سهوله 
           data.todos.length>0? data.todos?.map((item:ItoDo,index:number)=>{
              return <div key={item.id} className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
        <p className="w-full font-semibold"> {index+1} - {item.title} </p>
        <div className="flex items-center justify-end w-full space-x-3">
          <Button onClick={()=>{ onOpenEditModal(item) }} size={"sm"}>Edit</Button>
          <Button onClick={ ()=>{openConfirmModal(item)} }  variant={"danger"} size={"sm"}>
            Remove
          </Button>
        </div>
      </div>
              
      


           }  ) : <> <h1 className="text-center m-5 bg-black text-white" > No to do yet</h1> </>

   }

          <Modal isOpen={isEditModalOpen} closeModal={onCloseEditModal} title='Adit this todo'>
                  <form onSubmit={onSubmitHandler} >

                          <div className="space-y-3" >

                              <Input name="title" value={toDoToEdit.title} onChange={onChangeHandleFileds}  ></Input>
                              <Textarea name="desc" value={toDoToEdit.desc} onChange={onChangeHandleFileds}  />


                          </div>

                        <div className="flex gap-4 mt-4 ">

                              <Button type="button" variant={"cancel"} onClick={onCloseEditModal} >Cancel</Button>
                              <Button className="bg-indigo-600 hover:bg-indigo-800" isLoading={isLoadingUpdate}  >Update</Button>
                              
                        </div>
                  </form>

          </Modal>

                {/* DELETE PRODUCT CONFIRM MODAL */}
      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal} //  ده الزرار اللى اللى جوه المودل اللى بيقفلها اللى هو تحت منى بسطرين تلاته واللى اسمه  cancel
        //  ولو سألت نفسك لى ال  closeModle  بتاخد  closeConfirmModal  مش بتاخد ال  isOpenConfirmModal  هقولك عشان المودل مفيهاش 
        // غير زرار للقفل فقط ومفيش للفتح طبعا ولو طلعت فوق فى الكود هتلاقى فانكشن زى دى بتفتح المودل 
        // وعلى فكره المودل مش بيفتح ولا بيقفل غير بناء على ال  isOpenConfirmModale  ولكن احنا بنبعت الفانكشن  closeConfi.....
        //  لانها برضه بتدى false  لل  isOpenConfir....  
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button type="button" onClick={removeToDoMethod}  className="bg-[#c2344d] hover:bg-red-800" >
            Yes, remove
          </Button>
          <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={closeConfirmModal}>
            Cancel
          </Button>
        </div>
      </Modal>
  
    </div>


  );
};

export default TodoList;
