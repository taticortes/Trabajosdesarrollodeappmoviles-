import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { addUsuario, updateUsuario } from "../db";
import COLORS from "../theme";

export default function UserFormScreen({ navigation, route }) {
  const usuario = route.params?.usuario; 

  const [nombre, setNombre] = useState(usuario ? usuario.nombre.split(" ")[0] : "");
  const [apellido, setApellido] = useState(usuario ? usuario.nombre.split(" ")[1] || "" : "");
  const [username, setUsername] = useState(usuario ? usuario.username : "");
  const [password, setPassword] = useState(usuario ? usuario.password : "");
  const [rol, setRol] = useState(usuario ? usuario.rol : "user");

  const handleGuardar = async () => {
    if (!nombre || !apellido || !username || !password) {
      Alert.alert("Error", "Completá todos los campos");
      return;
    }

    const nombreCompleto = `${nombre} ${apellido}`;

    try {
      if (usuario) {
        await updateUsuario(usuario.id, nombreCompleto, username, password, rol);
        Alert.alert("Éxito", "Usuario actualizado correctamente");
      } else {
        await addUsuario(nombreCompleto, username, password, rol);
        Alert.alert("Éxito", "Usuario agregado correctamente");
      }
      navigation.goBack();
    } catch (error) {
      const errorMsg = error.message || "No se pudo guardar el usuario";
      Alert.alert("Error", errorMsg);
      console.log("Error:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {usuario ? "Editar usuario" : "Nuevo usuario"}
      </Text>

      <Text style={styles.label}>Nombre:</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Ej: Juan" />

      <Text style={styles.label}>Apellido:</Text>
      <TextInput style={styles.input} value={apellido} onChangeText={setApellido} placeholder="Ej: Pérez" />

      <Text style={styles.label}>Usuario:</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Ej: juanperez" />

      <Text style={styles.label}>Contraseña:</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="Ej: juan123" />

      <Text style={styles.label}>Rol:</Text>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            rol === "user" && styles.roleButtonActive,
          ]}
          onPress={() => setRol("user")}
        >
          <Text style={[styles.roleButtonText, rol === "user" && styles.roleButtonTextActive]}>
            Usuario
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleButton,
            rol === "admin" && styles.roleButtonActive,
          ]}
          onPress={() => setRol("admin")}
        >
          <Text style={[styles.roleButtonText, rol === "admin" && styles.roleButtonTextActive]}>
            Admin
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGuardar}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: COLORS.text },
  label: { fontWeight: "bold", marginTop: 10, color: COLORS.text },
  input: { 
    backgroundColor: COLORS.inputBackground, 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    borderRadius: 12, 
    padding: 10, 
    marginBottom: 10,
    color: COLORS.text,
    placeholderTextColor: COLORS.secondaryText,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  roleButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.surface,
  },
  roleButtonActive: {
    backgroundColor: COLORS.button,
    borderColor: COLORS.border,
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.secondaryText,
  },
  roleButtonTextActive: {
    color: COLORS.buttonText,
  },
  button: {
    backgroundColor: COLORS.button,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  buttonText: {
    color: COLORS.buttonText,
    fontSize: 16,
    fontWeight: "bold",
  },
});
