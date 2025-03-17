import React from "react";

interface Props {
  totalPages: number;
  currentPage: number;
  onPageSelect: (page: number) => void;
}

function PageSelector(props: Props) {
  const pageNumbers = [];

  if (props.totalPages <= 10) {
    // Show all pages if total is small
    for (let i = 1; i <= props.totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Always include first & last page
    pageNumbers.push(1);

    let start = Math.max(2, props.currentPage - 2);
    let end = Math.min(props.totalPages - 1, props.currentPage + 2);

    if (start > 2) pageNumbers.push("...");
    for (let i = start; i <= end; i++) pageNumbers.push(i);
    if (end < props.totalPages - 1) pageNumbers.push("...");

    pageNumbers.push(props.totalPages);
  }

  return (
    <nav className="pb-2">
      <ul className="pagination justify-content-center my-3">
        {/* Previous Button */}
        <li
          className={`page-item ${props.currentPage === 1 ? "disabled" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => props.onPageSelect(props.currentPage - 1)}
          >
            Previous
          </button>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((num, index) => (
          <li
            key={index}
            className={`page-item ${num === props.currentPage ? "active" : ""}`}
          >
            {num === "..." ? (
              <span className="page-link">...</span>
            ) : (
              <button
                className="page-link"
                onClick={() =>
                  props.onPageSelect(parseInt(num.toString()) || 1)
                }
              >
                {num}
              </button>
            )}
          </li>
        ))}

        {/* Next Button */}
        <li
          className={`page-item ${
            props.currentPage === props.totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => props.onPageSelect(props.currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default PageSelector;
