//pages
import Main from "./pages/main";
import NftLoginErc from "./pages/nftLoginErc";
import NftLoginKct from "./pages/nftLoginKct";

//router
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/nftLoginKct" element={<NftLoginKct />} />
      <Route path="/nftLoginErc" element={<NftLoginErc />} />
    </Routes>
  );
}

export default App;
