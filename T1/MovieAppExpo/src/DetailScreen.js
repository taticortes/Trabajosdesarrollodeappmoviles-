import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const DetailScreen = ({ route }) => {
  const { movie } = route.params;
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  // Generar un resumen más largo combinando overview y tagline si existe
  const longDescription = movie.tagline
    ? `${movie.overview}\n\nFrase destacada: ${movie.tagline}`
    : movie.overview;

  return (
    <ScrollView style={styles.container}>
      {posterUrl && (
        <Image source={{ uri: posterUrl }} style={styles.poster} resizeMode="cover" />
      )}
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.desc}>{longDescription}</Text>
      <Text style={styles.detail}>Fecha de estreno: {movie.release_date}</Text>
      <Text style={styles.detail}>Popularidad: {movie.popularity}</Text>
      <Text style={styles.detail}>Puntaje promedio: {movie.vote_average}</Text>
      <Text style={styles.detail}>Presupuesto: ${movie.budget}</Text>
      <Text style={styles.detail}>Ingresos: ${movie.revenue}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#bdb9b9ff', padding: 20 },
  poster: { width: 220, height: 330, borderRadius: 8, alignSelf: 'center', marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  desc: { fontSize: 16, marginBottom: 16, color: '#000000ff', textAlign: 'justify' },
  detail: { fontSize: 16, marginBottom: 8 },
});

export default DetailScreen;
