const GALLERY_SECTIONS = [
    {
        id: "digital",
        folder: "assets/art/drawings/online",
        images: [
            { file: "swords.avif", alt: "computer generated image of two broadswords clashing - Chroma" },
            { file: "foxy.avif", alt: "computer generated image of a fluffy fox - Chroma" },
            { file: "header.avif", alt: "computer generated image of a glass bust - SDXL" },
            { file: "bugman.avif", alt: "computer generated image of a man made of bugs - SDXL" },
            { file: "coffin.avif", alt: "computer generated image of a coffin - SDXL" },
            { file: "necklace.avif", alt: "computer generated image of a necklace - SDXL" }
        ],
    },
    {
        id: "photographs",
        folder: "assets/art/photography",
        images: [
            { file: "duck.avif", alt: "A duck" },
            { file: "swan.avif", alt: "A swan" },
            { file: "photo_lake.avif", alt: "A lake", panorama: true },
            { file: "stream.avif", alt: "A stream" },
            { file: "flowers.avif", alt: "Some dead flowers" },
            { file: "dynamic.avif", alt: "Epic skies", panorama: true },
            { file: "hat.avif", alt: "Hat on bleachers" },
            { file: "clouds.avif", alt: "Clouds in the skies" },
            { file: "rocks.avif", alt: "A bunch of rocks" },
        ],
    },
    {
        id: "hand",
        folder: "assets/art/drawings/hand",
        images: [
            { file: "cladcity.avif", alt: "Sketch of a van parked between houses under a yellow sun, captioned B.a.a.d City" },
            { file: "dombsdaygrillaz.avif", alt: "Four-panel character sheet titled Gimbas, featuring figures in hats" },
            { file: "doomer.avif", alt: "Dark sketch of a grim figure with hollow eyes and a leaf on its head" },
            { file: "gistintumberland.avif", alt: "Portrait of a bearded man in a tie, captioned Jimber Tumblemake" },
            { file: "radiehead.avif", alt: "Minimal sketch of a face beside distorted text reading the bones" },
            { file: "paper.png", alt: "Pencil resting on a blank scroll of paper" },
            { file: "blender.png", alt: "Sketch of a blender sitting on a counter" },
            { file: "cans.png", alt: "Sketch of a Canon DSLR camera" },
            { file: "splatterart.png", alt: "Abstract splatter of neon colorful ribbons" },
            { file: "workstudy.avif", alt: "A student studying" },
        ],
    },
];

// Automate image loading in gallery.html
function loadGalleryImages() {
    for (const section of GALLERY_SECTIONS) {
        const container = document.querySelector(`[data-gallery="${section.id}"]`);
        if (!container) {
            console.log(`ERROR: gallery container "${section.id}" not found`);
            continue;
        }
        for (const image of section.images) {
            const card = document.createElement("div");
            card.className = image.panorama ? "card panorama-card" : "card";

            const img = document.createElement("img");

            img.src = section.folder + "/" + image.file;
            img.alt = image.alt;
            img.loading = "lazy";
            img.addEventListener("error", () => img.remove());

            // Click a card to view the image full-size (keyboard accessible)
            card.tabIndex = 0;
            card.addEventListener("click", () => openLightbox(img));
            card.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openLightbox(img);
                }
            });

            card.appendChild(img);
            container.appendChild(card);
        }
    }
}
loadGalleryImages();

// Lightbox: click anywhere or press Esc to close
function openLightbox(img) {
    let box = document.querySelector(".lightbox");
    if (!box) {
        box = document.createElement("div");
        box.className = "lightbox";
        box.setAttribute("role", "dialog");
        box.setAttribute("aria-modal", "true");
        box.addEventListener("click", () => box.remove());
        document.body.appendChild(box);
    }
    box.replaceChildren();

    const large = document.createElement("img");
    large.src = img.src;
    large.alt = img.alt;

    const caption = document.createElement("p");
    caption.textContent = img.alt;

    box.append(large, caption);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        const box = document.querySelector(".lightbox");
        if (box) box.remove();
    }
});

// Lab 15 · Task 5: Toggle collapsible sections using buttons
const dropdownButtons = document.querySelectorAll(".dropdown");

if (dropdownButtons) {
    dropdownButtons.forEach(button => {
        button.setAttribute("aria-expanded", "true");
        button.addEventListener("click", function () {
            console.log("Info: dropdown switch called.");
            const header = this.closest(".align-header");
            const targetContent = header.nextElementSibling;

            if (targetContent) {
                targetContent.classList.toggle("hidden");
                this.setAttribute("aria-expanded", String(!targetContent.classList.contains("hidden")));

                // Swap arrow text between > (open) and v (closed)
                if (targetContent.classList.contains("hidden")) {
                    this.textContent = "v";
                } else {
                    this.textContent = ">";
                };
            } else {
                console.log("ERROR: dropdown switch failed");
            };
        });
    });
};
