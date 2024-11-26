// Reports page-specific functionality
document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("report-table-body");
    const searchBar = document.getElementById("search-bar");

    // Retrieve data from localStorage
    const storedData = JSON.parse(localStorage.getItem("contentData")) || [];

    // Function to render table rows
    const renderTable = (data) => {
        tableBody.innerHTML = ""; // Clear existing rows

        if (data.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">No reports found</td>
                </tr>`;
            return;
        }

        data.forEach((content, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="${content.image}" alt="${content.title}" style="width: 50px; height: auto;"></td>
                <td>${content.title}</td>
                <td>${content.description}</td>
            `;
            tableBody.appendChild(row);
        });

        // Attach delete functionality
        document.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                storedData.splice(index, 1);
                localStorage.setItem("contentData", JSON.stringify(storedData));
                renderTable(storedData); // Re-render table
            });
        });
    };

    // Render table initially
    renderTable(storedData);

    // Search Bar functionality
    searchBar.addEventListener("input", function () {
        const query = searchBar.value.toLowerCase();
        const filteredData = storedData.filter((content) =>
            content.title.toLowerCase().includes(query) ||
            content.description.toLowerCase().includes(query)
        );
        renderTable(filteredData);
    });
});
