document.addEventListener("DOMContentLoaded", function () {
    const profileForm = document.getElementById("profileForm");
    const emailInput = document.getElementById("email");
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const contactPhoneInput = document.getElementById("contactPhone");

    // Verifica si el usuario está logueado
    const loggedUserEmail = localStorage.getItem('userEmail');
    console.log("Verificando email del usuario:", loggedUserEmail);  // Depuración
    
    if (!loggedUserEmail) {
      console.log("El usuario no está logueado. Redirigiendo al login...");
      window.location.href = 'login.html'; // Redirigir si no está logueado
    } else {
      emailInput.value = loggedUserEmail; // Cargar email del usuario
      console.log("El usuario está logueado con email:", loggedUserEmail);
    }

    // Cargar datos previos si existen
    const savedProfile = JSON.parse(localStorage.getItem('userProfile'));
    console.log("Datos de perfil guardados:", savedProfile);  // Depuración

    if (savedProfile) {
      firstNameInput.value = savedProfile.firstName || "";
      lastNameInput.value = savedProfile.lastName || "";
      contactPhoneInput.value = savedProfile.contactPhone || "";
    }

    // Validación y guardado de datos en localStorage
    profileForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validar campos obligatorios
      if (!firstNameInput.value || !lastNameInput.value || !emailInput.value) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
      }

      // Guardar datos en local storage
      const userProfile = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        contactPhone: contactPhoneInput.value,
        email: emailInput.value
      };

      console.log("Guardando perfil de usuario en localStorage:", userProfile);  // Depuración
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      alert("Datos guardados con éxito.");
    });

    // Cambio de tema claro/oscuro
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
    });
  });
  document.addEventListener("DOMContentLoaded", function() {
    // Todo tu código va aquí
    console.log("DOM completamente cargado y parseado.");