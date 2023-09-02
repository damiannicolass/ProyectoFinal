//en el caso de que este logeado entra sino false
const user = JSON.parse(localStorage.getItem("login_success")) || false;
//si es false lo saca de la pagina y se va al login
if (!user) {
  window.location.href = "login.html";
}

//logout
const logout = document.querySelector("#logout");

//tomar el evento click del boton logout
logout.addEventListener("click", () => {
 // Swal.fire('Adios');

  //eliminar los datos almacenados en localstorage
  localStorage.removeItem("login_success");
  window.location.href = "login.html";
});

//----------

// Creo un arreglo con productos
const productos = [
  { id: 1, nombre: "Mate 1", precio: "10.000", image: "./images/mate.jpg" },
  { id: 2, nombre: "Mate 2", precio: "8.000", image: "./images/mate.jpg" },
  { id: 3, nombre: "Mate 3", precio: "6.000", image: "./images/mate.jpg" },
];

// Llamo a la etiqueta del HTML
const root = document.querySelector("#root");

// Creo un array vacío (carrito)
const carrito = [];

// Función para manejar el evento de clic en los botones
const loadEvents = () => {
  const buttons = document.querySelectorAll(".button__carrito");
  for (const button of buttons) {
    button.addEventListener("click", () => {
      const selectedProduct = productos.find(
        (producto) => producto.id === Number(button.id)
      );
      if (selectedProduct) {
        carrito.push(selectedProduct); // Agrego el producto al carrito
        alert(`Agregado al carrito: ${selectedProduct.nombre}`);

        // Almacenar el carrito actualizado en el localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));
      }
    });
  }
};

// Función para crear tarjetas de productos
const crearProductos = () => {
  // Recorremos el array de productos
  productos.forEach((producto) => {
    // Creamos el elemento HTML de la tarjeta
    const card = document.createElement("div");
    card.innerHTML = `
        <img src="${producto.image}" alt="Imagen no disponible">
        <h4>${producto.nombre}</h4>
        <p>$${producto.precio}</p>
        <button id="${producto.id}" class="button__carrito btn btn-primary">Agregar al carrito</button>
      `;

    // Agregamos la tarjeta al contenedor root
    root.appendChild(card);
  });

  loadEvents();
  // Llamo a la función loadEvents después de crear los productos
};

// Llamamos a la función para crear productos y asignar eventos
crearProductos();
