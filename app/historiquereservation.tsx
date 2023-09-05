import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
const ReservationScreen: React.FC = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer l'access token et le user ID depuis AsyncStorage
        const accessToken = await AsyncStorage.getItem('accessToken');
        const userId = await AsyncStorage.getItem('userId');

        // Assurez-vous que accessToken et userId existent
        if (!accessToken || !userId) {
          console.error('Token d\'accès ou ID utilisateur manquant');
          return;
        }

        // Effectuer la requête pour récupérer toutes les réservations
        const response = await fetch(`https://apigustocoffeeg5.fr/api/reservation/user_reservation/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Filtrer les réservations où le "status" est "true"
          const reservationsData = data
            .filter((reservation) => reservation.status === true)
            .map((reservation) => ({
              heureDeDebut: reservation.heureDeDebut,
              heureDeFin: reservation.heureDeFin,
              prixReservation: reservation.prixReservation,
              nomFormule: reservation.formule.nomFormule,
              prix: reservation.formule.prix,
              paiement: reservation.paiement,
            }));
          setReservations(reservationsData);
          setLoading(false);
        } else {
          console.error('Erreur lors de la requête');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données depuis AsyncStorage ou de la requête', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historique de réservation</Text>
      {loading ? (
        <Text>Chargement en cours...</Text>
      ) : reservations.length === 0 ? (
        <Text>Aucune réservation avec le statut "true" n'a été trouvée.</Text>
      ) : (
        <FlatList
          data={reservations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.reservationCard}>
              <Text style={styles.cardText}>Heure de début: {item.heureDeDebut}</Text>
              <Text style={styles.cardText}>Heure de fin: {item.heureDeFin}</Text>
              <Text style={styles.cardText}>Prix de la réservation: {item.prixReservation} Euros</Text>
              <Text style={styles.cardText}>Formule: {item.nomFormule}</Text>
              <Text style={styles.cardText}>Prix de la formule: {item.prix} Euros</Text>
              <Text style={styles.cardText}>Le paiement a été accepté.: {item.paiement}</Text>
            </View>
          )}
        />
      )}
       <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // Remplacez '/inscription' par le chemin vers votre page d'inscription
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
  reservationCard: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#D2B48C', // Couleur marron clair
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // Texte en blanc
  },
});

export default ReservationScreen;
