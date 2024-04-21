import { useEffect, useState } from "react";
import { usePagination } from "./usePagination";

const Pagination = ({
  onPageChange,
  totalPageCount,
  siblingCount = 1,
  currentPage = 1,
  pageSize = 10,
  totalElements,
}) => {
  const paginationRange =
    usePagination({
      currentPage,
      totalPageCount,
      siblingCount,
    }) || [];

  const DOTS = "...";

  const [lastPage, setLastPage] = useState(
    paginationRange[paginationRange.length - 1]
  );

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  useEffect(() => {
  //   console.log(paginationRange);
  //   console.log(totalPageCount, siblingCount, currentPage);
  }, [totalPageCount, siblingCount, currentPage]);

  return (
    <div className="flex gap-2 items-center">
      {/* {!(currentPage === 0 || paginationRange.length < 2) && (
        <div className="flex gap-1 text-[#2d5a96] text-sm">
          <span>Showing</span>
          <span>{(currentPage - 1) * pageSize + 1}</span>
          <span>to</span>
          <span>
            {totalElements < currentPage * pageSize
              ? totalElements
              : currentPage * pageSize}
          </span>
          <span>of</span>
          <span>{totalElements}</span>
          <span>entries</span>
        </div>
      )} */}
      {(currentPage === 0 || paginationRange.length < 2) && <></>}
      {!(currentPage === 0 || paginationRange.length < 2) && (
        <ul className={"flex list-none gap-3 justify-end p-2 text-center"}>
          <li
            className={currentPage === 1 ? "hidden" : " cursor-pointer"}
            onClick={onPrevious}
          >
            <div className={"pt-1 pb-1"}>
              <svg
                className="w-6 h-6 text-[#2d5a96] dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h14M5 12l4-4m-4 4 4 4"
                />
              </svg>
            </div>{" "}
          </li>
          {paginationRange.map((pageNumber) => {
            if (pageNumber === DOTS) {
              return <li className={""}>&#8230;</li>;
            }

            return (
              <li
                className={
                  pageNumber === currentPage
                    ? "bg-[#2d5a96] pt-1 pb-1 pl-2 pr-2 text-white rounded-sm"
                    : "pt-1 pb-1 pl-2 pr-2  cursor-pointer"
                }
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </li>
            );
          })}
          <li
            className={lastPage === currentPage ? "hidden" : " cursor-pointer"}
            onClick={onNext}
          >
            <div className={"pt-1 pb-1"}>
              {" "}
              <svg
                className="w-6 h-6 text-blue dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Pagination;
