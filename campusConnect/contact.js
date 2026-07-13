const BASE_URL = "https://campusconnect-dwrq.onrender.com";

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    try {

        const response = await fetch(BASE_URL + "/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        alert(result.message);

        if (response.ok) {
            contactForm.reset();
        }

    } catch (error) {
        alert("Unable to send message.");
    }

});