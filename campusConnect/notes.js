const BASE_URL = "http://localhost:5000";

const notesForm = document.getElementById("notesForm");
const notesTable = document.querySelector("#notesTable tbody");
const searchInput = document.getElementById("search");

// Load notes when page opens
document.addEventListener("DOMContentLoaded", loadNotes);

// Upload Note
notesForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("subject", document.getElementById("subject").value);
    formData.append("title", document.getElementById("title").value);
    formData.append("description", document.getElementById("description")?.value || "");
    formData.append("semester", document.getElementById("semester").value);

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    formData.append("uploadedBy", user.name);

    const file = document.getElementById("file").files[0];

    if (file) {
        formData.append("file", file);
    }

    try {
        const response = await fetch(BASE_URL + "/api/notes", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("notes uploaded successfully!");
            notesForm.reset();
            loadNotes();
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.error(error);
        alert("Unable to upload note.");
    }
});

// Load Notes
async function loadNotes() {

    try {

        const response = await fetch(BASE_URL + "/api/notes");
        const notes = await response.json();

        notesTable.innerHTML = "";

        notes.forEach(note => {

            const fileLink = note.file
                ? `<a href="${BASE_URL}/uploads/${note.file}" target="_blank">Download</a>`
                : "No File";

            notesTable.innerHTML += `
                <tr>
                    <td>${note.subject}</td>
                    <td>${note.title}</td>
                    <td>${note.semester || "-"}</td>
                    <td>${fileLink}</td>
                    <td>${note.uploadedBy}</td>
                </tr>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}

// Search Notes
searchInput.addEventListener("keyup", function () {

    const filter = searchInput.value.toLowerCase();
    const rows = notesTable.querySelectorAll("tr");

    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(filter)
            ? ""
            : "none";
    });

});