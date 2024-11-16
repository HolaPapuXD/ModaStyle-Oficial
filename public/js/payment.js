// Variables para la navegación entre pasos
let pasoActual = 1;
const secciones = document.querySelectorAll('.seccion-formulario');
const pasos = document.querySelectorAll('.paso');
const botonesSiguiente = document.querySelectorAll('.siguiente');
const botonesAnterior = document.querySelectorAll('.anterior');

// Función para actualizar el resumen del pedido
function actualizarResumenPedido() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const itemsResumen = document.querySelector('.items-resumen');
    const subtotalElemento = document.getElementById('subtotal-pedido');
    const ivaElemento = document.getElementById('iva-pedido');
    const totalElemento = document.getElementById('total-pedido');

    // Mostrar items con imágenes y detalles
    itemsResumen.innerHTML = carrito.map(item => `
        <div class="item-resumen">
            <div class="item-resumen-imagen">
                <img src="${item.imagen}" alt="${item.titulo}">
            </div>
            <div class="item-resumen-detalles">
                <h4>${item.titulo}</h4>
                <div class="item-resumen-info">
                    <span class="cantidad">Cantidad: ${item.cantidad}</span>
                    <span class="precio">Precio: ${item.precio.toFixed(2)}€</span>
                </div>
            </div>
        </div>
    `).join('');

    // Calcular totales
    const subtotal = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    const iva = subtotal * 0.21;
    const total = subtotal + iva;

    // Actualizar todos los elementos del resumen
    if (subtotalElemento) subtotalElemento.textContent = `${subtotal.toFixed(2)}€`;
    if (ivaElemento) ivaElemento.textContent = `${iva.toFixed(2)}€`;
    if (totalElemento) totalElemento.textContent = `${total.toFixed(2)}€`;

    // Agregar estilos CSS dinámicamente si no existen
    if (!document.getElementById('resumen-pedido-styles')) {
        const styles = document.createElement('style');
        styles.id = 'resumen-pedido-styles';
        styles.textContent = `
            .item-resumen {
                display: flex;
                gap: 1rem;
                padding: 1rem;
                border-bottom: 1px solid #eee;
            }
            .item-resumen-imagen {
                width: 80px;
                height: 80px;
                flex-shrink: 0;
            }
            .item-resumen-imagen img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 4px;
            }
            .item-resumen-detalles {
                flex-grow: 1;
            }
            .item-resumen-detalles h4 {
                margin: 0 0 0.5rem 0;
                color: #333;
            }
            .item-resumen-info {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
                color: #666;
                font-size: 0.9rem;
            }
            .seccion-formulario {
                display: none;
            }
            .seccion-formulario.activo {
                display: block;
            }
            .paso {
                opacity: 0.5;
                transition: opacity 0.3s ease;
            }
            .paso.activo {
                opacity: 1;
            }
        `;
        document.head.appendChild(styles);
    }
}

// Función para validar el paso actual
function validarPasoActual(paso) {
    const seccionActual = document.querySelector(`.seccion-formulario[data-seccion="${paso}"]`);
    const camposRequeridos = seccionActual.querySelectorAll('[required]');
    
    let valido = true;
    camposRequeridos.forEach(campo => {
        if (!campo.value) {
            valido = false;
            campo.classList.add('error');
        } else {
            campo.classList.remove('error');
        }
    });
    
    if (!valido) {
        mostrarNotificacion('Por favor, complete todos los campos requeridos', 'error');
    }
    
    return valido;
}

// Función para actualizar el paso activo
function actualizarPaso(paso) {
    secciones.forEach(seccion => {
        seccion.classList.remove('activo');
        if (seccion.dataset.seccion == paso) {
            seccion.classList.add('activo');
        }
    });
    
    pasos.forEach((p, index) => {
        if (index + 1 <= paso) {
            p.classList.add('activo');
        } else {
            p.classList.remove('activo');
        }
    });

    // Actualizar visibilidad de botones
    document.querySelectorAll('.botones-navegacion').forEach(nav => {
        const btnAnterior = nav.querySelector('.anterior');
        const btnSiguiente = nav.querySelector('.siguiente');
        
        if (btnAnterior) {
            btnAnterior.style.visibility = paso === 1 ? 'hidden' : 'visible';
        }
        
        if (btnSiguiente) {
            btnSiguiente.style.visibility = paso === 3 ? 'hidden' : 'visible';
        }
    });
}

// Event listeners para los botones de navegación
botonesSiguiente.forEach(boton => {
    boton.addEventListener('click', () => {
        if (pasoActual < 3 && validarPasoActual(pasoActual)) {
            pasoActual++;
            actualizarPaso(pasoActual);
        }
    });
});

botonesAnterior.forEach(boton => {
    boton.addEventListener('click', () => {
        if (pasoActual > 1) {
            pasoActual--;
            actualizarPaso(pasoActual);
        }
    });
});

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Actualizar resumen del pedido
    actualizarResumenPedido();

    // Inicializar navegación
    actualizarPaso(pasoActual);

    // Manejar el formulario de pago
    const paymentForm = document.getElementById('formulario-pago');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePaymentForm);
    }
});

// La función handlePaymentForm que ya teníamos
async function handlePaymentForm(event) {
    event.preventDefault();
    
    if (!validarPasoActual(pasoActual)) {
        return;
    }

    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    
    try {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        if (carrito.length === 0) {
            mostrarNotificacion('El carrito está vacío', 'error');
            return;
        }

        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            direccion: document.getElementById('direccion').value,
            ciudad: document.getElementById('ciudad').value,
            codigoPostal: document.getElementById('codigo-postal').value,
            productos: carrito.map(item => ({
                titulo: item.titulo,
                cantidad: item.cantidad,
                precio: item.precio
            })),
            subtotal: carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0),
            metodoPago: document.querySelector('input[name="metodo-pago"]:checked').value
        };

        const response = await fetch('/api/factura', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (data.success) {
            mostrarNotificacion('¡Compra realizada con éxito! La factura ha sido enviada a tu correo.');
            localStorage.removeItem('carrito');
            setTimeout(() => {
                window.location.href = '/html/productos.html';
            }, 3000);
        } else {
            throw new Error(data.message || 'Error al procesar el pago');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarNotificacion('Error al procesar el pago', 'error');
    } finally {
        submitButton.disabled = false;
    }
} 