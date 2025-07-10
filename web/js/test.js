'use strict';

function main() {
    alert("Hola");
   // let refP = document.getElementById("parrafo");
    // refP.innerHTML = "<b>Mi primer párrafo</b>";
   // let refP = document.getElementsByClassName("clase");
    // refP[0].innerHTML = "<b>Mi primer párrafo</b>";
    let refP = document.getElementsByTagName("p");
    refP[0].innerHTML = "<b>Mi primer párrafo</b>";
}

document.addEventListener("DOMContentLoaded", main);