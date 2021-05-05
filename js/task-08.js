// Разметка элемента галереи

// Ссылка на оригинальное изображение должна храниться в data - атрибуте source на элементе img,
//     и указываться в href ссылки(это необходимо для доступности).

// <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//   >
//     <img
//       class="gallery__image"
//       src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
//       data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//       alt="Tulips"
//     />
//   </a>
// </li>

import galleryItems from './gallery-items.js';

const galleryPlaces = document.querySelector('.gallery.js-gallery');
const backdrop = document.querySelector('.lightbox');
const fullScreenImage = document.querySelector('.lightbox__image');
const modalCloseBtn = document.querySelector('[data-action="close-lightbox"]');

// console.log(galleryPlaces);

const createGalleryBoard = function (galleryItems) {
  galleryItems.forEach((item, index) => {
    const listEL = document.createElement('li');
    listEL.classList.add('gallery__item');

    const linkEl = document.createElement('a');
    linkEl.classList.add('gallery__link');
    linkEl.setAttribute('href', item.original);

    const imgEl = document.createElement('img');
    imgEl.classList.add('gallery__image');
    imgEl.setAttribute('src', item.preview);
    imgEl.setAttribute('data-source', item.original);
    imgEl.setAttribute('data-index', index);
    imgEl.setAttribute('alt', item.description);

    linkEl.append(imgEl);
    listEL.append(linkEl);

    galleryPlaces.append(listEL);
  });
};

createGalleryBoard(galleryItems);

let picTargetIndex;
galleryPlaces.addEventListener('click', onPicClick);
modalCloseBtn.addEventListener('click', onCloseModalWindow);
backdrop.addEventListener('click', onBackdropClick);

function onPicClick(evt) {
  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  evt.preventDefault();

  picTargetIndex = Number(evt.target.dataset.index);

  fullScreenImage.setAttribute('src', evt.target.dataset.source);

  onOpenModalWindow();
}

function onOpenModalWindow() {
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onArrowKeyPress);

  backdrop.classList.add('is-open');
}

function onCloseModalWindow() {
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onArrowKeyPress);

  fullScreenImage.setAttribute('src', '');
  backdrop.classList.remove('is-open');
}

function onBackdropClick(evt) {
  if (evt.target !== fullScreenImage) {
    fullScreenImage.setAttribute('src', '');
    onCloseModalWindow();
  }
}

function onEscKeyPress(evt) {
  if (evt.code === 'Escape') {
    onCloseModalWindow();
  }
}

function onArrowKeyPress(evt) {
  if (evt.code === 'ArrowRight') {
    if (picTargetIndex < galleryItems.length - 1) {
      picTargetIndex += 1;
      fullScreenImage.setAttribute(
        'src',
        galleryItems[picTargetIndex].original,
      );
    } else {
      onCloseModalWindow();
    }
  }
  if (evt.code === 'ArrowLeft') {
    if (picTargetIndex > 0) {
      picTargetIndex -= 1;
      fullScreenImage.setAttribute(
        'src',
        galleryItems[picTargetIndex].original,
      );
    } else {
      onCloseModalWindow();
    }
  }
}
