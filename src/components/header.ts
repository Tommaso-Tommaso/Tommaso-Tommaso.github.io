export function createHeader(): string {
        return `
                <header>
                        <h1>Coastal Community of John of the Cross</h1>
                        <nav aria-label="Main navigation">
                                <ul class="main-menu">
                                        <li><a href="index.html">Home</a></li>
                                        <li><a href="pages/about.html">About Us</a></li>
                                        <li><a href="pages/members.html">Members</a></li>
                                        <li><a href="pages/events.html">Events</a></li>
                                        <li><a href="pages/resources.html">Resources</a></li>
                                        <li><a href="pages/links.html">Links</a></li>
                                        <li><a href="pages/contact.html">Contact</a></li>
                                </ul>
                        </nav>
                </header>
                <script>
                    (function(){
                        // When a page is served from inside a "pages/" folder (e.g. pages/about.html)
                        // relative links like "pages/…" or "index.html" need a "../" prefix.
                        // This script adjusts the nav links at runtime so the same header works
                        // both from the site root and from pages/ subfolder when opened as files.
                        try{
                            var path = location.pathname || '';
                            var isInPages = path.indexOf('/pages/') !== -1 || path.match(/[/\\]pages[/\\]/);
                            if(isInPages){
                                var nav = document.querySelector('nav[aria-label="Main navigation"]') || document.querySelector('nav');
                                if(nav){
                                    Array.prototype.forEach.call(nav.querySelectorAll('a'), function(a){
                                        var href = a.getAttribute('href');
                                        if(!href) return;
                                        // If href already starts with ../ or is absolute/external, leave it
                                        if(href.indexOf('../') === 0 || href.indexOf('http') === 0 || href.indexOf('/') === 0) return;
                                        if(href.indexOf('pages/') === 0){
                                            a.setAttribute('href', '../' + href);
                                        } else if(href === 'index.html'){
                                            a.setAttribute('href', '../index.html');
                                        }
                                    });
                                }
                            }
                        }catch(e){ /* no-op */ }
                    })();
                </script>
        `;
}