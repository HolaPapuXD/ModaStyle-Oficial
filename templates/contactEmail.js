exports.userTemplate = (name) => `
  <div style="max-width: 600px; margin: 0 auto; font-family: 'Helvetica', Arial, sans-serif; background-color: #f6f6f6; padding: 20px;">
    <div style="background: linear-gradient(135deg, #000046 0%, #1CB5E0 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
      <img src="https://tulogo.com/logo.png" alt="Logo" style="max-width: 180px; margin-bottom: 20px;">
      <h1 style="color: white; margin: 0; font-size: 28px; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">
        ¡Bienvenido/a ${name}!
      </h1>
    </div>
    
    <div style="background-color: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
      <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="color: #000046; margin-bottom: 15px;">¡Gracias por contactarnos!</h2>
        <p style="color: #666; line-height: 1.6; font-size: 16px;">
          Hemos recibido tu mensaje y nuestro equipo se pondrá en contacto contigo 
          lo antes posible. Normalmente respondemos en un plazo de 24-48 horas hábiles.
        </p>
      </div>

      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #000046; margin-top: 0;">Mientras tanto:</h3>
        <ul style="color: #666; line-height: 1.8; padding-left: 20px;">
          <li>Visita nuestra sección de preguntas frecuentes</li>
          <li>Explora nuestro catálogo de productos</li>
          <li>Síguenos en redes sociales para novedades</li>
        </ul>
      </div>

      <div style="text-align: center; margin-top: 30px; padding-top: 30px; border-top: 2px solid #eee;">
        <h4 style="color: #000046; margin-bottom: 15px;">Síguenos en nuestras redes sociales</h4>
        <div style="margin-bottom: 20px;">
          <a href="#" style="display: inline-block; margin: 0 10px; text-decoration: none;">
            <img src="https://tu-url/facebook-icon.png" alt="Facebook" style="width: 32px; height: 32px;">
          </a>
          <a href="#" style="display: inline-block; margin: 0 10px; text-decoration: none;">
            <img src="https://tu-url/instagram-icon.png" alt="Instagram" style="width: 32px; height: 32px;">
          </a>
          <a href="#" style="display: inline-block; margin: 0 10px; text-decoration: none;">
            <img src="https://tu-url/twitter-icon.png" alt="Twitter" style="width: 32px; height: 32px;">
          </a>
        </div>
        <p style="color: #888; font-size: 14px;">
          © ${new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </div>
`;

exports.adminTemplate = (data) => `
  <div style="max-width: 600px; margin: 0 auto; font-family: 'Helvetica', Arial, sans-serif; background-color: #f6f6f6; padding: 20px;">
    <div style="background: linear-gradient(135deg, #000046 0%, #1CB5E0 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <h2 style="color: white; margin: 0; font-size: 24px;">Nuevo Mensaje de Contacto</h2>
      <p style="color: #e6e6e6; margin: 10px 0 0;">Recibido: ${new Date().toLocaleString()}</p>
    </div>

    <div style="background-color: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
      <div style="margin-bottom: 30px;">
        <h3 style="color: #000046; border-bottom: 2px solid #eee; padding-bottom: 10px;">Información del Contacto</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666; width: 120px;">
              <strong>Nombre:</strong>
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">
              ${data.name}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">
              <strong>Email:</strong>
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">
              <a href="mailto:${data.email}" style="color: #1CB5E0; text-decoration: none;">
                ${data.email}
              </a>
            </td>
          </tr>
        </table>
      </div>

      <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin-top: 20px;">
        <h4 style="color: #000046; margin-top: 0; margin-bottom: 15px;">Mensaje del Usuario:</h4>
        <p style="color: #666; line-height: 1.6; margin: 0; white-space: pre-wrap;">${data.message}</p>
      </div>

      <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee; text-align: center;">
        <p style="color: #888; font-size: 14px; margin: 0;">
          Este es un mensaje automático del sistema de contacto.
          <br>
          © ${new Date().getFullYear()} Tu Empresa
        </p>
      </div>
    </div>
  </div>
`; 