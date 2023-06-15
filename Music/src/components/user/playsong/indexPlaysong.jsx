import React, { useEffect, useState } from "react";

import "../../../assets/scss/user/c__indexPlaysong.scss";
import PlaySong from "../menuleft/PlaySong";
import axios from "axios";

function indexPlaysong(props) {
  const [song, setSong] = useState([]);
  const [songPlay, setSongPlay] = useState([]);
  useEffect(() => {
    setSong(props.datasong);
  }, [props.datasong]);

  useEffect(() => {
    axios
      .get(`https://localhost:7122/playsong/${props.datasong}`)
      .then((response) => setSongPlay(response.data))
      .catch();
  }, [props.datasong]);
  console.log(songPlay);

  return (
    <div className="indexPlaysong">
      <div className="indexPlaysong__wapper">
        <div className="indexPlaysong__main">
          <div className="indexPlaysong__main__block">
            <img
              className="indexPlaysong__main__block__img"
              src={
                songPlay.fileImg != ""
                  ? songPlay.fileImg
                  : "https://i.pinimg.com/564x/41/07/4b/41074b335e04b4432918ea6dd636b2be.jpg"
              }
            />
            <div className="indexPlaysong__main__block__info">
              <h2>
                {songPlay.songName} | {songPlay.singerName}
              </h2>
              <p>{songPlay.albumName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default indexPlaysong;
