import React, { useEffect, useState } from "react";
import "../../../assets/scss/user/c__songbar.scss";
import ReactPaginate from "react-paginate";
import PlaySong from "./PlaySong";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SongBar(props) {
  const history = useNavigate();
  const [songs, setSong] = useState([]);
  const [loadSong, setLoadSong] = useState(false);
  //lay bai hat khi click vao alias của bai hat
  const [songInfo, setSongInfo] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setSong(props.dataSongBar);
    setSongInfo(props.dataSonginfo);
  }, [props.dataSongBar]);

  // phân trang
  const [pageNumber, setPageNumber] = useState(0);
  const songsPerPage = 10;
  const pagesVisited = pageNumber * songsPerPage;
  const pageCount = Math.ceil(songs.length / songsPerPage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const [mp3, setMp3] = useState("");
  const playSong = (id) => {
    setLoadSong(true);
    songs.forEach((song, index) => {
      if (id === song.idSong) {
        setMp3(song.idSong);
        console.log(mp3);
        console.log(index);
      }
    });
    const datasong = new FormData();
    datasong.append("iduser", token);
    datasong.append("idsong", id);
    console.log(id + " " + token);
    axios
      .post(`https://localhost:7122/historied`, datasong, {
        headers: {
          "Content-Type": "multipart/fromdata",
        },
      })
      .then(() => {
        alert("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function downloadMusic(link, fileName) {
    axios
      .get(link, { responseType: "arraybuffer" })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName + ".mp3";
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        const a = document.createElement("a");
        a.href = link;
        a.download = fileName + ".mp3";
        a.click();
        console.error("Lỗi khi tải xuống nhạc:", error);
      });
  }

  const [ListAlbum, setListAlbum] = useState([]);
  const [formVisible, setFormVisible] = useState(false);

  const urlalbum = "https://localhost:7122/albumusername";
  useEffect(() => {
    if (token != null) {
      axios
        .get(`${urlalbum}/${token}`)
        .then((response) => setListAlbum(response.data))
        .catch();
    }
  }, []);

  // ẩn hiện album
  const [isAlbum, setIsAlbum] = useState(0);
  const handlesbuton = (e) => {
    if (isAlbum != e) {
      setIsAlbum(e);
    } else {
      setIsAlbum(0);
    }
  };
  const handleButtonClick = () => {
    if (formVisible != true) {
      setFormVisible(true);
    } else {
      setFormVisible(false);
    }
  };
  const [Album, setAlbum] = useState("");
  const [img, setImg] = useState("");
  const handleName = (e) => {
    setAlbum(e);
  };

  const handleimg = (e) => {
    setImg(e);
  };
  const albumUrl = "https://localhost:7122/api/Albums";

  const addalbum = (e) => {
    e.preventDefault();
    const albumData = new FormData();
    albumData.append("albumName", Album);
    albumData.append("FileImg", img);
    albumData.append("iduser", token);
    axios
      .post(albumUrl, albumData, {
        headers: {
          "Content-Type": "multipart/fromdata",
        },
      })
      .then(() => {
        axios
          .get(`${urlalbum}/${token}`)
          .then((response) => setListAlbum(response.data))
          .catch();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // thêm bài hat vao album
  const songAlbum = "https://localhost:7122/addsongtoalbum";
  const [id_album, setId_album] = useState(0);
  const [id_song, setId_song] = useState(0);
  const handlesId = (a, b) => {
    console.log(a);
    console.log(b);
    const albumDatas = new FormData();
    albumDatas.append("id", b);
    albumDatas.append("idSong", a);

    axios
      .post(songAlbum, albumDatas, {
        headers: {
          "Content-Type": "multipart/fromdata",
        },
      })
      .then(() => {
        alert("thêm thành công");
      })
      .catch((error) => {
        alert("thêm thành công");
        console.log(error);
      });
  };
  console.log(songs);
  console.log(ListAlbum);
  const addsonginalbum = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="ListSongBar">
        {songs
          .slice(pagesVisited, pagesVisited + songsPerPage)
          .map((song, index) => (
            <div
              className="songBar "
              key={song.idSong}>
              <div className="songBar__wapper">
                <div className="songBar__wapper__index">
                  <p className="songBar__wapper__index__p">
                    {pagesVisited + index + 1}
                  </p>
                  {/* <button onClick={() => playSong(song.idSong)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 384 512">
                      <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                    </svg>
                  </button> */}
                </div>
                <div className="songBar__wapper__main">
                  <div className="songBar__wapper__main__infoSong">
                    <img
                      src={
                        song.fileImg === ""
                          ? "https://i.pinimg.com/564x/41/07/4b/41074b335e04b4432918ea6dd636b2be.jpg"
                          : song.fileImg
                      }
                      alt={song.songName}
                    />
                    <div className="songBar__wapper__main__infoSong__info">
                      <a href={`/song/${song.linksong}`}>
                        <h2 className="line1">{song.songName}</h2>
                      </a>
                      <a href={`/singer/${song.linksinger}`}>
                        <p className="line1">{song.singerName}</p>
                      </a>
                    </div>
                  </div>
                  <div className="songBar__wapper__main__album">
                    <p>{song.albumName}</p>
                  </div>
                  <div className="songBar__wapper__main__setting">
                    <button onClick={() => playSong(song.idSong)}>play</button>

                    {token != null ? (
                      <button onClick={() => handlesbuton(song.idSong)}>
                        add album
                      </button>
                    ) : (
                      ""
                    )}
                    {isAlbum == song.idSong ? (
                      <div>
                        <button onClick={handleButtonClick}>Add album</button>
                        <form
                          onSubmit={addalbum}
                          style={{
                            display: formVisible == false ? "none" : "flex",
                          }}>
                          <label htmlFor="#">Tên Album</label>
                          <input
                            type="text"
                            onChange={(e) => handleName(e.target.value)}
                          />
                          <input
                            type="file"
                            onChange={(e) => handleimg(e.target.files[0])}
                          />
                          <button value="submit">Add</button>
                        </form>
                        {ListAlbum != null
                          ? ListAlbum.map((album, index) => (
                              <button
                                onClick={() =>
                                  handlesId(song.idSong, album.idAlbum)
                                }
                                className="button-album">
                                {album.albumUserName}
                              </button>
                            ))
                          : ""}
                      </div>
                    ) : (
                      ""
                    )}
                    <button
                      onClick={() => downloadMusic(song.mp3, song.songName)}>
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="listtopsong__wapper__page">
        {songs.length < 10 ? (
          ""
        ) : (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        )}
      </div>
      <PlaySong
        firstsong={songInfo}
        dataForm={songs}
        idPlaying={mp3}
        load={loadSong}
      />
    </div>
  );
}

export default SongBar;
