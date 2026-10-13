const projects = {
  store: {
    eyebrow: "E-COMMERCE · NEXT.JS 15",
    title: "Electronics Store",
    description: "A responsive electronics storefront built around a useful, low-friction shopping journey.",
    detail: "Product categories, search and sorting lead into product details and a persistent cart with quantity controls, delivery calculations and order summaries. The demo checkout supports UPI, card and cash-on-delivery flows; no real payments are processed.",
    tags: ["Next.js 15", "React", "TypeScript", "CSS"],
    href: "https://github.com/Sowmyaputtur/portfolio-next.js"
  },
  banking: {
    eyebrow: "FINTECH · VUE 3",
    title: "Online Banking Dashboard",
    description: "An account dashboard that makes everyday banking feel clear and manageable.",
    detail: "Built with Vue 3's Composition API, the app brings an account overview, validated transfer form and transaction history into one responsive experience. Pinia manages state, with Vitest and Playwright covering the key journeys.",
    tags: ["Vue 3", "TypeScript", "Pinia", "Vitest", "Playwright"],
    href: "https://github.com/Sowmyaputtur/portfolio-vue.js"
  },
  sap: {
    eyebrow: "DEVELOPER TOOLS · TEAM PROJECT",
    title: "SAP Integration Hub",
    description: "A team-built integration hub designed to help DevOps teams move faster.",
    detail: "Contributed to a React project focused on bringing integration workflows together and reducing repetitive setup for the DevOps team.",
    tags: ["React", "Team collaboration", "DevOps"],
    href: "https://github.com/Sowmyaputtur/sapintegrationhub"
  }
};

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");
const projectDialog = document.querySelector(".project-dialog");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

document.querySelectorAll(".filter-button").forEach((filterButton) => {
  filterButton.addEventListener("click", () => {
    const selectedFilter = filterButton.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((button) => {
      const isActive = button === filterButton;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    document.querySelectorAll(".project-card").forEach((card) => {
      card.classList.toggle("is-hidden", selectedFilter !== "all" && card.dataset.category !== selectedFilter);
    });
  });
});

function showProject(projectKey) {
  const project = projects[projectKey];
  if (!project) return;

  projectDialog.querySelector(".dialog-eyebrow").textContent = project.eyebrow;
  projectDialog.querySelector("#dialog-title").textContent = project.title;
  projectDialog.querySelector(".dialog-description").textContent = project.description;
  projectDialog.querySelector(".dialog-detail").textContent = project.detail;

  const tagList = projectDialog.querySelector(".dialog-tags");
  tagList.replaceChildren(...project.tags.map((tag) => {
    const element = document.createElement("span");
    element.textContent = tag;
    return element;
  }));

  projectDialog.querySelector(".dialog-link").href = project.href;
  projectDialog.showModal();
}

document.querySelectorAll(".project-card").forEach((card) => {
  card.querySelector(".project-open").addEventListener("click", () => showProject(card.dataset.project));
});

projectDialog.querySelector(".dialog-close").addEventListener("click", () => projectDialog.close());
projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) projectDialog.close();
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (projectDialog.open) projectDialog.close();
  if (navigation.classList.contains("is-open")) closeMenu();
});

const revealTargets = document.querySelectorAll(".section-heading, .story-grid, .project-card, .journey-intro, .timeline-item, .toolkit-card");
if ("IntersectionObserver" in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.dataset.reveal = "";
      requestAnimationFrame(() => entry.target.classList.add("is-visible"));
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });

  revealTargets.forEach((target, index) => {
    target.dataset.reveal = "";
    target.style.transitionDelay = `${Math.min((index % 4) * 65, 195)}ms`;
    revealObserver.observe(target);
  });
}

document.querySelector("#year").textContent = String(new Date().getFullYear());
