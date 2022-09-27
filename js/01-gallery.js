import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);
const galleryContainer = document.querySelector('.gallery');

const galleryMarkup = galleryItems
  .map(
    item => `<div class="gallery__item">
    <a class="gallery__link" href="${item.original}">
      <img
        class="gallery__image"
        src="${item.preview}"
        data-source="${item.original}"
        alt="${item.description}"
      />
    </a>
  </div>`
  )
  .join('');
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

galleryContainer.addEventListener('click', onClick);
function onClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  const instance = basicLightbox.create(`<img src = '${evt.target.dataset.source}'/>`, {
    onShow: instance => {
      window.addEventListener('keydown', onClose);
    },
    onClose: instance => {
      window.removeEventListener('keydown', onClose);
    },
  });
  instance.show();

  function onClose(evt) {
    if (evt.code === 'Escape') {
      instance.close();
    }
  }
}

// -------first solution-------
// function onClick(evt) {
//   evt.preventDefault();
//   if (evt.target.nodeName !== 'IMG') return;
//   imageOpenClose(evt);
// }

// function imageOpenClose(evt) {
//   const instance = basicLightbox.create(
//     `<img src = '${evt.target.dataset.source}'/>`,
//     instanceOptions
//   );
//   instance.show();
// }

// const instanceOptions = {
//   onShow: instance => {
//     document.onkeydown = evt => {
//       if (evt.code === 'Escape') instance.close();
//     };
//   },
// };
