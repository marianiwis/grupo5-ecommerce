/*document.addEventListener("DOMContentLoaded", function() {
  const body = document.body;
  const loginWrapper = document.querySelector('.login-wrapper');
  const loginContainer = document.querySelector('.login-container');
  const loginImage = document.querySelector('.login-image');
  const loginForm = document.getElementById('loginForm');
  const inputGroups = document.querySelectorAll('.input-group');
  const loginButton = document.getElementById("iniciarSesion");

  // Estilos generales
  body.style.display = "flex";
  body.style.justifyContent = "center";
  body.style.alignItems = "center";
  body.style.height = "100vh";
  body.style.margin = "0";
  body.style.backgroundColor = "#f8f9fa";  // Color de fondo

  loginWrapper.style.display = "flex";
  loginWrapper.style.width = "80%";
  loginWrapper.style.maxWidth = "900px";
  loginWrapper.style.borderRadius = "8px";
  loginWrapper.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
  loginWrapper.style.overflow = "hidden";
  loginWrapper.style.backgroundColor = "white";
  
  // Estilo para el contenedor de login
  loginContainer.style.flex = "1";
  loginContainer.style.padding = "40px";
  loginContainer.style.display = "flex";
  loginContainer.style.flexDirection = "column";
  loginContainer.style.justifyContent = "center";
  
  // Estilo para el contenedor de imagen
  loginImage.style.flex = "1";
  loginImage.style.backgroundColor = "#ffcc00"; // Fondo amarillo mostaza
  loginImage.style.display = "flex";
  loginImage.style.justifyContent = "center";
  loginImage.style.alignItems = "center";
  loginImage.style.padding = "20px";

  // Estilo para la imagen
  const img = loginImage.querySelector("img");
  img.style.maxWidth = "100%";
  img.style.borderRadius = "8px";

  // Estilo para el formulario de login
  loginForm.style.width = "100%";
  
  inputGroups.forEach(group => {
      group.style.marginBottom = "20px";
  });

  // Estilo para el botón de ingresar
  loginButton.style.width = "100%";
  loginButton.style.padding = "10px 20px";
  loginButton.style.backgroundColor = "#ffcc00"; // Color del botón
  loginButton.style.border = "none";
  loginButton.style.borderRadius = "5px";
  loginButton.style.color = "#000";
  loginButton.style.fontSize = "16px";
  loginButton.style.cursor = "pointer";
  
  // Autenticación
  loginButton.addEventListener("click", function() {
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;

      if (username === "test" && password === "1234") { // Ejemplo de autenticación estática
          localStorage.setItem("usuario", username); // Guardas la sesión
          window.location.href = "index.html"; // Rediriges a la página principal
      } else {
          alert("Usuario o contraseña incorrectos");
      }
  });
});*/




/*desafiate*/
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible alert-fixed" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

document.addEventListener("DOMContentLoaded", function() { 

    document.getElementById("iniciarSesion").addEventListener("click", function() {

        let usuario = document.getElementById("username").value;
        let contraseña = document.getElementById("password").value;
        
        if(!usuario){
            appendAlert('El campo usuario no puede estar vacío.', 'danger')
            return
        }

        if(!contraseña){
            appendAlert('El campo contraseña no puede estar vacío.', 'danger')
            return
        }

        if (usuario) {
            window.localStorage.setItem("usuario", usuario)
           window.location.href="index.html"
        }       
})

})
