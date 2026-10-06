// Adds a hairline under the top bar once you scroll.
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- Blog posts ----------
const article = document.querySelector(".article-body");
if (article) {
  // Read time (about 230 words per minute)
  const words = article.innerText.trim().split(/\s+/).length;
  const label = document.querySelector("[data-read-time]");
  if (label) label.textContent = Math.max(1, Math.round(words / 230)) + " min read";

  // Reading progress bar
  const bar = document.querySelector(".read-progress");
  if (bar) {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  // Highlights sweep in when they scroll into view
  const marks = article.querySelectorAll("mark");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -15% 0px" });
    marks.forEach((m) => io.observe(m));
  } else {
    marks.forEach((m) => m.classList.add("in"));
  }
}
