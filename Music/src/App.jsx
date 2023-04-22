import { Routes, Route } from "react-router-dom";
import MenuTop from "./components/user/menu/menuTop.jsx";
import MenuLeft from "./components/user/menu/menuLeft.jsx";
import IndexPlaysong from "./components/user/playsong/indexPlaysong.jsx";
import Home from './components/user/menuleft/home.jsx'
import "./assets/scss/resetscss.scss";
import "./assets/scss/base.scss";

function App() {
  return (
    <div>
      <MenuTop />
      <MenuLeft />
      <div className="app__main">
        <Routes>
          <Route
            path="/playsong"
            element={<IndexPlaysong />}
          />
          <Route
            path="/home"
            element={<Home />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
