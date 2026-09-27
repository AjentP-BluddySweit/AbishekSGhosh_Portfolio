/* =========================================
   Portfolio Assignment 1 - Vanilla JavaScript
   ========================================= */

// ------------------------------
// Project data + DOM rendering
// ------------------------------
const projects = [
  {
    title: "GSTMate – AI-Powered GST Pre-Filing Compliance Assistant",
    category: "AI",
    image: "images/gstlite.svg",
    description:
      "AI-powered multi-agent system for GST compliance and return preparation. It processes invoices from PDFs, scanned images and spreadsheets, validates extracted data and generates explainable compliance risk insights.",
    tags: ["AI", "ML", "LLM", "React.js", "FastAPI", "SQL", "RAG"],
    details: [
      "OCR and AI-based invoice document understanding",
      "Deterministic GST, CGST/SGST/IGST and ITC calculations",
      "Invoice reconciliation, duplicate and mismatch detection",
      "GST Compliance Intelligence Engine with explainable risk scores",
      "Prepares GSTR-1 and GSTR-3B draft data for user review"
    ],
    link: "https://github.com/AjentP-BluddySweit/GSTLite"
  },
  {
    title: "SignLearn — Indian Sign Language Learning System",
    category: "AI",
    image: "images/isl-learning.svg",
    description:
      "Interactive platform for learning and practicing Indian Sign Language through real-time gesture recognition, confidence scores, corrective feedback and progress tracking.",
    tags: ["Python", "Computer Vision", "OpenCV", "MediaPipe", "TensorFlow", "Machine Learning"],
    details: [
      "Extracts 21 hand landmarks using MediaPipe Hands",
      "Preprocesses landmark coordinates for model input",
      "TensorFlow/Keras ANN classifies gestures",
      "React.js frontend with Flask backend",
      "Supports ISL alphabets and numbers with live feedback"
    ],
    link: "https://github.com/AjentP-BluddySweit/SignLearn"
  },
  {
    title: "Smart Medicine Dispenser",
    category: "IoT",
    image: "images/medicine-dispenser.svg",
    description:
      "An IoT-oriented smart medicine dispenser prototype designed around scheduled dispensing and connected device monitoring.",
    tags: ["IoT", "ESP8266", "AWS", "Automation"],
    details: [
      "ESP8266-based connected prototype",
      "Scheduled medicine dispensing concept",
      "Cloud-connected IoT workflow",
      "Designed for practical healthcare assistance"
    ],
    link: "https://github.com/"
  },
  {
    title: "AI Invoice Data Extraction",
    category: "Web",
    image: "images/invoice-ai.svg",
    description:
      "An intelligent document-processing project focused on extracting useful structured information from invoices and preparing it for downstream workflows.",
    tags: ["AI", "Python", "OCR", "Web"],
    details: [
      "Document input and preprocessing",
      "Structured field extraction",
      "Data cleaning and validation",
      "Foundation for automated finance workflows"
    ],
    link: "https://github.com/"
  }
];

const projectsGrid = document.querySelector("#projectsGrid");

const renderProjects = (filter = "all") => {
  const visibleProjects =
    filter === "all"
      ? projects
      : projects.filter(({ category, tags }) => category === filter || tags.includes(filter));

  if (!visibleProjects.length) {
    projectsGrid.innerHTML =
      '<p class="empty-state">No projects match this filter yet.</p>';
    return;
  }

  projectsGrid.innerHTML = visibleProjects
    .map(
      ({ title, image, description, tags, link }, index) => `
        <article class="project-card">
          <img class="project-image" src="${image}" alt="${title} project illustration">
          <div class="project-body">
            <p class="eyebrow">${String(index + 1).padStart(2, "0")} / PROJECT</p>
            <h3>${title}</h3>
            <p>${description}</p>
            <div class="tags">
              ${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <div class="project-actions">
              <button class="text-btn details-btn" data-title="${title}">Details ↗</button>
              <a class="text-btn" href="${link}" target="_blank" rel="noopener noreferrer">Repository ↗</a>
            </div>
          </div>
        </article>
      `
    )
    .join("");
};

renderProjects();

// ------------------------------
// Project filter - event handling
// ------------------------------
document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});

// ------------------------------
// Project details modal
// ------------------------------
const projectModal = document.querySelector("#projectModal");
const modalContent = document.querySelector("#modalContent");

projectsGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".details-btn");
  if (!button) return;

  const project = projects.find(({ title }) => title === button.dataset.title);
  if (!project) return;

  modalContent.innerHTML = `
    <p class="eyebrow">PROJECT DETAILS</p>
    <h2>${project.title}</h2>
    <p>${project.description}</p>
    <ul>
      ${project.details.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;

  projectModal.showModal();
});

document.querySelector("#modalClose").addEventListener("click", () => {
  projectModal.close();
});

projectModal.addEventListener("click", (event) => {
  if (event.target === projectModal) projectModal.close();
});

// ------------------------------
// Mobile navigation
// ------------------------------
const navToggle = document.querySelector("#navToggle");
const navLinks = document.querySelector("#navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// ------------------------------
// Theme switch + localStorage
// ------------------------------
const themeToggle = document.querySelector("#themeToggle");
const themeIcon = document.querySelector("#themeIcon");

const applyTheme = (theme) => {
  document.body.classList.toggle("dark", theme === "dark");
  themeIcon.textContent = theme === "dark" ? "☀" : "☾";
};

const savedTheme = localStorage.getItem("portfolio-theme") || "light";
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem("portfolio-theme", nextTheme);
  applyTheme(nextTheme);
});

// ------------------------------
// Contact form validation
// ------------------------------
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

const validators = {
  name: {
    regex: /^[A-Za-z][A-Za-z .'-]{2,49}$/,
    message: "Enter a valid name (at least 3 characters)."
  },
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    message: "Enter a valid email address."
  },
  message: {
    regex: /^[\s\S]{10,500}$/,
    message: "Message must contain 10–500 characters."
  }
};

const validateField = (field) => {
  const value = field.value.trim();
  const rule = validators[field.name];
  const errorElement = document.querySelector(`#${field.name}Error`);

  if (!rule.regex.test(value)) {
    errorElement.textContent = rule.message;
    field.setAttribute("aria-invalid", "true");
    return false;
  }

  errorElement.textContent = "";
  field.setAttribute("aria-invalid", "false");
  return true;
};

Object.keys(validators).forEach((fieldName) => {
  document.querySelector(`#${fieldName}`).addEventListener("input", (event) => {
    validateField(event.target);
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const fields = Object.keys(validators).map((name) => document.querySelector(`#${name}`));
  const isValid = fields.map(validateField).every(Boolean);

  if (!isValid) {
    formStatus.textContent = "Please correct the highlighted fields.";
    return;
  }

  formStatus.textContent =
    "Message validated successfully. This demo form does not send data to a server.";
  contactForm.reset();
});

// ------------------------------
// Scroll-to-top button
// ------------------------------
const backToTop = document.querySelector("#backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 450);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
