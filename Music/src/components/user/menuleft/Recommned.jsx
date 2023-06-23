import React, { useEffect, useState } from "react";

import "../../../assets/scss/user/c__listcategory.scss";
import SongBar from "./SongBar";
import axios from "axios";

function Recommned() {
  const token = localStorage.getItem("token");
  console.log(token);

  const [song2, setSong2] = useState([]);
  const [song1, setSong1] = useState([]);
  const [song, setSong] = useState([]);
  useEffect(() => {
    if (token == null) {
      axios
        .get(`http://truongduoc027-001-site1.dtempurl.com/recommendtopsong`)
        //.get(`https://localhost:7122/recommendtopsong`)
        .then((response) => setSong(response.data))
        .catch();
    } else {
      axios
        .get(`http://truongduoc027-001-site1.dtempurl.com/recommenduser/${token}`)
        //.get(`https://localhost:7122/recommenduser/${token}`)
        .then((response) => setSong(response.data))
        .catch();
      // axios
      //   .get(`https://localhost:7122/recommend-first-login/${token}`)
      //   .then((response) => setSong2(response.data))
      //   .catch();
    }
  }, [token]);

  
  // useEffect(() => {
  //   if (song1.length > 0 && song2.length > 0) {
  //     const mergedArray = [...song1, ...song2]; // Ghép hai mảng lại với nhau
  //     const uniqueSongs = mergedArray.reduce((unique, song) => { // loc cac phan tu trung
  //       const index = unique.findIndex(
  //         (s) =>
  //           s.songName === song.songName && s.singerName === song.singerName
  //       );
  //       if (index === -1) {
  //         unique.push(song);
  //       }
  //       return unique;
  //     }, []);
  //     setSong(uniqueSongs)
  //   }
  // }, [song1, song2]);

  return (
    <div className="listcategory">
      <div className="listcategory__wapper">
        <div className="listcategory__main">
          <div className="listcategory__main__header">
            <h2 className="listcategory__main__title">Recommend by history</h2>
          </div>
          <SongBar dataSongBar={song} />
        </div>
      </div>
      {/* <PlaySong dataForm={itemSong} /> */}
    </div>
  );
}

export default Recommned;
