/* ================================================================
   PORTFOLIO SCRIPT
   Four independent features, each in its own function:
     1. Project filtering (homepage Work section)
     2. Contact form handling (front-end only, no backend)
     3. Footer year auto-update
     4. Per-project-card slideshows (work.html)
   Nothing here needs to change when you add new project cards —
   only when you add new FILTER CATEGORIES (see below).
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initProjectFilter();
  initContactForm();
  setFooterYear();
  initCardSlideshows();
  initMobileMenu();
});

/* ----------------------------------------------------------------
   1. PROJECT FILTER
   Reads data-filter from each button and data-category from each
   .project-card, then shows/hides cards to match.

   TO ADD A NEW CATEGORY:
   - Add a new <button class="filter-btn" data-filter="your-value">
     in index.html.
   - Give matching project cards data-category="your-value".
   No changes needed here — the logic is fully data-driven.
---------------------------------------------------------------- */
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const emptyState = document.getElementById('emptyState');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selected = button.dataset.filter;

      // Update which button looks active
      filterButtons.forEach(btn => btn.classList.remove('is-active'));
      button.classList.add('is-active');

      // Show/hide cards, tracking whether anything matched
      let visibleCount = 0;

      projectCards.forEach(card => {
        const matches = selected === 'all' || card.dataset.category === selected;
        card.classList.toggle('is-hidden', !matches);
        if (matches) visibleCount += 1;
      });

      // Let the user know if a category has no projects yet,
      // instead of showing a blank grid
      if (emptyState) {
        emptyState.hidden = visibleCount !== 0;
      }
    });
  });
}

/* ----------------------------------------------------------------
   2. CONTACT FORM
   This is front-end only: it validates and shows a confirmation
   message, but does not send data anywhere yet.

   TO CONNECT A REAL BACKEND:
   - Point the <form> at a service like Formspree/Netlify Forms,
     or your own endpoint, and remove/replace the preventDefault()
     block below with an actual fetch() call.
---------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (!form || !status) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      status.textContent = 'Please fill in every field before sending.';
      return;
    }

    // Placeholder success behaviour — replace with a real
    // submission (fetch/XHR) once a backend or form service
    // is connected.
    const name = form.elements.name.value.trim();
    status.textContent = `Thanks, ${name} — your message is ready to send once this form is connected to a backend.`;
    form.reset();
  });
}

/* ----------------------------------------------------------------
   3. FOOTER YEAR
   Keeps the copyright year current without manual edits.
---------------------------------------------------------------- */
function setFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ----------------------------------------------------------------
   4. PER-PROJECT-CARD SLIDESHOWS (work.html)
   Every element with class "card-slideshow" is set up
   independently — each project card can have its own image count,
   and adding/removing a .card-slideshow__slide <img> in the HTML
   needs no changes here. A card with only one slide gets its
   controls hidden entirely rather than showing useless arrows/dots.

   Auto-advances every 5 seconds; pauses while that specific card
   is hovered or focused, so browsing one card doesn't get
   interrupted, but other cards keep advancing on their own.
---------------------------------------------------------------- */
function initCardSlideshows() {
  const AUTO_ADVANCE_MS = 5000;

  document.querySelectorAll('.card-slideshow').forEach(setupOneSlideshow);

  function setupOneSlideshow(root) {
    const track = root.querySelector('.card-slideshow__track');
    const slides = root.querySelectorAll('.card-slideshow__slide');
    const dotsContainer = root.querySelector('.card-slideshow__dots');
    const prevBtn = root.querySelector('.card-slideshow__nav--prev');
    const nextBtn = root.querySelector('.card-slideshow__nav--next');

    if (!track || !slides.length) return;

    // Single-image card: nothing to slide between, so hide the
    // controls and stop here.
    if (slides.length === 1) {
      root.classList.add('has-single-slide');
      return;
    }

    let current = 0;
    let autoTimer = null;

    const dots = Array.from(slides).map((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'card-slideshow__dot';
      dot.setAttribute('aria-label', `Go to image ${index + 1}`);
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
      return dot;
    });

    function goToSlide(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
    }

    function startAutoAdvance() {
      stopAutoAdvance();
      autoTimer = setInterval(() => goToSlide(current + 1), AUTO_ADVANCE_MS);
    }

    function stopAutoAdvance() {
      if (autoTimer) clearInterval(autoTimer);
    }

    prevBtn.addEventListener('click', () => { goToSlide(current - 1); startAutoAdvance(); });
    nextBtn.addEventListener('click', () => { goToSlide(current + 1); startAutoAdvance(); });

    root.addEventListener('mouseenter', stopAutoAdvance);
    root.addEventListener('mouseleave', startAutoAdvance);

    goToSlide(0);
    startAutoAdvance();
  }
}

function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.site-header__nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });
}