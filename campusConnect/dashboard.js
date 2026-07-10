// Check if user is logged in
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user) {
    alert("Please login first.");
    window.location.href = "login.html";
}

// Display welcome message
const welcomeHeading = document.getElementById("welcome");

if (welcomeHeading) {
    welcomeHeading.innerHTML = `Welcome ${user.name} 👋`;
}

// Logout function
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully!");

    window.location.href = "login.html";
}