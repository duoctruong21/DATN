import React, { useEffect, useState } from "react";
import "../../../assets/scss/user/c__singerinfo.scss";
import "../../../assets/scss/user/c__songbar.scss";
// import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";

import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "./Footer";

function SingerInfo() {
  const { alias } = useParams();
  const urlSinger = `https://localhost:7122/singer/${alias}`;
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  useEffect(() => {
    async function getsinger() {
      await axios
        .get(urlSinger)
        .then((response) => {
          const dataSinger = response.data;
          setId(dataSinger.id);
          setName(dataSinger.singerName);
          setDescription(dataSinger.singerDescription);
          setImg(dataSinger.fileimg);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    }
    getsinger();
  }, []);
  // get songs by singer
  const urlGetSongbySinger = `https://localhost:7122/songbysinger/${id}`;
  const [songs, setSong] = useState([]);
  axios
    .get(urlGetSongbySinger)
    .then((response) => {
      setSong(response.data);
    })
    .catch((error) => console.log(error));
  return (
    <div className="singerinfo">
      <div className="singerinfo__wapper">
        <div className="singerinfo__wapper__main">
          <div className="singerinfo__wapper__main__info">
            <img
              src={img}
              alt=""
            />
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
          <div className="singerinfo__wapper__main__song">
            <div className="singerinfo__wapper__main__song__title">
              <h2>Bài hát liên quan</h2>
            </div>
            <div className="singerinfo__wapper__main__song__list">
              {songs.map((song, index) => (
                <div
                  className="songBar"
                  key={index}>
                  <div className="songBar__wapper">
                    <div className="songBar__wapper__index">
                      <p>{index + 1}</p>
                    </div>
                    <div className="songBar__wapper__main">
                      <div className="songBar__wapper__main__infoSong">
                        <img
                          src={song.imgSong}
                          alt=""
                        />
                        <div className="songBar__wapper__main__infoSong__info">
                          <a href="#">
                            <h2>{song.songName}</h2>
                          </a>
                          <a href={`/singer/${alias}`}>
                            <p>{name}</p>
                          </a>
                        </div>
                      </div>
                      <div className="songBar__wapper__main__album">
                        <p>{song.albumName}</p>
                      </div>
                      <div className="songBar__wapper__main__setting">
                        <a href="#">Play</a>
                        <a href="#">Download</a>
                        {/* <AudioPlayer src={song.mp3} /> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="singerinfo__wapper__main__song__seemore">
              <a href="">See more</a>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SingerInfo;
