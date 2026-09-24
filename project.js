const projectImages = document.querySelectorAll(".proj-img-container img, .proj-gallery img");

if (projectImages.length > 0) {
    const lightbox = document.createElement("dialog");
    const lightboxImage = document.createElement("img");
    const closeButton = document.createElement("button");
    let activeImage;

    lightbox.className = "image-lightbox";
    lightboxImage.className = "image-lightbox-content";
    closeButton.className = "image-lightbox-close";
    closeButton.type = "button";
    closeButton.textContent = "Close";
    closeButton.setAttribute("aria-label", "Close enlarged image");

    lightbox.append(closeButton, lightboxImage);
    document.body.appendChild(lightbox);

    const openLightbox = (image) => {
        activeImage = image;
        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt;
        lightbox.showModal();
    };

    projectImages.forEach((image) => {
        image.tabIndex = 0;
        image.setAttribute("role", "button");
        image.setAttribute("aria-label", `View ${image.alt} fullscreen`);
        image.addEventListener("click", () => openLightbox(image));
        image.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openLightbox(image);
            }
        });
    });

    closeButton.addEventListener("click", () => lightbox.close());
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            lightbox.close();
        }
    });
    lightbox.addEventListener("close", () => {
        if (activeImage) {
            activeImage.focus();
        }
    });
}
