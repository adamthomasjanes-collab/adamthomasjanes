/*
═══════════════════════════════════════════════════════════════
JAVASCRIPT CHAPTER NOTES · THE BACKSTAGE CREW

The JavaScript should feel like stage management, not a magic trick.
It opens the archive overlays, swaps issue copy, moves the gallery,
animates counters, watches scroll position, and supports keyboard
navigation. The content remains in or near the HTML; the script adds
pacing, interaction, and polish.

First rule for future edits:
If an interaction breaks, the page should still communicate clearly.
Progressive enhancement matters more than cleverness.
═══════════════════════════════════════════════════════════════
*/

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
  - archive sample images can be replaced later with final portfolio artwork without changing the whole interaction system.

  Debugging guide:
  - If a button stops opening an overlay, first check its data-* attribute in index.html.
  - If an archive category opens the wrong story, check the order and issueKey values in archiveProjects.
  - If an overlay interaction fails, check the shared issue overlay and its focus-return behavior.

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
const archiveProjects = [
  {
    title: "Advertising Campaigns",
    type: "Advertising / Print Campaigns",
    desc: "A concentrated gallery of local and regional advertising work, built to demonstrate strong hierarchy, client-focused messaging, production speed, and print-ready design judgment.",
    points: ["Campaign systems across multiple formats", "Seasonal and hospitality advertising", "Clear hierarchy under real production deadlines"],
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
  initArchive();
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

  /*
    Navigation state is intentionally NOT updated here.

    The unified navigation controller farther down this file is the only code
    allowed to choose the active chapter and position the magenta slider.
    Keeping that responsibility in one place prevents intermediate smooth-scroll
    positions from pulling the slider away from a link the visitor just clicked.
  */
  updateAmbientMotion();
  updateSectionTitles();
  updateServices();
  updateFeatured();
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

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    element.textContent = `${target}${suffix}`;
    return;
  }

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
  const buttons = $$(buttonSelector);
  const panels = $$(panelSelector);

  function activate(button, moveFocus = false) {
      const target = button.dataset[buttonData];

      buttons.forEach(item => {
        item.classList.remove("is-active");
        item.setAttribute("aria-selected", "false");
        item.setAttribute("tabindex", "-1");
      });

      panels.forEach(panel => {
        panel.classList.remove("is-active");
        panel.hidden = true;
      });

      button.classList.add("is-active");
      button.setAttribute("aria-selected", "true");
      button.setAttribute("tabindex", "0");
      const panel = $(`[data-${panelData}="${target}"]`);
      if (panel) {
        panel.classList.add("is-active");
        panel.hidden = false;
      }
      if (moveFocus) button.focus();
  }

  buttons.forEach((button, index) => {
    const target = button.dataset[buttonData];
    const panel = $(`[data-${panelData}="${target}"]`);
    const tabId = `${buttonData}-tab-${target}`;
    const panelId = `${buttonData}-panel-${target}`;

    button.id = tabId;
    button.setAttribute("aria-controls", panelId);
    button.setAttribute("tabindex", button.classList.contains("is-active") ? "0" : "-1");
    if (panel) {
      panel.id = panelId;
      panel.setAttribute("aria-labelledby", tabId);
      panel.hidden = !panel.classList.contains("is-active");
    }

    button.addEventListener("click", () => activate(button));
    button.addEventListener("keydown", (event) => {
      let nextIndex = null;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % buttons.length;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + buttons.length) % buttons.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = buttons.length - 1;
      if (nextIndex === null) return;
      event.preventDefault();
      activate(buttons[nextIndex], true);
    });

    button.setAttribute("aria-selected", button.classList.contains("is-active") ? "true" : "false");
  });
}

// ARCHIVE BROWSER
// Powers the left-side archive tabs, preview panel, and next/previous controls.
function initArchive() {
  $$(".archive-item").forEach((button, index) => {
    button.addEventListener("click", () => renderArchive(index));
    button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
  });

  $(".archive-prev")?.addEventListener("click", () => renderArchive(state.archiveIndex - 1));
  $(".archive-next")?.addEventListener("click", () => renderArchive(state.archiveIndex + 1));
  // EDITING NOTE: The Archive “Open” button now uses the newer Archive Issue Overlay.
  // The overlay click itself is handled by initArchiveIssueOverlay() near the bottom of this file.
  $(".archive-open")?.addEventListener("click", event => {
    state.lastDialogTrigger = event.currentTarget;
  });
  renderArchive(0);
}

function renderArchive(index) {
  state.archiveIndex = (index + archiveProjects.length) % archiveProjects.length;
  const project = archiveProjects[state.archiveIndex];

  $$(".archive-item").forEach((button, i) => {
    const active = i === state.archiveIndex;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });

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

}

init();


// Version 2.5 helper: secure external links if any are set to open in a new tab later.
document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  link.setAttribute("rel", "noopener noreferrer");
});


// SIMPLE PRIMARY NAVIGATION + SCROLL TRACKING
// Native anchor links remain responsible for moving through the page. A single
// IntersectionObserver updates only the modest per-link underline as each
// chapter enters the upper reading area. There is no moving slider, timer,
// scrollIntoView call, or custom destination calculation.
(function () {
  const links = [...document.querySelectorAll(".nav a[href^='#']")];
  if (!links.length) return;

  const chapters = links
    .map((link) => {
      const target = document.querySelector(link.getAttribute("href"));
      return target ? { link, target } : null;
    })
    .filter(Boolean);

  if (!chapters.length) return;

  function activate(link) {
    links.forEach((item) => {
      const isActive = item === link;
      item.classList.toggle("is-active", isActive);

      if (isActive) {
        item.setAttribute("aria-current", "location");
      } else {
        item.removeAttribute("aria-current");
      }
    });
  }

  // Give immediate feedback on click while leaving anchor navigation entirely
  // to the browser. The observer may confirm or update the active chapter later.
  links.forEach((link) => {
    link.addEventListener("click", () => activate(link));
  });

  // Respect a bookmarked chapter on initial load. Otherwise begin with the
  // first chapter until scrolling brings another chapter into the reading zone.
  const initial = links.find((link) => link.getAttribute("href") === window.location.hash);
  activate(initial || links[0]);

  if (!("IntersectionObserver" in window)) return;

  const visibleChapters = new Set();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        visibleChapters.add(entry.target);
      } else {
        visibleChapters.delete(entry.target);
      }
    });

    if (!visibleChapters.size) return;

    // When two neighboring chapters briefly share the observation band, prefer
    // the chapter whose top edge is closest to the sticky-header reading line.
    const activeChapter = chapters
      .filter(({ target }) => visibleChapters.has(target))
      .sort((a, b) => {
        const aTop = Math.abs(a.target.getBoundingClientRect().top - 84);
        const bTop = Math.abs(b.target.getBoundingClientRect().top - 84);
        return aTop - bTop;
      })[0];

    if (activeChapter) activate(activeChapter.link);
  }, {
    root: null,
    rootMargin: "-84px 0px -68% 0px",
    threshold: 0
  });

  chapters.forEach(({ target }) => observer.observe(target));
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


  const ARCHIVE_SAMPLE_ADS = [
    { label: "Tin Goose Memorial Day", src: "assets/ad-print-design-america-holiday(1).png", alt: "Tin Goose Diner Memorial Day advertisement" },
    { label: "Rosie’s Christmas Lunch", src: "assets/ad-print-design-bar-christmas(1).png", alt: "Rosie’s Bar and Grill Christmas lunch advertisement" },
    { label: "Beer Thirty St. Patrick’s", src: "assets/ad-print-design-bar-stpatrick(1).png", alt: "Beer Thirty St. Patrick’s party advertisement" },
    { label: "Halloween Party", src: "assets/ad-print-design-halloween-party(1).png", alt: "Halloween party advertisement with zombie illustration" },
    { label: "North Coast Parent House Ad", src: "assets/ad-print-design-house-ad(1).png", alt: "North Coast Parent house advertisement" },
    { label: "Crow’s Nest Seafood", src: "assets/ad-print-design-restaurant-seafood(1).png", alt: "Crow’s Nest Restaurant seafood special advertisement" }
  ];

  function sampleAdGallery(order = [3, 0, 5, 1, 2, 4]) {
    return order.map((index) => ARCHIVE_SAMPLE_ADS[index]);
  }

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

    "camp-perry-brand-system": {
      kicker: "Feature Story / Brand Development",
      title: "Camp Perry Lodging & Conference Center",
      subtitle: "Brand system · WordPress website · photography · collateral",
      noteTitle: "Project Story",
     paragraphs: [
"A complete communications system for a hospitality and conference center, combining brand identity, a custom WordPress website, professional real estate photography, SEO-focused content, automated reservation emails, brochures, and customer-facing collateral into one cohesive guest experience.",

"The project unified every major guest touchpoint—from discovering the property online to receiving reservation confirmations, arriving on site, and interacting with printed materials. Beyond design, the work included professional real estate photography, Lightroom image editing, responsive MJML email development integrated with the reservation management system, SEO copywriting, and production-ready print collateral that reinforced a consistent brand experience across digital and physical channels."
],
      sidebarTitle: "Production Notes",
      details: [["Role", "Brand strategy • WordPress development • Professional real estate photography • Lightroom image editing • Content strategy • SEO copywriting • Email development (MJML) • Print design • Print production"], ["Tools", "WordPress • Adobe InDesign • Photoshop • Lightroom • Illustrator • MJML • HTML/CSS • Reservation Management Software • Google Analytics • SEO"], ["Outcome", "Created a unified communications system spanning web, print, photography, and automated customer emails, improving brand consistency while streamlining reservation confirmations and cancellations through integrated MJML email templates."]],
      shows: ["Brand system thinking", "Web and print consistency", "Hospitality communication", "Client-facing collateral"],
      gallery: [
        /*
          THUMBNAIL SYSTEM / CAMP PERRY

          thumb = the small square image used in the visible gallery card.
          src   = the larger/full image used when someone clicks the thumbnail.

          Put thumbnail files here:
          assets/camp-perry/thumbs/

          Keep thumbnails square when possible, around 600×600px.
          Keep the full images larger and more detailed.

          If a thumb file is missing, the script falls back to src automatically.
        */
        {
          label: "Primary Brand Identity",
          thumb: "assets/camp-perry/thumbs/thumb_camp-perry-logo.png",
          src: "assets/camp-perry/camp-perry-logo.png",
          alt: "Camp Perry Lodging and Conference Center logo design"
        },
        {
          label: "Responsive Website",
          thumb: "assets/camp-perry/thumbs/thumb_camp-perry-website.png",
          src: "assets/camp-perry/camp-perry-website.webp",
          alt: "Camp Perry Lodging and Conference Center website design"
        },
        {
          label: "Printed Brochure",
          thumb: "assets/camp-perry/thumbs/thumb_camp-perry-brochure.png",
          src: "assets/camp-perry/camp-perry-brochure.webp",
          alt: "Camp Perry Lodging and Conference Center brochure design"
        },
        {
          label: "Location Photography",
          thumb: "assets/camp-perry/thumbs/thumb_camp-perry-photography.png",
          src: "assets/camp-perry/camp-perry-photography.jpg",
          alt: "Camp Perry Lodging and Conference Center photography"
        },
        {
          label: "Reservation Email",
          thumb: "assets/camp-perry/thumbs/thumb_camp-perry-email.png",
          src: "assets/camp-perry/camp-perry-email.png",
          alt: "Camp Perry Lodging and Conference Center email design"
        },
        {
          label: "Marketing Collateral",
          thumb: "assets/camp-perry/thumbs/thumb_camp-perry-collateral.png",
          src: "assets/camp-perry/camp-perry-collateral.png",
          alt: "Camp Perry Lodging and Conference Center marketing collateral"
        }
      ]
    },
    "north-coast-business-journal": {
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
    "beacon-newspaper-production": {
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
    "ncpn-parent-magazine": {
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
      paragraphs: ["This issue gathers the strongest advertising-style examples into one working gallery so the archive can feel like a real printed issue instead of a static list.", "The gallery brings together campaign, seasonal, and client-focused advertising that demonstrates hierarchy, production judgment, and clear promotional communication."],
      sidebarTitle: "Project Notes",
      details: [["Role", "Advertising layout, client communication, publication production, and print preparation."], ["Focus", "Selected single advertisements and campaign work that demonstrate message hierarchy, production quality, and client communication."], ["Presentation", "Each image opens in a full-size viewer for closer inspection."]],
      shows: ["Print advertising", "Client goals", "Sales support", "Award-style proof"],
      gallery: sampleAdGallery()
    },
    "archive-restaurant-hospitality": {
      kicker: "Archive Issue / Restaurant & Hospitality",
      title: "Restaurant & Hospitality",
      subtitle: "Restaurants · diners · taverns · event promotions",
      noteTitle: "Issue Cover",
      paragraphs: ["Restaurant and hospitality advertising needs to communicate quickly: what is happening, when it happens, where to go, and why it is worth attention.", "The selected work shows how seasonal events, food specials, entertainment, and location details can be organized into direct, energetic promotional communication."],
      sidebarTitle: "Project Notes",
      details: [["Role", "Event advertising, food promotion layouts, seasonal campaigns, and local business communication."], ["Focus", "Restaurant, tourism, lodging, and event promotions designed for quick recognition and practical customer response."], ["Presentation", "Each image opens in a full-size viewer for closer inspection."]],
      shows: ["Restaurant advertising", "Seasonal campaigns", "Promotional hierarchy", "Local business needs"],
      gallery: sampleAdGallery([0,1,2,3,5])
    },
    "archive-publication-design": {
      kicker: "Archive Issue / Publication Design",
      title: "Publication Design",
      subtitle: "Magazines · newspapers · real estate · business publications",
      noteTitle: "Issue Cover",
      paragraphs: ["Recurring publication work shows more than single-piece design. It shows systems, pacing, consistency, deadlines, and the ability to manage editorial and advertising content together.", "The work spans business publications, newspapers, real-estate publishing, and family-focused magazines, revealing the systems that keep recurring issues coherent and readable."],
      sidebarTitle: "Project Notes",
      details: [["Role", "Editorial layout, ad placement, issue pacing, page composition, and prepress output."], ["Focus", "Covers, spreads, front pages, and recurring editorial structures that demonstrate consistency across publication formats."], ["Presentation", "Selected examples emphasize hierarchy, pacing, and production discipline."]],
      shows: ["Publication systems", "Editorial hierarchy", "Ad integration", "Deadline production"],
      gallery: sampleAdGallery([4,0,1,2,3,5])
    },
    "archive-brand-identity": {
      kicker: "Archive Issue / Brand Identity",
      title: "Brand Identity",
      subtitle: "Logo design · brand refreshes · visual systems",
      noteTitle: "Issue Cover",
      paragraphs: ["Brand identity work belongs in the archive because it supports the bigger communications story: consistent visuals across print, web, signage, advertising, and collateral.", "The work includes identity marks, visual refreshes, color systems, and applications that carry a consistent brand across real-world communication."],
      sidebarTitle: "Project Notes",
      details: [["Role", "Logo design, visual identity, brand refreshes, and applied communication systems."], ["Focus", "Identity systems and applications that connect visual decisions to practical communication needs."], ["Presentation", "Examples are selected to show both the core identity and how it performs in use."]],
      shows: ["Logo systems", "Brand consistency", "Visual communication", "Applied identity"],
      gallery: sampleAdGallery([0,4,1,5,2,3])
    },
    "archive-web-digital": {
      kicker: "Archive Issue / Web & Digital",
      title: "Web & Digital",
      subtitle: "WordPress · SEO copy · email marketing · content updates",
      noteTitle: "Issue Cover",
      paragraphs: ["This issue positions Adam as a communications and marketing professional who can support websites, email, content, SEO, and digital updates — not only visual design.", "The work includes websites, email campaigns, page improvements, landing experiences, and content updates that connect strategy with practical digital execution."],
      sidebarTitle: "Project Notes",
      details: [["Role", "WordPress updates, web content, SEO-minded copy, email content, and digital communication support."], ["Focus", "Digital communication that combines content, usability, maintenance, and marketing objectives."], ["Relevance", "Demonstrates hands-on support for communications, content, and digital marketing roles."]],
      shows: ["Digital communication", "Website maintenance", "SEO content", "Email marketing"],
      gallery: sampleAdGallery([4,0,5,1,2,3])
    },
    "archive-photography": {
      kicker: "Archive Issue / Photography",
      title: "Photography",
      subtitle: "Location images · marketing visuals · editorial support",
      noteTitle: "Issue Cover",
      paragraphs: ["Photography adds proof that Adam can support the full communication package: images for websites, brochures, editorial layouts, hospitality marketing, and brand storytelling.", "The selected photography supports locations, people, interiors, products, and editorial stories with images prepared for both print and digital use."],
      sidebarTitle: "Project Notes",
      details: [["Role", "Photography, image selection, editing, optimization, and placement across marketing materials."], ["Focus", "Photography created and prepared for websites, publications, brochures, and marketing campaigns."], ["Approach", "Image selection and editing are guided by the communication purpose of each project."]],
      shows: ["Marketing photography", "Image preparation", "Visual storytelling", "Cross-channel use"],
      gallery: sampleAdGallery([5,0,1,4,2,3])
    },
    "archive-marketing-collateral": {
      kicker: "Archive Issue / Marketing Collateral",
      title: "Marketing Collateral",
      subtitle: "Brochures · flyers · sales support · printed communication",
      noteTitle: "Issue Cover",
      paragraphs: ["Marketing collateral is where design, copy, audience, and business goals have to meet in a practical format people can actually use.", "The work includes brochures, flyers, sell sheets, conference materials, rack cards, postcards, and sales tools designed for clear, practical use."],
      sidebarTitle: "Project Notes",
      details: [["Role", "Brochure design, sales support materials, print communication, layout, and production."], ["Focus", "Client-facing materials that combine message clarity, visual hierarchy, and dependable print production."], ["Relevance", "Demonstrates practical support for marketing, communications, and sales teams."]],
      shows: ["Sales support", "Clear messaging", "Brochure systems", "Print production"],
      gallery: sampleAdGallery([0,5,4,1,2,3])
    },
    "archive-editorial-features": {
      kicker: "Archive Issue / Editorial Features",
      title: "Editorial Features",
      subtitle: "Feature stories · reader pacing · layout systems",
      noteTitle: "Issue Cover",
      paragraphs: ["Editorial features show the ability to guide a reader through a story, not just decorate a page. The work is hierarchy, pacing, images, captions, pull quotes, and structure.", "The examples span magazine features, newspaper pages, business stories, and family-focused spreads, each shaped to make longer-form content easier to enter and follow."],
      sidebarTitle: "Project Notes",
      details: [["Role", "Feature layout, story hierarchy, image placement, and reader-friendly pacing."], ["Focus", "Feature layouts that use typography, imagery, captions, and pacing to guide the reader through a story."], ["Approach", "Every layout is evaluated by how clearly it helps the audience scan, understand, and continue reading."]],
      shows: ["Feature pacing", "Reader hierarchy", "Editorial polish", "Story structure"],
      gallery: sampleAdGallery([4,1,0,2,5,3])
    },
    "archive-awards": {
      kicker: "Archive Issue / Awards",
      title: "Awards",
      subtitle: "Recognition · strongest work · proof points",
      noteTitle: "Issue Cover",
      paragraphs: ["This issue gives hiring managers and clients a fast way to see proof of quality: award-winning ads, strongest print examples, and the pieces Adam wants people to notice first.", "Keep this issue selective. It should feel like a highlight reel, not a storage drawer."],
      sidebarTitle: "Project Notes",
      details: [["Role", "Award-winning advertising and strongest portfolio highlights."], ["Focus", "A selective group of recognized and high-impact work chosen for clarity, craft, and communication value."], ["Selection", "Only the strongest examples are included so the section remains concise and meaningful."]],
      shows: ["Recognition", "Strongest examples", "Fast proof", "Portfolio highlights"],
      gallery: sampleAdGallery([3,0,2,1,5,4])
    }
  };

  const triggers = document.querySelectorAll("[data-archive-issue]");
  const closeButtons = overlay.querySelectorAll("[data-archive-issue-close]");
  const firstClose = overlay.querySelector(".archive-issue-close");
  const adGrid = overlay.querySelector(".archive-ad-grid");
  const adViewer = overlay.querySelector(".archive-ad-viewer");
  const adViewerImg = overlay.querySelector(".archive-ad-viewer-img");
  const adViewerCaption = overlay.querySelector(".archive-ad-viewer-caption");
  const backgroundRegions = [...document.body.children].filter((element) => element !== overlay && element.tagName !== "SCRIPT");
  let lastFocus = null;
  let currentIssueKey = "archive-advertising";
  let currentGallery = [];
  let currentGalleryIndex = 0;

  /*
    FEATURE VS. ARCHIVE ISSUE NAVIGATION

    The same overlay is used in two different places:
    1. Feature cards near the top of the page.
    2. Archive category cards farther down the page.

    The Previous / Next buttons should stay inside whichever family
    opened the overlay. If someone opens Camp Perry from the Feature
    section, Next should go to North Coast Business Journal, not jump
    into the archive category rotation.
  */
  const FEATURE_ISSUE_KEYS = [
    "camp-perry-brand-system",
    "north-coast-business-journal",
    "beacon-newspaper-production",
    "ncpn-parent-magazine"
  ];

  function getArchiveIssueKeys() {
    return archiveProjects.map(project => project.issueKey).filter(key => ARCHIVE_ISSUES[key]);
  }

  function getSiblingIssueKeys() {
    return FEATURE_ISSUE_KEYS.includes(currentIssueKey)
      ? FEATURE_ISSUE_KEYS.filter(key => ARCHIVE_ISSUES[key])
      : getArchiveIssueKeys();
  }

  function goToSiblingIssue(direction) {
    const keys = getSiblingIssueKeys();
    const currentIndex = keys.indexOf(currentIssueKey);
    const nextIndex = currentIndex < 0 ? 0 : (currentIndex + direction + keys.length) % keys.length;
    setIssueContent(keys[nextIndex]);
  }

  function setIssueContent(issueKey) {
    const issue = ARCHIVE_ISSUES[issueKey] || ARCHIVE_ISSUES["camp-perry-brand-system"];
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
       the square thumb area remains clean and consistent, like an
       editorial contact sheet. The caption sits below the square image area so
       card titles stay aligned and easy to scan.

       To add real work later, edit ARCHIVE_ISSUES[issueKey].gallery above:
       { thumb: "assets/example-thumb.png", src: "assets/example.png", label: "Project Name", alt: "Alt text" }
    */
    if (adGrid) {
      adGrid.innerHTML = currentGallery.map((item, index) => {
        const label = item.label || `Item ${index + 1}`;
        const itemNumber = String(index + 1).padStart(3, "0");

        if (item.src) {
          return `<button type="button" class="archive-ad-thumb has-image" data-ad-index="${index}"><span class="archive-ad-art"><img src="${item.thumb || item.src}" alt="${item.alt || label}" loading="lazy" decoding="async"></span><span class="archive-ad-caption"><small>${itemNumber}</small><strong>${label}</strong></span></button>`;
        }

        return `<button type="button" class="archive-ad-thumb" data-ad-index="${index}"><span class="archive-ad-art archive-ad-placeholder"><span>${label}</span></span><span class="archive-ad-caption"><small>${itemNumber}</small><strong>${label}</strong></span></button>`;
      }).join("");
    }

    overlay.querySelector(".archive-issue-note").textContent = issue.gallery?.some(item => item.src)
      ? "Click any gallery image to view the full project sample."
      : "This archive entry is presented through its project story and production notes.";
    overlay.querySelector(".archive-issue-sidebar h3").textContent = issue.sidebarTitle;

    const dl = overlay.querySelector(".archive-issue-sidebar dl");
    dl.innerHTML = issue.details.map(([term, desc]) => `<dt>${term}</dt><dd>${desc}</dd>`).join("");

    const list = overlay.querySelector(".archive-issue-sidebar ul");
    list.innerHTML = issue.shows.map(item => `<li>${item}</li>`).join("");

    const featureIssueKeys = FEATURE_ISSUE_KEYS.filter(key => ARCHIVE_ISSUES[key]);
    const archiveIssueKeys = getArchiveIssueKeys();
    const isFeatureIssue = featureIssueKeys.includes(issueKey);

    // The same overlay serves feature stories and archive issues. Update the
    // footer controls so the language matches the family currently being read.
    const previousButton = overlay.querySelector(".archive-issue-prev");
    const nextButton = overlay.querySelector(".archive-issue-next");
    if (previousButton) previousButton.textContent = isFeatureIssue ? "← Previous Feature" : "← Previous Issue";
    if (nextButton) nextButton.textContent = isFeatureIssue ? "Next Feature →" : "Next Issue →";
    const issueKeys = isFeatureIssue ? featureIssueKeys : archiveIssueKeys;
    const issueNumber = issueKeys.indexOf(issueKey) + 1;
    overlay.querySelector(".archive-issue-footer span").textContent = issueNumber > 0
      ? `${isFeatureIssue ? "Feature" : "Issue"} ${String(issueNumber).padStart(2, "0")} of ${String(issueKeys.length).padStart(2, "0")} · ${issue.title}`
      : `Feature overlay · ${issue.title}`;
  }

  function openIssue(event) {
    if (event) event.preventDefault();
    const issueKey = event?.currentTarget?.dataset?.archiveIssue || "camp-perry-brand-system";
    setIssueContent(issueKey);
    lastFocus = document.activeElement;
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("archive-issue-open");
    backgroundRegions.forEach((element) => element.inert = true);
    if (firstClose) firstClose.focus();
  }

  function closeIssue() {
    closeAdViewer();
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("archive-issue-open");
    backgroundRegions.forEach((element) => element.inert = false);
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
    if (event.key === "Tab") {
      const focusable = [...overlay.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')]
        .filter((element) => !element.hidden && element.getClientRects().length);
      if (focusable.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    if (event.key === "Escape" && adViewer?.classList.contains("is-open")) return closeAdViewer();
    if (event.key === "Escape") closeIssue();
    if (event.key === "ArrowLeft" && adViewer?.classList.contains("is-open")) stepAdViewer(-1);
    if (event.key === "ArrowRight" && adViewer?.classList.contains("is-open")) stepAdViewer(1);
  });
})();;

// Initial browser hash positioning can occur before late-loading layout has
// settled. Correct it once, after fonts and the first painted layout, without
// taking over ordinary navigation clicks.
(function () {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (!target) return;

  window.addEventListener("load", async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      target.scrollIntoView({ block: "start", behavior: "auto" });
      target.focus({ preventScroll: true });
    }));
  }, { once: true });
})();


/* ==========================================================
   GHOST FOLIO REVEAL

   A single observer adds a quiet entrance to chapter numerals. It
   does not calculate scroll positions, alter anchors, or control the
   navigation; it only toggles a presentational class.
   ========================================================== */
(() => {
  const chapters = [...document.querySelectorAll(".editorial-number-section")];
  if (!chapters.length) return;

  if (!("IntersectionObserver" in window)) {
    chapters.forEach((chapter) => chapter.classList.add("is-ghost-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-ghost-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.18
  });

  chapters.forEach((chapter) => observer.observe(chapter));
})();
