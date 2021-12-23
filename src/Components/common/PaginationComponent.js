import React, { useEffect, useState } from "react";
import "./style.css";
import http from "../../services/httpServices";

const renderData = (data) => {
    console.log(data)
  return (
    <ul>
      {data.response.data.map((todo, index) => {
        return <li key={index}>{todo.name}</li>;
      })}
    </ul>
  );
};


function PaginationComponent() {
  const [data, setData] = useState([]);
  // const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  // const [itemsPerPage, setitemsPerPage] = useState(5);
  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }
  useEffect(() => {
      const perPage =5
    fetch(`${http.setURL()}/category/lists?per_page=${perPage}`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };
   
   const renderPageNumbers = pages.map((number) => { 
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    
  });
  
    const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  
    let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }
  

  return (
    <>
      <h1>Todo List</h1> <br />
      {renderData(data)}

      <ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage === pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>

    </>
  );
}

export default PaginationComponent;