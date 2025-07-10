"use strict";

import { galleryRenderer } from "/js/renderers/gallery.js";

function main() {
  let button = document.getElementById("test-button");
    
    let cards = document.querySelectorAll("div.card");
    for (let card of cards) {
    card.onmouseenter = handleMouseEnter;
    card.onmouseleave = handleMouseLeave;
    }
    
    button.onclick = clickHandler;
  let container = document.getElementById("gallery");

  let photos = [
    {
      title: "Samoyed",
      description: "A very good boy.",
      userId: 1,
      url: "https://i.ibb.co/tY1Jcnc/wlZCfCv.jpg",
      date: "15/08/2020"
    },
    {
      title: "ETSII",
      description: "E.T.S. Ing. Informática, Universidad de Sevilla",
      userId: 2,
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/ETSI_Inform%C3%A1tica_Sevilla_y_DrupalCamp_Spain_2011.jpg/1920px-ETSI_Inform%C3%A1tica_Sevilla_y_DrupalCamp_Spain_2011.jpg",
      date: "01/01/2021"
    },
    {
      title: "Seville",
      description: "The beautiful city of Seville",
      userId: 3,
      url: "https://urbansevilla.es/wp-content/uploads/2019/03/urban-sevilla-foto-ciudad.jpg",
      date: "03/02/2019"
    },
    {
      title: "Abstract art",
      description: "Clipart",
      userId: 4,
      url: "https://clipartart.com/images/worst-clipart-ever-1.jpg",
      date: "14/08/2019"
    }
  ];

  let gallery = galleryRenderer.asCardGallery(photos);
  container.appendChild(gallery);
}
function clickHandler(event) {
    let target = event.target;
    let text = target.textContent;
    alert(text);
}
function handleMouseEnter(event) {
    let card = event.target;
    card.style.border = "2px solid blue"
    }
    function handleMouseLeave(event) {
    let card = event.target;
    card.style.border = "none";
}

document.addEventListener("DOMContentLoaded", main);