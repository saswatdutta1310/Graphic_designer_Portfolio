// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 2000);
});

// Custom Cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Cursor interactions
document.querySelectorAll('a, button, .skill-tag, .portfolio-card, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Hero animations
const heroElements = document.querySelectorAll('.hero h1, .hero-subtitle, .cta-buttons');
heroElements.forEach((el, index) => {
    setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    }, index * 200);
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate counters
            if (entry.target.querySelector('.stat-number')) {
                animateCounters(entry.target.querySelectorAll('.stat-number'));
            }
            
            // Animate progress bars
            if (entry.target.querySelector('.progress-fill')) {
                animateProgressBars(entry.target.querySelectorAll('.progress-fill'));
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Staggered animations for child elements
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stagger-item').forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 100);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('[id="skills"], [id="work"], [id="services"]').forEach(section => {
    staggerObserver.observe(section);
});

// Counter animation
function animateCounters(counters) {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Progress bar animation
function animateProgressBars(progressBars) {
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Portfolio filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                    card.style.display = 'block';
                }, 200);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 200);
            }
        });
    });
});

// Testimonial carousel
const testimonialCarousel = document.getElementById('testimonialCarousel');
const testimonialDotsContainer = document.getElementById('testimonialDots');
let currentTestimonial = 0;
const testimonials = testimonialCarousel.children.length;

// Create dots
for (let i = 0; i < testimonials; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.addEventListener('click', () => goToTestimonial(i));
    testimonialDotsContainer.appendChild(dot);
}

const testimonialDots = document.querySelectorAll('.dot');

function goToTestimonial(index) {
    currentTestimonial = index;
    testimonialCarousel.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
}

function updateDots() {
    testimonialDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonial);
    });
}

// Auto-slide testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials;
    goToTestimonial(currentTestimonial);
}, 4000);

// Contact form validation
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = 'Sending... <span>⏳</span>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you! Your message has been sent. I\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.innerHTML = 'Send Message <span>→</span>';
            submitBtn.disabled = false;
        }, 2000);
    }
});

function validateForm() {
    let isValid = true;
    const inputs = ['name', 'email', 'projectType', 'message'];

    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        const errorEl = document.getElementById(inputId + 'Error');
        
        if (!input.value.trim()) {
            showError(input, errorEl, 'This field is required');
            isValid = false;
        } else {
            clearError(input, errorEl);
        }
    });

    // Email validation
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value && !emailRegex.test(email.value)) {
        showError(email, document.getElementById('emailError'), 'Please enter a valid email');
        isValid = false;
    }

    return isValid;
}

function showError(input, errorEl, message) {
    input.style.borderBottomColor = '#ff6b6b';
    errorEl.textContent = message;
}

function clearError(input, errorEl) {
    input.style.borderBottomColor = 'var(--coral)';
    errorEl.textContent = '';
}

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Load more button animation
document.querySelector('.load-more').addEventListener('click', function() {
    this.innerHTML = 'Loading... <span>⏳</span>';
    this.style.opacity = '0.7';
    setTimeout(() => {
        this.innerHTML = 'Load More';
        this.style.opacity = '1';
    }, 1500);
});

// Performance optimizations
document.querySelectorAll('.portfolio-card, .service-card, .skill-tag').forEach(el => {
    el.style.willChange = 'transform, opacity';
});
