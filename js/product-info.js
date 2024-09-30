document.addEventListener("DOMContentLoaded", function() {
    // obtener el Identificador de producto
    const productoId = localStorage.getItem("productoId");
    if (!productoId) {
        console.error("No se ha encontrado el ID del producto.");
        return;
    }
    // obtener el identificador de categoría
    const categoriaID = localStorage.getItem("catID");
    if (!categoriaID) {
        console.error("No se ha encontrado el ID de la categoría.");
        return;
    }

    // URLs para realizar solicitud a un API y obtener info
    const urlProducto = `${PRODUCT_INFO_URL}${productoId}${EXT_TYPE}`; // Usa el ID del producto
    const urlCat = `${PRODUCTS_URL}${categoriaID}${EXT_TYPE}`; // Usa el ID de la categoría

    // Obtener la información del producto actual
    getJSONData(urlProducto).then(function(resultObj) {
        if (resultObj.status === "ok") {
            const producto = resultObj.data;
            mostrarProducto(producto);}
        });
    
            // Obtener productos de la misma categoría
getJSONData(urlCat).then(function(relatedResult) {
    if (relatedResult.status === "ok") {
        const productosRelacionados = relatedResult.data.products;
        console.log("Productos filtrados relacionados:", productosRelacionados); // Añadir esto para verificar
        mostrarProductosRelacionados(productosRelacionados);
    } else {
        console.error("Error en la obtención de productos relacionados:", relatedResult.data);
    }
}).catch(function(error) {
    console.error("Error en la solicitud de productos relacionados:", error);
});
});

// Función para mostrar el producto
function mostrarProducto(producto) {
    let imagesHtml = producto.images.map((img, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img src="${img}" class="d-block w-100" alt="${producto.name}">
        </div>
    `).join('');

    let htmlContentToAppend = `
    <div class="col-12">
        <div id="productCarousel" class="carousel slide shadow-lg rounded">
            <div class="carousel-inner">
                ${imagesHtml}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <div class="custom-card-body">
            <hr style="border: 3px solid #ff8a0d; width: 100%; margin: 0;">
            <h5 class="card-title text-center fw-bold fs-1">${producto.name}</h5>
            <hr style="border: 3px solid #ff8a0d; width: 100%; margin: 0 auto 20px auto;">
            <p class="card-text" style="font-size: 1.5rem;">${producto.description}</p>
            <p class="card-text" style="font-size: 1.1rem;"><strong>Categoria:</strong> ${producto.category}</p>
            <p class="card-text" style="font-size: 1.1rem;"><strong>Vendidos:</strong> ${producto.soldCount}</p>
            <p class="card-text text-danger" style="font-size: 1.1rem;"><strong>Precio:</strong> ${producto.currency} ${producto.cost}</p>
        </div>
    </div>
    `;
    document.getElementById("product-info").innerHTML = htmlContentToAppend;
}

function mostrarProductosRelacionados(productos) {
    if (productos.length === 0) {
        document.getElementById("related-products").innerHTML = "<p>No hay productos relacionados.</p>";
        return;
    }

       // Agregar título de "Productos Relacionados"
       let tituloHtml = `
       <h2 class="text-center mt-5 mb-4">Productos Relacionados</h2>
   `;

    // Agrupa los productos de 3 en 3
    let groupedProducts = [];
    for (let i = 0; i < productos.length; i += 3) {
        groupedProducts.push(productos.slice(i, i + 3));
    }

        // Construye el HTML de los productos relacionados
        let relatedHtml = groupedProducts.map((group, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <div class="row justify-content-center"> <!-- Centramos los productos -->
                ${group.map(producto => `
                    <div class="col-md-4 d-flex justify-content-center mb-4"> <!-- Centrado de las tarjetas con margen -->
                        <div class="card" style="width: 18rem;">
                            <img src="${producto.image}" class="card-img-top" alt="${producto.name}">
                            <div class="card-body">
                                <h5 class="card-title">${producto.name}</h5>
                                <p class="card-text text-danger">${producto.currency} ${producto.cost}</p>
                                <button class="btn btn-primary" onclick="irAProducto(${producto.id})">Ver producto</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    let carouselHtml = `
    <div id="relatedProductsCarousel" class="carousel slide mt-5" data-bs-ride="carousel">
        <div class="carousel-inner">
            ${relatedHtml}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#relatedProductsCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#relatedProductsCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    `;

    // Agregar el título y el carrusel al contenedor
    document.getElementById("related-products").innerHTML = tituloHtml + carouselHtml;
}


// Función para ir a un producto
function irAProducto(idProducto) {
    // Almacena el nuevo ID de producto en localStorage
    localStorage.setItem("productoId", idProducto);
    // Recarga la página para mostrar el nuevo producto
    location.reload();
}
