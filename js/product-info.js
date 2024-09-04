document.addEventListener("DOMContentLoaded", function() {
    const productoId = localStorage.getItem("productoId");

    if (!productoId) {
        console.error("No se ha encontrado el ID del producto.");
        return;
    }

    const url = `${PRODUCT_INFO_URL}${productoId}.json`; // Usar el ID del producto

    getJSONData(url).then(function(resultObj) {
        if (resultObj.status === "ok") {
            mostrarProducto(resultObj.data);
        } else {
            console.error("Error en la obtención de datos:", resultObj.data);
        }
    });
});

function mostrarProducto(producto) {
    let htmlContentToAppend = `
    <div class="col-12">
        <div class="card mb-4 shadow-lg rounded">
            <img src="${producto.image}" class="card-img-top" alt="${producto.name}" onerror="this.src='path/to/placeholder-image.jpg';">
            <div class="card-body">
                <h5 class="card-title">${producto.name}</h5>
                <p class="card-text">${producto.description}</p>
                <p class="card-text"><strong>Categoria:</strong> ${producto.category}</p>
                <p class="card-text"><strong>Vendidos:</strong> ${producto.soldCount}</p>
                <p class="card-text"><strong>Precio:</strong> ${producto.currency} ${producto.cost}</p>
            </div>
        </div>
    </div>
    `;
    document.getElementById("product-info").innerHTML = htmlContentToAppend;
}
