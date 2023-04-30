import React, { useState, useEffect } from "react";
import "../../../assets/scss/admin/c__add.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";
import axios from "axios";
import Footer from "../../user/menuleft/Footer";
import { useNavigate } from "react-router-dom";

function AddSong() {
  const history = useNavigate();
  // ckeditor
  const [Contents, setContents] = useState("");
  function handleEditorChange(event, editor) {
    const data = editor.getData();
    setContents(data);
  }
  //   dropdown album
  const urlAlbum = "https://localhost:7122/api/Albums"; // get link api
  const [Albums, setAlbums] = useState([]); //   create useState get all data from album
  const [Album, setAlbum] = useState(null); //   create useState get data from album, save in album new

  //   using useEffect to get data from link api
  useEffect(() => {
    axios
      .get(urlAlbum)
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  //   get list album
  const listAlbum = Albums.map((album) => ({
    value: album.id,
    label: album.albumName,
  }));
  // save album if you change name in dropdown
  const handleChangeAlbum = (album) => {
    setAlbum(album);
  };

  //   dropdown Singer
  //   create useState get all data from Singer
  const [Singers, setSingers] = useState([]);
  //   create useState get data from Singer, save in Singer new
  const [Singer, setSinger] = useState(null);
  // get link api
  const urlSinger = "https://localhost:7122/api/Singers";
  //   using useEffect to get data from link api
  useEffect(() => {
    axios
      .get(urlSinger)
      .then((response) => {
        setSingers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  //   get list Singer
  const listSinger = Singers.map((singer) => ({
    value: singer.id,
    label: singer.singerName,
  }));
  // save Singer if you change name in dropdown
  const handleChangeSinger = (singer) => {
    setSinger(singer);
  };

  const songUrl = "https://localhost:7122/api/Songs";

  const AddSong = async (event) => {
    event.preventDefault();
    const songData = new FormData();
    songData.append("songName", event.target.elements.title.value);
    songData.append("songDescription", Contents);
    songData.append("fileImgs", event.target.elements.image.files[0]);
    songData.append("fileMp3", event.target.elements.fileMp3.files[0]);
    songData.append("idSinger", Singer.value);
    songData.append("idAlbum", Album.value);
    await axios
      .post(songUrl, songData, {
        headers: {
          "Content-Type": "multipart/fromdata",
        },
      })
      .then(() => {
        alert("Add item success");
        history("/admin/song");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="add">
      <div className="add__wapper">
        <div className="add__wapper__main">
          <div className="add__wapper__main__title">
            <h2>Add Song</h2>
          </div>
          <form
            className="add__wapper__main__form"
            onSubmit={AddSong}>
            <div className="add__wapper__main__form__control">
              <label htmlFor="Singerimg">Singer</label>
              <Select
                id="idSinger"
                name="idSinger"
                onChange={handleChangeSinger}
                options={listSinger}
                value={Singer}
                isSearchable={true}
              />
            </div>
            <div className="add__wapper__main__form__control">
              <label htmlFor="Singerimg">Album</label>
              <Select
                id="idAlbum"
                name="idAlbum"
                onChange={handleChangeAlbum}
                options={listAlbum}
                value={Album}
                isSearchable={true}
              />
            </div>
            <div className="add__wapper__main__form__control">
              <label htmlFor="Singername">Song Name</label>
              <input
                type="text"
                id="title"
                name="title"
              />
            </div>
            <div className="add__wapper__main__form__control">
              <label htmlFor="Singerimg">Description</label>
              <CKEditor
                editor={ClassicEditor}
                data={Contents}
                onChange={handleEditorChange}
                config={{
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "link",
                    "bulletedList",
                    "numberedList",
                    "blockQuote",
                    "|",
                    "fontColor",
                    "fontBackgroundColor",
                    "|",
                    "undo",
                    "redo",
                  ],
                }}
              />
            </div>
            <div className="add__wapper__main__form__control">
              <label htmlFor="Singerimg">Image</label>
              <input
                type="file"
                name="image"
                id="image"
              />
            </div>
            <div className="add__wapper__main__form__control">
              <label htmlFor="Singerimg">File Mp3</label>
              <input
                type="file"
                name="fileMp3"
                id="fileMp3"
              />
            </div>
            <div className="add__wapper__main__form__confirm">
              <a href="/admin/song">Back</a>
              <button value="submit">Add</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddSong;
