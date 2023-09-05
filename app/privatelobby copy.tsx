import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const App = () => {
  const [salons, setSalons] = useState([]);
  const [selectedSalonId, setSelectedSalonId] = useState(null);
  const [error, setError] = useState(null);

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
  };

  const handleClearSelection = () => {
    setSelectedSalonId(null);
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Salons Privés</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <ScrollView>
        {salons.map(salon => (

          <View key={salon.id} style={styles.block}>
            <Text style={styles.name}>{salon.nomSalonPrivee}</Text>
            <Text>Capacité: {salon.capacite}</Text>
            <Image
             
             source={{ uri : `./assets/${salon.nomSalonPrivee}.jpg` }} // Update the source

             style={styles.image}

             />
            <Button title="Choisir" onPress={() => handleSelectSalon(salon.id)} color="brown" />
          </View>
        ))}
      </ScrollView>
      {selectedSalonId !== null && (
        <Button title="Effacer la sélection" onPress={handleClearSelection} color="red" />
      )}
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
});

export default App;
