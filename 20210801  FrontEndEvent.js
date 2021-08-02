// One toggle

import $ from "jquery";

const rootApp = document.getElementById("root");
rootApp.innerHTML = '<button id="mybutton">ON</button>';

document.getElementById("mybutton").addEventListener("click", event => {
      event.target.innerHTML = 
      event.target.innerHTML === "OFF" ? "ON": "OFF"
     })

// One Counter
const rootApp = document.getElementById("root");
rootApp.innerHTML = '<button id="mybutton">ON</button>';

document.getElementById("mybutton").addEventListener("click", event => {
      event.target.innerHTML = 
      event.target.innerHTML === "OFF" ? "ON": "OFF"
     })
