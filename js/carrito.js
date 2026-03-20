document.addEventListener("DOMContentLoaded", () => {

  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);

    const badge = document.getElementById("cart-count");
    if (!badge) return;

    if (count > 0) {
      badge.textContent = count;
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }

  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const cart = getCart();

      const product = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: Number(btn.dataset.price) || 0,
        quantity: 1
      };

      const existing = cart.find(p => p.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push(product);
      }

      saveCart(cart);
      updateCartCount();
    });
  });

  updateCartCount();
});