// Función para manejar el envío del formulario de contacto
async function handleContactForm(event) {
    event.preventDefault();
    
    // Deshabilitar el botón de envío para prevenir doble envío
    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    
    try {
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            mensaje: document.getElementById('mensaje').value
        };

        const response = await fetch('/api/contacto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (data.success) {
            mostrarNotificacion('¡Mensaje enviado exitosamente!');
            event.target.reset();
        } else {
            throw new Error(data.message || 'Error al enviar el mensaje');
        }
    } catch (error) {
        console.error('Error completo:', error);
        mostrarNotificacion('Error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
    } finally {
        // Reactivar el botón de envío
        submitButton.disabled = false;
    }
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.formulario-contacto');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}); 