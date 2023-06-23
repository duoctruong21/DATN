import React, { useEffect, useState } from "react";

import "../../../assets/scss/user/c__listcategory.scss";
import SongBar from "./SongBar";
import axios from "axios";

function Recommnedbycategory(props) {
  const token = localStorage.getItem("token");
  console.log(token);

  const [song, setSong] = useState([]);
  useEffect(() => {
    if (token == null) {
      axios
        .get(`http://truongduoc027-001-site1.dtempurl.com/recommendtopsong`)
        // .get(`https://localhost:7122/recommendtopsong`)
        .then((response) => setSong(response.data))
        .catch();
    } else {
      axios
        // .get(`https://localhost:7122/recommend-first-login/${token}`)
        .get(`http://truongduoc027-001-site1.dtempurl.com/recommend-first-login/${token}`)
        .then((response) => setSong(response.data))
        .catch();
    }
  }, [props.dataLoad,token]);
  console.log(song);
  return (
    <div className="listcategory">
      <div className="listcategory__wapper">
        <div className="listcategory__main">
          <div className="listcategory__main__header">
            <h2 className="listcategory__main__title">
              {token == null
                ? "Recommned by Top song"
                : "Recommend by category"}
            </h2>
          </div>
          <SongBar dataSongBar={song} />
        </div>
      </div>
      {/* <PlaySong dataForm={itemSong} /> */}
    </div>
  );
}

export default Recommnedbycategory;
