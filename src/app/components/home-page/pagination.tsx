import { Dispatch, SetStateAction } from "react";

type PaginationType = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export function Pagination({ page, setPage }: PaginationType) {
  return (
    <div className="flex items-center justify-around gap-4 p-2">
      <button
        className="rounded bg-grayscale-white px-4 py-2 text-primary"
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous
      </button>
      <span>{page + 1}</span>
      <button
        className="rounded bg-grayscale-white px-4 py-2 text-primary"
        onClick={() => {
          setPage((old) => old + 1);
        }}
      >
        Next
      </button>
    </div>
  );
}
