// Smooth scrolling untuk anchor link
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Form contact aman dengan pengecekan
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.");
    this.reset();
  });
}

// Efek background header saat scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = "linear-gradient(135deg, rgba(255,193,7,0.95), rgba(255,152,0,0.95))";
      header.style.backdropFilter = "blur(10px)";
    } else {
      header.style.background = "linear-gradient(135deg, #ffc107, #ff9800)";
      header.style.backdropFilter = "none";
    }
  }
});

// Tombol navigasi slider
const slider = document.getElementById('productSlider');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

if (slider && next && prev) {
  next.addEventListener('click', () => {
    slider.scrollBy({ left: 300, behavior: 'smooth' });
  });

  prev.addEventListener('click', () => {
    slider.scrollBy({ left: -300, behavior: 'smooth' });
  });
}