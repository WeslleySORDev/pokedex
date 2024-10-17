import { Dispatch, SetStateAction } from "react";

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
  const MAX_PAGES_ON_SCREEN = 3;
  const MAX_LEFT = (MAX_PAGES_ON_SCREEN - 1) / 2;
  const pages = Math.ceil(total_items / MAX_ITEMS_ON_PAGE);
  const maxFirst = Math.max(pages - (MAX_PAGES_ON_SCREEN - 1), 1);
  const first = Math.min(Math.max(page - MAX_LEFT, 1), maxFirst);
  return (
    <ul className="flex items-center justify-around gap-4 p-2">
      <li>
        <button
          className="rounded bg-grayscale-white px-4 py-2 text-primary"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Anterior
        </button>
      </li>
      {Array.from({ length: Math.min(MAX_PAGES_ON_SCREEN, pages) })
        .map((_, index) => index + first)
        .map((index) => (
          <li key={index}>
            <button
              onClick={() => setPage(index)}
              className={index === page ? "border border-white px-4 py-2 rounded" : ""}
            >
              {index}
            </button>
          </li>
        ))}
      <li>
        <button
          className="rounded bg-grayscale-white px-4 py-2 text-primary"
          onClick={() => setPage(page + 1)}
          disabled={page === pages}
        >
          Próxima
        </button>
      </li>
    </ul>
  );
}
