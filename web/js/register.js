'use strict';

import { messageRenderer } from "./renderers/messages.js";
import { userValidator } from "./validators/users.js";
import { sessionManager } from "./utils/session.js";
import { authAPI_auto } from "./api/_auth.js";

function main() {
    let refForm = document.getElementById('register-form');
    refForm.onsubmit = validate;
}

function validate(event) {
    let refForm = event.target;
    let formData = new FormData(refForm);
    let errors = userValidator.validateRegister(formData);
    event.preventDefault();
    if (errors.length > 0) {
        messageRenderer.showErrorMessage(errors.join('<br>'));
    } else {
        sendRegister(formData);
    }
}

async function sendRegister(formData) {
    try {
        let loginData = await authAPI_auto.register(formData);
        let sessionToken = loginData.sessionToken;
        let loggedUser = loginData.user;
        sessionManager.login(sessionToken, loggedUser);
        window.location.href = "index.html";

    } catch (err) {
        messageRenderer.showErrorMessage("Error registering a new user", err);
    }
}

document.addEventListener('DOMContentLoaded', main);