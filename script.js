// Class 15 | Step 1: this file is running.
console.log("Info: JS is running");

// Class 15 | Step 2: put this year in the footer
const yearSpan = document.querySelector("#year");
yearSpan.textContent = new Date().getFullYear();

// CLass 15 | Step 3: a button that changes the page
const themeButton = document.querySelector("#toggle-theme");
themeButton.addEventListener("click", function () {
    document.body.classList.toggle("light")
});