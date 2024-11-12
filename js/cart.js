document.addEventListener("DOMContentLoaded", function() {
  const cartContainer = document.getElementById("cart-container");
  const storedCart = localStorage.getItem("cartItems");

  if (storedCart) {
    const cartItems = JSON.parse(storedCart);

    if (cartItems.length > 0) {
      cartContainer.innerHTML = `
        <h4 class="mb-5 fw-bold">Mi Carrito <i class="bi bi-cart me-2"></i></h4>
        <div class="header row ms-5 me-5 mb-3 text-center fw-bold">
          <div class="col-md-4 header-etiquetas" >Producto</div>
          <div class="col-md-1 header-etiquetas">Precio</div>
          <div class="col-md-2 header-etiquetas">Cantidad</div>
          <div class="col-md-1 header-etiquetas">Subtotal</div>
        </div>`;

      cartItems.forEach((item, index) => {
        cartContainer.innerHTML += `
          <div class="card mb-3 ms-5 me-5 cart-item shadow-sm">
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
          </div>
          `;
      });
      // AGREGAMOS LOS TIPOS
      cartContainer.innerHTML +=`
        <div class="header row ms-5 me-5 mb-3 mt-5 text-center fw-bold">
            <div class="col-md-4 header-etiquetas w-100" >Tipo de envio</div>
          </div>

          <div class="header row ms-5 me-5 mb-3 mt-5 text-center fw-bold">
            <div class="col-4">
                <label for="premium">
                  <div class="p-3 cart-tipo-envio-radio">
                    <input id="premium" type="radio" name="tipo">
                    Premium 2 a 5 dias (15%)
                  </div>
                </label>
            </div>
            <div class="col-4">
                <label for="expira">
                  <div class="p-3 cart-tipo-envio-radio">
                    <input id="expira" type="radio" name="tipo">
                    Expira 5 a 8 dias (7%)
                  </div>
                </label>
            </div>
            <div class="col-4">
                <label for="Standard">
                  <div class="p-3 cart-tipo-envio-radio">
                    <input id="Standard" type="radio" name="tipo">
                    Standard 12 a 15 dias (5%)
                  </div>
                </label>
            </div>
          </div>

          <div class="card mb-3 ms-5 me-5 cart-item shadow-sm p-5">
            <div class="row g-0">
              <div class="col-md-12">
                <div class="row height-100 d-flex align-items-center">
                   <div class="col-12 text-left mb-4">
                      <b>Direccion de envio:</b>
                   </div>
                   <div class="col-4 text-left mb-4">
                     <label for="departamento" class="mb-2">Departamento <span class="required">*</span></label>
                     <input type="text" class="form-control" id="departamento" placeholder="Ingrese su departamento" required="true">
                   </div>
                   <div class="col-4 text-left mb-4">
                     <label for="localidad" class="mb-2">Localidad </label>
                     <input type="text" class="form-control" id="localidad" placeholder="Ingrese su localidad">
                   </div>
                   <div class="col-4 text-left mb-4"></div>
                   <div class="col-4 text-left mb-4">
                     <label for="calle" class="mb-2">Calle <span class="required">*</span></label>
                     <input type="text" class="form-control" id="calle" placeholder="Ingrese su calle" required="true">
                   </div>
                   <div class="col-2 text-left mb-4">
                      <label for="numero" class="mb-2">Numero <span class="required">*</span></label>
                     <input type="number" class="form-control" id="numero" placeholder="Numero" required="true">
                   </div>
                   <div class="col-3 text-left mb-4">
                      <label for="esquina" class="mb-2">Esquina <span class="required">*</span></label>
                     <input type="text" class="form-control" id="esquina" placeholder="ESquina">
                   </div>
                   <div class="col-2 text-left mb-4"></div>
                </div>
              </div>
            </div>
          </div>
        `;
        //AGREGAMOS LOS MEDIOS DE PAGOS
        cartContainer.innerHTML +=`
        <div class="header row ms-5 me-5 mb-3 mt-5 text-center fw-bold">
            <div class="col-md-4 header-etiquetas w-100" >Medios de pago</div>
          </div>

          <div class="card mb-3 ms-5 me-5 cart-item shadow-sm p-4 coste-envio">
            <div class="row g-0">
              <div class="col-md-12">
                <div class="row height-100 d-flex align-items-center">
                   <div class="col-6 text-center">
                      <b>Costo de envio: $99</b>
                   </div>
                   <div class="col-6 text-center">
                      <b>Total: $9999 U$S: 999</b>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div class="header row ms-5 me-5 mb-3 mt-5 text-center fw-bold">
            <div class="col-6">
                <label for="credito">
                  <div class="p-4 cart-tipo-envio-radio">
                    <input id="credito" type="radio" name="pago">
                    Tarjeta de credito
                  </div>
                </label>
            </div>
            <div class="col-6">
                <label for="expira">
                  <div class="p-4 cart-tipo-envio-radio">
                    <input id="expira" type="radio" name="pago">
                    Transferencia bancaria
                  </div>
                </label>
            </div>
          </div>
        `;

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
      finalizarCompraBtn.style.marginLeft = "39%";
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

