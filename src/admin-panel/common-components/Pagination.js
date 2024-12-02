
import React from 'react'
import './Pagination.scss'

const Pagination = ({ totalItems, currentPage, setCurrentPage, pageSize, selectPageSize }) => {


  const totalNumberOfPages = Math.ceil(totalItems / pageSize);

  const maxVisibleButtons = 5;

  const pageDown = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const pageUp = () => {
    if (currentPage !== totalNumberOfPages) {
      setCurrentPage(currentPage + 1)
    }
  }


  let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
  let endPage = Math.min(totalNumberOfPages, startPage + maxVisibleButtons - 1);

  if (endPage - startPage + 1 < maxVisibleButtons) {
    startPage = Math.max(1, endPage - maxVisibleButtons + 1);
  }

  const pageButtons = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <>
      {totalItems > 0 &&
        <div className="pagination-box">
          <div className='lhs'>
            <p>Items per page: </p>
           
           
            <select className="form-select form-select-sm"
             aria-label="Items per page" value={pageSize} onChange={(e) => selectPageSize(e.target.value)}>

              <option value={12} selected>12</option>

              <option value={24} >24</option>

              <option value={60} >60</option>

            </select>

            <p>{((currentPage-1)*pageSize)+1} to {Math.min(currentPage*pageSize,totalItems)} of {totalItems} Items </p>
          </div>
          <div className='rhs'>
            <button className="left-btn" onClick={pageDown}>
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 9L1 5L5 1" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div className='d-flex'>
            {pageButtons.map((pageNumber) => (
              <button 
                className={`number-btn ${currentPage === pageNumber ? 'active' : ''}`}
                onClick={() => setCurrentPage(pageNumber)}
                key={pageNumber}
              >
                {pageNumber}
              </button>
            ))}
            </div>
            

            <button className="right-btn" onClick={pageUp}>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L1 9" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            </button>
          </div>

        </div>
      }
    </>
  )
}

export default Pagination