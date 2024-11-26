// Main JavaScript for general page functionality (e.g., navigation, handling interactions)
document.addEventListener("DOMContentLoaded", function () {
    // Example interaction for the Hamburger menu if needed
    const hamburger = document.getElementById("hamburger");
    const sidebar = document.getElementById("sidebar");

    hamburger.addEventListener("click", function () {
        sidebar.classList.toggle("active");
    });
});
