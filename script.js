// Mobile menu toggle
function toggleMobileMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("mobile-open");
}

// Product slider functionality
function scrollSlider(direction) {
  const slider = document.getElementById("productSlider");
  const scrollAmount = 300;
  slider.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}

// Auto-scroll slider
let autoScrollInterval;
function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    const slider = document.getElementById("productSlider");
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (slider.scrollLeft >= maxScroll) {
      slider.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      slider.scrollBy({ left: 300, behavior: "smooth" });
    }
  }, 3000);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Start auto-scroll on page load
document.addEventListener("DOMContentLoaded", () => {
  startAutoScroll();

  // Pause auto-scroll on hover
  const slider = document.getElementById("productSlider");
  slider.addEventListener("mouseenter", stopAutoScroll);
  slider.addEventListener("mouseleave", startAutoScroll);
});

// Contact form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  // Simple validation
  if (
    !data.name ||
    !data.email ||
    !data.phone ||
    !data.subject ||
    !data.message
  ) {
    alert("Harap isi semua field yang diperlukan!");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    alert("Format email tidak valid!");
    return;
  }

  // Phone validation (Indonesian format)
  const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
  if (!phoneRegex.test(data.phone.replace(/\s|-/g, ""))) {
    alert("Format nomor telepon tidak valid!");
    return;
  }

  // Simulate form submission
  const submitBtn = document.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Mengirim...";
  submitBtn.disabled = true;

  setTimeout(() => {
    alert(
      "Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda."
    );
    this.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
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

      // Close mobile menu if open
      const navLinks = document.getElementById("navLinks");
      navLinks.classList.remove("mobile-open");
    }
  });
});

// Add scroll effect to navbar
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 193, 7, 0.95)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.background = "linear-gradient(135deg, #ffc107, #ff9800)";
    header.style.backdropFilter = "none";
  }
});

// Add intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".card, .isi-content, .contact-item"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Touch/swipe support for mobile slider
let startX = 0;
let currentX = 0;
let isDragging = false;

const slider = document.getElementById("productSlider");

slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
  stopAutoScroll();
});

slider.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  currentX = e.touches[0].clientX;
  const diffX = startX - currentX;
  slider.scrollLeft += diffX;
  startX = currentX;
});

slider.addEventListener("touchend", () => {
  isDragging = false;
  startAutoScroll();
});

// Prevent default drag behavior on desktop
slider.addEventListener("dragstart", (e) => {
  e.preventDefault();
});
