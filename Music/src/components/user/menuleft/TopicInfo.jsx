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

  const urlAlbum = `https://localhost:7122/topics/${alias}`;
  const [songs, setSong] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState(0);
  useEffect(() => {
    axios
      .get(urlAlbum)
      .then((response) => {
        const dataSong = response.data;
        setSong(dataSong)
        setName(dataSong[0].topicname);

      })
      .catch();
  }, []);

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
          <div className="album__wapper__main__page"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Album;
