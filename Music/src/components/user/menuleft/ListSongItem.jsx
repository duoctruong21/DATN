import React from "react";
import "../../../assets/scss/user/c__songitem.scss";

function ListSongItem() {
  return (
    <div
      href="#"
      className="SongItem">
      <div className="SongItem__item">
        <img
          src="https://photo-zmp3.zmdcdn.me/banner/2/9/e/6/29e6823f099b327ff1730e7f5de4f7d0.jpg"
          alt=""
        />
        <div className="SongItem__item__info">
          <a href="/infomation-song">Tên Bài hát</a>
          <a href="/infomation-album">
            <p>Tên album</p>
          </a>
          <a href="/infomation-singer">
            <p>Tên ca sĩ</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ListSongItem;
