import React, { useState, useEffect } from "react";
import "../../../assets/scss/admin/c__edit.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditAlbum() {
  const { id } = useParams();
  const albumUrl = `https://localhost:7122/api/Albums/${id}`;
  const history = useNavigate();

  const [Title, setTitle] = useState("");
  const [Image, setImage] = useState("");
  const [idAlbum, setIdAlbum] = useState("");

  //get item need edit
  useEffect(() => {
    axios
      .get(albumUrl)
      .then((response) => {
        const albumData = response.data;
        setIdAlbum(albumData.id);
        setTitle(albumData.albumName);
        setImage(albumData.albumImg);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  // update item
  const UpdateAlbum = async (event) => {
    event.preventDefault();
    const albumData = new FormData();
    albumData.append("id", idAlbum);
    albumData.append("albumName", Title);
    albumData.append("FileImg", event.target.elements.image.files[0]);
    albumData.append("fileimg", Image);
    await axios
      .put(albumUrl, albumData, {
        headers: {
          "Content-Type": "multipart/fromdata",
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("update success");
        history("/admin/album");
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
            <h2>Edit Album</h2>
          </div>
          <form
            className="edit__wapper__main__form"
            onSubmit={UpdateAlbum}>
            <div className="edit__wapper__main__form__control">
              <label htmlFor="topicname">Topic Name</label>
              <input
                type="text"
                id="title"
                name="title"
                value={Title}
                onChange={(title) => setTitle(title.target.value)}
              />
            </div>
            <div className="edit__wapper__main__form__control">
              <label htmlFor="topicimg">Image</label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={(image) => setImage(image.target.value)}
              />
            </div>
            <div className="edit__wapper__main__form__control">
              <img
                src={Image}
                alt=""
              />
            </div>
            <div className="edit__wapper__main__form__confirm">
              <a href="/admin/album">Back</a>
              <button value="submit">Edit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAlbum;
