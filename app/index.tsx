import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { Link, router, useRouter } from 'expo-router';

const MyCustomForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Erreur', 'Champ incorrect');
    } else {
      try {
        const response = await axios.post('https://apigustocoffeeg5.fr/user/login', {
          email,
          password,
        });

        const { token, id } = response.data;
         // Storing ID and Token in AsyncStorage
        await AsyncStorage.setItem('userId', id.toString());
        await AsyncStorage.setItem('accessToken', token);
        Alert.alert('Succès', 'Vous êtes connecté !');
        console.log('Access Token:', token);
        console.log('ID:', id);

        console.log('Utilisateur connecté !');
        // Redirect to '/home' with user ID as a parameter
        router.replace(`/home`);
      } catch (error) {
        Alert.alert('Erreur', 'Identifiants invalides');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <View style={styles.form}>
        <Text style={[styles.label, styles.leftAlign, styles.space]}>Mail</Text>
        <TextInput
          style={[styles.input, styles.space]}
          placeholder="exemple.email@gmail.com"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        <Text style={[styles.label, styles.leftAlign, styles.space]}>Mot de passe</Text>
        <TextInput
          style={[styles.input, styles.space]}
          placeholder="Mot de passe de plus de 8 caractères"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />

        <TouchableOpacity style={[styles.button, styles.space]} onPress={handleLogin}>
          <Text style={styles.buttonText}>Connexion</Text>
        </TouchableOpacity>

        {/* Ajout du lien cliquable vers la page d'inscription */}
        <TouchableOpacity
          style={styles.signupTextContainer}
          onPress={() => {
            // Remplacez '/inscription' par le chemin vers votre page d'inscription
            router.replace('/signin');
          }}
        >
          <Text style={styles.signupText}>Vous n'avez pas de compte ? Inscrivez-vous ici</Text>
        </TouchableOpacity>
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
  form: {
    width: 370,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
  },
  leftAlign: {
    alignSelf: 'flex-start',
  },
  space: {
    marginHorizontal: 8,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#836349FF',
    borderRadius: 30,
    width: '100%',
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signupTextContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  signupText: {
    color: '#836349FF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default MyCustomForm;
