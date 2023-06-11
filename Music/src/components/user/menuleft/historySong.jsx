import React, { useState } from "react";
import SongBar from "./SongBar";
import ReactPaginate from "react-paginate";
import "../../../assets/scss/user/c__historysong.scss";
import Footer from "./Footer";

function HistorySong() {
  const [item,setItem] = useState([])
  const [pageNumber, setPageNumber] = useState(0);
  const songsPerPage = 5;
  const pagesVisited = pageNumber * songsPerPage;
  const pageCount = Math.ceil(10 / songsPerPage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };
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
        {item
          .slice(pagesVisited, pagesVisited + songsPerPage)
          .map((song, index) => (
            <div key={index}>
              <div className="songBar">
                <div className="songBar__wapper">
                  <div className="songBar__wapper__index">
                    <p>{song.title}</p>
                  </div>
                  <div className="songBar__wapper__main">
                    <div className="songBar__wapper__main__infoSong">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/music-52086.appspot.com/o/images%2F0b5f9558-efae-4cf9-b0d2-c537ccb59e2d.jpg?alt=media&token=b94e0a54-3950-4304-847a-6958446dc190"
                        alt=""
                      />
                      <div className="songBar__wapper__main__infoSong__info">
                        <a href="#">
                          <h2>Độ tộc 2</h2>
                        </a>
                        <a href="/infomation-singer">
                          <p>Mixi</p>
                        </a>
                      </div>
                    </div>
                    <div className="songBar__wapper__main__album">
                      <p>Độ tộc</p>
                    </div>
                    <div className="songBar__wapper__main__setting">
                      <a href="#">Play</a>
                      <a href="#">Download</a>
                      <a href="#">Delete</a>
                    </div>
                  </div>
                </div>
              </div>
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
