"use strict";
import { photoRenderer } from "/js/renderers/photos.js";
import { photosAPI_auto } from "/js/api/_photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");

async function main() {
    loadPhotoDetail();

    let editButton = document.getElementById("button-edit");
    editButton.onclick = handleEditPhoto;

    let deleteButton = document.getElementById("button-delete");
    deleteButton.onclick = handleDeletePhoto;

    hideActionColumn();
}

async function loadPhotoDetail() {
    let photoContainer = document.querySelector("#photo-details-column");
    try {
        let photo = await photosAPI_auto.getById(photoId);
        let photoDetails = photoRenderer.asDetails(photo);
        photoContainer.appendChild(photoDetails);
    } catch (error) {
        messageRenderer.showErrorMessage("Error loading photo details" + error);
    }
}

function handleEditPhoto() {
    window.location.href = "/edit_photo.html?photoId=" + photoId;
}

async function handleDeletePhoto() {

    let answer = confirm("Do you really want to delete this photo?");

    if (answer) {
        try {
            await photosAPI_auto.delete(photoId);
            window.location.href = "/";
        } catch (err) {
            messageRenderer.showErrorMessage(err.response.data.message);
        }
    }
}

function hideActionColumn() {
    let actions_col = document.getElementById("actions-col");
    if (!sessionManager.isLogged()) {
        actions_col.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", main);