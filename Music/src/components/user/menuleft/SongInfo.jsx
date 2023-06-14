import React, { useEffect, useState } from "react";
import "../../../assets/scss/user/c__songInfo.scss";
import SongBar from "./SongBar";
import PlaySong from "./PlaySong";
import { useParams } from "react-router-dom";
import axios from "axios";

function SongInfo() {
  const { alias } = useParams();
  const urlSong = `https://localhost:7122/song/${alias}`;
  const [song, setSong] = useState([]);
  const [songRecomnend, setSongRecommend] = useState([]);
  const urlrecommend = `https://localhost:7122/recommend/${alias}`;
  useEffect(() => {
    axios
      .get(urlSong)
      .then((response) => setSong(response.data))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios
      .get(urlrecommend)
      .then((response) => setSongRecommend(response.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="songinfo">
      <div className="songinfo__wapper">
        <div className="songinfo__wapper__main">
          {song.map((song, index) => (
            <div className="songinfo__wapper__main__info">
              <img
                src={
                  song.fileImg != ""
                    ? song.fileImg
                    : "https://i.pinimg.com/564x/41/07/4b/41074b335e04b4432918ea6dd636b2be.jpg"
                }
                alt=""
              />
              <h2>
                {song.songName}{" "}
                <a href={`/album/${song.linkalbum}`}>{song.albumName}</a>
              </h2>
              <p>
                {/* <a href="/infomation-singer">Độ mixi</a>,{" "} */}
                <a href={`/singer/${song.linksinger}`}>{song.singerName}</a>
              </p>
            </div>
          ))}
          <div className="songinfo__wapper__main__song">
            <div className="songinfo__wapper__main__song__title">
              <h2>Bài hát liên quan</h2>
            </div>
            <div className="songinfo__wapper__main__song__list">
              <SongBar dataSonginfo={song} dataSongBar={songRecomnend} />
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
