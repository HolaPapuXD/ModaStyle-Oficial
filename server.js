require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// Importar las plantillas
const { userTemplate, adminTemplate, facturaTemplate } = require('./templates/emailTemplates.js');

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

// Rutas para las páginas HTML
app.get('/productos.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/productos.html'));
});

app.get('/nosotros.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/nosotros.html'));
});

app.get('/contactanos.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/contactanos.html'));
});

app.get('/portafolio.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/portafolio.html'));
});

app.get('/carrito.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/carrito.html'));
});

app.get('/pago.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/pago.html'));
});

// Ruta para el formulario de contacto
app.post('/api/contacto', async (req, res) => {
    console.log('Recibida petición POST a /api/contacto');
    try {
        const { nombre, email, mensaje } = req.body;
        
        if (!nombre || !email || !mensaje) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son requeridos'
            });
        }

        // Enviar solo un correo al usuario
        await transporter.sendMail({
            from: `"ModaStyle" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '¡Gracias por contactarnos!',
            html: userTemplate(nombre)
        });

        // Enviar correo al administrador
        await transporter.sendMail({
            from: `"ModaStyle Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: 'Nuevo mensaje de contacto',
            html: adminTemplate({ nombre, email, mensaje })
        });

        res.json({ 
            success: true, 
            message: 'Mensajes enviados exitosamente' 
        });

    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al procesar la solicitud',
            error: error.message 
        });
    }
});

// Ruta para generar y enviar factura
app.post('/api/factura', async (req, res) => {
    console.log('Recibida solicitud de factura:', req.body);
    
    try {
        const datosFactura = {
            nombre: req.body.nombre,
            email: req.body.email,
            direccion: req.body.direccion,
            numeroFactura: `FAC-${Date.now()}`,
            fecha: new Date().toLocaleDateString('es-ES'),
            productos: req.body.productos,
            subtotal: req.body.subtotal,
            iva: req.body.subtotal * 0.21,
            total: req.body.subtotal * 1.21,
            metodoPago: req.body.metodoPago,
            estado: 'Pagado'
        };

        console.log('Enviando factura a:', datosFactura.email);

        // Enviar factura por correo
        await transporter.sendMail({
            from: `"ModaStyle" <${process.env.EMAIL_USER}>`,
            to: datosFactura.email,
            subject: `Factura #${datosFactura.numeroFactura} - ModaStyle`,
            html: facturaTemplate(datosFactura)
        });

        console.log('Factura enviada exitosamente');

        res.json({
            success: true,
            message: 'Factura enviada exitosamente',
            numeroFactura: datosFactura.numeroFactura
        });

    } catch (error) {
        console.error('Error al enviar factura:', error);
        res.status(500).json({
            success: false,
            message: 'Error al enviar la factura',
            error: error.message
        });
    }
});

// La ruta 404 debe ir después de todas las demás rutas
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});

// Configurar el transportador de correo
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Verificar la configuración del correo
transporter.verify((error, success) => {
    if (error) {
        console.error('Error en la configuración del correo:', error);
    } else {
        console.log('Servidor listo para enviar correos');
    }
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
}); 