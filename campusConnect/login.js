const BASE_URL = "http://localhost:5000";

function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    fetch(BASE_URL + "/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    .then(async (response) => {
        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert(data.message);

            window.location.href = "index.html";
        } else {
            alert(data.message);
        }
    })
    .catch((error) => {
        console.error(error);
        alert("Unable to connect to the server.");
    });
}