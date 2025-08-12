document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-container');
    const pageId = document.body.id; // e.g., 'nature-page'

    if (cardContainer && pageId) {
        // Extract the page name (e.g., 'nature') from the body ID
        const currentPage = pageId.replace('-page', ''); 
        
        // Filter the main data array to get only the items for the current page
        const pageData = karnatakaData.filter(item => item.page === currentPage);

        if (pageData.length > 0) {
            generateCards(pageData);
        } else {
            cardContainer.innerHTML = '<p>No content available for this section yet.</p>';
        }
    }

    function generateCards(data) {
        let cardsHTML = '';
        data.forEach(item => {
            // Generate HTML for the details section dynamically
            let detailsHTML = '';
            for (const key in item.details) {
                detailsHTML += `<p><strong>${key}:</strong> ${Array.isArray(item.details[key])? item.details[key].join(', ') : item.details[key]}</p>`;
            }

            // Use template literals to construct the card HTML
            cardsHTML += `
                <div class="card">
                    <img src="${item.imageUrl}" alt="${item.title}" class="card-img">
                    <div class="card-content">
                        <h3 class="card-title">${item.title}</h3>
                        <p class="card-category">${item.category}</p>
                        <p class="card-description">${item.description}</p>
                        <div class="card-details">
                            ${detailsHTML}
                        </div>
                    </div>
                </div>
            `;
        });
        cardContainer.innerHTML = cardsHTML;
    }
});