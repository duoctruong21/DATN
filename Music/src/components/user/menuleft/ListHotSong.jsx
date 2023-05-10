import React, { useState } from "react";
import SongBar from "./SongBar";
import ReactPaginate from "react-paginate";
import ListSongItem from "./ListSongItem";
import "../../../assets/scss/user/c__songitem.scss";
import "../../../assets/scss/user/c__listhotsong.scss";
import Footer from "./Footer";
import axios from "axios";

function ListHotSong() {
  // lấy dữ liệu
  const urlSong = "https://localhost:7122/list-hot-song"
  const [songs, setSong] = useState([])
  // phân trang
  const [pageNumber, setPageNumber] = useState(0);
  const songsPerPage = 10;
  const pagesVisited = pageNumber * songsPerPage;
  const pageCount = Math.ceil(songs.length / songsPerPage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  axios.get(urlSong).then((response)=>{
    setSong(response.data)
  }).catch((error)=>console.log(error))

  return (
    <div className="listhotsong">
      <div className="listhotsong__wapper">
        {songs
          .slice(pagesVisited, pagesVisited + songsPerPage)
          .map((song, index) => (
            <div
              className="listhotsong__song"
              key={index}>
              <div
                href="#"
                className="SongItem">
                <div className="SongItem__item">
                  <img
                    src={song.fileImg}
                    alt=""
                  />
                  <div className="SongItem__item__info">
                    <a
                      className="line1"
                      placeholder={song.songName}
                      href={`/song/${song.linksong}`}>
                      {song.songName}
                    </a>
                    <a
                      className="line1"
                      placeholder={song.albumName}
                      href={`/album/${song.linkalbum}`}>
                      <p>{song.albumName}</p>
                    </a>
                    <a
                      className="line1"
                      placeholder={song.singerName}
                      href={`/singer/${song.linksinger}`}>
                      <p>{song.singerName}</p>
                    </a>
                  </div>
                </div>
              </div>
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
