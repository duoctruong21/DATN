import React, { useState } from "react";
import SongBar from "./SongBar";
import ReactPaginate from "react-paginate";
import Footer from "./Footer";
import "../../../assets/scss/user/c__listtopsong.scss";
import axios from "axios";

function ListTopsong() {
  // lấy dữ liệu
  const urlSong = "https://localhost:7122/ranked-song";
  const [songs, setSong] = useState([]);
  // phân trang
  const [pageNumber, setPageNumber] = useState(0);
  const songsPerPage = 10;
  const pagesVisited = pageNumber * songsPerPage;
  const pageCount = Math.ceil(songs.length / songsPerPage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  axios
    .get(urlSong)
    .then((response) => {
      setSong(response.data);
    })
    .catch((error) => console.log(error));


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
              <div className="songBar">
                <div className="songBar__wapper">
                  <div className="songBar__wapper__index">
                    <p>{index + 1}</p>
                  </div>
                  <div className="songBar__wapper__main">
                    <div className="songBar__wapper__main__infoSong">
                      <img
                        src={song.fileImg}
                        alt=""
                      />
                      <div className="songBar__wapper__main__infoSong__info">
                        <a href={`/singer/${song.linksong}`}>
                          <h2>{song.songName}</h2>
                        </a>
                        <a href={`/singer/${song.linksinger}`}>
                          <p>{song.singerName}</p>
                        </a>
                      </div>
                    </div>
                    <div className="songBar__wapper__main__album">
                      <p>{song.albumName}</p>
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
