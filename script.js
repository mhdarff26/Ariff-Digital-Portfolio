/* ================================================================
   PORTFOLIO SCRIPT
   Three independent features, each in its own function:
     1. Project filtering (Work section)
     2. Contact form handling (front-end only, no backend)
     3. Footer year auto-update
   Nothing here needs to change when you add new project cards —
   only when you add new FILTER CATEGORIES (see below).
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initProjectFilter();
  initContactForm();
  setFooterYear();
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