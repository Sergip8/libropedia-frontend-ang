# Descripción Técnica del Proyecto Angular "storeFrontAng"

## Resumen General

"storeFrontAng" es una aplicación web desarrollada en Angular orientada a la gestión y visualización de una tienda de libros. El proyecto está estructurado de forma modular, siguiendo buenas prácticas de Angular, y utiliza componentes reutilizables, servicios, directivas, pipes y una arquitectura basada en módulos para separar la lógica de negocio, presentación y utilidades.

## Estructura de Carpetas y Componentes Clave

### 1. Núcleo (`_core`)
- **Directivas**: `img-fallback.directive.ts` permite mostrar una imagen por defecto si la imagen de un libro no se carga correctamente.
- **Interceptors**: `requests.interceptor.ts` añade el token de autenticación a las peticiones HTTP y gestiona errores de autenticación.
- **Pipes**: `safe-html.pipe.ts` permite renderizar HTML seguro en las vistas.
- **Servicios**: Incluye servicios para autenticación (`auth.service.ts`), autores, libros, categorías, comentarios y utilidades comunes. Estos servicios gestionan la comunicación con la API REST y el estado de la aplicación.

### 2. Modelos (`models`)
Define las interfaces y clases para los datos principales:
- Autenticación (usuarios, login, registro)
- Libros (detalles, filtros, paginación, autores, categorías, estadísticas de reseñas)
- Comentarios (reseñas de usuarios, payloads, respuestas)

### 3. Módulo Público (`public`)
- **Rutas**: Define rutas para home, catálogo, login, registro, detalles de libro y reseñas de usuario.
- **Componentes**: Incluye vistas para login, registro, catálogo de libros, detalles de libro, formulario de comentarios y la página principal pública.
- **Lógica de negocio**: Los componentes gestionan formularios reactivos, validaciones, navegación y consumo de servicios.

### 4. Compartidos (`shared`)
Componentes reutilizables y utilidades:
- **Alertas**: Sistema de notificaciones visuales.
- **Tarjetas**: Visualización de libros y autores en formato de tarjeta.
- **Barra de filtros**: Permite filtrar libros por autor, categoría y orden.
- **Paginación**: Componente para navegar entre páginas de resultados.
- **Dropdown de perfil**: Menú de usuario con opciones como "Mis reseñas" y "Cerrar sesión".
- **Búsqueda**: Barra de búsqueda con debounce y helper text.
- **Selects**: Componentes para selección de autor/categoría con búsqueda y selección múltiple.
- **Animaciones**: Definidas con Angular Animations para transiciones y feedback visual.

### 5. Environments
- Configuración de entornos para desarrollo y producción, incluyendo la URL base de la API.

### 6. Archivos Raíz
- `main.ts`: Bootstrap de la aplicación.
- `app.config.ts`: Configuración global de providers, rutas, interceptores y animaciones.
- `app.routes.ts`: Rutas principales.
- `index.html`: Entrada principal de la aplicación.

## Funcionalidades Principales

- **Autenticación de usuarios**: Registro, login, gestión de tokens JWT, roles y recuperación de usuario desde el token.
- **Catálogo de libros**: Visualización, filtrado y paginación de libros. Filtros por autor, categoría y ordenamiento.
- **Detalles de libro**: Página con información detallada, sinopsis, estadísticas de calificación, reseñas de usuarios y libros relacionados.
- **Reseñas de usuarios**: Los usuarios autenticados pueden dejar, editar y eliminar reseñas. Se muestra un resumen de las reseñas y estadísticas.
- **Componentes visuales modernos**: Uso de Tailwind CSS y Angular Animations para una UI atractiva y responsiva.
- **Gestión de estado reactivo**: Uso de `BehaviorSubject` y Observables para el manejo de filtros, paginación, usuario y alertas.
- **Interacción con API REST**: Todos los datos se obtienen y envían a través de servicios que consumen endpoints RESTful.

## Ejemplo de Flujo de Usuario
1. El usuario accede a la página principal y ve los libros mejor valorados.
2. Puede buscar libros, filtrar por autor/categoría y navegar por el catálogo.
3. Al seleccionar un libro, accede a la página de detalles, donde puede ver información, estadísticas y reseñas.
4. Si está autenticado, puede dejar una reseña, editarla o eliminarla.
5. Desde el menú de usuario, puede acceder a "Mis reseñas" y gestionar sus comentarios.

## Consideraciones Técnicas
- **Seguridad**: Uso de JWT para autenticación y autorización.
- **Reactividad**: Formularios reactivos, manejo de estado con Observables.
- **Accesibilidad**: Uso de etiquetas semánticas y componentes accesibles.
- **Escalabilidad**: Arquitectura modular y componentes reutilizables.
- **Internacionalización**: Preparado para mostrar textos y mensajes en español.

## Instalación y Ejecución

Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local:

### Prerrequisitos

Asegúrate de tener instalados los siguientes programas:

1. **Node.js** (versión 16 o superior): [Descargar Node.js](https://nodejs.org/)
2. **Angular CLI** (versión 15 o superior): Instálalo globalmente con el siguiente comando:
   ```bash
   npm install -g @angular/cli

3. **Git: Descargar Git**
Clonar el repositorio
Clona el repositorio del proyecto en tu máquina local:
    ```bash
    git clone https://github.com/Sergip8/libropedia-frontend-ang.git

4. Instalar dependencias
Navega a la carpeta del proyecto y ejecuta el siguiente comando para instalar las dependencias:

    ```bash
    cd storeFrontAng
    npm install

5. Ejecutar el proyecto en modo desarrollo
Para iniciar el servidor de desarrollo, ejecuta:
    ```bash
    ng serve

Esto iniciará la aplicación en http://localhost:4200/. Abre tu navegador y navega a esa URL para ver la aplicación en acción.