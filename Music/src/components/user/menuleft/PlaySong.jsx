import React, { useEffect, useState, useRef } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../../../assets/scss/user/c__playsong.scss";
import axios from "axios";
import IndexPlaysong from "../playsong/indexPlaysong.jsx";

function PlaySong(props) {
  //const urlSong = "https://localhost:7122/ranked-song";
  const [songs, setSong] = useState([]);
  const [Song, handleSetSong] = useState("");
  const [Songname, handleSetSongname] = useState("");
  const [playing, setPlaying] = useState(0);
  const [isPlaying, setIsPlaying] = useState(0);
  const [id, setId] = useState(0);
  const [loadSong, setLoadSong] = useState(false);
  const [firstplaysong, setfirstplaysong] = useState([]);
  const token = localStorage.getItem("token");

  // get data from different components
  useEffect(() => {
    setIsPlaying(props.idPlaying);
    setfirstplaysong(props.firstsong);
    setSong(props.dataForm);
    setPlaying(props.idPlaying);
    setLoadSong(props.load);
  }, [props.dataForm, props.idPlaying, props.load, props.firstsong]);

  const handleClickNext = (idsong) => {
    console.log(idsong);
    setLoadSong(false);

    songs.map((song, index) => {
      if (index == songs.findIndex((song) => song.idSong == idsong) + 1) {
        handleSetSong(songs[index]);
        setIsPlaying(Song.idSong);
        console.log(Song.idSong);
        console.log(index);
        const datasong = new FormData();
        datasong.append("iduser", token);
        datasong.append("idsong", songs[index].idSong);
        console.log(Song.idSong);
        try {
          axios
            .post(
              `https://localhost:7122/updatecountsong/${songs[index].idSong}`
            )
            .then(() => {
              // alert("");
            })
            .catch((error) => {
              console.log(error);
            });
        } catch {}
        try {
          axios
            .post(`https://localhost:7122/historied`, datasong, {
              headers: {
                "Content-Type": "multipart/fromdata",
              },
            })
            .then(() => {
              // alert("");
            })
            .catch((error) => {
              console.log(error);
            });
        } catch {console.log("0");}
      }
    });
  };
  const handleClickPre = (idsong) => {
    setLoadSong(false);

    console.log(idsong);
    songs.map((song, index) => {
      if (index >= 0) {
        if (index == songs.findIndex((song) => song.idSong == idsong) - 1) {
          handleSetSong(songs[index]);
          setIsPlaying(Song.idSong);

          console.log(Song.idSong);
          console.log(index);
          console.log(loadSong);
          const datasong = new FormData();
          datasong.append("iduser", token);
          datasong.append("idsong", songs[index].idSong);
          console.log(Song.idSong);
          try {
            axios
              .post(
                `https://localhost:7122/updatecountsong/${songs[index].idSong}`
              )
              .then(() => {
                // alert("");
              })
              .catch((error) => {
                console.log(error);
              });
          } catch {}
          try {
            axios
              .post(`https://localhost:7122/historied`, datasong, {
                headers: {
                  "Content-Type": "multipart/fromdata",
                },
              })
              .then(() => {
                // alert("");
              })
              .catch((error) => {
                console.log(error);
              });
          } catch {console.log("1")}
        }
      }
    });
  };

  let playingSong = songs.findIndex(
    (song) => song.idSong.toString() == props.idPlaying.toString()
  );

  console.log("gia tri:" + isPlaying);
  let songFirst = songs != null ? songs[playingSong] : null;

  //const songFirst = songs[0];
  //console.log(songFirst.mp3)
  console.log(Song);

  const [check, setCheck] = useState(false);
  const checkIndexPlaying = () => {
    if (check != true) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };
  return (
    <div className="playsong">
      <div className="playsong__wapper">
        <h2>{Song == null ? "1" : Song.songName}</h2>
        <div className="playsong__main">
          <AudioPlayer
            src={
              loadSong == true
                ? songFirst.mp3
                : Song == null
                ? "2"
                : Song.mp3 == undefined
                ? songFirst != null
                  ? songFirst.mp3
                  : ""
                : Song.mp3
            }
            showSkipControls={true}
            showJumpControls={false}
            onClickNext={() =>
              handleClickNext(loadSong == true ? props.idPlaying : Song.idSong)
            }
            customAdditionalControls={[
              <a
                className="line3"
                style={{ position: "fixed" }}
                onClick={checkIndexPlaying}
                title={
                  loadSong == true
                    ? songFirst.songName
                    : Song == null
                    ? "2"
                    : Song.songName == undefined
                    ? songFirst != null
                      ? songFirst.songName
                      : ""
                    : Song.songName
                }>
                {loadSong == true
                  ? songFirst.songName
                  : Song == null
                  ? "2"
                  : Song.songName == undefined
                  ? songFirst != null
                    ? songFirst.songName
                    : ""
                  : Song.songName}
              </a>,
            ]}
            onClickPrevious={() =>
              handleClickPre(
                //Song.mp3 == undefined ? songFirst.idSong : Song.idSong
                loadSong == true ? props.idPlaying : Song.idSong
              )
            }
            onEnded={() =>
              handleClickNext(loadSong == true ? props.idPlaying : Song.idSong)
            }
            autoPause
          />
        </div>
      </div>
      <div
        className="check"
        style={{ display: check == true ? "block" : "none" }}>
        <IndexPlaysong
          datasong={loadSong == true ? props.idPlaying : Song.idSong}
        />
      </div>
    </div>
  );
}

export default PlaySong;
