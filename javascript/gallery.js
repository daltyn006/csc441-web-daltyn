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
            { file: "cladcity.avif", alt: "cladcity" },
            { file: "dombsdaygrillaz.avif", alt: "dombsdaygrillaz" },
            { file: "doomer.avif", alt: "doomer" },
            { file: "gistintumberland.avif", alt: "gistintumberland" },
            { file: "radiehead.avif", alt: "radiehead" },
            { file: "paper.png", alt: "pencil on a scroll"},
            { file: "blender.png", alt: "a blender" },
            { file: "cans.png", alt: "camera"},
            { file: "splatterart.png", alt: "splatter artifact"},
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

            card.appendChild(img);
            container.appendChild(card);
        }
    }
}
loadGalleryImages();

// Lab 15 · Task 5: Toggle collapsible sections using buttons
const dropdownButtons = document.querySelectorAll(".dropdown");

if (dropdownButtons) {
    dropdownButtons.forEach(button => {
        button.addEventListener("click", function () {
            console.log("Info: dropdown switch called.");
            const header = this.closest(".align-header");
            const targetContent = header.nextElementSibling;

            if (targetContent) {
                targetContent.classList.toggle("hidden");

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
