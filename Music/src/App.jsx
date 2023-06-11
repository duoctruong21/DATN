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
import IndexTopic from "./components/admin/topic/indexTopic.jsx";
import IndexSong from "./components/admin/song/IndexSong.jsx";
import IndexSinger from "./components/admin/singer/IndexSinger.jsx";
import IndexAlbum from "./components/admin/album/indexAlbum.jsx";
import AddTopic from "./components/admin/topic/addTopic.jsx";
import EditTopic from "./components/admin/topic/EditTopic.jsx";
import AddAlbum from "./components/admin/album/AddAlbum.jsx";
import EditAlbum from "./components/admin/album/editAlbum.jsx";
import AddSinger from "./components/admin/singer/addSinger.jsx";
import AddSong from "./components/admin/song/addSong.jsx";
import EditSinger from "./components/admin/singer/editSinger.jsx";
import EditSong from "./components/admin/song/EditSong.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchIndex from "./components/user/menuleft/SearchIndex.jsx";

function App() {
  const urlSong = "https://localhost:7122/api/Songs";
  const urlSinger = "https://localhost:7122/api/Singers";
  const urlAlbum = "https://localhost:7122/api/Albums";
  const [songs, setSong] = useState([]);
  const [singers, setSinger] = useState([]);
  const [albums, setAlbum] = useState([]);

  const token = localStorage.getItem("token");

  const [Song, setSongs] = useState(songs[0]);
  console.log(token);

  const handleSetSong = (idSong) => {
    const song = songs.find((song) => song.id === idSong);
    if (!song) setSong(songs[0]);
    else setSong(song);
  };

  useEffect(() => {
    async function getSong() {
      await axios
        .get(urlSong)
        .then((response) => {
          setSong(response.data);
        })
        .catch((error) => console.log(error));
    }
    async function getSinger() {
      await axios
        .get(urlSinger)
        .then((response) => {
          setSinger(response.data);
        })
        .catch((error) => console.log(error));
    }
    async function getAlbum() {
      await axios
        .get(urlAlbum)
        .then((response) => {
          setAlbum(response.data);
        })
        .catch((error) => console.log(error));
    }
    getSinger();
    getAlbum();
    getSong();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Callback function để nhận dữ liệu từ component Login
  const handleLogin = (userData) => {
    // Xử lý logic đăng nhập
    setIsLoggedIn(true);
    setUserData(userData);
  };
  return (
    <div className="app">
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
      </Routes>
      <MenuTop />
      <MenuLeft />

      <Routes>
        <Route
          path="/playsong"
          element={<IndexPlaysong />}
        />
      </Routes>
      <div className="app__main">
        <Routes>
          {/* user */}
          <Route
            path="/home"
            element={<Home />}
          />
          <Route
            path="/search/:content"
            element={<SearchIndex />}
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
            path={`/singer/:alias`}
            element={<SingerInfo />}
          />
          <Route
            path={`/song/:alias`}
            element={<SongInfo />}
          />
          <Route
            path={`/album/:alias`}
            element={<Album />}
          />
          {/* Admin */}
          <Route
            path="/admin/topic"
            element={<IndexTopic />}
          />
          <Route
            path="/admin/song"
            element={<IndexSong />}
          />
          <Route
            path="/admin/singer"
            element={<IndexSinger />}
          />
          <Route
            path="/admin/album"
            element={<IndexAlbum />}
          />
          <Route
            path="/admin/topic/add"
            element={<AddTopic />}
          />
          <Route
            path="/admin/topic/edit/:id"
            element={<EditTopic />}
          />
          <Route
            path="/admin/album/edit/:id"
            element={<EditAlbum />}
          />
          <Route
            path="/admin/album/add"
            element={<AddAlbum />}
          />
          <Route
            path="/admin/singer/add"
            element={<AddSinger />}
          />
          <Route
            path="/admin/singer/edit/:id"
            element={<EditSinger />}
          />
          <Route
            path="/admin/song/add"
            element={<AddSong />}
          />
          <Route
            path="/admin/song/edit/:id"
            element={<EditSong />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
