
const overlay = document.getElementById('bookOverlay');
const openButton = document.getElementById('openBook');
const closeButton = document.getElementById('closeBook');
const nextButton = document.getElementById('nextPage');
const prevButton = document.getElementById('prevPage');
const chapters = [...document.querySelectorAll('.chapter')];
const pageCount = document.getElementById('pageCount');

let currentPage = 0;

// Run book controls only on pages that contain the book popup
if (
  overlay &&
  openButton &&
  closeButton &&
  nextButton &&
  prevButton &&
  pageCount
) {
  function openBook() {
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  }

  function closeBook() {
    overlay.hidden = true;
    document.body.style.overflow = '';
    openButton.focus();
  }

  function showChapterPage() {
    chapters.forEach((chapter, index) => {
      chapter.style.display =
        (index === currentPage || window.innerWidth > 620) ? '' : 'none';
    });

    pageCount.textContent = `0${currentPage + 1} / 0${chapters.length}`;
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === chapters.length - 1;
    nextButton.textContent =
      currentPage === chapters.length - 1
        ? 'End of scrapbook'
        : 'Next chapter →';
  }

  openButton.addEventListener('click', openBook);
  closeButton.addEventListener('click', closeBook);

  overlay.addEventListener('click', event => {
    if (event.target === overlay) closeBook();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !overlay.hidden) closeBook();
  });

  nextButton.addEventListener('click', () => {
    if (currentPage < chapters.length - 1) currentPage++;
    showChapterPage();
  });

  prevButton.addEventListener('click', () => {
    if (currentPage > 0) currentPage--;
    showChapterPage();
  });

  window.addEventListener('resize', showChapterPage);
  showChapterPage();
}

// Update footer year safely
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

(function () {
  const categoryIds = [
    "project-documents",
    "internship-documents",
    "technical-certifications",
    "research-publications",
    "other-resources"
  ];

  function activateCategory(id) {
    categoryIds.forEach(function (categoryId) {
      const section = document.getElementById(categoryId);
      const link = document.querySelector(
        '.dropdown-menu a[href="#' + categoryId + '"]'
      );

      if (section) {
        section.classList.toggle("doc-category-active", categoryId === id);
      }

      if (link) {
        link.classList.toggle("active-doc-link", categoryId === id);
      }
    });
  }

  // Clicking a category directly on the page
  categoryIds.forEach(function (id) {
    const section = document.getElementById(id);

    if (section) {
      section.addEventListener("click", function () {
        activateCategory(id);
      });
    }
  });

  // Clicking a category in the dropdown
  document.querySelectorAll(".dropdown-menu a").forEach(function (link) {
    link.addEventListener("click", function () {
      const id = this.getAttribute("href").substring(1);
      activateCategory(id);
    });
  });

  // Handle direct links and browser navigation
  window.addEventListener("hashchange", function () {
    activateCategory(window.location.hash.substring(1));
  });

  activateCategory(window.location.hash.substring(1));
})();

/* =========================================
   COSMIC PORTAL TRANSITION
   Beyond Engineering
========================================= */

(function () {
  const beyondLinks = document.querySelectorAll(
    'a[href$="beyond.html"]'
  );

  if (!beyondLinks.length) return;

  // Create the transition overlay
  const portalOverlay = document.createElement("div");
  portalOverlay.className = "cosmic-transition";
  portalOverlay.setAttribute("aria-hidden", "true");

  portalOverlay.innerHTML = `
    <div class="cosmic-stars"></div>
    <div class="cosmic-fog"></div>

    <div class="cosmic-message">
      <span>THE JOURNEY CONTINUES</span>
      <h2>Beyond Engineering</h2>
      <p>Entering another side of the universe...</p>
    </div>

    <div class="magic-wand">
      <span></span>
    </div>

    <div class="cosmic-portal">
      <div class="portal-ring ring-one"></div>
      <div class="portal-ring ring-two"></div>
      <div class="portal-core"></div>
      <div class="portal-symbol">✦</div>
    </div>
  `;

  document.body.appendChild(portalOverlay);

  beyondLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {

      // Keep normal browser behaviours working
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0 ||
        link.target === "_blank"
      ) {
        return;
      }

      event.preventDefault();

      const destination = link.href;

      if (portalOverlay.classList.contains("active")) return;

      portalOverlay.classList.add("active");
      document.body.style.overflow = "hidden";

      // Navigate after the cinematic animation
      setTimeout(function () {
        window.location.href = destination;
      }, 4800);
    });
  });
})();
