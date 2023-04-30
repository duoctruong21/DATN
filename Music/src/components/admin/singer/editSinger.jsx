import React, { useState, useEffect } from "react";
import "../../../assets/scss/admin/c__edit.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditSinger() {
  const { id } = useParams();
  const singerUrl = `https://localhost:7122/api/Singers/${id}`;
  const history = useNavigate();

  const [idSinger, setIdSinger] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    axios.get(singerUrl).then((response) => {
      const singerData = response.data;
      setIdSinger(singerData.id);
      setTitle(singerData.singerName);
      setContents(singerData.singerDescription);
      setImage(singerData.fileimg);
    });
  }, [id]);

  // ckeditor
  const [Contents, setContents] = useState("");
  function handleEditorChange(event, editor) {
    const data = editor.getData();
    setContents(data);
  }

  // edit item
  const UpdateSinger = async (event) => {
    event.preventDefault();
    const singerData = new FormData();
    singerData.append("id", idSinger);
    singerData.append("singerName", title);
    singerData.append("singerDescription", Contents);
    singerData.append("fileImgs", event.target.elements.image.files[0]);
    singerData.append("fileimg", image);

    await axios
      .put(singerUrl, singerData, {
        headers: {
          "Content-Type": "multipart/fromdata",
        },
      })
      .then(() => {
        alert("update success");
        history("/admin/singer");
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
          <form
            className="edit__wapper__main__form"
            onSubmit={UpdateSinger}>
            <div className="edit__wapper__main__form__control">
              <label htmlFor="topicname">Singer Name</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(title) => setTitle(title.target.value)}
              />
            </div>
            <div className="edit__wapper__main__form__control">
              <label htmlFor="topicimg">Description</label>
              <CKEditor
                editor={ClassicEditor}
                data={Contents === null ? "" : Contents}
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
                name="image"
                id="image"
                onChange={(image) => setImage(image.target.files[0])}
              />
            </div>
            <div className="edit__wapper__main__form__control">
              <img
                src={image}
                alt=""
              />
            </div>
            <div className="edit__wapper__main__form__confirm">
              <a href="/admin/album">Back</a>
              <button value="submit">edit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditSinger;
