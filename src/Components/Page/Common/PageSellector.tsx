import React from "react";

interface Props {
  totalPages: number;
  currentPage: number;
  onPageSelect: (page: number) => void;
}

function PageSelector(props: Props) {
  return (
    <nav className="pb-2">
      <ul className="pagination justify-content-center my-3">
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
        {[...Array(props.totalPages)].map((_, i) => (
          <li
            key={i + 1}
            className={`page-item ${
              props.currentPage === i + 1 ? "active" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => props.onPageSelect(i + 1)}
            >
              {i + 1}
            </button>
          </li>
        ))}
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
