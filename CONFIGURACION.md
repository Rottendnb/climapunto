# ClimaPunto — puesta en marcha

La web está terminada en modo demostración. Todos los datos del negocio se controlan desde `JS/config.js`.

## Antes de publicarla

1. Completa `legalName`, `taxId`, `address`, `phone`, `phoneDisplay`, `whatsapp`, `email`, `schedule` y `serviceArea`.
2. Añade el dominio definitivo en `website.publicUrl`.
   Ajusta también `seoTitle`, `seoDescription` y `socialImage` si cambia la marca, la ciudad o la imagen principal.
3. El formulario está conectado a FormSubmit y enviará las solicitudes a `fernandoga89@gmail.com`. La primera prueba enviará un correo de activación que debe confirmarse.
4. Guarda una fotografía auténtica como `assets/trabajo-real.webp`, completa `featuredProject` y cambia `enabled` a `true`.
5. Revisa y completa `aviso-legal.html`, `privacidad.html` y `cookies.html` con los proveedores y plazos reales.
6. Cambia `demoMode` a `false` solo después de completar y probar lo anterior.
7. Genera un `sitemap.xml` con el dominio final y añádelo a `robots.txt`.

## Analítica

La medición requiere consentimiento. Sin aceptación no se guarda ningún contador. En esta versión los datos permanecen en el navegador y se consultan en `metricas.html`. Si se configura `analyticsEndpoint`, los eventos consentidos también se enviarán a ese endpoint cuando `demoMode` sea `false`.

## Publicación

La carpeta que debe subirse completa es `climapunto`, conservando `index.html` en la raíz y las carpetas `CSS`, `JS` y `assets`.

El formulario admite un máximo de 5 fotografías y 10 MB en total.

La página está optimizada para móvil y muestra dos acciones fijas: WhatsApp y presupuesto. Para enseñarla fuera de este ordenador será necesario publicarla en una dirección web.
