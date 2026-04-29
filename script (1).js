// ========================================
// UPSCALE COLLECTIVE - JAVASCRIPT
// Interactive Features & Animations
// ========================================

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// ========== NAVBAR FUNCTIONALITY ==========

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        updateActiveLink(this);
    });
});

// Update active nav link
function updateActiveLink(element) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    element.classList.add('active');
}

// Update active link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========== SCROLL TO SECTION ==========

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        navMenu.classList.remove('active');
    }
}

// ========== SCROLL TO TOP BUTTON ==========

const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== CONTACT FORM ==========

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[placeholder="Your Name"]').value;
    const email = this.querySelector('input[placeholder="Your Email"]').value;
    const phone = this.querySelector('input[placeholder="Your Phone"]').value;
    const message = this.querySelector('textarea').value;
    
    // Create WhatsApp message
    const whatsappMessage = `
Hi! I'm interested in your services.

Name: ${name}
Email: ${email}
Phone: ${phone}

Message: ${message}
    `.trim();
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // WhatsApp number (replace with your number)
    const whatsappNumber = '919557007149';
    
    // Open WhatsApp chat
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    
    // Reset form
    this.reset();
    
    // Show success message (optional)
    showNotification('Redirecting to WhatsApp...', 'success');
});

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#25d366' : '#ff6b6b'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========== COUNTER ANIMATION ==========

function animateCounter() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 16);
    });
}

// Trigger counter animation when section is visible
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('about')) {
            animateCounter();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
});

// ========== PARALLAX EFFECT ==========

window.addEventListener('scroll', function() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        const elementPosition = element.offsetTop;
        const distance = scrollPosition - elementPosition;
        
        if (distance > -window.innerHeight && distance < window.innerHeight) {
            element.style.transform = `translateY(${distance * 0.5}px)`;
        }
    });
});

// ========== SMOOTH SCROLL LINKS ==========

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#0') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========== FORM VALIDATION ==========

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff6b6b';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });
    
    // Validate email
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && !isValidEmail(emailInput.value)) {
        emailInput.style.borderColor = '#ff6b6b';
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========== KEYBOARD SHORTCUTS ==========

document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K = Contact section
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        scrollToSection('contact');
    }
    
    // Escape = Close mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }
});

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========

const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ========== MOUSE FOLLOW EFFECT (Optional) ==========

document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Optional: Add subtle mouse follow effect
        // card.style.setProperty('--mouse-x', x + 'px');
        // card.style.setProperty('--mouse-y', y + 'px');
    });
});

// ========== PRELOAD IMAGES ==========

function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const newImg = new Image();
        newImg.src = img.src;
    });
}

window.addEventListener('load', preloadImages);

// ========== UTILITY: Check if element is in viewport ==========

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.bottom >= 0 &&
        rect.right >= 0
    );
}

// ========== PAGE LOAD ANIMATION ==========

window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    console.log('Upscale Collective website loaded successfully! ✨');
});

// ========== DEBUGGING (Remove in production) ==========

console.log('%c✨ Welcome to Upscale Collective ✨', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cElevate. Inspire. Grow.', 'color: #d946ef; font-size: 14px;');