# 🧪 Atom Technical Challenge

Esta es una prueba técnica realizada para **Atom**, que consiste en una aplicación web para la gestión de listas de tareas (to-do list). El objetivo fue implementar tanto el backend como el frontend, usando tecnologías modernas.

## 🛠️ Tecnologías solicitadas

- API desarrollada con **Express + TypeScript**, desplegada en **Firebase Cloud Functions**
- Base de datos en **Firestore**
- Aplicación web desarrollada en **Angular**, desplegada en **Firebase Hosting**

---

## ✅ Funcionalidades completadas

### 🚀 Despliegue automático

Se implementó despliegue automático utilizando **GitHub Actions** para la API y la aplicación web. Los flujos se configuran desde la carpeta [`workflows`](.github/workflows), y solo se ejecutan cuando hay cambios en los folders correspondientes dentro de la rama `main`.

La configuración de despliegue a Firebase (Functions y Hosting) utiliza **secretos en GitHub** para proteger el token de autenticación.

**Mejoras planeadas:**

- Implementar integración continua: ejecutar pruebas unitarias en cada pull request.
- Despliegue en entornos separados (`dev` y `prod`) utilizando proyectos de Firebase independientes.
- Usar Firebase Hosting Preview Channels para revisar visualmente los cambios antes de integrarlos.

---

### 🔥 Base de datos en Firestore

Se utilizó Firestore como base de datos. La estructura cuenta con una colección principal `users`, y una subcolección `to-do` para cada usuario, permitiendo aislar sus datos.

**Mejoras planeadas:**

- Crear una estrategia de limpieza automática de tareas completadas y no editadas recientemente, mediante **cron jobs** en Cloud Functions.
- Mover elementos eliminados a una subcolección `to-do-deleted` para posibles sugerencias futuras.
- Agregar un campo de fecha de última edición en cada `to-do`.
- Implementar reglas de seguridad para restringir el acceso según el usuario.

---

### 🔧 API

- API desarrollada con **Express + TypeScript**, desplegada en **Firebase Cloud Functions**.
- Endpoints para gestión de usuarios y de tareas.
- Documentación de pruebas disponible en Postman ([ver aquí](postman)).
- Uso de **Zod** para validación de datos entrantes mediante middleware.
- Middleware para validar presencia de un "token" simulado (actualmente se utiliza `userId` en algunas peticiones).
- Arquitectura basada en capas: `controller -> service`. El service utiliza un cliente de Firestore implementado como **Singleton**.
- Tipado básico en todos los módulos.

**Mejoras planeadas:**

- Middleware global de manejo de errores.
- Funciones reutilizables para transformar datos (e.g., agregar `id`, convertir `Timestamp` a `Date`).
- Mejorar sistema de logging.
- Ejecutar el linter automáticamente con cada commit y bloquear commits con errores.

---

### 🌐 Aplicación Web (Angular)

- Aplicación creada con **Angular** usando *standalone components* y **signals**.
- Se implementó registro y autenticación de usuarios.
- Se configuraron *guards* para proteger rutas privadas.

**Mejoras y tareas pendientes:**

- Completar la gestión de tareas:
    - Listados separados para tareas completadas y pendientes.
    - Cada tarea será representada como una tarjeta (`nz-card`) editable o eliminable.
    - Tarjeta adicional para agregar nuevas tareas.
    - El listado se cargará completo, sin paginación.

- Componentes previstos:
    - `HomeComponent`: gestiona comunicación con la API.
    - Componentes dummies (usando `@Input`/`@Output`):
        - `app-items-list`: renderiza la lista de tareas con `@for`.
        - `app-item`: representa cada tarea en una tarjeta.
        - `app-item-editable`: formulario sobre una tarjeta para crear o editar tareas.

- La app aún no es responsive, pero se planea ajustar:
    - Las tarjetas cambiarán tamaño y detalles visuales según el dispositivo.
    - La pantalla de login ya está diseñada para ser uniforme en distintos dispositivos.

- Funcionalidades adicionales por implementar:
    - Botón de logout.
    - Cambios optimistas en UI: aplicar cambios antes de confirmar la respuesta del servidor; revertir en caso de error.
    - Interceptor HTTP para agregar el token en las peticiones necesarias.
    - Manejador global de errores que muestre *toasts*.
    - Implementar **NgRx** para una mejor gestión de estado.
    - Agregar ESLint y Prettier, y ejecutarlos automáticamente con cada commit. 

