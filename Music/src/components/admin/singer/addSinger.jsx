import React, { useState, useEffect } from "react";
import "../../../assets/scss/admin/c__add.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


function AddSinger() {
  // ckeditor
  const [Contents, setContents] = useState("");
  function handleEditorChange(event, editor) {
    const data = editor.getData();
    setContents(data);
  }



  return (
    <div className="add">
      <div className="add__wapper">
        <div className="add__wapper__main">
          <div className="add__wapper__main__title">
            <h2>Add Singer</h2>
          </div>
          <div className="add__wapper__main__form">
            <div className="add__wapper__main__form__control">
              <label htmlFor="topicname">Singer Name</label>
              <input type="text" />
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

export default AddSinger;
