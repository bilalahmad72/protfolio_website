// Navbar Scroll Effect
const navbar = document.querySelector("nav");
const backToTopButton = document.querySelector("#backToTop");

window.addEventListener("scroll", () => {
  // Navbar shadow on scroll
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "none";
  }

  // Back to top button visibility
  if (window.scrollY > 500) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
});

// Back to Top Button
backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Custom Cursor
const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

document.addEventListener("mousedown", () => {
  cursor.style.width = "15px";
  cursor.style.height = "15px";
  cursor.style.borderColor = "var(--accent)";
});

document.addEventListener("mouseup", () => {
  cursor.style.width = "20px";
  cursor.style.height = "20px";
  cursor.style.borderColor = "var(--primary)";
});

// Hover effects for interactive elements
const interactiveElements = document.querySelectorAll(
  "a, button, .project-card, .skill-card, .blog-card"
);

interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.width = "40px";
    cursor.style.height = "40px";
    cursor.style.borderColor = "var(--accent)";
    cursor.style.backgroundColor = "rgba(244, 114, 182, 0.1)";
  });

  el.addEventListener("mouseleave", () => {
    cursor.style.width = "20px";
    cursor.style.height = "20px";
    cursor.style.borderColor = "var(--primary)";
    cursor.style.backgroundColor = "transparent";
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Project cards animation on scroll
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".project-card").forEach((card) => {
  observer.observe(card);
});

// Skills progress bar animation
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const targetWidth = progressBar.getAttribute("data-progress");
        progressBar.style.width = targetWidth + "%";
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".progress").forEach((bar) => {
  skillObserver.observe(bar);
});

// Marquee animation
const marqueeContent = document.querySelector(".marquee-content");
marqueeContent.innerHTML += marqueeContent.innerHTML;

const marquee = document.querySelector(".marquee");
marquee.addEventListener("mouseenter", () => {
  marqueeContent.style.animationPlayState = "paused";
});

marquee.addEventListener("mouseleave", () => {
  marqueeContent.style.animationPlayState = "running";
});

// Form Submission
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Basic form validation
    for (let key in data) {
      if (!data[key]) {
        alert("Please fill in all fields");
        return;
      }
    }

    // Here you would typically send the data to a server
    // For demo purposes, we'll just log it and show a success message
    console.log("Form Data:", data);
    alert("Message sent successfully!");
    contactForm.reset();
  });
}

// Achievement numbers animation
const achievementObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateNumber(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".achievement-number").forEach((number) => {
  achievementObserver.observe(number);
});

function animateNumber(element) {
  const target = parseInt(element.textContent);
  let current = 0;
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps

  function updateNumber() {
    current += increment;
    if (current < target) {
      element.textContent = Math.round(current) + "+";
      requestAnimationFrame(updateNumber);
    } else {
      element.textContent = target + "+";
    }
  }

  updateNumber();
}

// Mobile menu toggle (if you add a hamburger menu)
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

if (menuButton) {
  menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuButton.classList.toggle("active");
  });
}

// Add loading animation to project images
document.querySelectorAll(".project-image img").forEach((img) => {
  img.addEventListener("load", function () {
    this.classList.add("loaded");
  });
});

// Add parallax effect to hero section
const hero = document.querySelector(".hero");
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  // Hide loader if you have one
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.display = "none";
  }

  // Initial check for back to top button
  if (window.scrollY > 500) {
    backToTopButton.classList.add("visible");
  }
});

// my new code

// Make profile image interactive with mouse movement
const profileContainer = document.querySelector(".profile-image-container");
const profileImage = document.querySelector(".profile-image");

if (profileContainer && profileImage) {
  profileContainer.addEventListener("mousemove", (e) => {
    const rect = profileContainer.getBoundingClientRect();
    const xAxis = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const yAxis = ((e.clientY - rect.top) / rect.height - 0.5) * 20;

    profileImage.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${-yAxis}deg) scale(1.05)`;
  });

  profileContainer.addEventListener("mouseleave", () => {
    profileImage.style.transform =
      "perspective(1000px) rotateY(0) rotateX(0) scale(1)";
  });

  // Add parallax effect to floating icons
  profileContainer.addEventListener("mousemove", (e) => {
    const icons = document.querySelectorAll(".profile-image-floating-icons i");
    const rect = profileContainer.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;

    icons.forEach((icon, index) => {
      const factor = (index + 1) * 5;
      icon.style.transform = `translate(${xPos * factor}px, ${
        yPos * factor
      }px)`;
    });
  });

  profileContainer.addEventListener("mouseleave", () => {
    const icons = document.querySelectorAll(".profile-image-floating-icons i");
    icons.forEach((icon) => {
      icon.style.transform = "translate(0, 0)";
    });
  });
}
