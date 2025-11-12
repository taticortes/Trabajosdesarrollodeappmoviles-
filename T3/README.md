# TP3 - Autenticación y Gestión de Usuarios (Expo / React Native)

Descripción
-----------
Aplicación móvil desarrollada con React Native (Expo) que implementa autenticación, registro y gestión de usuarios con roles (admin/user) utilizando SQLite local. También muestra películas populares desde la API de TMDb para usuarios regulares.


Ejecución
---------
Instala dependencias y ejecuta la app con Expo:

```powershell
npm install
npx expo start
```

Estructura del proyecto
-----------------------

```
tp3/
├── App.js
├── db.js
├── index.js
├── package.json
├── theme.js
├── screens/
│   ├── loginScreen.js
│   ├── registerScreen.js
│   ├── adminScreen.js
│   ├── userFormScreen.js
│   └── userScreen.js
└── README.md
```

Notas importantes
-----------------
- Usuario administrador por defecto (creado al iniciar la app si no existe):
  - Usuario: `Admin`
  - Contraseña: `Admin123`
