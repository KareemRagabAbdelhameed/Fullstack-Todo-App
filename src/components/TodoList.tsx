import Button from "./ui/Button";
// import { ColorRing } from "react-loader-spinner";
import Modal from "./ui/Modal";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import { ItoDo } from "../interfaces";
import axiosInstance from "../config/AxiosConfig";
import ToDoSkeletonLoader from "./ui/ToDoSkeletonLoader";
import toast from "react-hot-toast";
import UseGetTodosQuery from "../hooks/UseGetTodosQuery";
import { faker } from '@faker-js/faker';


const TodoList = () => {

  const userDataStored=JSON.parse(` ${localStorage.getItem('StrapiToDoUserData')}`)
 const [isEditModalOpen, setIsEditModalOpen] = useState(false)
 const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false)
 const [toDoToEdit,setToDoToEdit]=useState<ItoDo>({id:0,title:'',desc:""  })
 const [toDoToAdd,setToDoToAdd]=useState({title:'',desc:""  })
 const [todoToDelete,setTodoToDelete]=useState<ItoDo>()
 const [isLoadingUpdate,setIsLoadingUpdate]=useState<boolean> (false)
 const [isLoadingAddTodo,setIsLoadingAddTodo]=useState<boolean> (false)
 const [isLoadingDeleteTodo,setIsLoadingDeleteTodo]=useState<boolean> (false)
 const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
 const [counterForReFetchAllTodos,setCounterForReFetchAllTodos]=useState<number> (1)
 const defaultToDo :ItoDo ={ id:0, title:'', desc:"" }
 const successToast = (msg:string) => toast.success(msg,{duration:1400, style:{border:"1px solid green"} });
 const errorToast = (msg:string) => toast.success(msg,{duration:1400, style:{border:"1px solid red"} });

 


//                >                                                                                 <
//     ============>  3 methods for sending data to strapi server or Handler for any submeting : <===============
//                >              ---------------------------------------------------------          <

//                                          1  ,   2  ,   3
//  1- Add Todo method submit
        async function sendTodoToTheServer_AddTodo(event:FormEvent<HTMLFormElement>) {

          event.preventDefault()
          
          try {
            setIsLoadingAddTodo(true)
          
            const {status}=await axiosInstance.post(`/todos`, {
          
                                
                                    data:{...toDoToAdd , user:[userDataStored.user.id] }
                                }
                
                
                              , {
                                      headers:{
          
                                        Authorization:`Bearer ${userDataStored.jwt}`
                                      }
          
                                }  )
          
          
                                if(status===200)
                                {
                                  console.log('status is => ',status);
                                  
                                   // here too updatae CounterForReFetchAllTodos  for reFetching All todos from strapi server 
                                  setCounterForReFetchAllTodos(prev => prev+1)
                                  successToast('succesfully Added Todo')
                                  onCloseAddTodoModal()
          
                                }
            
          } catch (error) {

            errorToast('Rejected Add Todo , accord error')

          
            console.log('error because sending data to server =>',error);
            
          } finally {
          
            setIsLoadingAddTodo(false)
          }
          
          }

// 2- Edit todo method submit  
      const onSubmitHandler_EditTodo = async (evt: FormEvent<HTMLFormElement>) => {
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

            onCloseEditTodoModal()
            successToast('succesfully updated Todo')

             // here too updatae CounterForReFetchAllTodos  for reFetching All todos from strapi server 
            setCounterForReFetchAllTodos(prev => prev+1)

          } 


        } catch (error) {
          errorToast('Rejected updated Todo , accord error')

          console.log(error);
        } finally {

          setIsLoadingUpdate(false)

        }

        console.log(toDoToEdit);
      };

// 3- Delete Todo method submit 
        async function removeToDoMethod (event:MouseEvent<HTMLButtonElement> ){

          event.preventDefault()
          
          try {
            setIsLoadingDeleteTodo(true)
          
            const {status}= await axiosInstance.delete(`/todos/${todoToDelete?.id}` , { 
            headers :{
               Authorization:`Bearer ${userDataStored.jwt}  `
          
            }
            
            } )
            
            if(status==200){
               // here too updatae CounterForReFetchAllTodos  for reFetching All todos from strapi server 
              setCounterForReFetchAllTodos(prev => prev+1)
              successToast('successfully Delete todo')

              onCloseDeleteTodoModal()
            }
          
          
          } catch (error) {
            console.log("Error from Deleting to do =>" , error);
            errorToast('Rejected Delete Todo , accord error')

            
          } finally {
          
            setIsLoadingDeleteTodo(false)
          
          }
          
          
          }




//                >                                          <
//     ============>      3 methods for close any modale  : <===============
//                >             --------------------         <

//                                          1  ,   2  ,   3


// 1- this metho for close Add Todo  modale 
      function  onCloseAddTodoModal(): void { 
        
        console.log(' close add todo modal');

        
        setIsAddTodoModalOpen( false )
      } 

//  2- this metho for close Edit Todo modale
      function  onCloseEditTodoModal(): void {
      
        setIsEditModalOpen( false )
      setToDoToEdit(defaultToDo)
      

      } 

// 3- this method for colse Delete Todo  modale 
      function   onCloseDeleteTodoModal():void {
        
        setIsOpenConfirmModal(false)
      setTodoToDelete(defaultToDo)

      }





//                >                                          <
//     ============>      3 methods for open any modale  : <===============
//                >             --------------------         <

//                                1  ,   2  ,   3




//  1-  this method for open Todo Add Modale 
      function onOpenAddTodoModal(): void { 
        
        setIsAddTodoModalOpen( true )
      } 


//  2-  this method for open Todo Edit Modale 
      function onOpenEditModal(todo:ItoDo): void { 
        
        setIsEditModalOpen( true )
      setToDoToEdit(todo)
      } 


//  3-  this method for open Todo Delete Modale 

       function openConfirmModal(toDoToDelete:ItoDo)  {

          setIsOpenConfirmModal(true);
        setTodoToDelete(toDoToDelete)


        }






//                >                                           <
//     ============>   2 methods for handle change inputs :  <===============
//                >             --------------------          <

//                                   1  ,   2  





//1- how to make inputs from unControlld to controled in Add todo Modale
        function onChangeHandleFileds_AddTodoModale (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        console.log("getValuesOfAddTodoINPUTS =>",event.target.value);

        const {value,name}=event.target;
        setToDoToAdd({

        ...toDoToAdd,
        [name]:value

        })

        }

        
//2- how to make inputs from unControlld to controled in Edit todo Modale

        function onChangeHandleFileds_EditTodoModale (event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement> ) {

          const {name,value}=event.target;
            setToDoToEdit({
        
                ...toDoToEdit,
                [name]:value
        
            })
        
        }



        // ######### Generate todos from Facker ##############

        async function onGetTodosFromFacker (event:React.MouseEvent<HTMLButtonElement>){

          event.preventDefault()
                  
          for (let index = 5; index <= 20; index++) {


            try {
                  
              const {data}=await axiosInstance.post(`/todos`, {
            
                                  
                                      data:{
                                        title:faker.word.words(5),
                                        desc:faker.lorem.paragraph(2)
                                        , user:[userDataStored.user.id] }
                                  }
                  
                  
                                , {
                                        headers:{
            
                                          Authorization:`Bearer ${userDataStored.jwt}`
                                        }
            
                                  }  )
            
            
                        console.log('data generated from faker =>',data);
                        
              
            } catch (error) {

              errorToast('Rejected generate Todo from faker')

            
              console.log('error because sending data to server =>',error);
              
            }
            
          }

        }



//                                               here is All Mehtods End.



// نركز فى ال  queryKey  
// ال  todo  اللى جوه ال string  هى ال key  اللى ماسك الداتا اللى متخزنه فى ال reactQuery  شبه اللوكال ستودج كده 
//  طب لى العنصر اللى بعد كده شايل ال toDoToEdit.id & toDoToDelete.id  عشان لما يحصل اى تغيير فيهم يحصل  reFetch  
//  طب ال  toDoToEdit.id & toDoToDelete.id  امته بيتغيرو ؟ 

// بكل بساطه الحاجتين دول شايلين قيم افتراضيه اللى هما ال defaultToDo  وطبعا ال  id  فيهم بيكون بصفر لكن لما بنعمل تحديث او حذف 
//  ال  id  بيتغير وبيشيل قيمه من الفانكشن بتاعة  openConfirmModal & openEditModal  ولما بيشيل قيمه ويتغير بيحصل  refetch  
// ولو تلاحظ ان التغيير ده بيكون عباره عن ان ال  id  بيشيل قيمة ال id  بتاع العنصر اللى انضغظ عليه وبعد ما المودل  
//  بتتقفل ال  id  بيتصفر تانى وبكده ال  id  اتغير فا هيحصل  refetch  وطبعا الكلام ده ينفع على ال 
// toDoToEdit.title or desc & toDoToDelete.title or desc 


  const {data,isLoading }= UseGetTodosQuery( {queryKey:['todos', `${counterForReFetchAllTodos}`],url:'/users/me?populate=todos',
    
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
<div className="flex justify-center space-x-3 ">
  
    <Button onClick={ onOpenAddTodoModal } size={'sm'} className="bg-indigo-600 hover:bg-indigo-800 " >
        Post new todo
      </Button>
      <Button onClick={onGetTodosFromFacker} variant={'outline'} size={'sm'} className=" " >
      Generate Todos
      </Button>
</div>

 </div>


                                    {/*  this code is renders All Todos from strapi server using useAuthenticatedQuery  */}


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
                      
              


                  }  ) : <> <h1 className="text-center m-5 bg-black text-white" > No todo yet</h1> </>

             }

                                                    {/* here is 3 Modales Add , Edit , Delete   */}


       {/*  Add Todo Modale  */}
              <Modal isOpen={isAddTodoModalOpen} closeModal={onCloseAddTodoModal} title='Add todo'>
                                <form onSubmit={sendTodoToTheServer_AddTodo}  >

                                        <div className="space-y-3" >

                                            <Input name="title" value={toDoToAdd.title} onChange={onChangeHandleFileds_AddTodoModale}  ></Input>
                                        <Textarea name="desc" value={toDoToAdd.desc}   onChange={onChangeHandleFileds_AddTodoModale}  />


                                        </div>

                                      <div className="flex gap-4 mt-4 ">

                                            <Button type="button" variant={"cancel"} onClick={onCloseAddTodoModal} >Cancel</Button>
                                            <Button isLoading={isLoadingAddTodo} className="bg-indigo-600 hover:bg-indigo-800"   >Done ?</Button>
                                            
                                      </div>
                                </form>

                </Modal>


        {/* Edit todo modale */}
   
              <Modal isOpen={isEditModalOpen} closeModal={onCloseEditTodoModal} title='Adit this todo'>
                      <form onSubmit={onSubmitHandler_EditTodo} >

                              <div className="space-y-3" >

                                  <Input name="title" value={toDoToEdit.title} onChange={onChangeHandleFileds_EditTodoModale}  ></Input>
                                  <Textarea name="desc" value={toDoToEdit.desc} onChange={onChangeHandleFileds_EditTodoModale}  />


                              </div>

                            <div className="flex gap-4 mt-4 ">

                                  <Button type="button" variant={"cancel"} onClick={onCloseEditTodoModal} >Cancel</Button>
                                  <Button className="bg-indigo-600 hover:bg-indigo-800" isLoading={isLoadingUpdate}  >Update</Button>
                                  
                            </div>
                      </form>

              </Modal>

       {/* Delete todo modale */}
   
          <Modal
            isOpen={isOpenConfirmModal}
            closeModal={onCloseDeleteTodoModal} //  ده الزرار اللى اللى جوه المودل اللى بيقفلها اللى هو تحت منى بسطرين تلاته واللى اسمه  cancel
            //  ولو سألت نفسك لى ال  closeModle  بتاخد  closeConfirmModal  مش بتاخد ال  isOpenConfirmModal  هقولك عشان المودل مفيهاش 
            // غير زرار للقفل فقط ومفيش للفتح طبعا ولو طلعت فوق فى الكود هتلاقى فانكشن زى دى بتفتح المودل 
            // وعلى فكره المودل مش بيفتح ولا بيقفل غير بناء على ال  isOpenConfirmModale  ولكن احنا بنبعت الفانكشن  closeConfi.....
            //  لانها برضه بتدى false  لل  isOpenConfir....  
            title="Are you sure you want to remove this Product from your Store?"
            description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
          >
            <div className="flex items-center space-x-3">
              <Button isLoading={isLoadingDeleteTodo}  onClick={removeToDoMethod}  className="bg-[#c2344d] hover:bg-red-800" >
                Yes, remove
              </Button>
              <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={onCloseDeleteTodoModal}>
                Cancel
              </Button>
            </div>
          </Modal>
  
    </div>


  );
};

export default TodoList