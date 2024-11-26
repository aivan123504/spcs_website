// Dashboard page-specific functionality
document.addEventListener("DOMContentLoaded", function () {
    const cardsContainer = document.getElementById("cards-container");

    // Retrieve data from localStorage
    const storedData = JSON.parse(localStorage.getItem("contentData")) || [];

    // Clear existing cards (if any)
    cardsContainer.innerHTML = "";

    // Generate cards dynamically
    storedData.forEach((content, index) => {
        const card = document.createElement("div");
        card.className = "col-md-4 card";

        card.innerHTML = `
            <div class="card-body">
                <img src="${content.image}" class="card-img" alt="${content.title}">
                <h5 class="card-title">${content.title}</h5>
                <p class="card-text">${content.description}</p>
                <button class="btn btn-danger delete-btn" data-index="${index}">Delete</button>
            </div>
        `;

        cardsContainer.appendChild(card);
    });

    // Handle delete button functionality
    document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            storedData.splice(index, 1);
            localStorage.setItem("contentData", JSON.stringify(storedData));
            location.reload(); // Reload to reflect changes
        });
    });

    // Search Bar functionality
    const searchBar = document.getElementById("search-bar");
    searchBar.addEventListener("input", function () {
        const query = searchBar.value.toLowerCase();
        const filteredData = storedData.filter((content) => 
            content.title.toLowerCase().includes(query) || 
            content.description.toLowerCase().includes(query)
        );
        cardsContainer.innerHTML = "";
        filteredData.forEach((content, index) => {
            const card = document.createElement("div");
            card.className = "col-md-4 card";
            card.innerHTML = `
                <div class="card-body">
                    <img src="${content.image}" class="card-img" alt="${content.title}">
                    <h5 class="card-title">${content.title}</h5>
                    <p class="card-text">${content.description}</p>
                    <button class="btn btn-danger delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            cardsContainer.appendChild(card);
        });
    });
});
