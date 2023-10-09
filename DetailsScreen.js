import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import {getDatabase,ref, set } from "firebase/database";




const DetailsScreen = ({ navigation }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [eating, setEating] = useState('');
  const [sleep, setSleep] = useState('');
  const [milestones, setMilestones] = useState('');

 

  const saveToDatabase = async () => {
    try {
        const database=getDatabase();
      await set(ref(database, 'babyDetails/'), {
        weight: weight,
        height: height,
        eating: eating,
        sleep: sleep,
        milestones: milestones
      });
        setWeight('');
        setHeight('');
        setEating('');
        setSleep('');
        setMilestones('');
      alert('Data saved successfully!');
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Lapsen tiedot</Text>
      
      <Text style={styles.label}>Paino:</Text>
      <TextInput 
        style={styles.input}
        value={weight}
        placeholder="Paino (kg)"
        keyboardType="numeric"
        onChangeText={setWeight}
      />
      <Text style={styles.label}>Pituus:</Text>
      <TextInput 
        style={styles.input}
        value={height}
        placeholder="Pituus (cm)"
        keyboardType="numeric"
        onChangeText={setHeight}
      />
      <Text style={styles.label}>Syöminen:</Text>
      <TextInput 
        style={styles.input}
        value={eating}
        placeholder="Syöminen"
        onChangeText={setEating}
      />
      <Text style={styles.label}>Uni:</Text>
      <TextInput 
        style={styles.input}
        value={sleep}
        placeholder="Uni (h)"
        keyboardType="numeric"
        onChangeText={setSleep}
      />
      <Text style={styles.label}>Merkkipaalut:</Text>
      <TextInput 
        style={styles.input}
        value={milestones}
        placeholder="Merkkipaalut"
        onChangeText={setMilestones}
      />
      <Button title="Tallenna tiedot" onPress={saveToDatabase} color="#FFB6C1" />
    </ScrollView>
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

export default DetailsScreen;

