import React, { useState, useEffect } from "react";
import SongBar from "./SongBar";
import Footer from "./Footer";
import "../../../assets/scss/user/c__listtopsong.scss";
import axios from "axios";
import PlaySong from "./PlaySong";

function ListTopsong() {
  // lấy dữ liệu
  const urlSong = "https://localhost:7122/ranked-song";
  const [songs, setSong] = useState([]);
  const [idSong, setIdSong] = useState(0);

  useEffect(()=>{
    axios
      .get(urlSong)
      .then((response) => {
        setSong(response.data);
      })
      .catch((error) => console.log(error));
  },[])

  const handlePlaySong = (idSong) => {
    setIdSong(idSong);
    setSong(idSong);
  };

  useEffect(() => {
    setIdSong(songs.id);
  }, [songs]);

  return (
    <div className="listtopsong">
      <div className="listtopsong__wapper">
        <div className="listtopsong__wapper__main">
          <p>Ranked Song</p>
        </div>
      </div>
      <SongBar dataSongBar={songs} />
      
      <Footer />
      <PlaySong dataForm ={songs} />
    </div>
  );
}

export default ListTopsong;
