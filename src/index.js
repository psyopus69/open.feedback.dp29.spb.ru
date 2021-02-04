import ReactDOM from "react-dom";
import React from "react";
import "../public/assets/css/stylesProd.scss";
import {RenderController} from "./renderController.jsx";

const init = () => {
  ReactDOM.render(<RenderController/>,
      document.getElementById(`root`)
  );
};
init();
