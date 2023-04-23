import React from "react";

import "../../../assets/scss/user/c__indexPlaysong.scss";
import PlaySong from "../menuleft/PlaySong";

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
          <PlaySong />
        </div>
      </div>
    </div>
  );
}

export default indexPlaysong;
