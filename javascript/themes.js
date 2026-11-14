

// Class 15 | Step 3: a button that changes the page
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const systemTheme = prefersDark ? 'dark' : 'light';

let themes = ["default", "architect", "cayman", "dark", "dinky", "gruvbox",
    "hacker", "leap-day", "light", "merlot", "midnight", "minima", "minimal",
    "modernist", "slate", "tactile", "time-machine"].filter(theme => {
        return theme === "default" || theme !== systemTheme;
    });

const labels = {
    "default": `System (${systemTheme.charAt(0).toUpperCase() + systemTheme.slice(1)})`,
    "architect": "Architect",
    "cayman": "Cayman",
    "dark": "Dark Mode",
    "dinky": "Dinky",
    "gruvbox": "Gruvbox",
    "hacker": "Hacker",
    "leap-day": "Leap Day",
    "light": "Light Mode",
    "merlot": "Merlot",
    "midnight": "Midnight",
    "minima": "Minima",
    "minimal": "Minimal",
    "modernist": "Modern",
    "slate": "Slate",
    "tactile": "Tactile",
    "time-machine": "Time Machine"
};

let currentTheme = localStorage.getItem("theme") || "default";

function applyThemeToDoc(theme) {
    if (theme && theme !== "default") {
        document.documentElement.setAttribute("theme", theme);
    } else {
        document.documentElement.removeAttribute("theme");
    }
}

applyThemeToDoc(currentTheme);

// Button to toggle themes

const themeButton = document.querySelector("#toggle-theme");

if (themeButton) {
    let index = themes.includes(currentTheme) ? themes.indexOf(currentTheme) : 0;

    function applyThemeWithButton(theme) {
        console.log(`Info: apply ${theme} theme to page.`);
        applyThemeToDoc(theme);
        localStorage.setItem("theme", theme);
        themeButton.textContent = `Theme: ${labels[theme]}`;
    }
    applyThemeWithButton(currentTheme);

    themeButton.addEventListener("click", () => {
        index = (index + 1) % themes.length;
        applyThemeWithButton(themes[index]);
    });
} else {
    console.log("Info: Theme toggle button not present on this page.");
}
