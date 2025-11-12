# MovieAppExpo

Aplicación móvil hecha con React Native y Expo que muestra información de películas usando la API de TMDB.

## Requisitos
- Node.js instalado
- Tener Expo CLI instalado (opcional, recomendado)

## Instalación y ejecución
1. Clona el repositorio:
   ```
   git clone https://github.com/taticortes/Movieapp.git
   ```
2. Ve a la carpeta del proyecto:
   ```
   cd Movieapp/MovieApp/MovieAppExpo
   ```
3. Instala las dependencias:
   ```
   npm install
   ```
4. Inicia el servidor de desarrollo de Expo:
   ```
   npx expo start
   ```
5. Escanea el código QR con la app Expo Go en tu celular, o abre el proyecto en un emulador Android/iOS.

## Estructura de carpetas

MovieAppExpo/
├── App.js               # Componente principal y navegación
├── app.json             # Configuración de Expo
├── config.js            # Configuración de la API
├── index.js             # Punto de entrada de la app
├── package.json         # Dependencias y scripts
├── assets/              # Imágenes y recursos
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
└── src/                 # Código fuente
    ├── MainScreen.js    # Pantalla principal
    └── DetailScreen.js  # Pantalla de detalle

