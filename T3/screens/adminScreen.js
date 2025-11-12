import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Alert, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUsuarios, deleteUsuario } from "../db";
import COLORS from "../theme";

export default function AdminScreen({ navigation, user, setUserSession }) {
  const [usuarios, setUsuarios] = useState([]);

  const cargar = async () => {
    const data = await getUsuarios();
    setUsuarios(data);
  };

  useEffect(() => {
    const unsub = navigation.addListener("focus", cargar);
    return unsub;
  }, [navigation]);

  const eliminar = async (id, nombre) => {
    if (id === user.id) {
      Alert.alert("Error", "No podés eliminarte a vos mismo.");
      return;
    }
    Alert.alert("Confirmar eliminación", `¿Eliminar a ${nombre}?`, [
      { text: "Cancelar", style: "cancel" },
      { 
        text: "Eliminar", 
        onPress: async () => {
          try {
            await deleteUsuario(id);
            cargar();
            Alert.alert("Éxito", "Usuario eliminado correctamente");
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el usuario");
          }
        },
        style: "destructive"
      }
    ]);
  };

  const logout = async () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro?", [
      { text: "Cancelar", style: "cancel" },
      { 
        text: "Cerrar sesión", 
        onPress: async () => {
          await AsyncStorage.removeItem("user");
          setUserSession(null);
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Administración de Usuarios</Text>
      <Text style={styles.subtitle}>Bienvenido, {user.nombre}</Text>
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate("UserForm")}
      >
        <Text style={styles.addButtonText}>Agregar Usuario</Text>
      </TouchableOpacity>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.nombre}</Text>
              <Text style={styles.userDetails}>
                {item.username} • {item.rol === "admin" ? "Admin" : "Usuario"}
              </Text>
              <Text style={styles.userPassword}>{item.password}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.editBtn}
                onPress={() => navigation.navigate("UserForm", { usuario: item })}
              >
                <Text style={styles.editBtnText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.deleteBtn, item.id === user.id && styles.deleteDisabled]}
                onPress={() => eliminar(item.id, item.nombre)}
                disabled={item.id === user.id}
              >
                <Text style={styles.deleteBtnText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay usuarios registrados</Text>
        }
      />

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={logout}
      >
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: COLORS.background
  },
  header: { 
    fontSize: 26, 
    fontWeight: "bold", 
    textAlign: "center", 
    marginBottom: 5,
    color: COLORS.text
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: COLORS.secondaryText,
    marginBottom: 20
  },
  addButton: {
    backgroundColor: COLORS.button,
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addButtonText: {
    color: COLORS.buttonText,
    fontWeight: "bold",
    fontSize: 16
  },
  userItem: {
    backgroundColor: COLORS.surface,
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.border,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  userInfo: {
    marginBottom: 12
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 4
  },
  userDetails: {
    fontSize: 14,
    color: COLORS.secondaryText,
    marginBottom: 4
  },
  userPassword: {
    fontSize: 12,
    color: COLORS.secondaryText
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10
  },
  editBtn: {
    flex: 1,
    backgroundColor: COLORS.button,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  editBtnText: {
    color: COLORS.buttonText,
    fontWeight: "bold",
    fontSize: 14
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: COLORS.button,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  deleteDisabled: {
    backgroundColor: COLORS.button,
    opacity: 0.6
  },
  deleteBtnText: {
    color: COLORS.buttonText,
    fontWeight: "bold",
    fontSize: 14
  },
  logoutButton: {
    backgroundColor: COLORS.button,
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  logoutButtonText: {
    color: COLORS.buttonText,
    fontWeight: "bold",
    fontSize: 16
  },
  emptyText: {
    textAlign: "center",
    color: COLORS.secondaryText,
    marginTop: 20,
    fontSize: 16
  }
});
