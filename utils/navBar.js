function createNav() {
    var elNavContainer = document.querySelector('.nav-container');
    var links = ['about', 'contant us', 'projects', 'Webpage'];
var burgerLinks = ['line1', 'line2', 'line3'];
var htmlStr = `
<div class="nav-logo">NAVBAR</div>
<div class="nav-links">
`;
links.forEach(
(link, idx) =>
  (htmlStr += `<div class="nav-link link${
    idx + 1
  }"><a href="#">${link}</a></div>`)
);
htmlStr += `</div><div class="burger" onclick="navSide()">`;
burgerLinks.forEach(
(line) => (htmlStr += `<div class="side-nav ${line}"></div>`)
);
htmlStr += `</div>`;

elNavContainer.innerHTML = htmlStr;
}

const navSide = () => {
const elBurger = document.querySelector('.burger');
const elNavLink = document.querySelector('.nav-links');
const elNavLinks = document.querySelectorAll('.nav-links div');

elNavLink.classList.toggle('nav-active');
elNavLink.style.opacity = 1;

elNavLinks.forEach((link, idx) => {
if (link.style.animation) link.style.animation = '';
else link.style.animation = `navSlide .5s ease forwards ${idx / 7 + 0.5}s`;
});
elBurger.classList.toggle('toggle');
};
