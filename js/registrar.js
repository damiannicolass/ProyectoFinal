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

  //creamos una nueva instancia de la clase User
  const user = new User(name, email, password);

  //obtenemos el array de usuarios del local storage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  //buscamos el usuario con el email ingresado
  const isUserRegistered = users.find((user) => user.email === email);

  //si el usuario existe, mostramos una alerta
  if (isUserRegistered) {
    Swal.fire("El usuario ya esta registrado");
    return;
  }

  //agregamos el nuevo usuario al array
  users.push(user);

  //guardamos el array de usuarios en el local storage
  localStorage.setItem("users", JSON.stringify(users));

  //redireccionamos a la pagina de inicio de sesion
  window.location.href = "login.html";
});

//clase User
class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
