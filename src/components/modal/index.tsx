import { Transition, Dialog } from "@headlessui/react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
}

export const ModalComponent = ({ isOpen, closeModal, title, children, width }: Props) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 overflow-hidden" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed overflow-y-scroll py-10 inset-0">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`${width ? width : "lg:w-7/12"} scrollbar flex rounded-15xl flex-col items-start relative transform transition-all bg-white py-5 pb-7 px-8`}>
                <div onClick={closeModal} className="fixed cursor-pointer hover:bg-primary transition-all duration-150 right-[0px] top-[-32px]">
                  <LockClosedIcon />
                </div>
                <Dialog.Title
                  as="h3"
                  className="text-base text-center font-bold text-black font-ubuntu"
                >
                  {title}
                </Dialog.Title>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};