import React from "react";
import "../../../assets/scss/admin/c__add.scss";

function AddAlbum() {
  return (
    <div className="add">
      <div className="add__wapper">
        <div className="add__wapper__main">
          <div className="add__wapper__main__title">
            <h2>Add Album</h2>
          </div>
          <div className="add__wapper__main__form">
            <div className="add__wapper__main__form__control">
              <label htmlFor="topicname">Album Name</label>
              <input type="text" />
            </div>
            <div className="add__wapper__main__form__control">
              <label htmlFor="topicimg">Image</label>
              <input
                type="file"
                name=""
                id=""
              />
            </div>
            <div className="add__wapper__main__form__confirm">
              <a href="/admin/album">Back</a>
              <button value="submit">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAlbum;
