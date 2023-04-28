import React, { useState, useEffect } from "react";
import "../../../assets/scss/admin/c__edit.scss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditTopic() {
  const { id } = useParams(); // get id from item need edit
  const topicUrl = `https://localhost:7122/api/Topics/${id}`;
  const history = useNavigate(); // used to redirect the page
  // create variable used to save data from url
  const [Title, setTitle] = useState("");
  const [Image, setImage] = useState("");
  const [idtopic, setIdtopic] = useState("");

  // get item need edit
  useEffect(() => {
    axios
      .get(topicUrl)
      .then((response) => {
        const topicdata = response.data;
        setTitle(topicdata.topicName);
        setImage(topicdata.topicImg);
        setIdtopic(topicdata.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  // update item changed
  const updateTopic = async (event) => {
    event.preventDefault();
    // form
    const formTopic = new FormData();
    formTopic.append("id", idtopic);
    formTopic.append("topicName", Title);
    formTopic.append("FileImg", event.target.elements.image.files[0]);
    formTopic.append("fileimg", Image);
    // const dataTopic = {
    //   "id":idtopic,
    //   "topicName" :Title,
    //   "FileImg" : event.target.elements.image.files[0]
    // }

    await axios
      .put(topicUrl, formTopic, {
        headers: {
          "Content-Type": "multipart/fromdata",
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("sửa thành công");
        history("/admin/topic");
      })
      .catch((error) => {
        console.log(dataTopic);
        console.log(error);
      });
  };

  return (
    <div className="edit">
      <div className="edit__wapper">
        <div className="edit__wapper__main">
          <div className="edit__wapper__main__title">
            <h2>Edit Topic</h2>
          </div>
          <form
            className="edit__wapper__main__form"
            onSubmit={updateTopic}>
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
                onChange={(image) => setImage(image.target.files[0])}
              />
            </div>
            <div className="edit__wapper__main__form__control">
              <img
                src={Image}
                alt=""
              />
            </div>
            <div className="edit__wapper__main__form__confirm">
              <a href="/admin/topic">Back</a>
              <button value="submit">Edit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTopic;
