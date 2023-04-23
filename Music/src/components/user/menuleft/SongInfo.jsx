import React from "react";
import "../../../assets/scss/user/c__songInfo.scss";
import SongBar from "./SongBar";
import PlaySong from "./PlaySong";

function SongInfo() {
  return (
    <div className="songinfo">
      <div className="songinfo__wapper">
        <div className="songinfo__wapper__main">
          <div className="songinfo__wapper__main__info">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/music-52086.appspot.com/o/images%2F0b5f9558-efae-4cf9-b0d2-c537ccb59e2d.jpg?alt=media&token=b94e0a54-3950-4304-847a-6958446dc190"
              alt=""
            />
            <h2>
              Độ tộc 2 | <a href="/album">Độ tộc</a>
            </h2>
            <p>
              <a href="/infomation-singer">Độ mixi</a>,{" "}
              <a href="/infomation-singer">Phúc Du</a>
            </p>
          </div>
          <div className="songinfo__wapper__main__song">
            <div className="songinfo__wapper__main__song__title">
              <h2>Bài hát liên quan</h2>
            </div>
            <div className="songinfo__wapper__main__song__list">
              <SongBar />
              <SongBar />
              <SongBar />
              <SongBar />
              <SongBar />
            </div>
            {/* <div className="songinfo__wapper__main__song__seemore">
              <a href="/song-singer">See more</a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongInfo;
