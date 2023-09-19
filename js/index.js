//SI EL USUARIO ESTA LOGEADO ENTRA
const user = JSON.parse(localStorage.getItem("login_success")) || false;
//SI NO LO ESTÁ LO REDIRIGE AL LOGIN
if (!user) {
  window.location.href = "login.html";
}

//LOGOUT
const logout = document.querySelector("#logout");

//tomar el evento click del boton logout
logout.addEventListener("click", () => {
  let timerInterval;
  Swal.fire({
    title: "Gracias por visitarnos!",
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

  //eliminar los datos almacenados en localstorage
  localStorage.removeItem("login_success");

  setTimeout(() => {
    window.location.href = "login.html";
  }, 2000);
});

// Creo un arreglo con productos
const productos = [
  { id: 1, nombre: "Mate 1", precio: "10000", image: "./images/mate.jpg" },
  { id: 2, nombre: "Mate 2", precio: "8000", image: "./images/mate.jpg" },
  { id: 3, nombre: "Mate 3", precio: "6000", image: "./images/mate.jpg" },
];

// Llamo a la etiqueta del HTML
const root = document.querySelector("#root");

// Creo un array vacío (carrito)
let carrito = [];

// Función para actualizar el carrito visual
const actualizarCarritoVisual = () => {
  const carritoList = document.getElementById("carrito-list");
  const carritoTotal = document.getElementById("carrito-total");

  // Borra el contenido actual del carrito visual
  carritoList.innerHTML = "";

  // Calcula el total y muestra los productos en el carrito visual
  let total = 0;
  for (const producto of carrito) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.innerHTML = `Producto: ${producto.nombre}, Cantidad: ${
      producto.cantidad
    } - $${producto.precio * producto.cantidad}`;
    carritoList.appendChild(listItem);
    total += producto.precio * producto.cantidad;
  }

  // Actualiza el total en el carrito visual
  carritoTotal.textContent = `$${total}`;

  // Elimina los productos del DOM cuando se borran del localStorage
  if (localStorage.getItem("carrito") === null) {
    carritoList.innerHTML = "";
  }
};

// Función para manejar el evento de clic en los botones
const loadEvents = () => {
  const buttons = document.querySelectorAll(".button__carrito");
  for (const button of buttons) {
    button.addEventListener("click", () => {
      const selectedProduct = productos.find(
        (producto) => producto.id === Number(button.id)
      );

      // Buscamos el producto en el carrito
      let productInCart = carrito.find(
        (product) => product.id === selectedProduct.id
      );

      // Si el producto no está en el carrito, lo agregamos
      if (!productInCart) {
        const productInCart = {
          id: selectedProduct.id,
          nombre: selectedProduct.nombre,
          precio: selectedProduct.precio,
          cantidad: 1,
        };
        carrito.push(productInCart);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Se agregó un nuevo producto",
          showConfirmButton: false,
          timer: 1500,
        });

        // Almacenar el carrito actualizado en el localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));
      } else {
        // Si el producto ya está en el carrito, incrementamos la cantidad
        productInCart.cantidad++;

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Agregado con éxito",
          showConfirmButton: false,
          timer: 1500,
        });

        // Almacenar el carrito actualizado en el localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));
      }
      actualizarCarritoVisual();
    });
  }
};

//funcion click en comprar
const botonComprar = document.getElementById("btnComprar");
botonComprar.addEventListener("click", clickBtnComprar);
function clickBtnComprar() {
  if (localStorage.getItem("carrito") !== null) {
    Swal.fire({
      title: "Compra existosa!",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  } else {
    Swal.fire({
      title: "No hay productos en el carrito",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  }
}

//funcion vaciar carrito
const botonVaciarCarrito = document.getElementById("btnVaciarCarrito");

// Agregamos el escuchador de eventos al botón
botonVaciarCarrito.addEventListener("click", clickBtnVaciarCarrito);

// Función para vaciar el carrito
function clickBtnVaciarCarrito() {
  // Verificamos si el carrito está vacío
  if (carrito.length === 0) {
    // El carrito está vacío
    return;
  }

  //borramos el carrito del localstorage
  localStorage.removeItem("carrito");

  //vaciamos carrito
  carrito = [];

  actualizarCarritoVisual();
}

// Función para crear tarjetas de productos
function crearProductos() {
  // Recorremos el array de productos
  productos.forEach((producto) => {
    // Creamos el elemento HTML de la tarjeta
    const card = document.createElement("div");
    card.innerHTML = `
        <img src="${producto.image}" alt="Imagen no disponible">
        <h4>${producto.nombre}</h4>
        <p>$${producto.precio}</p>
        <button id="${producto.id}" class="button__carrito btn btn-dark">Agregar al carrito</button>
      `;

    // Agregamos la tarjeta al contenedor root
    root.appendChild(card);
  });

  loadEvents();
  // Llamo a la función loadEvents después de crear los productos
}

// Llamamos a la función para crear productos y asignar eventos
crearProductos();

setTimeout(() => {
  Swal.fire("Mira las ofertas que tenemos en mates!");
}, 10000);

// COTIZADOR DE MONEDA
const form = document.querySelector("#form-search");
const moneda = document.querySelector("#moneda");
const criptomoneda = document.querySelector("#criptomonedas");
const formContainer = document.querySelector(".form-side");
const containerAnswer = document.querySelector(".container-answer");

const objBusqueda = {
  moneda: "",
  criptomoneda: "",
};

document.addEventListener("DOMContentLoaded", () => {
  consultarCriptos();

  form.addEventListener("submit", submitForm);
  moneda.addEventListener("change", getValue);
  criptomoneda.addEventListener("change", getValue);
});

function submitForm(e) {
  e.preventDefault();
  const { moneda, criptomoneda } = objBusqueda;
  if (moneda === "" || criptomoneda === "") {
    showError("Seleccione ambas monedas...");
    return;
  }
  consultarAPI(moneda, criptomoneda);
}

function consultarAPI(moneda, criptomoneda) {
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
  fetch(url)
    .then((resultado) => resultado.json())
    .then((resultadoJson) => {
      mostrarCotizacion(resultadoJson.DISPLAY[criptomoneda][moneda]);
    })
    .catch((error) => console.log(error));
}

function mostrarCotizacion(data) {
  clearHTML();
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = data;
  const answer = document.createElement("div");
  answer.classList.add("display-info");
  answer.innerHTML = `
          <p class="main-price">Precio: <span>${PRICE}</span></p>
          <p>Precio más alto del día:: <span>${HIGHDAY}</span></p>
          <p>Precio más bajo del día: <span>${LOWDAY}</span></p>
          <p>Variación últimas 24 horas: <span>${CHANGEPCT24HOUR}%</span></p>
          <p>Última Actualización: <span>${LASTUPDATE}</span></p>
      `;
  containerAnswer.appendChild(answer);
}

function showError(mensage) {
  const error = document.createElement("p");
  error.classList.add("error");
  error.textContent = mensage;
  formContainer.appendChild(error);
  setTimeout(() => error.remove(), 3000);
}

function getValue(e) {
  objBusqueda[e.target.name] = e.target.value;
}

function consultarCriptos() {
  const url =
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((respuestaJson) => {
      selectCriptos(respuestaJson.Data);
    })
    .catch((error) => console.log(error));
}

function selectCriptos(criptos) {
  criptos.forEach((cripto) => {
    const { FullName, Name } = cripto.CoinInfo;
    const option = document.createElement("option");
    option.value = Name;
    option.textContent = FullName;
    criptomoneda.appendChild(option);
  });
}

function clearHTML() {
  containerAnswer.innerHTML = "";
}
