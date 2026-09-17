# Tinkisqa Front

Aplicación móvil de acompañamiento y bienestar (Expo + React Native). Este frontend está organizado con **Domain-Driven Design (DDD)**, donde cada *bounded context* es un módulo autónomo preparado para mapear a un **microservicio** en el backend.

## Requisitos

- **Node.js 20+** (recomendado 20 LTS o superior)
- **npm** (incluido con Node)
- Para probar en dispositivo/emulador:
  - **Android**: Android Studio + emulador, o la app **Expo Go** en tu teléfono
  - **iOS**: macOS con Xcode, o la app **Expo Go** en tu iPhone
- Opcional: cuenta de [Expo](https://expo.dev) para builds en la nube

Stack principal: Expo SDK 56, React 19, React Native 0.85, TypeScript 6, expo-router 56.

## Cómo ejecutar

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo (Metro)
npm start
```

Desde el menú de Expo puedes:

- Presionar `a` para abrir en **Android**
- Presionar `i` para abrir en **iOS**
- Presionar `w` para abrir en **web**
- Escanear el QR con **Expo Go** en tu teléfono

O directamente:

```bash
npm run android    # Android
npm run ios        # iOS
npm run web        # Navegador
```

Otros scripts:

```bash
npm run lint       # ESLint (expo lint)
```

> Nota: no hay script de typecheck; puedes ejecutar `npx tsc --noEmit` manualmente.

## Estructura de carpetas

```
src/
├── app/                    # Capa de routing (expo-router). Sin lógica de negocio.
│   ├── _layout.tsx         # Monta los providers de cada contexto
│   ├── index.tsx           # Redirige a /login
│   ├── explore.tsx         # Pantalla plantilla
│   ├── (auth)/             # Grupo de rutas de autenticación
│   │   ├── _layout.tsx
│   │   ├── login.tsx       # Stub -> contexts/autenticacion
│   │   └── register.tsx
│   └── (tabs)/             # Grupo de rutas principales (con tab bar)
│       ├── _layout.tsx
│       └── *.tsx           # Stubs que re-exportan su contexto
│
├── shared/                 # Shared Kernel: código transversal a todos los contextos
│   ├── theme/              # theme.ts (colores, spacing, fonts) + global.css
│   ├── hooks/              # use-theme, use-color-scheme
│   └── ui/                 # Componentes genéricos (themed-*, top-bar, tab bar, etc.)
│
└── contexts/               # Un bounded context = un microservicio
    ├── autenticacion/
    ├── contenido/
    ├── comunidad/
    ├── foros/
    ├── testimonios/
    ├── racha/
    ├── red-apoyo/
    ├── voluntariado/
    └── perfil/
```

### Capas de cada contexto

Cada carpeta dentro de `contexts/` sigue las mismas cuatro capas:

| Capa | Responsabilidad | Ejemplo |
| ------ | ----------------- | --------- |
| `domain/` | Entidades y tipos puros, sin dependencias externas | `contenido/domain/article.ts` |
| `infrastructure/` | Fuentes de datos (hoy seeds/repos locales; mañana API del microservicio) | `comunidad/infrastructure/publicaciones.seed.ts` |
| `application/` | Casos de uso / estado (stores de React Context) | `testimonios/application/testimonios-store.tsx` |
| `presentation/` | Pantallas y componentes propios del contexto | `contenido/presentation/autocuidado.tsx` |

> Expo Router exige que las rutas vivan en `src/app/`. Por eso cada archivo de `app/` es un **stub delgado** que re-exporta la pantalla real desde su contexto, por ejemplo:
>
> ```tsx
> // src/app/(tabs)/autocuidado.tsx
> export { default } from '@/contexts/contenido/presentation/autocuidado';
> ```

### Bounded contexts actuales

| Contexto | Dominio | Pantallas principales |
| ---------- | --------- | ----------------------- |
| **autenticacion** | Login y registro | `login`, `register` |
| **contenido** | Artículos de bienestar | `autocuidado`, `autoestima`, `equilibrio`, `crear-articulo`, `detalle-articulo` |
| **comunidad** | Publicaciones / feed de la comunidad | `inicio`, `comunidad`, `nueva-publicacion`, flujo de creación (foto, etiquetas, sentimientos, ubicación) |
| **foros** | Comunidades y grupos de discusión | `foros`, `nueva-comunidad` |
| **testimonios** | Testimonios de usuarias | `testimonios`, `crear-testimonio`, `detalle-testimonio` |
| **racha** | Racha/constancia diaria de la usuaria | `racha` |
| **red-apoyo** | Directorio de psicólogas | `contactos`, `detalle-psicologa` |
| **voluntariado** | Ofertas y postulación | `voluntarios`, `postular`, `postulacion-exitosa`, `detalle-voluntariado` |
| **perfil** | Perfil y contenido propio (agregador) | `perfil` |

### Estado y persistencia

Cada contexto con datos expone su propio store mediante React Context:

- `contenido`: `ArticulosProvider` / `useArticulosStore()` — clave `tinkisqa-contenido-v1`
- `comunidad`: `ComunidadProvider` / `useComunidadStore()` — clave `tinkisqa-comunidad-v1`
- `foros`: `ForosProvider` / `useForosStore()` — clave `tinkisqa-foros-v1`
- `testimonios`: `TestimoniosProvider` / `useTestimoniosStore()` — clave `tinkisqa-testimonios-v1`

Los providers se montan una sola vez en `src/app/_layout.tsx`. La persistencia usa `AsyncStorage`.

## Alias de importación

El alias `@/*` apunta a `src/*` (configurado en `tsconfig.json`):

```ts
import { Article } from '@/contexts/contenido/domain/article';
import { useArticulosStore } from '@/contexts/contenido/application/articulos-store';
import { ThemedText } from '@/shared/ui/themed-text';
```

## Cómo agregar una nueva funcionalidad

1. **Si pertenece a un contexto existente**: agrega la pantalla en `contexts/<contexto>/presentation/` y crea su stub en `app/(tabs)/`.
2. **Si es un contexto nuevo**: crea `contexts/<nuevo>/{domain,infrastructure,application,presentation}` (solo las capas que necesites), registra su provider en `app/_layout.tsx` si tiene estado, y añade sus rutas/stubs.
3. Registra la nueva ruta en `src/app/(tabs)/_layout.tsx` (`Stack.Screen` y, si aplica, `tabRoutes`).

## Reglas de dependencia

- `app/` → puede importar de `contexts/` y `shared/`.
- `contexts/*/presentation` → importa de su propio `application` y de `shared/`.
- `contexts/*/application` → importa de su propio `domain` e `infrastructure`.
- `contexts/*/infrastructure` → importa de su propio `domain`.
- `shared/` → no importa de ningún `contexts/`.
- **No** debe haber dependencias directas entre contextos en `domain/` ni `infrastructure/`; si un contexto necesita datos de otro, hágalo desde `presentation` (por ejemplo, `perfil` como agregador).

## Licencia

MIT
