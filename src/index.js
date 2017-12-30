import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./pages/App";
require("./css/styles.scss");
require("loaders.css/src/animations/ball-scale-ripple-multiple.scss");
//require("es6-promise").polyfill();

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
