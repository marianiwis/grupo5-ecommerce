function mostrarProductos(productosArray) {
    let htmlContentToAppend = "";

    // iterar sobre cada producto usando forEach
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

    // insertar el contenido HTML generado en el contenedor de productos
    document.getElementById("productos-lista").innerHTML = htmlContentToAppend;
}

// llamada a la función cuando los datos están disponibles
getJSONData(PRODUCTS_URL + "101.json").then(function(resultObj) {
    if (resultObj.status === "ok") {
        mostrarProductos(resultObj.data.products); // aca usamos forEach
    } else {
        console.error("Error en la obtención de datos:", resultObj.data);
    }
});

