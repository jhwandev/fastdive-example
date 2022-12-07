import "./App.css";

import Main from "./pages/main";
import NftLogin from "./pages/nftLogin";

//router
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/nftLogin" element={<NftLogin />} />
    </Routes>
  );
}

export default App;
