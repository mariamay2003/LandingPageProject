document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll("section");
    const navbarList = document.getElementById("navbar__list");

    // Dynamically create the navbar list items based on the sections
    sections.forEach((section) => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");

        link.textContent = section.dataset.nav;
        link.classList.add("menu__link");
        link.href = `#${section.id}`;

        // Add click event to the link to smoothly scroll to the section
        link.addEventListener("click", function (e) {
            e.preventDefault();

            // Remove active class from all links
            document.querySelectorAll('.menu__link').forEach((link) => link.classList.remove('active'));

            // Add active class to the clicked link
            this.classList.add('active');

            section.scrollIntoView({ behavior: "smooth" });
        });

        listItem.appendChild(link);
        navbarList.appendChild(listItem);
    });


    // Add "active" class to the section when it's near the top of the viewport
    window.addEventListener('scroll', () => {
        const links = document.querySelectorAll('.menu__link');
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const link = document.querySelector(`.menu__link[href="#${section.id}"]`);

            if (rect.top <= 150 && rect.bottom >= 150) {
                sections.forEach(sec => sec.classList.remove('your-active-class'));
                links.forEach(l => l.classList.remove('active'));

                section.classList.add('your-active-class');
                link.classList.add('active');
            }
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


});  
