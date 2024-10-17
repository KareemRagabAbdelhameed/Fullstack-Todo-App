import { Dialog } from '@headlessui/react'
import { ReactNode } from 'react'
// import { useState } from 'react'
interface IProps {
  isOpen : boolean,
  close : ()=>void,
  title? : string,
  children : ReactNode,
}
export default function Modal({isOpen,close,title,children}:IProps) {
  // let [isOpen, setIsOpen] = useState(true)

  // function open() {
  //   setIsOpen(true)
  // }

  // function close() {
  //   setIsOpen(false)
  // }

  return (
    <>
      {/* <Button
        onClick={open}
        className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Open dialog
      </Button> */}

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel
              
              className="w-full max-w-md rounded-xl bg-stone-300 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              {title}
              <Dialog.Title as="h3" className="text-base/7 font-medium text-white">
              </Dialog.Title>
              
              <div className="mt-4">
                {children}
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  )
}