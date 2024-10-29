document.addEventListener("DOMContentLoaded", function() {
  const cartContainer = document.getElementById("cart-container");
  const storedCart = localStorage.getItem("cartItems");

  if (storedCart) {
    const cartItems = JSON.parse(storedCart);

    if (cartItems.length > 0) {
      cartContainer.innerHTML = `<h4>Mi carrito</h4>`;
      cartItems.forEach((item, index) => {
        cartContainer.innerHTML += `
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${item.images[0]}" class="img-fluid rounded-start" alt="${item.name}">
            </div>
            <div class="col-md-8">
              <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="card-title">${item.name}</h5>
                  <p class="card-text">Precio: ${item.currency} ${item.cost}</p>
                  <p class="card-text"><small class="text-muted">Cantidad: ${item.quantity || 1}</small></p>
                </div>
                <button class="btn btn-link text-secondary" onclick="eliminarProducto(${index})">
                  <img src="img/papelera-de-reciclaje.png" alt="Eliminar" style="width: 24px; height: 24px;"> <!-- Ícono de papelera -->
                </button>
              </div>
            </div>
          </div>
        </div>`;
    });
//Botón de finalizar compra
    const finalizarCompraBtn = document.createElement("button");
finalizarCompraBtn.innerText = "Finalizar compra";
finalizarCompraBtn.className = "btn btn-warning text-dark mt-3"; 
finalizarCompraBtn.style.width = "20%"; // achico el botón
finalizarCompraBtn.onclick = function() {
  // Acá podemos agregar la funcionalidad para finalizar la compra
  alert("Finalizando compra..."); 
};

cartContainer.appendChild(finalizarCompraBtn);
    } else {
      cartContainer.innerHTML = `
        <div class="alert alert-info text-center" role="alert">
          <h4 class="alert-heading">Tu carrito está vacío</h4>
          <p>Agrega productos para verlos aquí.</p>
        </div>`;
    }
  } else {
    cartContainer.innerHTML = `
      <div class="alert alert-info text-center" role="alert">
        <h4 class="alert-heading">Tu carrito está vacío</h4>
        <p>Agrega productos para verlos aquí.</p>
      </div>`;
  }
});
//funcion para eliminar producto uno a uno
function eliminarProducto(index) {
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cart));
  window.location.reload();
}
function addToCart(product) {
  console.log("Producto agregado:", product); // Verifica si product tiene price y image
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