import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Image,TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { Link, router, useRouter } from 'expo-router';



const App = () => {

  const [salons, setSalons] = useState([]);
  const [selectedSalonId, setSelectedSalonId] = useState(null);
  const [error, setError] = useState(null);
  var [img] = useState(null);

  useEffect(() => {
    axios
      .get('https://apigustocoffeeg5.fr/espaces_de_travail_prives')
      .then(response => {
        setSalons(response.data);
      })
      .catch(error => {
        console.error('Error fetching salons:', error);
        setError('An error occurred while fetching salons.');
      });
  }, []);

  const handleSelectSalon = selectedId => {
    setSelectedSalonId(selectedId);
    AsyncStorage.setItem('selectedSalonId', selectedId.toString()); // Enregistrer l'ID dans le stockage local
  };

  const handleClearSelection = () => {
    setSelectedSalonId(null);
    AsyncStorage.removeItem('selectedSalonId'); // Supprimer l'ID du stockage local
  }

  return (
    <View style={styles.container}>
             <TouchableOpacity onPress={() => router.replace('/home')} style={styles.backButton}>
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Salons Privés</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <ScrollView>
        {salons.map(salon => (
          <View key={salon.id} style={styles.block}>
            <Text style={styles.name}>{salon.nomSalonPrivee}</Text>
            <Text>Capacité: {salon.capacite}</Text>
            <Text>{salon.description}</Text>
            <Button
              title="Choisir"
              onPress={() => handleSelectSalon(salon.id)}
              color="#836349FF"
            />
          </View>
        ))}
      </ScrollView>
      {selectedSalonId !== null && (
        <View style={styles.selectedSalonContainer}>
        
          <Button
            title="Effacer la sélection"
            onPress={handleClearSelection}
            color="red"
          />
        </View>
      )}
      <Button
              title="Choisir"
              onPress={() => {
                // Remplacez '/inscription' par le chemin vers votre page d'inscription
                router.replace('/time');
              }}
              color="green"
            />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  block: {
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'brown',
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  image: {
    width: 200,
    height: 150,
    marginBottom: 8,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  selectedSalonContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'brown',
    paddingTop: 20,
  },
  selectedSalonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  backButton: {
    position: 'absolute',
    top: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: 'blue',
  },
});

export default App;
