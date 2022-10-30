/* eslint-disable jsx-a11y/anchor-is-valid */
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  currentPage: number;
  totalPage: number;
  // eslint-disable-next-line no-unused-vars
  onChangePage: (page: number) => void;
}

const Pagination = ({ currentPage, totalPage, onChangePage }: Props) => (
  <nav className="flex items-center justify-between px-4 sm:px-0">
    <div className="-mt-px flex w-0 flex-1">
      {currentPage !== 1 && (
        <a
          onClick={() => onChangePage(currentPage - 1)}
          className="inline-flex cursor-pointer items-center pt-2 pr-1 text-sm font-medium text-stk-grey-500 duration-300 hover:border-[#1289D9] hover:text-stk-grey-200"
        >
          <FaChevronLeft color={"#989898"} className="mr-[0.6rem] ml-4" />
          Previous
        </a>
      )}
    </div>

    <div className="hidden md:flex">
      {currentPage > 3 && (
        <a
          onClick={() => onChangePage(1)}
          className="inline-flex cursor-pointer items-center border-t-2 border-transparent px-4 pt-2 text-sm font-medium text-stk-grey-500 duration-300 hover:border-[#1289D9] hover:text-stk-grey-200"
        >
          {1}
        </a>
      )}
      {currentPage > 3 && (
        <span className="inline-flex select-none items-center border-t-2 border-transparent px-4 pt-2 text-sm font-medium text-gray-500">
          ...
        </span>
      )}

      <div className="flex md:-mt-px">
        {currentPage - 2 !== 0 && currentPage === totalPage && totalPage > 1 && (
          <a
            onClick={() => onChangePage(currentPage - 2)}
            className="inline-flex cursor-pointer items-center border-t-2 border-transparent px-4 pt-2 text-sm font-medium text-stk-grey-500 duration-300 hover:border-[#1289D9] hover:text-stk-grey-200"
          >
            {currentPage - 2}
          </a>
        )}
        {currentPage - 1 !== 0 && (
          <a
            onClick={() => onChangePage(currentPage - 1)}
            className="inline-flex cursor-pointer items-center border-t-2 border-transparent px-4 pt-2 text-sm font-medium text-stk-grey-500 duration-300 hover:border-[#1289D9] hover:text-stk-grey-200"
          >
            {currentPage - 1}
          </a>
        )}
        <a
          onClick={() => onChangePage(currentPage)}
          className="inline-flex cursor-pointer items-center border-t-2 border-[#004975] px-4 pt-2 text-sm font-medium text-stk-green duration-300"
          aria-current="page"
        >
          {currentPage}
        </a>
        {currentPage + 1 <= totalPage && totalPage > 1 && (
          <a
            onClick={() => onChangePage(currentPage + 1)}
            className="inline-flex cursor-pointer items-center border-t-2 border-transparent px-4 pt-2 text-sm font-medium text-stk-grey-500 duration-300 hover:border-[#1289D9]"
          >
            {currentPage + 1}
          </a>
        )}
        {currentPage === 1 && totalPage > 2 && (
          <a
            onClick={() => onChangePage(currentPage + 2)}
            className="inline-flex cursor-pointer items-center border-t-2 border-transparent px-4 pt-2 text-sm font-medium text-stk-grey-500 duration-300 hover:border-[#1289D9] hover:text-stk-grey-200"
          >
            {currentPage + 2}
          </a>
        )}
      </div>

      {totalPage > 7 && currentPage < totalPage - 1 && (
        <span className="inline-flex select-none items-center border-t-2 border-transparent px-4 pt-2 text-sm font-medium text-gray-500">
          ...
        </span>
      )}
      {totalPage > 7 && currentPage < totalPage - 1 && (
        <a
          onClick={() => onChangePage(totalPage)}
          className="inline-flex cursor-pointer items-center border-t-2 border-transparent px-4 pt-2 text-sm font-medium text-stk-grey-500 duration-300 hover:border-[#1289D9] hover:text-stk-grey-200"
        >
          {totalPage}
        </a>
      )}
    </div>

    <div className="-mt-px flex w-0 flex-1 justify-end">
      {totalPage > currentPage && (
        <a
          onClick={() => onChangePage(currentPage + 1)}
          className="inline-flex cursor-pointer items-center pt-2 pl-1 text-sm font-medium text-stk-grey-500 duration-300 hover:border-[#1289D9] hover:text-stk-grey-200"
        >
          Next
          <FaChevronRight color={"#989898"} className="mr-[0.6rem] ml-4" />
        </a>
      )}
    </div>
  </nav>
);

export default Pagination;
