const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

// Shared interaction timings keep asynchronous behavior consistent and easy to tune.
const TIMING = Object.freeze({
  clipboardWriteTimeout: 800,
  copyStatusReset: 3200,
  afterEvent: 0
});

const scheduleAfterEvent = (callback) => window.setTimeout(callback, TIMING.afterEvent);

const state = {
  archiveIndex: 0,
  lastDialogTrigger: null
};

const els = {
  nav: $(".nav"),
  navToggle: $(".nav-toggle"),
  progress: $(".scroll-progress"),
  cursor: $(".cursor-dot"),
  navLinks: $$(".nav a[href^='#']"),
  sections: []
};

els.sections = els.navLinks.map(link => $(link.getAttribute("href"))).filter(Boolean);

const archiveProjects = [
  {
    title: "Selected Advertising",
    type: "Advertising / Campaign Design",
    desc: "A curated collection of client advertising across hospitality, events, automotive, retail, real estate, and community services—including three award-winning Beacon advertisements.",
    points: ["Filter by market or recognition", "Real client work rather than a complete file dump", "Print-ready hierarchy across many formats"],
    thumb: "thumb-campaigns",
    issueKey: "archive-campaigns"
  },
  {
    title: "Best of the Best",
    type: "Identity / Special Publication",
    desc: "A reader-voted Beacon program built around a lighthouse-and-laurel seal that became a reusable annual identity, publication, and recognition system for local businesses.",
    points: ["Original lighthouse and laurel seal", "Color and one-color identity variants", "Annual guide and winner recognition system"],
    thumb: "thumb-best-of-best",
    stackedPreview: true,
    issueKey: "archive-best-of-best"
  },
  {
    title: "Parade of Homes",
    type: "Identity / Publication / Event Marketing",
    desc: "A complete event-publication system joining a custom logo, mapped property route, builder pages, promotional advertising, and a reusable production structure.",
    points: ["Original event logo", "Mapped route and custom property markers", "Publication, sales, and promotional materials"],
    thumb: "thumb-parade",
    stackedPreview: true,
    issueKey: "archive-parade-of-homes"
  },
  {
    title: "HOMES",
    type: "Real Estate Publication / Monthly Production",
    desc: "A recurring real-estate publication for which I designed seasonal covers, created the advertising that filled each issue, prepared supplied photography, and delivered complete print-ready editions.",
    points: ["Seasonal monthly cover system", "Listing and real-estate advertising", "Complete InDesign production and prepress"],
    thumb: "thumb-homes",
    issueKey: "archive-homes"
  },
  {
    title: "Beacon Front Pages",
    type: "Newspaper / Front-Page Collection",
    desc: "A deeper collection of 23 additional Beacon front pages showing how weekly news, photography, civic information, seasonal events, and special coverage were shaped into a consistent publication identity without repeating the featured gallery.",
    points: ["12 covers in the featured gallery", "23 additional covers in this archive", "No front-page repeats between the two collections"],
    thumb: "thumb-beacon-covers",
    issueKey: "archive-beacon-front-pages",
    openLabel: "View the Front-Page Archive"
  },
  {
    title: "North Coast Parent Back Issues",
    type: "Magazine / Expanded Editorial Archive",
    desc: "Fifteen additional North Coast Parent selections organized into five focused galleries, extending the feature with monthly planning, family-service communication, early publication systems, reader resources, learning, and community storytelling.",
    points: ["Five focused archive galleries", "Fifteen unique pages and facing-page selections", "No complete spread repeats from the featured galleries"],
    thumb: "thumb-ncpn-archive",
    issueKey: "archive-ncpn-back-issues",
    openLabel: "View the North Coast Parent Archive"
  },
  {
    title: "NCBJ Editorial Spreads",
    type: "Business Publication / Typography Archive",
    desc: "Twelve additional North Coast Business Journal spreads selected for typography, editorial hierarchy, page pacing, photography, and recurring department design.",
    points: ["Three focused spread galleries", "Twelve unused facing-page selections", "No spread repeats from the featured NCBJ gallery"],
    thumb: "thumb-ncbj-archive",
    issueKey: "archive-ncbj-editorial-spreads",
    openLabel: "View the NCBJ Editorial Archive"
  },
  {
    title: "Portfolio Website",
    type: "Digital Product / Living Case Study",
    desc: "A self-initiated, publication-inspired portfolio I art-directed and structured as a lightweight static site, using AI-assisted front-end development to turn a large body of print and digital work into a responsive, accessible, performance-conscious experience.",
    points: ["Publication-inspired content and interaction system", "AI-assisted HTML, CSS, and JavaScript under my direction", "WebP standards, accessibility review, and ongoing quality assurance"],
    thumb: "thumb-portfolio-website",
    stackedPreview: true,
    issueKey: "archive-portfolio-website",
    openLabel: "View the Website Case Study"
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

function initNav() {
  const setMenuState = (open) => {
    els.nav?.classList.toggle("is-open", open);
    els.navToggle?.setAttribute("aria-expanded", String(open));
    els.navToggle?.setAttribute("aria-label", open ? "Close issue contents menu" : "Open issue contents menu");
    if (els.navToggle) els.navToggle.textContent = open ? "Close" : "Menu";
  };

  const closeMenu = () => setMenuState(false);

  els.navToggle?.addEventListener("click", () => {
    const open = !els.nav.classList.contains("is-open");
    setMenuState(open);
  });

  els.navLinks.forEach(link => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && els.nav?.classList.contains("is-open")) {
      closeMenu();
      els.navToggle?.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!els.nav?.classList.contains("is-open")) return;
    if (els.nav.contains(event.target) || els.navToggle?.contains(event.target)) return;
    closeMenu();
  });

  matchMedia("(min-width: 641px)").addEventListener?.("change", (event) => {
    if (event.matches) closeMenu();
  });
}

function updateScrollState() {
  const y = scrollY;
  const doc = document.documentElement.scrollHeight - innerHeight;

  if (els.progress) els.progress.style.width = `${doc ? (y / doc) * 100 : 0}%`;


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
  const ghostWave = y * .0065;
  const ghostDrift = progress * -18;
  const ghostValues = [
    ["cyan", 0, 7, 9],
    ["magenta", 1.45, 9, 7],
    ["yellow", 2.9, 8, 10],
    ["key", 4.2, 6, 6]
  ];

  ghostValues.forEach(([name, phase, xRange, yRange]) => {
    const x = Math.cos(ghostWave + phase) * xRange;
    const waveY = Math.sin(ghostWave + phase) * yRange + ghostDrift;
    document.documentElement.style.setProperty(`--ghost-${name}-x`, `${x.toFixed(2)}px`);
    document.documentElement.style.setProperty(`--ghost-${name}-y`, `${waveY.toFixed(2)}px`);
  });
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

function initArchive() {
  $$(".archive-item").forEach((button, index) => {
    button.addEventListener("click", () => renderArchive(index));
    button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
  });

  $(".archive-prev")?.addEventListener("click", () => renderArchive(state.archiveIndex - 1));
  $(".archive-next")?.addEventListener("click", () => renderArchive(state.archiveIndex + 1));

  $(".archive-open")?.addEventListener("click", event => {
    state.lastDialogTrigger = event.currentTarget;
  });
  renderArchive(0);
}

function renderArchive(index) {
  state.archiveIndex = (index + archiveProjects.length) % archiveProjects.length;
  const project = archiveProjects[state.archiveIndex];
  const usesSplitSpread = project.thumb === "thumb-ncpn-archive" || project.thumb === "thumb-ncbj-archive";
  const usesStackedImages = Boolean(project.stackedPreview);

  $$(".archive-item").forEach((button, i) => {
    const active = i === state.archiveIndex;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });

  const image = $(".archive-preview-image");
  if (image) {
    image.className = `archive-preview-image archive-preview-art ${project.thumb}`;
    image.dataset.archiveIssue = project.issueKey;
    image.setAttribute("aria-label", `Open ${project.title}`);
  }

  const preview = $(".archive-preview");
  preview?.classList.toggle("is-stacked-pages", usesSplitSpread);
  preview?.classList.toggle("is-stacked-images", usesStackedImages);

  const openButton = $(".archive-open");
  if (openButton) {
    openButton.dataset.archiveIssue = project.issueKey;
    openButton.textContent = project.openLabel || "Open";
  }

  $(".archive-preview-type").textContent = project.type;
  $(".archive-preview-title").textContent = project.title;
  $(".archive-preview-description").textContent = project.desc;
  $(".archive-preview-points").innerHTML = project.points.map(point => `<li>${point}</li>`).join("");

}

init();

document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  link.setAttribute("rel", "noopener noreferrer");
});

(function () {
  const button = document.querySelector(".copy-email-button");
  const status = document.querySelector(".copy-email-status");
  if (!button) return;

  const originalLabel = button.textContent;
  let resetTimer = null;

  function fallbackCopy(value) {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  }

  button.addEventListener("click", async () => {
    const email = button.dataset.copyEmail || "";
    let copied = false;

    try {
      if (navigator.clipboard?.writeText) {
        copied = await Promise.race([
          navigator.clipboard.writeText(email).then(() => true, () => false),
          new Promise((resolve) => window.setTimeout(() => resolve(false), TIMING.clipboardWriteTimeout))
        ]);
      }
      if (!copied) copied = fallbackCopy(email);
    } catch (_error) {
      copied = fallbackCopy(email);
    }

    button.textContent = copied ? "Copied" : "Select email above";
    if (status) status.textContent = copied ? "Email address copied to clipboard." : "Copy was unavailable. Select the email address to copy it.";
    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      button.textContent = originalLabel;
      if (status) status.textContent = "";
    }, TIMING.copyStatusReset);
  });
})();

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

    /* The cyan production rule changes direction with the active chapter.
       This gives each section a distinct editorial movement while keeping
       the rule subtle enough to remain background structure. */
    const chapterId = link?.getAttribute("href")?.replace(/^#/, "");
    if (chapterId) document.body.dataset.activeChapter = chapterId;
  }

  links.forEach((link) => {
    link.addEventListener("click", () => activate(link));
  });

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

(function () {
  const serviceCards = [...document.querySelectorAll(".service-card")];
  const mobileServices = window.matchMedia("(max-width: 640px)");

  function syncServiceCardSemantics() {
    serviceCards.forEach((card) => {
      if (mobileServices.matches) {
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute("aria-expanded", card.classList.contains("is-mobile-open") ? "true" : "false");
      } else {
        card.classList.remove("is-mobile-open");
        card.removeAttribute("tabindex");
        card.removeAttribute("role");
        card.removeAttribute("aria-expanded");
      }
    });
  }

  serviceCards.forEach((card) => {
    function toggleMobileCard() {
      if (!mobileServices.matches) return;
      const open = card.classList.toggle("is-mobile-open");
      card.setAttribute("aria-expanded", open ? "true" : "false");
    }

    card.addEventListener("click", toggleMobileCard);
    card.addEventListener("keydown", (event) => {
      if (mobileServices.matches && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        toggleMobileCard();
      }
    });
  });

  mobileServices.addEventListener?.("change", syncServiceCardSemantics);
  syncServiceCardSemantics();
})();

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

      scheduleAfterEvent(() => {
        archiveItems.forEach((button) => {
          button.setAttribute("aria-expanded", button.classList.contains("is-active") ? "true" : "false");
        });
        placePreviewAfterActive();
      });
    });
  });

  window.addEventListener("resize", placePreviewAfterActive);
  window.addEventListener("load", placePreviewAfterActive);
  placePreviewAfterActive();
})();

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
      scheduleAfterEvent(updateRule);
    });

    step.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        scheduleAfterEvent(updateRule);
      }
    });
  });

  document.addEventListener("DOMContentLoaded", updateRule);
  window.addEventListener("load", updateRule);
  window.addEventListener("resize", updateRule);

  const observer = new MutationObserver(updateRule);
  steps.forEach((step) => observer.observe(step, { attributes: true, attributeFilter: ["class"] }));

  updateRule();
})();

(function () {
  const overlay = document.getElementById("archive-issue-overlay");
  if (!overlay) return;

  const ARCHIVE_ADS = [
    { label: "Toft’s Ice Cream Parlor", categories: ["awards", "retail"], src: "assets/beacon/gallery-beacon-award-tofts.webp", alt: "Award-winning Toft’s Ice Cream Parlor twentieth-anniversary advertisement", caption: "MACPA 2017 · First Place · Single Ads, Large Space" },
    { label: "Slater’s Madison Street Pub", categories: ["awards", "hospitality", "events"], src: "assets/beacon/gallery-beacon-award-slaters.webp", alt: "Award-winning Slater’s Madison Street Pub Halloween advertisement", caption: "MACPA 2017 · Second Place · Restaurant Marketing Campaigns Design" },
    { label: "Oak Harbor Dental", categories: ["awards", "professional"], src: "assets/beacon/gallery-beacon-award-oak-harbor-dental.webp", alt: "Award-winning Oak Harbor Dental new-patient advertisement", caption: "MACPA 2016 · Second Place · Single Ads, Small Space" },
    { label: "1812 Food & Spirits", categories: ["hospitality"], src: "assets/archive/campaign-work/1812-food-spirits.webp", alt: "1812 Food and Spirits restaurant advertisement" },
    { label: "Crow’s Nest Seafood", categories: ["hospitality"], src: "assets/archive/campaign-work/crows-nest-seafood.webp", alt: "Crow’s Nest Restaurant seafood promotion" },
    { label: "Frosty Bar Anniversary", categories: ["hospitality"], src: "assets/archive/campaign-work/frosty-bar-anniversary.webp", alt: "Frosty Bar sixty-fifth anniversary advertisement" },
    { label: "Harbor Mattress Grand Opening", categories: ["retail"], src: "assets/archive/campaign-work/harbor-mattress-grand-opening.webp", alt: "Harbor Mattress grand-opening retail advertisement with a sailboat illustration", caption: "Retail Grand Opening · Strong promotional hierarchy and custom illustrated direction" },
    { label: "Tin Goose Memorial Day", categories: ["hospitality", "events"], src: "assets/archive/campaign-work/tin-goose-memorial-day.webp", alt: "Tin Goose Diner Memorial Day advertisement" },
    { label: "dB Beauté Anniversary", categories: ["retail", "professional"], src: "assets/archive/campaign-work/db-beaute-anniversary.webp", alt: "dB Beauté salon anniversary advertisement" },
    { label: "Fitzgerald Automotive", categories: ["automotive"], src: "assets/archive/campaign-work/fitzgerald-automotive.webp", alt: "Fitzgerald Automotive multi-vehicle advertisement" },
    { label: "Harbor Side Open House", categories: ["automotive", "events"], src: "assets/archive/campaign-work/harbor-side-open-house.webp", alt: "Harbor Side Boat Sales open-house advertisement" },
    { label: "House of Jerks", categories: ["retail", "hospitality"], src: "assets/archive/campaign-work/house-of-jerks.webp", alt: "House of Jerks opening advertisement" },
    { label: "Catawba Island Garden Club", categories: ["events", "professional"], src: "assets/archive/campaign-work/catawba-garden-club.webp", alt: "Catawba Island Garden Club plant-sale advertisement" },
    { label: "Acoustic for Autism", categories: ["events", "professional"], src: "assets/archive/campaign-work/acoustic-for-autism.webp", alt: "Acoustic for Autism event advertisement" },
    { label: "Erie-Ottawa Airport", categories: ["events", "professional", "recruitment"], src: "assets/archive/campaign-work/erie-ottawa-airport.webp", alt: "Erie-Ottawa International Airport adult pilot camp advertisement" },
    { label: "Joseph Wise Fine Clocks", categories: ["retail"], src: "assets/archive/campaign-work/joseph-wise-clocks.webp", alt: "Joseph Wise Fine Clocks advertisement" },
    { label: "Soul to Sole", categories: ["professional", "events"], src: "assets/archive/campaign-work/soul-to-sole.webp", alt: "Soul to Sole massage therapy open-house advertisement" },
    { label: "Beer Thirty's St. Patrick's Party", categories: ["hospitality", "events"], src: "assets/archive/campaign-work/beer-thirty-st-patricks.webp", alt: "Beer Thirty's St. Patrick's Day party advertisement" },
    { label: "Fremont Toy Show", categories: ["events"], src: "assets/archive/campaign-work/fremont-toy-show.webp", alt: "Fremont Toy Show event advertisement" },
    { label: "North Coast Parent Market", categories: ["professional"], src: "assets/archive/campaign-work/north-coast-parent-market.webp", alt: "North Coast Parent audience and advertising house advertisement" },
    { label: "Pets on Parade", categories: ["professional"], src: "assets/archive/campaign-work/pets-on-parade.webp", alt: "Pets on Parade humane society adoption advertisement" },
    { label: "Jet Express Spring Campaign", categories: ["hospitality", "events"], src: "assets/archive/campaign-work/jet-express-spring.webp", alt: "Jet Express spring island travel and Mother's Day campaign advertisement" },
    { label: "Indian Head Camp Recruitment", categories: ["recruitment"], src: "assets/archive/campaign-work/indian-head-camp-recruitment.webp", alt: "Indian Head Camp staff recruitment poster combining documentary photography with a clear application call to action", caption: "Freelance Fiverr Project · Recruitment advertising for Indian Head Camp" },
    { label: "McCarthy's St. Paddy's Day", categories: ["hospitality", "events"], src: "assets/archive/campaign-work/mccarthys-st-paddys-day.webp", alt: "McCarthy's St. Paddy's Day entertainment advertisement" },
    { label: "Alyson Woods · Avant Garde Neverland", categories: ["events"], src: "assets/archive/campaign-work/alyson-woods-avant-garde-neverland.webp", alt: "Atmospheric moonlit event advertisement for Alyson Woods and Avant Garde Neverland benefiting Nashville Cares", caption: "Freelance Fiverr Project · Event advertising for Alyson Woods / Avant Garde Neverland" }
  ];

  function archiveAdGallery(order = ARCHIVE_ADS.map((_, index) => index)) {
    return order.map((index) => ARCHIVE_ADS[index]);
  }

  function paradeOfHomesGallery() {
    return [
      { label: "Parade of Homes Cover", src: "assets/archive/parade-of-homes-cover.webp", alt: "Catawba and Marblehead Parade of Homes publication cover" },
      { label: "Parade Route Map", src: "assets/archive/parade-of-homes-map.webp", alt: "Parade of Homes route map and property index" },
      { label: "Homes One and Two", src: "assets/archive/parade-of-homes-main-1.webp", alt: "Parade of Homes page presenting the first two properties" },
      { label: "Homes Three and Four", src: "assets/archive/parade-of-homes-main-2.webp", alt: "Parade of Homes page presenting the third and fourth properties" },
      { label: "Editorial and Advertising", src: "assets/archive/parade-of-homes-editorial.webp", alt: "Parade of Homes editorial page with integrated real estate advertising" }
    ];
  }

  function bestOfBestGallery() {
    return [
      { label: "Reusable Color Seal", src: "assets/archive/best-of-best/best-of-best-seal-color.webp", alt: "Best of the Best lighthouse and laurel color seal" },
      { label: "Reader Program Introduction", layout: "spread", src: "assets/archive/best-of-best/best-of-best-pages-02-03.webp", alt: "Best of the Best introduction and winning-business spread" },
      { label: "Winners and Community (12.3 MB)", layout: "spread", src: "assets/archive/best-of-best/best-of-best-pages-04-05.webp", alt: "Best of the Best winners and community photography spread" },
      { label: "Category Directory (4.2 MB)", layout: "spread", src: "assets/archive/best-of-best/best-of-best-pages-08-09.webp", alt: "Best of the Best category directory and advertiser spread" },
      { label: "Published Beacon Web Edition", thumb: "assets/beacon/gallery-beacon-front-page-archive-15.webp", href: "assets/beacon/gallery-beacon-full.pdf", alt: "Open the complete September 22, 2016 Beacon edition featuring Best of the Best coverage", linkLabel: "Open the complete September 22, 2016 Beacon web edition" },
      { label: "Complete Best of the Best Publication", thumb: "assets/archive/best-of-best/best-of-best-pages-04-05.webp", href: "assets/archive/best-of-best/best-of-best-2015-full.pdf", alt: "Open the complete color Best of the Best annual publication", linkLabel: "Open the complete Best of the Best publication" }
    ];
  }

  function homesGallery() {
    return [
      { label: "August 2015 Cover", src: "assets/archive/homes/homes-cover-2015-08.webp", alt: "HOMES August 2015 real-estate publication cover" },
      { label: "January–February 2016 Cover", src: "assets/archive/homes/homes-cover-2016-01.webp", alt: "HOMES January and February 2016 real-estate publication cover" },
      { label: "April 2016 Cover", src: "assets/archive/homes/homes-cover-2016-04.webp", alt: "HOMES April 2016 real-estate publication cover" },
      { label: "July 2016 Cover", src: "assets/archive/homes/homes-cover-2016-07.webp", alt: "HOMES July 2016 real-estate publication cover" },
      { label: "October 2016 Cover", src: "assets/archive/homes/homes-cover-2016-10.webp", alt: "HOMES October 2016 real-estate publication cover" },
      { label: "November–December 2016 Cover", src: "assets/archive/homes/homes-cover-2016-11.webp", alt: "HOMES November and December 2016 real-estate publication cover" },
      { label: "Jack Bradley Realty Listing System", src: "assets/archive/homes/homes-listings-jack-bradley-2015-10.webp", alt: "Jack Bradley Realty page organizing sixteen property listings and agent information" },
      { label: "Russell Real Estate Listing System", src: "assets/archive/homes/homes-listings-russell-2016-10.webp", alt: "Russell Real Estate Services page organizing residential, waterfront, and commercial listings" }
    ];
  }

  function beaconFrontPageGallery() {
    return [
      { label: "First Shot Ceremony at Camp Perry", src: "assets/beacon/gallery-beacon-front-page-1.webp", alt: "The Beacon July 14, 2016 front page featuring the First Shot Ceremony at Camp Perry", caption: "First Shot Ceremony at Camp Perry · Event photography, a restrained masthead, and layered community reporting create a confident civic-news front page" },
      { label: "No Ice, Ice Baby?", src: "assets/beacon/gallery-beacon-front-page-archive-01.webp", alt: "The Beacon January 19, 2017 winter weather and addiction coverage front page", caption: "No Ice, Ice Baby? · A playful seasonal headline contrasts with disciplined public-interest reporting" },
      { label: "Community Matriarch", src: "assets/beacon/gallery-beacon-front-page-archive-02.webp", alt: "The Beacon February 16, 2017 memorial front page", caption: "Mourning a Community Matriarch · Sensitive portraiture and restrained typography support a respectful lead story" },
      { label: "Waterworks Planning", src: "assets/beacon/gallery-beacon-front-page-archive-03.webp", alt: "The Beacon March 23, 2017 Waterworks planning front page", caption: "Waterworks Planning · Aerial mapping turns a complex infrastructure story into an immediate visual lead" },
      { label: "Making the Lighthouse Famous", src: "assets/beacon/gallery-beacon-front-page-archive-04.webp", alt: "The Beacon April 20, 2017 Port Clinton Lighthouse front page", caption: "Making the Lighthouse Famous · A sunset silhouette gives a local landmark story cinematic scale" },
      { label: "Lake Erie Environmental Action", src: "assets/beacon/gallery-beacon-front-page-archive-05.webp", alt: "The Beacon April 27, 2017 Lake Erie environmental action front page", caption: "Lake Erie Environmental Action · Documentary water imagery establishes urgency around regional environmental reporting" },
      { label: "The History of Erie Gardens", src: "assets/beacon/gallery-beacon-front-page-6.webp", alt: "The Beacon February 23, 2017 anniversary front page featuring the history of Erie Gardens", caption: "The History of Erie Gardens · Archival photographs, a celebratory masthead, and a full-width historical feature create a distinctive anniversary front page" },
      { label: "Wings and Warbirds", src: "assets/beacon/gallery-beacon-front-page-archive-11.webp", alt: "The Beacon August 25, 2016 Wings and Warbirds front page", caption: "Wings and Warbirds · Airfield photography, event promotion, and community reporting build an energetic late-summer cover" },
      { label: "September 11 Remembrance", src: "assets/beacon/gallery-beacon-front-page-archive-13.webp", alt: "The Beacon September 8, 2016 September 11 remembrance front page", caption: "September 11 Remembrance · A full-width flag photograph creates a solemn, unmistakable visual statement" },
      { label: "Local Art and September 11 Remembrance", src: "assets/beacon/gallery-beacon-front-page-archive-14.webp", alt: "The Beacon September 15, 2016 front page featuring a yellow warbler mural and September 11 remembrance coverage", caption: "Local Art and September 11 Remembrance · A bright mural portrait and solemn documentary photography create a powerful contrast across the front page" },
      { label: "Best of the Best", src: "assets/beacon/gallery-beacon-front-page-archive-15.webp", alt: "The Beacon September 22, 2016 Best of the Best front page", caption: "Best of the Best · Oversized vertical typography transforms a recurring reader feature into a confident special issue" },
      { label: "Autumn on the Lake", src: "assets/beacon/gallery-beacon-front-page-archive-16.webp", alt: "The Beacon October 6, 2016 Autumn on the Lake front page", caption: "Autumn on the Lake · Seasonal color, selected graphics, and practical information give the issue a distinct editorial mood" },
      { label: "Candidates' Night", src: "assets/beacon/gallery-beacon-front-page-archive-17.webp", alt: "The Beacon October 20, 2016 Candidates' Night and community honors front page", caption: "Candidates' Night · Election information, community honors, and seasonal imagery remain readable within a dense news package" },
      { label: "General Election Results", src: "assets/beacon/gallery-beacon-front-page-archive-18.webp", alt: "The Beacon November 17, 2016 general election results front page", caption: "General Election Results · A high-contrast results panel makes complex civic information immediately scannable" },
      { label: "CASA Child Advocacy", src: "assets/beacon/gallery-beacon-front-page-archive-19.webp", alt: "The Beacon November 24, 2016 CASA child advocacy front page", caption: "CASA Child Advocacy · Documentary event photography gives a serious public-service story a human center" },
      { label: "Stars Dance for CASA", src: "assets/beacon/gallery-beacon-front-page-archive-20.webp", alt: "The Beacon November 26, 2015 Stars Dance for CASA front page", caption: "Stars Dance for CASA · Performance photography creates movement while supporting the organization’s message" },
      { label: "Community Christmas", src: "assets/beacon/gallery-beacon-front-page-archive-21.webp", alt: "The Beacon December 1, 2016 community Christmas front page", caption: "Community Christmas · Night photography and multiple local celebrations establish a warm seasonal atmosphere" },
      { label: "Christmas Choir and Santa", src: "assets/beacon/gallery-beacon-front-page-archive-22.webp", alt: "The Beacon December 10, 2015 Christmas choir and Santa front page", caption: "Christmas Choir and Santa · A dominant holiday photograph leads a lively package of community traditions" },
      { label: "Shop Local Campaign", src: "assets/beacon/gallery-beacon-front-page-archive-23.webp", alt: "The Beacon December 22, 2016 shop local campaign front page", caption: "Shop Local Campaign · Community photography and a focused call to action turn seasonal coverage into useful civic promotion" },
      { label: "Ohio Primary Election Results", src: "assets/beacon/gallery-beacon-front-page-archive-25.webp", alt: "The Beacon March 17, 2016 Ohio primary election results front page with a large ballot-results graphic", caption: "Ohio Primary Election Results · A high-contrast results panel turns a complex ballot question into an immediate, scannable visual lead" },
      { label: "Operation Honor and Pride 5K", src: "assets/beacon/gallery-beacon-front-page-archive-26.webp", alt: "The Beacon May 19, 2016 front page featuring an Operation Honor and Pride 5K participant and community honors", caption: "Operation Honor and Pride 5K · An environmental portrait, event reporting, and supporting community honors form a clear civic-news hierarchy" },
      { label: "Art Celebration", src: "assets/beacon/gallery-beacon-front-page-archive-27.webp", alt: "The Beacon June 9, 2016 art-celebration front page featuring regional paintings and community events", caption: "Art Celebration · Selected regional artwork and strong scale shifts connect culture, events, and community reporting across the page" },
      { label: "Firelight Glow Run and Perch Festival", src: "assets/beacon/gallery-beacon-front-page-archive-28.webp", alt: "The Beacon September 1, 2016 front page featuring a Firelight Glow Run and the Marblehead Perch Festival", caption: "Firelight Glow Run and Perch Festival · A luminous detail photograph, bold section breaks, and community-event imagery build an energetic late-summer package" }
    ];
  }

  const ARCHIVE_ISSUES = {

    "atj-identity-system": {
      kicker: "Feature Story / Personal Identity + Editorial Systems",
      title: "Building the ATJ Identity",
      subtitle: "Logo development · typography · negative space · responsive identity system · 2026",
      noteTitle: "Designing a Personal Mark Without Reducing a Career to a Cliché",
      paragraphs: [
        "The identity began with a practical need: the portfolio, résumé, downloadable resources, and future editorial projects needed a consistent visual signature. The harder question was what that signature should communicate. My work spans publication design, content strategy, websites, branding, photography, production, and project leadership. A literal symbol for any one discipline would describe only part of the practice.",
        "I began with the initials ATJ and built the first direction manually with the Pen tool. That process exposed the central formal challenge: the A and T could be resolved through straight geometric construction, while the J required a curve that felt equally deliberate. Redrawing the mark as vector geometry made every imbalance visible and turned the project into an exercise in proportion, optical alignment, and restraint.",
        "The exploration deliberately moved beyond one favored solution. I tested a custom geometric mark, a version tied more closely to Avenir—the sans serif already used across the résumé and website—and multiple approaches to the magenta brand accent. I also explored CMYK references, quotation marks, editorial ribbons, and supporting-name treatments. Several ideas communicated creativity or print production, but they narrowed the identity or competed with the monogram instead of strengthening it.",
        "The most useful discovery was that the identity did not need one overloaded logo. It needed a responsive system. The standalone ATJ monogram could serve compact and high-recognition applications, while a larger signature lockup could introduce the full name when space allowed. Magenta remained valuable as a broader brand accent for interactions, labels, rules, and publication devices rather than a requirement inside every version of the logo.",
        "The final direction relies on bold black geometry, recognizable initials, and carefully managed negative space. The result feels less like a trendy designer emblem and more like an editorial or publishing imprint—an appropriate connection to a career built around organizing information and helping audiences understand it.",
        "The system is now being applied to the portfolio website, browser icon, résumé, presentation and PDF covers, downloadable templates, and future issues of the portfolio's editorial resource series. Real-world use becomes the next stage of testing: the mark will continue to be evaluated at small sizes, on dark backgrounds, in print, and across responsive layouts."
      ],
      sidebarTitle: "Identity Notes",
      details: [
        ["Role", "Designer, strategist, and subject"],
        ["Challenge", "Create a personal identity broad enough for editorial communication, content strategy, websites, publications, branding, and production"],
        ["Approach", "Iterative vector construction, typographic comparison, optical spacing, negative-space studies, and real-size testing"],
        ["Primary mark", "Standalone ATJ monogram for the website header, favicon, social avatar, watermark, and compact applications"],
        ["Signature lockup", "ATJ plus the full-name treatment for covers, presentations, proposals, résumé materials, and larger editorial applications"],
        ["Brand color", "Magenta remains an identity-system accent rather than a required part of the primary black-and-white mark"],
        ["Deliverables", "Optimized SVG masters, transparent PNG exports, favicon assets, usage notes, and website integration"]
      ],
      shows: ["Identity strategy through iteration", "Custom vector construction", "Typography and optical alignment", "Responsive logo-system thinking", "Restraint and concept evaluation"],
      gallery: [
        {
          label: "Final Identity System",
          thumb: "assets/atj-identity/hero-atj-identity.webp",
          src: "assets/atj-identity/atj-signature-lockup.svg?v=8.0.0",
          alt: "ATJ signature lockup for Adam Thomas Janes",
          images: [
            { src: "assets/atj-identity/atj-primary-mark.svg", alt: "Standalone ATJ primary monogram", caption: "Primary mark · A compact, scalable monogram for the website, favicon, avatars, and small applications" },
            { src: "assets/atj-identity/atj-signature-lockup.svg?v=8.0.0", alt: "ATJ signature lockup with Adam Thomas Janes name treatment", caption: "Signature lockup · The expanded identity for covers, presentations, résumé materials, and editorial applications" }
          ]
        },
        { label: "First Vector Direction", src: "assets/atj-identity/01-first-vector-direction.webp", alt: "Early black ATJ vector logo with magenta crossbar", caption: "First vector direction · A custom geometric A, structural T, hand-built J, and magenta crossbar established the initial vocabulary" },
        { label: "Geometric Refinement", src: "assets/atj-identity/02-refined-geometric-direction.webp", alt: "Refined ATJ monogram exploration with a rounded J", caption: "Geometric refinement · The J became more recognizable and the monogram began to read as one mark rather than three separate letters" },
        { label: "Avenir Study", src: "assets/atj-identity/03-avenir-typographic-study.webp", alt: "ATJ logo study based on Avenir letterforms", caption: "Avenir study · Testing the site's existing sans serif improved typographic consistency while revealing what the custom A contributed to distinctiveness" },
        { label: "Color-System Exploration", src: "assets/atj-identity/04-magenta-system-study.webp", alt: "ATJ logo exploration using magenta caps across the letterforms", caption: "Color-system exploration · Extending magenta across every letter made the accent dominate, confirming that color worked better as a supporting brand device" },
        { label: "Final Wordmark", src: "assets/atj-identity/atj-wordmark.svg?v=8.0.0", alt: "Adam Thomas Janes horizontal wordmark", caption: "Final wordmark · A clean horizontal signature for headers, bylines, footers, and narrow spaces" }
      ]
    },


    "editorial-newspaper-template": {
      kicker: "Free Resource / Publication Design + Editorial Systems",
      title: "Editorial Newspaper Template",
      subtitle: "Adobe InDesign template · finished PDF · six-column editorial system · 2026",
      noteTitle: "A Downloadable Publication System Built to Explain Its Own Design",
      paragraphs: [
        "Great publications are built on systems, not isolated pages. This free Adobe InDesign template demonstrates how editorial hierarchy, reusable paragraph styles, modular columns, photography, captions, pull quotes, and production notes work together to create a publication that feels intentional and easy to navigate.",
        "The first page is designed as Issue No. 01 of The Communication Journal. It combines a dominant feature story with recurring departments, an interview, an opinion column, production notes, supporting photography, and a five-principle infographic exploring alignment, proximity, contrast, repetition, and white space.",
        "The second page turns the template into documentation. It presents the actual paragraph-style system beside plain-language explanations of each style's purpose, when it should be used, and why it matters to the reader. The page demonstrates that paragraph styles are not merely shortcuts; they are editorial standards that create consistency and reduce production errors.",
        "The downloadable package includes the editable .INDT template and a finished reference PDF. The source file is intended as a starting point: designers can replace the sample content, adapt the hierarchy, and extend the system while preserving the underlying communication logic.",
        "The project was developed entirely in Adobe InDesign using Avenir for display and structural typography and Georgia for sustained reading. Its six-column architecture reflects years of newspaper and magazine production experience while remaining flexible enough for journals, newsletters, community publications, and creative-industry editorial projects."
      ],
      sidebarTitle: "What's Included",
      details: [
        ["Format", "Editable Adobe InDesign template (.INDT) and finished example PDF"],
        ["Pages", "Two-page baseline: a complete front page and an inside-page editorial style system"],
        ["Grid", "Six-column modular editorial structure"],
        ["Typography", "Avenir for hierarchy and navigation; Georgia for long-form reading"],
        ["Styles", "Feature, section, kicker, deck, byline, body, drop cap, no-indent, bullets, caption, pull quote, fact box, opinion, classified, and specialty styles"],
        ["Purpose", "A reusable resource that demonstrates communication-first publication design rather than supplying decorative placeholders"]
      ],
      shows: ["Editorial hierarchy", "Reusable paragraph styles", "Six-column publication systems", "Production documentation", "Communication-first design"],
      links: [
        { label: "Download InDesign Template · 8.6 MB", href: "assets/resources/editorial-newspaper-template/ATJ-Editorial-Newspaper-Template.indt", note: "Editable Adobe InDesign template with the complete two-page publication system.", download: true },
        { label: "Download Example PDF · 5.3 MB", href: "assets/resources/editorial-newspaper-template/ATJ-Editorial-Newspaper-Template.pdf", note: "Finished reference PDF showing the front page and documented paragraph-style system.", download: true }
      ],
      gallery: [
        {
          label: "Browse the Two-Page Template",
          thumb: "assets/resources/editorial-newspaper-template/feature-two-page-spread.webp",
          alt: "The two-page Communication Journal editorial newspaper template shown side by side",
          images: [
            { src: "assets/resources/editorial-newspaper-template/page-1.webp", alt: "The Communication Journal front page demonstrating a six-column newspaper system, editorial hierarchy, photography, infographic, and recurring departments", caption: "Page one of two · Finished front page" },
            { src: "assets/resources/editorial-newspaper-template/page-2.webp", alt: "Inside page of the Adobe InDesign newspaper template showing paragraph-style specimens and explanations", caption: "Page two of two · Editorial style system" }
          ]
        }
      ]
    },

    "camp-perry-brand-system": {
      kicker: "Feature Story / Brand Identity + Hospitality Communications",
      title: "Camp Perry Lodging & Conference Center",
      subtitle: "Identity · responsive WordPress website · guest experience · March 2018-March 2020",
      noteTitle: "Creating a Hospitality Identity Inside an Active Military Installation",
      paragraphs: [
        "Camp Perry Lodging & Conference Center operates inside an active Ohio National Guard training installation on Lake Erie. It serves military personnel and families, regional tourists, wedding parties, conference groups, RV travelers, and teams attending the nationally recognized rifle and shooting matches.",
        "While working through InGenesis as an account clerk handling reservations and conference-center operations, I saw how a 1990s-era, nonresponsive website and disconnected materials affected guests. The organization had no established logo, color palette, typography system, useful property photography, brochure program, merchandise, or automated customer email system. I proposed a modernization and was given expanded responsibility as the sole designer and communications lead.",
        "I developed multiple logo directions before creating the approved circular identity, pairing a lakeside lodging structure and water with badge-like geometry suited to Camp Perry's military setting. A military-influenced green, approachable Proxima Nova, and professional Garamond Pro formed the visual system. The civilian manager and the Ohio Adjutant General's office gave final approval.",
        "I established the operation's GoDaddy account and handled the website backend, including the domain and hosting setup, HTTPS certificate, WordPress configuration, Divi Builder, backup and SEO plugins, Google Analytics connection, and ongoing maintenance. I rebuilt the approximately 15-page website, organized and expanded management-provided source information into comprehensive copy, applied SEO practices, and photographed and edited the property so guests could understand the lodging and event options before reserving. Stakeholders required fully justified text across the website and printed materials, so I adapted the layouts while working within that constraint.",
        "The guest information system grew directly from front-line operational needs. I redrew the lodging map from an old hand-drawn photocopy, using satellite mapping to improve geographic accuracy, then created versions staff could circle at check-in to identify each guest's lodging. I also measured the conference center on site, calculated the room relationships, and translated those measurements into a scaled InDesign floor plan. Management supplied the raw rates, rules, and policy information; I edited, organized, and designed the final documents.",
        "The website intentionally did not accept online reservations. Management preferred call-in booking to reduce reservation interruptions and errors, while RoomMaster remained the internal reservation system. I designed and coded its responsive confirmation and cancellation email templates in MJML, including alternate design directions and layouts for desktop, tablet, and mobile. The identity also extended across brochures, business cards, guest documents, signage, on-site collateral, clothing, mugs, water bottles, and other merchandise. Camp Perry began selling branded merchandise after the identity was established, carrying the system beyond administrative communication into the guest experience.",
        "Guests frequently commented on the website's ease of use and the operation's increased professionalism. At the end of the assignment, I trained the event director to update the website and print additional materials, then supplied website credentials, logo files in multiple formats, brand files, templates, and maintenance documentation. There was no replacement design role to receive the working files directly. The identity and website remained in use with only minor copy changes."
      ],
      sidebarTitle: "Case Study Notes",
      details: [
        ["Formal role", "Account Clerk through InGenesis; expanded assignment as sole designer and communications lead"],
        ["Team", "Independent designer working with the civilian manager, military officers, and the Ohio Adjutant General's office"],
        ["Scope", "Brand strategy · identity and logo variations · GoDaddy account, domain, hosting, and HTTPS setup · WordPress and Divi development · backup, SEO, and analytics configuration · copy and SEO · professional real-estate photography · maps and floor plans · brochures and business cards · guest documents · RoomMaster confirmation and cancellation emails · merchandise and signage"],
        ["Tools", "GoDaddy · WordPress · Divi Builder · Google Analytics · RoomMaster · MJML · HTML/CSS · Adobe InDesign · Illustrator · Photoshop · Lightroom · on-site measurement · satellite mapping reference"],
        ["Reservation model", "Call-in reservations by management preference; website supported discovery and decision-making while RoomMaster managed reservations and automated customer emails"],
        ["Outcome", "A coherent guest experience spanning discovery, reservation, arrival, navigation, and on-site materials, followed by event-director training and a documented operational handoff"]
      ],
      links: [
        {
          label: "Visit the live Camp Perry website",
          href: "https://cplcc.com/",
          note: "The organization has maintained the identity and website system since my 2020 handoff, with subsequent content updates made by its staff."
        }
      ],
      shows: ["Self-initiated problem solving", "Website administration from hosting through analytics", "Original research and information design", "Identity systems across web and print", "Staff training and documented handoff"],
      /*
        UNIVERSAL FEATURE GALLERY FORMAT

        Every gallery item may open either:
        - one image through `src`; or
        - its own carousel through an `images` array.

        `thumb` controls the card preview. When thumb is omitted, the
        first carousel image becomes the preview automatically.
      */
      gallery: [
        {
  label: "Identity System",
          thumb: "assets/camp-perry/thumbs/thumb-camp-perry-logo.webp",
          src: "assets/camp-perry/gallery-camp-perry-logo.svg",
          alt: "Camp Perry Lodging and Conference Center logo design",
  images: [
    {
      src: "assets/camp-perry/gallery-camp-perry-logo.svg",
          alt: "Camp Perry Lodging and Conference Center logo",
      caption: "Final circular identity · A lakeside lodging structure and water connect the military setting to Camp Perry's Lake Erie location"
    },
    {
      src: "assets/camp-perry/gallery-camp-perry-logo-general.svg",
          alt: "Camp Perry Lodging and Conference Center logo basic",
      caption: "General-use logo variation · The system was designed to remain recognizable across guest materials and merchandise"
    },
    {
      src: "assets/camp-perry/gallery-camp-perry-logo-reverse.svg",
      alt: "Camp Perry Lodging and Conference Center logo reversed",
      caption: "Reversed logo variation · A flexible application for dark backgrounds, signage, apparel, and merchandise"
    }
  ]
},
        {
          label: "Responsive WordPress Website",
          thumb: "assets/camp-perry/thumbs/thumb-camp-perry-website.webp",
          src: "assets/camp-perry/gallery-camp-perry-website-home.webp",
          alt: "Camp Perry Lodging and Conference Center website home page design",
          images: [
            {
              src: "assets/camp-perry/gallery-camp-perry-website-home.webp",
              alt: "Camp Perry Lodging and Conference Center website home page",
              caption: "Website Home Page"
            },
            {
              src: "assets/camp-perry/gallery-camp-perry-website-lodging-rv.webp",
              alt: "Camp Perry Lodging and Conference Center lodging and RV page",
              caption: "Lodging and RV Accommodations"
            },
            {
              src: "assets/camp-perry/gallery-camp-perry-website-conferences.webp",
              alt: "Camp Perry Lodging and Conference Center conference page",
              caption: "Conference Facilities"
            },
            {
              src: "assets/camp-perry/gallery-camp-perry-website-wedding.webp",
              alt: "Camp Perry Lodging and Conference Center wedding page",
              caption: "Wedding Information"
            },
            {
              src: "assets/camp-perry/gallery-camp-perry-website-about.webp",
              alt: "Camp Perry Lodging and Conference Center about page",
              caption: "About Camp Perry"
            },
            {
              src: "assets/camp-perry/gallery-camp-perry-website-faq.webp",
              alt: "Camp Perry Lodging and Conference Center frequently asked questions page",
              caption: "Frequently Asked Questions"
            }
          ]
        },
        {
          label: "Printed Brochure",
          thumb: "assets/camp-perry/thumbs/thumb-camp-perry-brochure.webp",
          src: "assets/camp-perry/gallery-camp-perry-brochure.webp",
          alt: "Camp Perry Lodging and Conference Center brochure design",
          images: [
            {
              src: "assets/camp-perry/gallery-camp-perry-brochure.webp",
              alt: "Camp Perry lodging trifold brochure design for marketing and promotion",
              caption: "Camp Perry lodging trifold brochure design for marketing and promotion"
            },
            {
              src: "assets/camp-perry/gallery-camp-perry-brochure-inside.webp",
              alt: "Camp Perry Lodging and Conference Center brochure inside spread design",
              caption: "Camp Perry Lodging and Conference Center brochure inside spread design"
            },
            {
              src: "assets/camp-perry/gallery-camp-perry-brochure-inside-services.webp",
              alt: "Camp Perry Lodging and Conference Center brochure inside services page design",
              caption: "Camp Perry Lodging and Conference Center brochure inside services page design"
            },]
        },
        {
          label: "Location Photography",
          thumb: "assets/camp-perry/thumbs/thumb-camp-perry-photography.webp",
          src: "assets/camp-perry/gallery-camp-perry-photography-1.webp",
          alt: "Camp Perry Lodging and Conference Center hospitality photography",
          images: [
            {
              src: "assets/camp-perry/gallery-camp-perry-photography-1.webp",
              alt: "Camp Perry lodging interior photographed for hospitality marketing",
              caption: "Location Photography"
            },
            {
              src: "assets/camp-perry/gallery-camp-perry-photography-3.webp",
              alt: "Camp Perry guest accommodation photographed for website and brochure use",
              caption: "Location Photography"
            },
            {
              src: "assets/camp-perry/gallery-camp-perry-photography-4.webp",
              alt: "Camp Perry hospitality space photographed for marketing communications",
              caption: "Location Photography"
            },
            {
              src: "assets/camp-perry/gallery-camp-perry-photography-6.webp",
              alt: "Camp Perry lodging and conference center marketing photograph",
              caption: "Location Photography"
            },
            {
              src: "assets/camp-perry/gallery-camp-perry-photography-7.webp",
              alt: "Camp Perry lodging interior photograph for hospitality marketing",
              caption: "Location Photography"
            },
            {
              src: "assets/camp-perry/gallery-camp-perry-photography-9.webp",
              alt: "Camp Perry hospitality property photograph for marketing communications",
              caption: "Location Photography"
            }
          ]
        },
        {
          label: "RoomMaster Reservation Emails",
          thumb: "assets/camp-perry/thumbs/thumb-camp-perry-email.webp",
          src: "assets/camp-perry/gallery-camp-perry-email-desktop.webp",
          alt: "Responsive Camp Perry RoomMaster reservation email templates coded in MJML",
          images: [
            {
              src: "assets/camp-perry/gallery-camp-perry-email-desktop.webp",
              alt: "Camp Perry RoomMaster reservation email displayed on desktop",
              caption: "RoomMaster Confirmation and Cancellation Email · MJML Desktop Layout"
            },
            {
              src: "assets/camp-perry/gallery-camp-perry-email-tablet.webp",
              alt: "Camp Perry RoomMaster reservation email displayed on tablet",
              caption: "RoomMaster Confirmation and Cancellation Email · MJML Tablet Layout"
            },
            {
              src: "assets/camp-perry/gallery-camp-perry-email-mobile.webp",
              alt: "Camp Perry RoomMaster reservation email displayed on mobile",
              caption: "RoomMaster Confirmation and Cancellation Email · MJML Mobile Layout"
            },
            {
              src: "assets/camp-perry/gallery-camp-perry-email-desktop-blue.webp",
              alt: "Alternate Camp Perry RoomMaster reservation email design displayed on desktop",
              caption: "RoomMaster Email · Alternate MJML Design Direction"
            }
          ]
        },
        {
          label: "Guest Information System",
          thumb: "assets/camp-perry/thumbs/thumb-camp-perry-collateral.webp",
          src: "assets/camp-perry/gallery-camp-perry-collateral-rates.webp",
          alt: "Camp Perry Lodging and Conference Center marketing collateral",
          images: [
            {
              src: "assets/camp-perry/gallery-camp-perry-collateral-rates.webp",
              alt: "Camp Perry military and civilian lodging rate document organized for guest use",
              caption: "Seasonal Lodging Rates · Management supplied the operational information; I edited, organized, and designed the final document system"
            },
            {
              src: "assets/camp-perry/gallery-camp-perry-collateral-floorplan.webp",
              alt: "Camp Perry conference center floor plan recreated from on-site measurements",
              caption: "Conference Center Floor Plan · Measured on site and translated into a scaled InDesign drawing for staff and event customers"
            },
            {
              src: "assets/camp-perry/gallery-camp-perry-collateral-map.webp",
              alt: "Camp Perry lodging map redrawn from a hand-drawn photocopy with satellite mapping used for accuracy",
              caption: "Guest Lodging Map · Rebuilt from an old hand-drawn photocopy and refined with satellite reference; staff circled each guest's lodging at check-in"
            },
            {
              src: "assets/camp-perry/gallery-camp-perry-guest-mtq.webp",
              alt: "Camp Perry Military Transient Quarters map showing first-floor and second-floor rooms and shared facilities",
              caption: "Military Transient Quarters Map · Room-by-room first- and second-floor wayfinding prepared for lodging staff and guests"
            },
            {
              src: "assets/camp-perry/gallery-camp-perry-collateral-rules.webp",
              alt: "Camp Perry guest rules document with the final identity and organized information hierarchy",
              caption: "Guest Rules · Operational content reorganized into a consistent, readable branded document"
            },
            {
              src: "assets/camp-perry/gallery-camp-perry-guest-rules-spring-summer-2.webp",
              alt: "Camp Perry welcome and guest feedback information paired with a required state-facility weapons notice",
              caption: "Spring/Summer Guest Rules and Service Survey · Page 2 of 2 · Welcome message, feedback instructions, and required state-facility notice"
            },
            {
              src: "assets/camp-perry/gallery-camp-perry-collateral-signin.webp",
              alt: "Camp Perry guest sign-in collateral",
              caption: "Guest Sign-In"
            },
            {
              src: "assets/camp-perry/gallery-camp-perry-collateral-business-card.webp",
              alt: "General Camp Perry Lodging and Conference Center business card applying the identity at small scale",
              caption: "General Business Card · The identity remains clear at a practical small format without displaying an employee's personal information"
            }
          ]
        }
      ]
    },
    "north-coast-business-journal": {
      kicker: "Feature Story / Identity Redesign + Publication Production",
      title: "North Coast Business Journal",
      subtitle: "Identity redesign · editorial system · 32-page monthly production · June 2014-June 2017",
      noteTitle: "Modernizing the Public Face Without Disrupting the Publication",
      paragraphs: [
        "North Coast Business Journal was a 32-page monthly publication serving business readers across Erie, Huron, Ottawa, Sandusky, and Seneca counties. Each issue combined regional reporting, leadership profiles, chamber calendars, professional columns, community development coverage, and advertiser-supported pages within a compact newsprint format.",
        "I joined an established production operation led by Mark Schaffner that had also relied on rotating, short-term graphic designers. As responsibilities consolidated, I became the only person assembling the complete journal in InDesign. Editor Jeffrey H. Bryden supplied and edited the editorial content and approved the finished pages. Photographs were supplied to me; my responsibility was preparing, cropping, correcting, and integrating them into the publication rather than producing the photography.",
        "I created the master pages, paragraph styles, character styles, recurring department treatments, running heads, and page structures that made monthly production repeatable. NCBJ also used the company-wide workflow I helped establish across The Beacon, North Coast Parent, and HOMES: standardized email ad requests, universal file-naming conventions, reusable templates, GREP-assisted repetitive formatting, and organized advertising and production files. I also designed journal advertisements from client and sales direction, applying contrast, repetition, alignment, and proximity to balance the intended marketing message with editorial hierarchy and page pacing.",
        "Management wanted a fresher identity that could help the publication reach a wider audience. I designed the new teal logo in InDesign and adapted it into the publication masthead, replacing the inherited compass-era identity with a restrained system intended to feel professional, credible, and trustworthy rather than flashy. Jeffrey provided editorial approval for the redesign.",
        "The redesign launched in March 2017. Bree and Facit became the typography system across NCBJ-related print work, including the covers, interior styles, promotional materials, and publication applications. The new cover placed greater emphasis on a dominant supplied portrait and a recurring business-leadership feature while preserving familiar interior departments and navigation for established readers.",
        "Every month I integrated editorial stories, chamber information, supplied photography, client-directed advertising, and recurring departments into a complete 32-page issue. I converted supplied images to CMYK, checked resolution and total ink coverage, avoided unnecessary four-plate color builds, preflighted the pages, forced CMYK conversion during PDF export, and delivered the press-ready files through FileZilla and FTP. Each completed issue was then archived for digital access.",
        "Readers noticed the new design and management was enthusiastic about the result. When I left in June 2017, I handed off the InDesign templates, master pages, paragraph and character styles, Creative Cloud libraries, advertising files, production documents, and working publication archive needed for continued production. The teal identity remained in use after my departure."
      ],
      sidebarTitle: "Case Study Notes",
      details: [
        ["Role", "Production Graphic Designer; joined Mark Schaffner and an operation using rotating short-term designers, then became the sole InDesign assembler for the complete monthly journal"],
        ["Editor", "Jeffrey H. Bryden supplied and edited content, directed editorial priorities, and approved the finished work"],
        ["Scope", "Logo and masthead redesign · master pages · paragraph and character styles · cover system · editorial layout · supplied-image preparation · advertising design and placement · standardized ad intake and naming · preflight · FTP delivery · issue archiving"],
        ["Typography", "Bree and Facit across NCBJ covers, interior styles, and related print materials"],
        ["Production", "One 32-page issue each month; CMYK image preparation · ink-coverage control · press-ready PDF export · FileZilla/FTP delivery · digital archiving"],
        ["Tools", "Adobe InDesign · Photoshop · Illustrator · Bridge · Acrobat · Microsoft Office · FileZilla · GREP styles · Creative Cloud Libraries"],
        ["Handoff", "Reusable templates, master pages, paragraph and character styles, Creative Cloud libraries, advertising files, production documents, and working publication archive; teal identity retained after departure"]
      ],
      shows: ["Logo and masthead redesign with editorial continuity", "Company-wide intake, naming, and file systems", "Repeatable InDesign and GREP workflows", "Independent 32-page production", "Advertising design, CMYK prepress, FTP delivery, and archiving"],
      gallery: [
        {
          label: "Cover Identity & Evolution",
          thumb: "assets/north-coast-business-journal/thumbs/thumb-north-coast-business-journal-cover.webp",
          src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-cover-6.webp",
          alt: "North Coast Business Journal covers showing the publication identity from 2016 through the 2017 redesign",
          images: [
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-cover-6.webp", alt: "September 2016 North Coast Business Journal cover using the inherited compass-era identity", caption: "September 2016 · Before the redesign · I produced the cover within the inherited compass identity and dense front-page structure" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-cover-2.webp", alt: "February 2017 North Coast Business Journal cover using the inherited identity before the redesign", caption: "February 2017 · Final month of the inherited cover system before the new identity launched" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-cover-3.webp", alt: "March 2017 North Coast Business Journal redesigned teal cover featuring Judy Miller", caption: "March 2017 · Redesign launch · New teal masthead, Bree and Facit typography, dominant supplied portrait, and Women in Business focus" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-cover-4.webp", alt: "April 2017 North Coast Business Journal teal cover featuring Thomas Kern", caption: "April 2017 · The new system continues with a Business and Community Leader portrait cover" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-cover-5.webp", alt: "May 2017 North Coast Business Journal cover featuring two regional business leaders", caption: "May 2017 · The flexible teal cover system accommodates two regional leaders and multiple community entry points" }
          ]
        },
        {
          label: "Leadership & Business Profiles",
          thumb: "assets/north-coast-business-journal/thumbs/thumb-north-coast-business-journal-feature.webp",
          src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-feature-1.webp",
          alt: "North Coast Business Journal leadership profiles and regional business feature spreads",
          images: [
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-feature-1.webp", alt: "March 2017 two-page spread with an estate column and Judy Miller Women in Business profile", caption: "March 2017 · Pages 12–13 · Estate guidance facing a Women in Business profile" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-feature-2.webp", alt: "April 2017 two-page spread featuring business and community leader Thomas Kern", caption: "April 2017 · Pages 12–13 · Leadership profile within the complete facing-page context" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-feature-3.webp", alt: "May 2017 two-page spread featuring regional business leaders Glen Ginesi and Justo Delgado", caption: "May 2017 · Pages 12–13 · Two regional leaders across a modular business spread" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-feature-4.webp", alt: "January 2017 two-page spread combining legal guidance and local company reporting", caption: "January 2017 · Pages 12–13 · Legal guidance facing local-business reporting" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-feature-5.webp", alt: "November 2015 two-page workforce and development spread using a selected robot graphic", caption: "November 2015 · Pages 12–13 · Workforce feature and supporting education content" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-leadership-hayes-2016.webp", alt: "April 2016 two-page spread with a Hayes Presidential Library feature and business reporting", caption: "April 2016 · Pages 10–11 · Portrait, architecture, and three-column reporting" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-editorial-on-the-move-2014.webp", alt: "December 2014 North Coast Business Journal spread with executive appointments and a business marketplace page", caption: "December 2014 · Pages 30–31 · Executive portraits, appointment briefs, and marketplace advertising within the closing spread" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-feature-on-the-move-2015.webp", alt: "February 2015 North Coast Business Journal spread with On the Move leadership appointments and business marketplace advertising", caption: "February 2015 · Pages 30–31 · Oversized appointment headlines, leadership portraits, and a structured marketplace page" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-feature-on-the-move-2017.webp", alt: "March 2017 North Coast Business Journal spread with executive appointments, medical leadership briefs, and commercial advertising", caption: "March 2017 · Pages 28–29 · Executive announcement hierarchy, modular On the Move profiles, and advertiser-supported pacing" }
          ]
        },
        {
          label: "Editorial Voice & Reporting",
          thumb: "assets/north-coast-business-journal/thumbs/thumb-north-coast-business-journal-editorial-design.webp",
          src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-editorial-design-1.webp",
          alt: "North Coast Business Journal editorial columns and business reporting spreads",
          images: [
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-editorial-design-1.webp", alt: "January 2017 two-page editorial spread with culinary program reporting", caption: "January 2017 · Pages 2–3 · Editorial continuity and documentary photography" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-editorial-design-2.webp", alt: "February 2017 two-page editorial spread with an editor column and business alert", caption: "February 2017 · Pages 2–3 · Editor's column and practical business alert" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-editorial-design-3.webp", alt: "March 2017 two-page editorial spread introducing the publication redesign", caption: "March 2017 · Pages 2–3 · Editorial introduction to the redesigned publication" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-editorial-design-4.webp", alt: "April 2017 two-page editorial and economic-development spread", caption: "April 2017 · Pages 2–3 · Publication note, awareness message, and development news" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-editorial-design-5.webp", alt: "May 2017 two-page spread with a marketing column and business resource", caption: "May 2017 · Pages 2–3 · Marketing column facing a supporting business resource" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-editorial-motorsports-2016.webp", alt: "August 2016 two-page spread with Summit Motorsports Park photography and a sales column", caption: "August 2016 · Pages 10–11 · Dramatic motorsports photography facing a sales department" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-editorial-genoa-2017.webp", alt: "January 2017 North Coast Business Journal spread featuring a Genoa Chamber annual review and Huron Chamber reporting", caption: "January 2017 · Pages 8–9 · Architectural photography, chamber identity, and long-form regional reporting across facing pages" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-editorial-airport-ferry-2016.webp", alt: "September 2016 North Coast Business Journal spread about the Erie-Ottawa International Airport and Miller Ferry", caption: "September 2016 · Pages 12–13 · Aviation and island transportation stories use documentary photography and strong sectional headlines" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-editorial-regional-planning-2014.webp", alt: "October 2014 North Coast Business Journal spread with sales columns and an Erie County bicycle and pedestrian plan feature", caption: "October 2014 · Pages 24–25 · Recurring sales content faces an information-dense regional planning feature anchored by a selected concept image" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-feature-insurance-ehove-2017.webp", alt: "May 2017 North Coast Business Journal spread with insurance reporting, EHOVE student achievement, and a Main Street Vermilion story", caption: "May 2017 · Pages 8–9 · Insurance analysis, workforce photography, and regional community reporting share a disciplined editorial spread" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-feature-human-capital-2016.webp", alt: "May 2016 North Coast Business Journal spread with a human-capital column, safety council breakfast, legal advice, and regional news", caption: "May 2016 · Pages 24–25 · Department typography, event photography, legal guidance, and community briefs create a varied closing sequence" }
          ]
        },
        {
          label: "Advertiser-Supported Layouts",
          thumb: "assets/north-coast-business-journal/gallery-north-coast-business-journal-marketing-integration-2.webp",
          src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-marketing-integration-2.webp",
          alt: "North Coast Business Journal spreads balancing business content with advertiser messages",
          images: [
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-marketing-integration-2.webp", alt: "February 2017 two-page spread with Put-in-Bay columns and healthcare advertising", caption: "February 2017 · Pages 16–17 · Island columns and full-width healthcare messaging" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-marketing-integration-3.webp", alt: "March 2017 two-page sponsor and business-information spread", caption: "March 2017 · Pages 20–21 · Distinct sponsor zones within the publication rhythm" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-marketing-editorial-april-2017.webp", alt: "April 2017 North Coast Business Journal spread with a Terra State transformation feature, ribbon-cutting photographs, and commercial advertising", caption: "April 2017 · Pages 18–19 · Long-form education reporting and community photography face a commercial page, demonstrating editorial and advertising balance" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-marketing-integration-5.webp", alt: "May 2017 two-page spread pairing banking advertising with education reporting", caption: "May 2017 · Pages 20–21 · Branded banking message and education reporting" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-community-ribbon-cuttings-2016.webp", alt: "December 2016 two-page spread with readership information, ribbon cuttings, and a healthcare campaign", caption: "December 2016 · Pages 18–19 · Publication promotion facing community and healthcare campaigns" }
          ]
        },
        {
          label: "Community & Development Features",
          thumb: "assets/north-coast-business-journal/thumbs/thumb-north-coast-business-journal-community-development.webp",
          src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-feature-marketing-1.webp",
          alt: "North Coast Business Journal community development and regional business spreads",
          images: [
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-feature-marketing-1.webp", alt: "January 2015 two-page chamber and community-development spread", caption: "January 2015 · Pages 16–17 · Chamber investment reporting in its facing-page context" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-feature-marketing-2.webp", alt: "October 2014 two-page community-planning spread with map and local advertising", caption: "October 2014 · Pages 6–7 · Community planning, mapping, and modular ad placement" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-feature-marketing-3.webp", alt: "January 2016 two-page education and industry spread", caption: "January 2016 · Pages 10–11 · Education and industry reporting with strong ad contrast" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-feature-marketing-4.webp", alt: "December 2015 two-page facilities-planning and development spread", caption: "December 2015 · Pages 10–11 · Facilities planning and architectural photography" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-feature-marketing-5.webp", alt: "March 2016 two-page community feature with a photo grid", caption: "March 2016 · Pages 16–17 · Dense photo grid within the full publication spread" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-community-rise-2015.webp", alt: "October 2015 two-page Erie County development and manufacturing spread", caption: "October 2015 · Pages 10–11 · Branded development program facing information design" }
          ]
        },
        {
          label: "Chamber & Partner Information",
          thumb: "assets/north-coast-business-journal/thumbs/thumb-north-coast-business-journal-information-systems.webp",
          src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-information-systems-1.webp",
          alt: "North Coast Business Journal chamber calendars and partner information spreads",
          images: [
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-information-systems-1.webp", alt: "January 2017 two-page chamber calendar and regional information spread", caption: "January 2017 · Pages 10–11 · Multi-chamber calendar in its facing-page context" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-information-systems-2.webp", alt: "February 2017 two-page partner-information spread featuring First National Bank", caption: "February 2017 · Pages 14–15 · Partner profile with restrained advertorial hierarchy" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-information-systems-5.webp", alt: "May 2017 two-page chamber calendar and business-information spread", caption: "May 2017 · Pages 24–25 · High-volume event information kept consistent and legible" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-chamber-bellevue-2016.webp", alt: "February 2016 two-page education advertising and Bellevue Chamber spread", caption: "February 2016 · Pages 4–5 · Sponsor page facing a captioned five-image chamber grid" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-partner-lighthouse-festival-2016.webp", alt: "November 2016 two-page community foundation and lighthouse festival spread", caption: "November 2016 · Pages 26–27 · Foundation reporting and a three-image festival sequence" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-on-the-move-2016.webp", alt: "December 2016 two-page On the Move department spread", caption: "December 2016 · Pages 26–27 · Appointments, awards, and seasonal business information" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-calendar-june-2016.webp", alt: "June 2016 North Coast Business Journal spread with a multi-chamber calendar and Marblehead Lighthouse State Park feature", caption: "June 2016 · Pages 12–13 · Dense multi-chamber scheduling faces a photography-led regional destination story" },
            { src: "assets/north-coast-business-journal/gallery-north-coast-business-journal-calendar-april-2016.webp", alt: "April 2016 North Coast Business Journal spread with a multi-chamber calendar and business advertising", caption: "April 2016 · Pages 12–13 · Repeated chamber labels, compact calendar typography, seasonal imagery, and sponsor messages form a practical information spread" }
          ]
        },
        {
          label: "Published Web Edition (10.5 MB)",
          thumb: "assets/north-coast-business-journal/thumbs/thumb-north-coast-business-journal-full.webp",
          href: "assets/north-coast-business-journal/gallery-north-coast-business-journal-full.pdf",
          alt: "Open the complete screen-optimized April 2017 North Coast Business Journal PDF",
          linkLabel: "Open the complete April 2017 web edition"
        }
      ]
    },
    "beacon-newspaper-production": {
  kicker: "Feature Story / Brand Redesign & Newspaper Production",
  title: "The Beacon Newspaper",
  subtitle: "A regional newspaper identity and production system rebuilt for weekly publishing",
  noteTitle: "Redesign & Production Story",

  paragraphs: [
    "The Beacon is a weekly newspaper serving Port Clinton, Catawba Island, Marblehead, Lakeside, the Lake Erie Islands, Oak Harbor, and the surrounding Ottawa County townships. Its readership combines year-round residents and local business owners with a large seasonal audience of visitors, boaters, anglers, and second-home owners. Circulation rose from approximately 10,000 copies during the winter to approximately 12,000 during the tourism season, making the paper both a civic resource and an important local advertising platform.",

    "When I joined Schaffner Publications, The Beacon had no dependable system for submitting advertising requests. Instructions were often handwritten, files were difficult to locate, and repetitive material such as classifieds and community calendars required unnecessary manual formatting. Drawing on the business and production methods I learned in college, I helped move ad submissions to a consistent email workflow, introduced universal file-naming conventions, and built GREP, paragraph, and character styles for recurring content. These became company-wide production practices used across The Beacon, North Coast Business Journal, North Coast Parent, and HOMES.",

    "After improving the production workflow, I was trusted to redesign The Beacon's visual identity. I used the lighthouse concept from the earlier logo as a starting point, redrawing it to correct its alignment and balance, then established a consistent weight with a Gill Sans MT Extra Bold wordmark. The resulting logo was bold, professional, reproducible in black and white, and practical across the newspaper, business cards, house advertising, and other marketing. Adobe Garamond supported readable body copy, while Cronos gave headlines and captions a clear, approachable voice. I also shortened the page headers to recover space for reporting and imagery, updated department labels, and rebuilt the front-page structure. The owner approved the redesign. The July 2015 example in this collection preserves the inherited multicolor identity; issues from late 2015 through 2017 show the more flexible system that replaced it.",

    "Editor Jasmine Cupp pursued community stories, wrote and edited the copy, selected lead stories, wrote headlines, supplied photography, determined where stories belonged, and approved the pages. I did not write the articles or take the photographs. After initially joining Mark Schaffner and an operation that had cycled through short-term designers, I assumed sole responsibility for assembling the complete newspaper in InDesign. My work was to translate Jasmine's editorial direction into clear page hierarchy, prepare and correct supplied images, integrate advertising, and keep every issue visually consistent as news changed up to the final upload.",

    "Most Beacon advertisements were also designed by me. Sales staff supplied the copy and available client material; I frequently tracked down usable logos and imagery, used contrast, repetition, alignment, and proximity to develop audience-focused color, typography, hierarchy, and layout, and suggested message improvements based on my marketing training. When clients supplied finished ads with technical problems, I usually repaired the files for production rather than returning them. Special sections such as football previews, fishing coverage, holiday issues, tourism packages, and festival guides were assigned editorial products rather than concepts I originated, but I designed the information systems and final presentations. Three Beacon advertisements created during this role received industry awards.",

    "Production day compressed the entire issue into a working day, generally from about 8 a.m. until 4 or 5 p.m. Jasmine determined the pagination and page plan based on that week's advertising, assigned the editorial content, and approved the pages; I assembled and revised every page until release. Weekly issues ranged from 10 to 26 pages, and the same system adapted to smaller winter editions and advertising-heavy spring and summer publications.",

    "Before delivery, I converted and corrected supplied photographs for CMYK reproduction, checked image resolution, avoided unnecessary four-plate color builds, kept total ink coverage within approximately 220–240 percent, preflighted the issue, and forced CMYK conversion during PDF export. I coordinated final production requirements with the printer's representatives so the delivered PDFs required no additional printer intervention, then transmitted them through FileZilla and FTP. For online viewing, I combined the finished pages and uploaded the complete newspaper each week, and occasionally created house advertisements promoting the newspaper's website. At handoff, I left the company with master pages, paragraph and character styles, Creative Cloud libraries, templates, advertising files, production documents, and copies of the complete working archive."
  ],

  sidebarTitle: "Production Notes",

  details: [
    ["Role", "Production Graphic Designer, Jun 2014–Jun 2017; joined Mark Schaffner and an operation using rotating short-term designers, then assumed sole assembly of the complete weekly newspaper"],
    ["Editorial partner", "Editor Jasmine Cupp reported, wrote, edited, selected lead stories and photographs, wrote headlines, assigned page content, and approved finished pages"],
    ["Scope", "Lighthouse logo and masthead redesign • business cards and identity applications • complete newspaper assembly • editorial hierarchy • advertising design and client-file repair • reusable formatting systems • image preparation • prepress • printer coordination • FTP delivery • weekly online issue publishing and archiving"],
    ["Typography", "Adobe Garamond for body copy; Cronos for headlines and captions; Gill Sans MT Extra Bold establishing the weight of the redesigned wordmark"],
    ["Tools", "Adobe InDesign • Photoshop • Illustrator • Bridge • Acrobat • Microsoft Office • FileZilla • GREP styles • paragraph and character styles • Creative Cloud Libraries"],
    ["Audience", "Ottawa County residents, businesses, seasonal homeowners, boaters, anglers, tourists, and Lake Erie visitors; approximately 10,000–12,000 copies weekly depending on season"],
    ["Outcome", "Rebuilt the publication's identity and production workflow, produced every complete weekly issue under same-day deadlines, delivered printer-ready files requiring no additional intervention, and left a documented, reusable publishing system"]
  ],

  shows:[
    "Before-and-after lighthouse logo and masthead redesign",
    "Business cards and cross-medium identity applications",
    "Sole assembly of complete 10-to-26-page weekly issues",
    "Email-based ad intake and universal file naming",
    "GREP, paragraph, and character style systems",
    "Advertising design, supplied-ad repair, and marketing-informed recommendations",
    "CMYK preflight, printer coordination, FTP delivery, and weekly online publishing",
    "Three award-winning Beacon advertisements"
  ],

 /* Legacy single-page Beacon curation retained as source notes.
 legacyGallery: [
  {
    label: "Publication Identity",
    thumb: "assets/beacon/thumbs/thumb-beacon-front-page.webp",
    src: "assets/beacon/gallery-beacon-front-page-1.webp",
    alt: "Selection of The Beacon newspaper front pages demonstrating a consistent publication identity",
    images: [
      {
        src: "assets/beacon/gallery-beacon-front-page-1.webp",
        alt: "The Beacon front page featuring the First Shot Ceremony at Camp Perry",
        caption: "First Shot Ceremony at Camp Perry · Community news, event photography, and strong front-page hierarchy"
      },
      {
        src: "assets/beacon/gallery-beacon-front-page-2.webp",
        alt: "The Beacon front page featuring the RED HORSE playground construction project",
        caption: "RED HORSE Playground Project · Large feature photography balanced with multiple community stories"
      },
      {
        src: "assets/beacon/gallery-beacon-front-page-3.webp",
        alt: "The Beacon front page featuring a local artist painting a yellow warbler mural",
        caption: "Local Artist Feature · Environmental portraiture and community arts coverage"
      },
      {
        src: "assets/beacon/gallery-beacon-front-page-4.webp",
        alt: "The Beacon front page featuring the Port Clinton Lighthouse at sunset",
        caption: "Port Clinton Lighthouse · Photography-led storytelling with supporting local news"
      },
      {
        src: "assets/beacon/gallery-beacon-front-page-5.webp",
        alt: "The Beacon front page presenting special coverage of the regional drug epidemic",
        caption: "Drug Epidemic Special Coverage · Public-interest reporting supported by disciplined typography"
      },
      {
        src: "assets/beacon/gallery-beacon-front-page-6.webp",
        alt: "The Beacon February 23, 2017 anniversary front page featuring the history of Erie Gardens",
        caption: "The History of Erie Gardens · Archival photographs, a celebratory masthead, and a full-width historical feature create a distinctive anniversary front page"
      }
    ]
  },

  {
    label: "Editorial Storytelling",
    thumb: "assets/beacon/thumbs/thumb-beacon-editorial-design.webp",
    src: "assets/beacon/gallery-beacon-editorial-design-1.webp",
    alt: "Selection of interior Beacon newspaper pages demonstrating editorial storytelling",
    images: [
      {
        src: "assets/beacon/gallery-beacon-editorial-design-1.webp",
        alt: "Beacon interior page combining obituaries, community notices, advertising, and employment listings",
        caption: "Community News and Notices · Multiple recurring content types organized within a consistent editorial system"
      },
      {
        src: "assets/beacon/gallery-beacon-editorial-design-2.webp",
        alt: "Beacon interior page featuring local business and community stories with integrated advertising",
        caption: "Local Business Coverage · Editorial hierarchy connecting community reporting, photography, and advertising"
      },
      {
        src: "assets/beacon/gallery-beacon-editorial-design-3.webp",
        alt: "Beacon newspaper page combining local articles with a large retail advertisement",
        caption: "Editorial and Advertising Balance · News content arranged around a high-impact retail placement"
      },
      {
        src: "assets/beacon/gallery-beacon-editorial-design-4.webp",
        alt: "Beacon Women in Business page featuring profiles, photographs, and advertising",
        caption: "Women in Business · Profile-driven storytelling with coordinated photography and sponsor content"
      },
      {
        src: "assets/beacon/gallery-beacon-editorial-design-5.webp",
        alt: "Beacon community page featuring sports, honors, local events, and advertising",
        caption: "Community Recognition · Short stories, photographs, and recurring departments organized for quick reading"
      }
    ]
  },

  {
    label: "Marketing Integration",
    thumb: "assets/beacon/thumbs/thumb-beacon-marketing-integration.webp",
    src: "assets/beacon/gallery-beacon-marketing-integration-1.webp",
    alt: "Beacon newspaper pages showing advertising integrated with editorial content",
    images: [
      {
        src: "assets/beacon/gallery-beacon-marketing-integration-1.webp",
        alt: "Beacon page combining local reporting with vertical display advertisements",
        caption: "Editorial with Display Advertising · Local stories remain readable alongside multiple client messages"
      },
      {
        src: "assets/beacon/gallery-beacon-marketing-integration-2.webp",
        alt: "Beacon page containing community reporting and a coordinated group of colorful advertisements",
        caption: "Retail Advertising Integration · Multiple promotional messages arranged without overwhelming editorial content"
      },
      {
        src: "assets/beacon/gallery-beacon-marketing-integration-3.webp",
        alt: "Beacon page combining arts coverage, obituary content, job advertisements, and retail promotions",
        caption: "Mixed Revenue Content · Editorial, recruitment, retail, and service advertising combined in one page system"
      },
      {
        src: "assets/beacon/gallery-beacon-marketing-integration-4.webp",
        alt: "Beacon page featuring memorial reporting, sports coverage, and local advertisements",
        caption: "Community Coverage with Sponsorship · Advertising supports the issue while preserving editorial emphasis"
      },
      {
        src: "assets/beacon/gallery-beacon-marketing-integration-5.webp",
        alt: "Beacon classifieds and employment page containing numerous small-format advertisements",
        caption: "Classified and Recruitment Advertising · Dense promotional content organized through consistent spacing and hierarchy"
      }
    ]
  },

  {
    label: "Information Design",
    thumb: "assets/beacon/thumbs/thumb-beacon-information-systems.webp",
    src: "assets/beacon/gallery-beacon-information-systems-1.webp",
    alt: "Beacon newspaper pages demonstrating calendars, classifieds, listings, and recurring information systems",
    images: [
      {
        src: "assets/beacon/gallery-beacon-information-systems-1.webp",
        alt: "Beacon page combining school news, recurring departments, advertisements, and community information",
        caption: "Recurring Community Departments · Modular content organized for predictable weekly reading"
      },
      {
        src: "assets/beacon/gallery-beacon-information-systems-2.webp",
        alt: "Full Beacon classified advertising page arranged in narrow searchable columns",
        caption: "Classified Listings · High-density information structured for quick scanning and response"
      },
      {
        src: "assets/beacon/gallery-beacon-information-systems-3.webp",
        alt: "Beacon community calendar page listing events by date and category",
        caption: "Community Calendar · Large quantities of event information organized into a clear weekly reference"
      },
      {
        src: "assets/beacon/gallery-beacon-information-systems-4.webp",
        alt: "Beacon page combining a summer festival schedule with a community calendar and local notices",
        caption: "Festival and Event Information · Schedules, dates, locations, and promotions presented as a usable reference"
      },
      {
        src: "assets/beacon/gallery-beacon-information-systems-5.webp",
        alt: "Beacon school and community page combining briefs, lists, photographs, and advertising",
        caption: "School and Community Briefs · Repeated information patterns support fast production and easy navigation"
      }
    ]
  },

  {
    label: "Featured",
    thumb: "assets/beacon/thumbs/thumb-beacon-feature-design.webp",
    src: "assets/beacon/gallery-beacon-feature-design-1.webp",
    alt: "Selection of featured Beacon newspaper pages demonstrating long-form editorial design",
    images: [
      {
        src: "assets/beacon/gallery-beacon-feature-design-1.webp",
        alt: "Beacon Lake Erie Fishing Report page with articles, photography, calendar information, and advertising",
        caption: "Lake Erie Fishing Report · Specialized editorial content supported by photography, listings, and related advertising"
      },
      {
        src: "assets/beacon/gallery-beacon-feature-design-2.webp",
        alt: "Beacon fishing report page featuring a large fish graphic and local car show coverage",
        caption: "Fishing and Community Features · Graphic selection, typography, and photography create a varied editorial page"
      },
      {
        src: "assets/beacon/gallery-beacon-feature-design-3.webp",
        alt: "Beacon photo feature documenting storm damage along the Lake Erie coastline",
        caption: "Coastline Storm Coverage · Documentary photography arranged as a visual narrative"
      },
      {
        src: "assets/beacon/gallery-beacon-feature-design-4.webp",
        alt: "Beacon page featuring local banking news and the Where in the World is The Beacon department",
        caption: "Recurring Community Features · Business reporting and reader participation combined within one issue"
      },
      {
        src: "assets/beacon/gallery-beacon-feature-design-5.webp",
        alt: "Beacon page featuring monarch butterfly tagging and World Polio Day stories",
        caption: "Environmental and Community Reporting · Multiple feature packages coordinated through a shared page hierarchy"
      }
    ]
  },

  {
    label: "Published Newspaper"
  }
], */
gallery: [
  {
    label: "Identity Redesign & Front Pages",
    thumb: "assets/beacon/gallery-beacon-front-page-archive-06.webp",
    src: "assets/beacon/gallery-beacon-front-page-design-2.webp",
    alt: "The Beacon July 2, 2015 front page showing the inherited multicolor masthead before the identity redesign",
    images: [
      {
        src: "assets/beacon/gallery-beacon-front-page-design-2.webp",
        alt: "The Beacon July 2, 2015 Independence Day front page showing the inherited multicolor masthead before the redesign",
        caption: "Before the Redesign · The inherited multicolor masthead, tall promotional header, and dense navigation system used valuable front-page space"
      },
      {
        src: "assets/beacon/gallery-beacon-front-page-archive-06.webp",
        alt: "The Beacon November 12, 2015 Port Clinton football season-review front page featuring a cutout player layered across the editorial grid",
        caption: "After the Redesign · The new lighthouse masthead, shortened navigation area, supplied sports photography, layered compositing, and a multi-image season package establish a more flexible identity"
      },
      {
        src: "assets/beacon/gallery-beacon-front-page-design-1.webp",
        alt: "The Beacon March 3, 2016 front page led by dramatic Burning Snowman festival photography",
        caption: "Burning Snowman Festival · Dramatic night photography leads a layered community-news front page"
      },
      {
        src: "assets/beacon/gallery-beacon-front-page-design-3.webp",
        alt: "The Beacon June 16, 2016 front page featuring the RED HORSE playground construction project",
        caption: "RED HORSE Playground Project · Large documentary photography balances public-service reporting and community news"
      },
      {
        src: "assets/beacon/gallery-beacon-front-page-design-4.webp",
        alt: "The Beacon October 27, 2016 front page presenting special coverage of the regional drug epidemic",
        caption: "Drug Epidemic Special Coverage · Public-interest reporting supported by disciplined typography and hierarchy"
      },
      {
        src: "assets/beacon/gallery-beacon-front-page-design-5.webp",
        alt: "The Beacon November 10, 2016 front page combining election information with Veteran Month photography",
        caption: "Election and Veteran Month · Civic information and documentary photography share a disciplined split hierarchy"
      },
      {
        src: "assets/beacon/gallery-beacon-front-page-design-6.webp",
        alt: "The Beacon December 29, 2016 front page presenting the year's top ten stories and a memorial feature",
        caption: "Year in Review · A ranked news summary, archival imagery, and a local memorial close the publication year"
      },
      {
        src: "assets/beacon/gallery-beacon-front-page-design-7.webp",
        alt: "The Beacon May 4, 2017 front page featuring a yellow warbler and Biggest Week in American Birding coverage",
        caption: "Biggest Week in American Birding · A close wildlife photograph and restrained typography create an immediate seasonal identity"
      },
      {
        src: "assets/beacon/gallery-beacon-front-page-design-8.webp",
        alt: "The Beacon June 30, 2016 Independence Day front page featuring an American flag and fireworks",
        caption: "Independence Day · Patriotic photography, fireworks information, and civic reporting form a confident holiday front page"
      },
      {
        src: "assets/beacon/gallery-beacon-front-page-design-10.webp",
        alt: "The Beacon September 29, 2016 front page celebrating the restored Port Clinton Lighthouse",
        caption: "Port Clinton Lighthouse Shines Again · A spacious landmark portrait gives the restoration story clarity and ceremony"
      },
      {
        src: "assets/beacon/gallery-beacon-front-page-design-11.webp",
        alt: "The Beacon April 7, 2016 front page commemorating the Bataan Death March with archival photography and a wartime letter",
        caption: "Remembering the Bataan Death March · A full-bleed flag, archival photograph, historical letter, and pull quote create a disciplined commemorative front page"
      },
      {
        src: "assets/beacon/gallery-beacon-front-page-design-12.webp",
        alt: "The Beacon October 13, 2016 Oak Harbor Apple Festival front page with layered event photographs",
        caption: "Oak Harbor Apple Festival · Layered event photography, textured backgrounds, and angled image frames create a lively special-event cover"
      }
    ]
  },

  {
    label: "Editorial Structure & Typography",
    thumb: "assets/beacon/gallery-beacon-editorial-opinion-throwback-2016.webp",
    src: "assets/beacon/gallery-beacon-editorial-opinion-throwback-2016.webp",
    alt: "Facing Beacon editorial pages showing recurring departments, typography, photography, and advertising integration",
    images: [
      { src: "assets/beacon/gallery-beacon-editorial-obituaries-community-2016.webp", alt: "Facing June 23, 2016 Beacon pages with obituaries, Sound Off, community notices, and employment advertising", caption: "Obituaries, Sound Off & Community Notices · Recurring departments, small-format information, and employment messages remain distinct across the spread" },
      { src: "assets/beacon/gallery-beacon-editorial-business-railroad-2016.webp", alt: "Facing October 27, 2016 Beacon pages with local business reporting, archival railroad material, photography, and advertising", caption: "Local Business & Railroad History · Strong headline scale and documentary photography organize multiple community stories across facing pages" },
      { src: "assets/beacon/gallery-beacon-editorial-opinion-throwback-2016.webp", alt: "Facing January 21, 2016 Beacon Obituaries with Throwback Thursday, Sound Off, columns, and display advertising", caption: "Obituaries, Throwback Thursday & Sound Off · Column typography and repeated section signals give long-form civic commentary a stable reading structure" },
      { src: "assets/beacon/gallery-beacon-editorial-arts-business-2016.webp", alt: "Facing March 31, 2016 Beacon pages with arts reporting, business profiles, library information, and display advertising", caption: "Arts, Business & Community Information · modular briefs, and display advertising share a controlled editorial grid" },
      { src: "assets/beacon/gallery-beacon-editorial-winter-sports-2016.webp", alt: "Facing January 14, 2016 Beacon sports pages with game coverage, team honors, photography, and event advertising", caption: "Winter Sports & Community Recognition · Results, profiles, photographs, and promotions are layered into an energetic but readable sports spread" },
      { src: "assets/beacon/gallery-beacon-editorial-tell-tales-2016.webp", alt: "Facing June 30, 2016 Beacon pages with obituaries, lighthouse reporting, the Tell Tales column, and local advertising", caption: "Lighthouse Progress & Tell Tales · News, recurring commentary, and local advertising demonstrate the publication's flexible weekly page system" }
    ]
  },

  {
    label: "Feature Storytelling",
    thumb: "assets/beacon/gallery-beacon-feature-mayfly-fishing-2016.webp",
    src: "assets/beacon/gallery-beacon-feature-mayfly-fishing-2016.webp",
    alt: "Facing Beacon pages about the Biggest Week in American Birding with bird photography and festival information",
    images: [
      {
        src: "assets/beacon/gallery-beacon-feature-storytelling-1.webp",
        alt: "Facing Beacon pages about the Biggest Week in American Birding with bird photography and festival information",
        caption: "Biggest Week in American Birding · Wildlife photography, festival information, and sponsor messaging form a cohesive thematic spread"
      },
      {
        src: "assets/beacon/gallery-beacon-feature-storytelling-2.webp",
        alt: "Facing Beacon pages featuring community stories and a photo essay documenting Lake Erie storm damage",
        caption: "Coastline Takes a Beating · Documentary storm photography turns severe-weather reporting into a visual narrative"
      },
      {
        src: "assets/beacon/gallery-beacon-feature-storytelling-3.webp",
        alt: "Facing Beacon pages combining community reporting with a Lake Erie fall fishing feature",
        caption: "Fall Fishing Bonanza · Community reporting and fishing photography create an accessible outdoors feature spread"
      },
      {
        src: "assets/beacon/gallery-beacon-feature-storytelling-4.webp",
        alt: "Facing Beacon pages featuring a Lake Erie fishing report and a photo-led community dog show story",
        caption: "Fishing and Community Features · A fishing report and Best of Show photo story balance long-form copy with documentary images"
      },
      {
        src: "assets/beacon/gallery-beacon-feature-storytelling-5.webp",
        alt: "Facing Beacon pages presenting an Oak Harbor Apple Festival feature with archival and event photography",
        caption: "Oak Harbor Apple Festival · Archival and event photography carry a multi-page seasonal feature"
      },
      {
        src: "assets/beacon/gallery-beacon-feature-storytelling-6.webp",
        alt: "Facing Beacon pages pairing Lake Erie fishing coverage with a photo-led autumn community feature",
        caption: "Autumn Outdoors · Lake Erie fishing coverage pairs with a photo-led community festival page"
      },
      { src: "assets/beacon/gallery-beacon-feature-fall-fishing-2016.webp", alt: "Facing September 29, 2016 Beacon pages featuring a Lake Erie fishing report, catch photography, a community calendar, and radio promotion", caption: "Fall Fishing Report · A photo-led catch package, long-form outdoors copy, weekly calendar, and sponsor strip create a complete service feature" },
      { src: "assets/beacon/gallery-beacon-feature-mayfly-fishing-2016.webp", alt: "Facing June 23, 2016 Beacon pages with mayfly and bass fishing features, selected graphics, community reporting, and advertising", caption: "Mayfly Hatch & Bass Regulations · Selected graphics, oversized headlines, and practical reporting turn specialized information into an inviting feature spread" },
      { src: "assets/beacon/gallery-beacon-feature-reader-travel-2016.webp", alt: "Facing May 12, 2016 Beacon pages combining banking news, reader travel photographs, community stories, and advertising", caption: "Where in the World Is The Beacon? · Reader-submitted photography and business reporting create a participatory community feature" },
      { src: "assets/beacon/gallery-beacon-feature-monarch-polio-2016.webp", alt: "Facing October 27, 2016 Beacon pages featuring monarch tagging, World Polio Day, community photography, and recurring promotions", caption: "Monarch Tagging & World Polio Day · Environmental reporting, portraiture, and community-service coverage build a varied human-interest spread"
      }
    ]
  },

  {
    label: "Sports Page Design",
    thumb: "assets/beacon/thumbs/thumb-beacon-sports-photojournalism.webp",
    src: "assets/beacon/gallery-beacon-sports-photojournalism-1.webp",
    alt: "Facing Beacon football preview pages with team portrait, rosters, schedules, and sponsor messages",
    images: [
      {
        src: "assets/beacon/gallery-beacon-sports-photojournalism-1.webp",
        alt: "Facing Beacon football preview pages with team portrait, rosters, schedules, and sponsor messages",
        caption: "Fall Football Preview · Team portrait, roster system, schedules, and sponsor integration build a coordinated season package"
      },
      {
        src: "assets/beacon/gallery-beacon-sports-photojournalism-2.webp",
        alt: "Facing Beacon sports pages with high school football action photographs and game coverage",
        caption: "Friday Night Football · Action photography and recaps keep multiple teams legible across a dense sports spread"
      },
      {
        src: "assets/beacon/gallery-beacon-sports-photojournalism-3.webp",
        alt: "Facing Beacon high school football pages featuring large game photographs and weekly recaps",
        caption: "High School Football · Large game photographs and concise score hierarchy create an energetic weekly sports spread"
      },
      {
        src: "assets/beacon/gallery-beacon-sports-photojournalism-4.webp",
        alt: "Facing Beacon pages with local advertising and a dramatic full-page high school football playoff photograph",
        caption: "Playoff Football · A dramatic action photograph gives the sports section a strong visual anchor"
      },
      {
        src: "assets/beacon/gallery-beacon-sports-photojournalism-5.webp",
        alt: "Facing Beacon sports pages combining game coverage, team honors, and all-conference selections",
        caption: "Postseason Recognition · Game coverage, team honors, and all-conference lists are coordinated across facing pages"
      },
      {
        src: "assets/beacon/gallery-beacon-sports-photojournalism-6.webp",
        alt: "Facing Beacon winter sports preview pages with basketball team portraits, season outlooks, and sponsors",
        caption: "Winter Sports Preview · Team portraits, season outlooks, and sponsor blocks create a repeatable multi-school package"
      }
    ]
  },

  {
    label: "Seasonal & Special Sections",
    thumb: "assets/beacon/thumbs/thumb-beacon-seasonal-special-sections.webp",
    src: "assets/beacon/gallery-beacon-seasonal-special-sections-1.webp",
    alt: "Facing Beacon Summer on the Lake and Walleye Festival pages with tourism promotion and event information",
    images: [
      {
        src: "assets/beacon/gallery-beacon-seasonal-special-sections-1.webp",
        alt: "Facing Beacon Summer on the Lake and Walleye Festival pages with tourism promotion and event information",
        caption: "Walleye Festival & Summer on the Lake · Tourism promotion and event logistics work as a unified seasonal package"
      },
      {
        src: "assets/beacon/gallery-beacon-seasonal-special-sections-2.webp",
        alt: "Facing Beacon pages featuring a Red White and Vroom event schedule and Summer on the Lake photography",
        caption: "Fourth of July Special · A bold Red, White & Vroom schedule opens into a photographic Summer on the Lake page"
      },
      {
        src: "assets/beacon/gallery-beacon-seasonal-special-sections-3.webp",
        alt: "Facing Beacon pages opening the fall football special with a sponsor marketplace and Port Clinton team presentation",
        caption: "Fall Football Special · Sponsor marketplace and Port Clinton team presentation introduce the season package"
      },
      {
        src: "assets/beacon/gallery-beacon-seasonal-special-sections-4.webp",
        alt: "Facing Beacon autumn pages with a Lake Erie fishing report, first-responder photographs, and festival promotions",
        caption: "Autumn Fishing and Events · Outdoors reporting, documentary photography, and festival promotions create a varied seasonal spread"
      },
      {
        src: "assets/beacon/gallery-beacon-seasonal-special-sections-5.webp",
        alt: "Facing Beacon holiday pages combining retail promotions, community events, and seasonal graphics",
        caption: "Holiday Events · Retail messaging, community calendars, and seasonal graphics are organized for quick browsing"
      },
      {
        src: "assets/beacon/gallery-beacon-seasonal-special-sections-6.webp",
        alt: "Facing Beacon pages combining New Year's entertainment promotions with holiday-period sports coverage",
        caption: "New Year Preview · Entertainment promotions and game-day coverage carry the issue from holiday into 2016"
      }
    ]
  },

  {
    label: "Information Design",
    thumb: "assets/beacon/gallery-beacon-information-calendar-july-2016.webp",
    src: "assets/beacon/gallery-beacon-information-calendar-july-2016.webp",
    alt: "Facing Beacon community pages with a dated event calendar, fireworks photograph, and local notices",
    images: [
      {
        src: "assets/beacon/gallery-beacon-information-design-1.webp",
        alt: "Facing Beacon community pages with a dated event calendar, fireworks photograph, and local notices",
        caption: "Community Calendar · Dates, events, photography, and local notices are organized into a dependable weekly reference"
      },
      {
        src: "assets/beacon/gallery-beacon-information-design-2.webp",
        alt: "Facing Beacon classified advertising and service directory pages arranged in compact searchable columns",
        caption: "Classifieds and Service Directory · High-density information remains searchable through consistent labels, columns, and spacing"
      },
      {
        src: "assets/beacon/gallery-beacon-information-design-3.webp",
        alt: "Facing Beacon pages featuring community reporting and an algal bloom data story with map and bar chart",
        caption: "Algal Bloom Data Story · Map, chart, photography, and explanatory text turn environmental reporting into an accessible visual package"
      },
      {
        src: "assets/beacon/gallery-beacon-information-design-4.webp",
        alt: "Facing Beacon pages presenting entertainment and community calendars alongside an art walk schedule",
        caption: "Entertainment and Community Calendars · Dense schedules are divided into predictable sections for fast weekly scanning"
      },
      {
        src: "assets/beacon/gallery-beacon-information-design-5.webp",
        alt: "Facing Beacon pages combining a festival schedule, sports information, and recurring community notices",
        caption: "Festival and Sports Information · Timetables, dates, and recurring notices are coordinated within a practical reference spread"
      },
      {
        src: "assets/beacon/gallery-beacon-information-design-6.webp",
        alt: "Facing Beacon classified and service directory pages with dense listings and strong navigational labels",
        caption: "Classified Listings · Repeated headers, compact typography, and modular advertisements support quick scanning and response"
      },
      { src: "assets/beacon/gallery-beacon-information-classifieds-schools-2017.webp", alt: "Facing March 9, 2017 Beacon pages combining Terrific Kids recognition, legal notices, classified advertising, and recurring promotional modules", caption: "Schools, Legal Notices & Classifieds · Section labels and compact columns coordinate very different information types without losing navigation" },
      { src: "assets/beacon/gallery-beacon-information-classifieds-legal-2017.webp", alt: "Facing February 16, 2017 Beacon classified pages with legal notices, service-directory advertising, and response information", caption: "Legal Notices & Service Directory · Dense statutory copy and small-format advertising remain searchable through repeated headers and column discipline" },
      { src: "assets/beacon/gallery-beacon-information-calendar-july-2016.webp", alt: "Facing July 14, 2016 Beacon pages with environmental reporting, a detailed community calendar, and local radio promotion", caption: "July Community Calendar · Date blocks, event details, and a consistent column system turn a large volume of listings into a practical weekly reference" },
      { src: "assets/beacon/gallery-beacon-information-calendar-summer-2015.webp", alt: "Facing August 13, 2015 Beacon pages with festival reporting, a summer community calendar, and local promotional modules", caption: "Summer Festivals & Community Calendar · Recurring labels, dates, and compact event descriptions support quick seasonal browsing" },
      { src: "assets/beacon/gallery-beacon-information-schools-sports-2016.webp", alt: "Facing March 24, 2016 Beacon pages combining honor-roll lists, school and sports reporting, reader interaction, and advertising", caption: "Honor Rolls, Schools & Sports · Long student lists, briefs, photography, and reader-response modules are structured for dependable scanning"
      }
    ]
  },

  {
    label: "Advertising & Marketplace",
    thumb: "assets/beacon/gallery-beacon-commercial-lighthouse-2016.webp",
    src: "assets/beacon/gallery-beacon-commercial-lighthouse-2016.webp",
    alt: "Facing Beacon pages balancing community reporting with a varied group of local display advertisements",
    images: [
      {
        src: "assets/beacon/gallery-beacon-commercial-marketplace-1.webp",
        alt: "Facing Beacon pages balancing community reporting with a varied group of local display advertisements",
        caption: "Community News and Local Advertising · Editorial content remains readable beside a varied group of client messages"
      },
      {
        src: "assets/beacon/gallery-beacon-commercial-marketplace-2.webp",
        alt: "Facing Beacon real estate and Summer on the Lake pages with coordinated listings and tourism advertising",
        caption: "Real Estate and Tourism Marketplace · Property listings, sponsor blocks, and seasonal promotion share a disciplined grid"
      },
      {
        src: "assets/beacon/gallery-beacon-commercial-marketplace-3.webp",
        alt: "Facing Beacon pages pairing restaurant and entertainment advertising with high school sports coverage",
        caption: "Local Advertising and Sports Coverage · Revenue pages and editorial content retain distinct voices within one spread"
      },
      {
        src: "assets/beacon/gallery-beacon-commercial-marketplace-5.webp",
        alt: "Facing Beacon classified and service advertising pages with multiple local real estate and business messages",
        caption: "Classified and Service Advertising · Many small-format client messages are organized through consistent alignment and hierarchy"
      },
      { src: "assets/beacon/gallery-beacon-commercial-lighthouse-2016.webp", alt: "Facing September 1, 2016 Beacon pages combining the Light Ramblings lighthouse column with banking, senior-living, retail, and local-service advertising", caption: "Lighthouse Column & Local Marketplace · Substantial editorial copy anchors a varied set of client messages within a clear commercial page structure" },
      { src: "assets/beacon/gallery-beacon-commercial-arts-jobs-2017.webp", alt: "Facing March 23, 2017 Beacon pages with arts and carnival reporting alongside recruitment and business advertising", caption: "Arts Coverage & Recruitment Advertising · Editorial reporting remains prominent while multiple job messages are organized into consistent modules" },
      { src: "assets/beacon/gallery-beacon-commercial-memorial-community-2016.webp", alt: "Facing May 26, 2016 Beacon pages featuring memorial and charity reporting with local display advertising", caption: "Memorial Reporting & Community Sponsors · Documentary photography and substantial local reporting give the spread an editorial center beyond its advertising" },
      { src: "assets/beacon/gallery-beacon-commercial-jobs-community-2017.webp", alt: "Facing April 27, 2017 Beacon pages combining obituaries, the Tell Tales column, community reporting, and employment advertising", caption: "Community Columns & Employment Marketplace · Recurring editorial departments and a modular jobs package create a balanced, useful spread"
      }
    ]
  },

  {
    label: "Award-Winning Advertising",
    thumb: "assets/beacon/gallery-beacon-award-tofts.webp",
    src: "assets/beacon/gallery-beacon-award-tofts.webp",
    alt: "Three award-winning Beacon advertisements designed for local businesses",
    images: [
      { src: "assets/beacon/gallery-beacon-award-tofts.webp", alt: "Toft’s Ice Cream Parlor twentieth-anniversary advertisement with Lake Erie landmarks and illustrated characters", caption: "Toft’s Ice Cream Parlor · MACPA 2017 First Place · Single Ads, Large Space" },
      { src: "assets/beacon/gallery-beacon-award-slaters.webp", alt: "Slater’s Madison Street Pub Halloween party advertisement featuring a zombie illustration", caption: "Slater’s Madison Street Pub · MACPA 2017 Second Place · Restaurant Marketing Campaigns Design" },
      { src: "assets/beacon/gallery-beacon-award-oak-harbor-dental.webp", alt: "Oak Harbor Dental compact new-patient advertisement", caption: "Oak Harbor Dental · MACPA 2016 Second Place · Single Ads, Small Space" }
    ]
  },

  {
    label: "Published Web Edition (12.3 MB)",
    thumb: "assets/beacon/gallery-beacon-front-page-archive-15.webp",
    href: "assets/beacon/gallery-beacon-full.pdf",
    alt: "Open the complete screen-optimized September 22, 2016 edition of The Beacon newspaper",
    linkLabel: "Open the complete September 22, 2016 Beacon web edition"
  }
],
showAllInitially: true
},
    "ncpn-parent-magazine": {
      kicker: "Feature Story / Magazine Art Direction & Production",
      title: "North Coast Parent",
      subtitle: "Monthly family publication art direction · center-spread composition · advertising · complete production",
      noteTitle: "Building a More Engaging Monthly Reading Experience",
      paragraphs: [
        "North Coast Parent was a free regional parenting publication serving families across Ottawa, Erie, and Sandusky counties along Ohio's Lake Erie shoreline. Distributed through community pickup locations such as schools, libraries, medical offices, childcare facilities, and family-oriented businesses, it addressed parents of children from infancy through high school as well as caregivers, grandparents, educators, and healthcare professionals.",
        "The publication already existed when I joined Schaffner Publications in June 2014. I did not design its logo, and I did not initiate the later removal of the word News; Mark Schaffner introduced that logo change in January 2016. My contribution was the issue-by-issue visual direction. Earlier editions could feel underdeveloped because their changing fonts, graphics, colors, and page treatments did not always work together as a deliberate reading experience. My goal was not to reduce that variety. I used a broad mix of typefaces, colors, imagery, and graphics, coordinating them within each issue so the variety felt lively, cohesive, inviting, and worth continuing to read.",
        "Editor Christina Taylor found and supplied the articles and cover copy, generally supplied the cover and interior photography, occasionally suggested graphics, contributed to advertising sales, selected the center-spread topics, and approved every finished issue. I did not write the editorial content or take the photographs. I sourced most of the visual graphics myself from my curated library and the company's MetroCreativeConnection subscription, occasionally selected stock photography there as well, corrected and cropped images, built composites, established hierarchy, and translated Christina's content plan into the complete magazine.",
        "Rather than applying one restrained template to a publication meant for parents and children to share, I treated every month as a new visual assignment. I varied the masthead treatment, typography, color, cover hierarchy, and page composition to match the season and subject. For center spreads, Christina determined the topic and supplied the copy. She often supplied the photography, while I sourced most of the graphics and occasionally the stock photography; I then decided how the entire two-page composition should work.",
        "Most illustrations and decorative elements came from the company's MetroCreativeConnection subscription. I regularly recolored, modified, combined, and recomposed those licensed assets to create new page environments. The center spreads became the clearest expression of that process, turning school dates, family responses, seasonal activities, cultural observances, health information, and community resources into bright, unified editorial experiences.",
        "I also designed many of the client advertisements and created every house ad. For clients who wanted to supply finished advertisements, I created a dedicated production specification sheet for each of Schaffner's four publications—The Beacon, North Coast Business Journal, North Coast Parent, and HOMES. Sales staff used those sheets to give clients the correct dimensions, file requirements, and submission standards before artwork reached production. North Coast Parent was typically a 12-to-16-page monthly newsprint publication. Like The Beacon, North Coast Business Journal, and HOMES, each issue was assembled during a single production day, with editorial and advertising changes accepted until the press-ready pages were due.",
        "I joined Mark Schaffner in an established production operation that had also relied on rotating, short-term graphic designers. Mark initially co-designed the publications with me. After he stopped sharing that production work, my command of keyboard shortcuts, production scripts, naming systems, reusable styles, and efficient workflows allowed me to maintain all four recurring publications and the company's advertising workload without a second designer. The company responded by doubling my pay and moving me to salary. I applied the same CMYK preparation, ink-coverage control, PDF preflight, FileZilla delivery, digital archiving, and Creative Cloud handoff used across the Schaffner publication system."
      ],
      sidebarTitle: "Case Study Notes",
      details: [
        ["Role", "Production Graphic Designer, Jun 2014–Jun 2017; produced North Coast Parent through June 2017, after joining Mark Schaffner and an operation using rotating short-term designers and later becoming the sole designer producing North Coast Parent, The Beacon, North Coast Business Journal, and HOMES"],
        ["Editor", "Christina Taylor sourced and approved copy, generally supplied cover and interior photography, occasionally suggested graphics, selected center-spread topics, supported advertising sales, and approved each issue"],
        ["Design ownership", "Issue-specific masthead treatments, varied typography and color systems, cover hierarchy, complete page composition, center-spread art direction, primary graphics sourcing, image correction and compositing, client advertising, and every North Coast Parent house ad; North Coast Parent logos not designed by me"],
        ["Company-wide ad specifications", "Created a separate production specification sheet for The Beacon, North Coast Business Journal, North Coast Parent, and HOMES so sales staff could give clients supplying finished advertisements the correct dimensions, file requirements, and submission standards"],
        ["Source material", "Most graphics selected by me from my curated library and the company's MetroCreativeConnection subscription; photography generally supplied by the editor, with some stock photography also sourced by me; assets selected, recolored, modified, combined, and composed for final use"],
        ["Production", "Typically 12–16 newsprint pages per monthly issue; complete same-day assembly, CMYK prepress, PDF export, FileZilla/FTP delivery, and digital archiving"],
        ["Tools", "Adobe InDesign · Photoshop · Illustrator · Bridge · Acrobat · Microsoft Office · FileZilla · production scripts · GREP and style-based formatting · Creative Cloud Libraries"],
        ["Operational outcome", "Keyboard shortcuts, production scripts, reusable styles, and efficient workflows made it possible to maintain four recurring publications and high-volume advertising without a second designer; compensation doubled and the role moved to salary"]
      ],
      shows: [
        "Issue-specific cover art direction and masthead treatments",
        "Landscape center-spread design",
        "Seasonal graphic composition and storytelling",
        "Family health, learning, and support resources",
        "Information and interactive design",
        "Recurring departments and sponsor integration",
        "Shared Schaffner production workflow and prepress",
        "Complete published magazine"
      ],
      gallery: [
        {
          label: "Cover Art Direction & Masthead Treatments",
          thumb: "assets/north-coast-parent/thumbs/thumb-north-coast-parent-cover-design.webp",
          src: "assets/north-coast-parent/gallery-north-coast-parent-before-cover-2014.webp",
          alt: "North Coast Parent covers showing the publication's visual direction before and during Adam Thomas Janes's tenure",
          images: [
            { src: "assets/north-coast-parent/gallery-north-coast-parent-before-cover-2014.webp", alt: "January 2014 North Coast Parent News cover created before Adam Thomas Janes joined Schaffner Publications", caption: "Before My Tenure · January 2014 · Competing display styles, cover lines, and decorative treatments show the less consistent visual voice I inherited" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-cover-design-1.webp", alt: "October 2014 North Coast Parent News Halloween cover produced during Adam Thomas Janes's first year", caption: "October 2014 · Early issue-specific cover direction within the inherited North Coast Parent News logo" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-cover-design-2.webp", alt: "October 2015 North Coast Parent News cover featuring a toddler dressed as a black cat", caption: "October 2015 · Stock photography, custom callouts, and selected themed graphics build a focused seasonal cover" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-cover-design-3.webp", alt: "March 2016 North Coast Parent cover featuring a child gathering Easter eggs and the logo introduced by Mark Schaffner", caption: "March 2016 · Mark Schaffner's updated logo is adapted into a bright seasonal masthead treatment with clear issue navigation" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-cover-design-4.webp", alt: "July 2016 North Coast Parent cover featuring children beside a swimming pool", caption: "July 2016 · A summer-specific masthead treatment and full-bleed stock photograph create an immediate family and recreation focus" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-cover-design-5.webp", alt: "December 2016 North Coast Parent cover featuring a child opening holiday presents", caption: "December 2016 · Intimate stock photography and restrained seasonal typography create warmth without visual clutter" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-cover-design-6.webp", alt: "March 2017 North Coast Parent cover featuring a young child painting outdoors", caption: "March 2017 · Confident stock photography, generous space, and an issue-specific masthead treatment support a mature monthly presentation" }
          ]
        },
        {
          label: "Center Spreads",
          thumb: "assets/north-coast-parent/thumbs/thumb-north-coast-parent-center-spreads.webp",
          src: "assets/north-coast-parent/gallery-north-coast-parent-center-spreads-1.webp",
          alt: "Selection of landscape center-spread designs from North Coast Parent magazine",
          images: [
            { src: "assets/north-coast-parent/gallery-north-coast-parent-center-spreads-1.webp", alt: "North Coast Parent Spooky Spectacles graphic-led Halloween center spread", caption: "Spooky Spectacles · Sourced graphics, themed typography, reader submissions, and event information are assembled into a playful editorial centerpiece" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-center-spreads-2.webp", alt: "North Coast Parent Summer Fun center spread with amusement-park graphics and destination listings", caption: "Your Ticket to Summer Fun · Selected amusement-park graphics and structured destination listings make the full-width format work as one composition" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-center-spreads-3.webp", alt: "North Coast Parent Local Art and Culture center spread framed by oversized paintbrush imagery", caption: "Local Art & Culture · Selected art-material imagery frames regional cultural content and creates a distinctive visual stage across the center fold" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-center-spreads-4.webp", alt: "North Coast Parent July Fourth Fireworks and Fun center spread", caption: "Fireworks & Fun · Patriotic graphics, event information, and dramatic color establish a strong seasonal centerpiece" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-center-spreads-5.webp", alt: "North Coast Parent thankfulness center spread featuring responses from local children", caption: "What Are You Thankful For? · A coordinated seasonal graphic system turns many short reader responses into one unified, highly visual spread" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-center-spreads-6.webp", alt: "North Coast Parent Autism Awareness Month center spread with puzzle pieces and child character graphics", caption: "Autism Awareness Month · Educational content, selected symbolic graphics, and accessible hierarchy are balanced across the landscape spread" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-center-spreads-7.webp", alt: "North Coast Parent Back to School center spread with pencil, school bus, and regional start-date graphics", caption: "Back to School · Graphic selection, compositing, and layout turn a dense regional start-date reference into a cheerful, immediately scannable center spread" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-center-spreads-8.webp", alt: "North Coast Parent Diversity in December center spread presenting cultural and religious observances", caption: "Diversity in December · A winter timeline, custom information cards, and varied cultural imagery organize many observances within one landscape composition" }
          ]
        },
        {
          label: "Seasonal Storytelling",
          thumb: "assets/north-coast-parent/thumbs/thumb-north-coast-parent-seasonal-storytelling.webp",
          src: "assets/north-coast-parent/gallery-north-coast-parent-seasonal-storytelling-1.webp",
          alt: "North Coast Parent facing-page spreads using sourced graphics and themed design for family holidays and seasonal stories",
          images: [
            { src: "assets/north-coast-parent/gallery-north-coast-parent-seasonal-storytelling-1.webp", alt: "Facing North Coast Parent Halloween pages combining seasonal savings and a jack-o-lantern dinner feature", caption: "Halloween Departments · Graphic selection and compositing, promotional content, and a themed food feature create a cohesive seasonal spread" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-seasonal-storytelling-2.webp", alt: "Facing North Coast Parent Thanksgiving pages featuring a rainbow turkey craft and family quiz", caption: "Thanksgiving Craft and Quiz · Selected graphics, activity instructions, and interactive content turn the holiday into a playful family package" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-seasonal-storytelling-3.webp", alt: "Facing North Coast Parent pages opening the Once Upon a Time There Was a Grandma holiday feature", caption: "Once Upon a Time There Was a Grandma · Layered holiday imagery and storybook typography introduce a warm multi-page seasonal narrative" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-seasonal-storytelling-4.webp", alt: "Facing North Coast Parent spring pages about eggs, Easter, and Earth Day", caption: "Eggs, Easter, and Earth Day · Graphic selection, composition, and color connect family activities with springtime learning across facing pages" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-seasonal-storytelling-5.webp", alt: "Facing North Coast Parent Valentine pages featuring sensory bottles and Library Lovers Month", caption: "Valentine Activities · A coordinated pink palette unites hands-on family activities, reading promotion, and interactive content" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-seasonal-storytelling-6.webp", alt: "Facing North Coast Parent Christmas pages featuring crafts and a Local Santa story", caption: "Christmas Crafts and Local Santa · Practical activities transition into a dramatic photography-led holiday feature" }
          ]
        },
        {
          label: "Family, Health & Learning",
          thumb: "assets/north-coast-parent/thumbs/thumb-north-coast-parent-family-health-learning.webp",
          src: "assets/north-coast-parent/gallery-north-coast-parent-family-health-learning-1.webp",
          alt: "North Coast Parent facing-page spreads covering family health, education, child development, and support resources",
          images: [
            { src: "assets/north-coast-parent/gallery-north-coast-parent-family-health-learning-1.webp", alt: "Facing North Coast Parent pages explaining healthy weight before pregnancy", caption: "Healthy Weight Before Pregnancy · Long-form health information is made approachable through photography, strong headings, and a continuous two-page reading sequence" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-family-health-learning-2.webp", alt: "Facing North Coast Parent pages covering child development, gestational diabetes, baby essentials, and equipment", caption: "Child Development Resource · Complex health and parenting information is divided into approachable, clearly labeled modules" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-family-health-learning-3.webp", alt: "Facing North Coast Parent back-to-school pages about healthy lunches, IEPs, and student behavior", caption: "Back-to-School Guidance · Nutrition, education planning, and behavioral support are organized into a practical parent resource" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-family-health-learning-4.webp", alt: "Facing North Coast Parent childhood cancer awareness pages centered on the Live Like Bella story", caption: "Childhood Cancer Awareness · Portraiture, statistics, and mission-focused storytelling give a sensitive health feature emotional clarity" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-family-health-learning-5.webp", alt: "Facing North Coast Parent Special Needs Guide pages about services for children and families", caption: "Special Needs Guide · A bold section opener and service-focused reporting create a clear, respectful family resource" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-family-health-learning-6.webp", alt: "Facing North Coast Parent pages featuring women and newborn services alongside a parent question-and-answer column", caption: "Women, Newborns, and Parent Questions · Healthcare information and a recurring advice department share a flexible editorial grid" }
          ]
        },
        {
          label: "Information & Interactive Design",
          thumb: "assets/north-coast-parent/thumbs/thumb-north-coast-parent-information-interactive-design.webp",
          src: "assets/north-coast-parent/gallery-north-coast-parent-information-interactive-design-1.webp",
          alt: "North Coast Parent pages and spreads organizing calendars, activities, guides, advocacy, and practical family information",
          images: [
            { src: "assets/north-coast-parent/gallery-north-coast-parent-information-interactive-design-1.webp", alt: "Facing North Coast Parent contents and January community calendar pages", caption: "Monthly Navigation and Calendar · Contents, issue promotion, and date-driven information are coordinated as a usable planning system" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-information-interactive-design-2.webp", alt: "Facing North Coast Parent lemonade stand feature and reader coloring page", caption: "Alex’s Lemonade Stand · Fundraising information and a participatory coloring page turn advocacy into an accessible family activity" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-information-interactive-design-3.webp", alt: "Facing April 2017 North Coast Parent pages combining family activities, interactive trivia, prom hairstyle guidance, library programs, and a regional Lake Erie travel feature", caption: "April Activities and Regional Resources · Selected illustrations, interactive trivia, varied typography, library listings, and a regional travel feature create two distinct but coordinated information pages" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-information-interactive-design-4.webp", alt: "Facing North Coast Parent International Credit Union Day coloring and financial education pages", caption: "Financial Education Activity · A selected coloring-page graphic and explanatory reporting make an institutional topic approachable for families" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-information-interactive-design-5.webp", alt: "Facing North Coast Parent pages featuring the Teal Pumpkin Project, Halloween safety, and inclusive birthday ideas", caption: "Inclusive Seasonal Activities · Selected Halloween graphics and a birthday-planning feature organize safety, accessibility, and family advice across facing pages" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-birthday-celebration-spread.webp", alt: "Facing North Coast Parent pages pairing an active-kids feature and advertising with a Birthday Celebration feature", caption: "Active Kids and Birthday Celebration · Selected character art, advertising, layered party graphics, a vivid palette, and varied typography create an energetic facing-page sequence" }
          ]
        },
        {
          label: "Departments & Sponsor Integration",
          thumb: "assets/north-coast-parent/thumbs/thumb-north-coast-parent-departments-partner-integration.webp",
          src: "assets/north-coast-parent/gallery-north-coast-parent-departments-partner-integration-1.webp",
          alt: "North Coast Parent spreads showing recurring departments, community promotion, and sponsor integration",
          images: [
            { src: "assets/north-coast-parent/gallery-north-coast-parent-departments-partner-integration-1.webp", alt: "Facing North Coast Parent student mentoring and Dinner on the Fly pages", caption: "Mentoring and Dinner on the Fly · Youth achievement reporting transitions into a highly branded recurring food department" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-departments-partner-integration-2.webp", alt: "Facing North Coast Parent dinner feature and pediatric-services advertisement", caption: "Editorial and Sponsor Balance · A recurring food department sits comfortably beside a healthcare partner without losing hierarchy" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-departments-partner-integration-3.webp", alt: "Facing North Coast Parent summer grilling feature and pediatric therapy advertisement", caption: "Summer Department and Healthcare Sponsor · Seasonal editorial content and a recurring service advertiser retain distinct, coordinated identities" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-departments-partner-integration-4.webp", alt: "Facing North Coast Parent ice cream feature and pediatric therapy advertisement", caption: "Seasonal Food and Service Advertising · A playful summer recipe department leads naturally into a dependable healthcare sponsor page" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-departments-partner-integration-5.webp", alt: "Facing North Coast Parent radio advertising and community campaign pages", caption: "Regional Promotion and Community Campaigns · Commercial messaging and cause-based editorial content remain clearly separated but visually compatible" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-departments-partner-integration-6.webp", alt: "Facing North Coast Parent holiday community advertising and Dinner on the Fly pages", caption: "Holiday Sponsor and Food Department · Community promotion and a festive recurring recipe page close the issue with consistent seasonal styling" }
          ]
        },
        {
          label: "Published Web Edition (4.5 MB)",
          thumb: "assets/north-coast-parent/thumbs/thumb-north-coast-parent-published-magazine.webp",
          href: "assets/north-coast-parent/gallery-north-coast-parent-full.pdf",
          alt: "Open a complete screen-optimized issue of North Coast Parent magazine",
          linkLabel: "Open the complete North Coast Parent web edition"
        }
      ]
    },

    "archive-campaigns": {
      kicker: "Archive Collection / Advertising Design",
      title: "Selected Advertising",
      subtitle: "Client campaigns · multiple markets · three award winners",
      noteTitle: "A Curated Working Archive",
      paragraphs: ["This collection is intentionally selective. It shows the range of advertising I produced for real businesses without asking a visitor to sort through hundreds of near-duplicate weekly files.", "Most pieces were created within Schaffner Publications from sales-team or client direction; selected work completed after my June 2017 departure is identified as freelance Fiverr work in its caption. Whether working through a publication or directly with a freelance client, I established the hierarchy, selected or repaired imagery and logos, refined copy when useful, designed the piece, and prepared it for its intended print format."],
      sidebarTitle: "Collection Notes",
      details: [["Role", "Advertising design, image and logo sourcing, supplied-file repair, copy recommendations, and print preparation across in-house publication work and clearly labeled freelance Fiverr projects."], ["Approach", "Marketing judgment and contrast, repetition, alignment, and proximity shaped each message for its intended audience."], ["Recognition", "Three Beacon advertisements received Midwest Advertising and Publishing Association awards."]],
      shows: ["Advertising design", "Market-specific hierarchy", "Fast production", "Prepress judgment"],
      filters: [["all", "All selected"], ["awards", "Award-winning"], ["hospitality", "Hospitality & tourism"], ["events", "Events & entertainment"], ["automotive", "Automotive & marine"], ["retail", "Retail & services"], ["professional", "Professional & community"], ["recruitment", "Recruitment & education"]],
      continuousViewer: true,
      gallery: archiveAdGallery()
    },
    "archive-best-of-best": {
      kicker: "Archive Case Study / Identity & Publication",
      title: "Best of the Best",
      subtitle: "Reader-voted program · reusable identity · annual guide",
      noteTitle: "Recognition Made Visible",
      paragraphs: ["I personally designed the lighthouse-and-laurel seal for The Beacon’s reader-voted Best of the Best program, then extended it into an annual guide and a practical recognition system for local businesses.", "Winners were proud to display plaques carrying their category title. I prepared reusable color and one-color identity files and left adaptable masters so future staff could update the year without rebuilding the program."],
      sidebarTitle: "Project Notes",
      details: [["Role", "Identity design, publication layout, advertising integration, production, and reusable master-file preparation."], ["Identity", "An original lighthouse and laurel seal connected local recognition with the Lake Erie market."], ["Use", "Guide covers, winner plaques, promotional materials, advertisements, and future annual editions."]],
      shows: ["Identity ownership", "Publication design", "Community recognition", "Reusable production system"],
      continuousViewer: true,
      gallery: bestOfBestGallery()
    },
    "archive-parade-of-homes": {
      kicker: "Archive Case Study / Identity & Event Publication",
      title: "Parade of Homes",
      subtitle: "Event identity · mapped tour · builder publication",
      noteTitle: "One Event, One Complete System",
      paragraphs: ["I designed the Parade of Homes logo and built the event publication from materials supplied by the sales team and participating builders. I sourced the base maps, created the property markers, and organized the route so visitors could understand the tour quickly.", "The same identity carried through the guide, property pages, promotional advertisements, and sales materials, creating a repeatable system used across the 2015 and 2016 events."],
      sidebarTitle: "Project Notes",
      details: [["Role", "Logo design, publication layout, map preparation, property markers, advertising, and print production."], ["Collaboration", "The Beacon, Herman’s, participating builders, and the publication sales team."], ["System", "A stable event identity and page structure that could absorb new homes, maps, and sponsor material."]],
      shows: ["Logo design", "Information mapping", "Event publication", "Integrated promotion"],
      continuousViewer: true,
      gallery: paradeOfHomesGallery()
    },
    "archive-homes": {
      kicker: "Archive Case Study / Real Estate Publication",
      title: "HOMES",
      subtitle: "Monthly covers · listing advertising · complete production",
      noteTitle: "Recurring Real-Estate Production",
      paragraphs: ["HOMES was a recurring monthly real-estate publication assembled in InDesign from sales-supplied property information and photography. I designed the seasonal covers, created the advertising that filled each issue, maintained the publication’s established structure, corrected and organized supplied imagery, and delivered complete print-ready editions as part of Schaffner Publications’ production schedule.", "The selected covers show seasonal range; the interior pages show the less glamorous but equally important production work—organizing dense property information, adapting distinct advertiser systems, maintaining legibility, and delivering reliable monthly output."],
      sidebarTitle: "Project Notes",
      details: [["Role", "Cover design, real-estate advertising, complete issue assembly, image preparation, preflight, and printer delivery."], ["Inputs", "Property information and photography supplied through the sales workflow."], ["System", "A stable publication template adapted to changing listings, advertisers, and seasonal cover concepts."]],
      shows: ["Seasonal cover design", "Real-estate advertising", "Recurring publication systems", "Complete production ownership"],
      continuousViewer: true,
      gallery: homesGallery()
    },
    "archive-beacon-front-pages": {
      kicker: "Archive Issue / The Beacon",
      title: "Beacon Front-Page Archive",
      subtitle: "23 additional covers · weekly newspaper design · 2015–2017",
      noteTitle: "A Weekly Visual Record",
      paragraphs: ["This archive presents 23 additional front pages selected from the complete Beacon run. It extends the 12-cover featured gallery without repeating any of those primary portfolio selections.", "Across breaking news, community events, environmental reporting, elections, sports, holidays, and regional traditions, each cover solves a different editorial problem while maintaining a recognizable weekly publication identity."],
      sidebarTitle: "Collection Notes",
      details: [["Scope", "Twenty-three additional front pages chosen from 122 supplied editions."], ["Featured", "The primary Beacon gallery separately presents 12 selected covers."], ["Archive", "Every cover here is unique to the archive and shows sustained range, pace, and production consistency."], ["Period", "Selected work from 2015 through 2017."]],
      shows: ["Front-page hierarchy", "Photography-led storytelling", "Special-issue design", "Sustained weekly production"],
      continuousViewer: true,
      gallery: beaconFrontPageGallery()
    },
    "archive-ncpn-back-issues": {
      kicker: "Archive Issue / North Coast Parent",
      title: "North Coast Parent Back Issues",
      subtitle: "Five archive galleries · fifteen additional selections · 2014–2017",
      noteTitle: "A Broader Editorial Record",
      paragraphs: ["These five galleries preserve fifteen worthwhile North Coast Parent selections that complement the feature without repeating any complete spread. The groupings are based on the communication problem each layout solves rather than on a single month or isolated page type.", "The expanded archive reaches back to 2014 and adds evidence of recurring monthly production, reader navigation, family-service communication, sponsor integration, educational content, community storytelling, and dense regional resource design while keeping the main feature concentrated on the strongest covers, center spreads, and editorial systems."],
      sidebarTitle: "Collection Notes",
      details: [["Scope", "Fifteen additional pages and facing-page selections organized into five archive galleries."], ["Selection", "Only unique layouts with a clear portfolio purpose that do not repeat the featured gallery or one another."], ["Role", "Editorial layout, sourced-graphic compositing, information hierarchy, advertising integration, and print production."], ["Navigation", "Open a category, then use the on-screen Previous and Next controls or the left and right arrow keys to cycle through its examples."]],
      shows: ["Monthly planning and reader navigation", "Family services and sponsor communication", "Early publication voice and community reporting", "Reader participation and regional resource systems"],
      gallery: [
        {
          label: "Monthly Planning & Reader Navigation",
          src: "assets/north-coast-parent/gallery-north-coast-parent-activities-information-design-1.webp",
          alt: "Facing May 2016 North Coast Parent contents and community-calendar pages",
          images: [
            { src: "assets/north-coast-parent/gallery-north-coast-parent-activities-information-design-1.webp", alt: "Facing May 2016 North Coast Parent contents and community-calendar pages", caption: "May Contents and Community Calendar · Color, compact modules, and a clear calendar structure help readers scan a dense monthly information package" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-activities-information-design-2.webp", alt: "Facing March 2017 North Coast Parent contents and community-calendar pages", caption: "March Contents and Community Calendar · Repeated navigation conventions create continuity while the seasonal palette gives the issue its own identity" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-activities-information-design-3.webp", alt: "Facing April 2016 North Coast Parent community-calendar and library-program pages", caption: "April Calendar and Library Program · A structured events page transitions into a colorful family-activity promotion without losing reader orientation" }
          ]
        },
        {
          label: "Family Services & Sponsor Communication",
          src: "assets/north-coast-parent/gallery-north-coast-parent-activities-information-design-5.webp",
          alt: "Facing October 2015 North Coast Parent pages combining family health information and service promotion",
          images: [
            { src: "assets/north-coast-parent/gallery-north-coast-parent-activities-information-design-5.webp", alt: "Facing October 2015 North Coast Parent pages combining a family dental article, regional radio promotion, and pediatric services information", caption: "Family Dental and Pediatric Services · Long-form information, promotional content, and a structured healthcare service page remain distinct across the spread" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-marketing-integration-2.webp", alt: "Facing May 2016 North Coast Parent sponsor pages for speech and hearing services, local radio, and a family attraction", caption: "Regional Services and Family Attractions · Varied sponsor messages are sequenced into a clear, production-ready advertising spread" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-marketing-integration-3.webp", alt: "Facing March 2017 North Coast Parent maple fondue department and pediatric services sponsor page", caption: "Food Department and Healthcare Sponsor · A photography-led recurring page sits beside a dense service advertisement while both retain clear, independent identities" }
          ]
        },
        {
          label: "Family Learning & Community Stories",
          src: "assets/north-coast-parent/gallery-north-coast-parent-family-life-learning-2.webp",
          alt: "Facing March 2017 North Coast Parent pages about career learning, a community benefit, and mentoring",
          images: [
            { src: "assets/north-coast-parent/gallery-north-coast-parent-family-life-learning-2.webp", alt: "Facing March 2017 North Coast Parent pages about optometry, a bowling benefit, and a mentoring spotlight", caption: "Career Learning and Mentor Spotlight · Educational, promotional, and community-profile content remain distinct within one balanced facing-page sequence" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-family-life-learning-4.webp", alt: "Facing April 2016 North Coast Parent pages combining a family column, autism information, and a community fundraiser", caption: "Family Column and Community Support · Strong section changes, selected graphics, and modular hierarchy organize several voices and service messages" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-family-life-learning-5.webp", alt: "Facing February 2017 North Coast Parent pages about Groundhog Day, Presidents Day, the Underground Railroad, and Huron history", caption: "Presidents Day and Local History · Selected historical imagery, section changes, and a coordinated palette connect several regional and national stories across the spread" }
          ]
        },
        {
          label: "Early Publication Voice & Community Reporting",
          src: "assets/north-coast-parent/gallery-north-coast-parent-early-publication-voice-1.webp",
          alt: "Facing September 2014 North Coast Parent pages with family columns, education promotion, youth aviation reporting, and pediatric services",
          images: [
            { src: "assets/north-coast-parent/gallery-north-coast-parent-early-publication-voice-1.webp", alt: "Facing September 2014 North Coast Parent pages with family columns, education promotion, youth aviation reporting, and pediatric services", caption: "Family Columns and Junior Pilot Camp · September 2014, pages 4–5 · Distinct voices, selected graphics, youth photography, and sponsor content share a lively early-issue spread" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-early-publication-voice-2.webp", alt: "Facing September 2014 North Coast Parent pages about school-bus safety, medical-assisting education, back-to-school health, and regional resources", caption: "School Safety and Back-to-School Information · September 2014, pages 8–9 · Strong color bands, photography, service reporting, and a compact resource directory organize a dense information spread" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-early-publication-voice-3.webp", alt: "Facing September 2014 North Coast Parent photo page and family nutrition department", caption: "North Coast Snapshot and Dinner on the Fly · September 2014, pages 10–11 · A playful photo-board composition faces a clean, highly scannable nutrition department" }
          ]
        },
        {
          label: "Reader Participation & Regional Resources",
          src: "assets/north-coast-parent/gallery-north-coast-parent-reader-resources-1.webp",
          alt: "September 2014 North Coast Parent facing-page directory of regional library events",
          images: [
            { src: "assets/north-coast-parent/gallery-north-coast-parent-reader-resources-1.webp", alt: "September 2014 North Coast Parent facing-page directory of regional library events", caption: "Local Library Events · September 2014, pages 12–13 · A single information system coordinates many institutions, dates, and program types across a true two-page field" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-family-life-learning-1.webp", alt: "Facing January 2017 North Coast Parent pages combining civic history, a family column, and a regional trivia activity", caption: "Civic History and Reader Interaction · January 2017, pages 4–5 · Sourced imagery, family commentary, and a participatory trivia module create a varied but coherent reader experience" },
            { src: "assets/north-coast-parent/gallery-north-coast-parent-activities-information-design-4.webp", alt: "Facing May 2016 North Coast Parent pages with graduation schedules, Mother's Day quotations, and sponsor communication", caption: "Graduation Milestones and Mother's Day · May 2016, pages 13–14 · Structured scheduling, celebratory typography, and compact editorial modules make seasonal information easy to navigate" }
          ]
        }
      ]
    },
    "archive-ncbj-editorial-spreads": {
      kicker: "Archive Issue / North Coast Business Journal",
      title: "Typography & Editorial Spreads",
      subtitle: "Twelve unused spreads · three focused galleries · 2015–2016",
      noteTitle: "A Deeper Publication Record",
      paragraphs: ["This archive preserves twelve additional North Coast Business Journal facing-page spreads that were not used in the primary feature. Each selection earns its place through typography, hierarchy, editorial pacing, photography, or the way recurring business content is organized across a real publication spread.", "The stronger page may drive a selection even when its facing page is more utilitarian. Keeping both pages visible preserves the rhythm of the publication and shows how editorial stories, columns, departments, and advertiser-supported content function together in print."],
      sidebarTitle: "Collection Notes",
      details: [["Scope", "Twelve unused facing-page spreads organized into three editorial galleries."], ["Selection", "Every spread is unique within the NCBJ feature and archive collections."], ["Role", "Editorial layout, typography, image preparation, advertising integration, issue pacing, and print production."], ["Navigation", "Open a category, then use the on-screen Previous and Next controls or the left and right arrow keys to cycle through its examples."]],
      shows: ["Long-form typography and business columns", "Regional growth and institutional reporting", "Recurring departments and community pages", "Sustained monthly publication design"],
      gallery: [
        {
          label: "Business Columns & Long-Form Typography",
          src: "assets/north-coast-business-journal/archive/archive-ncbj-2015-11-pages-18-19.webp",
          alt: "Facing November 2015 North Coast Business Journal pages with human-resources and insurance columns plus community photographs",
          images: [
            { src: "assets/north-coast-business-journal/archive/archive-ncbj-2015-11-pages-18-19.webp", alt: "Facing November 2015 North Coast Business Journal human-resources and insurance columns with community photographs", caption: "Human Resources and Insurance · November 2015, pages 18–19 · Strong department labels, disciplined columns, and a photo rail keep professional advice and community updates distinct" },
            { src: "assets/north-coast-business-journal/archive/archive-ncbj-2015-12-pages-28-29.webp", alt: "Facing December 2015 North Coast Business Journal pages about a solar energy project and regional medical specialists", caption: "Solar Energy and Medical Leadership · December 2015, pages 28–29 · Dense reporting, portraits, project photography, and restrained display type create a credible institutional spread" },
            { src: "assets/north-coast-business-journal/archive/archive-ncbj-2016-02-pages-06-07.webp", alt: "Facing February 2016 North Coast Business Journal legal and insurance columns beside a library feature", caption: "Professional Columns and Civic Feature · February 2016, pages 6–7 · Recurring column typography transitions into an architecture-led library story without losing reader orientation" },
            { src: "assets/north-coast-business-journal/archive/archive-ncbj-2016-11-pages-20-21.webp", alt: "Facing November 2016 North Coast Business Journal sales and legal pages with ribbon-cutting photographs", caption: "Sales, Legal, and Business Openings · November 2016, pages 20–21 · Bold department names, long-form columns, and a horizontal photo sequence balance advice with regional business activity" }
          ]
        },
        {
          label: "Regional Growth & Institutional Stories",
          src: "assets/north-coast-business-journal/archive/archive-ncbj-2015-10-pages-24-25.webp",
          alt: "Facing October 2015 North Coast Business Journal pages about human resources, credit-union expansion, and a medical complex",
          images: [
            { src: "assets/north-coast-business-journal/archive/archive-ncbj-2015-10-pages-24-25.webp", alt: "Facing October 2015 North Coast Business Journal pages about human resources, credit-union expansion, and a medical complex", caption: "Regional Expansion and Workplace Advice · October 2015, pages 24–25 · A multi-story grid combines portraits, construction photography, architectural imagery, and clear headline scale" },
            { src: "assets/north-coast-business-journal/archive/archive-ncbj-2016-02-pages-28-29.webp", alt: "Facing February 2016 North Coast Business Journal pages featuring a regional tourism award and business reporting", caption: "Tourism Recognition and Regional Business · February 2016, pages 28–29 · An oversized award graphic and event photography give a dense closing spread a clear visual entry point" },
            { src: "assets/north-coast-business-journal/archive/archive-ncbj-2016-04-pages-06-07.webp", alt: "Facing April 2016 North Coast Business Journal library and manufacturing stories with process photography", caption: "Library and Manufacturing Futures · April 2016, pages 6–7 · Archival imagery and a three-image process sequence support two distinct institutional stories across a shared editorial grid" },
            { src: "assets/north-coast-business-journal/archive/archive-ncbj-2016-08-pages-12-13.webp", alt: "Facing August 2016 North Coast Business Journal pages about local history, a makerspace, and hospital growth", caption: "History, Education, and Healthcare Growth · August 2016, pages 12–13 · Historic photographs, project imagery, and an architectural rendering create a varied but controlled regional-development spread" }
          ]
        },
        {
          label: "Recurring Departments & Community Pages",
          src: "assets/north-coast-business-journal/archive/archive-ncbj-2016-05-pages-12-13.webp",
          alt: "Facing May 2016 North Coast Business Journal pages celebrating BGSU Firelands and Main Street Vermilion",
          images: [
            { src: "assets/north-coast-business-journal/archive/archive-ncbj-2016-05-pages-12-13.webp", alt: "Facing May 2016 North Coast Business Journal pages celebrating BGSU Firelands and Main Street Vermilion", caption: "Anniversary and Main Street Stories · May 2016, pages 12–13 · A commemorative emblem, supporting photographs, and varied headline scale organize two community narratives" },
            { src: "assets/north-coast-business-journal/archive/archive-ncbj-2016-08-pages-27-28.webp", alt: "Facing August 2016 North Coast Business Journal chamber calendar and On the Move department pages", caption: "Chamber Calendars and On the Move · August 2016, pages 27–28 · Compact scheduling, repeated portrait modules, and consistent department styling support quick monthly scanning" },
            { src: "assets/north-coast-business-journal/archive/archive-ncbj-2016-11-pages-12-13.webp", alt: "Facing November 2016 North Coast Business Journal tax and regional community pages", caption: "Tax Guidance and Community Updates · November 2016, pages 12–13 · A formal advice column gives way to modular local stories while alignment and typography hold the spread together" },
            { src: "assets/north-coast-business-journal/archive/archive-ncbj-2016-12-pages-12-13.webp", alt: "Facing December 2016 North Coast Business Journal legal and community business pages", caption: "Legal Guidance and Community Business · December 2016, pages 12–13 · Consistent department typography, brief photo stories, and advertiser-supported modules create a practical year-end spread" }
          ]
        }
      ]
    },
    "archive-portfolio-website": {
      kicker: "Living Case Study / AI-Assisted Static Portfolio",
      title: "Portfolio Website",
      subtitle: "Creative direction · information architecture · content curation · AI-assisted implementation · 2026–present",
      noteTitle: "From Résumé Site to Editorial System",
      paragraphs: ["This portfolio began as a résumé-first static site and evolved through saved milestone builds into an editorial system for explaining publication, brand, advertising, and web work.", "I directed the structure, visual language, copy, curation, asset standards, and quality assurance. I used Codex as an implementation partner for HTML, CSS, and JavaScript, then reviewed the work in the browser and revised it through repeated content, accessibility, and performance audits.", "The version history records substantive decisions: unifying the résumé and professional positioning, treating the site as a publication, turning the Archive into issue-like case studies, separating services from method, strengthening accessibility and prepress-minded quality control, and curating authentic project evidence.", "The current site remains framework-free and lightweight. Reusable data-driven galleries, WebP assets, semantic overlays, keyboard support, reduced-motion behavior, and written documentation make it maintainable without hiding how it was built.", "Rather than presenting every saved ZIP, this case study selects milestone versions that show how the design and communication system matured. New verified improvements and outcomes can be added as the living site continues to evolve."],
      sidebarTitle: "Project Notes",
      details: [["Role", "Creative direction, information architecture, copy, curation, asset preparation, prompt direction, browser review, and quality assurance."], ["Build", "Semantic HTML, CSS, vanilla JavaScript, and Codex-assisted implementation; versioned with Git and hosted by Netlify."], ["System", "Editorial feature stories, service positioning, a searchable Archive, reusable galleries, and responsive layouts."], ["Status", "Self-initiated living site with a documented design history, 2026–present."]],
      shows: ["A clear progression from early concept to production system", "Human-directed AI collaboration stated without exaggeration", "Editorial information architecture and reusable components", "Accessibility, performance, and asset-production standards", "Selective documentation of meaningful decisions rather than version-number clutter"],
      continuousViewer: true,
      gallery: [
        { label: "01 · Early Editorial Concept", src: "assets/portfolio-website/history-v15-editorial-concept.webp", alt: "Early portfolio homepage with warm paper texture, CMYK registration lines, oversized name typography, and résumé-first positioning", caption: "Early Editorial Concept · Warm paper, CMYK registration lines, oversized type, and a résumé-first structure established the visual voice" },
        { label: "02 · Cohesive Positioning", src: "assets/portfolio-website/history-v33-cohesive-portfolio.webp", alt: "Early cohesive portfolio homepage combining Adam's portrait, communications positioning, résumé access, and selected work", caption: "Cohesive Positioning · The résumé, portrait, services, search foundations, and communications positioning were brought into one production-ready static site" },
        { label: "03 · Portfolio as Publication", src: "assets/portfolio-website/history-v521-archive-system.webp", alt: "Editorial portfolio milestone with feature cards, running navigation, folio details, and publication-inspired structure", caption: "Portfolio as Publication · Running heads, folios, issue framing, feature cards, and an editorial Archive turned the portfolio into a readable publication system" },
        { label: "04 · Practice and Method Separated", src: "assets/portfolio-website/history-v550-method-separation.webp", alt: "Portfolio milestone separating service capabilities from the project method and working sequence", caption: "Practice and Method Separated · Services describe what I can deliver; Method explains how research, design, production, review, and handoff work" },
        { label: "05 · Accessibility and Production Hardening", src: "assets/portfolio-website/history-v5110-accessibility-prepress.webp", alt: "Portfolio feature system after accessibility, production, and prepress-minded refinements", caption: "Accessibility and Production Hardening · Semantic navigation, keyboard behavior, focus management, reduced motion, asset standards, and prepress-minded quality checks became part of the design" },
        { label: "06 · Editorial Curation", src: "assets/portfolio-website/history-v5120-editorial-curation.webp", alt: "Refined portfolio feature system with curated project evidence and optimized editorial imagery", caption: "Editorial Curation · Authentic project evidence, corrected ownership language, paired spreads, optimized WebP assets, and selective galleries replaced placeholders and repetition" },
        { label: "07 · Current Editorial Home", src: "assets/portfolio-website/gallery-portfolio-website-home.webp", alt: "Current portfolio homepage with publication-inspired masthead, professional positioning, and primary calls to action", caption: "Current Editorial Home · The mature system keeps the original editorial character while making Adam's role, specialties, selected work, availability, and next steps immediately clear" },
        { label: "08 · Living Case-Study System", src: "assets/portfolio-website/gallery-portfolio-website-archive.webp", alt: "Current portfolio Archive interface with project previews and issue navigation", caption: "Living Case-Study System · Reusable issue and gallery patterns preserve substantial project evidence without turning the main page into an unfiltered file dump" }
      ]
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
      gallery: archiveAdGallery([0,4,1,5,2,3])
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
      gallery: archiveAdGallery([4,0,5,1,2,3])
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
      gallery: archiveAdGallery([5,0,1,4,2,3])
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
      gallery: archiveAdGallery([0,5,4,1,2,3])
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
      gallery: archiveAdGallery([4,1,0,2,5,3])
    },
    "archive-awards": {
      kicker: "Archive Issue / Awards",
      title: "Award-Winning Beacon Advertising",
      subtitle: "Three MACPA-recognized local-business advertisements",
      noteTitle: "Issue Cover",
      paragraphs: ["These three advertisements were created for Beacon clients from sales-supplied copy and available client material. I developed the visual direction, typography, color, hierarchy, image treatment, and press-ready production, often locating usable logos or imagery and recommending message improvements.", "Together they show range across a large illustrated anniversary promotion, a restaurant event campaign, and a highly constrained small-space service advertisement."],
      sidebarTitle: "Project Notes",
      details: [["Recognition", "Three Midwest Advertising and Publishing Association awards across 2016 and 2017."], ["Role", "Advertising concept development, graphic sourcing, typography, color, layout, production, and marketing-informed recommendations from sales and client direction."], ["Clients", "Toft’s Ice Cream Parlor · Slater’s Madison Street Pub · Oak Harbor Dental"]],
      shows: ["Large-space advertising", "Restaurant campaign design", "Small-space information hierarchy", "Award-recognized print production"],
      gallery: [ARCHIVE_ADS[0], ARCHIVE_ADS[1], ARCHIVE_ADS[2]]
    }
  };

  const triggers = document.querySelectorAll("[data-archive-issue]");
  const closeButtons = overlay.querySelectorAll("[data-archive-issue-close]");
  const firstClose = overlay.querySelector(".archive-issue-close");
  const mediaGrid = overlay.querySelector(".archive-media-grid");
  const galleryFilters = overlay.querySelector(".archive-gallery-filters");
  const mediaViewer = overlay.querySelector(".archive-media-viewer");
  const mediaViewerImg = overlay.querySelector(".archive-media-viewer-img");
  const mediaViewerCaption = overlay.querySelector(".archive-media-viewer-caption");
  const issueSpread = overlay.querySelector(".archive-issue-spread");
  const viewerClose = overlay.querySelector(".archive-media-viewer-close");
  const viewerPrevious = overlay.querySelector(".archive-media-viewer-prev");
  const viewerNext = overlay.querySelector(".archive-media-viewer-next");
  const backgroundRegions = [...document.body.children].filter((element) => element !== overlay && element.tagName !== "SCRIPT");
  let lastFocus = null;
  let lastViewerFocus = null;
  let currentIssueKey = "archive-campaigns";
  let fullGallery = [];
  let currentGallery = [];
  let activeGalleryFilter = "all";
  let currentGalleryIndex = 0;
  let currentViewerImages = [];
  let currentViewerIndex = 0;
  let visibleGalleryCount = 8;
  const GALLERY_BATCH_SIZE = 8;


  const FEATURE_ISSUE_KEYS = [
    "editorial-newspaper-template",
    "camp-perry-brand-system",
    "north-coast-business-journal",
    "beacon-newspaper-production",
    "ncpn-parent-magazine",
    "atj-identity-system"
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

  function galleryItemMarkup(item, index) {
    const label = item.label || `Item ${index + 1}`;
    const itemNumber = String(index + 1).padStart(3, "0");
    const firstNestedImage = Array.isArray(item.images) && item.images.length ? item.images[0] : null;
    const previewSource = item.thumb || item.src || firstNestedImage?.src;
    const hasViewerContent = Boolean(item.src || firstNestedImage?.src);
    const publicationFeatureKeys = [
      "beacon-newspaper-production",
      "ncpn-parent-magazine",
      "north-coast-business-journal"
    ];
    const spreadArchiveKeys = [
      "archive-ncpn-back-issues",
      "archive-ncbj-editorial-spreads"
    ];
    const isPublicationCover = /front[ -]?page|cover|published/i.test(label);
    const isSpreadPreview = item.layout === "spread"
      || spreadArchiveKeys.includes(currentIssueKey)
      || (publicationFeatureKeys.includes(currentIssueKey) && !isPublicationCover);
    const artClass = `archive-media-art${isSpreadPreview ? " is-spread-preview" : ""}`;

    if (item.href && previewSource) {
      return `<a class="archive-media-card has-image" data-gallery-index="${index}" href="${item.href}" target="_blank" rel="noopener noreferrer" aria-label="${item.linkLabel || `Open ${label}`}"><span class="${artClass}"><img src="${previewSource}" alt="${item.alt || label}" loading="lazy" decoding="async"></span><span class="archive-media-caption"><small>${itemNumber}</small><strong>${label}</strong></span></a>`;
    }

    if (hasViewerContent) {
      return `<button type="button" class="archive-media-card has-image" data-gallery-index="${index}" data-media-index="${index}" aria-label="View ${label}${item.images?.length > 1 ? ` carousel with ${item.images.length} images` : " at full size"}"><span class="${artClass}"><img src="${previewSource}" alt="${item.alt || firstNestedImage?.alt || label}" loading="lazy" decoding="async"></span><span class="archive-media-caption"><small>${itemNumber}</small><strong>${label}</strong></span></button>`;
    }

    return `<button type="button" class="archive-media-card" data-gallery-index="${index}" data-media-index="${index}"><span class="archive-media-art archive-media-placeholder"><span>${label}</span></span><span class="archive-media-caption"><small>${itemNumber}</small><strong>${label}</strong></span></button>`;
  }

  function renderGalleryGrid({ focusIndex = null } = {}) {
    if (!mediaGrid) return;
    const visibleItems = currentGallery.slice(0, visibleGalleryCount);
    const remaining = Math.max(0, currentGallery.length - visibleItems.length);
    const moreMarkup = remaining
      ? `<button class="archive-gallery-more" type="button" data-gallery-more aria-label="Show more portfolio images">Show ${Math.min(GALLERY_BATCH_SIZE, remaining)} more <span>${remaining} remaining</span></button>`
      : "";

    mediaGrid.innerHTML = visibleItems.map(galleryItemMarkup).join("") + moreMarkup;
    if (focusIndex !== null) {
      requestAnimationFrame(() => mediaGrid.querySelector(`[data-gallery-index="${focusIndex}"]`)?.focus());
    }
  }

  function renderGalleryFilters(issue) {
    if (!galleryFilters) return;
    const filters = Array.isArray(issue.filters) ? issue.filters : [];
    galleryFilters.hidden = filters.length === 0;
    galleryFilters.replaceChildren();

    filters.forEach(([value, label]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "archive-gallery-filter";
      button.dataset.galleryFilter = value;
      button.textContent = label;
      button.setAttribute("aria-pressed", String(value === activeGalleryFilter));
      galleryFilters.appendChild(button);
    });
  }

  function setIssueContent(issueKey) {
    const issue = ARCHIVE_ISSUES[issueKey] || ARCHIVE_ISSUES["camp-perry-brand-system"];
    currentIssueKey = issueKey;
    fullGallery = issue.gallery || [];
    activeGalleryFilter = "all";
    currentGallery = fullGallery;
    visibleGalleryCount = issue.showAllInitially ? fullGallery.length : GALLERY_BATCH_SIZE;

    overlay.querySelector(".archive-issue-kicker").textContent = issue.kicker;
    overlay.querySelector("#archive-issue-title").textContent = issue.title;
    overlay.querySelector(".archive-issue-subtitle").textContent = issue.subtitle;
    overlay.querySelector(".archive-issue-main h3").textContent = issue.noteTitle;

    const main = overlay.querySelector(".archive-issue-main");
    const galleryGrid = main.querySelector(".archive-media-grid");
    const paragraphAnchor = galleryFilters || galleryGrid;
    main.querySelectorAll(":scope > p:not(.archive-issue-note)").forEach((paragraph) => paragraph.remove());
    (issue.paragraphs || []).forEach((text) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      main.insertBefore(paragraph, paragraphAnchor);
    });

    renderGalleryFilters(issue);
    renderGalleryGrid();

    overlay.querySelector(".archive-issue-note").textContent = issue.gallery?.some(
      item => item.src || item.href || (Array.isArray(item.images) && item.images.length)
    )
      ? "Select a gallery item to view its images or open the complete publication."
      : "This archive entry is presented through its project story and production notes.";
    overlay.querySelector(".archive-issue-sidebar h3").textContent = issue.sidebarTitle;

    const dl = overlay.querySelector(".archive-issue-sidebar dl");
    dl.innerHTML = issue.details.map(([term, desc]) => `<dt>${term}</dt><dd>${desc}</dd>`).join("");

    const linksPanel = overlay.querySelector(".archive-issue-links");
    const linksList = linksPanel?.querySelector(".archive-issue-links-list");
    const externalLinks = Array.isArray(issue.links) ? issue.links : [];
    if (linksPanel && linksList) {
      linksList.replaceChildren();
      externalLinks.forEach((item) => {
        const entry = document.createElement("div");
        entry.className = "archive-issue-link-entry";

        const link = document.createElement("a");
        link.href = item.href;
        link.className = "archive-download-action";
        if (item.download) {
          link.setAttribute("download", "");
        } else {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        }
        link.textContent = item.label;
        entry.appendChild(link);

        if (item.note) {
          const note = document.createElement("p");
          note.textContent = item.note;
          entry.appendChild(note);
        }

        linksList.appendChild(entry);
      });
      linksPanel.hidden = externalLinks.length === 0;
    }

    const list = overlay.querySelector(".archive-issue-sidebar ul");
    list.innerHTML = issue.shows.map(item => `<li>${item}</li>`).join("");

    const featureIssueKeys = FEATURE_ISSUE_KEYS.filter(key => ARCHIVE_ISSUES[key]);
    const archiveIssueKeys = getArchiveIssueKeys();
    const isFeatureIssue = featureIssueKeys.includes(issueKey);

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
    closeMediaViewer({ restoreFocus: false });
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("archive-issue-open");
    backgroundRegions.forEach((element) => element.inert = false);
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  function renderCurrentViewerImage() {
    const image = currentViewerImages[currentViewerIndex];
    if (!image || !mediaViewerImg) return;

    mediaViewerImg.src = image.src;
    mediaViewerImg.alt = image.alt || image.caption || "Portfolio image";
    mediaViewerImg.decoding = "async";

    if (mediaViewerCaption) {
      const label = image.caption || currentGallery[currentGalleryIndex]?.label || "Portfolio image";
      const counter = currentViewerImages.length > 1
        ? ` · ${currentViewerIndex + 1} of ${currentViewerImages.length}`
        : "";
      mediaViewerCaption.textContent = `${label}${counter}`;
    }

    const hasMultipleImages = currentViewerImages.length > 1;
    if (viewerPrevious) viewerPrevious.hidden = !hasMultipleImages;
    if (viewerNext) viewerNext.hidden = !hasMultipleImages;
  }

  function openMediaViewer(index, trigger = document.activeElement, requestedImageIndex = 0) {
    const item = currentGallery[index];
    if (!item || !mediaViewer || !mediaViewerImg) return;

    const isContinuousCollection = Boolean(ARCHIVE_ISSUES[currentIssueKey]?.continuousViewer);

    currentViewerImages = isContinuousCollection
      ? currentGallery.flatMap((galleryItem) => Array.isArray(galleryItem.images) && galleryItem.images.length
        ? galleryItem.images
        : galleryItem.src
          ? [{ src: galleryItem.src, alt: galleryItem.alt, caption: galleryItem.caption || galleryItem.label }]
          : [])
      : Array.isArray(item.images) && item.images.length
        ? item.images
        : item.src
          ? [{ src: item.src, alt: item.alt, caption: item.caption || item.label }]
          : [];

    if (!currentViewerImages.length) return;
    if (!mediaViewer.classList.contains("is-open")) lastViewerFocus = trigger;

    currentGalleryIndex = index;
    currentViewerIndex = Math.max(0, Math.min(
      isContinuousCollection ? index + requestedImageIndex : requestedImageIndex,
      currentViewerImages.length - 1
    ));
    if (viewerPrevious) viewerPrevious.textContent = "← Previous";
    if (viewerNext) viewerNext.textContent = "Next →";
    renderCurrentViewerImage();

    mediaViewer.classList.add("is-open");
    mediaViewer.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => {
      viewerClose?.focus();
      if (issueSpread) issueSpread.inert = true;
    });
  }

  function closeMediaViewer({ restoreFocus = true } = {}) {
    if (!mediaViewer || !mediaViewer.classList.contains("is-open")) return;
    mediaViewer.classList.remove("is-open");
    mediaViewer.setAttribute("aria-hidden", "true");
    if (issueSpread) issueSpread.inert = false;
    if (mediaViewerImg) {
      mediaViewerImg.removeAttribute("src");
      mediaViewerImg.alt = "";
    }
    currentViewerImages = [];
    currentViewerIndex = 0;
    if (restoreFocus && lastViewerFocus instanceof HTMLElement) lastViewerFocus.focus();
    lastViewerFocus = null;
  }

  function stepMediaViewer(direction) {
    if (!currentViewerImages.length) return;
    currentViewerIndex = (currentViewerIndex + direction + currentViewerImages.length) % currentViewerImages.length;
    renderCurrentViewerImage();
  }

  mediaGrid?.addEventListener("click", (event) => {
    const moreButton = event.target.closest("[data-gallery-more]");
    if (moreButton) {
      const firstNewIndex = visibleGalleryCount;
      visibleGalleryCount = Math.min(currentGallery.length, visibleGalleryCount + GALLERY_BATCH_SIZE);
      renderGalleryGrid({ focusIndex: firstNewIndex });
      return;
    }

    const thumb = event.target.closest(".archive-media-card");
    if (!thumb) return;
    openMediaViewer(Number(thumb.dataset.mediaIndex), thumb);
  });

  galleryFilters?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-gallery-filter]");
    if (!button) return;
    activeGalleryFilter = button.dataset.galleryFilter || "all";
    currentGallery = activeGalleryFilter === "all"
      ? fullGallery
      : fullGallery.filter((item) => {
          const categories = Array.isArray(item.categories)
            ? item.categories
            : item.category
              ? [item.category]
              : [];
          return categories.includes(activeGalleryFilter);
        });
    visibleGalleryCount = GALLERY_BATCH_SIZE;
    galleryFilters.querySelectorAll("[data-gallery-filter]").forEach((filterButton) => {
      filterButton.setAttribute("aria-pressed", String(filterButton === button));
    });
    renderGalleryGrid();
  });

  overlay.querySelector(".archive-issue-prev")?.addEventListener("click", () => goToSiblingIssue(-1));
  overlay.querySelector(".archive-issue-next")?.addEventListener("click", () => goToSiblingIssue(1));
  viewerClose?.addEventListener("click", () => closeMediaViewer());
  viewerPrevious?.addEventListener("click", () => stepMediaViewer(-1));
  viewerNext?.addEventListener("click", () => stepMediaViewer(1));
  mediaViewer?.addEventListener("click", (event) => {
    if (event.target === mediaViewer) closeMediaViewer();
  });

  triggers.forEach((trigger) => trigger.addEventListener("click", openIssue));
  closeButtons.forEach((button) => button.addEventListener("click", closeIssue));
  document.addEventListener("keydown", (event) => {
    if (!overlay.classList.contains("is-open")) return;

    const viewerIsOpen = Boolean(mediaViewer?.classList.contains("is-open"));
    const activeDialog = viewerIsOpen ? mediaViewer : issueSpread;

    if (event.key === "Tab" && activeDialog) {
      const focusable = [...activeDialog.querySelectorAll('button:not([disabled]):not([hidden]), a[href], [tabindex]:not([tabindex="-1"])')]
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

    if (event.key === "Escape" && viewerIsOpen) {
      event.preventDefault();
      closeMediaViewer();
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      closeIssue();
      return;
    }
    if (viewerIsOpen && event.key === "ArrowLeft") {
      event.preventDefault();
      stepMediaViewer(-1);
    }
    if (viewerIsOpen && event.key === "ArrowRight") {
      event.preventDefault();
      stepMediaViewer(1);
    }
  });
})();

(function () {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (!target) return;

  function alignTarget() {
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    target.scrollIntoView({ block: "start", behavior: "auto" });
    target.focus({ preventScroll: true });
    requestAnimationFrame(() => root.style.scrollBehavior = previousBehavior);
  }

  alignTarget();
  document.fonts?.ready?.then(alignTarget);
  window.addEventListener("load", alignTarget, { once: true });
})();

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

/* v8.0.4 · Make the editorial-template preview usable on touch and keyboard. */
(() => {
  const preview = document.querySelector('.featured-media-newspaper');
  if (!preview) return;

  const setRevealed = (revealed) => {
    preview.classList.toggle('is-revealed', revealed);
    preview.setAttribute('aria-pressed', String(revealed));
  };

  preview.addEventListener('click', () => {
    setRevealed(!preview.classList.contains('is-revealed'));
  });

  preview.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    setRevealed(!preview.classList.contains('is-revealed'));
  });
})();

