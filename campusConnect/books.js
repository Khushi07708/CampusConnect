const BASE_URL = "https://campusconnect-dwrq.onrender.com";

const bookForm = document.getElementById("bookForm");
const booksContainer = document.getElementById("booksContainer");
const searchInput = document.getElementById("search");

// Load books when page opens
document.addEventListener("DOMContentLoaded", loadBooks);

// Add Book
bookForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", document.getElementById("title").value);
    formData.append("author", document.getElementById("author").value);
    formData.append("price", document.getElementById("price").value);
    formData.append("condition", document.getElementById("condition").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("seller", document.getElementById("seller").value);
    formData.append("contact", document.getElementById("contact").value);

    const image = document.getElementById("image").files[0];

    if (image) {
        formData.append("image", image);
    }

    try {
        const response = await fetch(BASE_URL + "/api/books", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Book added successfully!");
            bookForm.reset();
            loadBooks();
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.error(error);
        alert("Unable to add book.");
    }
});

// Load Books
async function loadBooks() {

    try {

        const response = await fetch(BASE_URL + "/api/books");
        const books = await response.json();

        booksContainer.innerHTML = "";

        books.forEach(book => {

            const image = book.image
                ? `${BASE_URL}/uploads/${book.image}`
                : "https://via.placeholder.com/200x150?text=No+Image";

            booksContainer.innerHTML += `
                <div class="card book-card">
                    <img src="${image}" width="200">

                    <h3>${book.title}</h3>

                    <p><strong>Author:</strong> ${book.author}</p>

                    <p><strong>Price:</strong> ₹${book.price}</p>

                    <p><strong>Condition:</strong> ${book.condition}</p>

                    <p>${book.description || ""}</p>

                    <p><strong>Seller:</strong> ${book.seller}</p>

                    <p><strong>Contact:</strong> ${book.contact}</p>

                </div>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}

// Search Books
searchInput.addEventListener("keyup", function () {

    const filter = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".book-card");

    cards.forEach(card => {

        card.style.display =
            card.innerText.toLowerCase().includes(filter)
                ? "block"
                : "none";

    });

});