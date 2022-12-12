//pages
import Main from "./pages/main";
import NftLogin from "./pages/nftLogin";
import NftMetadata from "./pages/nftMetadata";

//router
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/nftLogin" element={<NftLogin />} />
      <Route path="/nftMetadata" element={<NftMetadata />} />
    </Routes>
  );
}

export default App;
