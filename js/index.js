document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});
document.addEventListener("DOMContentLoaded", function() {
    
     // Obtener el email almacenado en localStorage
     const email = localStorage.getItem("email");  
   
    // Verificar si hay un usuario guardado en localStorage
    if (email) {
        // Cambiar el texto del botón con el nombre del usuario
        const userButton = document.querySelector('.dropdown-toggle');
        userButton.textContent = email;
    } else {
        // Si no hay usuario logueado, redirigir al login
        window.location.href = "login.html";
    }

    // Cerrar sesión: limpiar el localStorage y redirigir al login
    document.getElementById("cerrarSesion").addEventListener("click", function() {
        window.localStorage.removeItem("email");
        window.location.href = "login.html";
    });
});