// Array de Productos
const productos = [
    {
        id: 1,
        titulo: "Sudadera Casual",
        precio: 49.90,
        imagen: "https://pangaia.com/cdn/shop/products/Recycled-Nylon-NW-Flwrdwn-Quilted-Collarless-Jacket-Cerulean-Blue-Female-1_bf4b2a54-8a7f-4174-bc49-8ef22b24bfdd.jpg?v=1666708230&width=1426",
    },
    {
        id: 2,
        titulo: "Sudadera Deportiva",
        precio: 55.00,
        imagen: "https://images.undiz.com/on/demandware.static/-/Sites-ZLIN-master/default/dw2264d914/merch/BTS/654206666_x.jpg?sw=1250",
    },
    {
        id: 3,
        titulo: "Chaqueta Marrón",
        precio: 74.90,
        imagen: "https://media.johnlewiscontent.com/i/JohnLewis/008922543alt1?fmt=auto&wid=1440&sm=c",
    },
    {
        id: 4,
        titulo: "Sudadera Essential",
        precio: 45.00,
        imagen: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/61734ec7-dad8-40f3-9b95-c7500939150a/sportswear-club-mens-french-terry-crew-neck-sweatshirt-tdFDRc.png",
    },
    {
        id: 5,
        titulo: "Sudadera Básica",
        precio: 39.99,
        imagen: "https://img01.ztat.net/article/spp-media-p1/7067458719b744fe81ffee62d3d0b912/abad421e7d8e47f08a2abc1c6ffe07dc.jpg?imwidth=1800",
    },
    {
        id: 6,
        titulo: "Sudadera Algodón",
        precio: 65.00,
        imagen: "https://pangaia.com/cdn/shop/files/Reclaim-3.0-Hoodie-Reclaim-Jade-Womens-3.jpg?v=1693398673&width=1426",
    },
    {
        id: 7,
        titulo: "Sudadera Clásica",
        precio: 42.99,
        imagen: "https://img01.ztat.net/article/spp-media-p1/10cea44041564f81ac585fc6c8978907/c4c32dbc45dd4dbc9d15087c846538f2.jpg?imwidth=1800",
    },
    {
        id: 8,
        titulo: "Sudadera Premium",
        precio: 79.99,
        imagen: "https://img01.ztat.net/article/spp-media-p1/d391f90be278469ebfdff731800cfccc/6d2101bd672f4e059501f01fe726f315.jpg?imwidth=1800",
    },
];

const listaProductos = document.getElementById("lista-productos");
const itemsCarritoElemento = document.getElementById("items-carrito");
const totalCarritoElemento = document.getElementById("total-carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Agregar constante para el IVA (21%)
const IVA_RATE = 0.21;

function mostrarProductos() {
    if (listaProductos) {
        listaProductos.innerHTML = productos.map((producto) =>
            `<div class="producto">
                <img src="${producto.imagen}" alt="${producto.titulo}" class="imagen-producto">
                <div class="info-producto">
                    <h2 class="titulo-producto">${producto.titulo}</h2>
                    <p class="precio-producto">${producto.precio.toFixed(2)}€</p>
                    <a class="agregar-carrito" data-id="${producto.id}">Añadir al Carrito</a>
                </div>
            </div>`
        ).join("");

        const botonesAgregar = document.getElementsByClassName("agregar-carrito");
        for (let i = 0; i < botonesAgregar.length; i++) {
            const botonAgregar = botonesAgregar[i];
            botonAgregar.addEventListener("click", agregarAlCarrito);
        }
    }
}

function agregarAlCarrito(evento) {
    const productoID = parseInt(evento.target.dataset.id);
    const producto = productos.find((producto) => producto.id === productoID);

    if (producto) {
        const itemExistente = carrito.find((item) => item.id === productoID);
        if (itemExistente) {
            itemExistente.cantidad++;
        } else {
            const itemCarrito = {
                id: producto.id,
                titulo: producto.titulo,
                precio: producto.precio,
                imagen: producto.imagen,
                cantidad: 1,
            };
            carrito.push(itemCarrito);
        }
        evento.target.textContent = "¡Agregado!";
        actualizarIconoCarrito();
        guardarEnLocalStorage();
        mostrarItemsCarrito();
        calcularTotalCarrito();
    }
}

function eliminarDelCarrito(evento) {
    const productoID = parseInt(evento.target.dataset.id);
    carrito = carrito.filter((item) => item.id !== productoID);
    guardarEnLocalStorage();
    mostrarItemsCarrito();
    calcularTotalCarrito();
    actualizarIconoCarrito();
}

function cambiarCantidad(evento) {
    const productoID = parseInt(evento.target.dataset.id);
    const cantidad = parseInt(evento.target.value);
    
    if (cantidad > 0) {
        const itemCarrito = carrito.find((item) => item.id === productoID);
        if (itemCarrito) {
            itemCarrito.cantidad = cantidad;
            guardarEnLocalStorage();
            calcularTotalCarrito();
            actualizarIconoCarrito();
        }
    }
}

function guardarEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarItemsCarrito() {
    if (itemsCarritoElemento) {
        itemsCarritoElemento.innerHTML = carrito.map((item) => `
            <div class="item-carrito">
                <img src="${item.imagen}" alt="${item.titulo}">
                <div class="info-item-carrito">
                    <h2 class="titulo-item-carrito">${item.titulo}</h2>
                    <input class="cantidad-item-carrito" type="number" min="1" value="${item.cantidad}" data-id="${item.id}">
                </div>
                <h2 class="precio-item-carrito">${item.precio}€</h2>
                <button class="eliminar-del-carrito" data-id="${item.id}">Eliminar</button>
            </div>`
        ).join("");

        const botonesEliminar = document.getElementsByClassName("eliminar-del-carrito");
        for (let i = 0; i < botonesEliminar.length; i++) {
            const botonEliminar = botonesEliminar[i];
            botonEliminar.addEventListener("click", eliminarDelCarrito);
        }

        const inputsCantidad = document.querySelectorAll(".cantidad-item-carrito");
        inputsCantidad.forEach((input) => {
            input.addEventListener("change", cambiarCantidad);
        });
    }   
}

function calcularTotalCarrito() {
    const subtotalElemento = document.getElementById('subtotal');
    const ivaElemento = document.getElementById('iva');
    const totalCarritoElemento = document.getElementById('total-carrito');

    if (subtotalElemento && totalCarritoElemento) {
        const subtotal = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
        const iva = subtotal * IVA_RATE;
        const total = subtotal + iva;
        
        subtotalElemento.textContent = `${subtotal.toFixed(2)}€`;
        
        // Si existe el elemento IVA lo actualizamos
        if (ivaElemento) {
            ivaElemento.textContent = `${iva.toFixed(2)}€`;
        }
        
        totalCarritoElemento.textContent = `${total.toFixed(2)}€`;
    }
}

function actualizarIconoCarrito() {
    const cantidadTotal = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    const iconoCarrito = document.getElementById("icono-carrito");
    if (iconoCarrito) {
        iconoCarrito.setAttribute("data-cantidad", cantidadTotal);
    }
}

function mostrarResumenPedido() {
    const itemsResumen = document.getElementById('items-resumen');
    const totalPedido = document.getElementById('total-pedido');
    const subtotalElemento = document.getElementById('subtotal');
    
    if (itemsResumen && carrito.length > 0) {
        itemsResumen.innerHTML = carrito.map(item => `
            <div class="item-resumen">
                <img src="${item.imagen}" alt="${item.titulo}">
                <div class="info-item-resumen">
                    <h4>${item.titulo}</h4>
                    <p>Cantidad: ${item.cantidad}</p>
                    <p>${item.precio}€</p>
                </div>
            </div>
        `).join('');

        const subtotal = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
        const iva = subtotal * IVA_RATE;
        const total = subtotal + iva;

        if (subtotalElemento) subtotalElemento.textContent = `${subtotal.toFixed(2)}€`;
        if (totalPedido) {
            const detallesResumen = totalPedido.closest('.detalles-resumen');
            if (detallesResumen) {
                // Agregar fila de IVA antes del total
                const filaIVA = document.createElement('div');
                filaIVA.className = 'fila-resumen';
                filaIVA.innerHTML = `
                    <span>IVA (21%)</span>
                    <span>${iva.toFixed(2)}€</span>
                `;
                
                const filaTotalExistente = detallesResumen.querySelector('.fila-resumen.total');
                detallesResumen.insertBefore(filaIVA, filaTotalExistente);
                
                // Actualizar el total
                totalPedido.textContent = `${total.toFixed(2)}€`;
            }
        }
    }
}

// Inicializar la página según la ruta actual
if (window.location.pathname.includes('carrito.html')) {
    mostrarItemsCarrito();
    calcularTotalCarrito();
} else if (window.location.pathname.includes('productos.html')) {
    mostrarProductos();
} else if (window.location.pathname.includes('pago.html')) {
    mostrarResumenPedido();
}

// Mantener actualizado el icono del carrito
actualizarIconoCarrito();

// Actualizar el icono cuando cambie el almacenamiento local
window.addEventListener("storage", actualizarIconoCarrito);

// Función para manejar el pago
function inicializarFormularioPago() {
    const formulario = document.getElementById('formulario-pago');
    if (!formulario) {
        console.log('No se encontró el formulario');
        return;
    }

    // Manejar navegación entre pasos
    const botonesNext = document.querySelectorAll('.boton-siguiente');
    const botonesPrev = document.querySelectorAll('.boton-anterior');

    console.log('Botones siguiente encontrados:', botonesNext.length);
    console.log('Botones anterior encontrados:', botonesPrev.length);

    // Manejar botones siguiente
    botonesNext.forEach(boton => {
        boton.addEventListener('click', () => {
            const seccionActual = boton.closest('.seccion-formulario');
            const pasoActual = parseInt(seccionActual.dataset.seccion);
            const siguientePaso = parseInt(boton.dataset.siguiente);
            
            console.log('Paso actual:', pasoActual);
            console.log('Siguiente paso:', siguientePaso);

            cambiarPaso(pasoActual, siguientePaso);
        });
    });

    // Manejar botones anterior
    botonesPrev.forEach(boton => {
        boton.addEventListener('click', () => {
            const seccionActual = boton.closest('.seccion-formulario');
            const pasoActual = parseInt(seccionActual.dataset.seccion);
            const pasoAnterior = parseInt(boton.dataset.anterior);
            
            console.log('Paso actual:', pasoActual);
            console.log('Paso anterior:', pasoAnterior);

            cambiarPaso(pasoActual, pasoAnterior);
        });
    });

    // Manejar envío del formulario
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Formulario enviado');

        const botonPago = document.querySelector('.boton-confirmar-pago');
        if (!botonPago) {
            console.log('No se encontró el botón de pago');
            return;
        }

        botonPago.disabled = true;
        botonPago.innerHTML = `
            <i class='bx bx-loader-alt bx-spin'></i>
            Procesando...
        `;

        setTimeout(() => {
            procesarPagoExitoso();
        }, 2000);
    });
}

function cambiarPaso(actual, siguiente) {
    console.log('Cambiando de paso:', actual, 'a', siguiente);

    // Ocultar paso actual
    const seccionActual = document.querySelector(`[data-seccion="${actual}"]`);
    if (seccionActual) {
        seccionActual.classList.add('oculto');
        seccionActual.classList.remove('activo');
    }

    // Mostrar siguiente paso
    const seccionSiguiente = document.querySelector(`[data-seccion="${siguiente}"]`);
    if (seccionSiguiente) {
        seccionSiguiente.classList.remove('oculto');
        seccionSiguiente.classList.add('activo');
    }

    // Actualizar indicadores de paso
    actualizarIndicadoresPasos(siguiente);
}

function actualizarIndicadoresPasos(pasoActivo) {
    const pasos = document.querySelectorAll('.paso');
    
    pasos.forEach((paso, index) => {
        const numeroPaso = index + 1;
        paso.classList.remove('activo', 'completado');
        
        if (numeroPaso < pasoActivo) {
            paso.classList.add('completado');
        } else if (numeroPaso === pasoActivo) {
            paso.classList.add('activo');
        }
    });
}

function procesarPagoExitoso() {
    const modal = document.getElementById('modal-exito');
    if (!modal) {
        console.log('No se encontró el modal');
        return;
    }

    const numeroOrden = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const numeroOrdenElement = document.getElementById('numero-orden');
    if (numeroOrdenElement) {
        numeroOrdenElement.textContent = numeroOrden;
    }

    modal.classList.remove('oculto');
    modal.classList.add('mostrar');

    localStorage.removeItem('carrito');
    if (typeof actualizarIconoCarrito === 'function') {
        actualizarIconoCarrito();
    }
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado');
    if (window.location.pathname.includes('pago.html')) {
        inicializarFormularioPago();
    }
});

// Función para mostrar notificación
function mostrarNotificacion(mensaje, tipo = 'exito') {
    // Eliminar notificación existente si hay alguna
    const notificacionExistente = document.querySelector('.notificacion');
    if (notificacionExistente) {
        notificacionExistente.remove();
    }

    // Crear nueva notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.innerHTML = `
        <i class='bx bx-check-circle'></i>
        <span class="mensaje">${mensaje}</span>
    `;

    // Agregar al DOM
    document.body.appendChild(notificacion);

    // Mostrar con animación
    setTimeout(() => notificacion.classList.add('mostrar'), 100);

    // Ocultar después de 3 segundos
    setTimeout(() => {
        notificacion.classList.remove('mostrar');
        setTimeout(() => notificacion.remove(), 300);
    }, 3000);
}

// Marcar ítem activo en el menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const currentPath = window.location.pathname;

    menuItems.forEach(item => {
        if (currentPath.includes(item.getAttribute('href'))) {
            item.classList.add('activo');
        }
    });
});

// Función para filtrar y ordenar productos
function filtrarYOrdenarProductos(busqueda = '', categoria = 'todos', criterioOrden = 'relevancia') {
    if (!listaProductos) return;

    // Primero filtramos
    let productosFiltrados = productos.filter(producto => {
        const cumpleBusqueda = !busqueda || producto.titulo.toLowerCase().includes(busqueda.toLowerCase());
        const cumpleCategoria = categoria === 'todos' || producto.categoria === categoria;
        return cumpleBusqueda && cumpleCategoria;
    });

    // Luego ordenamos
    productosFiltrados.sort((a, b) => {
        switch(criterioOrden) {
            case 'precio-bajo':
                return a.precio - b.precio;
            case 'precio-alto':
                return b.precio - a.precio;
            case 'nuevos':
                return new Date(b.fecha) - new Date(a.fecha);
            default:
                return 0;
        }
    });

    // Mostramos los productos filtrados y ordenados
    listaProductos.innerHTML = productosFiltrados.map((producto) =>
        `<div class="producto" data-categoria="${producto.categoria}" data-precio="${producto.precio}">
            <img src="${producto.imagen}" alt="${producto.titulo}" class="imagen-producto">
            <div class="info-producto">
                <h2 class="titulo-producto">${producto.titulo}</h2>
                <p class="precio-producto">${producto.precio.toFixed(2)}€</p>
                <a class="agregar-carrito" data-id="${producto.id}">
                    <i class='bx bx-cart-add'></i>
                    Añadir al Carrito
                </a>
            </div>
        </div>`
    ).join("");

    // Agregar event listeners a los botones
    const botonesAgregar = document.getElementsByClassName("agregar-carrito");
    Array.from(botonesAgregar).forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

// Event listeners para los filtros
document.addEventListener('DOMContentLoaded', function() {
    const buscador = document.getElementById('buscar-producto');
    const categoriaSelect = document.getElementById('categoria');
    const ordenarSelect = document.getElementById('ordenar');

    // Mostrar productos inicialmente
    mostrarProductos();

    // Event listeners para filtros
    buscador?.addEventListener('input', () => {
        filtrarYOrdenarProductos(
            buscador.value,
            categoriaSelect.value,
            ordenarSelect.value
        );
    });

    categoriaSelect?.addEventListener('change', () => {
        filtrarYOrdenarProductos(
            buscador.value,
            categoriaSelect.value,
            ordenarSelect.value
        );
    });

    ordenarSelect?.addEventListener('change', () => {
        filtrarYOrdenarProductos(
            buscador.value,
            categoriaSelect.value,
            ordenarSelect.value
        );
    });
});

// Función para manejar el envío del formulario de pago
async function handlePaymentForm(event) {
    event.preventDefault();
    console.log('Procesando pago...');

    try {
        // Recoger datos del formulario
        const datosFactura = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            direccion: `${document.getElementById('direccion').value}, 
                       ${document.getElementById('ciudad').value}, 
                       ${document.getElementById('codigo-postal').value}`,
            productos: obtenerProductosCarrito(),
            subtotal: calcularSubtotal(),
            metodoPago: document.querySelector('input[name="metodo-pago"]:checked').value
        };

        console.log('Datos de factura:', datosFactura);

        // Enviar datos para generar factura
        const response = await fetch('/api/factura', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosFactura)
        });

        const data = await response.json();

        if (data.success) {
            mostrarNotificacion('¡Compra realizada con éxito! La factura ha sido enviada a tu correo.');
            localStorage.removeItem('carrito'); // Limpiar carrito
            setTimeout(() => {
                window.location.href = '/html/productos.html'; // Redirigir a productos
            }, 3000);
        } else {
            throw new Error(data.message || 'Error al procesar el pago');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarNotificacion('Error al procesar el pago. Por favor, intenta nuevamente.', 'error');
    }
}

// Función para obtener productos del carrito
function obtenerProductosCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    return carrito.map(item => ({
        nombre: item.titulo,
        cantidad: item.cantidad,
        precio: item.precio
    }));
}
// Función para calcular subtotal
function calcularSubtotal() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // ... código existente ...

    // Agregar listener para el formulario de pago
    const paymentForm = document.getElementById('formulario-pago');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePaymentForm);
    }
});
