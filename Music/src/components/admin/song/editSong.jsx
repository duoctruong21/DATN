import React, { useState, useEffect } from "react";
import "../../../assets/scss/admin/c__edit.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";
import axios from "axios";
import Footer from "../../user/menuleft/Footer";

function EditSong() {
  // ckeditor
  const [Contents, setContents] = useState("");
  function handleEditorChange(event, editor) {
    const data = editor.getData();
    setContents(data);
  }

  //   dropdown album
  //   create useState get all data from album
  const [Albums, setAlbums] = useState([]);
  //   create useState get data from album, save in album new
  const [album, setalbum] = useState(null);
  // get link api
  const urlAlbum = "";
  //   using useEffect to get data from link api
  useEffect(() => {
    axios.get(urlAlbum).then((response) => {
      setAlbums(response.data);
    });
  });
  //   get list album
  const listAlbum = Albums.map((album) => ({
    value: album.id,
    label: album.albumName,
  }));
  // save album if you change name in dropdown
  const handleChangeAlbum = (album) => {
    setalbum(album);
  };

  //   dropdown topic
  //   create useState get all data from topic
  const [Topics, setTopics] = useState([]);
  //   create useState get data from Topic, save in Topic new
  const [topic, settopic] = useState(null);
  // get link api
  const urlTopic = "";
  //   using useEffect to get data from link api
  useEffect(() => {
    axios.get(urlTopic).then((response) => {
      setTopics(response.data);
    });
  });
  //   get list Topic
  const listTopic = Topics.map((Topic) => ({
    value: Topic.id,
    label: Topic.topicName,
  }));
  // save Topic if you change name in dropdown
  const handleChangeTopic = (topic) => {
    settopic(topic);
  };

  return (
    <div className="edit">
      <div className="edit__wapper">
        <div className="edit__wapper__main">
          <div className="edit__wapper__main__title">
            <h2>Edit Singer</h2>
          </div>
          <div className="edit__wapper__main__form">
            <div className="edit__wapper__main__form__control">
              <label htmlFor="topicname">Song Name</label>
              <input type="text" />
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
              <input
                type="file"
                name=""
                id=""
              />
            </div>
            <div className="edit__wapper__main__form__control">
              <label htmlFor="topicimg">File Mp3</label>
              <input
                type="file"
                name=""
                id=""
              />
            </div>
            <div className="edit__wapper__main__form__control">
              <label htmlFor="topicimg">Album</label>
              <Select
                id="idAlbum"
                name="idAlbum"
                onChange={handleChangeAlbum}
                options={listAlbum}
                value={Albums}
                isSearchable={true}
              />
            </div>
            <div className="edit__wapper__main__form__control">
              <label htmlFor="topicimg">Topic</label>
              <Select
                id="idTopic"
                name="idTopic"
                onChange={handleChangeAlbum}
                options={listAlbum}
                value={Albums}
                isSearchable={true}
              />
            </div>
            <div className="edit__wapper__main__form__confirm">
              <a href="/admin/song">Back</a>
              <button value="submit">edit</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditSong;
