import React, { useEffect, useState } from "react";

import "../../../assets/scss/user/c__listcategory.scss";
import SongBar from "./SongBar";
import axios from "axios";

function Recommned() {
  const token = localStorage.getItem("token");
  console.log(token)

  const [song, setSong] = useState([]);
  useEffect(() => {
    if (token == null) {
      axios
        .get(`https://localhost:7122/recommendtopsong`)
        .then((response) => setSong(response.data))
        .catch();
    } else {
      axios
        .get(`https://localhost:7122/recommenduser/${token}`)
        .then((response) => setSong(response.data))
        .catch();
    }
  },[token]);
  console.log(song)
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
