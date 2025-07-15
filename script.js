// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Header background change on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .benefit-item, .security-item, .floating-card').forEach(el => {
        observer.observe(el);
    });
    
    // Stats counter animation
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Animate stats when they come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const text = statNumber.textContent;
                
                if (text.includes('M+')) {
                    animateCounter(statNumber, 2);
                    setTimeout(() => {
                        statNumber.textContent = '2M+';
                    }, 2000);
                } else if (text.includes('+')) {
                    const number = parseInt(text.replace('+', ''));
                    animateCounter(statNumber, number);
                    setTimeout(() => {
                        statNumber.textContent = number + '+';
                    }, 2000);
                }
                
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    document.querySelectorAll('.stat').forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Button hover effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Floating cards animation on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelectorAll('.floating-card');
        
        parallax.forEach(card => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            card.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Phone mockup interaction
    const phoneFeatures = document.querySelectorAll('.feature-item');
    phoneFeatures.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Form validation (if forms are added later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Download button click handlers
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.includes('Download')) {
            btn.addEventListener('click', function() {
                // Add download tracking or redirect logic here
                console.log('Download button clicked:', this.textContent);
                
                // Show a temporary message
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Coming Soon!';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            });
        }
    });
    
    // Watch Demo button
    const watchDemoBtn = document.querySelector('.btn-outline');
    if (watchDemoBtn) {
        watchDemoBtn.addEventListener('click', function() {
            // Show demo modal or redirect
            console.log('Watch Demo clicked');
            alert('Demo video would open here!');
        });
    }
    
    // Social media links
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Social media link clicked:', this.innerHTML);
            // Add social media redirect logic here
        });
    });
    
    // Newsletter signup (if added later)
    function handleNewsletterSignup(email) {
        if (validateEmail(email)) {
            console.log('Newsletter signup:', email);
            return true;
        }
        return false;
    }
    
    // Error handling
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
    });
    
    // Performance optimization
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }
    
    function updateAnimations() {
        // Update scroll-based animations here
        ticking = false;
    }
    
    // Throttle scroll events
    window.addEventListener('scroll', requestTick);
    
    // Preload images
    function preloadImage(src) {
        const img = new Image();
        img.src = src;
    }
    
    // Add loading states
    document.querySelectorAll('.feature-card, .benefit-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
    });
    
    // Initialize animations
    setTimeout(() => {
        document.querySelectorAll('.feature-card, .benefit-item').forEach((el, index) => {
            setTimeout(() => {
                el.style.transition = 'all 0.6s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
});

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export functions for potential use
window.FulusiUtils = {
    debounce,
    throttle,
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
};