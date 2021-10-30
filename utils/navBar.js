function navSlide() {
  const elBurger = document.querySelector('.burger');
  const elNavLinks = document.querySelectorAll('.main-nav a');
  const elNav = document.querySelector('.main-nav');
  elNav.classList.toggle('nav-active');

  elBurger.classList.toggle('toggle');
}
