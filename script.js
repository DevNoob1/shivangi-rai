document.addEventListener("DOMContentLoaded", () => {
    // 1. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section-fade');
    sections.forEach(section => {
        observer.observe(section);
    });

    // 2. Custom Cursor Animation & Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline) {
        let cursorX = window.innerWidth / 2;
        let cursorY = window.innerHeight / 2;
        let dotX = cursorX;
        let dotY = cursorY;
        let outlineX = cursorX;
        let outlineY = cursorY;

        window.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
        });

        function animateCursor() {
            dotX += (cursorX - dotX) * 0.5;
            dotY += (cursorY - dotY) * 0.5;
            
            outlineX += (cursorX - outlineX) * 0.15;
            outlineY += (cursorY - outlineY) * 0.15;

            cursorDot.style.left = `${dotX}px`;
            cursorDot.style.top = `${dotY}px`;
            
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // General Hover (Links, Buttons)
        const hoverTargets = document.querySelectorAll('a, button, .hover-target');
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
            target.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
        });

        // Invert Hover (Name)
        const invertTargets = document.querySelectorAll('.cursor-invert');
        invertTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('invert');
                cursorDot.classList.add('invert');
            });
            target.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('invert');
                cursorDot.classList.remove('invert');
            });
        });

        // Magnify Hover (Text)
        const magnifyTargets = document.querySelectorAll('.cursor-magnify');
        magnifyTargets.forEach(target => {
            target.addEventListener('mouseenter', () => cursorOutline.classList.add('magnify'));
            target.addEventListener('mouseleave', () => cursorOutline.classList.remove('magnify'));
        });

        // Lens Hover (Profile Reveal)
        const profileReveal = document.getElementById('profileReveal');
        if (profileReveal) {
            profileReveal.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('lens');
                cursorDot.classList.add('lens');
            });
            profileReveal.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('lens');
                cursorDot.classList.remove('lens');
            });
        }
    }

    // 3. Interactive Profile Image Reveal (Flashlight effect)
    const profileContainer = document.getElementById('profileReveal');
    const maskLayer = document.querySelector('.profile-mask-layer');

    if (profileContainer && maskLayer) {
        profileContainer.addEventListener('mousemove', (e) => {
            const rect = profileContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Apply radial gradient mask centered at cursor
            const maskStr = `radial-gradient(circle 60px at ${x}px ${y}px, black 70%, transparent 100%)`;
            maskLayer.style.webkitMaskImage = maskStr;
            maskLayer.style.maskImage = maskStr;
            maskLayer.style.transition = 'none'; // disable transition while moving for snappy feel
        });

        profileContainer.addEventListener('mouseleave', () => {
            // Shrink mask back to 0 smoothly
            maskLayer.style.transition = '-webkit-mask-image 0.4s ease, mask-image 0.4s ease';
            maskLayer.style.webkitMaskImage = `radial-gradient(circle 0px at center, black 100%, transparent 100%)`;
            maskLayer.style.maskImage = `radial-gradient(circle 0px at center, black 100%, transparent 100%)`;
        });
    }

});
