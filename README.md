# Tripleten web_project_around_react

## Descripción del Proyecto

Refactorización completa del proyecto "Around The U.S." de JavaScript vanilla a React. La aplicación mantiene la funcionalidad original: una galería interactiva de imágenes que permite visualizar tarjetas, interactuar con ellas mediante "Me gusta" y eliminación, modificar información del perfil del usuario mediante popups, y agregar nuevas tarjetas con validación de formularios.

---

## Tecnologías Utilizadas

### React

| Aspecto | Descripción |
|--------|-------------|
| Componentes funcionales | Todos los componentes implementados como funciones con hooks. |
| Hooks | useState, useEffect, useContext, useRef para manejo de estado y efectos. |
| Context API | CurrentUserContext para compartir datos del usuario en toda la aplicación. |
| Props drilling | Comunicación entre componentes mediante props (previo a Context). |
| Renderizado condicional | Popups que se muestran/ocultan según estado activePopup. |
| Formularios controlados | Manejo de estado en inputs con validación en tiempo real. |
| Refs | Acceso directo al DOM en formularios no controlados (EditAvatar, EditProfile). |

---

### Estructura de Componentes

src/
  components/
    App.jsx                 # Componente raíz, contexto y estado global
    Header/
      Header.jsx
    Footer/
      Footer.jsx
    Main/
      Main.jsx            # Componente principal con lógica de UI
      Profile/
        Profile.jsx       # Perfil de usuario
      Card/
        Card.jsx          # Tarjeta individual
      Popup/
        Popup.jsx         # Contenedor genérico de popups
      Form/
        Form.jsx          # Formulario genérico (usado en NewCard)
      NewCard/
        NewCard.jsx       # Formulario para nueva tarjeta
      RemoveCard/
        RemoveCard.jsx    # Confirmación de eliminación
      Form/
        EditProfile/
          EditProfile.jsx
        EditAvatar/
          EditAvatar.jsx
    ImagePopup/
      ImagePopup.jsx      # Popup para ver imágenes ampliadas
  contexts/
    CurrentUserContext.js # Contexto de usuario
  utils/
    api.js                # Clase para peticiones a la API

---

### Estilos CSS

| Aspecto | Descripción |
|--------|-------------|
| Metodología BEM | Estructura CSS organizada en bloques (heredada del proyecto JS). |
| Importación global | Todos los estilos centralizados en src/index.css. |
| Diseño responsivo | Media queries para adaptación a diferentes pantallas. |
| Validación visual | Clases .popup__input_type_error y .popup__error_visible para feedback. |
| Estados interactivos | Hover en botones, like activo/inactivo con cambio de clase. |

---

### Integración con API

| Aspecto | Descripción |
|--------|-------------|
| Clase Api | Reutilizada del proyecto JS, adaptada a React. |
| Endpoints | getUserInfo, getInitialCards, updateUserInfo, addNewCard, deleteCard, changeLikeCardStatus, updateAvatar. |
| Token | Autenticación mediante token fijo incluido en headers. |
| Async/await | Manejo de peticiones asíncronas con try/catch. |

---

## Funcionalidad del Proyecto

### Gestión de Usuario
- Carga de datos del usuario desde API al montar la aplicación
- Edición de nombre y descripción mediante popup con validación
- Actualización de avatar con validación de URL

### Gestión de Tarjetas
- Visualización de tarjetas cargadas desde API
- Agregar nuevas tarjetas con formulario validado
- "Me gusta" con cambio visual y sincronización con servidor
- Eliminación de tarjetas (solo para el usuario propietario)
- Confirmación de eliminación mediante popup

### Popups
- Apertura/cierre controlada por estado activePopup
- Cierre por clic en overlay y tecla Escape
- Renderizado condicional de cada popup

### Validaciones
- Campos requeridos
- Longitud mínima/máxima (2-40 caracteres, 2-200 para descripción)
- URLs válidas (usando try/catch con new URL())
- Feedback visual con bordes rojos y mensajes de error
- Botón de envío deshabilitado hasta que el formulario sea válido

---

## Flujo de Datos

1. App.jsx contiene el estado global (currentUser, cards, activePopup)
2. Context API provee currentUser a todos los componentes
3. Main.jsx recibe cards y handlers como props
4. Card.jsx usa el contexto para determinar si muestra botón eliminar
5. Las acciones (like, delete, add) viajan hacia arriba hasta App
6. App actualiza el estado y React re-renderiza la UI

---

## Lecciones Aprendidas

- La sobreingeniería complica proyectos pequeños
- Los componentes deben ser prácticos, no "perfectos"
- Menos código = menos bugs
- El contexto es útil pero no siempre necesario
- Las validaciones complejas pueden simplificarse
- La estructura de carpetas debe ser funcional, no dogmática

---

## Estado del Proyecto

Proyecto completado y funcional
Validación automática superada

Todos los popups operativos
Integración con API funcionando
Revisión humana aprobada
---