
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
            formStatus.classList.add("error");
            setTimeout(() => {
                formStatus.textContent = "";
            }, 5000);
            return;
        }
        // I don't know of any words or acronyms with four or more of the same letter in a row
        else if (repeatingChars.test(message)) {
            console.log("Info: Please remove duplicate artifacts.");
            formStatus.textContent = "Remove duplicate artifacts.";
            formStatus.classList.add("error");
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
            formStatus.classList.add("error");
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
            formStatus.classList.add("error");
            setTimeout(() => {
                formStatus.textContent = "";
            }, 5000);
            return;
        } else {
            console.log("Info: message sent successfully.");
            localStorage.setItem('last_submit_time', now.toString());
            formStatus.textContent = "Thank you, " + name + ". Your message is sent.";
            formStatus.classList.remove("error");
            contactForm.submit();
        }
    });
}