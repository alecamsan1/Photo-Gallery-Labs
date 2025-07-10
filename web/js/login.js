"use strict";

import { authAPI_auto } from "./api/_auth.js";
import { messageRenderer } from "./renderers/messages.js";
import { sessionManager } from "./utils/session.js";

function main() {
    document.getElementById("form-login").onsubmit = handleSubmitLogin;
}

async function handleSubmitLogin(event) {
    try{
        event.preventDefault();
        let formData = new FormData(event.target);
        let response = await authAPI_auto.login(formData);
        console.log(response);
        window.location.href = "index.html";
        sessionManager.login(response.sessionToken, response.user);
    } catch (err) {
        messageRenderer.showErrorAsAlert(err.response.data.message);
    }
}

document.addEventListener("DOMContentLoaded", main);