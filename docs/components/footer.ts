export function createFooter(): string {
    return `
        <footer>
            <p>&copy; ${new Date().getFullYear()} Coastal Community of John of the Cross. All rights reserved.</p>
            <nav>
                <ul>
                    <li><a href="/pages/about.html">About</a></li>
                    <li><a href="/pages/members.html">Members</a></li>
                    <li><a href="/pages/events.html">Events</a></li>
                    <li><a href="/pages/contact.html">Contact</a></li>
                </ul>
            </nav>
        </footer>
    `;
}