// Ganti nomor berikut dengan nomor WhatsApp bisnis kamu, termasuk kode negara.
// Contoh Indonesia: 6281234567890 (tanpa tanda +, spasi, atau angka 0 di depan).
const WHATSAPP_NUMBER = "6281234567890";

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const productSelect = document.getElementById("productSelect");
const orderForm = document.getElementById("orderForm");
const formFeedback = document.getElementById("formFeedback");

document.getElementById("year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Tutup navigasi" : "Buka navigasi");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

document.querySelectorAll(".product-order").forEach((button) => {
  button.addEventListener("click", () => {
    productSelect.value = button.dataset.product;
    document.getElementById("pesan").scrollIntoView({ behavior: "smooth" });
    productSelect.focus({ preventScroll: true });
  });
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!orderForm.reportValidity()) return;

  if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
    formFeedback.textContent = "Nomor WhatsApp bisnis belum diatur. Buka script.js dan ganti WHATSAPP_NUMBER terlebih dahulu.";
    return;
  }

  const data = new FormData(orderForm);
  const name = data.get("name").trim();
  const phone = data.get("phone").trim();
  const email = data.get("email").trim() || "-";
  const product = data.get("product");
  const size = data.get("size");
  const quantity = data.get("quantity");
  const message = data.get("message").trim() || "-";

  const orderMessage = [
    "Halo SIGNAL, saya ingin bertanya/memesan produk.",
    "",
    `Nama: ${name}`,
    `WhatsApp: ${phone}`,
    `Email: ${email}`,
    `Produk: ${product}`,
    `Ukuran: ${size}`,
    `Jumlah: ${quantity}`,
    `Catatan/alamat: ${message}`,
    "",
    "Mohon informasi ketersediaan dan langkah selanjutnya. Terima kasih."
  ].join("\\n");

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderMessage)}`;
  formFeedback.textContent = "Membuka WhatsApp dengan ringkasan pesanan. Periksa kembali detail sebelum mengirim.";
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});