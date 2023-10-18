import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <ImageBackground 
      source={{ uri: 'https://cdn.pixabay.com/photo/2023/10/01/15/39/girl-8287665_1280.jpg' }}
      style={styles.backgroundImage}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Tervetuloa BabySteps Appiin!</Text>
        <Text style={styles.introText}>
          Jännittävä matka on alkanut! BabySteps on täällä auttamassa sinua 
          dokumentoimaan ja juhlistamaan jokaista ainutlaatuista hetkeä lapsesi kasvutarinassa.
        </Text>
        <Text style={styles.introText}>
          Seuraa ja tallenna lapsesi kasvun kannalta tärkeitä tietoja, kuten painoa, pituutta, 
          merkkipaaluja, sekä monia muita unohtumattomia hetkiä ja muistoja. 
          Aloita tallentamalla lapsesi ensimmäinen merkkipaalu tänään!
        </Text>
        <TouchableOpacity 
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Details')}
        >
          <Text style={styles.buttonText}>Tallenna merkkipaalu tästä</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  introText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  buttonContainer: {
    marginTop: 15,
    backgroundColor: '#FF91A4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;


