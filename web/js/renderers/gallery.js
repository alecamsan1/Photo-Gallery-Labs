"use strict";

import { photoRenderer } from "/js/renderers/photos.js";
import { parseHTML } from "/js/utils/parseHTML.js";

const galleryRenderer = {
  asCardGallery: function (photos) {
    let galleryContainer = parseHTML('<div class="container"></div>');
    let row = parseHTML('<div class="row"></div>');
    galleryContainer.appendChild(row);

    let counter = 0;
    for (let photo of photos) {
      let card = photoRenderer.asCard(photo);
      row.appendChild(card);
      counter++;

      if (counter % 3 === 0 && counter < photos.length) {
        row = parseHTML('<div class="row mt-4"></div>');
        galleryContainer.appendChild(row);
      }
    }

    return galleryContainer;
  }
};

export { galleryRenderer };