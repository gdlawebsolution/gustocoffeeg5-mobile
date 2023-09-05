import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router'; // Importer le router depuis expo-router
import WebView from 'react-native-webview';

const StripePage: React.FC = () => {
  const [stripeLink, setStripeLink] = useState<string | null>(null);

  useEffect(() => {
    const fetchStripeLink = async () => {
      try {
        const storedStripeLink = await AsyncStorage.getItem('stripeLink');
        if (storedStripeLink) {
          setStripeLink(storedStripeLink);
          console.log('stripeLink:', storedStripeLink); // Ajoutez cette ligne pour afficher le contenu de stripeLink dans la console
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du lien Stripe depuis le Local Storage :', error);
      }
    };

    fetchStripeLink();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace('/home')} style={styles.backButton}>
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Lien Stripe</Text>
      {stripeLink ? (
        <WebView
          source={{ uri: stripeLink }} // Utilisez stripeLink comme URL source
          style={{ flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
        />
      ) : (
        <Text>Aucun lien Stripe trouvé dans le Local Storage.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 25,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: Dimensions.get('window').width / 2 - 50, // Centrer horizontalement
  },
  backButtonText: {
    fontSize: 18,
    color: 'blue',
  },
});

export default StripePage;
