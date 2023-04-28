import React from "react";
import "../../../assets/scss/admin/c__add.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddAlbum() {
  const albumUrl = "https://localhost:7122/api/Albums"; //get api
  const history = useNavigate();
  // add album
  const AddAlbum = async (event) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const image = event.target.elements.image.files[0];
    // create formdata
    const albumData = new FormData();
    albumData.append("albumName", title);
    albumData.append("FileImg", image);

    await axios
      .post(albumUrl, albumData, {
        headers: {
          "Content-Type": "multipart/fromdata",
        },
      })
      .then(() => {
        history("/admin/album");
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
            <h2>Add Album</h2>
          </div>
          <form
            className="add__wapper__main__form"
            onSubmit={AddAlbum}>
            <div className="add__wapper__main__form__control">
              <label htmlFor="topicname">Album Name</label>
              <input
                type="text"
                id="title"
                name="title"
              />
            </div>
            <div className="add__wapper__main__form__control">
              <label htmlFor="topicimg">Image</label>
              <input
                type="file"
                name="image"
                id="image"
              />
            </div>
            <div className="add__wapper__main__form__confirm">
              <a href="/admin/album">Back</a>
              <button value="submit">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddAlbum;
