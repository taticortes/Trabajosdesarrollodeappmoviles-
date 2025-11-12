
# Agenda de Contactos - React Native

Esta es una aplicación móvil desarrollada con React Native y Expo que funciona como una agenda de contactos personal.

## Características

- ✅ Ver lista de contactos
- ✅ Agregar nuevos contactos
- ✅ Editar contactos existentes
- ✅ Eliminar contactos
- ✅ Almacenamiento con SQLite


## Datos almacenados por contacto

- Nombre
- Teléfono
- Email
- Dirección

## Requisitos previos

- Node.js (v14 o superior)
- npm o yarn
- Expo Go (app móvil) o emulador Android/iOS

## Instalación y uso

1. Clonar el repositorio:
```bash
git clone <URL_DEL_REPOSITORIO>
cd TP2
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar la aplicación:
```bash
npx expo start
```

## Uso de la aplicación

1. **Ver contactos:**
   - Al abrir la app verás la lista de todos tus contactos
   - Si no hay contactos, verás un mensaje indicándolo

2. **Agregar contacto:**
   - Presiona el botón + en la esquina inferior derecha
   - Completa todos los campos requeridos
   - Presiona "Guardar"

3. **Editar contacto:**
   - Presiona el botón "Editar" en la tarjeta del contacto
   - Modifica los campos necesarios
   - Presiona "Actualizar"

4. **Eliminar contacto:**
   - Presiona el botón "Eliminar" en la tarjeta del contacto
   - Confirma la eliminación en el diálogo

## Estructura del proyecto

```
TP2-Tati/
├── components/
│   └── ContactCard.js       # Componente de tarjeta de contacto
├── screens/
│   ├── HomeScreen.js       # Pantalla principal con lista de contactos
│   └── AddEditScreen.js    # Pantalla para agregar/editar contactos
├── database/
│   └── db.js              # Configuración y funciones de base de datos
├── App.js                 # Punto de entrada y configuración de navegación
└── app.json              # Configuración de Expo
```

## Tecnologías utilizadas

- **React Native**: Framework principal para desarrollo móvil
- **Expo**: Plataforma de desarrollo
- **SQLite**: Base de datos local
- **React Navigation**: Navegación entre pantallas

```bash
npm install
```

3. Iniciar Expo:

```bash
npx expo start
```