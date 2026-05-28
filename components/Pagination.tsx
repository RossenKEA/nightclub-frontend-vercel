import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Events pagination">
      {currentPage > 1 && (
        <Link
          href={`?page=${currentPage - 1}`}
          className="border border-white/30 px-5 py-3 font-bold uppercase tracking-widest hover:border-(--color-pink) hover:text-(--color-pink) focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--color-pink)"
        >
          Prev
        </Link>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`?page=${page}`}
          className={`border px-5 py-3 font-bold uppercase tracking-widest focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--color-pink) ${
            page === currentPage
              ? "border-(--color-pink) text-(--color-pink)"
              : "border-white/30 hover:border-(--color-pink) hover:text-(--color-pink)"
          }`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={`?page=${currentPage + 1}`}
          className="border border-white/30 px-5 py-3 font-bold uppercase tracking-widest hover:border-(--color-pink) hover:text-(--color-pink) focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--color-pink)"
        >
          Next
        </Link>
      )}
    </nav>
  );
}