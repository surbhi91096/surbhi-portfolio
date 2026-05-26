const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const filterButtons = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");
const skillTabs = document.querySelectorAll(".skill-tab");
const skillCards = document.querySelectorAll(".skill-meter");
const revealItems = document.querySelectorAll(".reveal");
const roleLine = document.querySelector(".role-line");

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const shouldShow = category === "all" || card.dataset.category === category;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

function showSkillCategory(category) {
  skillCards.forEach((card) => {
    card.classList.toggle("hidden", card.dataset.skillCard !== category);
  });
}

skillTabs.forEach((button) => {
  button.addEventListener("click", () => {
    skillTabs.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    showSkillCategory(button.dataset.skill);
  });
});

showSkillCategory("mobile");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);

document.querySelectorAll("main > section[id]").forEach((section) => sectionObserver.observe(section));

if (roleLine) {
  const roles = roleLine.dataset.roles.split("|");
  let roleIndex = 0;
  let charIndex = roles[0].length;
  let deleting = true;

  setInterval(() => {
    const current = roles[roleIndex];
    roleLine.textContent = current.slice(0, charIndex);

    if (deleting) {
      charIndex -= 1;
      if (charIndex <= 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    } else {
      charIndex += 1;
      if (charIndex >= roles[roleIndex].length) {
        deleting = true;
      }
    }
  }, deleting ? 80 : 110);
}
