/* ==========================================================================
   MAIN JS IMPLEMENTATION - NUPUR BAGAVE PORTFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCustomCursor();
  initScrollReveals();
  initMobileMenu();
  initCertificateModal();
  initSkillsProgress();
});

/* --------------------------------------------------------------------------
   NAVBAR: Highlight Active Page and Dynamic Background
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1);

  // Set active link in navbar
  const navLinks = document.querySelectorAll('.nav-item');
  navLinks.forEach(item => {
    const link = item.querySelector('a');
    if (link) {
      const linkHref = link.getAttribute('href');
      // Exact match or default index
      if (page === linkHref || (page === '' && linkHref === 'index.html')) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    }
  });

  // Dynamic shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   CUSTOM CURSOR: Interactive Mouse Effects (Desktop Only)
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const cursorOuter = document.querySelector('.custom-cursor');
  const cursorInner = document.querySelector('.custom-cursor-inner');
  
  if (!cursorOuter || !cursorInner) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let innerX = 0, innerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Fast update for inner dot
    cursorInner.style.left = `${mouseX}px`;
    cursorInner.style.top = `${mouseY}px`;
  });

  // Animation loop for smooth delayed outer cursor tracking
  function animateCursor() {
    // Linear interpolation
    const ease = 0.15; 
    cursorX += (mouseX - cursorX) * ease;
    cursorY += (mouseY - cursorY) * ease;

    cursorOuter.style.left = `${cursorX}px`;
    cursorOuter.style.top = `${cursorY}px`;

    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  // Hover states expansion
  const hoverElements = document.querySelectorAll('a, button, .btn, .tab-btn, .certificate-card, .social-icon-btn, .filter-btn');
  
  hoverElements.forEach(elem => {
    elem.addEventListener('mouseenter', () => {
      cursorOuter.classList.add('hovered');
    });
    elem.addEventListener('mouseleave', () => {
      cursorOuter.classList.remove('hovered');
    });
  });
}

/* --------------------------------------------------------------------------
   SCROLL REVEALS: Fade-in animations as users scroll
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null,
    threshold: 0.12, // triggers when 12% is visible
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, observerOptions);

  revealElements.forEach(elem => {
    observer.observe(elem);
  });
}

/* --------------------------------------------------------------------------
   MOBILE NAVIGATION MENU: Slide-in and Toggles
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleBtn.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   CERTIFICATE MODAL: Preview certificates on click
   -------------------------------------------------------------------------- */
function initCertificateModal() {
  const certCards = document.querySelectorAll('.certificate-card');
  const modalOverlay = document.getElementById('cert-modal');
  
  if (!modalOverlay || certCards.length === 0) return;

  const modalClose = modalOverlay.querySelector('.modal-close-btn');
  const modalImgContainer = modalOverlay.querySelector('.modal-image-wrapper');
  const modalTitle = modalOverlay.querySelector('.modal-title');
  const modalOrg = modalOverlay.querySelector('.modal-org');

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const cardTitle = card.querySelector('.certificate-card-title').innerText;
      const cardOrg = card.querySelector('.certificate-card-org').innerText;
      const svgSource = card.querySelector('.certificate-image-wrapper svg');
      const imgSource = card.querySelector('.certificate-image-wrapper img');
      
      // Clear previous image
      modalImgContainer.innerHTML = '';
      
      // Clone original visual resource to modal container
      if (svgSource) {
        const clonedSvg = svgSource.cloneNode(true);
        modalImgContainer.appendChild(clonedSvg);
      } else if (imgSource) {
        const clonedImg = imgSource.cloneNode(true);
        modalImgContainer.appendChild(clonedImg);
      }
      
      modalTitle.innerText = cardTitle;
      modalOrg.innerText = cardOrg;
      
      // Open
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // prevent back scroll
    });
  });

  // Close actions
  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
  });
}

/* --------------------------------------------------------------------------
   SKILLS PROGRESS: Trigger Skill Bars width transition when loaded
   -------------------------------------------------------------------------- */
function initSkillsProgress() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (skillBars.length === 0) return;

  // Let CSS handles ease after setting inline width
  setTimeout(() => {
    skillBars.forEach(bar => {
      const val = bar.getAttribute('data-progress');
      if (val) bar.style.width = `${val}%`;
    });
  }, 100);
}
