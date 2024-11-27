document.addEventListener("DOMContentLoaded", () => {
    // Function to render meets from localStorage
    function renderMeets() {
        const meetsContainer = document.getElementById("meetsContainer");
        const meets = JSON.parse(localStorage.getItem("meets")) || [];

        meetsContainer.innerHTML = ""; // Clear previous meets

        if (meets.length > 0) {
            meets.forEach((meet, index) => {
                const meetDiv = document.createElement("div");
                meetDiv.classList.add("meet-item");
                meetDiv.innerHTML = `
                    <p><strong>Meet Name:</strong> ${meet.meetName}</p>
                    <p><strong>Date:</strong> ${meet.date}</p>
                    <p><strong>Swimming Pool Name:</strong> ${meet.poolName}</p>
                    <p><strong>Number of Events:</strong> ${meet.numEvents}</p>
                    <p><strong>Location:</strong> ${meet.location}</p>
                    <button class="delete-btn" data-id="${index}">Delete Meet</button>
                `;
                meetsContainer.appendChild(meetDiv);
            });
        } else {
            meetsContainer.innerHTML = "<p>No meets have been posted yet.</p>";
        }
    }

    // Function to delete a meet from localStorage
    function deleteMeet(index) {
        const meets = JSON.parse(localStorage.getItem("meets")) || [];
        meets.splice(index, 1); // Remove the meet from the array
        localStorage.setItem("meets", JSON.stringify(meets)); // Update localStorage
        renderMeets(); // Re-render the list
        showSuccessMessage(); // Show success message
    }

    // Success message function
    function showSuccessMessage() {
        const successMessage = document.getElementById("successMessage");
        successMessage.style.display = "block"; // Show the success message
        setTimeout(() => {
            successMessage.style.display = "none"; // Hide after 3 seconds
        }, 3000);
    }

    // Event listener for deleting meets using event delegation
    document.getElementById("meetsContainer").addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            const index = event.target.getAttribute("data-id");
            deleteMeet(index);
        }
    });

    // Form submission logic to add a new meet
    const form = document.getElementById("meetForm");
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent page reload

        const meetName = document.getElementById("meetName").value;
        const date = document.getElementById("date").value;
        const poolName = document.getElementById("poolName").value;
        const numEvents = document.getElementById("numEvents").value;
        const location = document.getElementById("location").value;
        let registration = document.getElementById("registration").value;
        const newMeet = {
            meetName,
            date,
            registration,
            poolName,
            numEvents,
            location
        };

        const meets = JSON.parse(localStorage.getItem("meets")) || [];
        meets.push(newMeet); // Add the new meet
        localStorage.setItem("meets", JSON.stringify(meets)); // Save to localStorage

        form.reset(); // Reset the form
        renderMeets(); // Re-render the list
        alert("Meet added successfully!");
    });

    // Initial render when page loads
    renderMeets();
});
