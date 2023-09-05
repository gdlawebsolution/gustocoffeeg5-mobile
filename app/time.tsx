import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const MyCalendar = ({ navigation }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState('09:00');
  const [selectedEndTime, setSelectedEndTime] = useState('09:00');

  useEffect(() => {
    const loadStoredTimes = async () => {
      try {
        const startTime = await AsyncStorage.getItem('selectedStartTime');
        const endTime = await AsyncStorage.getItem('selectedEndTime');
        const startDate = await AsyncStorage.getItem('selectedStartDate');
        if (startTime !== null) {
          setSelectedStartTime(startTime);
        }
        if (endTime !== null) {
          setSelectedEndTime(endTime);
        }
        if (startDate !== null) {
          setSelectedStartDate(startDate);
        }
      } catch (error) {
        console.error('Erreur lors du chargement depuis le local storage:', error);
      }
    };

    loadStoredTimes();
  }, []);

  const handleDateSelect = (date) => {
    setSelectedStartDate(date.dateString);
  };

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem('selectedStartDate', selectedStartDate);
      await AsyncStorage.setItem('selectedStartTime', selectedStartTime);
      await AsyncStorage.setItem('selectedEndTime', selectedEndTime);

      // Naviguez vers la page suivante ici
      router.replace('/formule');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement dans le local storage:', error);
    }
  };

  const timeOptions = [
    "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
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
          router.replace('/privatelobby');
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
          handleContinue();
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
  pickerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default MyCalendar;
