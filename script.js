// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const statNumbers = document.querySelectorAll('.stat-number');
const faqQuestions = document.querySelectorAll('.faq-question');
const testimonialsSlider = document.getElementById('testimonials-slider');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Mobile Navigation Toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

navToggle.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar background change on scroll
function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}

window.addEventListener('scroll', updateNavbar);

// Active navbar links on scroll
function updateActiveLink() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Fade-in animation on scroll
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .about-text, .about-visual, .testimonial-card, .pricing-card, .faq-item');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100 && elementBottom > 0) {
            element.classList.add('fade-in', 'animate');
        }
    });
}

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// Animated counters
function animateCounters() {
    statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const start = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            if (target % 1 === 0) {
                // Integer
                stat.textContent = Math.floor(target * progress);
            } else {
                // Float
                stat.textContent = (target * progress).toFixed(1);
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        }

        // Check if element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(updateCounter);
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(stat);
    });
}

// FAQ Accordion
function toggleFAQ(question) {
    const answer = question.nextElementSibling;
    const icon = question.querySelector('.faq-icon');

    // Close all other FAQs
    faqQuestions.forEach(q => {
        if (q !== question) {
            q.nextElementSibling.style.maxHeight = null;
            q.querySelector('.faq-icon').textContent = '+';
        }
    });

    // Toggle current FAQ
    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        icon.textContent = '+';
    } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.textContent = '−';
    }
}

// Testimonial Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-card');

function showSlide(index) {
    testimonialsSlider.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-slide testimonials
setInterval(nextSlide, 5000);

// Initialize functions on page load
document.addEventListener('DOMContentLoaded', function() {
    updateNavbar();
    updateActiveLink();
    fadeInOnScroll();
    animateCounters();
});

// Handle window resize for mobile menu
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Add loading animation for hero section
window.addEventListener('load', function() {
    document.querySelector('.hero').style.opacity = '1';
});

// Smooth hover effects for interactive elements
const interactiveElements = document.querySelectorAll('.feature-card, .pricing-card, .btn');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });

    element.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Accessibility improvements
// Add keyboard navigation for mobile menu
navToggle.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMobileMenu();
    }
});

// Add focus management for mobile menu
navLinks.forEach((link, index) => {
    link.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' && index < navLinks.length - 1) {
            e.preventDefault();
            navLinks[index + 1].focus();
        } else if (e.key === 'ArrowUp' && index > 0) {
            e.preventDefault();
            navLinks[index - 1].focus();
        }
    });
});

// Add ARIA attributes for better accessibility
navToggle.setAttribute('aria-label', 'Toggle navigation menu');
navToggle.setAttribute('aria-expanded', 'false');

function updateAriaExpanded() {
    const isExpanded = navMenu.classList.contains('active');
    navToggle.setAttribute('aria-expanded', isExpanded.toString());
}

navToggle.addEventListener('click', updateAriaExpanded);

// Add skip link for keyboard users (though not visible, it's good practice)
const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
document.body.insertBefore(skipLink, document.body.firstChild);

// Add main content wrapper for skip link
const mainContent = document.createElement('div');
mainContent.id = 'main-content';
const hero = document.querySelector('.hero');
document.body.insertBefore(mainContent, hero);
mainContent.appendChild(hero);

// Move all sections except nav into main content
const sectionsToMove = document.querySelectorAll('section:not(.hero)');
sectionsToMove.forEach(section => {
    mainContent.appendChild(section);
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('scroll', debounce(updateNavbar, 10));
window.addEventListener('scroll', debounce(updateActiveLink, 10));
window.addEventListener('scroll', debounce(fadeInOnScroll, 10));