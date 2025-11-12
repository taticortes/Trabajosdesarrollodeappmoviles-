import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../db";
import COLORS from "../theme";

export default function LoginScreen({ navigation, setUserSession }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Ingresá usuario y contraseña");
      return;
    }
    console.log("Intentando login con:", username, password);
    const user = await loginUser(username, password);
    console.log("Usuario encontrado:", user);
    if (user) {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUserSession(user);
    } else {
      Alert.alert("Error", "Credenciales inválidas");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Usuario"
        placeholderTextColor={COLORS.secondaryText}
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor={COLORS.secondaryText}
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.registerButton}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.registerButtonText}>¿No tienes cuenta? Registrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: COLORS.background },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 30, color: COLORS.text },
  input: {
    borderWidth: 1, 
    borderColor: COLORS.border, 
    borderRadius: 12, 
    padding: 15, 
    marginBottom: 15,
    backgroundColor: COLORS.inputBackground, 
    color: COLORS.text,
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
