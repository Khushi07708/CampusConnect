alert("register.js loaded");
const BASE_URL = "https://campusconnect-dwrq.onrender.com";

// Show / Hide Password
function togglePassword() {

    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    if (password.type === "password") {
        password.type = "text";
        confirmPassword.type = "text";
    } else {
        password.type = "password";
        confirmPassword.type = "password";
    }
}

// Register Function
function register() {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const college = document.getElementById("college").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Validation
    if (
        name === "" ||
        email === "" ||
        college === "" ||
        password === "" ||
        confirmPassword === ""
    ) {
        alert("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    fetch(BASE_URL + "/api/auth/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name,
        email,
        college,
        password
    })
})
.then(async (response) => {
    const data = await response.json();

    if (response.ok) {
        alert(data.message);
        window.location.href = "login.html";
    } else {
        alert(data.message);
    }
})
.catch((error) => {
    console.error(error);
    alert("Unable to connect to the server.");
});


}