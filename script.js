// Custom cursor
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const links = document.querySelectorAll('a, button');

    if(cursor && cursorDot) {
        // Ensure cursor elements are visible
        cursor.style.display = 'block';
        cursorDot.style.display = 'block';
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        // Link hover effects
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.borderColor = 'white';
                cursorDot.style.backgroundColor = 'white';
            });
            
            link.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = '';
                cursorDot.style.backgroundColor = '';
            });
        });
    }

    // Navigation
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => section.classList.remove('active'));
            
            // Show the section related to clicked link
            const target = this.getAttribute('href');
            document.querySelector(target).classList.add('active');
        });
    });

    // Typing animation
    const dynamicText = document.querySelector('.dynamic-text');
    const words = ["Web Dasturchi", "Frontend Developer", "Backend Developer", "Freelancer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function typeEffect() {
        if (!dynamicText) return;
        
        isEnd = false;
        const currentWord = words[wordIndex];
        
        if(isDeleting) {
            dynamicText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            dynamicText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if(!isDeleting && charIndex === currentWord.length) {
            isEnd = true;
            isDeleting = true;
            setTimeout(typeEffect, 1500);
        } else if(isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }

    // Start typing animation
    if(dynamicText) {
        setTimeout(typeEffect, 1000);
    }
    
    // Initialize skills animation
    const skillItems = document.querySelectorAll('.skill-item');
    
    if(skillItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    const value = entry.target.getAttribute('data-value');
                    if(progressBar) {
                        progressBar.style.width = `${value}%`;
                    }
                }
            });
        }, { threshold: 0.5 });
        
        skillItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    // Set first section as active by default
    if(sections.length > 0 && navLinks.length > 0) {
        sections[0].classList.add('active');
        navLinks[0].classList.add('active');
    }

    // Form submission
    const contactForm = document.querySelector('.contact-form');

    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For now, just log it to console
            console.log('Form submitted:', { name, email, message });
            
            // Reset form
            this.reset();
            
            // Show success message (you can customize this)
            alert('Xabaringiz muvaffaqiyatli yuborildi!');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Fix for mobile devices
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    if(isMobile() && cursor && cursorDot) {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if(cursor && cursorDot) {
            if(isMobile()) {
                cursor.style.display = 'none';
                cursorDot.style.display = 'none';
            } else {
                cursor.style.display = 'block';
                cursorDot.style.display = 'block';
            }
        }
    });
});