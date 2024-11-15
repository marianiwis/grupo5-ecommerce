document.addEventListener("DOMContentLoaded", function() {
  const cartContainer = document.getElementById("cart-container");
  const storedCart = localStorage.getItem("cartItems");

  if (storedCart) {
    const cartItems = JSON.parse(storedCart);

    if (cartItems.length > 0) {
      cartContainer.innerHTML = `
        <h4 class="mb-5 fw-bold">Mi Carrito <i class="bi bi-cart me-2"></i></h4>
        <div class="header row ms-5 me-5 mb-4 text-center fw-bold">
          <div class="col-4 header-etiquetas me-1 d-xs-none d-none d-sm-none d-md-block">Producto</div>
          <div class="col-2 header-etiquetas me-1 d-xs-none d-none d-md-block">Precio</div>
          <div class="col-2 header-etiquetas me-1 d-xs-none d-none d-md-block">Cantidad</div>
          <div class="col-3 header-etiquetas d-none d-sm-none d-md-block">Subtotal</div>
        </div>`;

      cartItems.forEach((item, index) => {
        cartContainer.innerHTML += `
          <div class="card ms-1 me-1 ms-md-5 me-md-5 me-1 cart-item shadow-sm" id="cart-item-${index}">
            <div class="row g-0">
              <div class="col-lg-2 col-md-12 col-sm-12 d-flex align-items-center justify-content-start">
                <img src="${item.images[0]}" class="cart-img" alt="${item.name}">
              </div>
              <div class="col-lg-10 col-md-12 col-sm-12">
                <div class="row height-100 d-flex align-items-center w-100">
                   <div class="col-lg-4 col-md-4 text-center text-md-start text-sm-center d-flex align-items-center">
                     <div class="card-title">${item.name}</div>
                   </div>
                   <div class="col-lg-2 col-md-2 text-center text-md-start text-sm-center">
                     <p class="card-text">${item.currency} ${item.cost}</p>
                   </div>
                   <div class="col-lg-2 col-md-2 text-center text-md-start text-sm-center">
                     <input type="number" class="cart-quantity" min="0" value="${item.quantity || 1}" data-index="${index}">
                   </div>
                   <div class="col-lg-2 col-md-3 text-center text-md-start text-sm-center">
                     <p class="subtotal" id="subtotal-${index}">${item.currency} ${(item.cost * (item.quantity || 1)).toFixed(2)}</p>
                   </div>
                   <div class="col-lg-2 col-md-1 text-lg-end text-md-center text-sm-center text-center">
                     <button class="btn btn-link text-secondary pe-ls-5 pe-md-0 ps-sm-0 pe-sm-0 elimiar-item" onclick="eliminarProducto(${index})">
                       <img src="img/papelera-de-reciclaje.png" alt="Eliminar" width="30">
                     </button>
                   </div>
                </div>
              </div>
            </div>
          </div>`;
      });

      // Sección de tipos de envío
      cartContainer.innerHTML += `
        <div class="header row ms-1 me-1 ms-md-5 me-md-5 mb-3 mt-5 text-center fw-bold">
          <div class="col-md-4 header-etiquetas w-100">Tipo de envío</div>
        </div>

        <div class="header row ms-1 me-1 ms-md-5 me-md-5 mb-3 mt-5 text-center fw-bold">
          <div class="col-12 col-sm-4 mb-2">
            <label for="premium" class="w-md-100 w-100">
              <div class="p-3 cart-tipo-envio-radio">
                <input id="premium" type="radio" name="tipo" class="me-1">
                Premium 2 a 5 días (15%)
              </div>
            </label>
          </div>
          <div class="col-12 col-sm-4 mb-2">
            <label for="express" class="w-md-100 w-100">
              <div class="p-3 cart-tipo-envio-radio">
                <input id="express" type="radio" name="tipo" class="me-1">
                Express 5 a 8 días (7%)
              </div>
            </label>
          </div>
          <div class="col-12 col-sm-4 mb-2">
            <label for="Standard" class="w-md-100 w-100">
              <div class="p-3 cart-tipo-envio-radio">
                <input id="Standard" type="radio" name="tipo">
                Standard 12 a 15 días (5%)
              </div>
            </label>
          </div>
        </div>`;

      // Sección de dirección de envío
      cartContainer.innerHTML += `
        <div class="card mb-3 ms-1 me-1 ms-md-5 me-md-5 cart-item shadow-sm p-3 p-md-5">
          <div class="row g-0">
            <div class="col-md-12">
              <div class="row height-100 d-flex align-items-center">
                <div class="col-12 text-left mb-4">
                  <b>Dirección de envío:</b>
                </div>
                <div class="col-12 text-left mb-4">
                  <label for="departamento" class="mb-2">Departamento <span class="required">*</span></label>
                  <input type="text" class="form-control" id="departamento" placeholder="Ingrese su departamento" required>
                </div>
                <div class="col-12 text-left mb-4">
                  <label for="localidad" class="mb-2">Localidad <span class="required">*</span></label>
                  <input type="text" class="form-control" id="localidad" placeholder="Ingrese su localidad">
                </div>
                <div class="col-12 text-left mb-4"></div>
                <div class="col-12 text-left mb-4">
                  <label for="calle" class="mb-2">Calle <span class="required">*</span></label>
                  <input type="text" class="form-control" id="calle" placeholder="Ingrese su calle" required>
                </div>
                <div class="col-12 text-left mb-4">
                  <label for="numero" class="mb-2">Número <span class="required">*</span></label>
                  <input type="number" class="form-control" id="numero" placeholder="Número" required>
                </div>
                <div class="col-12 text-left mb-4">
                  <label for="esquina" class="mb-2">Esquina <span class="required">*</span></label>
                  <input type="text" class="form-control" id="esquina" placeholder="Esquina">
                </div>
                <div class="col-2 text-left mb-4"></div>
              </div>
            </div>
          </div>
        </div>`;

      // Sección de medios de pago
      cartContainer.innerHTML += `
        <div class="header row ms-1 me-1 ms-md-5 me-md-5 mb-3 mt-5 text-center fw-bold">
          <div class="col-md-4 header-etiquetas w-100">Medios de pago</div>
        </div>

        <div class="header row ms-1 me-1 ms-md-5 me-md-5 mb-3 mt-5 text-center fw-bold">
          <div class="col-12 col-md-6 mb-2">
            <label for="credito" class="w-md-100 w-100">
              <div class="p-4 cart-tipo-envio-radio">
                <input id="credito" type="radio" name="pago" class="me-1">
                Tarjeta de crédito
              </div>
            </label>
          </div>
          <div class="col-12 col-md-6 mb-2">
            <label for="expira" class="w-md-100 w-100">
              <div class="p-4 cart-tipo-envio-radio">
                <input id="expira" type="radio" name="pago" class="me-1">
                Transferencia bancaria
              </div>
            </label>
          </div>
        </div>`;

      // Crear los campos dinámicos para la tarjeta de crédito y transferencia bancaria
      const camposCredito = document.createElement("div");
      camposCredito.id = "campos-credito";
      camposCredito.style.display = "none";
      camposCredito.innerHTML = `
        <input type="text" class="form-control campoPago" id="titular" placeholder="Titular" required>
        <input type="text" class="form-control campoPago" id="numero-tarjeta" placeholder="Número de tarjeta" required>
        <input type="text" class="form-control campoPago" id="fecha-expiracion" placeholder="Fecha de expiración (MM/AA)" required>
        <input type="text" class="form-control campoPago" id="codigo-seguridad" placeholder="Código de seguridad (CVV)" required>`;
      cartContainer.appendChild(camposCredito);

      const camposTransferencia = document.createElement("div");
      camposTransferencia.id = "campos-transferencia";
      camposTransferencia.style.display = "none";
      camposTransferencia.innerHTML = `
        <p class="form-control campoPago" id="numero-cuenta" required> 123857281-1 </p>
        <p class="form-control campoPago" id="banco" required> Itaú </p>`;
      cartContainer.appendChild(camposTransferencia);

      // Mostrar u ocultar los campos de pago según la selección
      const tarjetaCreditoRadio = document.getElementById("credito");
      const transferenciaRadio = document.getElementById("expira");

      function mostrarCamposPago() {
        camposCredito.style.display = tarjetaCreditoRadio.checked ? "block" : "none";
        camposTransferencia.style.display = transferenciaRadio.checked ? "block" : "none";
      }

      tarjetaCreditoRadio.addEventListener("change", mostrarCamposPago);
      transferenciaRadio.addEventListener("change", mostrarCamposPago);

      // Llamar a la función de mostrar campos al cargar la página (si ya hay una opción seleccionada)
      mostrarCamposPago();
      
      // Añadir el botón de "Finalizar compra"
      const finalizarCompraBtn = document.createElement("button");
      finalizarCompraBtn.innerText = "Finalizar compra";
      finalizarCompraBtn.className = "btn btn-warning mt-3 finalizar-compra";
      finalizarCompraBtn.onclick = function() {
        // Validación
        const departamento = document.getElementById("departamento").value.trim();
        const calle = document.getElementById("calle").value.trim();
        const numero = document.getElementById("numero").value.trim();
        const esquina = document.getElementById("esquina").value.trim();
        
        if (!departamento || !calle || !numero || !esquina) {
          alert("Por favor, completa todos los campos de la dirección de envío.");
          return;
        }

        const envioSeleccionado = document.querySelector("input[name='tipo']:checked");
        if (!envioSeleccionado) {
          alert("Por favor, selecciona un tipo de envío.");
          return;
        }

        const pagoSeleccionado = document.querySelector("input[name='pago']:checked");
        if (!pagoSeleccionado) {
          alert("Por favor, selecciona una forma de pago.");
          return;
        }

        if (pagoSeleccionado.id === "credito") {
          const titular = document.getElementById("titular").value.trim();
          const numeroTarjeta = document.getElementById("numero-tarjeta").value.trim();
          const fechaExpiracion = document.getElementById("fecha-expiracion").value.trim();
          const codigoSeguridad = document.getElementById("codigo-seguridad").value.trim();
          if (!numeroTarjeta || !fechaExpiracion || !codigoSeguridad) {
            alert("Por favor, completa todos los campos de la tarjeta de crédito.");
            return;
          }
        } else if (pagoSeleccionado.id === "expira") {
          const numeroCuenta = document.getElementById("numero-cuenta").value.trim();
          const banco = document.getElementById("banco").value.trim();
          if (!numeroCuenta || !banco) {
            alert("Por favor, completa todos los campos de la transferencia bancaria.");
            return;
          }
        }

        // Si todo está correcto
        alert("Compra realizada exitosamente. ¡Gracias por tu compra!");
      };

      cartContainer.appendChild(finalizarCompraBtn);

      // Actualización del badge del carrito
      actualizarBadgeCarrito();
    }
  }
});

function actualizarBadgeCarrito() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  document.getElementById("cartCountBadge").innerText = totalQuantity;
}
