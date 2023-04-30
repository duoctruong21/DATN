import React, { useState, useEffect } from "react";
import "../../../assets/scss/admin/c__edit.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";
import axios from "axios";
import Footer from "../../user/menuleft/Footer";
import { useParams, useNavigate } from "react-router-dom";

function EditSong() {
  const {id} = useParams()
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
  const [Singers, setSingers] = useState([]);
  const [Singer, setSinger] = useState(null);
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

  const songUrl = `https://localhost:7122/api/Songs/${id}`;
  const [Title, setTitle] = useState("")
  const [Image,setImage] = useState("")
  const [fileMp3, setFileMp3] = useState("")
  const [idAlbum, setIdAlbum] = useState("")
  const [idSinger, setIdSinger] = useState("");
  // const []
  // get data from api
  const getIdSinger = listSinger.map((id) => id.value);
  const getIdAlbum = listAlbum.map((id)=> id.value)

  useEffect(()=>{
    axios.get(songUrl).then((response)=>{
      const songData = response.data
      setTitle(songData.songName)
      setImage(songData.fileimg)
      setFileMp3(songData.filesong)
      setContents(songData.songDescription != null? songData.songDescription :"")
      setAlbum(getIdAlbum.includes(songData.idAlbum));
      setSinger(getIdSinger.includes(songData.idSinger));
      console.log(getIdAlbum.includes(songData.idAlbum));
      console.log();
    }).catch((error)=>{
      console.log(error)
    })
  },[id])

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
    <div className="edit">
      <div className="edit__wapper">
        <div className="edit__wapper__main">
          <div className="edit__wapper__main__title">
            <h2>Edit Singer</h2>
          </div>
          <form className="edit__wapper__main__form" onSubmit={AddSong}>
            <div className="edit__wapper__main__form__control">
              <label htmlFor="topicimg">Album</label>
              <Select
                id="idAlbum"
                name="idAlbum"
                onChange={handleChangeAlbum}
                options={listAlbum}
                value={Album}
                isSearchable={true}
              />
            </div>
            <div className="edit__wapper__main__form__control">
              <label htmlFor="topicimg">Singer</label>
              <Select
                id="idTopic"
                name="idTopic"
                onChange={handleChangeSinger}
                options={listSinger}
                value={Singer}
                isSearchable={true}
              />
            </div>
            <div className="edit__wapper__main__form__control">
              <label htmlFor="topicname">Song Name</label>
              <input
                type="text"
                id="title"
                name="title"
                value={Title}
                onChange={(title) => setTitle(title.target.value)}
              />
            </div>
            <div className="edit__wapper__main__form__control">
              <label htmlFor="topicimg">Description</label>
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
            <div className="edit__wapper__main__form__control">
              <label htmlFor="topicimg">Image</label>
              <div className="edit__wapper__main__form__control__upfile">
                <div>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={(image) => setImage(image.target.value)}
                  />
                  Get File Image
                </div>
                <label htmlFor="img">{Image}</label>
              </div>
            </div>
            <div className="edit__wapper__main__form__control">
              <label htmlFor="topicimg">File Mp3</label>
              <div className="edit__wapper__main__form__control__upfile">
                <div>
                  <input
                    type="file"
                    name="fileMp3"
                    id="fileMp3"
                    onChange={(mp3) => setFileMp3(mp3.target.value)}
                  />
                  Get File Mp3
                </div>
                <label htmlFor="mp3">{fileMp3}</label>
              </div>
            </div>
            <div className="edit__wapper__main__form__confirm">
              <a href="/admin/song">Back</a>
              <button value="submit">edit</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditSong;
