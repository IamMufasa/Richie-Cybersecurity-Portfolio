/* 
 * Cybersecurity Portfolio - Enhanced Animations and Interactions
 * Implements Apple-style animations and interactive elements
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize navigation behavior
    initNavigation();
    
    // Initialize profile picture effects
    initProfilePicture();
    
    // Initialize project card interactions
    initProjectCards();
    
    // Initialize skill item animations
    initSkillItems();
    
    // Initialize certification card effects
    initCertificationCards();
    
    // Initialize dark mode toggle
    initDarkModeToggle();
    
    // Initialize parallax effects
    initParallax();
});

// Initialize animations for page elements
function initAnimations() {
    // Add animation classes to elements
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-up');
    }
    
    const sectionHeaders = document.querySelectorAll('.apple-section-header');
    sectionHeaders.forEach((header, index) => {
        header.classList.add('fade-up');
        header.classList.add(`delay-${(index + 1) * 100 % 500}`);
    });
    
    const projectCards = document.querySelectorAll('.project-card-apple');
    projectCards.forEach((card, index) => {
        card.classList.add('scale-in');
        card.classList.add(`delay-${(index + 1) * 100 % 500}`);
    });
    
    const certificationCards = document.querySelectorAll('.certification-card');
    certificationCards.forEach((card, index) => {
        card.classList.add('fade-up');
        card.classList.add(`delay-${(index + 1) * 100 % 500}`);
    });
    
    const skillsItems = document.querySelectorAll('.skills-list li');
    skillsItems.forEach((item, index) => {
        item.classList.add('fade-up');
        item.classList.add(`delay-${(index + 1) * 50 % 500}`);
    });
    
    // Add subtle animation to gradient text
    const gradientTexts = document.querySelectorAll('.gradient-text');
    gradientTexts.forEach(text => {
        text.style.backgroundSize = '200% auto';
        text.style.animation = 'gradient-shift 5s ease infinite';
    });
    
    // Add keyframe animation for gradient shift
    if (!document.querySelector('#gradient-keyframes')) {
        const style = document.createElement('style');
        style.id = 'gradient-keyframes';
        style.textContent = `
            @keyframes gradient-shift {
                0% { background-position: 0% center; }
                50% { background-position: 100% center; }
                100% { background-position: 0% center; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize scroll reveal effects
function initScrollEffects() {
    // Add scroll-reveal class to elements that should animate on scroll
    const elementsToReveal = document.querySelectorAll('.about-content, .projects-grid, .certifications-grid, .skills-content, .contact-content, .apple-section-header');
    elementsToReveal.forEach(element => {
        element.classList.add('scroll-reveal');
    });
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Function to reveal elements when scrolled into view
    function revealOnScroll() {
        const elementsToReveal = document.querySelectorAll('.scroll-reveal');
        elementsToReveal.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', revealOnScroll);
    
    // Initial check on page load
    revealOnScroll();
    
    // Add staggered animation to project cards on scroll
    const projectCards = document.querySelectorAll('.project-card-apple');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease, transform 0.6s ease ${index * 0.1}s`;
    });
    
    function revealProjectCards() {
        const projectsSection = document.querySelector('.projects');
        if (projectsSection && isInViewport(projectsSection)) {
            projectCards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        }
    }
    
    window.addEventListener('scroll', revealProjectCards);
    revealProjectCards(); // Initial check
}

// Initialize navigation behavior
function initNavigation() {
    // Get navigation elements
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Change header background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only process links with hash
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 60,
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash without scrolling
                    history.pushState(null, null, targetId);
                    
                    // Add active class to clicked link
                    navLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Highlight active navigation item based on scroll position
    function updateActiveNavItem() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Add scroll event listener for active nav highlighting
    window.addEventListener('scroll', updateActiveNavItem);
    
    // Initial check on page load
    updateActiveNavItem();
    
    // Add Apple-style hover effect to nav links
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.opacity = '';
            this.style.transform = '';
        });
    });
}

// Initialize profile picture effects
function initProfilePicture() {
    const profilePicture = document.querySelector('.apple-profile-picture');
    
    if (profilePicture) {
        // Add 3D tilt effect on mouse move
        profilePicture.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            this.style.transform = `perspective(1000px) rotateX(${deltaY * -5}deg) rotateY(${deltaX * 5}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Add subtle shadow movement
            this.style.boxShadow = `
                ${deltaX * -15}px ${deltaY * -15}px 30px rgba(0, 0, 0, 0.2),
                0 10px 30px rgba(0, 0, 0, 0.2)
            `;
        });
        
        // Reset transform on mouse leave
        profilePicture.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
        
        // Add subtle floating animation
        profilePicture.style.animation = 'float 6s ease-in-out infinite';
        
        // Add keyframe animation for floating effect
        if (!document.querySelector('#float-keyframes')) {
            const style = document.createElement('style');
            style.id = 'float-keyframes';
            style.textContent = `
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize project card interactions
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card-apple');
    
    projectCards.forEach(card => {
        // Enhanced hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            
            // Zoom in image slightly
            const image = this.querySelector('.apple-image');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
            
            // Highlight button
            const button = this.querySelector('.apple-button');
            if (button) {
                button.style.transform = 'scale(1.05)';
                button.style.boxShadow = '0 5px 15px rgba(0, 102, 204, 0.3)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            
            // Reset image zoom
            const image = this.querySelector('.apple-image');
            if (image) {
                image.style.transform = '';
            }
            
            // Reset button
            const button = this.querySelector('.apple-button');
            if (button) {
                button.style.transform = '';
                button.style.boxShadow = '';
            }
        });
        
        // Add subtle movement on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            this.style.transform = `translateY(-15px) scale(1.03) rotateX(${deltaY * 2}deg) rotateY(${deltaX * 2}deg)`;
        });
    });
    
    // Add click effect to project buttons
    const projectButtons = document.querySelectorAll('.project-card-apple .apple-button');
    projectButtons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Initialize skill item animations
function initSkillItems() {
    const skillItems = document.querySelectorAll('.skills-list-apple li');
    
    skillItems.forEach(item => {
        // Enhanced hover effect
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
            
            // Highlight icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.color = 'var(--accent-light)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            
            // Reset icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = '';
                icon.style.color = '';
            }
        });
    });
    
    // Add progress bar animation to skills
    const skillsSection = document.querySelector('.skills');
    let animated = false;
    
    function animateSkillBars() {
        if (skillsSection && isInViewport(skillsSection) && !animated) {
            animated = true;
            
            skillItems.forEach((item, index) => {
                // Add progress bar
                const progressBar = document.createElement('div');
                progressBar.className = 'apple-progress-container';
                
                const progress = document.createElement('div');
                progress.className = 'apple-progress-bar';
                progress.style.width = '0%';
                
                progressBar.appendChild(progress);
                item.appendChild(progressBar);
                
                // Animate progress bar after a delay
                setTimeout(() => {
                    // Random progress between 85% and 98%
                    const randomProgress = Math.floor(Math.random() * (98 - 85 + 1)) + 85;
                    progress.style.width = `${randomProgress}%`;
                }, 100 + index * 50);
            });
        }
    }
    
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Initial check
}

// Initialize certification card effects
function initCertificationCards() {
    const certCards = document.querySelectorAll('.certification-card');
    
    certCards.forEach(card => {
        // Enhanced hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
            
            // Animate badge
            const badge = this.querySelector('.certification-badge');
            if (badge) {
                badge.style.transform = 'scale(1.1) rotate(5deg)';
                badge.style.boxShadow = '0 10px 25px rgba(0, 102, 204, 0.4)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            
            // Reset badge
            const badge = this.querySelector('.certification-badge');
            if (badge) {
                badge.style.transform = '';
                badge.style.boxShadow = '';
            }
        });
    });
}

// Add parallax effect to hero section
function initParallax() {
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const profilePicture = document.querySelector('.profile-image-container');
            const heroText = document.querySelector('.hero-text');
            
            if (profilePicture && heroText) {
                profilePicture.style.transform = `translateY(${scrollPosition * 0.2}px)`;
                heroText.style.transform = `translateY(${scrollPosition * 0.1}px)`;
            }
        });
    }
}

// Initialize dark mode toggle
function initDarkModeToggle() {
    // Create dark mode toggle button if it doesn't exist
    if (!document.querySelector('.dark-mode-toggle')) {
        const toggle = document.createElement('button');
        toggle.className = 'dark-mode-toggle';
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
        toggle.setAttribute('aria-label', 'Toggle dark mode');
        
        // Style the toggle button
        toggle.style.position = 'fixed';
        toggle.style.bottom = '20px';
        toggle.style.right = '20px';
        toggle.style.width = '50px';
        toggle.style.height = '50px';
        toggle.style.borderRadius = '50%';
        toggle.style.backgroundColor = 'var(--accent-color)';
        toggle.style.color = 'white';
        toggle.style.border = 'none';
        toggle.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        toggle.style.cursor = 'pointer';
        toggle.style.zIndex = '999';
        toggle.style.display = 'flex';
        toggle.style.alignItems = 'center';
        toggle.style.justifyContent = 'center';
        toggle.style.fontSize = '1.2rem';
        toggle.style.transition = 'all 0.3s ease';
        
        document.body.appendChild(toggle);
        
        // Add hover effect
        toggle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
        });
        
        toggle.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
        
        // Toggle dark mode
        toggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Update icon
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.className = 'fas fa-sun';
                localStorage.setItem('darkMode', 'enabled');
            } else {
                icon.className = 'fas fa-moon';
                localStorage.setItem('darkMode', 'disabled');
            }
            
            // Add transition effect to body
            document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        });
        
        // Check for saved preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            toggle.querySelector('i').className = 'fas fa-sun';
        }
    }
}

// Add Apple-style hover effect to buttons
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .apple-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.05)';
        });
    });
}

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
    );
}

// Add social media link animations
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.backgroundColor = 'var(--accent-color)';
            this.style.color = 'white';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.backgroundColor = '';
            this.style.color = '';
        });
    });
}

// Initialize all button effects
initButtonEffects();

// Initialize social link animations
initSocialLinks();
