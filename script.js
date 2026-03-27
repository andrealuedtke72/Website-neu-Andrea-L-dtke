/* =====================================================
   ANDREA LÜDTKE – Premium Website JS
   Animations, Interactions, Effects
   ===================================================== */

'use strict';

/* =====================================================
   PAGE LOADER
   ===================================================== */
(function initLoader() {
  // Ladebildschirm nur auf der Startseite anzeigen
  const isHomePage = location.pathname.endsWith('index.html') || location.pathname === '/' || location.pathname.endsWith('/');
  if (!isHomePage) return;

  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `
    <div class="loader-content">
      <div class="loader-name">Andrea <em>Lüdtke</em></div>
      <div class="loader-line"></div>
      <div class="loader-sub">Coaching · Faszienyoga · Körperarbeit</div>
    </div>
  `;
  document.body.prepend(loader);

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 900);
    }, 400);
  });
})();


/* =====================================================
   CUSTOM CURSOR
   ===================================================== */
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Cursor states
  document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => follower.style.transform = 'translate(-50%,-50%) scale(1.6)');
    el.addEventListener('mouseleave', () => follower.style.transform = 'translate(-50%,-50%) scale(1)');
  });
})();


/* =====================================================
   NAVIGATION
   ===================================================== */
(function initNav() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  // Scroll state
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = y;
  }, { passive: true });

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      const isOpen = links.classList.contains('open');
      navbar.classList.toggle('menu-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        navbar.classList.remove('menu-open');
      });
    });
  }

  // Dropdown: click-to-toggle on mobile / touch devices
  document.querySelectorAll('.has-dropdown').forEach(item => {
    const trigger = item.querySelector('.nav-link--dropdown');
    const dropdown = item.querySelector('.nav-dropdown');
    if (!trigger || !dropdown) return;

    trigger.addEventListener('click', (e) => {
      // Only handle click on small screens (hover handles desktop)
      if (window.innerWidth <= 1100) {
        e.stopPropagation();
        const isOpen = item.classList.contains('dropdown-open');
        // Close all open dropdowns first
        document.querySelectorAll('.has-dropdown.dropdown-open').forEach(d => d.classList.remove('dropdown-open'));
        if (!isOpen) item.classList.add('dropdown-open');
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.has-dropdown.dropdown-open').forEach(d => d.classList.remove('dropdown-open'));
  });

  // Active nav link highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));
})();


/* =====================================================
   SCROLL REVEAL ANIMATIONS
   ===================================================== */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  if (!revealEls.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
})();


/* =====================================================
   HERO PARALLAX
   ===================================================== */
(function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  const heroContent = document.querySelector('.hero-content');
  if (!heroBg) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          heroBg.style.transform = `translateY(${y * 0.35}px)`;
          if (heroContent) heroContent.style.transform = `translateY(${y * 0.15}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


/* =====================================================
   ANIMATED COUNTERS
   ===================================================== */
(function initCounters() {
  const counters = document.querySelectorAll('.number-value[data-target]');
  if (!counters.length) return;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const start    = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      el.textContent = Math.round(easeOut(progress) * target);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();


/* =====================================================
   TESTIMONIALS SLIDER
   ===================================================== */
(function initTestimonials() {
  const track  = document.getElementById('testimonialTrack');
  const prev   = document.getElementById('testiPrev');
  const next   = document.getElementById('testiNext');
  const dotsEl = document.getElementById('testiDots');

  if (!track) return;

  const cards     = Array.from(track.children);
  const isMobile  = () => window.innerWidth <= 768;
  let current     = 0;
  let autoTimer   = null;

  function visibleCount() { return isMobile() ? 1 : 2; }
  function maxIndex()     { return cards.length - visibleCount(); }

  function buildDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    const count = maxIndex() + 1;
    for (let i = 0; i <= maxIndex(); i++) {
      const btn = document.createElement('button');
      btn.className = 'testi-dot' + (i === current ? ' active' : '');
      btn.setAttribute('aria-label', `Slide ${i + 1}`);
      btn.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(btn);
    }
  }

  function updateDots() {
    if (!dotsEl) return;
    dotsEl.querySelectorAll('.testi-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, maxIndex()));
    const cardWidth    = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginLeft) * 2;
    track.style.transform = `translateX(-${current * cardWidth}px)`;
    updateDots();
  }

  if (prev) prev.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  if (next) next.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      goTo(current >= maxIndex() ? 0 : current + 1);
    }, 5000);
  }

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    resetAuto();
  });

  // Init
  buildDots();
  resetAuto();

  // Rebuild on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      buildDots();
      goTo(Math.min(current, maxIndex()));
    }, 200);
  });
})();


/* =====================================================
   CONTACT FORM
   ===================================================== */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;

    // Basic validation
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      field.classList.remove('error');
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      }
    });

    if (!valid) {
      shakeForm(form);
      return;
    }

    // Simulate send
    btn.textContent = 'Wird gesendet…';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '✓ Nachricht gesendet!';
      btn.style.background = 'var(--clr-forest-light)';
      form.reset();

      setTimeout(() => {
        btn.textContent = orig;
        btn.disabled = false;
        btn.style.background = '';
      }, 4000);
    }, 1500);
  });

  // Error style
  const style = document.createElement('style');
  style.textContent = `
    input.error, select.error, textarea.error {
      border-color: #e05252 !important;
      box-shadow: 0 0 0 3px rgba(224,82,82,.12) !important;
    }
  `;
  document.head.appendChild(style);

  function shakeForm(el) {
    el.style.animation = 'shake .4s ease';
    const shakeCss = document.createElement('style');
    shakeCss.textContent = `
      @keyframes shake {
        0%,100% { transform: translateX(0); }
        20%,60%  { transform: translateX(-8px); }
        40%,80%  { transform: translateX(8px); }
      }
    `;
    document.head.appendChild(shakeCss);
    el.addEventListener('animationend', () => el.style.animation = '', { once: true });
  }
})();


/* =====================================================
   SMOOTH ANCHOR SCROLLING
   ===================================================== */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* =====================================================
   FLOATING DECORATIVE ELEMENTS
   ===================================================== */
(function initDecorations() {
  // Add subtle floating orbs to hero
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const orbs = [
    { size: 300, top: '15%', right: '8%',  opacity: .08, delay: 0 },
    { size: 200, top: '60%', right: '20%', opacity: .05, delay: 2 },
    { size: 150, top: '30%', left: '5%',   opacity: .06, delay: 4 },
  ];

  orbs.forEach(orb => {
    const el = document.createElement('div');
    el.style.cssText = `
      position: absolute;
      width: ${orb.size}px;
      height: ${orb.size}px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(200,169,126,${orb.opacity}) 0%, transparent 70%);
      top: ${orb.top || 'auto'};
      left: ${orb.left || 'auto'};
      right: ${orb.right || 'auto'};
      pointer-events: none;
      animation: floatOrb ${6 + orb.delay}s ease-in-out infinite alternate;
      animation-delay: -${orb.delay}s;
    `;
    hero.appendChild(el);
  });

  // Add float animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatOrb {
      0%   { transform: translate(0, 0) scale(1); }
      100% { transform: translate(20px, -30px) scale(1.1); }
    }
  `;
  document.head.appendChild(style);
})();


/* =====================================================
   TEXT SPLIT ANIMATION FOR HERO
   ===================================================== */
(function initHeroTextAnimation() {
  const headline = document.querySelector('.hero-headline');
  if (!headline) return;

  // Mark hero elements as visible immediately (since they're in viewport)
  const heroReveals = document.querySelectorAll('.hero .reveal-up');
  setTimeout(() => {
    heroReveals.forEach(el => el.classList.add('visible'));
  }, 1900); // after loader
})();


/* =====================================================
   SCROLL PROGRESS INDICATOR
   ===================================================== */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    background: linear-gradient(to right, var(--clr-gold), var(--clr-forest-light));
    z-index: 10000;
    width: 0%;
    transition: width .1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const progress   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width  = progress + '%';
  }, { passive: true });
})();


/* =====================================================
   MAGNETIC BUTTONS
   ===================================================== */
(function initMagneticButtons() {
  if (window.innerWidth <= 768) return;

  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect    = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top  + rect.height / 2;
      const dx      = (e.clientX - centerX) * .2;
      const dy      = (e.clientY - centerY) * .2;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();


/* =====================================================
   INTERSECTION OBSERVER FOR SECTION BACKGROUNDS
   ===================================================== */
(function initSectionTransitions() {
  const darkSections = document.querySelectorAll('.bg-dark');
  const navbar = document.getElementById('navbar');

  if (!navbar) return;

  const observer = new IntersectionObserver(entries => {
    // not used for nav color change here, but could extend
  }, { threshold: 0.5 });

  darkSections.forEach(s => observer.observe(s));
})();


/* =====================================================
   BOOKING MODAL
   ===================================================== */
function openBookingModal(btn) {
  const modal     = document.getElementById('bookingModal');
  const nameEl    = document.getElementById('modalKursName');
  const titleEl   = document.getElementById('modalTitle');
  const detailsEl = document.getElementById('modalDetails');
  const bookLink  = document.getElementById('modalBookLink');

  const kursName = btn.dataset.kurs || 'Kurs';
  const kursInfo = btn.dataset.info || '';
  const kursUrl  = btn.dataset.url  || 'https://andrea-luedtke.de/kurse/';

  nameEl.textContent  = 'Kurs buchen';
  titleEl.textContent = kursName;

  const parts = kursInfo.split(' | ');
  detailsEl.innerHTML = parts.map(p => '<span>\uD83D\uDCCC ' + p + '</span>').join('');

  bookLink.href = kursUrl;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

(function initBookingModal() {
  const modal      = document.getElementById('bookingModal');
  const closeBtn   = document.getElementById('modalClose');
  const inquiryBtn = document.getElementById('modalInquiryLink');
  if (!modal) return;

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  inquiryBtn.addEventListener('click', e => {
    e.preventDefault();
    closeModal();
    const contact = document.getElementById('kontakt');
    if (contact) {
      setTimeout(() => {
        const top = contact.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 200);
    }
  });
})();

/* =====================================================
   COOKIE BANNER
   ===================================================== */
(function initCookieBanner() {
  const STORAGE_KEY = 'al_cookie_consent';

  // Pfad zur Datenschutz-Seite (funktioniert auf Wurzel- und Blog-Unterseiten)
  function datenschutzPath() {
    return location.pathname.includes('/blog/') ? '../datenschutz.html' : 'datenschutz.html';
  }

  // Bereits entschieden? Banner nicht zeigen.
  // localStorage: dauerhaft (echte Website), sessionStorage: Fallback für file://-Vorschau
  function hasConsent() {
    try { if (localStorage.getItem(STORAGE_KEY)) return true; } catch(e) {}
    try { if (sessionStorage.getItem(STORAGE_KEY)) return true; } catch(e) {}
    return false;
  }
  if (hasConsent()) return;

  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie-Einstellungen');

  const dp = datenschutzPath();
  banner.innerHTML =
    '<div class="cookie-text">' +
      '<strong>Cookies &amp; Datenschutz</strong>' +
      '<p>Diese Website verwendet Cookies, um dir das beste Erlebnis zu bieten. Mit Klick auf \u201eAkzeptieren\u201c stimmst du der Nutzung aller Cookies zu. Mehr dazu in unserer <a href="' + dp + '">Datenschutzerkl\u00e4rung</a>.</p>' +
    '</div>' +
    '<div class="cookie-actions">' +
      '<button class="cookie-btn cookie-btn-decline" id="cookieDecline">Nur notwendige</button>' +
      '<button class="cookie-btn cookie-btn-accept" id="cookieAccept">Alle akzeptieren</button>' +
    '</div>';

  document.body.appendChild(banner);

  // Kurze Verzögerung damit die Einblend-Animation sichtbar ist
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { banner.classList.add('visible'); });
  });

  function closeBanner(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch(e) {}
    try { sessionStorage.setItem(STORAGE_KEY, value); } catch(e) {}
    banner.classList.remove('visible');
    setTimeout(function() { banner.remove(); }, 500);
  }

  document.getElementById('cookieAccept').addEventListener('click', function() { closeBanner('accepted'); });
  document.getElementById('cookieDecline').addEventListener('click', function() { closeBanner('declined'); });
})();


/* =====================================================
   NEWSLETTER MODAL
   ===================================================== */
function openNewsletterModal() {
  // Create modal on first call
  if (!document.getElementById('newsletterModal')) {
    const overlay = document.createElement('div');
    overlay.id = 'newsletterModal';
    overlay.className = 'newsletter-modal-overlay';
    overlay.innerHTML = `
      <div class="newsletter-modal-box">
        <button class="newsletter-modal-close" aria-label="Schließen">✕</button>
        <h3>Newsletter abonnieren</h3>
        <p>Regelmäßige Impulse zu Faszienyoga, Selbstregulation und bewusstem Leben – direkt in dein Postfach.</p>
        <div id="newsletter-form-container"></div>
        <p style="font-size:.75rem;color:#888;margin-top:1rem;line-height:1.5">Mit der Anmeldung stimmst du der Verarbeitung deiner E-Mail-Adresse zum Newsletterversand zu. Versand über systeme.io. Du kannst dich jederzeit abmelden. Mehr in unserer <a href="datenschutz.html" style="color:inherit;text-decoration:underline">Datenschutzerklärung</a>.</p>
      </div>
    `;
    document.body.appendChild(overlay);

    // Close on backdrop click
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeNewsletterModal();
    });
    // Close button
    overlay.querySelector('.newsletter-modal-close').addEventListener('click', closeNewsletterModal);
    // ESC key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) closeNewsletterModal();
    });
  }

  document.getElementById('newsletterModal').classList.add('active');
  document.body.style.overflow = 'hidden';

  // Load Systeme.io script once, dynamically
  if (!document.getElementById('systeme-newsletter-script')) {
    const s = document.createElement('script');
    s.id  = 'systeme-newsletter-script';
    s.src = 'https://go.andrea-luedtke.de/public/remote/page/310137680267ad28cf9e8fcacbe7f010ea41a9ef.js';
    document.getElementById('newsletter-form-container').appendChild(s);
  }
}

function closeNewsletterModal() {
  const modal = document.getElementById('newsletterModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}


/* =====================================================
   BLOG – Filter & Artikel-Modal
   ===================================================== */
(function () {
  /* --- Kategorie-Filter --- */
  const filterBtns = document.querySelectorAll('.blog-filter-btn');
  const blogCards  = document.querySelectorAll('.blog-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      blogCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });

  /* --- Artikel-Modal --- */
  const blogModal        = document.getElementById('blogModal');
  const blogModalContent = document.getElementById('blogModalContent');
  const blogModalClose   = document.getElementById('blogModalClose');
  const blogModalScroll  = blogModal ? blogModal.querySelector('.blog-modal-scroll') : null;

  function openBlogModal(articleId) {
    const src = document.getElementById('blog-article-' + articleId);
    if (!src || !blogModal) return;
    blogModalContent.innerHTML = src.innerHTML;
    blogModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (blogModalScroll) blogModalScroll.scrollTop = 0;
  }

  function closeBlogModal() {
    if (!blogModal) return;
    blogModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* Read buttons */
  document.querySelectorAll('.blog-read-btn').forEach(btn => {
    btn.addEventListener('click', () => openBlogModal(btn.dataset.article));
  });

  /* Close button */
  if (blogModalClose) blogModalClose.addEventListener('click', closeBlogModal);

  /* Click outside inner */
  if (blogModal) {
    blogModal.addEventListener('click', e => {
      if (e.target === blogModal) closeBlogModal();
    });
  }

  /* ESC key */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && blogModal && blogModal.classList.contains('open')) {
      closeBlogModal();
    }
  });
})();
