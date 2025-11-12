import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { addUsuario, loginUser } from "../db";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../theme";

export default function RegisterScreen({ navigation, setUserSession }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rolSeleccionado, setRolSeleccionado] = useState(null);

  const handleRegistro = async () => {
    if (!nombre || !apellido || !username || !password || !rolSeleccionado) {
      Alert.alert("Error", "Completá todos los campos y selecciona un rol");
      return;
    }

    try {
      const nombreCompleto = `${nombre} ${apellido}`;
      await addUsuario(nombreCompleto, username, password, rolSeleccionado.toLowerCase());
      
      
      const usuarioRegistrado = await loginUser(username, password);
      if (usuarioRegistrado) {
        await AsyncStorage.setItem("user", JSON.stringify(usuarioRegistrado));
        setUserSession(usuarioRegistrado);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar. El usuario ya existe.");
      console.log("Error al registrar:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>

      <TextInput
        placeholder="Nombre"
        style={styles.input}
        placeholderTextColor={COLORS.secondaryText}
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        placeholder="Apellido"
        style={styles.input}
        placeholderTextColor={COLORS.secondaryText}
        value={apellido}
        onChangeText={setApellido}
      />
      <TextInput
        placeholder="Usuario"
        style={styles.input}
        placeholderTextColor={COLORS.secondaryText}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        placeholderTextColor={COLORS.secondaryText}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.roleLabel}>Selecciona tu rol:</Text>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            rolSeleccionado === "user" && styles.roleButtonActive,
          ]}
          onPress={() => setRolSeleccionado("user")}
        >
          <Text style={[styles.roleButtonText, rolSeleccionado === "user" && styles.roleButtonTextActive]}>
            Usuario
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleButton,
            rolSeleccionado === "admin" && styles.roleButtonActive,
          ]}
          onPress={() => setRolSeleccionado("admin")}
        >
          <Text style={[styles.roleButtonText, rolSeleccionado === "admin" && styles.roleButtonTextActive]}>
            Admin
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegistro}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.registerButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.registerButtonText}>Volver al login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: COLORS.text,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    backgroundColor: COLORS.inputBackground,
    color: COLORS.text,
    placeholderTextColor: COLORS.secondaryText,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    color: COLORS.text,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  roleButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 15,
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
  registerButton: {
    backgroundColor: COLORS.button,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  registerButtonText: {
    color: COLORS.buttonText,
    fontSize: 16,
    fontWeight: "bold",
  },
});
