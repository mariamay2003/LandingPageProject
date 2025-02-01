document.addEventListener('DOMContentLoaded', function () {
    // Select all section elements and the navbar list
    const sections = document.querySelectorAll("section");
    const navbarList = document.getElementById("navbar__list");

    // Dynamically create the navbar list items based on the sections
    sections.forEach((section) => {
        // Create a list item and an anchor tag for each section
        const listItem = document.createElement("li");
        const link = document.createElement("a");

        // Set the text of the link to be the value of the data-nav attribute of the section
        link.textContent = section.dataset.nav;
        link.classList.add("menu__link");

        // Add click event to the link to smoothly scroll to the section
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent the default action of the link

            // Get the top offset of the section for smooth scrolling
            const sectionOffsetTop = section.offsetTop;
            window.scrollTo({
                top: sectionOffsetTop, // Scroll to the section's top offset
                behavior: "smooth" // Enable smooth scrolling
            });
        });

        // Append the link to the list item, then append the list item to the navbar
        listItem.appendChild(link);
        navbarList.appendChild(listItem);
    });

    // Add "active" class to the section when it's near the top of the viewport
    window.addEventListener('scroll', () => {
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect(); // Get the position of the section relative to the viewport
            if (rect.top <= 150 && rect.bottom >= 150) {
                // If the section is in the viewport, add the active class
                section.classList.add('your-active-class');
            } else {
                // If the section is not in the viewport, remove the active class
                section.classList.remove('your-active-class');
            }
        });
    });
});

let lastScrollTop = 0;  // To keep track of the last scroll position
let navbar = document.querySelector(".page__header");

window.addEventListener("scroll", function () {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop; // Get the current scroll position

    // If the user is scrolling down
    if (currentScroll > lastScrollTop && currentScroll > navbar.offsetHeight) {
        // Hide the navbar if the user is scrolling down and has scrolled past the navbar's height
        navbar.style.top = `-${navbar.offsetHeight}px`; // Move the navbar above the viewport
    } else if (currentScroll < lastScrollTop || currentScroll <= navbar.offsetHeight) {
        // Show the navbar if the user is scrolling up or at the top of the page
        navbar.style.top = "0"; // Reset the navbar's position
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll values
});

// Show the navbar after 1 second of no scrolling
let timeout;
window.addEventListener('scroll', function () {
    clearTimeout(timeout); // Clear any previous timeout
    timeout = setTimeout(function () {
        navbar.style.top = "0"; // Show the navbar after 1 second of inactivity
    }, 1000); // Delay of 1 second
});


