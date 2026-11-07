// Class 15 | Step 1: this file is running.
console.log("Info: load javascript");

// Class 15 | Step 3: a button that changes the page
const themeButton = document.querySelector("#toggle-theme");
if (themeButton) {
    // Detect the browser's active OS preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemTheme = prefersDark ? 'dark' : 'light';

    // Use "default" instead of "" in the themes array and filter condition
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
    let index = themes.includes(currentTheme) ? themes.indexOf(currentTheme) : 0;

    function applyTheme(theme) {
        console.log(`Info: apply ${theme} theme to page.`);

        // If it's "default", remove the attribute; otherwise, set it to the theme name
        if (theme && theme !== "default") {
            document.documentElement.setAttribute("theme", theme);
        } else {
            document.documentElement.removeAttribute("theme");
        }

        localStorage.setItem("theme", theme);
        themeButton.textContent = `Theme: ${labels[theme]}`;
    }

    applyTheme(currentTheme);

    themeButton.addEventListener("click", () => {
        index = (index + 1) % themes.length;
        applyTheme(themes[index]);
    });
} else {
    console.log("ERROR: button failed to set.");
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

    // Lab 16 | Task 1: my own check. 
    const repeatingChars = /([a-zA-Z ])\1{4,}/;

    formStatus = document.querySelector("#form-status");
    contactForm.addEventListener("submit", function (event) {
        console.log("Info: message requested.");
        event.preventDefault();


        const name = document.querySelector("#name").value;
        const message = document.querySelector("#message").value;

        if (!message || message?.length < 10) {
            console.log("Info: message null or too short.");
            formStatus.textContent = "Extend Message!";
            formStatus.classList.add("Error");
            return;
        } else if (repeatingChars.test(message)) {
            console.log("Info: Gibberish detected, stop being stupid.");
            formStatus.textContent = "Remove duplicate artifacts.";
            formStatus.classList.add("Error");
            setTimeout(() => {
                formStatus.textContent = "";
            }, 5000);

            return;

        } else {


            console.log("Info: message sent successfully.");
            formStatus.textContent = "Thank you, " + name + ". Your message is sent.";
            // Lab 16 | Task 3: remove the error.
            formStatus.classList.remove("Error");

            // Class 18 | Step 3: Submit the form
            contactForm.submit();
        };
        contactForm.reset();
        // Clear the message after a set time from sending.
        setTimeout(() => {
            formStatus.textContent = "";
        }, 5000);
    });
};
