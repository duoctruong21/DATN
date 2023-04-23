import React from "react";
import "../../../assets/scss/user/c__songbar.scss";

function SongBar() {
  return (
    <div className="songBar">
      <div className="songBar__wapper">
        <div className="songBar__wapper__index">
          <p>1</p>
        </div>
        <div className="songBar__wapper__main">
          <div className="songBar__wapper__main__infoSong">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/music-52086.appspot.com/o/images%2F0b5f9558-efae-4cf9-b0d2-c537ccb59e2d.jpg?alt=media&token=b94e0a54-3950-4304-847a-6958446dc190"
              alt=""
            />
            <div className="songBar__wapper__main__infoSong__info">
              <a href="#">
                <h2>Độ tộc 2</h2>
              </a>
              <a href="/infomation-singer">
                <p>Mixi</p>
              </a>
            </div>
          </div>
          <div className="songBar__wapper__main__album">
            <p>Độ tộc</p>
          </div>
          <div className="songBar__wapper__main__setting">
            <a href="#">Play</a>
            <a href="#">Download</a>
            <a href="#">Delete</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongBar;
