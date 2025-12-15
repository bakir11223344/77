document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     Header Scroll Effect
  ========================= */
  const header = document.querySelector('header');
  const mobileMenu = document.getElementById('mobileMenu');

  if (header) {
    window.addEventListener('scroll', () => {

      // إذا الموبايل منيو مفتوح لا تغيّر الهيدر
      if (mobileMenu && mobileMenu.classList.contains('open')) return;

      if (window.scrollY > 50) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
      } else {
        header.style.background = 'var(--bg-surface-glass)';
        header.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  /* =========================
     Respect Reduced Motion
  ========================= */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.querySelectorAll('.card').forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'none';
    });
    return; // لا نكمّل الأنيميشن
  }

  /* =========================
     Reveal Animation on Scroll
  ========================= */
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target); // مهم: يوقف المراقبة بعد الظهور
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
  });

});
