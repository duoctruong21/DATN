import React, { useState } from "react";
import SongBar from "./SongBar";
import ReactPaginate from "react-paginate";
import Footer from "./Footer";
import "../../../assets/scss/user/c__listtopsong.scss";

function ListTopsong() {
  const [pageNumber, setPageNumber] = useState(0);
  const songsPerPage = 7;
  const pagesVisited = pageNumber * songsPerPage;
  const pageCount = Math.ceil(10 / songsPerPage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const songs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="listtopsong">
      <div className="listtopsong__wapper">
        <div className="listtopsong__wapper__main">
          <p>Ranked Song</p>
        </div>
      </div>
      <div className="listtopsong__wapper__song">
        {songs
          .slice(pagesVisited, pagesVisited + songsPerPage)
          .map((song, index) => (
            <div key={index}>
              <SongBar />
            </div>
          ))}
      </div>
      <div className="listtopsong__wapper__page">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
      <Footer />
    </div>
  );
}

export default ListTopsong;
