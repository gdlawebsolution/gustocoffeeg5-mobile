import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link, router, useRouter } from 'expo-router';
const ElementOne = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nos places individuelles</Text>
      <Image
        source={require('./place-individuels.jpg')}
        style={styles.image}
      />
      <Text style={styles.price}>5€/H</Text>
      <Text style={styles.descriptionText}>
        Profitez d'une ambiance stimulante et d'une journée productive dans notre coffee-shop coworking.
      </Text>
      <TouchableOpacity style={styles.button}
      onPress={() => {
        // Remplacez '/inscription' par le chemin vers votre page d'inscription
        router.replace('/publiclobby');
      }}>
        <Text style={styles.buttonText}>Choisir</Text>
        
      </TouchableOpacity>
    </View>
  );
};

const ElementTwo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nos Salons privés</Text>
      <Image
          source={require('./Rio.jpg')}
        style={styles.image}
      />
      <Text style={styles.price}>12€/H</Text>
      <Text style={styles.descriptionText}>
      Nos salons privés chez Gusto Coffee, l'endroit idéal pour travailler en toute tranquillité.
Profitez d'un espace exclusif et confortable pour vos réunions ou votre travail individuel.
      </Text>
      <TouchableOpacity style={styles.button}
       onPress={() => {
        // Remplacez '/inscription' par le chemin vers votre page d'inscription
        router.replace('/privatelobby');
      }}>

        <Text style={styles.buttonText}>Choisir</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <ScrollView style={styles.pageContainer}>
      <ElementOne />
      <ElementTwo />

      {/* Ajouter les boutons ici */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#D2B48C' }]}>
          <Text style={styles.buttonText}
          onPress={() => {
            // Remplacez '/inscription' par le chemin vers votre page d'inscription
            router.replace('/historiquereservation');
          }}>Historique de reservation</Text>

        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#D2B48C' }]}>
          <Text style={styles.buttonText}
           onPress={() => {
            // Remplacez '/inscription' par le chemin vers votre page d'inscription
            router.replace('/information');}}>
              Vos Informations</Text>
        </TouchableOpacity>
        
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    marginBottom: 10,
    borderRadius:20,
  },
  price: {
    fontSize: 20,
    marginBottom: 10,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column', // Utilisez 'column' pour empiler les boutons verticalement
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 70, // Ajoute de l'espace en dessous du dernier bouton
  },
  button: {
    backgroundColor: '#836349FF',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 5, // Ajoutez de l'espace vertical entre les boutons
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  
  
});

export default App;
