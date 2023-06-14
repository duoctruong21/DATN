import React, { useEffect, useState } from "react";
import "../../../assets/scss/user/c__home.scss";
import ListCategory from "./ListCategory";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ListSongItem from "./ListSongItem";

function SearchIndex() {
  const [songs, setSong] = useState([]);
  const history = useNavigate();

  const { content } = useParams();
  const url = `https://localhost:7122/search/${content}`;
  console.log(content)
  useEffect(() => {
    axios
      .get(url)
      .then((response) => setSong(response.data))
      .catch();
  }, [content]);

  const [songytbs, setSongytb] = useState([]);
  //const urlytb = `https://localhost:7122/searchusingapiytb/${content}`;

  // useEffect(() => {
  //   axios
  //     .get(urlytb)
  //     .then((response) => setSongytb(response.data))
  //     .catch();
  // }, []);

  return (
    <div className="home">
      <div className="main">
        <ListSongItem dataSongItem={songs} />
        
        {/* <ListSongItem dataSongItem={songytbs} /> */}
      </div>
    </div>
  );
}

export default SearchIndex;
