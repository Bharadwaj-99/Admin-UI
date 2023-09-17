import React from 'react';

function Pagination({
  currentPage,
  numberOfPages,
  goToFirstPage,
  goToPrevPage,
  goToNextPage,
  goToLastPage,
  isEditing,
  moveToPage,
}) {
  return (
    <div className='pagination'>
      <button
        disabled={currentPage === 0 || isEditing}
        onClick={() => goToFirstPage()}
      >
        &lt;&lt;
      </button>
      <button
        disabled={currentPage === 0 || isEditing}
        onClick={() => goToPrevPage()}
      >
        &lt;
      </button>
      {Array.from({ length: numberOfPages }, (_, index) => (
        <span key={index}>
          <button
            className={currentPage === index ? "active" : ""}
            disabled={currentPage === index || isEditing}
            onClick={() => moveToPage(index)}
          >
            {index + 1}
          </button>
        </span>
      ))}
      <button
        disabled={currentPage + 1 === numberOfPages || isEditing}
        onClick={() => goToNextPage()}
      >
        &gt;
      </button>
      <button
        disabled={currentPage + 1 === numberOfPages || isEditing}
        onClick={() => goToLastPage()}
      >
        &gt;&gt;
      </button>
    </div>
  );
}

export default Pagination;

