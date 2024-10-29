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

let showuser = function(usuario){
document.addEventListener("DOMContentLoaded", function () {
  let navBar = document.getElementById("navbarNav")
  if (!navBar) {
    return 
  }
  
  const ul = navBar.querySelector('ul');
  ul.insertAdjacentHTML('beforeend', '<li class="nav-item"><a href="#" class="nav-link">'+usuario+'</a></li>');
})
}

let autentication = function(){
  let session = window.localStorage.getItem("usuario")
  if (!session) {
    window.location.href = "login.html"; 
    return 
  }
  showuser(session)
}

autentication()

document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("cerrarSesion").addEventListener("click", function() {
    localStorage.removeItem("usuario");
    window.location = "login.html"
  });
})


