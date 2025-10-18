// Dropdown Navigation and Mobile Menu Functionality

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.sticky-nav');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Sticky header scroll effect
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Mobile menu toggle
    function toggleMobileMenu() {
        // ensure the mobile menu is positioned under the header
        adjustMobileMenuPosition();

        mobileToggle.classList.toggle('active');
        mainMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (mainMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Close mobile menu when clicking outside
    function closeMobileMenu(event) {
        if (!mainMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
            mobileToggle.classList.remove('active');
            mainMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Handle dropdown hover delays for better UX
    let hoverTimeout;
    
    function handleDropdownHover(dropdown, isEntering) {
        clearTimeout(hoverTimeout);
        
        if (isEntering) {
            dropdown.classList.add('hover');
        } else {
            hoverTimeout = setTimeout(() => {
                dropdown.classList.remove('hover');
            }, 150);
        }
    }
    
    // Photo carousel animation
    function initPhotoCarousel() {
        const carousels = document.querySelectorAll('.photo-carousel');
        
        carousels.forEach(carousel => {
            const items = carousel.querySelectorAll('.carousel-item');
            let currentIndex = 0;
            
            function rotateCarousel() {
                items.forEach((item, index) => {
                    item.classList.toggle('active', index === currentIndex);
                });
                currentIndex = (currentIndex + 1) % items.length;
            }
            
            // Start rotation every 3 seconds
            setInterval(rotateCarousel, 3000);
        });
    }
    
    // Smooth scroll for anchor links
    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Keyboard navigation for accessibility
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
    
    // Event listeners
    window.addEventListener('scroll', handleScroll);
    mobileToggle.addEventListener('click', toggleMobileMenu);
    document.addEventListener('click', closeMobileMenu);
    
    // Dropdown hover events
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        dropdown.addEventListener('mouseenter', () => handleDropdownHover(dropdown, true));
        dropdown.addEventListener('mouseleave', () => handleDropdownHover(dropdown, false));
        
        // Touch support for mobile
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Initialize features
    initPhotoCarousel();
    initSmoothScroll();
    initKeyboardNavigation();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileToggle.classList.remove('active');
            mainMenu.classList.remove('active');
            document.body.style.overflow = '';
            // remove any inline top style on desktop
            mainMenu.style.top = '';
        }
    });

    // Dynamically adjust the mobile menu position so it sits just under the fixed header
    function adjustMobileMenuPosition() {
        if (!header || !mainMenu) return;
        try {
            const headerHeight = header.getBoundingClientRect().height;
            // apply only for small screens where the mobile menu is fixed
            if (window.innerWidth <= 768) {
                mainMenu.style.top = `${Math.ceil(headerHeight)}px`;
            } else {
                mainMenu.style.top = '';
            }
        } catch (e) {
            // silent fail - not critical
        }
    }

    // run once on load
    adjustMobileMenuPosition();
    // also adjust on orientation change / resize
    window.addEventListener('resize', adjustMobileMenuPosition);
    
    // Preload critical images
    function preloadImages() {
        const images = [
            'https://upload.wikimedia.org/wikipedia/commons/9/9a/John_of_the_Cross_crucifixion_sketch.jpg'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    preloadImages();
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
