import React from "react";

import fastdive from "../assets/fastdive.png";
import Header from "../components/Header";
import "../App.css";

function main() {
  return (
    <div className="App">
      <Header />
      <div className="App-header">
        <img src={fastdive} className="App-logo" alt="logo" />
        <p>
          <code>Fastdive API example</code>
        </p>
        <a className="App-link" href="" target="_blank">
          Learn about Fast-Dive
        </a>
      </div>
    </div>
  );
}

export default main;
