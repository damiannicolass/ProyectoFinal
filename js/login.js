// Tomar formulario del login
const loginForm = document.querySelector("#loginForm");

// Agregamos el evento submit y la función de callback
loginForm.addEventListener("submit", (e) => {
  // Prevenimos que se recargue la página
  e.preventDefault();

  // Tomamos campos del formulario
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  // Traemos la base de datos del localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Usamos find para buscar este correo electrónico y contraseña en el storage
  // y si coincide se ha iniciado sesión correctamente y damos acceso
  const validarUsuario = users.find(
    (user) => user.email === email && user.password === password
  );

  // Si no es correcto, mostramos una alerta de error
  if (!validarUsuario) {
    Swal.fire("Usuario y/o contaseña incorrectos");
  } else {
    //para darme cuenta que hay un usuario logeado
    localStorage.setItem("login_success", JSON.stringify(validarUsuario));

    // Si es correcto, damos acceso
    Swal.fire({
      title: "Ingresando...",
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
    setTimeout(() => {
      // Redirección a la página de inicio
      window.location.href = "index.html";
    }, 1500);
  }
});
