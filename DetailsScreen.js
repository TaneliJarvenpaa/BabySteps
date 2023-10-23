import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import {getDatabase,ref, set,push } from "firebase/database";





const DetailsScreen = ({ navigation }) => {
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [eating, setEating] = useState('');
  const [pissing, setPissing] = useState('');
  const [poops,setPoops]=useState('');
  const [sleep, setSleep] = useState('');
  const [milestones, setMilestones] = useState('');

  //asetetaan pvm ekalla renderöinnillä
  useEffect(()=>{
    const currentDate = new Date().toISOString();
  setDate(currentDate);
  },[]);
  //validoidaan että tilamuuttujien kentät on täydennetty
  const validateInputs = () => {
    if (!weight || !height || !eating || !pissing || !poops || !sleep) {
      alert("Kaikki kentät ovat pakollisia, paitsi merkkipaalut.");
      return false;
    }
    return true;
  };
  

  const saveToDatabase = async () => {
    //tarkistetaan onko tiedot täytetty
    if(!validateInputs()) {
    return;
    };
    try {
//koitetaan tallentaa tiedot tietokantaan
        const database=getDatabase();
        const newItemRef=push(ref(database,'babyDetails/'));
        const newItemKey=newItemRef.key;

    await set(ref(database,`babyDetails/${newItemKey}`), {
        date: date,
        weight: weight,
        height: height,
        eating: eating,
        pissing: pissing,
        poops:poops,
        sleep: sleep,
        milestones: milestones
      });
      //asetetaan muuttujat tyhjiksi
        setWeight('');
        setHeight('');
        setEating('');
        setPissing('');
        setPoops('');
        setSleep('');
        setMilestones('');
      alert('Pikkuihmisen tiedot pääsi perille!');
    } catch (error) {
      console.error("Joku meni pieleen: ", error);
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
      <Text style={styles.label}>Syöminen krt/pv:</Text>
      <TextInput 
        style={styles.input}
        value={eating}
        placeholder="Syöminen"
        keyboardType="numeric"
        onChangeText={setEating}
      />
      <Text style={styles.label}>Eritys krt/pv:</Text>
      <TextInput 
        style={styles.input}
        value={pissing}
        placeholder="Pisut"
        keyboardType="numeric"
        onChangeText={setPissing}
      />
       <TextInput 
        style={styles.input}
        value={poops}
        placeholder="Kakit"
        keyboardType="numeric"
        onChangeText={setPoops}
      />
      <Text style={styles.label}>Uni:</Text>
      <TextInput 
        style={styles.input}
        value={sleep}
        placeholder="Uni yhteensä vuorokaudessa (h)"
        keyboardType="numeric"
        onChangeText={setSleep}
      />
      <Text style={styles.label}>Merkkipaalut:</Text>
      <TextInput 
        style={styles.input}
        value={milestones}
        placeholder="Tämän päivän saavutukset"
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
