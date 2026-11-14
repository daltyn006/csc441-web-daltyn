// Class 15 | Step 1: this file is running.
console.log("Info: load javascript");

// Class 15 | Step 2: put this year in the footer.
// Lab 15 | Step 2: add a try catch.
const yearSpan = document.querySelector("#year");
if (yearSpan) {
    console.log("Info: get year for copyright")
    yearSpan.textContent = new Date().getFullYear();
}



