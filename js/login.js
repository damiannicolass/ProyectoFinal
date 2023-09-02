// Crear un array con un objeto dentro
const users = [
  {
    name: "admin",
    email: "admin@gmail.com",
    password: "123456",
  },
];

// Guardar el array en el almacenamiento local
localStorage.setItem("users", JSON.stringify(users));

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
    return Swal.fire('Usuario y/o contaseña incorrectos');
  }

  // Si es correcto, damos acceso
  Swal.fire('Bienvenido a tu cuenta');

  //para darme cuenta que hay un usuario logeado
  localStorage.setItem("login_success", JSON.stringify(validarUsuario));

  // Redirección a la página de inicio
  window.location.href = "index.html";
});
