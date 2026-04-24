// Scroll Reveal Animation
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => observer.observe(el));



    // Navbar background change on scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
            nav.style.padding = '0.5rem 0';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.8)';
            nav.style.padding = '1rem 0';
        }
    });
    // Testimonial Carousel
    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
        const slides = document.querySelectorAll('.testimonial-slide');
        let currentSlide = 0;
        const totalSlides = slides.length;

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
});
