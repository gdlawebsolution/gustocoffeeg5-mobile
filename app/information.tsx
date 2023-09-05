import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const ReservationScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const userId = await AsyncStorage.getItem('userId');

        if (!accessToken || !userId) {
          console.error('Token d\'accès ou ID utilisateur manquant');
          return;
        }

        const userResponse = await fetch(`https://apigustocoffeeg5.fr/data_user/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUserData(userData);
        } else {
          console.error('Erreur lors de la requête utilisateur');
        }

        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données depuis AsyncStorage ou de la requête', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informations de l'utilisateur</Text>
      
      <View style={styles.userInfo}>
        <Text style={styles.userInfoText}>Nom: {userData ? userData.nom : 'Non renseigné'}</Text>
        <Text style={styles.userInfoText}>Prénom: {userData ? userData.prenom : 'Non renseigné'}</Text>
        <Text style={styles.userInfoText}>Téléphone: {userData ? (userData.telephone || 'Non renseigné') : 'Non renseigné'}</Text>
        <Text style={styles.userInfoText}>Adresse: {userData ? (userData.adresse || 'Non renseigné') : 'Non renseigné'}</Text>
        <Text style={styles.userInfoText}>Code Postal: {userData ? (userData.codePostal || 'Non renseigné') : 'Non renseigné'}</Text>
        <Text style={styles.userInfoText}>Ville: {userData ? (userData.ville || 'Non renseigné') : 'Non renseigné'}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.replace('/home');
        }}
      >
        <Text style={styles.buttonText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  userInfo: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#D2B48C',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ReservationScreen;
