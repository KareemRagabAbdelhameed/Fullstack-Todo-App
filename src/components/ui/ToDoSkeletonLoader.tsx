import React from 'react'

export default function ToDoSkeletonLoader() {
  return (
    <div>
      
      
<div role="status" className="max-w-xl p-4 space-y-5 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700 m-auto ">
    <div className="flex items-center justify-between">
        <div>
            <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>

        <div>

            <div className="h-6 bg-gray-300 rounded-md dark:bg-gray-700 w-16  mb-2.5"></div>
            <div className="h-6 bg-gray-300 rounded-md dark:bg-gray-700 w-16"></div>
        
        </div>

    </div>

    <div className="flex items-center justify-between">
        <div>
            <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div>

            <div className="h-6 bg-gray-300 rounded-md dark:bg-gray-700 w-16  mb-2.5"></div>
            <div className="h-6 bg-gray-300 rounded-md dark:bg-gray-700 w-16"></div>
        
        </div>
    </div>

    <div className="flex items-center justify-between">
        <div>
            <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div>

            <div className="h-6 bg-gray-300 rounded-md dark:bg-gray-700 w-16  mb-2.5"></div>
            <div className="h-6 bg-gray-300 rounded-md dark:bg-gray-700 w-16"></div>
        
        </div>
    </div>
 
  

  
    <span className="block text-center ">Loading...</span>
</div>

    </div>
  )
}
