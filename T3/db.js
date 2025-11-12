import { openDatabaseAsync } from "expo-sqlite";

let db;

export const initDB = async () => {
  db = await openDatabaseAsync("tp3app.db");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      rol TEXT NOT NULL
    );
  `);

  
  const adminExists = await db.getAllAsync(
    "SELECT * FROM usuarios WHERE username=?",
    ["Admin"]
  );

  if (adminExists.length === 0) {
    await db.runAsync(
      "INSERT INTO usuarios (nombre, username, password, rol) VALUES (?, ?, ?, ?)",
      ["Administrador", "Admin", "Admin123", "admin"]
    );
    console.log("Admin user creado");
  }

  const users = await db.getAllAsync("SELECT * FROM usuarios");
  console.log("Usuarios en DB:", users);
};

export const loginUser = async (username, password) => {
  if (!db) db = await openDatabaseAsync("tp3app.db");
  const result = await db.getAllAsync(
    "SELECT * FROM usuarios WHERE username=? AND password=?",
    [username, password]
  );
  return result.length > 0 ? result[0] : null;
};

export const getUsuarios = async () => {
  if (!db) db = await openDatabaseAsync("tp3app.db");
  return await db.getAllAsync("SELECT * FROM usuarios");
};

export const addUsuario = async (nombre, username, password, rol = "user") => {
  if (!db) db = await openDatabaseAsync("tp3app.db");
  try {
    await db.runAsync(
      "INSERT INTO usuarios (nombre, username, password, rol) VALUES (?, ?, ?, ?)",
      [nombre, username, password, rol]
    );
  } catch (error) {
    if (error.message && error.message.includes("UNIQUE constraint failed")) {
      throw new Error("El nombre de usuario ya existe");
    }
    throw error;
  }
};

export const updateUsuario = async (id, nombre, username, password, rol) => {
  if (!db) db = await openDatabaseAsync("tp3app.db");
  try {
    await db.runAsync(
      "UPDATE usuarios SET nombre=?, username=?, password=?, rol=? WHERE id=?",
      [nombre, username, password, rol, id]
    );
  } catch (error) {
    if (error.message && error.message.includes("UNIQUE constraint failed")) {
      throw new Error("El nombre de usuario ya existe");
    }
    throw error;
  }
};

export const deleteUsuario = async (id) => {
  if (!db) db = await openDatabaseAsync("tp3app.db");
  await db.runAsync("DELETE FROM usuarios WHERE id=?", [id]);
};
