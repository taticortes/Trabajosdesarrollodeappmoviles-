import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { addContact, updateContact } from "../database/db"

export default function AddEditScreen({ navigation, route }) {
  const contact = route.params?.contact
  const isEditing = !!contact

  const [name, setName] = useState(contact?.name || "")
  const [phone, setPhone] = useState(contact?.phone || "")
  const [email, setEmail] = useState(contact?.email || "")
  const [address, setAddress] = useState(contact?.address || "")

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert("Error", "El nombre es obligatorio")
      return false
    }
    if (!phone.trim()) {
      Alert.alert("Error", "El teléfono es obligatorio")
      return false
    }
    if (!email.trim()) {
      Alert.alert("Error", "El email es obligatorio")
      return false
    }
    if (!address.trim()) {
      Alert.alert("Error", "La dirección es obligatoria")
      return false
    }
    return true
  }

  const handleSave = async () => {
    if (!validateForm()) return

    try {
      if (isEditing) {
        await updateContact(contact.id, name.trim(), phone.trim(), email.trim(), address.trim())
        Alert.alert("Éxito", "Contacto actualizado correctamente")
      } else {
        await addContact(name.trim(), phone.trim(), email.trim(), address.trim())
        Alert.alert("Éxito", "Contacto agregado correctamente")
      }
      navigation.goBack()
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el contacto")
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          <Text style={styles.label}>Nombre *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Ej: Juan Pérez"
            placeholderTextColor="#666"
          />

          <Text style={styles.label}>Teléfono *</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Ej: +54 9 11 1234-5678"
            keyboardType="phone-pad"
            placeholderTextColor="#666"
          />

          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Ej: juan@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#666"
          />

          <Text style={styles.label}>Dirección *</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Ej: Av. Corrientes 1234"
            placeholderTextColor="#666"
          />

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>{isEditing ? "Actualizar" : "Guardar"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#000",
  },
  cancelButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
  },
})