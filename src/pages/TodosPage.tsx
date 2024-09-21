// import { ChangeEvent, useState } from "react";
// import Button from "../components/ui/Button";
// import Paginator from "../components/ui/Paginator";

// import { faker } from "@faker-js/faker";
// import UseGetTodosQuery from "../hooks/UseGetTodosQuery";
// import axiosInstance from "../config/AxiosConfig";
// // import onGenerateTodos from "../lib/utils";

// function TodosPage () {
//   const storageKey = "loggedInUser";
//   const userDataString = localStorage.getItem(storageKey);
//   const userData = userDataString ? JSON.parse(userDataString) : null;
//   const [page,setPage] = useState<number>(1);
//   const [pageSize,setPageSize] = useState<number>(10);
//   const [sortBy,setSortBy] = useState<string>("DESC");
  
//   const { isLoading, data, isFetching } = UseGetTodosQuery({
//     queryKey: [`todos-page-${page}`,`${pageSize}`,`${sortBy}`],
//     url: `/todos?pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:${sortBy}`,
//     config: {
//       headers: {
//         Authorization: `Bearer ${userData.jwt}`,
//       },
//     },
//   });
//   // ** Handlers 
//   const onClickPrev =() =>{
//     setPage(prev => prev - 1 )
//   }
//   const onClickNext =() =>{
//     setPage(next => next + 1 )
//   }
//   const onChangePageSize = (e:ChangeEvent<HTMLSelectElement>) =>{
//     setPageSize(+e.target.value)
//   }
//   const onChangeSortBy = (e:ChangeEvent<HTMLSelectElement>) => {
//     setSortBy(e.target.value)
//   }
//   const onGenerateTodos = async () => {
//     //100 record
//     for (let i = 0; i < 100; i++) {
//       try {
//         const { data } = await axiosInstance.post(
//           `/todos`,
//           {
//             data: {
//               title: faker.word.words(5),
//               description: faker.lorem.paragraph(2),
//               user: [userData.user.id],
//             },
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${userData.jwt}`,
//             },
//           }
//         );
//         console.log(data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };


//   if (isLoading) return <h3>Loading...</h3>
//   return (
//     <section className="max-w-2xl mx-auto">
//       <div className="flex items-center justify-center space-x-2">
//         <Button size={"sm"} onClick={onGenerateTodos}>
//           Generate Todos
//         </Button>
//       </div>
//       <div className="flex items-center justify-center space-x-2 text-md"> 
//         <select onChange={onChangeSortBy} value={sortBy} className="border-2 border-indigo-600 rounded-md p-2">
//           <option disabled>
//             Sort by
//           </option>
//           <option value="ASC">Oldest</option>
//           <option value="DESC">Lastest</option>
//         </select>

//         <select onChange={onChangePageSize} value={pageSize} className="border-2 border-indigo-600 rounded-md p-2">
//           <option disabled>Page size</option>
//           <option value={10}>10</option>
//           <option value={50}>50</option>
//           <option value={100}>100</option>
//         </select>
//       </div>






//       <div className="my-20 space-y-6">
//           {data.data.length ? (
//           data.data.map(({id,attributes}: {id:number,attributes:{title:string}}) => (
//             <div key={id} className="flex items-center even:bg-gray-100 justify-between hover:bg-gray-100 duration-300 p-3 rounded-md">
//               <h3 className="w-full font-semibold">
//                 {id} - {attributes.title}
//               </h3>
//             </div>
//           ))
//         ) : (
//           <h3>No todos yet!</h3>
//         )}
//         <Paginator isLoading={isLoading || isFetching} page={page}pageCount={data.meta.pagination.pageCount}total={data.meta.pagination.total} onClickPrev={onClickPrev} onClickNext={onClickNext}/>
//       </div>
//     </section>

//   )
// }

// export default TodosPage


import UseGetTodosQuery from '../hooks/UseGetTodosQuery'
import ToDoSkeletonLoader from '../components/ui/ToDoSkeletonLoader'
import Paginator from '../components/ui/Paginator'
import { ChangeEvent, useState } from 'react'
import styles from './TodosPage.module.css'


export default function TodosPage() {

  

const selectStyle=`   
 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
         focus:border-blue-500 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`;
    const userDataStored=JSON.parse(` ${localStorage.getItem('StrapiToDoUserData')}`)
  const [currentPage,setCurrentPage]=useState<number> (1)
  const [pageSize,setPageSize]=useState<number> (5)
  const [sortBy,setSortBy]=useState<string> ('DESC')

function onClickNext () {
setCurrentPage( prev=> prev+1 )

}
function onClickPrev () {
setCurrentPage( prev=> prev-1 )

}

 function onchangeSelected (event:ChangeEvent<HTMLSelectElement>){


setPageSize(+event.target.value)
console.log(event.target.value );


 }

 function onchangeSelected_Sort (event:ChangeEvent<HTMLSelectElement>){

  setSortBy(event.target.value)


 }


    const {data,isLoading ,isFetching }= UseGetTodosQuery( {queryKey:[ `todosPaginated${currentPage}${pageSize}${sortBy}`],
        url:`/todos?pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}&sort=createdAt:${sortBy} `,
    
        config:{
    
              headers:{Authorization:`Bearer ${userDataStored.jwt}` }
         
        } } )
    
             console.log(" data,error,isLoading =>useQuery =>",{data});
    
    
      if(isLoading) 
        
        {
    
        return <>
        
        <ToDoSkeletonLoader />
        </> 
        }    


  return (

<div>

  <div className='flex justify-end gap-5 mb-5 ' >
  <form className="max-w-sm ">
  <select id="countries" className={` ${styles.arrowSelect} ${selectStyle}`} value={pageSize} onChange={ onchangeSelected }   >
    <option disabled> Page size </option>
    <option value="5">5</option>
    <option value="10">10</option>
    <option value="15">15</option>
    <option value="20">20</option>
  </select>
</form>
<form className="max-w-sm ">
  <select id="countries" className={` ${styles.arrowSelect} ${selectStyle}`} value={sortBy} onChange={ onchangeSelected_Sort }   >
    <option disabled> Sort By </option>
    <option value="ASC">Oldest</option>
    <option value="DESC">Latest</option>
   
  </select>
</form>
  </div>



    <div>
                {

                      data.data.length>0? data.data?.map(({attributes}:{id:number , attributes:{title:string}},index:number)=>{
                        return <div key={index} className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
                                    <h3 className="w-full font-semibold"> {index+1} - {attributes.title} </h3>
                                </div>
                



                              }  ) : <> <h1 className="text-center m-5 bg-black text-white" > No todo yet</h1> </>



                }

    <Paginator isLoading={isLoading ||isFetching } total={data.meta.pagination.total} currentPage={currentPage} pageCount={data&&data.meta.pagination.pageCount} onClickNext={onClickNext} onClickPrev={onClickPrev}  />
    </div>

</div>


  )
}
