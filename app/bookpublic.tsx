import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button , Image,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const ProfilePage: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');
  const [selectedSalonId, setSelectedSalonId] = useState<string | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState<string>('');
  const [selectedEndTime, setSelectedEndTime] = useState<string>('');
  const [selectedFormuleId, setSelectedFormuleId] = useState<string | null>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<string>('');
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        const storedAccessToken = await AsyncStorage.getItem('accessToken');
        const storedSalonId = await AsyncStorage.getItem('selectedSalonId');
        const storedSelectedStartTime = await AsyncStorage.getItem('selectedStartTime');
        const storedSelectedEndTime = await AsyncStorage.getItem('selectedEndTime');
        const storedFormuleId = await AsyncStorage.getItem('selectedFormuleId');
        const storedSelectedDate = await AsyncStorage.getItem('selectedStartDate');

        if (storedUserId && storedAccessToken) {
          setUserId(storedUserId);
          setAccessToken(storedAccessToken);
        }
        if (storedSalonId) {
          setSelectedSalonId(storedSalonId);
        }
        if (storedSelectedStartTime) {
          setSelectedStartTime(storedSelectedStartTime);
        }
        if (storedSelectedEndTime) {
          setSelectedEndTime(storedSelectedEndTime);
        }
        if (storedFormuleId) {
          setSelectedFormuleId(storedFormuleId);
        }
        if (storedSelectedDate) {
          setSelectedStartDate(storedSelectedDate);
        }
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };

    fetchData();
  }, []);

  const createReservation = async () => {
    try {
      if (
        userId &&
        accessToken &&
        selectedSalonId &&
        selectedStartTime &&
        selectedEndTime &&
        selectedFormuleId &&
        selectedStartDate
      ) {
        const requestBody = {
          date: selectedStartDate,
          heure_de_debut: selectedStartTime,
          heure_de_fin: selectedEndTime,
          id_formule: selectedFormuleId,
          id_user: userId,
          effectif: '1',
          id_espace_de_travail: selectedSalonId,
          type_espace_de_travail: 'principal_room',
        };
  
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        };
  
        // Effectuer la première requête pour créer la réservation
        const response = await fetch(
          'https://apigustocoffeeg5.fr/api/reservation/create_reservation',
          {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
          }
        );
  
        if (response.ok) {
          try {
            const responseData = await response.json();
            const reservationId: string = responseData.reservation_id;
            console.log('reservation_id:', reservationId);
  
            console.log('Réservation créée avec succès.');
  
            // Exécuter la requête pour obtenir le paiement_url
            const paymentResponse = await fetch(
              `https://apigustocoffeeg5.fr/paiement_success/${reservationId}`,
              {
                method: 'GET',
                headers: headers,
              }
            );
  
            if (paymentResponse.ok) {
              const paymentData = await paymentResponse.json();
              const paymentUrl = paymentData.payment_url;
              setPaymentUrl(paymentUrl);
              console.log(paymentUrl);
  
              // Stockez le lien Stripe dans le Local Storage
              try {
                await AsyncStorage.setItem('stripeLink', paymentUrl);
                console.log('Lien Stripe stocké dans le Local Storage avec succès.');
              } catch (error) {
                console.error('Erreur lors de la sauvegarde du lien Stripe dans le Local Storage:', error);
              }
            } else {
              console.error('Erreur lors de la récupération de payment_url:', paymentResponse.status);
            }
          } catch (error) {
            console.error('Erreur lors de la récupération de la réservation JSON :', error);
          }
        } else {
          console.error('Erreur lors de la création de la réservation:', response.status);
        }
      } else {
        console.error('Données manquantes pour créer la réservation.');
      }
    } catch (error) {
      console.error('Erreur lors de la requête de création de réservation :', error);
    }
  };
  
 //<Text>ID d'utilisateur: {userId}</Text>
      // <Text>Access Token: {accessToken}</Text>
  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={() => router.replace('/formulepublic')} style={styles.backButton}>
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Reservation</Text>
      {/*selectedSalonId !== null && (
        <Text>ID de la salle sélectionnée: {selectedSalonId}</Text>
      )}
      {selectedStartTime !== '' && (
        <Text>Heure de début sélectionnée: {selectedStartTime}</Text>
      )}
      {selectedEndTime !== '' && (
        <Text>Heure de fin sélectionnée: {selectedEndTime}</Text>
      )}
      {selectedFormuleId !== null && (
        <Text>ID de la formule sélectionnée: {selectedFormuleId}</Text>
      )}
      {selectedStartDate !== '' && (
        <Text>Date sélectionnée: {selectedStartDate}</Text>
      // )}*/
}
      <Image
          source={require('./logo.jpg')}
        // style={styles.image}
      />
      <View style={styles.buttonContainer}>
      <View style={styles.buttonContainer}>
  <Button
    title="Passer la réservation"
    onPress={async () => {
      createReservation(); // Créez la réservation
      // Attendez 3 secondes avant de naviguer vers la page '/stripe'
      setTimeout(() => {
        router.replace('/stripe');
      }, 3000);
    }}
  />
</View>

      </View>
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
  buttonContainer: {
    marginTop: 20,
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

export default ProfilePage;
