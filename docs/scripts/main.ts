// This is the main TypeScript file for the Coastal Community of John of the Cross website.
// It handles interactions and dynamic content for the site.

import { renderHeader } from '../components/header';
import { renderFooter } from '../components/footer';

// Function to initialize the website
function init() {
    const app = document.getElementById('app');
    if (app) {
        app.innerHTML = `
            ${renderHeader()}
            <main>
                <h1>Welcome to the Coastal Community of John of the Cross</h1>
                <p>This is a place for spiritual growth and community.</p>
            </main>
            ${renderFooter()}
        `;
    }
}

// Call the init function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);