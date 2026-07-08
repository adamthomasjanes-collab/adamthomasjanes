/*****************************************************************

BACKSTAGE SCRIPT NOTES

This JavaScript file is the stage manager for the portfolio issue.
The HTML provides the editorial structure. The CSS provides the visual
language. This file handles the moving parts: tabs, overlays, galleries,
scroll effects, counters, and small interactions that make the page feel
alive.

Philosophy:
Use JavaScript to improve the experience, not to hide the content. The page
should remain understandable as structured HTML even when interaction is not
available.

Before changing interaction code, test:
• Keyboard navigation
• Escape key behavior
• Focus returning after overlays close
• Mobile viewport behavior
• Reduced-motion preferences
• Whether the content still makes sense without the effect

*****************************************************************/

/*
  ╔══════════════════════════════════════════════════════════════╗
  ║ JAVASCRIPT BACKSTAGE CREW                                  ║
  ╚══════════════════════════════════════════════════════════════╝

  This file is the quiet crew behind the portfolio: it moves the spotlight, opens
  the archive spreads, swaps issue content, animates counters, manages keyboard
  behavior, and makes the static HTML feel like a living publication.

  Rule of thumb: the page should still make sense without this file. JavaScript
  is here to add polish, pacing, and interaction — not to hide essential content
  from people or search engines.

  ============================================================
  JAVASCRIPT MAINTENANCE NOTES
  ============================================================
  File: script.js
  Purpose: Adds progressive interaction to the static portfolio.

  Important principle:
  - The site should still communicate Adam's work if JavaScript fails.
  - JavaScript enhances navigation, modals, archive overlays, progress indicators, and lightbox behavior.

  Data-editing guide:
  - archiveProjects controls the archive category cards and overlay content.
  - featured/story overlay logic should stay synchronized with matching buttons in index.html.
  - demo images can be replaced later with final portfolio artwork without changing the whole interaction system.

  Debugging guide:
  - If a button stops opening an overlay, first check its data-* attribute in index.html.
  - If an archive category opens the wrong story, check the order and issueKey values in archiveProjects.
  - If keyboard focus feels trapped, check dialog open/close routines and lastDialogTrigger.

  Accessibility guide:
  - Preserve escape-key closing behavior.
  - Preserve focus returns after closing overlays.
  - Keep aria-hidden / dialog state management aligned with visible state.

  Comments are intentionally extensive for GitHub review, future editing, and portfolio handoff.
  ============================================================
*/

/*
  Adam Thomas Janes Portfolio
  Version 2 Architecture JavaScript
*/

// DOM HELPERS: tiny stagehands. They fetch elements without dragging in a whole framework for a one-page portfolio.
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

// SHARED UI STATE: the site’s memory. Which archive item is active? Who opened the dialog? Where should focus return?
const state = {
  projectIndex: 0,
  archiveIndex: 0,
  lastDialogTrigger: null
};

// CACHED ELEMENTS: frequently used page pieces gathered once so the rest of the file can read like choreography instead of scavenger hunting.
const els = {
  nav: $(".nav"),
  navToggle: $(".nav-toggle"),
  progress: $(".scroll-progress"),
  cursor: $(".cursor-dot"),
  navLinks: $$(".nav a[href^='#']"),
  sections: []
};

els.sections = els.navLinks.map(link => $(link.getAttribute("href"))).filter(Boolean);

// ARCHIVE DATA / THE MINI CARD CATALOG
// These objects feed the “03 · From the Archive” browser. Think of each entry as
// a shelf label in a studio archive: title, category, proof points, visual class,
// and which deeper archive issue should open when someone asks for more.
// issueKey tells the Open button which Archive Issue Overlay story to load.
// ARCHIVE DATA MODEL: each object describes one archive category shown in the interface.
/*****************************************************************
ARCHIVE PROJECTS · BACK-ISSUE INDEX

These entries power the archive browser preview. The archive is intentionally
organized by communication discipline so visitors can find relevant proof
quickly.

Keep titles short, descriptions concrete, and proof points useful.
*****************************************************************/
const archiveProjects = [
  {
    title: "Advertising Campaigns",
    type: "Advertising / Print Campaigns",
    desc: "A concentrated gallery of local and regional advertising work, built to demonstrate strong hierarchy, client-focused messaging, production speed, and print-ready design judgment.",
    points: ["Demo ad gallery wired for lightbox testing", "Campaign, seasonal, and restaurant examples", "Strongest print advertising examples can replace demos later"],
    thumb: "thumb-ads",
    issueKey: "archive-advertising"
  },
  {
    title: "Restaurant & Hospitality",
    type: "Hospitality / Restaurant Advertising",
    desc: "Restaurant, tavern, diner, lounge, and hospitality-style promotional work showing event advertising, food specials, seasonal campaigns, and bold client communication.",
    points: ["Food and event promotions", "Seasonal restaurant advertising", "High-impact local business communication"],
    thumb: "thumb-restaurant",
    issueKey: "archive-restaurant-hospitality"
  },
  {
    title: "Publication Design",
    type: "Publication / Magazine / Newspaper",
    desc: "Recurring publication systems including magazine, newspaper, real estate, and business publication work with editorial hierarchy, ad placement, pacing, and production consistency.",
    points: ["Monthly and weekly publication systems", "Editorial hierarchy", "Advertising integration and prepress"],
    thumb: "thumb-business",
    issueKey: "archive-publication-design"
  },
  {
    title: "Brand Identity",
    type: "Brand Identity / Visual Systems",
    desc: "Logo, identity, and visual communication systems that show how Adam turns organizations into clearer, more consistent brands across print, web, signage, and marketing materials.",
    points: ["Logo design", "Brand refreshes", "Applied identity systems"],
    thumb: "thumb-architecture",
    issueKey: "archive-brand-identity"
  },
  {
    title: "Web & Digital",
    type: "Web / Digital Communications",
    desc: "WordPress, web content, SEO, email marketing, digital updates, and communication systems that show practical marketing support beyond static design work.",
    points: ["WordPress website management", "SEO-focused content", "Email and digital marketing campaigns"],
    thumb: "thumb-web",
    issueKey: "archive-web-digital"
  },
  {
    title: "Photography",
    type: "Photography / Marketing Images",
    desc: "Photography and image-direction work supporting websites, brochures, hospitality communications, editorial layouts, and brand credibility.",
    points: ["Location photography", "Image preparation", "Marketing and editorial use"],
    thumb: "thumb-photo",
    issueKey: "archive-photography"
  },
  {
    title: "Marketing Collateral",
    type: "Brochures / Sales Support / Collateral",
    desc: "Brochures, flyers, sales support materials, printed collateral, and communication pieces that help organizations explain services clearly and professionally.",
    points: ["Brochures and flyers", "Sales collateral", "Client-facing communication"],
    thumb: "thumb-collateral",
    issueKey: "archive-marketing-collateral"
  },
  {
    title: "Editorial Features",
    type: "Editorial / Feature Layout",
    desc: "Feature layouts, story pacing, reader-friendly hierarchy, and editorial systems across newspaper, magazine, business, and family-audience publications.",
    points: ["Feature story pacing", "Reader-friendly hierarchy", "Editorial design systems"],
    thumb: "thumb-editorial",
    issueKey: "archive-editorial-features"
  },
  {
    title: "Awards",
    type: "Awards / Recognition / Strongest Work",
    desc: "A flexible issue for award-winning advertising, strongest portfolio examples, and highlighted pieces that help hiring managers quickly see proof of quality.",
    points: ["MACPA advertising recognition", "Strongest print examples", "Quick proof of design quality"],
    thumb: "thumb-awards",
    issueKey: "archive-awards"
  }
];

const projectOrder = ["camp", "business", "beacon", "ncpn"];

let scrollFrame = null;

function requestScrollUpdate() {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = null;
    updateScrollState();
  });
}

// INITIALIZATION / LIGHTS UP
// Runs once after the DOM is ready and wires together every interactive department.
function init() {
  initNav();
  initPointer();
  initCounters();
  initTabs(".process-step", ".process-content", "process", "process-panel");
  initTabs(".skill-tab", ".skill-panel", "skill", "skill-panel");
  initProjects();
  initArchive();
  initAccessibility();
  addEventListener("scroll", requestScrollUpdate, { passive: true });
  addEventListener("resize", requestScrollUpdate);
  addEventListener("load", requestScrollUpdate);
  requestScrollUpdate();
}

// NAVIGATION BEHAVIOR
// Smoothly moves readers through the one-page “issue” and keeps the section indicator honest.
function initNav() {
  els.navToggle?.addEventListener("click", () => {
    const open = els.nav.classList.toggle("is-open");
    els.navToggle.setAttribute("aria-expanded", open);
  });

  els.navLinks.forEach(link => {
    link.addEventListener("click", () => {
      els.nav?.classList.remove("is-open");
      els.navToggle?.setAttribute("aria-expanded", "false");
    });
  });
}

// SCROLL PROGRESS + HEADER MOOD
// Turns scrolling into a subtle progress bar and lets the header react as the reader moves.
function updateScrollState() {
  const y = scrollY;
  const doc = document.documentElement.scrollHeight - innerHeight;

  if (els.progress) els.progress.style.width = `${doc ? (y / doc) * 100 : 0}%`;

  let current = "";
  els.sections.forEach(section => {
    if (y >= section.offsetTop - 130) current = section.id;
  });

  els.navLinks.forEach(link => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
  });

  updateTocIndicator();
  updateAmbientMotion();
  updateSectionTitles();
  updateServices();
  updateFeatured();
}

function updateTocIndicator() {
  // Active navigation is handled by the current nav indicator system.
}

function updateAmbientMotion() {
  const y = scrollY;
  const page = document.documentElement.scrollHeight - innerHeight;
  const progress = page ? y / page : 0;

  document.documentElement.style.setProperty("--scroll-drift", Math.min(150, y * .055).toFixed(2));
  document.documentElement.style.setProperty("--grid-x", Math.sin(y * .002) * 18);
  document.documentElement.style.setProperty("--grid-y", progress * -60);

  $$(".print-line").forEach((line, index) => {
    line.style.marginTop = `${progress * 80 * (index % 2 ? -1 : 1)}px`;
  });
}

function updateSectionTitles() {
  $$(".section-slide-title, .unified-title-rise").forEach(title => {
    const rect = title.getBoundingClientRect();

    if (rect.top < innerHeight * .86) {
      title.classList.add("is-title-visible", "title-has-entered");
    }

    if (rect.top > innerHeight * 1.18) {
      title.classList.remove("is-title-visible", "title-has-entered");
    }
  });
}

function updateServices() {
  const section = $("#services");
  const cards = $$(".service-rise-card");
  if (!section || !cards.length) return;

  const rect = section.getBoundingClientRect();
  const visible = rect.top < innerHeight * .78 && rect.bottom > innerHeight * .16;

  cards.forEach(card => card.classList.toggle("is-service-visible", visible));
}

function updateFeatured() {
  $$(".featured-card").forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const fromLeft = index % 2 === 0;

    card.classList.remove("feature-from-left", "feature-from-right", "feature-visible", "feature-exiting-left", "feature-exiting-right");

    if (rect.top < innerHeight * .8 && rect.bottom > innerHeight * .18) {
      card.classList.add("feature-visible");
    } else if (rect.top >= innerHeight * .8) {
      card.classList.add(fromLeft ? "feature-from-left" : "feature-from-right");
    } else {
      card.classList.add(fromLeft ? "feature-exiting-left" : "feature-exiting-right");
    }
  });
}

// CUSTOM POINTER SPOTLIGHT
// Adds a small editorial flourish on pointer devices without blocking normal cursor behavior.
function initPointer() {
  if (!matchMedia("(pointer:fine)").matches) return;

  addEventListener("mousemove", event => {
    document.documentElement.style.setProperty("--mouse-x", `${(event.clientX / innerWidth) * 100}%`);
    document.documentElement.style.setProperty("--mouse-y", `${(event.clientY / innerHeight) * 100}%`);

    if (els.cursor) {
      els.cursor.style.opacity = ".65";
      els.cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
    }
  });

  addEventListener("mouseleave", () => {
    if (els.cursor) els.cursor.style.opacity = 0;
  });

  $$("a, button, .featured-card, .service-card, .experience-item").forEach(item => {
    item.addEventListener("mouseenter", () => els.cursor?.classList.add("is-active"));
    item.addEventListener("mouseleave", () => els.cursor?.classList.remove("is-active"));
  });

  $$(".service-card, .featured-card, .archive-preview, .experience-item, .skill-stage, .process-panel, .education-awards article, .award-card-grid article").forEach(card => {
    card.addEventListener("mousemove", event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;

      card.style.setProperty("--tilt-y", `${x * 2}deg`);
      card.style.setProperty("--tilt-x", `${y * -2}deg`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--tilt-x", "0deg");
    });
  });
}

// PROOF POINT COUNTERS
// Animates the numbers only when they enter view so the proof points feel discovered, not shouted.
/*****************************************************************
PROOF COUNTERS

The counters add a little editorial motion to the proof points. They should
support credibility, not feel like inflated dashboard metrics. Keep the
numbers defensible and easy to explain.
*****************************************************************/
function initCounters() {
  if (!("IntersectionObserver" in window)) {
    $$(".counter").forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = "true";
        animateCounter(entry.target);
      }
    });
  }, { threshold: .35 });

  $$(".counter").forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = Number(element.dataset.target || 0);
  const suffix = element.dataset.suffix || "";
  const start = performance.now();
  const duration = 1400;

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = `${Math.round(target * eased)}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function initTabs(buttonSelector, panelSelector, buttonData, panelData) {
  $$(buttonSelector).forEach(button => {
    button.addEventListener("click", () => {
      const target = button.dataset[buttonData];

      $$(buttonSelector).forEach(item => {
        item.classList.remove("is-active");
        item.setAttribute("aria-selected", "false");
      });

      $$(panelSelector).forEach(panel => panel.classList.remove("is-active"));

      button.classList.add("is-active");
      button.setAttribute("aria-selected", "true");
      $(`[data-${panelData}="${target}"]`)?.classList.add("is-active");
    });

    button.setAttribute("aria-selected", button.classList.contains("is-active") ? "true" : "false");
  });
}

function initProjects() {
  // EDITING NOTE: The original full-screen project-reader pop-up is now disabled for Feature buttons
  // that include data-archive-issue. Those buttons are handled by initArchiveIssueOverlay() below.
  // This keeps only the newer archive issue overlay from opening when someone clicks “Read Feature.”
  $$(".project-trigger").forEach(button => {
    if (button.dataset.archiveIssue) return;
    button.addEventListener("click", () => {
      state.lastDialogTrigger = button;
      openProject(button.dataset.project);
    });
  });

  $(".project-reader-close")?.addEventListener("click", closeProject);
  $(".project-reader-prev")?.addEventListener("click", () => setProject(state.projectIndex - 1));
  $(".project-reader-next")?.addEventListener("click", () => setProject(state.projectIndex + 1));

  $(".project-reader")?.addEventListener("click", event => {
    if (event.target === $(".project-reader")) closeProject();
  });
}

function setProject(index) {
  state.projectIndex = (index + projectOrder.length) % projectOrder.length;
  const active = projectOrder[state.projectIndex];

  $$(".project-sheet").forEach(sheet => {
    sheet.classList.toggle("is-active", sheet.dataset.projectPanel === active);
  });
}

function trapDialogFocus(container, event) {
  const focusables = $$('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])', container)
    .filter(element => element.offsetParent !== null || element === document.activeElement);

  if (!focusables.length) return;

  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function openProject(id) {
  const index = projectOrder.indexOf(id);
  setProject(index < 0 ? 0 : index);

  const reader = $(".project-reader");
  reader?.classList.add("is-open");
  reader?.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => $(".project-reader-close")?.focus(), 0);
}

function closeProject() {
  const reader = $(".project-reader");
  reader?.classList.remove("is-open");
  reader?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  restoreDialogFocus();
}

// ARCHIVE BROWSER
// Powers the left-side archive tabs, preview panel, and next/previous controls.
function initArchive() {
  $$(".archive-item").forEach((button, index) => {
    button.addEventListener("click", () => renderArchive(index));
  });

  $(".archive-prev")?.addEventListener("click", () => renderArchive(state.archiveIndex - 1));
  $(".archive-next")?.addEventListener("click", () => renderArchive(state.archiveIndex + 1));
  // EDITING NOTE: The Archive “Open” button now uses the newer Archive Issue Overlay.
  // The overlay click itself is handled by initArchiveIssueOverlay() near the bottom of this file.
  $(".archive-open")?.addEventListener("click", event => {
    state.lastDialogTrigger = event.currentTarget;
  });
  $(".archive-preview-image")?.addEventListener("click", event => {
    state.lastDialogTrigger = event.currentTarget;
    openLightbox();
  });

  $(".archive-lightbox-close")?.addEventListener("click", closeLightbox);
  $(".archive-lightbox-prev")?.addEventListener("click", () => {
    renderArchive(state.archiveIndex - 1);
    renderLightbox();
  });
  $(".archive-lightbox-next")?.addEventListener("click", () => {
    renderArchive(state.archiveIndex + 1);
    renderLightbox();
  });

  $(".archive-lightbox")?.addEventListener("click", event => {
    if (event.target === $(".archive-lightbox")) closeLightbox();
  });

  renderArchive(0);
}

function renderArchive(index) {
  state.archiveIndex = (index + archiveProjects.length) % archiveProjects.length;
  const project = archiveProjects[state.archiveIndex];

  $$(".archive-item").forEach((button, i) => button.classList.toggle("is-active", i === state.archiveIndex));

  const image = $(".archive-preview-image");
  if (image) image.className = `archive-preview-image ${project.thumb}`;

  // EDITING NOTE: Keep the Open button synced to the selected archive tab.
  // The value must exist in ARCHIVE_ISSUES below.
  const openButton = $(".archive-open");
  if (openButton) openButton.dataset.archiveIssue = project.issueKey;

  $(".archive-preview-type").textContent = project.type;
  $(".archive-preview-title").textContent = project.title;
  $(".archive-preview-description").textContent = project.desc;
  $(".archive-preview-points").innerHTML = project.points.map(point => `<li>${point}</li>`).join("");

  if ($(".archive-lightbox.is-open")) renderLightbox();
}

function renderLightbox() {
  const project = archiveProjects[state.archiveIndex];
  const image = $(".archive-lightbox-image");
  if (image) image.className = `archive-lightbox-image ${project.thumb}`;

  $(".archive-lightbox-type").textContent = project.type;
  $(".archive-lightbox-title").textContent = project.title;
  $(".archive-lightbox-description").textContent = project.desc;
}

function openLightbox() {
  renderLightbox();

  const lightbox = $(".archive-lightbox");
  lightbox?.classList.add("is-open");
  lightbox?.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => $(".archive-lightbox-close")?.focus(), 0);
}

function closeLightbox() {
  const lightbox = $(".archive-lightbox");
  lightbox?.classList.remove("is-open");
  lightbox?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  restoreDialogFocus();
}

function initAccessibility() {
  document.addEventListener("keydown", event => {
    const openProjectDialog = $(".project-reader.is-open");
    const openArchiveDialog = $(".archive-lightbox.is-open");

    if (event.key === "Tab" && openProjectDialog) trapDialogFocus(openProjectDialog, event);
    if (event.key === "Tab" && openArchiveDialog) trapDialogFocus(openArchiveDialog, event);

    if (event.key === "Escape") {
      if (openProjectDialog) closeProject();
      if (openArchiveDialog) closeLightbox();
    }

    if (openProjectDialog) {
      if (event.key === "ArrowRight") setProject(state.projectIndex + 1);
      if (event.key === "ArrowLeft") setProject(state.projectIndex - 1);
    }

    if (openArchiveDialog) {
      if (event.key === "ArrowRight") {
        renderArchive(state.archiveIndex + 1);
        renderLightbox();
      }
      if (event.key === "ArrowLeft") {
        renderArchive(state.archiveIndex - 1);
        renderLightbox();
      }
    }
  });
}

function restoreDialogFocus() {
  setTimeout(() => state.lastDialogTrigger?.focus(), 0);
}

init();


// Version 2.5 helper: secure external links if any are set to open in a new tab later.
document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  link.setAttribute("rel", "noopener noreferrer");
});


// v2.6: stronger active navigation detection, including Contact at page bottom,
// plus subtle portrait scroll drift.
(function () {
  const nav = document.querySelector(".nav");
  const indicator = document.querySelector(".nav-toc-indicator");
  const links = [...document.querySelectorAll(".nav a[href^='#']")];
  const targets = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function updateActiveNavV26() {
    if (!links.length || !targets.length) return;

    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
    let activeId = nearBottom ? "contact" : "";

    if (!activeId) {
      targets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.34) activeId = target.id;
      });
    }

    if (!activeId && targets[0]) activeId = targets[0].id;

    links.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
    });

    const active = links.find((link) => link.classList.contains("is-active"));
    if (nav && indicator && active) {
      const navRect = nav.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      nav.style.setProperty("--toc-left", `${activeRect.left - navRect.left}px`);
      nav.style.setProperty("--toc-width", `${activeRect.width}px`);
      nav.style.setProperty("--toc-opacity", "1");
    }

    const headshot = document.querySelector(".headshot-card");
    if (headshot) {
      const drift = Math.max(-8, Math.min(8, window.scrollY * -0.012));
      headshot.style.setProperty("--portrait-drift", `${drift.toFixed(2)}px`);
    }
  }

  window.addEventListener("scroll", updateActiveNavV26, { passive: true });
  window.addEventListener("resize", updateActiveNavV26);
  window.addEventListener("load", updateActiveNavV26);
  updateActiveNavV26();
})();


// v2.7: authoritative nav slider fix.
// This directly tracks the active link, including Contact, and runs after all older nav logic.
(function () {
  const nav = document.querySelector(".nav");
  const links = [...document.querySelectorAll(".nav a[href^='#']")];
  let indicator = document.querySelector(".nav-toc-indicator");

  if (!nav || !links.length) return;

  if (!indicator) {
    indicator = document.createElement("span");
    indicator.className = "nav-toc-indicator";
    indicator.setAttribute("aria-hidden", "true");
    nav.appendChild(indicator);
  }

  const linkTargets = links.map((link) => {
    const id = link.getAttribute("href").slice(1);
    return {
      id,
      link,
      target: document.getElementById(id)
    };
  }).filter((item) => item.target);

  function setIndicator(link) {
    if (!link) return;

    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();

    nav.style.setProperty("--toc-left", `${linkRect.left - navRect.left}px`);
    nav.style.setProperty("--toc-width", `${linkRect.width}px`);
    nav.style.setProperty("--toc-opacity", "1");
  }

  function getActiveItem() {
    const scrollBottom = window.scrollY + window.innerHeight;
    const pageBottom = document.documentElement.scrollHeight;

    // Contact is at the footer/bottom, so force it active when the page is near the end.
    if (pageBottom - scrollBottom < 90) {
      return linkTargets.find((item) => item.id === "contact") || linkTargets.at(-1);
    }

    // Prefer the section whose top has crossed the upper reading zone.
    let active = linkTargets[0];

    for (const item of linkTargets) {
      const rect = item.target.getBoundingClientRect();
      if (rect.top <= 150) active = item;
    }

    return active;
  }

  function updateNavIndicatorV27() {
    const active = getActiveItem();
    if (!active) return;

    links.forEach((link) => {
      link.classList.toggle("is-active", link === active.link);
    });

    setIndicator(active.link);
  }

  // Anchor clicks should move the underline immediately, not only after scroll settles.
  links.forEach((link) => {
    link.addEventListener("click", () => {
      setTimeout(() => {
        links.forEach((item) => item.classList.toggle("is-active", item === link));
        setIndicator(link);
      }, 80);
    });
  });

  window.addEventListener("scroll", updateNavIndicatorV27, { passive: true });
  window.addEventListener("resize", updateNavIndicatorV27);
  window.addEventListener("load", updateNavIndicatorV27);
  requestAnimationFrame(updateNavIndicatorV27);
})();


// v2.8: mobile accordions for Core Services.
// Desktop still shows the full service cards.
(function () {
  const serviceCards = [...document.querySelectorAll(".service-card")];

  serviceCards.forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-expanded", "false");

    function toggleMobileCard() {
      if (!window.matchMedia("(max-width: 640px)").matches) return;
      const open = card.classList.toggle("is-mobile-open");
      card.setAttribute("aria-expanded", open ? "true" : "false");
    }

    card.addEventListener("click", toggleMobileCard);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleMobileCard();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (!window.matchMedia("(max-width: 640px)").matches) {
      serviceCards.forEach((card) => {
        card.classList.remove("is-mobile-open");
        card.setAttribute("aria-expanded", "false");
      });
    }
  });
})();


// v3.1: mobile accordion behavior for Selected Archive.
(function () {
  const archiveList = document.querySelector(".archive-list");
  const archivePreview = document.querySelector(".archive-preview");
  const archiveItems = [...document.querySelectorAll(".archive-item")];

  if (!archiveList || !archivePreview || !archiveItems.length) return;

  function isMobileArchive() {
    return window.matchMedia("(max-width: 640px)").matches;
  }

  function placePreviewAfterActive() {
    if (!isMobileArchive()) {
      archivePreview.classList.remove("is-mobile-open");
      if (archivePreview.parentElement && archivePreview.parentElement.classList.contains("archive-browser")) {
        return;
      }
      document.querySelector(".archive-browser")?.appendChild(archivePreview);
      return;
    }

    const active = document.querySelector(".archive-item.is-active") || archiveItems[0];
    if (active) {
      active.insertAdjacentElement("afterend", archivePreview);
      archivePreview.classList.add("is-mobile-open");
    }
  }

  archiveItems.forEach((item) => {
    item.setAttribute("aria-expanded", item.classList.contains("is-active") ? "true" : "false");

    item.addEventListener("click", () => {
      if (!isMobileArchive()) return;

      setTimeout(() => {
        archiveItems.forEach((button) => {
          button.setAttribute("aria-expanded", button.classList.contains("is-active") ? "true" : "false");
        });
        placePreviewAfterActive();
      }, 0);
    });
  });

  window.addEventListener("resize", placePreviewAfterActive);
  window.addEventListener("load", placePreviewAfterActive);
  placePreviewAfterActive();
})();

// v4.9b: one understated process rule slides from box to box.
(function () {
  const track = document.querySelector(".process-track");
  if (!track) return;

  const steps = Array.from(track.querySelectorAll(".process-step"));
  if (!steps.length) return;

  function activeStep() {
    return steps.find((step) => step.classList.contains("is-active")) || steps[0];
  }

  function setRule(step) {
    const trackRect = track.getBoundingClientRect();
    const stepRect = step.getBoundingClientRect();
    const left = stepRect.left - trackRect.left;
    const width = stepRect.width;

    track.style.setProperty("--process-rule-left", `${left}px`);
    track.style.setProperty("--process-rule-width", `${width}px`);
  }

  function updateRule() {
    window.requestAnimationFrame(() => setRule(activeStep()));
  }

  steps.forEach((step) => {
    step.addEventListener("click", () => {
      window.setTimeout(updateRule, 0);
    });

    step.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        window.setTimeout(updateRule, 0);
      }
    });
  });

  document.addEventListener("DOMContentLoaded", updateRule);
  window.addEventListener("load", updateRule);
  window.addEventListener("resize", updateRule);

  // Watch for the existing tab script changing .is-active.
  const observer = new MutationObserver(updateRule);
  steps.forEach((step) => observer.observe(step, { attributes: true, attributeFilter: ["class"] }));

  updateRule();
})();


// v5.2.3 Archive editorial issue overlay.
// EDITING NOTE: This is the ONE overlay used by the Feature “Read Feature” buttons.
// To edit copy without touching the HTML, update the ARCHIVE_ISSUES object below.
(function () {
  const overlay = document.getElementById("archive-issue-overlay");
  if (!overlay) return;


  const DEMO_ADS = [
    { label: "Tin Goose Memorial Day", src: "assets/ad-print-design-america-holiday(1).png", alt: "Tin Goose Diner Memorial Day advertisement" },
    { label: "Rosie’s Christmas Lunch", src: "assets/ad-print-design-bar-christmas(1).png", alt: "Rosie’s Bar and Grill Christmas lunch advertisement" },
    { label: "Beer Thirty St. Patrick’s", src: "assets/ad-print-design-bar-stpatrick(1).png", alt: "Beer Thirty St. Patrick’s party advertisement" },
    { label: "Halloween Party", src: "assets/ad-print-design-halloween-party(1).png", alt: "Halloween party advertisement with zombie illustration" },
    { label: "North Coast Parent House Ad", src: "assets/ad-print-design-house-ad(1).png", alt: "North Coast Parent house advertisement" },
    { label: "Crow’s Nest Seafood", src: "assets/ad-print-design-restaurant-seafood(1).png", alt: "Crow’s Nest Restaurant seafood special advertisement" }
  ];

  function demoAdGallery(order = [3, 0, 5, 1, 2, 4]) {
    return order.map((index) => DEMO_ADS[index]);
  }

  /*****************************************************************
ARCHIVE ISSUES · THE EDITORIAL DATABASE

This object is the content desk for the feature overlays. The homepage keeps
only the teaser copy; this data supplies the fuller magazine-style reading
experience.

When adding a new issue, think like an editor:
• What is the story?
• What does the work prove?
• Which images support the point?
• What should a recruiter/client understand after reading it?
*****************************************************************/
const ARCHIVE_ISSUES = {
    /* =======================================================
    ARCHIVE ISSUE CONTENT

    Each key below feeds the same overlay in index.html.
    Edit titles, paragraphs, notes, and gallery images here.

    image gallery items use:
      { label: "Caption", src: "assets/file.png", alt: "Alt text" }

    placeholder gallery items use:
      { label: "Cover" }
    ======================================================= */

    "advertising-healthcare": {
      kicker: "Feature Story / Brand Development",
      title: "Camp Perry Lodging & Conference Center",
      subtitle: "Brand system · WordPress website · photography · collateral",
      noteTitle: "Project Story",
      paragraphs: [
        "A complete brand and web communications launch for a hospitality and conference center, combining logo design, WordPress website development, photography, SEO-focused content, email marketing, brochures, sales collateral, and digital communications.",
        "This feature shows how one communication system can connect the public-facing website, printed collateral, email materials, photography, and sales support into a clearer, more consistent brand presence."
      ],
      sidebarTitle: "Production Notes",
      details: [["Role", "Brand development, WordPress website, photography, content, collateral, and digital communications."], ["Tools", "WordPress, Adobe Creative Cloud, photography, SEO-focused content, email templates, and print production workflows."], ["Outcome", "Created a unified digital and print presence that improved visibility, brand consistency, and customer-facing communication."]],
      shows: ["Brand system thinking", "Web and print consistency", "Hospitality communication", "Client-facing collateral"],
      gallery: [{label:"Logo"},{label:"Website"},{label:"Brochure"},{label:"Photo"},{label:"Email"},{label:"Collateral"}]
    },
    "business-publication": {
      kicker: "Feature Story / Publication Design",
      title: "North Coast Business Journal",
      subtitle: "Monthly business publication design",
      noteTitle: "Publication Story",
      paragraphs: ["A monthly business publication built through editorial hierarchy, advertising integration, professional typography, page layout, image preparation, InDesign production, and print-ready execution.", "This issue focuses on credibility, pacing, and clarity — the details that help business readers trust the publication before they even reach the first paragraph."],
      sidebarTitle: "Production Notes",
      details: [["Role", "Editorial layout, advertising placement, image preparation, typography, and print-ready production."], ["Tools", "Adobe InDesign, Photoshop, Acrobat, prepress checks, and recurring publication workflows."], ["Outcome", "Supported consistent monthly publication quality with readable layouts and professional polish."]],
      shows: ["Editorial hierarchy", "Business publication polish", "Ad integration", "Deadline production"],
      gallery: [{label:"Cover"},{label:"Feature"},{label:"Ad"},{label:"Grid"},{label:"Spread"},{label:"Output"}]
    },
    "newspaper-production": {
      kicker: "Feature Story / Newspaper Production",
      title: "The Beacon Newspaper",
      subtitle: "Weekly newspaper production",
      noteTitle: "Production Story",
      paragraphs: ["A weekly community newspaper requiring fast InDesign production cycles, editorial layout, advertising design, print production, typography, page composition, prepress, and deadline management.", "This feature emphasizes calm, repeatable production habits — keeping editorial content, advertisements, image preparation, and press deadlines moving together every week."],
      sidebarTitle: "Production Notes",
      details: [["Role", "Page composition, advertising design, image preparation, prepress, and layout consistency."], ["Tools", "Adobe InDesign, Photoshop, Acrobat, production checklists, and print-ready export workflows."], ["Outcome", "Maintained reliable weekly production while supporting editorial and advertising objectives."]],
      shows: ["Fast production", "Print discipline", "Ad layout", "Weekly deadlines"],
      gallery: [{label:"Front"},{label:"Local"},{label:"Ad"},{label:"Photo"},{label:"Page"},{label:"Press"}]
    },
    "parent-magazine": {
      kicker: "Feature Story / Magazine Design",
      title: "NCPN Parent Magazine",
      subtitle: "Monthly parenting magazine layout",
      noteTitle: "Magazine Story",
      paragraphs: ["A monthly parenting publication built around approachable editorial design, visual storytelling, typography, recurring InDesign layout systems, and reader-friendly content organization.", "This issue shows how soft pacing, clear structure, and warm editorial hierarchy can make family-focused content easier to scan, read, and enjoy."],
      sidebarTitle: "Production Notes",
      details: [["Role", "Magazine layout, typography, recurring departments, ad integration, and print production."], ["Tools", "Adobe InDesign, Photoshop, Acrobat, proofing, and recurring issue templates."], ["Outcome", "Created approachable publication layouts for a family-focused reader audience."]],
      shows: ["Approachable layout", "Visual storytelling", "Family audience", "Magazine pacing"],
      gallery: [{label:"Cover"},{label:"Story"},{label:"Photo"},{label:"Ad"},{label:"Guide"},{label:"Spread"}]
    },

    "archive-advertising": {
      kicker: "Archive Issue / Advertising Design",
      title: "Advertising Campaigns",
      subtitle: "Print campaigns · client ads · award-winning layouts",
      noteTitle: "Issue Cover",
      paragraphs: ["This issue gathers the strongest advertising-style examples into one working gallery so the archive can feel like a real printed issue instead of a static list.", "The six demo ads are temporary and are placed throughout the site to test thumbnail sizing, overlay behavior, keyboard navigation, and the full-size lightbox experience."],
      sidebarTitle: "Project Notes",
      details: [["Role", "Advertising layout, client communication, publication production, and print preparation."], ["Best Use", "Use this as the master ad gallery for the strongest single ads and campaign sets."], ["Demo Status", "Temporary images are included only to test the lightbox and archive experience."]],
      shows: ["Print advertising", "Client goals", "Sales support", "Award-style proof"],
      gallery: demoAdGallery()
    },
    "archive-restaurant-hospitality": {
      kicker: "Archive Issue / Restaurant & Hospitality",
      title: "Restaurant & Hospitality",
      subtitle: "Restaurants · diners · taverns · event promotions",
      noteTitle: "Issue Cover",
      paragraphs: ["Restaurant and hospitality advertising needs to communicate quickly: what is happening, when it happens, where to go, and why it is worth attention.", "This issue uses the demo ads to show how seasonal events, food specials, entertainment, and location details can live together in a working gallery."],
      sidebarTitle: "Project Notes",
      details: [["Role", "Event advertising, food promotion layouts, seasonal campaigns, and local business communication."], ["Best Use", "Swap in real restaurant, tourism, lodging, and hospitality examples later."], ["Demo Status", "Temporary restaurant ads are active so every thumbnail can open a lightbox."]],
      shows: ["Restaurant advertising", "Seasonal campaigns", "Promotional hierarchy", "Local business needs"],
      gallery: demoAdGallery([0,1,2,3,5])
    },
    "archive-publication-design": {
      kicker: "Archive Issue / Publication Design",
      title: "Publication Design",
      subtitle: "Magazines · newspapers · real estate · business publications",
      noteTitle: "Issue Cover",
      paragraphs: ["Recurring publication work shows more than single-piece design. It shows systems, pacing, consistency, deadlines, and the ability to manage editorial and advertising content together.", "Use this issue for North Coast Business Journal, HOMES, The Beacon, and NCPN examples as those assets are prepared."],
      sidebarTitle: "Project Notes",
      details: [["Role", "Editorial layout, ad placement, issue pacing, page composition, and prepress output."], ["Best Use", "Add covers, spreads, front pages, and recurring department examples."], ["Demo Status", "Temporary ads fill the gallery until publication screenshots are added."]],
      shows: ["Publication systems", "Editorial hierarchy", "Ad integration", "Deadline production"],
      gallery: demoAdGallery([4,0,1,2,3,5])
    },
    "archive-brand-identity": {
      kicker: "Archive Issue / Brand Identity",
      title: "Brand Identity",
      subtitle: "Logo design · brand refreshes · visual systems",
      noteTitle: "Issue Cover",
      paragraphs: ["Brand identity work belongs in the archive because it supports the bigger communications story: consistent visuals across print, web, signage, advertising, and collateral.", "This issue is ready for logo tiles, before-and-after refreshes, brand color systems, and real-world application examples."],
      sidebarTitle: "Project Notes",
      details: [["Role", "Logo design, visual identity, brand refreshes, and applied communication systems."], ["Best Use", "Add identity tiles, mockups, and one-sentence captions explaining each design problem."], ["Demo Status", "Ad examples are only placeholders until identity assets are dropped in."]],
      shows: ["Logo systems", "Brand consistency", "Visual communication", "Applied identity"],
      gallery: demoAdGallery([0,4,1,5,2,3])
    },
    "archive-web-digital": {
      kicker: "Archive Issue / Web & Digital",
      title: "Web & Digital",
      subtitle: "WordPress · SEO copy · email marketing · content updates",
      noteTitle: "Issue Cover",
      paragraphs: ["This issue positions Adam as a communications and marketing professional who can support websites, email, content, SEO, and digital updates — not only visual design.", "Add screenshots of websites, email campaigns, page refreshes, landing sections, analytics wins, or content before-and-after examples."],
      sidebarTitle: "Project Notes",
      details: [["Role", "WordPress updates, web content, SEO-minded copy, email content, and digital communication support."], ["Best Use", "Strong support for digital marketing, communications, and coordinator roles."], ["Demo Status", "Temporary images keep the gallery functional until screenshots are ready."]],
      shows: ["Digital communication", "Website maintenance", "SEO content", "Email marketing"],
      gallery: demoAdGallery([4,0,5,1,2,3])
    },
    "archive-photography": {
      kicker: "Archive Issue / Photography",
      title: "Photography",
      subtitle: "Location images · marketing visuals · editorial support",
      noteTitle: "Issue Cover",
      paragraphs: ["Photography adds proof that Adam can support the full communication package: images for websites, brochures, editorial layouts, hospitality marketing, and brand storytelling.", "This issue can eventually hold location photos, staff images, room photography, product shots, and edited visual assets."],
      sidebarTitle: "Project Notes",
      details: [["Role", "Photography, image selection, editing, optimization, and placement across marketing materials."], ["Best Use", "Add real photo examples with captions about where each image was used."], ["Demo Status", "Ads are placeholders for now so the overlay can be tested end-to-end."]],
      shows: ["Marketing photography", "Image preparation", "Visual storytelling", "Cross-channel use"],
      gallery: demoAdGallery([5,0,1,4,2,3])
    },
    "archive-marketing-collateral": {
      kicker: "Archive Issue / Marketing Collateral",
      title: "Marketing Collateral",
      subtitle: "Brochures · flyers · sales support · printed communication",
      noteTitle: "Issue Cover",
      paragraphs: ["Marketing collateral is where design, copy, audience, and business goals have to meet in a practical format people can actually use.", "This issue is ready for brochures, flyers, sell sheets, conference materials, rack cards, postcards, and sales support pieces."],
      sidebarTitle: "Project Notes",
      details: [["Role", "Brochure design, sales support materials, print communication, layout, and production."], ["Best Use", "Use this as proof for marketing coordinator and communications roles."], ["Demo Status", "Temporary ad examples stand in for collateral until final images are chosen."]],
      shows: ["Sales support", "Clear messaging", "Brochure systems", "Print production"],
      gallery: demoAdGallery([0,5,4,1,2,3])
    },
    "archive-editorial-features": {
      kicker: "Archive Issue / Editorial Features",
      title: "Editorial Features",
      subtitle: "Feature stories · reader pacing · layout systems",
      noteTitle: "Issue Cover",
      paragraphs: ["Editorial features show the ability to guide a reader through a story, not just decorate a page. The work is hierarchy, pacing, images, captions, pull quotes, and structure.", "Use this issue for magazine features, newspaper feature pages, business stories, parent magazine spreads, and strong editorial layouts."],
      sidebarTitle: "Project Notes",
      details: [["Role", "Feature layout, story hierarchy, image placement, and reader-friendly pacing."], ["Best Use", "Add spreads and note what made the article easier to scan or understand."], ["Demo Status", "Temporary examples keep the gallery live while editorial images are gathered."]],
      shows: ["Feature pacing", "Reader hierarchy", "Editorial polish", "Story structure"],
      gallery: demoAdGallery([4,1,0,2,5,3])
    },
    "archive-awards": {
      kicker: "Archive Issue / Awards",
      title: "Awards",
      subtitle: "Recognition · strongest work · proof points",
      noteTitle: "Issue Cover",
      paragraphs: ["This issue gives hiring managers and clients a fast way to see proof of quality: award-winning ads, strongest print examples, and the pieces Adam wants people to notice first.", "Keep this issue selective. It should feel like a highlight reel, not a storage drawer."],
      sidebarTitle: "Project Notes",
      details: [["Role", "Award-winning advertising and strongest portfolio highlights."], ["Best Use", "Keep only the clearest, most impressive examples here."], ["Demo Status", "Temporary ads are included while award-specific images and captions are selected."]],
      shows: ["Recognition", "Strongest examples", "Fast proof", "Portfolio highlights"],
      gallery: demoAdGallery([3,0,2,1,5,4])
    }
  };

  const triggers = document.querySelectorAll("[data-archive-issue]");
  const closeButtons = overlay.querySelectorAll("[data-archive-issue-close]");
  const firstClose = overlay.querySelector(".archive-issue-close");
  const adGrid = overlay.querySelector(".archive-ad-grid");
  const adViewer = overlay.querySelector(".archive-ad-viewer");
  const adViewerImg = overlay.querySelector(".archive-ad-viewer-img");
  const adViewerCaption = overlay.querySelector(".archive-ad-viewer-caption");
  let lastFocus = null;
  let currentIssueKey = "archive-advertising";
  let currentGallery = [];
  let currentGalleryIndex = 0;

  function getArchiveIssueKeys() {
    return archiveProjects.map(project => project.issueKey).filter(key => ARCHIVE_ISSUES[key]);
  }

  function goToSiblingIssue(direction) {
    const keys = getArchiveIssueKeys();
    const currentIndex = keys.indexOf(currentIssueKey);
    const nextIndex = currentIndex < 0 ? 0 : (currentIndex + direction + keys.length) % keys.length;
    setIssueContent(keys[nextIndex]);
  }

  function setIssueContent(issueKey) {
    const issue = ARCHIVE_ISSUES[issueKey] || ARCHIVE_ISSUES["advertising-healthcare"];
    currentIssueKey = issueKey;
    currentGallery = issue.gallery || [];

    overlay.querySelector(".archive-issue-kicker").textContent = issue.kicker;
    overlay.querySelector("#archive-issue-title").textContent = issue.title;
    overlay.querySelector(".archive-issue-subtitle").textContent = issue.subtitle;
    overlay.querySelector(".archive-issue-main h3").textContent = issue.noteTitle;

    const main = overlay.querySelector(".archive-issue-main");
    main.querySelectorAll(":scope > p:not(.archive-issue-note)").forEach((p, index) => {
      p.textContent = issue.paragraphs[index] || "";
    });

    /* EDITING NOTE:
       Gallery thumbnails are rendered here from ARCHIVE_ISSUES[issueKey].gallery.

       v5.2.6 update:
       Each gallery button now has a square .archive-ad-art area. Images use
       object-fit: contain so the full portfolio piece stays visible. Any
       leftover space around the image is intentionally black, like a contact
       sheet or gallery mat. The caption sits below the square image area so
       card titles stay aligned and easy to scan.

       To add real work later, edit ARCHIVE_ISSUES[issueKey].gallery above:
       { src: "assets/example.png", label: "Project Name", alt: "Alt text" }
    */
    if (adGrid) {
      adGrid.innerHTML = currentGallery.map((item, index) => {
        const label = item.label || `Item ${index + 1}`;
        const itemNumber = String(index + 1).padStart(3, "0");

        if (item.src) {
          return `<button type="button" class="archive-ad-thumb has-image" data-ad-index="${index}"><span class="archive-ad-art"><img src="${item.src}" alt="${item.alt || label}"></span><span class="archive-ad-caption"><small>${itemNumber}</small><strong>${label}</strong></span></button>`;
        }

        return `<button type="button" class="archive-ad-thumb" data-ad-index="${index}"><span class="archive-ad-art archive-ad-placeholder"><span>${label}</span></span><span class="archive-ad-caption"><small>${itemNumber}</small><strong>${label}</strong></span></button>`;
      }).join("");
    }

    overlay.querySelector(".archive-issue-note").textContent = issue.gallery?.some(item => item.src)
      ? "Demo images are temporary placeholders for testing. Replace the files/captions in script.js when final portfolio images are ready."
      : "Editing note: swap these labeled frames for real thumbnails later; the overlay behavior is already wired up.";
    overlay.querySelector(".archive-issue-sidebar h3").textContent = issue.sidebarTitle;

    const dl = overlay.querySelector(".archive-issue-sidebar dl");
    dl.innerHTML = issue.details.map(([term, desc]) => `<dt>${term}</dt><dd>${desc}</dd>`).join("");

    const list = overlay.querySelector(".archive-issue-sidebar ul");
    list.innerHTML = issue.shows.map(item => `<li>${item}</li>`).join("");

    const issueKeys = getArchiveIssueKeys();
    const issueNumber = issueKeys.indexOf(issueKey) + 1;
    overlay.querySelector(".archive-issue-footer span").textContent = issueNumber > 0
      ? `Issue ${String(issueNumber).padStart(2, "0")} of ${String(issueKeys.length).padStart(2, "0")} · ${issue.title}`
      : `Feature overlay · ${issue.title}`;
  }

  function openIssue(event) {
    if (event) event.preventDefault();
    const issueKey = event?.currentTarget?.dataset?.archiveIssue || "advertising-healthcare";
    setIssueContent(issueKey);
    lastFocus = document.activeElement;
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("archive-issue-open");
    if (firstClose) firstClose.focus();
  }

  function closeIssue() {
    closeAdViewer();
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("archive-issue-open");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }



  function openAdViewer(index) {
    const item = currentGallery[index];
    if (!item || !item.src || !adViewer || !adViewerImg) return;
    currentGalleryIndex = index;
    adViewerImg.src = item.src;
    adViewerImg.alt = item.alt || item.label || "Archive image";
    if (adViewerCaption) adViewerCaption.textContent = item.label || "Archive image";
    adViewer.classList.add("is-open");
    adViewer.setAttribute("aria-hidden", "false");
  }

  function closeAdViewer() {
    if (!adViewer) return;
    adViewer.classList.remove("is-open");
    adViewer.setAttribute("aria-hidden", "true");
    if (adViewerImg) adViewerImg.removeAttribute("src");
  }

  function stepAdViewer(direction) {
    const imageIndexes = currentGallery.map((item, index) => item.src ? index : null).filter(index => index !== null);
    if (!imageIndexes.length) return;
    const currentPosition = Math.max(0, imageIndexes.indexOf(currentGalleryIndex));
    const nextPosition = (currentPosition + direction + imageIndexes.length) % imageIndexes.length;
    openAdViewer(imageIndexes[nextPosition]);
  }

  adGrid?.addEventListener("click", (event) => {
    const thumb = event.target.closest(".archive-ad-thumb");
    if (!thumb) return;
    openAdViewer(Number(thumb.dataset.adIndex));
  });

  overlay.querySelector(".archive-issue-prev")?.addEventListener("click", () => goToSiblingIssue(-1));
  overlay.querySelector(".archive-issue-next")?.addEventListener("click", () => goToSiblingIssue(1));
  overlay.querySelector(".archive-ad-viewer-close")?.addEventListener("click", closeAdViewer);
  overlay.querySelector(".archive-ad-viewer-prev")?.addEventListener("click", () => stepAdViewer(-1));
  overlay.querySelector(".archive-ad-viewer-next")?.addEventListener("click", () => stepAdViewer(1));
  adViewer?.addEventListener("click", (event) => {
    if (event.target === adViewer) closeAdViewer();
  });

  triggers.forEach((trigger) => trigger.addEventListener("click", openIssue));
  closeButtons.forEach((button) => button.addEventListener("click", closeIssue));
  document.addEventListener("keydown", (event) => {
    if (!overlay.classList.contains("is-open")) return;
    if (event.key === "Escape" && adViewer?.classList.contains("is-open")) return closeAdViewer();
    if (event.key === "Escape") closeIssue();
    if (event.key === "ArrowLeft" && adViewer?.classList.contains("is-open")) stepAdViewer(-1);
    if (event.key === "ArrowRight" && adViewer?.classList.contains("is-open")) stepAdViewer(1);
  });
})();;
