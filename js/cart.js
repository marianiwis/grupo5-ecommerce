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
                  </div>
                  <div class="d-flex align-items-center ms-auto">
                    <p class="card-text" style="margin-right: 8px; font-size: 1.2em;">
                      <span class="badge" style="background-color: white; color: black; border: 1px solid lightgray;">
                        ${item.quantity || 1}
                      </span>
                    </p>
                    <button class="btn btn-link text-secondary" onclick="eliminarProducto(${index})">
                      <img src="img/papelera-de-reciclaje.png" alt="Eliminar" width="20">
                    </button>
                  </div>
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
finalizarCompraBtn.style.marginLeft = "45%"; // para que quede centrado le agrego margen a la izquierda
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