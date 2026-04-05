/**
 * НИКЕ Beauty Salon - Interaction Engine
 * GSAP + ScrollTrigger + Lenis
 */

document.addEventListener("DOMContentLoaded", () => {

    // --- 1. LENIS SMOOTH SCROLLING ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // --- 2. NAVBAR LOGIC ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Valid anchor scroll support via Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target, { offset: -80 });
            }
        });
    });

    // --- MOBILE MENU LOGIC ---
    const burgerBtn = document.getElementById('burger-btn');
    const burgerIcon = document.getElementById('burger-icon');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        
        if(isMenuOpen) {
            // Open Menu
            burgerIcon.setAttribute('icon', 'ph:x');
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            lenis.stop(); // Prevent scrolling
            
            // Animate items in
            gsap.to(mobileNavItems, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.5,
                ease: "power3.out",
                delay: 0.1
            });
        } else {
            // Close Menu
            burgerIcon.setAttribute('icon', 'ph:list');
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            lenis.start(); // Allow scrolling
            
            // Reset items
            gsap.to(mobileNavItems, {
                y: 32,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            });
        }
    }

    burgerBtn.addEventListener('click', toggleMenu);

    // Close menu when a mobile link is clicked
    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            if(isMenuOpen) toggleMenu();
        });
    });

    // --- ACCORDION LOGIC ---
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const trigger = item.querySelector('.accordion-trigger');
        if (trigger) {
            trigger.addEventListener('click', () => {
                const isOpen = item.classList.contains('is-open');
                
                // Optional: Close all other accordions
                accordionItems.forEach(acc => acc.classList.remove('is-open'));
                
                // Toggle current accordion
                if (!isOpen) {
                    item.classList.add('is-open');
                    setTimeout(() => ScrollTrigger.refresh(), 350); // Refresh ScrollTrigger after animation
                } else {
                    setTimeout(() => ScrollTrigger.refresh(), 350); 
                }
            });
        }
    });

    // --- 3. GSAP ANIMATIONS ---
    gsap.registerPlugin(ScrollTrigger);

    // Initial Navbar animation
    gsap.from(".nav-item", {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out"
    });

    // Hero timeline
    const tlHero = gsap.timeline();
    tlHero.from(".gsap-hero", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2
    });

    // Section Titles
    gsap.utils.toArray('.gsap-section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Services cards 
    gsap.from(".gsap-card", {
        scrollTrigger: {
            trigger: "#services",
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out"
    });

    // Generic fade-up elements
    gsap.utils.toArray('.gsap-fade').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });

    // Simple Up elements
    gsap.utils.toArray('.gsap-up').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        });
    });

    // Gallery Stagger
    gsap.from(".gsap-gallery-item", {
        scrollTrigger: {
            trigger: "#gallery",
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
    });

    // Parallax Image Effect
    gsap.to(".parallax-img", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
            trigger: ".parallax-img-container",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });


    // --- MAGNETIC BUTTONS & INTERACTIVITY ---
    const magneticButtons = document.querySelectorAll('.btn-shadcn');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.15,
                y: y * 0.3,
                duration: 0.4,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // Subtle Card Tilt Effect
    const tiltCards = document.querySelectorAll('.card-premium');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const maxTilt = 4; // degrees
            const tiltX = ((y - centerY) / centerY) * -maxTilt;
            const tiltY = ((x - centerX) / centerX) * maxTilt;
            
            gsap.to(card, {
                rotationX: tiltX,
                rotationY: tiltY,
                transformPerspective: 1000,
                duration: 0.4,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.7,
                ease: "power3.out"
            });
        });
    });

    // --- 4. n8n BOOKING FORM INTEGRATION ---
    const bookingForm = document.getElementById("booking-form");
    const formMessage = document.getElementById("form-message");
    const submitBtn = document.getElementById("submit-btn");

    if (bookingForm) {
        bookingForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(bookingForm);
            const data = {
                name: formData.get("name"),
                phone: formData.get("phone"),
                email: formData.get("email"),
                service: formData.get("service")
            };

            // Basic Validation
            if (!data.name || !data.phone || !data.service) {
                showFormMessage("Пожалуйста, заполните все поля", "error");
                return;
            }

            // Loading State
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = "Отправка...";
            formMessage.classList.add("hidden");

            try {
                const response = await fetch("https://maks1011.app.n8n.cloud/webhook-test/764e3ba2-d92d-4b23-a7de-aa8f9ed1b696", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    showFormMessage("Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.", "success");
                    bookingForm.reset();
                } else {
                    throw new Error("Form submission failed");
                }
            } catch (error) {
                console.error("Booking Error:", error);
                showFormMessage("Произошла ошибка при отправке. Пожалуйста, попробуйте позже.", "error");
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }

    function showFormMessage(text, type) {
        formMessage.textContent = text;
        formMessage.classList.remove("hidden", "text-green-400", "text-red-400");
        formMessage.classList.add(type === "success" ? "text-green-400" : "text-red-400");
    }

    // --- 5. ACTIVE LINK SCROLL SPY ---
    const sections = document.querySelectorAll('section[id]');
    // Select all nav items including the logo if needed, or just the nav menu
    const navLinksList = document.querySelectorAll('header a[href^="#"]');

    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -40% 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksList.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Final refresh to catch any layout shifts
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

});
