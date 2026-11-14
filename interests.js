// Class 20 · Step 3: find the webpage elements
const showcaseGrid = document.querySelector("#showcase-grid");
const showcaseStatus = document.querySelector("#showcase-status");
const showcaseCount = document.querySelector("#showcase-count");
const refreshButton = document.querySelector("#showcase-refresh");

async function loadShowcase() {
    if (!showcaseGrid || !showcaseStatus) return;
    showcaseStatus.textContent = "Loading, Please Wait...";
    showcaseGrid.replaceChildren();
    try {
        const url = SHOWCASE_CONFIG.url +
            "/rest/v1/showcase_items" + "?order=id.asc";
        const response = await fetch(url, {
            headers: { apikey: SHOWCASE_CONFIG.key }
        });
        if (!response.ok) throw new Error("HTTP " + response.status);
        const items = await response.json();
        for (const item of items) {
            const card = document.createElement("article");
            card.className = "showcase-card";

            if (item.image_url && item.image_url.startsWith("https://")) {
                const photo = document.createElement("img");
                photo.className = "showcase-image";

                photo.src = item.image_url;
                photo.alt = "Photo for" + item.title;
                photo.loading = "lazy";

                photo.addEventListener("error", () => photo.remove());
                card.appendChild(photo);
            }
            const body = document.createElement("div");
            body.className = "showcase-body";

            const title = document.createElement("h3");
            title.textContent = item.title;

            const category = document.createElement("small");
            category.textContent = item.category;

            const description = document.createElement("p");
            description.textContent = item.description;

            card.append(title, category, description);
            showcaseGrid.appendChild(card);
        }
        showcaseStatus.textContent = items.length ? "Loaded successfully." : "No items yet.";
        if (showcaseCount) showcaseCount.textContent = items.length + " items";
        setTimeout(() => {
            showcaseStatus.textContent = "";
        }, 3000);
    } catch (error) {
        showcaseStatus.textContent = "Could not load the items. Check the Console.";
        console.error("Showcase API error:", error);
    }
}
if (showcaseGrid && showcaseStatus) loadShowcase();
if (refreshButton) refreshButton.addEventListener("click", loadShowcase);