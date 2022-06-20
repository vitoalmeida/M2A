import { HiOutlineExclamation, HiOutlineX } from "react-icons/hi";

interface Props {
  title: string;
  description: string;
  actionButton: () => any;
  closeModal: () => any;
}

const WaningModal = ({
  title,
  description,
  closeModal,
  actionButton,
}: Props) => {
  return (
    <div className="relative bg-white rounded-lg px-4 sm:px-6 pb-8 sm:pb-0 pt-5 text-left overflow-hiddentransform transition-all sm:my-8 sm:max-w-lg sm:w-full">
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <HiOutlineExclamation
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <span className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </span>
          <div className="mt-2">
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => {
            actionButton();
            closeModal();
          }}
        >
          Confirmar
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={closeModal}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
export default WaningModal;
