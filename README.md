# ClimaPunto

Sitio web profesional y responsive para una empresa local de climatización. El proyecto está planteado como una demostración para portfolio y muestra cómo una empresa de instalación, reparación y mantenimiento puede presentar sus servicios y convertir visitas en solicitudes de presupuesto.

> **Proyecto conceptual:** ClimaPunto no representa actualmente a una empresa real. Los datos comerciales y legales deben sustituirse antes de utilizar la web para un negocio.

## Demo

- [Ver la web publicada](https://rottendnb.github.io/climapunto/)
- [Ver el repositorio en GitHub](https://github.com/Rottendnb/climapunto)

## Características

- Diseño adaptable a móvil, tablet y ordenador.
- Presentación clara de servicios de climatización.
- Botones directos de llamada, correo electrónico y WhatsApp.
- Formulario para solicitar presupuesto y adjuntar fotografías.
- Sección de proceso de trabajo y preguntas frecuentes.
- Aviso de cookies y páginas de privacidad, cookies y aviso legal.
- Métricas locales opcionales, activadas únicamente con consentimiento.
- Configuración centralizada de los datos del negocio.
- Preparada para publicarse con GitHub Pages.

## Tecnologías

- HTML5
- CSS3
- JavaScript puro
- FormSubmit para el envío del formulario
- LocalStorage para preferencias y métricas locales

No utiliza frameworks, dependencias ni proceso de compilación.

## Estructura del proyecto

```text
climapunto/
├── assets/              # Logotipo e imágenes
├── CSS/                 # Hojas de estilo
├── JS/                  # Configuración e interacciones
├── index.html           # Página principal
├── aviso-legal.html     # Aviso legal
├── privacidad.html      # Política de privacidad
├── cookies.html         # Política de cookies
├── metricas.html        # Panel local de métricas
├── CONFIGURACION.md     # Guía de puesta en marcha
└── README.md
```

## Cómo abrirla en local

Puedes abrir `index.html` directamente en el navegador. Para trabajar con mayor comodidad también puedes usar una extensión como Live Server en Visual Studio Code.

No es necesario instalar paquetes ni ejecutar comandos de construcción.

## Configuración

Los datos principales se gestionan desde `JS/config.js`. Antes de usar la web para una empresa real hay que:

1. Sustituir el teléfono, WhatsApp, correo, horario y zona de servicio.
2. Completar la razón social, NIF/CIF y dirección.
3. Indicar la URL pública definitiva y revisar los datos SEO.
4. Añadir fotografías auténticas de trabajos realizados.
5. Revisar los textos legales y los proveedores utilizados.
6. Probar y activar el formulario de contacto.
7. Cambiar `demoMode` a `false` cuando toda la información sea definitiva.

La guía detallada está disponible en [`CONFIGURACION.md`](CONFIGURACION.md).

## Formulario

El formulario está preparado para funcionar mediante FormSubmit. Mientras `demoMode` esté activado, la página se mantiene como demostración y no debe utilizarse para recibir solicitudes reales.

Al poner el proyecto en producción, hay que configurar el correo receptor, realizar un envío de prueba y confirmar el mensaje de activación de FormSubmit.

## Publicación en GitHub Pages

1. Sube el contenido del proyecto a un repositorio de GitHub, manteniendo `index.html` en la raíz.
2. En el repositorio, entra en **Settings > Pages**.
3. Selecciona la rama principal y la carpeta raíz (`/root`).
4. Guarda los cambios y espera a que GitHub genere la dirección pública.

## Autor

Diseñado y desarrollado por **Fernando Graciani — Graciani Web Studio**.

- GitHub: [@Rottendnb](https://github.com/Rottendnb)
- Correo: [fernandoga89@gmail.com](mailto:fernandoga89@gmail.com)

## Licencia y uso

Proyecto creado como muestra de portfolio. No se autoriza su reutilización comercial, redistribución o venta sin permiso del autor.

