//tomar formulario del registro
const registrarForm = document.querySelector("#registrarForm");

//agregamos el evento submit y funcion de callback
registrarForm.addEventListener("submit", (e) => {
  //recibimos el evento y prevenimos que se recargue
  e.preventDefault();

  //tomamos campos del formulario
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  //base de datos en el localstorage, array de objetos
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // find de user para buscar un usuario que tenga el mismo mail que ingresaron
  const isUserRegistered = users.find((user) => user.email === email);

  //si es un usuario registrado alerta y con return volvemos
  if (isUserRegistered) {
    return Swal.fire('El usuario ya esta registrado');
  }
  //si no esta registrado agregamos con un push el objeto al array
  users.push({ name: name, email: email, password: password });

  //lo guardamos en el local storage
  localStorage.setItem("users", JSON.stringify(users));

  //alerta de registrado
  Swal.fire('tu cuenta ha sido creada exitosamente!');

  //redireccion
  window.location.href = "login.html";
});
