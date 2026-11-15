// Class 15 | Step 3: a dropdown that picks the page theme.

// Every theme name in the order the dropdown shows them.
const themeNames = ["light", "dark", "architect", "cayman", "dinky", "gruvbox",
    "hacker", "leap-day", "merlot", "midnight", "minima", "minimal",
    "modernist", "slate", "tactile", "time-machine"];

// The label provided for each theme.
const themeLabels = {
    "light": "Light Mode",
    "dark": "Dark Mode",
    "architect": "Architect",
    "cayman": "Cayman",
    "dinky": "Dinky",
    "gruvbox": "Gruvbox",
    "hacker": "Hacker",
    "leap-day": "Leap Day",
    "merlot": "Merlot",
    "midnight": "Midnight",
    "minima": "Minima",
    "minimal": "Minimal",
    "modernist": "Modern",
    "slate": "Slate",
    "tactile": "Tactile",
    "time-machine": "Time Machine"
};

const root = document.documentElement;

let theme = null;
try {
    theme = localStorage.getItem("theme");
} catch (error) {
    // Use the system preference, no real error.
}
if (!themeNames.includes(theme)) {
    if (matchMedia("(prefers-color-scheme: dark)").matches) {
        theme = "dark";
    } else {
        theme = "light";
    }
}
root.setAttribute("theme", theme);

// Wait for dropdown selector to load, create themes for display.
addEventListener("DOMContentLoaded", () => {
    const select = document.querySelector("#theme-select");
    if (!select) return;

    for (let i = 0; i < themeNames.length; i++) {
        const name = themeNames[i];
        const option = document.createElement("option");
        option.value = name;
        option.textContent = themeLabels[name];
        select.appendChild(option);
    }

    select.value = theme;

    select.addEventListener("change", () => {
        theme = select.value;
        root.setAttribute("theme", theme);
        try {
            localStorage.setItem("theme", theme);
            console.log(`Info: ${theme} is set`)
        } catch (error) {
            // I think this is impossible but it's safer than nothing
        }
    });
});