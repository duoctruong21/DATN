import React, { useState } from "react";
import SongBar from "./SongBar";
import ReactPaginate from "react-paginate";
import ListSongItem from "./ListSongItem";
import "../../../assets/scss/user/c__listhotsong.scss";
import Footer from "./Footer";

function ListHotSong() {
  const [pageNumber, setPageNumber] = useState(0);
  const songsPerPage = 5;
  const pagesVisited = pageNumber * songsPerPage;
  const pageCount = Math.ceil(10 / songsPerPage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const songs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="listhotsong">
      <div className="listhotsong__wapper">
        {songs
          .slice(pagesVisited, pagesVisited + songsPerPage)
          .map((song, index) => (
            <div
              className="listhotsong__song"
              key={index}>
              <ListSongItem />
            </div>
          ))}
      </div>
      <div className="listhotsong__page">
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

export default ListHotSong;
