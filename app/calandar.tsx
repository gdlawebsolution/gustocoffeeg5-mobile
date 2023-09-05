import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const MyCalendar = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState('09:00');
  const [selectedEndTime, setSelectedEndTime] = useState('09:00');
  const [numOfPlaces, setNumOfPlaces] = useState(1);

  const handleContinue = async () => {
    // Stocker l'heure de début et l'heure de fin sélectionnées dans le local storage
    await AsyncStorage.setItem('selectedStartTime', selectedStartTime);
    await AsyncStorage.setItem('selectedEndTime', selectedEndTime);

    //navigation.replace('NomDeVotreEcran'); // Remplacez 'NomDeVotreEcran' par le nom de votre écran de destination
  };
  

  const handleDateSelect = (date) => {
    if (selectedStartDate === date.dateString) {
      setSelectedStartDate(null);
    } else {
      setSelectedStartDate(date.dateString);

      // Stocker la date sélectionnée dans le local storage
      AsyncStorage.setItem('selectedDate', date.dateString)
        .then(() => {
          console.log('Date sélectionnée stockée dans le local storage.');
        })
        .catch((error) => {
          console.error('Erreur lors du stockage de la date sélectionnée :', error);
        });
    }
  };

 

  const timeOptions = [
    "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
  ];

  const filteredEndTimes = timeOptions.slice(
    timeOptions.indexOf(selectedStartTime),
    timeOptions.length
  );

  const markedDates = {};
  if (selectedStartDate) {
    markedDates[selectedStartDate] = { selected: true, selectedColor: 'brown' };
  }

  return (
    <View style={styles.container}>
      <Button
        title="Retour"
        onPress={() => {
          router.replace('/');
        //  navigation.replace('Accueil'); // Remplacez 'Accueil' par le nom de votre écran d'accueil
        }}
      />
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={markedDates}
        style={styles.calendar}
        theme={{
          textDayFontSize: 18,
          calendarBackground: 'white',
          selectedDayBackgroundColor: 'brown',
          selectedDayTextColor: 'white',
        }}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedStartTime}
          onValueChange={(itemValue) => setSelectedStartTime(itemValue)}
          style={styles.picker}
        >
          {timeOptions.map((time, index) => (
            <Picker.Item key={index} label={time} value={time} />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedEndTime}
          onValueChange={(itemValue) => setSelectedEndTime(itemValue)}
          style={styles.picker}
        >
          {filteredEndTimes.map((time, index) => (
            <Picker.Item key={index} label={time} value={time} />
          ))}
        </Picker>
      </View>
      
      <Button
        title="Continuer"
        onPress={() => {
          router.replace('/formule');
        //  navigation.replace('Accueil'); // Remplacez 'Accueil' par le nom de votre écran d'accueil
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar: {
    width: 415,
    height: 330,
    borderRadius: 5,
    marginBottom: 5,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 1,
  },
  picker: {
    width: 200,
    height: 180,
    borderColor: 'brown',
  },
});

export default MyCalendar;
