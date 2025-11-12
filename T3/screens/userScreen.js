import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../theme";

export default function UserScreen({ user, setUserSession }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = "8f6f9aeb5ab319851313788ca63a54c3";
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES`
        );
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.log("Error al obtener películas:", error);
        Alert.alert("Error", "No se pudieron cargar las películas");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={{ marginTop: 10, color: COLORS.secondaryText }}>Cargando películas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Películas Populares</Text>
        <Text style={styles.headerSubtitle}>Bienvenido, {user?.nombre}</Text>
      </View>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieCard}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
              style={styles.poster}
            />
            <View style={styles.movieInfo}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.rating}>{item.vote_average.toFixed(1)}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.overview}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay películas disponibles</Text>
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
    backgroundColor: COLORS.background
  },
  header: {
    backgroundColor: COLORS.surface,
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingTop: 30,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  headerTitle: { 
    fontSize: 26, 
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 5
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.secondaryText
  },
  movieCard: { 
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  poster: { 
    width: 100, 
    height: 150, 
    borderRadius: 8,
    margin: 10
  },
  movieInfo: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between"
  },
  title: { 
    fontWeight: "bold",
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 5
  },
  rating: {
    fontSize: 12,
    color: COLORS.accent,
    marginBottom: 5
  },
  description: {
    fontSize: 12,
    color: COLORS.secondaryText,
    lineHeight: 16
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: COLORS.background 
  },
  logoutButton: {
    backgroundColor: COLORS.button,
    margin: 15,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 25,
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
