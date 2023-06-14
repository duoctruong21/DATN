import React, { useEffect, useState } from "react";
import SongBar from "./SongBar";
import ReactPaginate from "react-paginate";
import "../../../assets/scss/user/c__librarysong.scss";
import Footer from "./Footer";
import Albumuser from "./Albumuser.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LibrarySong() {
  const [Album, setAlbum] = useState("");
  const [img, setImg] = useState("");
  

  const [ListAlbum, setListAlbum] = useState([]);
  const [formVisible, setFormVisible] = useState(true);

  const history = useNavigate();

  const token = localStorage.getItem("token");
  const urlalbum = "https://localhost:7122/albumusername";
  const albumUrl = "https://localhost:7122/api/Albums";

  const handleButtonClick = () => {
    if (formVisible != true) {
      setFormVisible(true);
    } else {
      setFormVisible(false);
    }
  };
  

  useEffect(() => {
    if (token != null) {
      axios
        .get(`${urlalbum}/${token}`)
        .then((response) => setListAlbum(response.data))
        .catch();
    }
  }, [token]);

  console.log(ListAlbum)

  const handleName = (e) => {
    setAlbum(e);
  };

  const handleimg = (e) => {
    setImg(e);
  };

  const addalbum = () => {
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
        alert("");
        history("/your-library");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="librarysong">
      <div className="librarysong__wapper">
        <div className="librarysong__wapper__main">
          {token !=null?<button onClick={handleButtonClick}>Tạo Album</button>:""}
          <form
            onSubmit={addalbum}
            style={{ display: formVisible ? "none" : "flex" }}>
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
        </div>
      </div>
      <div className="librarysong__wapper__song">
        <Albumuser dataSongItem={ListAlbum} />
        {/* <SongItem dataSongItem={ListAlbum} /> */}
      </div>

      <Footer />
    </div>
  );
}

export default LibrarySong;
