import React, { useEffect, useState } from "react";
import SongBar from "./SongBar";
import ReactPaginate from "react-paginate";
import ListSongItem from "./ListSongItem";
import "../../../assets/scss/user/c__songitem.scss";
import "../../../assets/scss/user/c__listhotsong.scss";
import Footer from "./Footer";
import axios from "axios";
import PlaySong from "./PlaySong";

function ListHotSong() {
  // lấy dữ liệu
  const urlSong = "https://localhost:7122/list-hot-song"
  const [songs, setSong] = useState([])

  useEffect(()=>{
    axios
      .get(urlSong)
      .then((response) => {
        setSong(response.data);
      })
      .catch((error) => console.log(error));
  },[])

  return (
    <div className="listhotsong">
      <div className="listhotsong__wapper">
        <ListSongItem dataSongItem = {songs} />
      </div>
      <Footer />
      {/* <PlaySong dataForm = {songs} /> */}
    </div>
  );
}

export default ListHotSong;
