console.log("Info: load gallery.js");

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
            { file: "cladcity.avif", alt: "silly art of M.A.A.D city album cover" },
            { file: "dombsdaygrillaz.avif", alt: "An interpretation of Gorillaz Demon Days album cover" },
            { file: "doomer.avif", alt: "M.F. Doom - Madvillainy interpretation" },
            { file: "gistintumberland.avif", alt: `Justin Timberlake in Russian film "Stalker"` },
            { file: "radiehead.avif", alt: "Radiohead - The Bends interpretation" },
            { file: "paper.avif", alt: "Pencil resting on a blank scroll of paper" },
            { file: "blender.avif", alt: "Sketch of a blender sitting on a table" },
            { file: "camera.avif", alt: "Sketch of a Canon DSLR camera" },
            { file: "splatterart.avif", alt: "Abstract splatter of neon colorful ribbons" },
            { file: "workstudy.avif", alt: "A student studying in a dim lit room" },
        ],
    },
];

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
            img.decoding = "async";    

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
    large.decoding = "async"; 

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

dropdownButtons.forEach(button => {
    button.setAttribute("aria-expanded", "true");
    button.addEventListener("click", function () {
        const header = this.closest(".align-header");
        const targetContent = header.nextElementSibling;

        if (targetContent) {
            targetContent.classList.toggle("hidden");
            const isOpen = !targetContent.classList.contains("hidden");
            this.setAttribute("aria-expanded", String(isOpen));
            this.textContent = isOpen ? ">" : "v";
        } else {
            console.log("ERROR: dropdown switch failed");
        }
    });
});