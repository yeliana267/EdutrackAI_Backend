# Documentacion de Prisma y modulos

Fecha de revision: 2026-06-06

Este documento resume lo agregado en Prisma y la estructura de modulos creada para el backend de EdutrackAI. El proyecto ya cuenta con un esquema de datos amplio para la plataforma educativa y con carpetas modulares preparadas para implementar controladores, rutas, servicios y validaciones.

## Estado general

Se agrego un modelo de datos en `prisma/schema.prisma` orientado a:

- Gestion de usuarios y roles.
- Perfil academico del estudiante.
- Materias y asignacion de materias a usuarios.
- Quizzes, preguntas, opciones y respuestas del estudiante.
- Intentos de quizzes.
- Calificaciones.
- Sesiones de estudio.
- Recursos academicos.
- Recomendaciones personalizadas.
- Notificaciones.

Tambien se agregaron modulos en `src/modules/` para representar esas areas funcionales. Actualmente los archivos de esos modulos existen como estructura base, pero no tienen logica implementada todavia.

## Configuracion Prisma

Archivo principal:

```text
prisma/schema.prisma
```

Configuracion actual:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

Detalles:

- Prisma genera el cliente en `src/generated/prisma`.
- La base de datos configurada es PostgreSQL.
- La URL de conexion se define desde `prisma.config.ts` usando la variable de entorno `DATABASE_URL`.
- No se encontraron migraciones en `prisma/migrations`.
- `src/database/prisma.ts` existe, pero actualmente esta vacio.

## Modelos agregados en Prisma

### `User`

Representa a los usuarios del sistema.

Campos principales:

- Datos personales: `firstName`, `lastName`, `email`, `avatarUrl`.
- Datos academicos: `studentCode`, `career`.
- Seguridad: `password`, `emailVerified`, `lastLogin`.
- Estado: `isActive`, `deletedAt`.
- Auditoria: `createdAt`, `updateAt`.

Relaciones:

- Pertenece a un `Roles`.
- Tiene perfiles academicos.
- Puede estar asociado a materias mediante `UserSubject`.
- Puede crear quizzes.
- Puede tener intentos de quizzes.
- Puede tener calificaciones, sesiones de estudio, recomendaciones y notificaciones.

### `Roles`

Representa los roles disponibles en el sistema.

Campos principales:

- `name`
- `description`
- `createdAt`
- `updateAt`

Relaciones:

- Un rol puede estar asignado a muchos usuarios.

### `AcademicProfile`

Representa el perfil academico de un usuario.

Campos principales:

- `academicLevel`
- `learningStyle`
- `preferredStudyTime`
- `weeklyStudyGoalHours`
- `mainDifficulties`

Relaciones:

- Pertenece a un `User`.

### `Subject`

Representa una materia o asignatura.

Campos principales:

- `name`
- `description`
- `level`
- `isActive`
- `createdAt`
- `updateAt`

Relaciones:

- Puede estar asociada a usuarios mediante `UserSubject`.
- Tiene quizzes.
- Tiene calificaciones.
- Tiene sesiones de estudio.
- Tiene recursos.
- Tiene recomendaciones.

### `UserSubject`

Modelo intermedio entre usuarios y materias.

Campos principales:

- `userId`
- `subjectId`
- `currentAverage`
- `difficultyLevel`
- `status`

Relaciones:

- Pertenece a un `User`.
- Pertenece a un `Subject`.

### `Quizzies`

Representa los quizzes creados para una materia.

Campos principales:

- `subjectId`
- `title`
- `description`
- `difficulty`
- `timeLimitMinutes`
- `isActive`
- `createBy`
- `createAt`

Relaciones:

- Pertenece a un `Subject`.
- Es creado por un `User`.
- Tiene intentos en `QuizAttempts`.
- Tiene preguntas en `Questions`.

### `QuizAttempts`

Representa un intento de quiz realizado por un usuario.

Campos principales:

- `quizId`
- `userId`
- `score`
- `totalQuestion`
- `correctAnswers`
- `startedAt`
- `finishedAt`

Relaciones:

- Pertenece a un `Quizzies`.
- Pertenece a un `User`.
- Tiene respuestas en `StudenAnswers`.

### `Questions`

Representa preguntas dentro de un quiz.

Campos principales:

- `quizId`
- `questionText`
- `questionType`
- `points`
- `topic`
- `difficulty`

Relaciones:

- Pertenece a un `Quizzies`.
- Tiene opciones en `QuestionOptions`.
- Puede tener respuestas de estudiantes.

### `QuestionOptions`

Representa las opciones disponibles para una pregunta.

Campos principales:

- `questionId`
- `optionText`
- `isCorrect`

Relaciones:

- Pertenece a una `Questions`.
- Puede ser seleccionada en `StudenAnswers`.

### `StudenAnswers`

Representa la respuesta seleccionada por un estudiante durante un intento de quiz.

Campos principales:

- `quizAttemptId`
- `questionId`
- `selectedOptionId`
- `isCorrect`

Relaciones:

- Pertenece a `QuizAttempts`.
- Pertenece a `Questions`.
- Referencia una opcion de `QuestionOptions`.

### `Grades`

Representa calificaciones de un usuario en una materia.

Campos principales:

- `userId`
- `subjectId`
- `gradeValue`
- `gradeType`
- `description`
- `date`
- `createdAt`

Relaciones:

- Pertenece a un `User`.
- Pertenece a un `Subject`.

### `StudySessions`

Representa sesiones de estudio registradas por un usuario.

Campos principales:

- `userId`
- `subjectId`
- `startedAt`
- `endedAt`
- `durationMinutes`
- `notes`
- `studyMethod`
- `productivityRating`

Relaciones:

- Pertenece a un `User`.
- Pertenece a un `Subject`.

### `Resouces`

Representa recursos academicos asociados a una materia.

Campos principales:

- `subjectId`
- `title`
- `description`
- `resourceType`
- `url`
- `difficulty`
- `topic`
- `createdBy`
- `isActive`
- `createdAt`

Relaciones:

- Pertenece a un `Subject`.
- Puede estar asociado a recomendaciones.

### `Recommendations`

Representa recomendaciones personalizadas para usuarios.

Campos principales:

- `userId`
- `subjectId`
- `resourceId`
- `type`
- `title`
- `description`
- `reason`
- `priority`
- `status`
- `createdAt`

Relaciones:

- Pertenece a un `User`.
- Pertenece a un `Subject`.
- Referencia un recurso `Resouces`.

### `Notifications`

Representa notificaciones para usuarios.

Campos principales:

- `userId`
- `title`
- `message`
- `type`
- `isRead`
- `scheduleAt`
- `createdAt`

Relaciones:

- Pertenece a un `User`.

## Modulos agregados

Los siguientes modulos existen en `src/modules/`:

```text
src/modules/
+-- academic-profile/
+-- admin/
+-- auth/
+-- dashboard/
+-- grades/
+-- notifications/
+-- questions/
+-- quizzies/
+-- recommendations/
+-- resources/
+-- roles/
+-- study-sessions/
+-- subjects/
+-- users/
```

Cada modulo sigue una estructura similar:

```text
<module>/
+-- <module>.controller.ts
+-- <module>.routes.ts
+-- <module>.service.ts
+-- <module>.validation.ts
```

Excepciones detectadas:

- `dashboard` usa `dashboard.validations.ts` en plural.
- `resources` usa nombres en singular: `resource.controller.ts`, `resource.routes.ts`, `resource.service.ts`, `resource.validation.ts`.
- `recommendations` tiene el archivo `recommedantions.routes.ts`, con una diferencia ortografica frente al nombre del modulo.

## Relacion entre modelos y modulos

| Modulo | Modelo Prisma relacionado | Proposito esperado |
| --- | --- | --- |
| `users` | `User` | Gestion de usuarios, perfil basico y estado de cuenta. |
| `roles` | `Roles` | Gestion de roles del sistema. |
| `academic-profile` | `AcademicProfile` | Perfil academico, estilo de aprendizaje y metas de estudio. |
| `subjects` | `Subject`, `UserSubject` | Materias y relacion de usuarios con materias. |
| `quizzies` | `Quizzies`, `QuizAttempts` | Quizzes, intentos y resultados. |
| `questions` | `Questions`, `QuestionOptions`, `StudenAnswers` | Preguntas, opciones y respuestas. |
| `grades` | `Grades` | Calificaciones por usuario y materia. |
| `study-sessions` | `StudySessions` | Registro de sesiones de estudio. |
| `resources` | `Resouces` | Recursos academicos asociados a materias. |
| `recommendations` | `Recommendations` | Recomendaciones personalizadas. |
| `notifications` | `Notifications` | Notificaciones de usuario. |
| `auth` | `User`, `Roles` | Autenticacion y autorizacion. |
| `dashboard` | Varios modelos | Resumenes, metricas y datos agregados. |
| `admin` | Varios modelos | Administracion general del sistema. |

## Estado actual de los modulos

Estado detectado:

- Las carpetas de modulos estan creadas.
- Los archivos `controller`, `routes`, `service` y `validation` existen.
- Los archivos de los modulos agregados actualmente estan vacios.
- No se encontraron rutas montadas desde estos modulos.
- No se encontro implementacion de servicios conectada al cliente Prisma.

Esto significa que la arquitectura modular ya esta preparada, pero falta implementar la logica HTTP, validaciones, servicios y conexion con Prisma.

## Observaciones tecnicas

Hay algunos nombres que conviene revisar antes de generar migraciones o implementar servicios:

- `Quizzies`: podria estandarizarse como `Quizzes`.
- `Resouces`: parece un typo de `Resources`.
- `StudenAnswers`: parece un typo de `StudentAnswers`.
- `recommedantions.routes.ts`: parece un typo de `recommendations.routes.ts`.
- `updateAt`: podria estandarizarse como `updatedAt` para consistencia.
- En `QuizAttempts`, el map `@map("quizz_id")` podria revisarse si se busca usar `quiz_id`.

Estas observaciones no bloquean Prisma, pero pueden afectar claridad, convenciones y mantenimiento futuro.

## Pendientes recomendados

1. Implementar `src/database/prisma.ts` para exportar el cliente Prisma.
2. Generar el cliente Prisma con el esquema actual.
3. Crear migraciones para los modelos definidos.
4. Revisar y corregir nombres antes de fijar la base de datos en migraciones.
5. Implementar validaciones Zod por modulo.
6. Implementar servicios por modulo usando Prisma.
7. Implementar controladores y rutas.
8. Montar las rutas en el router principal.
9. Agregar pruebas para servicios y endpoints principales.
