import React, { useState } from "react";
import SongBar from "./SongBar";
import ReactPaginate from "react-paginate";
import "../../../assets/scss/user/c__album.scss";
import Footer from "./Footer";

function Album() {
  const [pageNumber, setPageNumber] = useState(0);
  const songsPerPage = 5;
  const pagesVisited = pageNumber * songsPerPage;
  const pageCount = Math.ceil(10 / songsPerPage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const songs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="album">
      <div className="album__wapper">
        <div className="album__wapper__main">
          <div className="album__wapper__main__info">
            <h2>Độ tộc</h2>
          </div>
          <div className="album__wapper__main__song">
            {songs
              .slice(pagesVisited, pagesVisited + songsPerPage)
              .map((song, index) => (
                <div key={index}>
                  <SongBar />
                </div>
              ))}
          </div>
          <div className="album__wapper__main__page">
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
        </div>
      </div>
    </div>
  );
}

export default Album;
