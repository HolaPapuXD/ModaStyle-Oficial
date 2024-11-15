document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (data.success) {
            alert('¡Mensaje enviado exitosamente!');
            // Limpiar formulario
            e.target.reset();
        } else {
            alert('Error al enviar el mensaje');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al enviar el mensaje');
    }
}); 