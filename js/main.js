document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    const targetElement = targetId ? document.querySelector(targetId) : null;

    if (!targetElement) {
      return;
    }

    event.preventDefault();
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
