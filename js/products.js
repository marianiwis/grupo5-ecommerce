let productos = []; // Variable global para almacenar los productos

// Función para mostrar productos
function mostrarProductos(productosArray) {
    let htmlContentToAppend = "";

    productosArray.forEach(producto => {
        htmlContentToAppend += `
        <div class="col-md-4">
            <div class="card mb-4 shadow-lg rounded" style="box-shadow: 0 4px 8px #ff8a0d;">
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

    document.getElementById("productos-lista").innerHTML = htmlContentToAppend;
}

// Función para aplicar filtros y orden
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

// Inicializar la página
function initPage() {
    getJSONData(PRODUCTS_URL + "101.json").then(function(resultObj) {
        if (resultObj.status === "ok") {
            productos = resultObj.data.products;
            mostrarProductos(productos);
        } else {
            console.error("Error en la obtención de datos:", resultObj.data);
        }
    });

    document.getElementById('apply-filters').addEventListener('click', applyFilters);
}

// Ejecutar la inicialización cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initPage);
