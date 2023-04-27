import React from "react";
import "../../../assets/scss/admin/c__edit.scss";

function EditTopic() {
  return (
    <div className="edit">
      <div className="edit__wapper">
        <div className="edit__wapper__main">
          <div className="edit__wapper__main__title">
            <h2>Edit Topic</h2>
          </div>
          <div className="edit__wapper__main__form">
            <div className="edit__wapper__main__form__control">
              <label htmlFor="topicname">Topic Name</label>
              <input type="text" />
            </div>
            <div className="edit__wapper__main__form__control">
              <label htmlFor="topicimg">Image</label>
              <input
                type="file"
                name=""
                id=""
              />
            </div>
            <div className="edit__wapper__main__form__confirm">
              <a href="/admin/topic">Back</a>
              <button value="submit">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTopic;
