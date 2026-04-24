document.addEventListener('DOMContentLoaded', () => {

    // ── Lucide icons ──────────────────────────────────────────
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // ── Navbar: shrink on scroll ──────────────────────────────
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        const isMobile = window.innerWidth <= 768;
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
            nav.style.padding = isMobile ? '10px 20px' : '0.5rem 60px';
        } else {
            nav.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)';
            nav.style.padding = isMobile ? '15px 20px' : '30px 60px';
        }
    }, { passive: true });

    // ── Scroll spy: highlight active nav link ─────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active-link', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => spyObserver.observe(s));

    // ── Scroll reveal ─────────────────────────────────────────
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ── Menu filtering ────────────────────────────────────────
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item-text');

    function filterMenu(category) {
        menuItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
        });
        setTimeout(() => {
            menuItems.forEach(item => {
                item.style.display = item.getAttribute('data-category') === category ? 'block' : 'none';
            });
            setTimeout(() => {
                menuItems.forEach(item => {
                    if (item.style.display === 'block') {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }
                });
            }, 50);
        }, 300);
    }

    // Initial state
    menuItems.forEach(item => {
        if (item.getAttribute('data-category') === 'grace-meals') {
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        } else {
            item.style.display = 'none';
            item.style.opacity = '0';
        }
    });

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterMenu(button.getAttribute('data-category'));
        });
    });

    // ── Testimonial carousel ──────────────────────────────────
    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
        const slides = document.querySelectorAll('.testimonial-slide');
        let currentSlide = 0;
        const totalSlides = slides.length;
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            carousel.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
        }
        setInterval(nextSlide, 5000);
    }

    // ── Mobile hamburger ──────────────────────────────────────
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('mobile-open');
        });
        navLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinksContainer.classList.remove('mobile-open');
            });
        });
    }

});
