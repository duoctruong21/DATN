import React, { useEffect, useState, useRef } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../../../assets/scss/user/c__playsong.scss";
import axios from "axios";

function PlaySong(props) {
  //const urlSong = "https://localhost:7122/ranked-song";
  const [songs, setSong] = useState([]);
  const [Song, handleSetSong] = useState("");
  const [playing, setPlaying] = useState(0);
  const [isPlaying, setIsPlaying] = useState(0);
  const [id, setId] = useState(0);
  const [loadSong, setLoadSong] = useState(false);

  // get data from different components
  useEffect(() => {
    setIsPlaying(props.idPlaying);
    setSong(props.dataForm);
    setPlaying(props.idPlaying);
    setLoadSong(props.load)
  }, [props.dataForm, props.idPlaying, props.load]);

  // axios
  // .get(urlSong)
  // .then((response) => {
  //   setSong(response.data);
  // })
  // .catch((error) => console.log());
  const handleClickNext = (idsong) => {
    console.log(idsong);
    setLoadSong(false)

    songs.map((song, index) => {
      if (index == songs.findIndex((song) => song.idSong == idsong) + 1) {
        handleSetSong(songs[index]);
        setIsPlaying(Song.idSong);

        console.log(Song.idSong);
        console.log(index);
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
        }
      }
    });
  };

  let playingSong = songs.findIndex(
    (song) => song.idSong.toString() == props.idPlaying.toString()
  );

  console.log("gia tri:"+isPlaying);
  let songFirst = songs != null ? songs[playingSong] : null;

  //const songFirst = songs[0];
  //console.log(songFirst.mp3)
  //console.log(Song);

  return (
    <div className="playsong">
      <div className="playsong__wapper">
        <h2>{Song == null ? "1" : Song.songName}</h2>
        <div className="playsong__main">
          <AudioPlayer
            src={
              Song == null
                ? ""
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
            onClickPrevious={() =>
              handleClickPre(
                //Song.mp3 == undefined ? songFirst.idSong : Song.idSong
                loadSong == true ? props.idPlaying  : Song.idSong
              )
            }
            autoPause
          />
        </div>
      </div>
    </div>
  );
}

export default PlaySong;
