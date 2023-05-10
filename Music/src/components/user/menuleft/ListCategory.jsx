import React, { useEffect, useState } from "react";
import "../../../assets/scss/user/c__listcategory.scss";
import axios from "axios";

function ListCategory() {
  const url = "https://localhost:7122/home";
  const [itemSong, setItemSong] = useState([]);

  useEffect(() => {
    axios.get(url).then((respose) => {
      setItemSong(respose.data);
    });
  });

  return (
    <div className="listcategory">
      <div className="listcategory__wapper">
        <div className="listcategory__main">
          <div className="listcategory__main__header">
            <h2 className="listcategory__main__title">Hot</h2>
            <a href="/list-hot-song">See more</a>
          </div>
          <div className="listcategory__main__list">
            {itemSong.map((song, index) => (
              <div
                href="#"
                className="SongItem">
                <div className="SongItem__item">
                  <img
                    src={song.fileImg}
                    alt=""
                  />
                  <div className="SongItem__item__info ">
                    <a
                      href={`/song/${song.linksong}`}
                      className="line1">
                      {song.songName}
                    </a>
                    <a href={`/album/${song.linkalbum}`}>
                      <p>{song.albumName}</p>
                    </a>
                    <a href={`/singer/${song.linksinger}`}>
                      <p>{song.singerName}</p>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListCategory;
