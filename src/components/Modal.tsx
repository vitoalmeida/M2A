import { Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { HiOutlineExclamation, HiOutlineX } from "react-icons/hi";

interface Props {
  showModal: boolean;
  onCloseModal?: () => void;
  children?: ReactNode;
  closeButton?: boolean;
  size?: string;
}

const Modal: React.FC<Props> = ({
  showModal,
  onCloseModal = () => null,
  children,
  closeButton,
  size = "full",
}: Props) => (
  <Transition.Root show={showModal} as={Fragment}>
    <Dialog as="div" className="relative z-50" onClose={() => onCloseModal()}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-[#000000A6] bg-opacity-75 transition-opacity" />
      </Transition.Child>

      <div className="fixed z-10 inset-0 overflow-y-auto py-20">
        <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel
              className={`relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all ${
                size === "small" && ""
              }`}
            >
              {closeButton && (
                <div className="z-50 hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => onCloseModal()}
                  >
                    <span className="sr-only">Close</span>
                    <HiOutlineX className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              )}
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
);

export default Modal;
