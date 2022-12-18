import React from "react";

import fastdive from "../assets/fastdive.png";

function main() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={fastdive} className="App-logo" alt="fastdive" />
        <p>
          <code>Fastdive API example</code>
        </p>
        <a
          className="App-link"
          href="https://fast-dive.notion.site/fast-dive/Fastdive-Docs-a0231fead57742f69609bdd4d6d5b584"
          target="_blank"
          rel="noreferrer"
        >
          Learn about Fast-Dive
        </a>
      </div>
    </div>
  );
}

export default main;
