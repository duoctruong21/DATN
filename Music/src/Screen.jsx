import { Routes, Route } from "react-router-dom";
import MenuTop from "./components/user/menu/menuTop.jsx";
import MenuLeft from "./components/user/menu/menuLeft.jsx";
import IndexPlaysong from "./components/user/playsong/indexPlaysong.jsx";
import Home from "./components/user/menuleft/home.jsx";
import "./assets/scss/resetscss.scss";
import "./assets/scss/base.scss";
import PlaySong from "./components/user/menuleft/PlaySong.jsx";
import ListHotSong from "./components/user/menuleft/ListHotSong.jsx";
import LibrarySong from "./components/user/menuleft/LibrarySong.jsx";
import HistorySong from "./components/user/menuleft/historySong.jsx";
import ListTopsong from "./components/user/menuleft/ListTopsong.jsx";
import SingerInfo from "./components/user/menuleft/SingerInfo.jsx";
import ListSongSinger from "./components/user/menuleft/ListSongSinger.jsx";
import SongInfo from "./components/user/menuleft/SongInfo.jsx";
import Album from "./components/user/menuleft/Album.jsx";
import Register from "./components/user/menutop/resgister.jsx";
import Login from "./components/user/menutop/login.jsx";

function Screen() {
  return (
    <div className="Screen">
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
      </Routes>
      <MenuTop />
      <MenuLeft />
      <PlaySong />
      <Routes>
        <Route
          path="/playsong"
          element={<IndexPlaysong />}
        />
      </Routes>
      <div className="Screen__main">
        <Routes>
          <Route
            path="/home"
            element={<Home />}
          />
          <Route
            path="/list-hot-song"
            element={<ListHotSong />}
          />
          <Route
            path="/your-library"
            element={<LibrarySong />}
          />
          <Route
            path="/your-history"
            element={<HistorySong />}
          />
          <Route
            path="/top-song"
            element={<ListTopsong />}
          />
          <Route
            path="/infomation-singer"
            element={<SingerInfo />}
          />
          <Route
            path="/song-singer"
            element={<ListSongSinger />}
          />
          <Route
            path="/infomation-song"
            element={<SongInfo />}
          />
          <Route
            path="/infomation-album"
            element={<Album />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default Screen;
