/* ==========================================================
   Emmbella Sweet Cake — JavaScript Vanilla
   ========================================================== */

/* ---------- DATOS EDITABLES DEL NEGOCIO (cambia aquí) ---------- */
const CONFIG = {
  name: "Emmbella Sweet Cake",
  whatsappNumber: "573188922109",        // Código de país + número, sin + ni espacios
  phoneText: "+57 318 892 2109",         // Cómo se muestra el teléfono
  location: "Itagüí, Antioquia",
  whatsappMessage: "¡Hola! Me gustaría hacer un pedido."
};

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
document.documentElement.classList.add("js");

/* ---------- Rellenar datos del negocio ---------- */
const waLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
$$("[data-bind]").forEach(el => {
  el.textContent = CONFIG[el.dataset.bind];
  if (el.dataset.href === "tel") el.href = `tel:+${CONFIG.whatsappNumber}`;
});
$$("[data-wa]").forEach(a => { a.href = waLink; a.target = "_blank"; a.rel = "noopener"; });
$("#year").textContent = new Date().getFullYear();

/* ---------- Menú hamburguesa ---------- */
const burger = $("#burger"), menu = $("#menu");
function toggleMenu(open) {
  menu.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}
burger.addEventListener("click", () => toggleMenu(!menu.classList.contains("is-open")));
$$("a", menu).forEach(a => a.addEventListener("click", () => toggleMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") toggleMenu(false); });
window.matchMedia("(min-width: 900px)").addEventListener("change", () => toggleMenu(false));

/* ---------- Header cambia al hacer scroll ---------- */
const header = $("#header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Filtros de productos ---------- */
$$(".chip").forEach(chip => chip.addEventListener("click", () => {
  $$(".chip").forEach(c => { c.classList.remove("is-active"); c.setAttribute("aria-pressed", "false"); });
  chip.classList.add("is-active");
  chip.setAttribute("aria-pressed", "true");
  $$(".card").forEach(card => {
    const show = chip.dataset.filter === "todos" || card.dataset.cat === chip.dataset.filter;
    card.classList.toggle("is-hidden", !show);
    if (show) card.classList.add("is-visible");
  });
}));

/* ---------- Aparición al hacer scroll ---------- */
const reveals = $$(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));
} else reveals.forEach(el => el.classList.add("is-visible"));

/* ---------- Imagen de respaldo si una foto externa no carga ---------- */
$$("img").forEach(img => img.addEventListener("error", () => {
  if (!img.src.endsWith("local.jpg")) img.src = "assets/images/local.jpg";
}, { once: true }));
