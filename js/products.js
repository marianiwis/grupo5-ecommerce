let productos = []; // variable para almacenar los productos

function mostrarProductos(productosArray) {
    let htmlContentToAppend = "";

    // iterar sobre cada producto usando forEach
    //diferentes columnas para que se ajusten a las pantallas
    // Iterar sobre cada producto usando forEach
    //agregamos el onclick para redirigir
    productosArray.forEach(producto => {
        htmlContentToAppend += `
        <div class="col-md-4">
            <div class="card mb-4 shadow-lg rounded" style="box-shadow: 0 4px 8px #ff8a0d;" onclick="guardarProductoYRedirigir(${producto.id})">
                <img src="${producto.image}" class="card-img-top" alt="${producto.name}">
                <div class="card-body">
                    <h5 class="card-title text-center fw-bold">${producto.name}</h5>
                    <p class="card-text" style="font-size: 0.9rem;">${producto.description}</p>
                    <div class="d-flex justify-content-between mt-4">
                        <span class="text-danger fw-bold" style="position: absolute; bottom: 10px; left: 10px;">
                            ${producto.currency} ${producto.cost}
                        </span>
                        <span class="fw-bold" style="position: absolute; bottom: 10px; right: 10px;">
                            Vendidos: ${producto.soldCount}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        `;
    });

// insertar el contenido HTML generado en el contenedor de productos
    document.getElementById("productos-lista").innerHTML = htmlContentToAppend;
}
// función para guardar el ID del producto y redirigir
function guardarProductoYRedirigir(productoId) {
    localStorage.setItem("productoId", productoId);
    window.location.href = "product-info.html";
}

// Llamada a la función cuando los datos están disponibles
/*getJSONData(PRODUCTS_URL + "101.json").then(function(resultObj) {
    if (resultObj.status === "ok") {
        mostrarProductos(resultObj.data.products); // aca usamos forEach
    } else {
        console.error("Error en la obtención de datos:", resultObj.data);
    }
});*/

function productosVacios() {
    document.getElementById("productos-lista").innerHTML = "<div class='col-md-4'> No hay productos para mostrar. </div>";
}

function productoTitulos(titulo) {
    document.getElementById("productos-titulo").innerHTML = "Productos / " + titulo;
}

function applyFilters() {
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
    const sortOrder = document.getElementById('sort-order').value;

    let filteredProductos = productos.filter(producto =>
        producto.cost >= minPrice && producto.cost <= maxPrice
    );

    if (sortOrder === 'price-asc') {
        filteredProductos.sort((a, b) => a.cost - b.cost);
    } else if (sortOrder === 'price-desc') {
        filteredProductos.sort((a, b) => b.cost - a.cost);
    } else if (sortOrder === 'relevance-desc') {
        filteredProductos.sort((a, b) => b.soldCount - a.soldCount);
    }

    mostrarProductos(filteredProductos);
}

document.addEventListener("DOMContentLoaded", function() {
    const categoriaID = localStorage.getItem('catID');
    console.log(`Categoría ID obtenido: ${categoriaID}`);

    if (categoriaID) {
        getJSONData(`https://japceibal.github.io/emercado-api/cats_products/${categoriaID}.json`)
            .then(function(resultObj) {
                if (resultObj.status === "ok") {
                    if (resultObj.data.products.length > 0) {
                        productos = resultObj.data.products;
                        mostrarProductos(productos);

                        // Buscador en tiempo real
                        const input = document.getElementById('inputBuscador');
                        input.addEventListener('input', function() {
                            const inputTexto = input.value.trim().toUpperCase();
                            const productosFiltrados = productos.filter(producto =>
                                producto.name.toUpperCase().includes(inputTexto) ||
                                producto.description.toUpperCase().includes(inputTexto)
                            );
                            mostrarProductos(productosFiltrados);
                        });

                    } else {
                        productosVacios();
                    }

                    if (resultObj.data.catName) {
                        productoTitulos(resultObj.data.catName);
                    }
                } else {
                    console.error("Error en la obtención de datos:", resultObj.data);
                }
            });
    } else {
        console.error("No se encontró el ID de categoría en el almacenamiento local.");
    }

    // Agregar evento de aplicar filtros
    document.getElementById('apply-filters').addEventListener('click', applyFilters);
});