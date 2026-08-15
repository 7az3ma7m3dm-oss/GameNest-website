const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");

if (window.matchMedia("(pointer:fine)").matches && dot && ring) {
  let x = window.innerWidth / 2, y = window.innerHeight / 2;
  let rx = x, ry = y;

  window.addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
    dot.style.left = x + "px";
    dot.style.top = y + "px";
  });

  function follow() {
    rx += (x - rx) * 0.14;
    ry += (y - ry) * 0.14;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(follow);
  }
  follow();

  document.querySelectorAll("a, summary, .product-card, .v-card, .payment-card").forEach(el => {
    el.addEventListener("mouseenter", () => {
      ring.classList.add("hover");
      dot.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      ring.classList.remove("hover");
      dot.classList.remove("hover");
    });
  });
}

// Small touch-friendly behavior: close an FAQ naturally after navigation.
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", () => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) setTimeout(() => target.scrollIntoView({behavior:"smooth", block:"start"}), 0);
  });
});
