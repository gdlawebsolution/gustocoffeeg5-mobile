import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView from 'react-native-webview';

const StripePage: React.FC = () => {
  const [stripeLink, setStripeLink] = useState<string | null>(null);

  useEffect(() => {
    const fetchStripeLink = async () => {
      try {
        const storedStripeLink = await AsyncStorage.getItem('stripeLink');
        if (storedStripeLink) {
          setStripeLink(storedStripeLink);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du lien Stripe depuis le Local Storage :', error);
      }
    };

    fetchStripeLink();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lien Stripe</Text>
      {stripeLink ? (
        <WebView
          source={{ uri: stripeLink }}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
  },
});

export default StripePage;
