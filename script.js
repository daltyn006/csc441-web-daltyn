// Class 15 | Step 1: this file is running.
console.log("Info: load javascript");
//Page loaded at
const pageLoad = Date.now();

//Set theme

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



// Class 15 | Step 2: put this year in the footer.
// Lab 15 | Step 2: add a try catch.
const yearSpan = document.querySelector("#year");
if (yearSpan) {
    console.log("Info: get year for copyright")
    yearSpan.textContent = new Date().getFullYear();
}

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



// Class 16 | Step 4: handle the submit.
const contactForm = document.querySelector("#contact-form");

if (contactForm) {
    const repeatingChars = /([a-zA-Z ])\1{4,}/;
    const MIN_ONPAGE_TIME = 5000;
    const COOLDOWN_MS = 60000;
    const pageLoadTime = Date.now();

    const formStatus = document.querySelector("#form-status");

    contactForm.addEventListener("submit", function (event) {
        console.log("Info: message requested.");
        event.preventDefault();

        const now = Date.now();
        const name = document.querySelector("#name").value;
        const message = document.querySelector("#message").value;
        const lastSubmit = localStorage.getItem('last_submit_time');

        if (!message || message?.length < 10) {
            console.log("Info: message null or too short.");
            formStatus.textContent = "Extend Message!";
            formStatus.classList.add("Error");
            setTimeout(() => {
                formStatus.textContent = "";
            }, 5000);
            return;
        }
        // I don't know of any words or acronyms with four or more of the same letter in a row
        else if (repeatingChars.test(message)) {
            console.log("Info: Please remove duplicate artifacts.");
            formStatus.textContent = "Remove duplicate artifacts.";
            formStatus.classList.add("Error");
            setTimeout(() => {
                formStatus.textContent = "";
            }, 5000);
            return;
        }
        // Minimum 5 second on page to write the email
        else if (now - pageLoadTime < MIN_ONPAGE_TIME) {
            console.log("Info: please wait before continuing.");
            const secondsLeft = Math.ceil((MIN_ONPAGE_TIME - (now - pageLoadTime)) / 1000);
            formStatus.textContent = `Please wait ${secondsLeft} seconds before continuing.`;
            formStatus.classList.add("Error");
            setTimeout(() => {
                formStatus.textContent = "";
            }, 5000);
            return;
        }
        // Cool-down requirement of 60s to not spam emails 
        else if (lastSubmit && now - parseInt(lastSubmit, 10) < COOLDOWN_MS) {
            console.log("Info: cooldown active.");
            const secondsLeft = Math.ceil((COOLDOWN_MS - (now - parseInt(lastSubmit, 10))) / 1000);
            formStatus.textContent = `Please wait ${secondsLeft} seconds before sending another message.`;
            formStatus.classList.add("Error");
            setTimeout(() => {
                formStatus.textContent = "";
            }, 5000);
            return;
        } else {
            console.log("Info: message sent successfully.");
            localStorage.setItem('last_submit_time', now.toString());
            formStatus.textContent = "Thank you, " + name + ". Your message is sent.";
            formStatus.classList.remove("Error");
            contactForm.submit();
        }

        contactForm.reset();
        setTimeout(() => {
            formStatus.textContent = "";
        }, 5000);
    });
}