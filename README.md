# 🧩 Angular Standalone Components App

Este es un proyecto web desarrollado con **Angular** utilizando la arquitectura de **Standalone Components**, enfocado en modularidad, reutilización de componentes y una interfaz limpia. El proyecto incluye componentes como una barra de filtros y un sistema de comentarios.

---

## 🚀 Tecnologías utilizadas

- **Framework:** Angular 19
- **Lenguaje:** TypeScript
- **Routing:** Angular Router con lazy loading
- **Componentes:** Standalone Components
- **Estilos:** Tailwind
- **Gestión de paquetes:** npm

---

## 📁 Estructura del proyecto

src/ ├── app/ │ ├── app.component.ts # Componente raíz │ ├── app.routes.ts # Definición de rutas │ ├── app.config.ts # Configuración inicial │ └── shared/ │ ├── filter-bar/ # Barra de filtros │ └── comments/ # Comentarios de usuarios ├── index.html # HTML principal ├── main.ts # Punto de entrada └── styles.css # Estilos globales

yaml
Copy
Edit

---

## 📦 Instalación

Clona el repositorio y ejecuta los siguientes comandos:

```bash
npm install
npm start
Esto iniciará la aplicación en:
👉 http://localhost:4200/


📌 Requisitos previos
Node.js 18+

Angular CLI

bash
Copy
Edit
npm install -g @angular/cli