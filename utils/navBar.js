function navSlide() {
  const elBurger = document.querySelector('.burger');
  const elNavLinks = document.querySelectorAll('.main-nav a');
  const elNav = document.querySelector('.main-nav');

  elNav.style.opacity = 1;
  elNav.classList.toggle('nav-active');

  elNavLinks.forEach((link, idx) => {
    if (link.style.animation) {
      link.style.animation = '';
    } else {
      link.style.animation = `navSlide .9s ease forwards ${idx / 7 + 1}s`;
    }
  });
  elBurger.classList.toggle('toggle');
}
