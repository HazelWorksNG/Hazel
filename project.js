/*document.addEventListener("DOMContentLoaded", () => {
    // 1. Select all cards, expand buttons, and close buttons
    const cards = document.querySelectorAll(".case-study");

    // 2. Use .forEach() to loop through each card individually
    cards.forEach((card) => {
        const expandBtn = card.querySelector(".expand-btn");
        const closeBtn = card.querySelector(".closebtn");

        // Command to open THIS specific card in fullscreen
        expandBtn.addEventListener("click", () => {
            card.classList.add("fullscreen");
        });

        // Command to take THIS specific card back to grid layout
        closeBtn.addEventListener("click", () => {
            card.classList.remove("fullscreen");
        });
    });
});*/

document.addEventListener("DOMContentLoaded", () => {
    const caseStudies = document.querySelectorAll(".case-study");

    caseStudies.forEach((section) => {
        const expandBtn = section.querySelector(".expand-btn");
        const closeBtn = section.querySelector(".closebtn");
        const workspace = section.querySelector(".workspace");
        const projectGrid = section.querySelector(".project-grid");

        // Open this case study and hide others
        expandBtn.addEventListener("click", () => {
            // Add expanded state to this item
            section.classList.add("is-expanded");
            workspace.style.display = "grid";
            projectGrid.style.display = "none";

            // Tell the parent container to hide sibling case studies
            section.parentElement.classList.add("has-active-case-study");
        });

        // Close this case study and bring back others
        closeBtn.addEventListener("click", () => {
            section.classList.remove("is-expanded");
            workspace.style.display = "none";
            projectGrid.style.display = "grid";

            // Remove the container modifier so other case studies reappear
            section.parentElement.classList.remove("has-active-case-study");
        });
    });
});