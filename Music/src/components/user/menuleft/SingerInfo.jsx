import React, { useEffect, useState } from "react";
import "../../../assets/scss/user/c__singerinfo.scss";
import "../../../assets/scss/user/c__songbar.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import SongBar from "./SongBar";
import PlaySong from "./PlaySong";

function SingerInfo() {
  const { alias } = useParams();
  const urlSinger = `http://truongduoc027-001-site1.dtempurl.com/singer/${alias}`;
  //const urlSinger = `https://localhost:7122/singer/${alias}`;
  const [songs, setSong] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgSinger, setImgSinger] = useState("");

  useEffect(() => {
    async function getsinger() {
      await axios
        .get(urlSinger)
        .then((response) => {
          const dataSinger = response.data;
          setName(dataSinger[0].singerName);
          setDescription(dataSinger[0].descriptions);
          setImgSinger(dataSinger[0].fileImgSinger);
          setSong(response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    }
    getsinger();
  }, []);
  // // get songs by singer
  // const urlGetSongbySinger = `https://localhost:7122/songbysinger/${id}`;
  // const [songs, setSong] = useState([]);
  // axios
  //   .get(urlGetSongbySinger)
  //   .then((response) => {
  //     setSong(response.data);
  //   })
  //   .catch((error) => console.log(error));

  // play song

  return (
    <div className="singerinfo">
      <div className="singerinfo__wapper">
        <div className="singerinfo__wapper__main">
          <div className="singerinfo__wapper__main__info">
            <img
              src={
                imgSinger === ""
                  ? "https://cdn.icon-icons.com/icons2/3446/PNG/512/account_profile_user_avatar_icon_219236.png"
                  : imgSinger
              }
              alt=""
            />
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
          <div className="singerinfo__wapper__main__song">
            <div className="singerinfo__wapper__main__song__title">
              <h2>Bài hát liên quan</h2>
            </div>
            <SongBar dataSongBar={songs} />
            {/* <div className="singerinfo__wapper__main__song__seemore">
              <a href="">See more</a>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
      {/* <PlaySong dataForm={songs} /> */}
    </div>
  );
}

export default SingerInfo;
