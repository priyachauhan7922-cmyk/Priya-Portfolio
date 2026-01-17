document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     HELPERS
  ================================ */
  const qs = s => document.querySelector(s);
  const qsa = s => document.querySelectorAll(s);

  window.toggleSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      sidebar.classList.toggle("active");
    }
  };


  // project Selection......

const cards = document.querySelectorAll(".project-card");

window.addEventListener("scroll", () => {
  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < window.innerHeight - 100) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
});



  /* ===============================
   SKILLS SCROLL ANIMATION
================================ */

const skillsSection = document.querySelector("#skills");
const progressBars = document.querySelectorAll(".progress-bar");
const percents = document.querySelectorAll(".percent");

let skillsPlayed = false;

const skillsObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsPlayed) {
        skillsPlayed = true;

        progressBars.forEach((bar, index) => {
          const targetWidth = bar.getAttribute("data-width");
          const percentEl = percents[index];
          let count = 0;

          bar.style.width = targetWidth + "%";

          const counter = setInterval(() => {
            if (count >= targetWidth) {
              clearInterval(counter);
            } else {
              count++;
              percentEl.textContent = count + "%";
            }
          }, 15);
        });
      }
    });
  },
  {
    threshold: 0.4
  }
);

skillsObserver.observe(skillsSection);

  /* ===============================
     CONTACT FORM
  ================================ */
  const contactForm = qs(".contact-form");
  const formMsg = qs("#formMsg");

  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      const inputs = [...contactForm.querySelectorAll("input, textarea")];
      const valid = inputs.every(i => i.value.trim());

      if (!valid) {
        e.preventDefault();
      }

      if (formMsg) {
        formMsg.style.color = valid ? "green" : "red";
        formMsg.textContent = valid
          ? "Message sent successfully 🚀"
          : "Please fill all fields!";
      }

      if (valid && !formMsg) {
        contactForm.reset();
      }
    });
  }

  /* ===============================
     BACK TO TOP
  ================================ */
  const backToTop = qs("#backToTop");

  window.addEventListener("scroll", () => {
    backToTop?.classList.toggle("show", window.scrollY > 300);
  });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ===============================
     AUTO YEAR
  ================================ */
  const year = qs("#year");
  if (year) year.textContent = new Date().getFullYear();

});
