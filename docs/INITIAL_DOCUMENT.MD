# Documentacion inicial del backend EdutrackAI

Fecha de revision: 2026-06-06

Este documento describe la estructura actual del repositorio y las tecnologias detectadas en el backend. La base del proyecto esta creada, con utilidades reutilizables para CRUD, validaciones, cifrado y errores, pero varios modulos principales todavia estan en estado inicial o con archivos vacios.

## Resumen del proyecto

EdutrackAI Backend es una API en TypeScript orientada a Node.js. Por las dependencias y archivos presentes, el proyecto esta preparado para trabajar con:

- Express como framework HTTP.
- Prisma como ORM.
- PostgreSQL como base de datos.
- Zod para validacion de datos.
- Socket.IO para comunicacion en tiempo real.
- Passport y Google OAuth para autenticacion externa.
- JWT para autenticacion basada en tokens.
- Bcrypt/BcryptJS para hashing de contrasenas.
- AWS S3, Multer y Sharp para carga, almacenamiento y transformacion de archivos o imagenes.

Nota: algunas tecnologias estan instaladas como dependencias, pero aun no tienen implementacion visible en los archivos actuales.

## Tecnologias utilizadas

### Runtime y lenguaje

- Node.js: runtime principal.
- TypeScript: lenguaje base del proyecto.
- pnpm: gestor de paquetes configurado en `package.json` como `pnpm@10.28.2`.

### API HTTP

- Express 5: framework para construir rutas, middlewares y controladores.
- Morgan: logging HTTP.
- CORS: control de acceso entre origenes.

### Base de datos

- Prisma 7: ORM y cliente de base de datos.
- PostgreSQL: proveedor configurado en `prisma/schema.prisma`.
- `@prisma/adapter-pg` y `pg`: integracion con PostgreSQL.

### Validacion y seguridad

- Zod: validacion de body y params.
- bcryptjs / bcrypt: hashing de contrasenas.
- jsonwebtoken y jwt-decode: manejo de tokens JWT.
- crypto de Node.js: cifrado AES-256-CBC para campos sensibles.
- Passport y passport-google-oauth20: autenticacion con Google OAuth 2.0.

### Archivos y media

- Multer: manejo de archivos multipart.
- multer-s3 y multer-s3-transform: integracion de cargas con AWS S3.
- Sharp: procesamiento y transformacion de imagenes.
- AWS SDK S3: cliente oficial para operaciones con S3.

### Tiempo real

- Socket.IO: dependencia instalada para eventos en tiempo real. El archivo `src/socket.ts` existe, pero actualmente esta vacio.

## Estructura actual

```text
EdutrackAI_Backend/
+-- docs/
|   +-- INITIAL_DOCUMENT.MD
+-- prisma/
|   +-- schema.prisma
+-- src/
|   +-- app.ts
|   +-- router.ts
|   +-- socket.ts
|   +-- config/
|   |   +-- env.ts
|   +-- database/
|   |   +-- prisma.ts
|   +-- helpers/
|   |   +-- crud-controller.ts
|   |   +-- crud-routes.ts
|   |   +-- crud-service.ts
|   |   +-- encryption.ts
|   |   +-- hashpassword.ts
|   |   +-- http-error.ts
|   |   +-- jwt.ts
|   |   +-- secure-fields.ts
|   |   +-- validations.ts
|   +-- middlewares/
|   |   +-- auth-google.ts
|   |   +-- auth.middlewares.ts
|   |   +-- validate.middlewares.ts
|   +-- modules/
|   |   +-- auth/
|   |   |   +-- auth.controller.ts
|   |   |   +-- auth.routes.ts
|   |   |   +-- auth.service.ts
|   |   |   +-- auth.validation.ts
|   |   +-- users/
|   |       +-- user.controller.ts
|   |       +-- user.routes.ts
|   |       +-- user.service.ts
|   |       +-- user.validation.ts
|   +-- public/
|       +-- index.html
+-- .env
+-- .env.example
+-- .gitignore
+-- package.json
+-- pnpm-lock.yaml
+-- prisma.config.ts
+-- README
+-- tsconfig.json
```

## Descripcion por carpeta

### `docs/`

Contiene la documentacion del proyecto. Actualmente incluye este documento inicial.

### `prisma/`

Contiene la configuracion del esquema de Prisma.

Archivo principal:

- `schema.prisma`: define el generador del cliente Prisma y el datasource PostgreSQL.

Estado actual:

- El cliente Prisma se genera hacia `src/generated/prisma`.
- El datasource usa PostgreSQL.
- No hay modelos definidos todavia en el esquema.

### `src/`

Contiene el codigo fuente del backend.

Archivos principales:

- `app.ts`: esperado como punto de configuracion de Express. Actualmente esta vacio.
- `router.ts`: esperado como agregador de rutas. Actualmente esta vacio.
- `socket.ts`: esperado como configuracion de Socket.IO. Actualmente esta vacio.

### `src/config/`

Carpeta destinada a configuraciones globales.

- `env.ts`: esperado para centralizar variables de entorno. Actualmente esta vacio.

### `src/database/`

Carpeta destinada a la configuracion de acceso a datos.

- `prisma.ts`: esperado para inicializar y exportar el cliente Prisma. Actualmente esta vacio.

### `src/helpers/`

Contiene utilidades reutilizables que ya tienen implementacion parcial.

- `crud-controller.ts`: crea controladores CRUD genericos con respuestas JSON estandarizadas y manejo de errores.
- `crud-service.ts`: crea servicios CRUD genericos sobre modelos Prisma, con soporte para `select`, `orderBy`, campos cifrados y hooks `prepareCreate` / `prepareUpdate`.
- `crud-routes.ts`: genera rutas CRUD Express con validacion de parametros y body.
- `encryption.ts`: implementa cifrado y descifrado AES-256-CBC usando `ENCRYPTION_KEY`.
- `secure-fields.ts`: normaliza emails y cifra/descifra campos seleccionados.
- `hashpassword.ts`: genera hashes de contrasenas con bcryptjs y 12 salt rounds.
- `http-error.ts`: define `HttpError` y normaliza respuestas de error.
- `validations.ts`: define esquemas reutilizables con Zod, como UUID para `id`, numeros decimales y objetos no vacios.
- `jwt.ts`: existe, pero actualmente esta vacio.

### `src/middlewares/`

Contiene middlewares de Express.

- `validate.middlewares.ts`: valida `req.body` y `req.params` con Zod.
- `auth.middlewares.ts`: existe, pero actualmente esta vacio.
- `auth-google.ts`: existe, pero actualmente esta vacio.

### `src/modules/`

Contiene los modulos funcionales del sistema.

Modulos actuales:

- `auth/`: modulo esperado para autenticacion.
- `users/`: modulo esperado para usuarios.

Cada modulo tiene archivos para controller, routes, service y validation, pero todos estan vacios actualmente.

### `src/public/`

Contiene archivos publicos o estaticos.

- `index.html`: HTML base minimo.

## Prisma y base de datos

Configuracion detectada:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

`prisma.config.ts` carga variables de entorno con `dotenv/config` y define:

- Esquema: `prisma/schema.prisma`.
- Migraciones: `prisma/migrations`.
- URL de conexion: `DATABASE_URL`.

Variables requeridas inferidas:

- `DATABASE_URL`: cadena de conexion a PostgreSQL.
- `ENCRYPTION_KEY`: clave usada por `src/helpers/encryption.ts` para cifrar campos sensibles.

## Patron CRUD actual

El proyecto ya incluye una base para construir modulos CRUD de forma consistente.

Flujo esperado:

1. Definir un modelo Prisma.
2. Crear esquemas Zod para crear y actualizar.
3. Crear un servicio con `createCrudService`.
4. Crear un controlador con `createCrudController`.
5. Crear rutas con `createCrudRoutes`.
6. Montar las rutas en `router.ts` o en el archivo de entrada de Express.

Respuesta exitosa esperada:

```json
{
  "ok": true,
  "message": "Entity fetched successfully",
  "data": {}
}
```

Respuesta de error esperada:

```json
{
  "ok": false,
  "message": "Validation error"
}
```

## Estado actual de implementacion

Implementado:

- Helpers CRUD genericos.
- Validacion de body y params con Zod.
- Esquemas reutilizables de validacion.
- Clase de error HTTP.
- Cifrado y descifrado de campos sensibles.
- Hashing de contrasenas.
- Configuracion base de Prisma.

Pendiente o vacio:

- Inicializacion de Express en `src/app.ts`.
- Registro global de rutas en `src/router.ts`.
- Configuracion de Socket.IO en `src/socket.ts`.
- Cliente Prisma en `src/database/prisma.ts`.
- Configuracion centralizada de entorno en `src/config/env.ts`.
- Modelos Prisma.
- Migraciones Prisma.
- Logica de autenticacion.
- Logica de usuarios.
- Middlewares de autenticacion.
- Scripts de desarrollo, build y lint en `package.json`.
- Configuracion real de TypeScript en `tsconfig.json`.
- Contenido de `.env.example`.

## Scripts actuales

`package.json` solo define:

```json
{
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

No hay scripts visibles para:

- Desarrollo local.
- Compilacion TypeScript.
- Ejecucion de migraciones.
- Generacion de cliente Prisma.
- Linting.
- Testing real.

## Recomendaciones inmediatas

1. Completar `tsconfig.json` con una configuracion TypeScript valida.
2. Agregar scripts para `dev`, `build`, `start`, `prisma:generate` y `prisma:migrate`.
3. Completar `.env.example` con las variables requeridas sin valores sensibles.
4. Implementar `src/database/prisma.ts` para exportar el cliente Prisma.
5. Definir modelos iniciales en `prisma/schema.prisma`.
6. Implementar `src/app.ts` y `src/router.ts`.
7. Implementar los modulos `auth` y `users` usando los helpers CRUD y validaciones existentes.
8. Agregar pruebas para helpers compartidos y endpoints principales.
