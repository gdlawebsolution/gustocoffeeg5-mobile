import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
const App: React.FC = () => {
  const [formules, setFormules] = useState([]);
  const [selectedFormuleId, setSelectedFormuleId] = useState(null);
  

  useEffect(() => {
    fetch('https://apigustocoffeeg5.fr/formule/all')
      .then(response => response.json())
      .then(data => setFormules(data))
      .catch(error => console.error(error));
  }, []);

  const handleFormuleSelection = async (formuleId: number) => {
    setSelectedFormuleId(formuleId);
    try {
      await AsyncStorage.setItem('selectedFormuleId', formuleId.toString());
      console.log('Formule ID stored in local storage:', formuleId);
    } catch (error) {
      console.error('Error storing formule ID:', error);
    }
  };

  const handleReservation = async () => {
    // Récupérez l'ID de la formule sélectionnée depuis le local storage
    const storedFormuleId = await AsyncStorage.getItem('selectedFormuleId');
    
    // Ici, vous pouvez ajouter le code pour passer à la page de réservation.
    // Vous pouvez également utiliser l'ID de la formule pour passer des données à la page de réservation.
    console.log('ID de la formule sélectionnée pour la réservation:', storedFormuleId);

    // Exemple de navigation vers une page de réservation (ajustez selon votre configuration réelle de navigation)
   // navigation.navigate('Reservation'); 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace('/timepublic')} style={styles.backButton}>
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Sélectionnez une formule</Text>
      {formules.map(formule => (
        <View key={formule.id} style={[styles.formuleContainer, selectedFormuleId === formule.id && styles.selectedFormule]}>
          <Text style={styles.nomFormule}>{formule.nomFormule}</Text>
          <Text style={styles.descriptionFormule}>{formule.descriptionFormule}</Text>
          <Text style={styles.prix}>Prix : {formule.prix} €</Text>
          <Text style={styles.description2}>{formule.description2}</Text>
          <TouchableOpacity onPress={() => handleFormuleSelection(formule.id)} style={styles.selectButton}>
            <Text style={styles.selectButtonText}>Sélectionner</Text>
          </TouchableOpacity>
        </View>
      ))}
      
      <TouchableOpacity style={styles.reservationButton}  onPress={() => {
        // Remplacez '/inscription' par le chemin vers votre page d'inscription
        router.replace('/bookprivate');
      }}>

        <Text style={styles.reservationButtonText}>Passer ma réservation</Text>
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  formuleContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  selectedFormule: {
    backgroundColor: 'grey', 
  },
  nomFormule: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  descriptionFormule: {
    color: 'black',
  },
  prix: {
    color: 'black',
  },
  description2: {
    color: 'black',
  },
  selectButton: {
    backgroundColor: 'brown', 
    padding: 8,
    marginTop: 8,
    borderRadius: 4,
  },
  selectButtonText: {
    color: 'white',
  },
  reservationButton: {
    backgroundColor: 'blue', 
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  reservationButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
