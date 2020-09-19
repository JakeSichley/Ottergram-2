var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var BUTTON_SELECTOR = 'button';
var ESC_KEY = 'Escape';

function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);
    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
        }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.key);
        if (event.key === ESC_KEY) {
            hideDetails();
        }
    });
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
    getButtonsArray();
}


function getButtonsArray() {
    'use strict';
    var buttons = document.querySelectorAll(BUTTON_SELECTOR);
    
    buttons.forEach(function (element) {
        if (element.className.includes('left')) {
            addLeftArrowPressHandler(element);
        }

        else if (element.className.includes('right')) {
            addRightArrowPressHandler(element);
        }
    });
}

function addRightArrowPressHandler(button) {
    'use strict';
    button.addEventListener('click', function (event) {
        event.preventDefault();
        var index = getCurrentThumbnailIndex();
        var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
        
        if (index >= thumbnails.length - 1) {
            index = 0;
        }

        else {
            index++;
        }
        
        setDetailsFromIndex(index);
    });  
}

function addLeftArrowPressHandler(button) {
    'use strict';
    button.addEventListener('click', function (event) {
        event.preventDefault();
        var index = getCurrentThumbnailIndex();
        var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
        
        if (index <= 0) {
            index = thumbnails.length - 1;
        }

        else {
            index--;
        }
        
        setDetailsFromIndex(index);
    });  
}

function setDetailsFromIndex(index) {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnail = thumbnails[index];
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function getCurrentThumbnailIndex() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var title = document.querySelector(DETAIL_TITLE_SELECTOR);

    for (let i = 0; i < thumbnails.length; i++) {
        if (thumbnails[i].getAttribute('data-image-title') == title.textContent) {
            return i;
        }
    }

    return 0;
}

initializeEvents();