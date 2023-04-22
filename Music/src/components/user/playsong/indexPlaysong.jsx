import React from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../../../assets/scss/user/c__indexPlaysong.scss";

function indexPlaysong() {
  return (
    <div className="indexPlaysong">
      <div className="indexPlaysong__wapper">
        <div className="indexPlaysong__main">
          <div className="indexPlaysong__main__block">
            <img
              className="indexPlaysong__main__block__img"
              src="https://firebasestorage.googleapis.com/v0/b/music-52086.appspot.com/o/images%2F0907502c-2e33-454a-8389-f2f06ca22751.png?alt=media&token=9b11e57b-fe40-4732-82a3-3b46116664f6"
            />
            <div className="indexPlaysong__main__block__info">
              <h2>Ngủ một mình | Hiếu thứ hai</h2>
              <p>The night</p>
            </div>
          </div>
          <div className="indexPlaysong__main__playsong">
            <AudioPlayer src="https://firebasestorage.googleapis.com/v0/b/music-52086.appspot.com/o/fileMp3%2F04db3bdc-eddf-4baa-b270-19e6b01cbe75.mp3?alt=media&token=9f674e88-ebdc-46db-b905-389baec58048" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default indexPlaysong;
