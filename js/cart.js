document.addEventListener("DOMContentLoaded", function() {
  const cartContainer = document.getElementById("cart-container");
  const storedCart = localStorage.getItem("cartItems");

  if (storedCart) {
    const cartItems = JSON.parse(storedCart);

    if (cartItems.length > 0) {
      cartContainer.innerHTML = `
        <h4 class="mb-5 fw-bold">Mi Carrito <i class="bi bi-cart me-2"></i></h4>
        <div class="header row ms-5 mb-3 text-center fw-bold">
          <div class="col-md-4 header-etiquetas" >Producto</div>
          <div class="col-md-1 header-etiquetas">Precio</div>
          <div class="col-md-2 header-etiquetas">Cantidad</div>
          <div class="col-md-1 header-etiquetas">Subtotal</div>
        </div>`;

      cartItems.forEach((item, index) => {
        cartContainer.innerHTML += `
          <div class="card mb-3 ms-5 cart-item shadow-sm">
            <div class="row g-0">
              <div class="col-md-2">
                <img src="${item.images[0]}" class="cart-img" alt="${item.name}">
              </div>
              <div class="col-md-10">
                <div class="row height-100 d-flex align-items-center">
                   <div class="col text-center">
                     <h5 class="card-title">${item.name}</h5>
                   </div>
                    <div class="col text-center">
                     <p class="card-text">${item.currency} ${item.cost}</p>
                   </div>
                    <div class="col text-center">
                      <input type="number" class="cart-quantity" min="0" value="${item.quantity || 1}" data-index="${index}">
                   </div>
                    <div class="col text-center">
                      <p class="subtotal" id="subtotal-${index}">${item.currency} ${(item.cost * (item.quantity || 1)).toFixed(2)}</p>
                    </div>
                    <div class="col text-end">
                      <button class="btn btn-link text-secondary pe-5" onclick="eliminarProducto(${index})">
                        <img src="img/papelera-de-reciclaje.png" alt="Eliminar" width="30">
                      </button>
                    </div>
                </div>
              </div>
            </div>
          </div>`;
      });

      // Agregar evento para actualizar subtotal cuando cambie la cantidad
      const quantityInputs = document.querySelectorAll(".cart-quantity");
      quantityInputs.forEach(input => {
        input.addEventListener("input", function() {
          const index = input.getAttribute("data-index");
          const newQuantity = parseInt(input.value);
          cartItems[index].quantity = newQuantity;
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          actualizarSubtotal(index, newQuantity, cartItems[index].cost, cartItems[index].currency);
        });
      });

      // Botón de finalizar compra
      const finalizarCompraBtn = document.createElement("button");
      finalizarCompraBtn.innerText = "Finalizar compra";
      finalizarCompraBtn.className = "btn btn-warning text-dark mt-3"; 
      finalizarCompraBtn.style.width = "20%";
      finalizarCompraBtn.style.marginLeft = "45%";
      finalizarCompraBtn.onclick = function() {
        alert("Finalizando compra..."); 
      };
      cartContainer.appendChild(finalizarCompraBtn);

    } else {
      mostrarCarritoVacio(cartContainer);
    }
  }
});

function mostrarCarritoVacio(cartContainer) {
  cartContainer.innerHTML = `
    <div class="text-center" role="alert">
      <h4 class="alert-heading">Tu carrito está vacío</h4>
      <p>Agrega productos para verlos aquí.</p>
    </div>`;
}

function actualizarSubtotal(index, quantity, cost, currency) {
  const subtotalElement = document.getElementById(`subtotal-${index}`);
  const subtotal = quantity * cost;
  subtotalElement.textContent = `${currency} ${subtotal.toFixed(2)}`;
}

function eliminarProducto(index) {
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cart));
  window.location.reload();
}

function addToCart(product) {
  console.log("Producto agregado:", product); // Verifica si product tiene imagen y precio
  console.log("Precio:", product.price);
  console.log("Imagen:", product.image);

  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
  
  if (existingProductIndex !== -1) {
      cartItems[existingProductIndex].quantity += 1;
  } else {
      product.quantity = 1;
      cartItems.push(product);
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
// Desafiate, cantidad de productos en carrito
function actualizarBadgeCarrito() {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  document.getElementById("cartCountBadge").innerText = totalQuantity;
}
document.addEventListener("DOMContentLoaded", function() {
  actualizarBadgeCarrito();
});

