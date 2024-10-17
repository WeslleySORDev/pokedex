import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";

type PaginationType = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  total_items: number;
  MAX_ITEMS_ON_PAGE: number;
};

export function Pagination({
  page,
  setPage,
  MAX_ITEMS_ON_PAGE,
  total_items,
}: PaginationType) {
  const pages = Math.ceil(total_items / MAX_ITEMS_ON_PAGE);
  const [pageInput, setPageInput] = useState<string>("1");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };
  const validatePageInput = () => {
    let page = parseInt(pageInput, 10);
    if (isNaN(page) || page < 1) {
      page = 1;
    } else if (page > pages) {
      page = pages;
    }
    setPageInput(page.toString());
    setPage(page);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      validatePageInput();
    }
  };
  const handleBlur = () => {
    validatePageInput();
  };
  useEffect(() => {
    setPageInput(page.toString());
  }, [page]);
  return (
    <ul className="flex items-center justify-between gap-4 p-2">
      <div className="flex items-center gap-1">
        <li>
          <button
            className="rounded bg-grayscale-white p-[7px] text-primary"
            onClick={() => setPage(1)}
            disabled={page === 1}
          >
            <CaretDoubleLeft size={16} />
          </button>
        </li>
        <li>
          <button
            className="rounded bg-grayscale-white p-[7px] text-primary"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <CaretLeft size={16} />
          </button>
        </li>
      </div>
      <li className="flex items-center gap-2 text-grayscale-white">
        <span>Page</span>
        <input
          type="number"
          value={pageInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          min={1}
          max={pages}
          className="h-8 w-8 rounded-sm bg-grayscale-white text-center text-primary"
        />
        <span>of {pages}</span>
      </li>
      <div className="flex items-center gap-1">
        <li>
          <button
            className="rounded bg-grayscale-white p-[7px] text-primary"
            onClick={() => setPage(page + 1)}
            disabled={page === pages}
          >
            <CaretRight size={16} />
          </button>
        </li>
        <li>
          <button
            className="rounded bg-grayscale-white p-[7px] text-primary"
            onClick={() => setPage(pages)}
            disabled={page === pages}
          >
            <CaretDoubleRight size={16} />
          </button>
        </li>
      </div>
    </ul>
  );
}
