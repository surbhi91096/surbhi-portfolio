document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements Elements Selection ---
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".site-nav a");
  const filterButtons = document.querySelectorAll(".filter");
  const projectCards = document.querySelectorAll(".project-card");
  const skillTabs = document.querySelectorAll(".skill-tab");
  const skillCards = document.querySelectorAll(".skill-meter");
  const revealItems = document.querySelectorAll(".reveal");
  const roleLine = document.querySelector(".role-line");

  // --- 1. Responsive Mobile Nav Hamburger Menu ---
  navToggle?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close mobile nav when clicking any link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  // --- 2. Advanced Project Cards Filter System ---
  if (filterButtons.length > 0 && projectCards.length > 0) {
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
  }

  // --- 3. Skill Category Meter Switcher ---
  function showSkillCategory(category) {
    if (skillCards.length === 0) return;
    skillCards.forEach((card) => {
      // Agar element ke data attributes match nahi karte toh hide karein
      if (card.dataset.skillCard) {
        card.classList.toggle("hidden", card.dataset.skillCard !== category);
      }
    });
  }

  if (skillTabs.length > 0) {
    skillTabs.forEach((button) => {
      button.addEventListener("click", () => {
        skillTabs.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        showSkillCategory(button.dataset.skill);
      });
    });
    // Default dynamic state trigger
    showSkillCategory("mobile");
  }

  // --- 4. Premium Reveal On Scroll Engine ---
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  // --- 5. Active Header Link Highlighting ---
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

  // --- 6. Smart Typewriter Animation Engine ---
  if (roleLine) {
    // Agar dataset variables undefined hain toh fallback setup karein
    const dataRoles = roleLine.dataset.roles || "React Native Developer|NetSuite Developer|Mobile App Engineer";
    const roles = dataRoles.split("|");
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
    }, deleting ? 70 : 100);
  }

  // --- 7. Neon Cards Dynamic Perspective Glow Effect ---
  // Isse jab mouse Contact Cards par jayega toh real-time hover illumination banta hai
  const hubCards = document.querySelectorAll(".hub-card");
  hubCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
});