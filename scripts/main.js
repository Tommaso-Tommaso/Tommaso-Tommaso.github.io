// Dropdown Navigation and Mobile Menu Functionality

function CarmeliteInitNav() {
    const header = document.querySelector('.sticky-nav');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    function handleScroll() {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    function adjustMobileMenuPosition() {
        if (!header || !mainMenu) return;
        try {
            const headerHeight = header.getBoundingClientRect().height;
            if (window.innerWidth <= 768) {
                mainMenu.style.top = `${Math.ceil(headerHeight)}px`;
            } else {
                mainMenu.style.top = '';
            }
        } catch (e) {}
    }

    function toggleMobileMenu() {
        adjustMobileMenuPosition();
        if (!mobileToggle || !mainMenu) return;
        mobileToggle.classList.toggle('active');
        mainMenu.classList.toggle('active');
        document.body.style.overflow = mainMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileMenu(event) {
        if (!mainMenu || !mobileToggle) return;
        if (!mainMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
            mobileToggle.classList.remove('active');
            mainMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    let hoverTimeout;
    function handleDropdownHover(dropdown, isEntering) {
        clearTimeout(hoverTimeout);
        if (isEntering) dropdown.classList.add('hover');
        else hoverTimeout = setTimeout(() => dropdown.classList.remove('hover'), 150);
    }

    function initPhotoCarousel() {
        const carousels = document.querySelectorAll('.photo-carousel');
        carousels.forEach(carousel => {
            const items = carousel.querySelectorAll('.carousel-item');
            let currentIndex = 0;
            function rotateCarousel() {
                items.forEach((item, index) => item.classList.toggle('active', index === currentIndex));
                currentIndex = (currentIndex + 1) % items.length;
            }
            setInterval(rotateCarousel, 3000);
        });
    }

    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    function initKeyboardNavigation() {
        const menuItems = document.querySelectorAll('.main-menu a, .dropdown-content a');
        menuItems.forEach(item => {
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    // Bind listeners
    window.addEventListener('scroll', handleScroll);
    if (mobileToggle) mobileToggle.addEventListener('click', toggleMobileMenu);
    document.addEventListener('click', closeMobileMenu);

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        dropdown.addEventListener('mouseenter', () => handleDropdownHover(dropdown, true));
        dropdown.addEventListener('mouseleave', () => handleDropdownHover(dropdown, false));
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    initPhotoCarousel();
    initSmoothScroll();
    initKeyboardNavigation();
    adjustMobileMenuPosition();
    window.addEventListener('resize', adjustMobileMenuPosition);

    // Preload critical images
    const preloads = [
        'https://upload.wikimedia.org/wikipedia/commons/9/9a/John_of_the_Cross_crucifixion_sketch.jpg'
    ];
    preloads.forEach(src => { const img = new Image(); img.src = src; });
}

document.addEventListener('DOMContentLoaded', async function() {
    const header = document.querySelector('.sticky-nav');
    // Try to load shared nav partial
    try {
        if (header) {
            const resp = await fetch('partials/nav.html', { cache: 'no-cache' });
            if (resp.ok) {
                const html = await resp.text();
                header.innerHTML = html;
            }
        }
    } catch (e) {
        // ignore if partial not found; fallback to inline nav
    }

    // Initialize nav behaviors (works for both inline or injected nav)
    CarmeliteInitNav();
});

// Utility function for external use
window.CarmeliteNav = {
    toggleMobileMenu: function() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mainMenu = document.querySelector('.main-menu');
        
        mobileToggle.classList.toggle('active');
        mainMenu.classList.toggle('active');
    },
    
    closeMobileMenu: function() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mainMenu = document.querySelector('.main-menu');
        
        mobileToggle.classList.remove('active');
        mainMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
};
