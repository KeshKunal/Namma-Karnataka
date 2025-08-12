document.addEventListener('DOMContentLoaded', () => {

    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // --- THIS IS THE FIX ---
    // Only run the theme logic if the toggle button exists on the page
    if (themeToggleButton) {
        const applyTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                body.dataset.theme = 'dark';
                themeToggleButton.textContent = '☀️';
            } else {
                body.dataset.theme = 'light';
                themeToggleButton.textContent = '🌙';
            }
        };

        themeToggleButton.addEventListener('click', () => {
            if (body.dataset.theme === 'dark') {
                body.dataset.theme = 'light';
                localStorage.setItem('theme', 'light');
                themeToggleButton.textContent = '🌙';
            } else {
                body.dataset.theme = 'dark';
                localStorage.setItem('theme', 'dark');
                themeToggleButton.textContent = '☀️';
            }
        });

        applyTheme(); // Apply theme on every page load
    }


    // --- NAVIGATION MENU WITH ACTIVE STATE (For all pages) ---
    // This part remains the same
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });


    // --- FORM VALIDATION & STORAGE (Only runs if the form exists) ---
    // This part remains the same
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const successMessage = document.getElementById('success-message');

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let isValid = true;

            // Hide previous messages
            successMessage.style.display = 'none';
            document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');

            // Validate fields
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                nameInput.nextElementSibling.style.display = 'block';
                isValid = false;
            }

            const emailInput = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value)) {
                emailInput.nextElementSibling.style.display = 'block';
                isValid = false;
            }

            const messageInput = document.getElementById('message');
            if (messageInput.value.trim() === '') {
                messageInput.nextElementSibling.style.display = 'block';
                isValid = false;
            }

            // If valid, save to localStorage
            if (isValid) {
                const formData = {
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    message: messageInput.value.trim(),
                    submittedAt: new Date().toISOString()
                };
                let submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
                submissions.push(formData);
                localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

                successMessage.style.display = 'block';
                contactForm.reset();
            }
        });
    }
});