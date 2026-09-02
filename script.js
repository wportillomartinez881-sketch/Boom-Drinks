/**
 * BOOM DRINKS - Interactive Experience Engine
 * Handles Smooth Parallax, Dynamic Theme Glows, Interactive Canvas, and Nav
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSideNavigation();
  initParticleCanvas();
  initScrollAnimations();
  initThemeGlowObserver();
});

/* ==========================================================================
   1. NAVBAR & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }
}

/* ==========================================================================
   2. SIDE DOT NAVIGATION & ACTIVE SECTION HIGHLIGHT
   ========================================================================== */
function initSideNavigation() {
  const sections = document.querySelectorAll('.section');
  const navDots = document.querySelectorAll('.dot-item');
  const navLinks = document.querySelectorAll('.nav-link:not(.nav-btn)');

  const observerOptions = {
    threshold: 0.35
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Update Dots
        navDots.forEach(dot => {
          if (dot.getAttribute('href') === `#${id}`) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });

        // Update Top Navigation
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));
}

/* ==========================================================================
   3. DYNAMIC AMBIENT GLOW (Transición entre colores de fondo)
   ========================================================================== */
function initThemeGlowObserver() {
  const ambientGlow = document.getElementById('ambientGlow');
  const sections = document.querySelectorAll('[data-theme-color]');

  const glowThemes = {
    hero: 'radial-gradient(circle, rgba(0, 136, 255, 0.18) 0%, rgba(157, 0, 255, 0.12) 40%, transparent 70%)',
    blue: 'radial-gradient(circle, rgba(0, 136, 255, 0.28) 0%, rgba(0, 210, 255, 0.15) 50%, transparent 70%)',
    red: 'radial-gradient(circle, rgba(255, 30, 86, 0.28) 0%, rgba(255, 65, 108, 0.15) 50%, transparent 70%)',
    purple: 'radial-gradient(circle, rgba(157, 0, 255, 0.28) 0%, rgba(0, 136, 255, 0.15) 50%, transparent 70%)',
    dark: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 80%)'
  };

  const glowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const theme = entry.target.getAttribute('data-theme-color');
        if (glowThemes[theme] && ambientGlow) {
          ambientGlow.style.background = glowThemes[theme];
        }
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => glowObserver.observe(s));
}

/* ==========================================================================
   4. INTERACTIVE PARTICLE BACKDROP (Subtle Energy Dust)
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = window.innerWidth < 768 ? 25 : 55;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1
    });
  }

  function renderParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(renderParticles);
  }

  renderParticles();
}

/* ==========================================================================
   5. GSAP SCROLLTRIGGER ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance animation
  gsap.from('.hero-badge', { opacity: 0, y: -20, duration: 1, delay: 0.2 });
  gsap.from('.hero-main-logo', { opacity: 0, scale: 0.8, duration: 1.2, delay: 0.4, ease: 'back.out(1.5)' });
  gsap.from('.hero-slogan', { opacity: 0, y: 30, duration: 1, delay: 0.7 });
  gsap.from('.hero-cta-wrapper', { opacity: 0, y: 30, duration: 1, delay: 0.9 });

  // Parallax on Drink Showcase Render Cards
  const showcaseRenders = document.querySelectorAll('.drink-hero-render');
  showcaseRenders.forEach(render => {
    gsap.fromTo(
      render,
      { y: 60, rotation: -3 },
      {
        y: -40,
        rotation: 3,
        scrollTrigger: {
          trigger: render,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      }
    );
  });

  // Product cards staggered reveal
  gsap.from('.product-preview-card', {
    scrollTrigger: {
      trigger: '.products-grid',
      start: 'top 80%'
    },
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power2.out'
  });

  // Values item hover effects / accessibility focus
  const valueItems = document.querySelectorAll('.value-item');
  valueItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, { scale: 1.04, duration: 0.3 });
    });
    item.addEventListener('mouseleave', () => {
      gsap.to(item, { scale: 1, duration: 0.3 });
    });
  });

  // Experiencia Big Text Scale Scroll
  gsap.from('.exp-title-2', {
    scrollTrigger: {
      trigger: '.experience-section',
      start: 'top 75%',
      end: 'bottom 40%',
      scrub: 1
    },
    scale: 0.85,
    opacity: 0.4,
    ease: 'none'
  });
}
