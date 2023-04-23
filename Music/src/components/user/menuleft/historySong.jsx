import React, { useState } from "react";
import SongBar from "./SongBar";
import ReactPaginate from "react-paginate";
import "../../../assets/scss/user/c__historysong.scss";
import Footer from "./Footer";

function HistorySong() {
  const [pageNumber, setPageNumber] = useState(0);
  const songsPerPage = 5;
  const pagesVisited = pageNumber * songsPerPage;
  const pageCount = Math.ceil(10 / songsPerPage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const songs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="historysong">
      <div className="historysong__wapper">
        <div className="historysong__wapper__main">
          <p>Song</p>
          <p>Album</p>
          <p>Setting</p>
        </div>
      </div>
      <div className="historysong__wapper__song">
        {songs
          .slice(pagesVisited, pagesVisited + songsPerPage)
          .map((song, index) => (
            <div key={index}>
              <SongBar />
            </div>
          ))}
      </div>
      <div className="historysong__wapper__page">
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

export default HistorySong;
