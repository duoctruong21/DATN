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
  const token = localStorage.getItem("token");

  const urlAlbum = `https://localhost:7122/album/${alias}`;
  const [songs, setSong] = useState([]);
  const [name, setName] = useState("")
  const [id, setId] = useState(0);
  useEffect(()=>{
      axios
        .get(urlAlbum)
        .then((response) => {
          const dataSong = response.data;
          setId(dataSong.iduser);
          setName(dataSong.albumName);
        })
        .catch();
  },[])

  const urlSongByAlbum = `https://localhost:7122/albumuser/${alias}/${token}`;
  useEffect(()=>{
    axios
      .get(urlSongByAlbum)
      .then((response) => {
        setSong(response.data);
      })
      .catch();
  },[])

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
            <SongBar dataSongBar={songs} />
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
