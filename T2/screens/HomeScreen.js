import { useState, useEffect, useCallback } from "react"
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { initDatabase, getAllContacts, deleteContact } from "../database/db"
import ContactCard from "../components/ContactCard"

export default function HomeScreen({ navigation }) {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initDatabase()
  }, [])

  const loadContacts = async () => {
    setLoading(true)
    const data = await getAllContacts()
    setContacts(data)
    setLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
      loadContacts()
    }, []),
  )

  const handleDelete = (id, name) => {
    Alert.alert("Confirmar eliminación", `¿Estás seguro que quieres eliminar a "${name}"?`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          await deleteContact(id)
          loadContacts()
        },
      },
    ])
  }

  const handleEdit = (contact) => {
    navigation.navigate("AddEdit", { contact })
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {contacts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay contactos guardados</Text>
          <Text style={styles.emptySubtext}>Presiona el botón + para agregar uno</Text>
        </View>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ContactCard
              contact={item}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id, item.name)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("AddEdit")}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  listContent: {
    padding: 16,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },
})