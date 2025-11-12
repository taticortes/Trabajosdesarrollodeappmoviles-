import * as SQLite from "expo-sqlite"

let db

export const initDatabase = async () => {
  try {
    db = await SQLite.openDatabaseAsync("contacts.db")

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        address TEXT NOT NULL
      );
    `)

    console.log("Base de datos inicializada correctamente")
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error)
  }
}


export const addContact = async (name, phone, email, address) => {
  try {
    const result = await db.runAsync("INSERT INTO contacts (name, phone, email, address) VALUES (?, ?, ?, ?)", [
      name,
      phone,
      email,
      address,
    ])
    return result.lastInsertRowId
  } catch (error) {
    console.error("Error al agregar contacto:", error)
    throw error
  }
}


export const getAllContacts = async () => {
  try {
    const contacts = await db.getAllAsync("SELECT * FROM contacts ORDER BY name ASC")
    return contacts
  } catch (error) {
    console.error("Error al obtener contactos:", error)
    return []
  }
}

export const updateContact = async (id, name, phone, email, address) => {
  try {
    await db.runAsync("UPDATE contacts SET name = ?, phone = ?, email = ?, address = ? WHERE id = ?", [
      name,
      phone,
      email,
      address,
      id,
    ])
  } catch (error) {
    console.error("Error al actualizar contacto:", error)
    throw error
  }
}

export const deleteContact = async (id) => {
  try {
    await db.runAsync("DELETE FROM contacts WHERE id = ?", [id])
  } catch (error) {
    console.error("Error al eliminar contacto:", error)
    throw error
  }
}
