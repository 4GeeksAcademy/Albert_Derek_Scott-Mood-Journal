//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "./layout";

//import background image
 import backgroundImage from "/src/front/img/6830044.jpg";

//set background image for the entire page
document.body.style.backgroundImage = `url(${backgroundImage})`;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat = "no-repeat";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
