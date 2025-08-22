// Smooth scrolling dla linków nawigacyjnych
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .portfolio-item, .skill-item').forEach(el => {
        observer.observe(el);
    });
    
    // Initialize EmailJS
    emailjs.init({
        publicKey: 't2MjXrEOB-VR5yYSt',
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Validate form
        if (validateForm(formObject)) {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Wysyłanie...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            const templateParams = {
                from_name: formObject.name,
                from_email: formObject.email,
                phone: formObject.phone || 'Nie podano',
                subject: getSubjectText(formObject.subject),
                message: formObject.message,
                to_email: 'pawel.chrzan93@gmail.com'
            };
            
            emailjs.send('service_l72b2pn', 'template_4tnir7k', templateParams)
                .then(function(response) {
                    console.log('Email sent successfully:', response);
                    showNotification('Dziękuję za wiadomość! Skontaktuję się z Tobą wkrótce.', 'success');
                    contactForm.reset();
                }, function(error) {
                    console.error('Email sending failed:', error);
                    showNotification('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie lub skontaktuj się bezpośrednio.', 'error');
                })
                .finally(function() {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        }
    });
    
    // Helper function to get subject text
    function getSubjectText(subjectValue) {
        const subjects = {
            'website': 'Strona internetowa',
            'webapp': 'Aplikacja webowa',
            'mobile': 'Aplikacja mobilna',
            'consultation': 'Konsultacja',
            'other': 'Inne'
        };
        return subjects[subjectValue] || subjectValue;
    }
    
    // Form validation
    function validateForm(data) {
        const errors = [];
        
        // Required fields validation
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Imię i nazwisko musi mieć co najmniej 2 znaki.');
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            errors.push('Podaj prawidłowy adres email.');
        }
        
        if (!data.subject) {
            errors.push('Wybierz temat wiadomości.');
        }
        
        if (!data.message || data.message.trim().length < 10) {
            errors.push('Wiadomość musi mieć co najmniej 10 znaków.');
        }
        
        // Phone validation (optional but if provided, should be valid)
        if (data.phone && !isValidPhone(data.phone)) {
            errors.push('Podaj prawidłowy numer telefonu.');
        }
        
        if (errors.length > 0) {
            showNotification(errors.join('\n'), 'error');
            return false;
        }
        
        return true;
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Phone validation
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;
        return phoneRegex.test(phone);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-family: 'Inter', sans-serif;
        `;
        
        const content = notification.querySelector('.notification-content');
        content.style.cssText = `
            display: flex;
            align-items: flex-start;
            gap: 1rem;
        `;
        
        const message_el = notification.querySelector('.notification-message');
        message_el.style.cssText = `
            flex: 1;
            line-height: 1.5;
            white-space: pre-line;
        `;
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Real-time form validation
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous error
        clearFieldError(field);
        
        switch(field.name) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Imię i nazwisko musi mieć co najmniej 2 znaki.';
                }
                break;
                
            case 'email':
                if (!isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Podaj prawidłowy adres email.';
                }
                break;
                
            case 'phone':
                if (value && !isValidPhone(value)) {
                    isValid = false;
                    errorMessage = 'Podaj prawidłowy numer telefonu.';
                }
                break;
                
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Wiadomość musi mieć co najmniej 10 znaków.';
                }
                break;
        }
        
        if (!isValid) {
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        field.style.borderColor = '#ef4444';
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: block;
        `;
        
        field.parentNode.appendChild(errorElement);
    }
    
    function clearFieldError(field) {
        field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    // Typing animation for hero section
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Counter animation for stats (if you want to add stats section later)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // Initialize tooltips (if needed)
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = this.getAttribute('data-tooltip');
                tooltip.style.cssText = `
                    position: absolute;
                    background: var(--dark-color);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    font-size: 0.875rem;
                    z-index: 1000;
                    pointer-events: none;
                    transform: translateX(-50%);
                    white-space: nowrap;
                `;
                
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + rect.width / 2 + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            });
            
            element.addEventListener('mouseleave', function() {
                const tooltip = document.querySelector('.tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            });
        });
    }
    
    initTooltips();
    
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
    
    // Apply debounce to scroll events
    const debouncedScrollHandler = debounce(function() {
        // Scroll-based animations can be added here
    }, 16);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    console.log('🚀 Strona Pawła - Programista została załadowana pomyślnie!');
});

// Cookie Banner Functionality
function initializeCookieBanner() {
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieModal = document.getElementById('cookieModal');
    const acceptBtn = document.getElementById('acceptCookies');
    const declineBtn = document.getElementById('declineCookies');
    const settingsBtn = document.getElementById('cookieSettings');
    const closeModal = document.querySelector('.cookie-close');
    const saveSettingsBtn = document.getElementById('saveSettings');
    const acceptAllBtn = document.getElementById('acceptAll');
    
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        // Show banner after a short delay
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    } else {
        // Apply saved preferences
        applyCookieSettings(JSON.parse(cookieConsent));
    }
    
    // Accept all cookies
    acceptBtn.addEventListener('click', function() {
        const consent = {
            necessary: true,
            functional: true,
            analytics: true,
            timestamp: new Date().toISOString()
        };
        saveCookieConsent(consent);
        hideCookieBanner();
    });
    
    // Decline all non-necessary cookies
    declineBtn.addEventListener('click', function() {
        const consent = {
            necessary: true,
            functional: false,
            analytics: false,
            timestamp: new Date().toISOString()
        };
        saveCookieConsent(consent);
        hideCookieBanner();
    });
    
    // Show settings modal
    settingsBtn.addEventListener('click', function() {
        showCookieModal();
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        hideCookieModal();
    });
    
    // Close modal when clicking outside
    cookieModal.addEventListener('click', function(e) {
        if (e.target === cookieModal) {
            hideCookieModal();
        }
    });
    
    // Save custom settings
    saveSettingsBtn.addEventListener('click', function() {
        const consent = {
            necessary: true, // Always true
            functional: document.getElementById('functionalCookies').checked,
            analytics: document.getElementById('analyticsCookies').checked,
            timestamp: new Date().toISOString()
        };
        saveCookieConsent(consent);
        hideCookieModal();
        hideCookieBanner();
    });
    
    // Accept all from modal
    acceptAllBtn.addEventListener('click', function() {
        // Check all checkboxes
        document.getElementById('functionalCookies').checked = true;
        document.getElementById('analyticsCookies').checked = true;
        
        const consent = {
            necessary: true,
            functional: true,
            analytics: true,
            timestamp: new Date().toISOString()
        };
        saveCookieConsent(consent);
        hideCookieModal();
        hideCookieBanner();
    });
}

function showCookieModal() {
    const cookieModal = document.getElementById('cookieModal');
    
    // Load current settings if they exist
    const savedConsent = localStorage.getItem('cookieConsent');
    if (savedConsent) {
        const consent = JSON.parse(savedConsent);
        document.getElementById('functionalCookies').checked = consent.functional;
        document.getElementById('analyticsCookies').checked = consent.analytics;
    }
    
    cookieModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function hideCookieModal() {
    const cookieModal = document.getElementById('cookieModal');
    cookieModal.classList.remove('show');
    document.body.style.overflow = '';
}

function hideCookieBanner() {
    const cookieBanner = document.getElementById('cookieBanner');
    cookieBanner.classList.remove('show');
}

function saveCookieConsent(consent) {
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    applyCookieSettings(consent);
    
    // Show notification
    showNotification('Ustawienia cookies zostały zapisane', 'success');
}

function applyCookieSettings(consent) {
    // Apply cookie settings based on user consent
    if (consent.functional) {
        // Enable functional cookies
        console.log('Functional cookies enabled');
        // Here you would enable functional cookies
    }
    
    if (consent.analytics) {
        // Enable analytics cookies
        console.log('Analytics cookies enabled');
        // Here you would initialize Google Analytics or other analytics
        // Example: gtag('config', 'GA_MEASUREMENT_ID');
    }
    
    // Necessary cookies are always enabled
    console.log('Cookie preferences applied:', consent);
}

// Function to check if specific cookie type is allowed
function isCookieAllowed(type) {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) return false;
    
    const settings = JSON.parse(consent);
    return settings[type] || false;
}

// Function to get cookie consent status
function getCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    return consent ? JSON.parse(consent) : null;
}