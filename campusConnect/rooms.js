const BASE_URL = "https://campusconnect-dwrq.onrender.com";

const roomForm = document.getElementById("roomForm");
const roomContainer = document.getElementById("roomContainer");
const searchInput = document.getElementById("search");

// Load rooms when page opens
document.addEventListener("DOMContentLoaded", loadRooms);

// Add Room
roomForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("location", document.getElementById("location").value);
    formData.append("rent", document.getElementById("rent").value);
    formData.append("roomType", document.getElementById("roomType").value);
    formData.append("furnished", document.getElementById("furnished").value);
    formData.append("contact", document.getElementById("contact").value);
    formData.append("description", document.getElementById("description").value);

    const image = document.getElementById("image").files[0];

    if (image) {
        formData.append("image", image);
    }

    try {
        const response = await fetch(BASE_URL + "/api/rooms", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Room added successfully!");
            roomForm.reset();
            loadRooms();
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.error(error);
        alert("Unable to add room.");
    }
});

// Load Rooms
async function loadRooms() {

    try {

        const response = await fetch(BASE_URL + "/api/rooms");
        const rooms = await response.json();

        roomContainer.innerHTML = "";

        rooms.forEach(room => {

            const image = room.image
                ? `${BASE_URL}/uploads/${room.image}`
                : "https://via.placeholder.com/300x200?text=No+Image";

            roomContainer.innerHTML += `
                <div class="book-card room-card">

                    <img src="${image}" alt="Room">

                    <h3>${room.location}</h3>

                    <p><strong>Rent:</strong> ₹${room.rent}/month</p>

                    <p><strong>Room Type:</strong> ${room.roomType}</p>

                    <p><strong>Furnished:</strong> ${room.furnished}</p>

                    <p>${room.description || ""}</p>

                    <p><strong>Contact:</strong> ${room.contact}</p>

                </div>
            `;
        });

    } catch (error) {
        console.error(error);
        alert("Unable to load rooms.");
    }
}

// Search Rooms
searchInput.addEventListener("keyup", function () {

    const filter = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".room-card");

    cards.forEach(card => {

        if (card.innerText.toLowerCase().includes(filter)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});