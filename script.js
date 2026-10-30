// Class 15 | Step 1: this file is running.
console.log("Info: JS is running");

console.log("Info: get year for copyright")

// Class 15 | Step 2: put this year in the footer.
// Lab 15 | Step 2: add a try catch.
const yearSpan = document.querySelector("#year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Class 15 | Step 3: a button that changes the page
const themeButton = document.querySelector("#toggle-theme");

if (themeButton) {
    // Lab 15 · Task 4: use the saved choice on arrival
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light");
        themeButton.textContent = "Light Mode";
    } else {
        document.body.classList.remove("light"); 
        themeButton.textContent = "Light Mode"; 
    }

    // Lab 15 · Task 3 and 4: the label swaps
    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("light");
        
        if (document.body.classList.contains("light")) {
            console.log("Info: set light theme")
            themeButton.textContent = "Dark Mode";
            localStorage.setItem("theme", "light");
        } else {
            console.log("Info: set dark theme")
            themeButton.textContent = "Light Mode";
            localStorage.setItem("theme", "dark");
        }
    });
} else {
    console.log("ERROR: button failed to set");
}

// Lab 15 · Task 5: Toggle collapsible sections using buttons
const dropdownButtons = document.querySelectorAll(".dropdown");

dropdownButtons.forEach(button => {
    button.addEventListener("click", function () {
        // show the div class around the header to java
        const header = this.closest(".align-header");
        const targetContent = header.nextElementSibling;
        
        if (targetContent) {
            targetContent.classList.toggle("hidden");
            
            // Swap arrow text between v (open) and > (closed)
            if (targetContent.classList.contains("hidden")) {
                this.textContent = ">";
            } else {
                this.textContent = "v";
            }
        } else {
            console.log("ERROR: No content found below this header to toggle!");
        }
    });
});