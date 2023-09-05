import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button, Dimensions } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router, useRouter } from 'expo-router';

const App = () => {
  const [salons, setSalons] = useState([]);
  const [selectedSalonId, setSelectedSalonId] = useState<string | null>(null);

  useEffect(() => {
    // Fonction pour charger l'ID du salon depuis le stockage local lors du montage du composant
    const loadSalonIdFromStorage = async () => {
      try {
        const storedSalonId = await AsyncStorage.getItem('selectedSalonId');
        if (storedSalonId !== null) {
          setSelectedSalonId(storedSalonId);
        }
      } catch (error) {
        console.error('Erreur lors du chargement depuis le stockage local :', error);
      }
    };

    loadSalonIdFromStorage();

    // Charger la liste des salons depuis l'API
    axios
      .get('https://apigustocoffeeg5.fr/espaces_de_travail_salon_principal')
      .then((response) => {
        setSalons(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSalonPress = async (salonId) => {
    // Enregistrer l'ID du salon dans le stockage local (AsyncStorage)
    try {
      await AsyncStorage.setItem('selectedSalonId', salonId.toString());
      setSelectedSalonId(salonId); // Met à jour l'ID du salon sélectionné
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement dans le stockage local :', error);
    }
  };

  const handleValiderPress = async () => {
    if (selectedSalonId) {
      // Enregistrez l'ID du salon sélectionné dans le stockage local
      try {
        await AsyncStorage.setItem('selectedSalonId', selectedSalonId.toString());
        console.log('ID du salon sélectionné enregistré dans le stockage local :', selectedSalonId);
        
        // Vous pouvez également effectuer d'autres actions avec l'ID sélectionné ici

        // Naviguer vers la page suivante
        router.replace('/timepublic');
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement dans le stockage local :', error);
      }
    } else {
      console.warn('Aucun salon sélectionné.');
    }
  };

  const renderSalonItem = ({ item }) => {
    const isSelected = item.id === selectedSalonId;
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const itemWidth = windowWidth * 0.15; // 15% de la largeur de l'écran
    const itemHeight = windowHeight * 0.1; // 10% de la hauteur de l'écran

    return (
      <TouchableOpacity
        onPress={() => handleSalonPress(item.id)}
        style={[styles.salonItem, isSelected && styles.selectedSalon1, { width: itemWidth, height: itemHeight }]}
      >
        <Text>{item.nomSalonPrincipal}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
         <TouchableOpacity onPress={() => router.replace('/home')} style={styles.backButton}>
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
      <FlatList
        data={salons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSalonItem}
        numColumns={5} // Définit le nombre de colonnes dans la grille
      />
      <Button title="Valider" onPress={handleValiderPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end', // Place le bouton "Valider" en bas de l'écran
  },
  salonItem: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'lightgray', // Couleur de base
  },
  selectedSalon1: {
    backgroundColor: 'brown', // Couleur lorsque sélectionné
  },
  backButton: {
    alignItems: 'center',
    top: 0,
    
  },
  backButtonText: {
    fontSize: 22,
    color: 'blue',
  },
});

export default App;
