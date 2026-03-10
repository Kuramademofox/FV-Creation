
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  mouseMultiplier: 1,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


document.querySelectorAll("a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");


    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        lenis.scrollTo(target, { offset: -50 });
      }
    }
    
  });
});


const cursor = document.querySelector(".custom-cursor");
let mouseX = 0,
  mouseY = 0;
let cursorX = 0,
  cursorY = 0;


if (window.innerWidth > 480 && cursor) {
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}


const hoverTargets = document.querySelectorAll(
  ".hover-expand, a, button, .grid-item"
);
hoverTargets.forEach((target) => {
  target.addEventListener("mouseenter", () => {
    if (cursor) cursor.classList.add("active");
  });
  target.addEventListener("mouseleave", () => {
    if (cursor) cursor.classList.remove("active");
  });
});


const magneticElements = document.querySelectorAll(".magnetic");
magneticElements.forEach((elem) => {
  elem.addEventListener("mousemove", (e) => {
    if (window.innerWidth > 768) {
      const rect = elem.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    }
  });

  elem.addEventListener("mouseleave", () => {
    elem.style.transform = `translate(0px, 0px)`;
  });
});


const revealElements = document.querySelectorAll(".reveal, .reveal-center");
const revealOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, revealOptions);

revealElements.forEach((el) => revealObserver.observe(el));


const galleryTrack = document.querySelector(".gallery-track");
if (galleryTrack) {
  galleryTrack.addEventListener("wheel", (evt) => {
    
    if (evt.deltaY !== 0) {
      evt.preventDefault();
      galleryTrack.scrollLeft += evt.deltaY * 1.5;
    }
  });
}
