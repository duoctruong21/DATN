import { useState, useEffect } from "react";
import "../../../assets/scss/user/c__menutop.scss";
import "../../../assets/scss/user/c__userInfo.scss";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import SearchBar from "../menutop/searchBar";
import Infouser from "../menutop/Infouser";

function MenuTop(props) {
  const [user, setUser] = useState("");
  const history = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pass, setPass] = useState("");
  const token = localStorage.getItem("token");
  //const [users, setUsers] = useState([]);
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
  }, [token]);

  // useEffect(() => {
  //   // const data = props.dataLogin;
  //   // console.log(data);
  //   // console.log(props.dataLogin);
  // }, []);

  // useEffect(() => {
  //   if (token != null) {
  //     const urlUser = "https://localhost:7122/api/UserWebMusics";
  //     axios
  //       .get(`${urlUser}/${token}`)
  //       .then((response) => {
  //         setUser(response.data);
  //         console.log(user);
  //       })
  //       .catch();
  //   }
  // }, [token]);

  const logout = (e) => {
    localStorage.removeItem("token");
  };

  const [check, setCheck] = useState(false);
  const handleCheck = (e) => {
    e.preventDefault();
    if (check != true) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };
  const [checks, setChecks] = useState(false);
  const handleChecks = (e) => {
    e.preventDefault();
    if (checks != true) {
      setChecks(true);
    } else {
      setChecks(false);
    }
  };

  const [close, setClose] = useState(false);
  const handleClose = (e) => {
    e.preventDefault();
    if(close !=true){
      setClose(true);
    }else{
      setClose(false);
    }
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
         setChecks(false);
       })
       .catch();
   };

  return (
    <div className="menuTop">
      <div className="menuTop__wapper">
        <div className="menuTop__Main">
          <div className="menuTop__Main__logo">
            <h2>Music</h2>
          </div>
          <SearchBar />
          <div className="menuTop__Main__block">
            {token == null ? (
              <ul className="menuTop__Main__block__login">
                <li>
                  <a href="/login">Login</a>
                </li>
                <li>
                  <a href="/register">Register</a>
                </li>
              </ul>
            ) : (
              <ul className="menuTop__Main__block__login">
                <li>
                  <a onClick={handleCheck}>
                    {user.lastName + " " + user.firstName}
                  </a>
                </li>
              </ul>
            )}
          </div>
          <div
            className="menuTop__Main__block__info"
            style={{ display: check == true ? "block" : "none" }}>
            {token == 6 ? (
              <a
                className="menuTop__Main__block__link"
                href="/admin">
                Quản lý
              </a>
            ) : (
              <a
                className="menuTop__Main__block__link"
                onClick={handleClose}>
                Thông tin cá nhân
              </a>
            )}
            <a
              onClick={logout}
              className="menuTop__Main__block__link"
              href="http://localhost:5173/home">
              Đăng xuất
            </a>
          </div>
        </div>
      </div>
      <div className="close-user">
        <div
          className="Infouser"
          style={{ display: close != true ? "none" : "flex" }}>
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
                disabled={!checks}
                value={firstName}
                onChange={(e) => handlefirstName(e.target.value)}
              />
            </div>
            <div className="Infouser__control">
              <label htmlFor="">LastName</label>
              <input
                type="text"
                disabled={!checks}
                value={lastName}
                onChange={(e) => handlelastName(e.target.value)}
              />
            </div>
            <div className="Infouser__control">
              <label htmlFor="">Password</label>
              <input
                type="text"
                disabled={!checks}
                value={pass}
                onChange={(e) => handlePass(e.target.value)}
              />
            </div>
            <div className="Infouser__control">
              <button onClick={checks != true ? handleChecks : update}>
                {checks != true ? "Update" : "Done"}
              </button>
              <button onClick={handleClose}>close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MenuTop;
