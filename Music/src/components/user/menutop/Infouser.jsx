import React, { useEffect, useState } from "react";
import "../../../assets/scss/user/c__userInfo.scss";
import axios from "axios";

function Infouser(props) {
  //
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pass, setPass] = useState("");
  const token = localStorage.getItem("token");
  const [user, setUser] = useState([]);
  const [close, setClose] = useState(false);
  useEffect(() => {
    axios
      .get(`https://localhost:7122/api/UserWebMusics/${token}`)
      .then((response) => {
        setUser(response.data);
        const datauser = response.data;
        setFirstName(datauser.firstName);
        setLastName(datauser.lastName);
        setPass(datauser.password);
      })
      .catch();
  }, []);
  const [check, setCheck] = useState(false);
  const handleCheck = (e) => {
    e.preventDefault();
    if (check != true) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  
  const handleClose = (e) => {
    e.preventDefault();
    setClose(false);
  };

  //
  const handlefirstName = (e) => {
    setFirstName(e);
  };
  const handlelastName = (e) => {
    setLastName(e);
  };
  const handlePass = (e) => {
    setPass(e);
  };
  //
  const update = (e) => {
    e.preventDefault();
    const datauser = {
      id: token,
      last: lastName,
      first: firstName,
      password: pass,
    };
    axios
      .post(`https://localhost:7122/changeInfoUser`, datauser)
      .then(() => {
        alert("success");
        setCheck(false);
      })
      .catch();
  };
  return (
    <div className="Infouser" style={{display:close != true?"none":"flex"}}>
      <div className="Infouser__img">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6386/6386976.png"
          alt=""
        />
      </div>
      <form action="">
        <div className="Infouser__control">
          <label htmlFor="">Gmail</label>
          <input
            type="text"
            disabled
            value={user.gmail}
          />
        </div>
        <div className="Infouser__control">
          <label htmlFor="">FirstName</label>
          <input
            type="text"
            disabled={!check}
            value={firstName}
            onChange={(e) => handlefirstName(e.target.value)}
          />
        </div>
        <div className="Infouser__control">
          <label htmlFor="">LastName</label>
          <input
            type="text"
            disabled={!check}
            value={lastName}
            onChange={(e) => handlelastName(e.target.value)}
          />
        </div>
        <div className="Infouser__control">
          <label htmlFor="">Password</label>
          <input
            type="text"
            disabled={!check}
            value={pass}
            onChange={(e) => handlePass(e.target.value)}
          />
        </div>
        <div className="Infouser__control">
          <button onClick={check != true ? handleCheck : update}>
            {check != true ? "Update" : "Done"}
          </button>
          <button onClick={handleClose}>close</button>
        </div>
      </form>
    </div>
  );
}

export default Infouser;
