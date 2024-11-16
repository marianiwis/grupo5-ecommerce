const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

let showuser = function(email){
document.addEventListener("DOMContentLoaded", function () {
  let navBar = document.getElementById("navbarNav")
  if (!navBar) {
    return 
  }
  
  // const ul = navBar.querySelector('ul');
  // ul.insertAdjacentHTML('beforeend', '<li class="nav-item"><a href="#" class="nav-link">'+email+'</a></li>');
})
}

let autentication = function(){
  let session = window.localStorage.getItem("email")
  if (!session) {
    window.location.href = "login.html"; 
    return 
  }
  showuser(session)
}

autentication()

document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("cerrarSesion").addEventListener("click", function() {
    localStorage.removeItem("email");
    window.location = "login.html"
  });
})


document.addEventListener("DOMContentLoaded", function() {
    
  // Obtener el email almacenado en localStorage
  const email = localStorage.getItem("email");  
  const userButton = document.querySelector('.dropdown-toggle');
 // Verificar si hay un usuario guardado en localStorage
 if (email  && userButton) {
     // Cambiar el texto del botón con el nombre del usuario
     userButton.textContent = email;
 }

});

document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('toggle-mode');
  const body = document.body;

  // Función para aplicar el modo oscuro
  function applyDarkMode() {
    body.classList.add('dark-mode');
    toggleButton.innerHTML = '<i class="bi bi-sun-fill"></i>';
    localStorage.setItem('dark-mode', 'enabled');
  }

  // Función para quitar el modo oscuro
  function removeDarkMode() {
    body.classList.remove('dark-mode');
    toggleButton.innerHTML = '<i class="bi bi-moon-fill"></i>';
    localStorage.setItem('dark-mode', 'disabled');
  }

  // Comprobar el estado del modo oscuro al cargar la página
  if (localStorage.getItem('dark-mode') === 'enabled') {
    applyDarkMode();
  } else {
    removeDarkMode();
  }

  // Manejar el clic en el botón de alternar modo
  toggleButton.addEventListener('click', function() {
    if (body.classList.contains('dark-mode')) {
      removeDarkMode();
    } else {
      applyDarkMode();
    }
  });

  // Función para actualizar estilos específicos de la página de categorías
  function updateCategoryStyles() {
    if (window.location.pathname.includes('categories.html')) {
      const categoryElements = document.querySelectorAll('.card, .custom-cardinga-body, .list-group-item, .categoria-titulo, .lead, .category-title, .category-text');
      
      categoryElements.forEach(element => {
        if (body.classList.contains('dark-mode')) {
          element.style.opacity = '0.7';
          if (element.classList.contains('card') || element.classList.contains('custom-cardinga-body')) {
            element.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
          }
        } else {
          element.style.opacity = '1';
          if (element.classList.contains('card') || element.classList.contains('custom-cardinga-body')) {
            element.style.backgroundColor = '';
          }
        }
      });
    }
  }

  // Actualizar estilos al cargar la página y cuando cambie el modo
  updateCategoryStyles();
  toggleButton.addEventListener('click', updateCategoryStyles);
});