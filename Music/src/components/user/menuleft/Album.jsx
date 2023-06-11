import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import SongBar from "./SongBar";
import "../../../assets/scss/user/c__album.scss";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import axios from "axios";

function Album() {
  //
  const { alias } = useParams();
  const urlAlbum = `https://localhost:7122/album/${alias}`;
  const [songs, setSong] = useState([]);
  const [name, setName] = useState([])
  const [id, setId] = useState([]);
  useEffect(()=>{
    axios
      .get(urlAlbum)
      .then((response) => {
        const dataSong = response.data;
        setId(dataSong.id);
        setName(dataSong.albumName);
      })
      .catch();
  },[])

  const urlSongByAlbum = `https://localhost:7122/songbyalbum/${id}`;
  useEffect(()=>{
    axios
      .get(urlSongByAlbum)
      .then((response) => {
        setSong(response.data);
      })
      .catch();
  })

  // phân trang
  const [pageNumber, setPageNumber] = useState(0);
  const songsPerPage = 10;
  const pagesVisited = pageNumber * songsPerPage;
  const pageCount = Math.ceil(songs.length / songsPerPage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="album">
      <div className="album__wapper">
        <div className="album__wapper__main">
          <div className="album__wapper__main__info">
            <h2>{name}</h2>
          </div>
          <div className="album__wapper__main__song">
            {songs
              .slice(pagesVisited, pagesVisited + songsPerPage)
              .map((song, index) => (
                <div key={index}>
                  <div
                    className="songBar"
                    key={index}>
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
                            <a href="#">
                              <h2>{song.songName}</h2>
                            </a>
                            <a href={`/singer/${alias}`}>
                              <p>{name}</p>
                            </a>
                          </div>
                        </div>
                        <div className="songBar__wapper__main__album">
                          <p>{song.albumName}</p>
                        </div>
                        <div className="songBar__wapper__main__setting">
                          <a href="#">Play</a>
                          <a href="#">Download</a>
                          {/* <AudioPlayer src={song.mp3} /> */}
                        </div>
                      </div>
                    </div>
                  </div>
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
