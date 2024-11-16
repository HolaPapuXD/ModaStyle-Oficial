const userTemplate = (nombre) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <img src="https://i.imgur.com/YourLogo.png" alt="ModaStyle Logo" style="max-width: 200px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 28px; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">
                ¡Gracias por contactarnos, ${nombre}!
            </h1>
        </div>
        
        <div style="background-color: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <p style="color: #666; line-height: 1.6; font-size: 16px; margin-bottom: 20px;">
                Hemos recibido tu mensaje y nuestro equipo se pondrá en contacto contigo lo antes posible. 
                Normalmente respondemos en un plazo de 24-48 horas hábiles.
            </p>

            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #34495e; margin-top: 0;">Mientras tanto:</h3>
                <ul style="color: #666; line-height: 1.8;">
                    <li>Visita nuestra <a href="https://tutienda.com/coleccion" style="color: #e67e22; text-decoration: none;">nueva colección</a></li>
                    <li>Síguenos en nuestras redes sociales para novedades</li>
                    <li>Revisa nuestras ofertas especiales</li>
                </ul>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 30px; border-top: 2px solid #eee;">
                <p style="color: #888; font-size: 14px;">Síguenos en nuestras redes sociales</p>
                <div style="margin: 15px 0;">
                    <a href="#" style="text-decoration: none; margin: 0 10px;"><img src="https://i.imgur.com/facebook.png" alt="Facebook" style="width: 32px;"></a>
                    <a href="#" style="text-decoration: none; margin: 0 10px;"><img src="https://i.imgur.com/instagram.png" alt="Instagram" style="width: 32px;"></a>
                    <a href="#" style="text-decoration: none; margin: 0 10px;"><img src="https://i.imgur.com/twitter.png" alt="Twitter" style="width: 32px;"></a>
                </div>
            </div>
        </div>

        <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>© ${new Date().getFullYear()} ModaStyle. Todos los derechos reservados.</p>
            <p>Si no solicitaste este correo, puedes ignorarlo.</p>
        </div>
    </div>
`;

const adminTemplate = ({ nombre, email, mensaje }) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%); padding: 30px 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; text-align: center;">Nuevo Mensaje de Contacto</h1>
        </div>
        
        <div style="background-color: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 30px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 15px; border-bottom: 1px solid #eee; color: #666; width: 120px;">
                            <strong>Nombre:</strong>
                        </td>
                        <td style="padding: 15px; border-bottom: 1px solid #eee;">
                            ${nombre}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 15px; border-bottom: 1px solid #eee; color: #666;">
                            <strong>Email:</strong>
                        </td>
                        <td style="padding: 15px; border-bottom: 1px solid #eee;">
                            <a href="mailto:${email}" style="color: #e67e22; text-decoration: none;">
                                ${email}
                            </a>
                        </td>
                    </tr>
                </table>
            </div>

            <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px;">
                <h3 style="color: #34495e; margin-top: 0; margin-bottom: 15px;">Mensaje:</h3>
                <p style="color: #666; line-height: 1.6; margin: 0; white-space: pre-wrap;">${mensaje}</p>
            </div>

            <div style="margin-top: 30px; text-align: center;">
                <a href="mailto:${email}" 
                   style="display: inline-block; padding: 12px 25px; background-color: #e67e22; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    Responder al Cliente
                </a>
            </div>
        </div>

        <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>Este es un mensaje automático del sistema de contacto de ModaStyle.</p>
        </div>
    </div>
`;

const facturaTemplate = (datos) => {
    return `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
        <div style="background: #34495e; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: #fff; margin: 0;">ModaStyle</h1>
            <p style="color: #fff; margin: 5px 0 0;">Factura de Compra</p>
        </div>
        
        <div style="background: #fff; padding: 20px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <div style="border-bottom: 2px solid #34495e; padding-bottom: 10px; margin-bottom: 20px;">
                <p style="margin: 5px 0;"><strong>Factura Nº:</strong> ${datos.numeroFactura}</p>
                <p style="margin: 5px 0;"><strong>Fecha:</strong> ${datos.fecha}</p>
                <p style="margin: 5px 0;"><strong>Estado:</strong> ${datos.estado}</p>
            </div>

            <div style="margin-bottom: 20px;">
                <h3 style="color: #34495e; margin-bottom: 10px;">Datos del Cliente</h3>
                <p style="margin: 5px 0;"><strong>Nombre:</strong> ${datos.nombre}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${datos.email}</p>
                <p style="margin: 5px 0;"><strong>Dirección:</strong> ${datos.direccion}</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                    <tr style="background: #34495e; color: #fff;">
                        <th style="padding: 10px; text-align: left;">Producto</th>
                        <th style="padding: 10px; text-align: center;">Cantidad</th>
                        <th style="padding: 10px; text-align: right;">Precio</th>
                        <th style="padding: 10px; text-align: right;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${datos.productos.map(producto => `
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 10px;">${producto.nombre}</td>
                            <td style="padding: 10px; text-align: center;">${producto.cantidad}</td>
                            <td style="padding: 10px; text-align: right;">$${producto.precio}</td>
                            <td style="padding: 10px; text-align: right;">$${producto.precio * producto.cantidad}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>Subtotal:</span>
                    <span>$${datos.subtotal}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>IVA (21%):</span>
                    <span>$${(datos.subtotal * 0.21).toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-weight: bold; color: #34495e;">
                    <span>Total:</span>
                    <span>$${(datos.subtotal * 1.21).toFixed(2)}</span>
                </div>
            </div>

            <div style="margin-top: 20px; text-align: center; color: #666;">
                <p><strong>Método de Pago:</strong> ${datos.metodoPago}</p>
                <p style="margin-top: 20px;">¡Gracias por tu compra!</p>
            </div>
        </div>
    </div>
    `;
}

module.exports = { userTemplate, adminTemplate, facturaTemplate }; 