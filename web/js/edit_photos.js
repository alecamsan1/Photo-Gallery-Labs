'use strict';

import { messageRenderer } from "./renderers/messages.js";
import { photosAPI_auto } from "./api/_photos.js";
import { sessionManager } from "./utils/session.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let currentPhoto;

function main() {
    if (sessionManager.isLogged() === false) {
        window.location.href = "index.html";
    }
    else {
        if (photoId) {
            loadPhoto();
        }
        let registerForm = document.getElementById("form-photo-upload");
        registerForm.onsubmit = handleSubmitPhoto;
    }
}

async function loadPhoto() {
    let pageTitle = document.getElementById("page-title");
    let urlInput = document.getElementById("input-url");
    let titleInput = document.getElementById("input-title");
    let descriptionInput = document.getElementById("input-description");
    let visibilityInput = document.getElementById("input-visibility");
    pageTitle.textContent = "Editing a photo";
    try {
        currentPhoto = await photosAPI_auto.getById(photoId);
        urlInput.value = currentPhoto.url;
        titleInput.value = currentPhoto.title;
        descriptionInput.value = currentPhoto.description;
        visibilityInput.value = currentPhoto.visibility;
    } catch (err) {
        messageRenderer.showErrorMessage(err.response.data.message);
    }
}

async function handleSubmitPhoto(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    if (photoId === null) { // Creating a new photo
        // Add the current user ID
        formData.append("userId", sessionManager.getLoggedId());
        try {
            let resp = await photosAPI_auto.create(formData);
            let newId = resp.lastId;
            window.location.href = `photo_detail.html?photoId=${newId}`;
        } catch (err) {
            messageRenderer.showErrorAsAlert(err.response.data.message);
        }
    } else { // Updating an existing photo
        formData.append("userId", currentPhoto.userId);
        try {
            await photosAPI_auto.update(formData, photoId);
            window.location.href = `photo_detail.html?photoId=${photoId}`;
        } catch (err) {
            messageRenderer.showErrorAsAlert(err.response.data.message);
        }
    }
}


document.addEventListener('DOMContentLoaded', main);
