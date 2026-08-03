(function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
 
  function openLightbox(img) {
    lightboxImage.src = img.getAttribute("src");
    if(lightboxImage.src == null){
        console.log("null!");
        lightboxImage.src = img.src;
    }
    lightboxImage.alt = img.getAttribute('alt') || '';
 
    const caption = img.getAttribute('data-caption');
    if (caption) {
      lightboxCaption.textContent = caption;
      lightboxCaption.style.display = 'block';
    } else {
      lightboxCaption.textContent = '';
      lightboxCaption.style.display = 'none';
    }
 
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
 
  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    lightboxImage.src = '';
  }
 
  // Open on click of any .content__viewable image
  /*
  document.querySelectorAll('.post-content').forEach(function (img) {
    img.addEventListener('click', function () {
      openLightbox(img);
    });
  });
  */

  // Open on click of any image inside .post-content
document.querySelectorAll('.post-content').forEach(function (container) {
  container.addEventListener('click', function (e) {
    const img = e.target.closest('img');
    if (!img) return; // click wasn't on an image, ignore
    openLightbox(img);
  });
});
 
  // Close interactions
  closeBtn.addEventListener('click', closeLightbox);
 
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox(); // click on backdrop
  });
 
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
})();