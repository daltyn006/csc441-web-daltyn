
// Class 20 · Step 3: find the webpage elements
const showcaseGrid = document.querySelector("#showcase-grid");
const showcaseStatus = document.querySelector("#showcase-status");
const showcaseCount = document.querySelector("#showcase-count");

async function loadShowcase() {
    if (!showcaseGrid || !showcaseStatus) return;
    showcaseStatus.textContent = "Loading from Supabase...";
    showcaseGrid.replaceChildren();
    try {
        const url = SHOWCASE_CONFIG.url +
            "/rest/v1/showcase_items" + "?order=id.desc";
        const response = await fetch(url, {
            headers: { apikey: SHOWCASE_CONFIG.key }
        });
        if (!response.ok) throw new Error("HTTP " + response.status);
        const items = await response.json();
        for (const item of items) {
            const card = document.createElement("article");
            card.className = "showcase-card";
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
    } catch (error) {
        showcaseStatus.textContent = "Could not load the items. Check the Console.";
        console.error("Showcase API error:", error);
    }
}
if (showcaseGrid && showcaseStatus) loadShowcase();