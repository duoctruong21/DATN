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

  const [idcheck,setidcheck]= useState(0)

  const [mp3, setMp3] = useState("");
  const playSong = (id) => {
    setidcheck(id);
    setLoadSong(true);
    setCheck(0);
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
    try {
      axios
        //.post(`https://localhost:7122/updatecountsong/${songs[index].idSong}`)
        .post(`http://truongduoc027-001-site1.dtempurl.com/updatecountsong/${songs[index].idSong}`)
        .then(() => {
          // alert("");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch {}
    try {
      axios
        .post(`http://truongduoc027-001-site1.dtempurl.com/historied`, datasong, {
        // .post(`https://localhost:7122/historied`, datasong, {
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
    } catch {}
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

  const urlalbum = "http://truongduoc027-001-site1.dtempurl.com/albumusername";
  // const urlalbum = "https://localhost:7122/albumusername";
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
  const albumUrl = "http://truongduoc027-001-site1.dtempurl.com/api/Albums";
  // const albumUrl = "https://localhost:7122/api/Albums";

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
  const songAlbum = "http://truongduoc027-001-site1.dtempurl.com/addsongtoalbum";
  // const songAlbum = "https://localhost:7122/addsongtoalbum";
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

  const [check, setCheck] = useState(0)
  const handlesCheck = (e)=>{
    if(check != e){
      setCheck(e)
    }else{
      setCheck(0)
    }
  }
  const screenWidth = window.innerWidth;
  const isCheck = screenWidth +100;

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
                        {/* className={song.songName.split('').length >= 28?"line1":""} */}
                        <h2 title={song.songName}>{song.songName}</h2>
                      </a>
                      <a href={`/singer/${song.linksinger}`}>
                        <p title={song.singerName}>{song.singerName}</p>
                      </a>
                    </div>
                  </div>
                  <div className="songBar__wapper__main__album">
                    <p>{song.albumName}</p>
                  </div>
                  <div className="songBar__wapper__main__responsive">
                    <button onClick={() => handlesCheck(song.idSong)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 128 512">
                        <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                      </svg>
                    </button>
                  </div>
                  <div
                    className="songBar__wapper__main__setting"
                    style={
                      screenWidth < isCheck
                        ? check != song.idSong
                          ? { display: "none" }
                          : { display: "flex" }
                        : ""
                    }>
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
        {songs.length < 11 ? (
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
      <div style={{display: idcheck !=0?"block":"none" }}>
        <PlaySong
          firstsong={songInfo}
          dataForm={songs}
          idPlaying={mp3}
          load={loadSong}
        />
      </div>
    </div>
  );
}

export default SongBar;
