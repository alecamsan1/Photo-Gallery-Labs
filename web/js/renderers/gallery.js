'use strict';

import { parseHTML } from "../utils/parseHTML.js";
import { photoRenderer } from "./photos.js";

const galleryRenderer = {
    asCardGallery: function (photos) {
        let galleryContainer = parseHTML('<div class="photo-gallery"></div>');
        let row = parseHTML('<div class="row"></div>');
        galleryContainer.appendChild(row);

        let counter = 0;

        for (let photo of photos) {
            let card = photoRenderer.asCard(photo);
            row.appendChild(card);
            counter += 1;
            if (counter % 3 === 0) {
                row = parseHTML('<div class="row"></div>');
                galleryContainer.appendChild(row);
            }
        }
        return galleryContainer;
    }
};

export { galleryRenderer };