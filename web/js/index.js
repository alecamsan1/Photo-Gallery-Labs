'use strict';
import { galleryRenderer } from "./renderers/gallery.js";
import { messageRenderer } from "./renderers/messages.js";
import { photoswithusersAPI_auto } from "./api/_photoswithusers.js";

function main() {
    shadowing();
    loadCards();

    addHandlers();
}

function shadowing() {
    let container = document.querySelector("div.container");
    let cards = container.querySelectorAll("div.card");
    for (let card of cards) {
        card.style.boxShadow = "0 4px 8px 0 rgba(228, 9, 9, 0.92)";
    }
}

async function loadCards() {
    let container = document.getElementById("gallery");

    try {
        let photos = await photoswithusersAPI_auto.getAll();
        let newGallery = galleryRenderer.asCardGallery(photos);
        container.appendChild(newGallery);
    } catch (err) {
        messageRenderer.showErrorMessage("Error loading photos" + err);
    }
}

function addHandlers() {
    let refBtn = document.getElementById("btnFecha");
    //  refBtn.addEventListener('click', showDate);

    refBtn.onclick = showDate;
}

function showDate() {
    alert(new Date());
}
document.addEventListener('DOMContentLoaded', main);
