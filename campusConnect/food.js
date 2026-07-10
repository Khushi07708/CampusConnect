const BASE_URL = "http://localhost:5000";

const foodForm = document.getElementById("foodForm");
const foodContainer = document.getElementById("foodContainer");
const searchInput = document.getElementById("search");

// Load food services when page opens
document.addEventListener("DOMContentLoaded", loadFoods);

// Add Food Service
foodForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("serviceName", document.getElementById("serviceName").value);
    formData.append("foodType", document.getElementById("foodType").value);
    formData.append("location", document.getElementById("location").value);
    formData.append("price", document.getElementById("price").value);
    formData.append("contact", document.getElementById("contact").value);
    formData.append("description", document.getElementById("description").value);

    const image = document.getElementById("image").files[0];

    if (image) {
        formData.append("image", image);
    }

    try {
        const response = await fetch(BASE_URL + "/api/food", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Food service added successfully!");
            foodForm.reset();
            loadFoods();
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.error(error);
        alert("Unable to add food service.");
    }
});

// Load Food Services
async function loadFoods() {

    try {

        const response = await fetch(BASE_URL + "/api/food");
        const foods = await response.json();

        foodContainer.innerHTML = "";

        foods.forEach(food => {

            const image = food.image
                ? `${BASE_URL}/uploads/${food.image}`
                : "https://via.placeholder.com/250x180?text=No+Image";

            foodContainer.innerHTML += `
                <div class="book-card food-card">

                    <img src="${image}" alt="Food Service">

                    <h3>${food.serviceName}</h3>

                    <p><strong>Type:</strong> ${food.foodType}</p>

                    <p><strong>Location:</strong> ${food.location}</p>

                    <p><strong>Price:</strong> ₹${food.price}/month</p>

                    <p>${food.description || ""}</p>

                    <p><strong>Contact:</strong> ${food.contact}</p>

                </div>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}

// Search
searchInput.addEventListener("keyup", function () {

    const filter = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".food-card");

    cards.forEach(card => {

        card.style.display =
            card.innerText.toLowerCase().includes(filter)
                ? "block"
                : "none";

    });

});