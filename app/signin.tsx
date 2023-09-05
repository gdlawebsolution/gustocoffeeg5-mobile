import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Link, router, useRouter } from 'expo-router';

const MyCustomForm = () => {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async () => {
    if (
      prenom.trim() === '' ||
      nom.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirmPassword.trim() === ''
    ) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    } else if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
    } else {
      try {
        const response = await axios.post('https://apigustocoffeeg5.fr/user/create', {
          email,
          roles: ["ROLE_USER"], // Assuming roles is an array
          nom,
          prenom,
          password,
        });

        if (response.status === 201) {
          Alert.alert('Succès', 'Inscription réussie');
          console.log('Inscription réussie !');
          router.replace('/');
        
        } else {
          Alert.alert('Erreur', response.data.message || 'Erreur lors de l\'inscription');
          
        }
      } catch (error) {
        Alert.alert('Erreur', 'Erreur lors de l\'inscription');
        console.error('Erreur lors de l\'inscription:', error);
      }
    }
  };

 


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>

      <View style={styles.form}>
        <Text style={[styles.label, styles.leftAlign, styles.space]}>Prénom</Text>
        <TextInput
          style={[styles.input, styles.space]}
          placeholder="Votre prénom"
          onChangeText={(text) => setPrenom(text)}
          value={prenom}
        />

        <Text style={[styles.label, styles.leftAlign, styles.space]}>Nom</Text>
        <TextInput
          style={[styles.input, styles.space]}
          placeholder="Votre nom"
          onChangeText={(text) => setNom(text)}
          value={nom}
        />

        <Text style={[styles.label, styles.leftAlign, styles.space]}>Mail</Text>
        <TextInput
          style={[styles.input, styles.space]}
          placeholder="exemple.email@gmail.com"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        {/* Champs de mot de passe */}
        <Text style={[styles.label, styles.leftAlign, styles.space]}>Mot de passe</Text>
        <View style={[styles.input, styles.space, styles.passwordInput]}>
          <TextInput
            placeholder="Mot de passe de plus de 8 caractères"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color={showPassword ? 'gray' : '#000'}
            />
          </TouchableOpacity>
        </View>

        {/* Champs de confirmation de mot de passe */}
        <Text style={[styles.label, styles.leftAlign, styles.space]}>Confirmer le mot de passe</Text>
        <View style={[styles.input, styles.space, styles.passwordInput]}>
          <TextInput
            placeholder="Confirmer le mot de passe"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
            <Ionicons
              name={showConfirmPassword ? 'eye-off' : 'eye'}
              size={24}
              color={showConfirmPassword ? 'gray' : '#000'}
            />
          </TouchableOpacity>
        </View>

        {/* Bouton d'inscription avec un espace de 25px */}
        <TouchableOpacity style={[styles.button, styles.space]} onPress={handleSignup}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.signupTextContainer}
          onPress={() => {
            // Remplacez '/inscription' par le chemin vers votre page d'inscription
            router.replace('/');
          }}
        >
          <Text>Déjà inscrit ?</Text>
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
    marginHorizontal: 8, // Ajout d'un espace de 8px sur les côtés
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
  signupTextContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // Style pour aligner le champ de mot de passe avec l'icône "eye" à droite
  passwordInput: {
    flexDirection: 'row', // Afficher les enfants en ligne (horizontalement)
    alignItems: 'center', // Aligner les enfants verticalement au centre
    justifyContent: 'space-between', // Répartir l'espace entre les enfants
  },
  eyeIcon: {
    padding: 1,
  },
});

export default MyCustomForm;
