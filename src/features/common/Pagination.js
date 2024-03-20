import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ITEM_LIMIT_PER_PAGE } from "../../app/constants";

export default function Pagination({ page, setPage, handlePage, totalItems = 100 }) {
    const totalPage = totalItems / ITEM_LIMIT_PER_PAGE;
    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <div
            onClick={() => handlePage(page === 1 ? page : page - 1)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Previous
          </div>
          <div
            onClick={() => handlePage(page < totalPage ? page + 1 : page)}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Next
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{(page - 1) * ITEM_LIMIT_PER_PAGE + 1}</span> to <span className="font-medium">{(page * ITEM_LIMIT_PER_PAGE) > totalItems ? totalItems : (page * ITEM_LIMIT_PER_PAGE)}</span> of{" "}
              <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <div
                onClick={() => handlePage(page === 1 ? page : page - 1)}
                className="relative inline-flex box-border border-2 items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              {Array.from({ length: Math.ceil(totalPage) }).map((el, index) => (
                <div
                  key={index + 1}
                  onClick={e => handlePage(index + 1)}
                  aria-current="page"
                  className={`relative cursor-pointer border-2 hover:bg-indigo-600 hover:text-white z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${(index + 1) === page ? "bg-indigo-600 text-white z-10" : "text-gray-700"}`}
                >
                  {index + 1}
                </div>
              ))}
  
  
              <div
                onClick={() => handlePage(page < totalPage ? page + 1 : page)}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    )
  }