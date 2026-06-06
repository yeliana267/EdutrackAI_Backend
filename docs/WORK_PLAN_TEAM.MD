# Plan de trabajo del backend EdutrackAI

Fecha de creacion: 2026-06-06

Repositorio: https://github.com/JRJ24/EdutrackAI_Backend

Este documento resume el plan de trabajo propuesto para avanzar el backend de EdutrackAI. El objetivo es convertir la estructura actual del proyecto en una API funcional, conectada a PostgreSQL con Prisma, con modulos implementados, autenticacion, validaciones, pruebas y documentacion de endpoints.

## Estado actual del proyecto

El backend ya cuenta con:

- Estructura base en TypeScript.
- Dependencias principales instaladas.
- Helpers reutilizables para CRUD, validacion, cifrado, hashing y errores.
- Esquema Prisma con modelos del dominio educativo.
- Carpetas de modulos creadas en `src/modules/`.
- Documentacion inicial en `docs/`.

Pendiente principal:

- Levantar la API de forma ejecutable.
- Conectar Prisma.
- Crear migraciones.
- Implementar servicios, controladores, rutas y validaciones.
- Proteger rutas con autenticacion.
- Agregar pruebas y documentacion de endpoints.

## Issues creados

| Orden | Issue | Enlace | Area |
| --- | --- | --- | --- |
| 1 | Configurar base ejecutable del backend | https://github.com/JRJ24/EdutrackAI_Backend/issues/1 | Infraestructura |
| 2 | Revisar esquema Prisma y generar migracion inicial | https://github.com/JRJ24/EdutrackAI_Backend/issues/2 | Base de datos |
| 3 | Implementar cliente Prisma y capa de acceso a datos | https://github.com/JRJ24/EdutrackAI_Backend/issues/3 | Base de datos |
| 4 | Implementar autenticacion, JWT y middlewares de seguridad | https://github.com/JRJ24/EdutrackAI_Backend/issues/4 | Seguridad |
| 5 | Implementar modulos de usuarios, roles y perfil academico | https://github.com/JRJ24/EdutrackAI_Backend/issues/5 | Usuarios |
| 6 | Implementar modulos de materias, calificaciones y sesiones de estudio | https://github.com/JRJ24/EdutrackAI_Backend/issues/6 | Gestion academica |
| 7 | Implementar modulos de quizzes, preguntas e intentos | https://github.com/JRJ24/EdutrackAI_Backend/issues/7 | Evaluaciones |
| 8 | Implementar recursos academicos y recomendaciones | https://github.com/JRJ24/EdutrackAI_Backend/issues/8 | Recursos |
| 9 | Implementar notificaciones, dashboard y administracion | https://github.com/JRJ24/EdutrackAI_Backend/issues/9 | Transversal |
| 10 | Agregar pruebas, QA y documentacion de endpoints | https://github.com/JRJ24/EdutrackAI_Backend/issues/10 | Calidad |

## Orden recomendado de ejecucion

### Fase 1: Base tecnica

Issues:

- #1 Configurar base ejecutable del backend.
- #2 Revisar esquema Prisma y generar migracion inicial.
- #3 Implementar cliente Prisma y capa de acceso a datos.

Objetivo:

Dejar el proyecto listo para correr, compilar, conectarse a la base de datos y generar el cliente Prisma.

Entregables:

- `pnpm run dev` funcionando.
- `tsconfig.json` configurado.
- `.env.example` completo.
- Prisma validado.
- Migracion inicial creada.
- Cliente Prisma disponible para servicios.

### Fase 2: Seguridad y usuarios

Issues:

- #4 Implementar autenticacion, JWT y middlewares de seguridad.
- #5 Implementar modulos de usuarios, roles y perfil academico.

Objetivo:

Crear la base de identidad del sistema, login, registro, roles y perfil academico.

Entregables:

- Registro y login.
- JWT funcional.
- Middleware de autenticacion.
- CRUD de usuarios, roles y perfil academico.
- Validaciones Zod.

### Fase 3: Gestion academica

Issues:

- #6 Implementar modulos de materias, calificaciones y sesiones de estudio.

Objetivo:

Permitir que los usuarios tengan materias, notas y sesiones de estudio registradas.

Entregables:

- CRUD de materias.
- Asociacion usuario-materia.
- Registro de calificaciones.
- Registro de sesiones de estudio.

### Fase 4: Evaluaciones

Issues:

- #7 Implementar modulos de quizzes, preguntas e intentos.

Objetivo:

Construir el flujo de quizzes, preguntas, opciones, intentos y respuestas.

Entregables:

- CRUD de quizzes.
- CRUD de preguntas y opciones.
- Flujo para iniciar/finalizar intentos.
- Calculo de resultados.

### Fase 5: Recursos, recomendaciones y seguimiento

Issues:

- #8 Implementar recursos academicos y recomendaciones.
- #9 Implementar notificaciones, dashboard y administracion.

Objetivo:

Agregar valor al seguimiento educativo con recursos, recomendaciones, notificaciones y vistas resumen.

Entregables:

- CRUD de recursos.
- Recomendaciones por usuario/materia.
- Notificaciones.
- Dashboard con metricas iniciales.
- Rutas administrativas protegidas.

### Fase 6: Calidad y documentacion

Issues:

- #10 Agregar pruebas, QA y documentacion de endpoints.

Objetivo:

Dejar el backend verificable y facil de usar por el equipo.

Entregables:

- Pruebas para helpers, servicios y endpoints criticos.
- Documentacion de endpoints.
- Ejemplos de request y response.
- Guia actualizada de comandos.

## Sugerencia de reparto por equipo

Una forma practica de repartir el trabajo:

| Rol sugerido | Responsabilidad |
| --- | --- |
| Backend base | Issues #1, #3 |
| Base de datos | Issue #2 |
| Seguridad | Issue #4 |
| Usuarios y perfiles | Issue #5 |
| Gestion academica | Issue #6 |
| Evaluaciones | Issue #7 |
| Recursos y recomendaciones | Issue #8 |
| Dashboard/admin/notificaciones | Issue #9 |
| QA/documentacion | Issue #10 |

Si el equipo es pequeno, se recomienda iniciar con dos frentes:

- Frente A: infraestructura, Prisma y autenticacion.
- Frente B: definicion de validaciones y contratos de modulos.

Los modulos funcionales deben comenzar despues de completar los issues #1, #2 y #3.

## Dependencias entre issues

```text
#1 Base ejecutable
  +-- #2 Prisma/migracion
  |   +-- #3 Cliente Prisma
  |       +-- #5 Usuarios/roles/perfil
  |       +-- #6 Materias/notas/sesiones
  |       +-- #7 Quizzes/preguntas/intentos
  |       +-- #8 Recursos/recomendaciones
  |       +-- #9 Notificaciones/dashboard/admin
  +-- #4 Autenticacion/JWT
      +-- #5 Usuarios/roles/perfil
      +-- #9 Admin protegido

#10 Pruebas/documentacion debe acompanar todas las fases y cerrarse al final.
```

## Convenciones recomendadas

- Cada modulo debe tener `controller`, `routes`, `service` y `validation`.
- Las validaciones deben hacerse con Zod antes de llegar al servicio.
- Los servicios deben usar Prisma desde `src/database/prisma.ts`.
- Las respuestas deben mantener el formato usado por los helpers CRUD:

```json
{
  "ok": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

- Los errores deben devolver:

```json
{
  "ok": false,
  "message": "Error message"
}
```

## Riesgos a resolver temprano

- Corregir nombres en Prisma antes de generar migraciones definitivas.
- Definir si se usara `Quizzies` o `Quizzes`.
- Definir si se usara `Resouces` o `Resources`.
- Definir si se usara `StudenAnswers` o `StudentAnswers`.
- Completar `.env.example` sin incluir secretos reales.
- Evitar que los endpoints devuelvan passwords o datos sensibles.
- Confirmar el formato de roles y permisos antes de proteger rutas admin.

## Criterio de finalizacion del plan

El plan puede considerarse completado cuando:

- La API levanta localmente.
- Prisma tiene migracion inicial y cliente generado.
- Los modulos principales tienen rutas funcionales.
- La autenticacion protege rutas privadas.
- Existen pruebas iniciales.
- El equipo tiene documentacion de endpoints y flujo de desarrollo.
