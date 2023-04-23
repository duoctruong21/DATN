import React from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../../../assets/scss/user/c__playsong.scss";

function PlaySong() {
  return (
    <div className="playsong">
      <div className="playsong__wapper">
        <div className="playsong__main">
          <AudioPlayer src="https://firebasestorage.googleapis.com/v0/b/music-52086.appspot.com/o/fileMp3%2F04db3bdc-eddf-4baa-b270-19e6b01cbe75.mp3?alt=media&token=9f674e88-ebdc-46db-b905-389baec58048" />
        </div>
      </div>
    </div>
  );
}

export default PlaySong;
