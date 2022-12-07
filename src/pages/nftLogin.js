import React from "react";

import meta from "../assets/meta.svg";
import Header from "../components/Header";
import "../App.css";

function nftLogin() {
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <img src={meta} className="App-logo" alt="logo" />
        <p>
          <code>Fastdive NFT Login</code>
        </p>
      </header>
    </div>
  );
}

export default nftLogin;
