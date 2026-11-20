/* ==========================================================
   Emmbella Sweet Cake — JavaScript Vanilla
   ========================================================== */

/* ---------- DATOS EDITABLES DEL NEGOCIO (cambia aquí) ---------- */
const CONFIG = {
  name: "Emmbella Sweet Cake",
  whatsappNumber: "573000000000",        // Código de país + número, sin + ni espacios
  phoneText: "+57 300 000 0000",         // Cómo se muestra el teléfono
  location: "Sede principal: tu dirección, Ciudad",
  whatsappMessage: "¡Hola! Me gustaría hacer un pedido.",

  // Sedes: agrega o quita las que necesites. "mapa" es opcional (enlace de Google Maps).
  sedes: [
    { nombre: "Sede principal", direccion: "Tu dirección, Ciudad", horario: "Lun a Sáb · 8:00 a. m. – 8:00 p. m.", mapa: "" },
    { nombre: "Sede 2", direccion: "Dirección de la sede 2", horario: "Horario por confirmar", mapa: "" }
  ],

  // Redes: reemplaza "#" por tu enlace real de Instagram (y otras redes).
  social: [
    { texto: "Instagram @emmbella_sweetcake", url: "#" },
    { texto: "Instagram sede 2", url: "#" }
  ],

  // Productos y precios. Escribe el precio como texto, p. ej. "$5.000". Vacío = "Consultar".
  // categoria: horneados | postres | bebidas
  products: [
    { nombre: "Pastel de jamón y queso", cat: "horneados", precio: "", img: "images/hojaldre-queso.jpg", desc: "Hojaldre dorado y crujiente con queso gratinado." },
    { nombre: "Pastel de carne", cat: "horneados", precio: "", img: "", desc: "Carne sazonada al estilo casero en hojaldre recién horneado." },
    { nombre: "Pastel ranchero", cat: "horneados", precio: "", img: "", desc: "Relleno contundente y lleno de sabor para el antojo del día." },
    { nombre: "Bocados de hojaldre", cat: "horneados", precio: "", img: "", desc: "Pequeños y crocantes, perfectos para compartir." },
    { nombre: "Hojaldre azucarado", cat: "horneados", precio: "", img: "images/hojaldre-dulce.jpg", desc: "Capas de hojaldre con azúcar crocante por encima." },
    { nombre: "Cuernos glaseados", cat: "horneados", precio: "", img: "images/cuerno-glaseado.jpg", desc: "Cuernos de hojaldre con glaseado blanco." },
    { nombre: "Cuerno relleno", cat: "horneados", precio: "", img: "images/cuerno-relleno.jpg", desc: "Hojaldre relleno de crema suave y cubierto de glaseado." },
    { nombre: "Pan artesanal", cat: "horneados", precio: "", img: "", desc: "Pan de masa dorada, horneado a mano." },
    { nombre: "Brownies", cat: "postres", precio: "", img: "images/brownies.jpg", desc: "Fudgy, suaves y llenos de sabor. El antojo perfecto para los amantes del chocolate." },
    { nombre: "Pastelitos de chocolate", cat: "postres", precio: "", img: "images/chocolate-corte.jpg", desc: "Bizcocho de chocolate con relleno, cobertura blanca y chocolate." },
    { nombre: "Postre de arequipe", cat: "postres", precio: "", img: "images/arequipe.jpg", desc: "Capas suaves cubiertas con arequipe brillante." },
    { nombre: "Cheesecake de mora", cat: "postres", precio: "", img: "images/cheesecake-mora.jpg", desc: "Individual, sobre base de galleta y con mora por encima." },
    { nombre: "Cheesecake de fresa", cat: "postres", precio: "", img: "images/cheesecake-fresa.jpg", desc: "Cremoso, decorado con crema y fresa." },
    { nombre: "Copas de arequipe", cat: "postres", precio: "", img: "images/arequipe-copas.jpg", desc: "Postre individual decorado con arequipe y crema." },
    { nombre: "Crema de avena", cat: "bebidas", precio: "", img: "", desc: "Cremosa y preparada como en casa." },
    { nombre: "Sodas artesanales", cat: "bebidas", precio: "", img: "", desc: "Refrescantes, con fruta y mucho sabor." },
    { nombre: "Café, tinto y aromática", cat: "bebidas", precio: "", img: "", desc: "Calientes, para acompañar tu pastel." },
    { nombre: "Gaseosas y leche", cat: "bebidas", precio: "", img: "", desc: "Para completar tu combo." }
  ],

  // Galería: fotos reales (archivo en assets/images + texto alternativo)
  gallery: [
    { src: "images/hojaldre-queso.jpg", alt: "Pastel de hojaldre con queso gratinado" },
    { src: "images/cuerno-glaseado.jpg", alt: "Cuerno de hojaldre con glaseado blanco" },
    { src: "images/cuerno-relleno.jpg", alt: "Cuernos de hojaldre rellenos de crema" },
    { src: "images/hojaldre-dulce.jpg", alt: "Hojaldre dulce con azúcar" },
    { src: "images/chocolate-corte.jpg", alt: "Pastelito de chocolate con relleno y cobertura blanca" },
    { src: "images/chocolate-bandeja.jpg", alt: "Pastelitos de chocolate decorados sobre bandeja" },
    { src: "images/chocolate-cuatro.jpg", alt: "Cuatro porciones de pastel de chocolate decoradas" },
    { src: "images/chocolate-cajas.jpg", alt: "Porciones de chocolate listas para llevar" },
    { src: "images/torta-bandeja.jpg", alt: "Torta rectangular con cobertura blanca y chocolate" },
    { src: "images/arequipe.jpg", alt: "Postre de arequipe y bolsa con detalles de la marca" },
    { src: "images/cheesecake-mora.jpg", alt: "Cheesecake individual con mora" },
    { src: "images/cheesecake-fresa.jpg", alt: "Cheesecake de fresa con crema" },
    { src: "images/cheesecake-galleta.jpg", alt: "Cheesecake con galleta triturada" },
    { src: "images/arequipe-copas.jpg", alt: "Dos postres de arequipe decorados" },
    { src: "images/chocolate-corte-1.jpg", alt: "Pastelito de chocolate con crema" },
    { src: "images/brownies.jpg", alt: "Brownies con chips de chocolate" }
  ]
};

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
document.documentElement.classList.add("js");

/* ---------- Render: tarjetas, precios, sedes y redes ---------- */
const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const catName = { horneados: "Horneados", postres: "Postres", bebidas: "Bebidas" };
const card = p => p.img
  ? `<img src="${p.img}" alt="${esc(p.nombre)}" loading="lazy" width="600" height="450">`
  : `<div class="card__ph"><img src="images/logo.png" alt="" width="516" height="298"></div>`;
const price = p => p ? esc(p) : "Consultar";
$("#grid").innerHTML = CONFIG.products.map(p => `
  <article class="card reveal" data-cat="${p.cat}">
    ${card(p)}
    <div class="card__body"><span class="tag">${catName[p.cat]}</span><h3>${esc(p.nombre)}</h3><p>${esc(p.desc)}</p>
    <p class="card__price">${price(p.precio)}</p></div>
  </article>`).join("");
$("#prices").innerHTML = CONFIG.products.map(p =>
  `<li><span>${esc(p.nombre)}</span><span class="dots"></span><b>${price(p.precio)}</b></li>`).join("");
$("#sedes").innerHTML = CONFIG.sedes.map(s => `
  <div class="sede"><h3>${esc(s.nombre)}</h3><p>${esc(s.direccion)}</p><p>${esc(s.horario)}</p>
  ${s.mapa ? `<a href="${s.mapa}" target="_blank" rel="noopener">Ver en el mapa</a>` : ""}</div>`).join("");
$("#social").innerHTML = CONFIG.social.map(r =>
  `<a href="${r.url}" target="_blank" rel="noopener">${esc(r.texto)}</a>`).join("");

$("#gallery").innerHTML = CONFIG.gallery.map(g =>
  `<button class="shot reveal" data-src="${g.src}" data-alt="${esc(g.alt)}"><img src="${g.src}" alt="${esc(g.alt)}" loading="lazy"></button>`).join("");
const box = $("#lightbox"), boxImg = $("img", box);
$("#gallery").addEventListener("click", e => {
  const b = e.target.closest(".shot"); if (!b) return;
  boxImg.src = b.dataset.src; boxImg.alt = b.dataset.alt; box.showModal();
});
box.addEventListener("click", () => box.close());

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
  img.src = "images/local.jpg";
}, { once: true }));
