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

// Enhanced Form Submission with Better UX
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;

  // Add real-time validation
  const inputs = contactForm.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", validateField);
    input.addEventListener("input", clearFieldError);
  });

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Clear previous errors
    clearAllErrors();

    // Comprehensive validation
    const errors = validateForm(data);
    if (errors.length > 0) {
      displayErrors(errors);
      return;
    }

    // Show loading state
    setLoadingState(true);

    try {
      // Simulate API call with delay
      await simulateFormSubmission(data);

      // Show success message
      showSuccessMessage();

      // Reset form
      contactForm.reset();
    } catch (error) {
      // Show error message
      showErrorMessage(error.message);
    } finally {
      // Reset loading state
      setLoadingState(false);
    }
  });

  function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;

    clearFieldError(field);

    let error = "";

    switch (fieldName) {
      case "name":
        if (!value) {
          error = "Name is required";
        } else if (value.length < 2) {
          error = "Name must be at least 2 characters";
        }
        break;

      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!isValidEmail(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "subject":
        if (!value) {
          error = "Subject is required";
        } else if (value.length < 5) {
          error = "Subject must be at least 5 characters";
        }
        break;

      case "message":
        if (!value) {
          error = "Message is required";
        } else if (value.length < 10) {
          error = "Message must be at least 10 characters";
        }
        break;
    }

    if (error) {
      showFieldError(field, error);
    }
  }

  function clearFieldError(field) {
    if (field.target) field = field.target; // Handle event object

    field.classList.remove("error");
    const errorElement = field.parentNode.querySelector(".field-error");
    if (errorElement) {
      errorElement.remove();
    }
  }

  function showFieldError(field, message) {
    field.classList.add("error");

    const errorElement = document.createElement("span");
    errorElement.className = "field-error";
    errorElement.textContent = message;

    field.parentNode.appendChild(errorElement);
  }

  function validateForm(data) {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
      errors.push({
        field: "name",
        message: "Name must be at least 2 characters",
      });
    }

    if (!data.email || !isValidEmail(data.email)) {
      errors.push({
        field: "email",
        message: "Please enter a valid email address",
      });
    }

    if (!data.subject || data.subject.trim().length < 5) {
      errors.push({
        field: "subject",
        message: "Subject must be at least 5 characters",
      });
    }

    if (!data.message || data.message.trim().length < 10) {
      errors.push({
        field: "message",
        message: "Message must be at least 10 characters",
      });
    }

    return errors;
  }

  function displayErrors(errors) {
    errors.forEach((error) => {
      const field = contactForm.querySelector(`[name="${error.field}"]`);
      if (field) {
        showFieldError(field, error.message);
      }
    });

    // Focus on first error field
    if (errors.length > 0) {
      const firstErrorField = contactForm.querySelector(
        `[name="${errors[0].field}"]`
      );
      if (firstErrorField) {
        firstErrorField.focus();
      }
    }
  }

  function clearAllErrors() {
    const errorElements = contactForm.querySelectorAll(".field-error");
    errorElements.forEach((el) => el.remove());

    const errorFields = contactForm.querySelectorAll(".error");
    errorFields.forEach((field) => field.classList.remove("error"));
  }

  function setLoadingState(loading) {
    if (loading) {
      submitButton.disabled = true;
      submitButton.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitButton.classList.add("loading");
    } else {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
      submitButton.classList.remove("loading");
    }
  }

  function showSuccessMessage() {
    const successMessage = document.createElement("div");
    successMessage.className = "form-message success";
    successMessage.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <p>Thank you! Your message has been sent successfully. I'll get back to you soon.</p>
    `;

    contactForm.parentNode.insertBefore(successMessage, contactForm);

    // Remove success message after 5 seconds
    setTimeout(() => {
      if (successMessage.parentNode) {
        successMessage.remove();
      }
    }, 5000);

    // Scroll to success message
    successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function showErrorMessage(message) {
    const errorMessage = document.createElement("div");
    errorMessage.className = "form-message error";
    errorMessage.innerHTML = `
      <i class="fas fa-exclamation-circle"></i>
      <p>Sorry, there was an error sending your message: ${message}. Please try again or contact me directly.</p>
    `;

    contactForm.parentNode.insertBefore(errorMessage, contactForm);

    // Remove error message after 7 seconds
    setTimeout(() => {
      if (errorMessage.parentNode) {
        errorMessage.remove();
      }
    }, 7000);
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function simulateFormSubmission(data) {
    // Real EmailJS implementation
    try {
      // Replace these with your actual EmailJS service details
      const serviceID = "service_cxe2wpv";
      const templateID = "template_8md4a0c";

      // Prepare template parameters
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_email: "bilalahmad72.official@gmail.com", // Your email address
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        serviceID,
        templateID,
        templateParams
      );

      console.log("Email sent successfully:", response);
      return { success: true };
    } catch (error) {
      console.error("Email sending failed:", error);
      throw new Error(
        "Failed to send email. Please try again or contact me directly."
      );
    }
  }
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
