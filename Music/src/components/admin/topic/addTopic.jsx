import React from "react";
import "../../../assets/scss/admin/c__add.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTopic() {
  const urlTopic = "https://localhost:7122/api/Topics"; // link api
  const history = useNavigate();
  // add topic
  const addTopic = async (event) => {
    event.preventDefault();

    const title = event.target.elements.title.value;
    const image = event.target.elements.image.files[0];
    // create formdata
    const formData = new FormData();
    formData.append("topicName", title);
    formData.append("FileImg", image);
    // const topicData = {
    //   topicName: title,
    //   FileImg: image,
    // };
    // using api to post data from form to server
    await axios
      .post(urlTopic, formData, {
        headers: {
          "Content-Type": "multipart/fromdata",
        },
      })
      .then((response) => {
        history("/admin/topic");
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
            <h2>Add Topic</h2>
          </div>
          <form
            className="add__wapper__main__form"
            onSubmit={addTopic}>
            <div className="add__wapper__main__form__control">
              <label htmlFor="topicname">Topic Name</label>
              <input
                type="text"
                name="title"
                id="title"
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
              <a href="/admin/topic">Back</a>
              <button value="submit">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTopic;
