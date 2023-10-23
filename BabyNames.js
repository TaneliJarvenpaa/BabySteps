import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const BabyNames = () => {
  const [names, setNames] = useState([]);
  const [gender, setGender] = useState('neutral');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //haetaan nimiä API:sta sukupuolen perusteella
  const fetchNames = () => {
    setLoading(true); //laitetaan latausindikaattori päälle
    fetch(`https://api.api-ninjas.com/v1/babynames?gender=${gender}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': 'eV2nHzKopG+UMnxucC0JHw==nJb8LtO4C8Quc3K5',
      },
    })
      .then((response) => response.json()) //muunnetaan jsoniksi
      .then((data) => { //käsitellään vastausdata
        setNames(data); //asetetaan muuttujaan
        setLoading(false); //latausindikaattori pois päältä
      })
      .catch((err) => { //virhekäsittely
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Vauvan nimet</Text>

      <Text style={styles.label}>Valitse sukupuoli:</Text>
      <Picker //pickeri sukupuolen valintaan 
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Neutraali" value="neutral" />
        <Picker.Item label="Poika" value="boy" />
        <Picker.Item label="Tyttö" value="girl" />
      </Picker>

      <Button title="Arvo 10 lasten nimeä" onPress={fetchNames} color="#FFB6C1" />

      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.label}>Error: {error}</Text>}
      
      <FlatList //nimilistan esittäminen flatlistilla
        data={names}
        renderItem={({ item }) => <Text style={styles.label}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFB6C1',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#FFB6C1',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
    borderRadius: 8,
  }
});

export default BabyNames;

