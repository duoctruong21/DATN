import React, { useState, useEffect } from "react";
import "../../../assets/scss/admin/c__add.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function AddSinger() {
  const singerUrl = "https://localhost:7122/api/Singers";
  const history = useNavigate()
  // ckeditor
  const [Contents, setContents] = useState("");
  function handleEditorChange(event, editor) {
    const data = editor.getData();
    setContents(data);
  }
  // add item
  const AddSinger = async (event) => {
    event.preventDefault();
    const singerData = new FormData();
    singerData.append("singerName", event.target.elements.title.value);
    singerData.append("singerDescription", Contents);
    singerData.append("fileImgs",event.target.elements.image.files[0])

    await axios.post(singerUrl, singerData,{
      headers:{
        "Content-Type":"multipart/fromdata"
      }
    }).then(()=>{
      alert('Add success')
      history("/admin/singer")
    }).catch((error)=>{
      console.log(error)
    })
  };

  return (
    <div className="add">
      <div className="add__wapper">
        <div className="add__wapper__main">
          <div className="add__wapper__main__title">
            <h2>Add Singer</h2>
          </div>
          <form
            className="add__wapper__main__form"
            onSubmit={AddSinger}>
            <div className="add__wapper__main__form__control">
              <label htmlFor="topicname">Singer Name</label>
              <input
                type="text"
                id="title"
                name="title"
              />
            </div>
            <div className="add__wapper__main__form__control">
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

export default AddSinger;
