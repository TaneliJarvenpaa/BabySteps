import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { LineChart, Grid,YAxis} from 'react-native-svg-charts';
import {Picker} from '@react-native-picker/picker';

const SummaryScreen = () => {
  const [babyData, setBabyData] = useState([]); 
  //tallentaa vauvan tiedot firebasesta
  const [duration, setDuration] = useState('1w'); 
  //linecharttien aikavälin määrittelyyn
  const [filteredData, setFilteredData] = useState([]); 
//filteröity data keston perusteella

  useEffect(() => {
    const database = getDatabase();
    const babyDetailsRef = ref(database, 'babyDetails/');
    //hakee firebasesta babydetail polusta datan
    onValue(babyDetailsRef, (snapshot) => {
      const data = snapshot.val();
      const babyDataArray = [];
      //tallentaa haetut tiedot arrayyn avain kerrallaan
      for (let key in data) {
        babyDataArray.push(data[key]);
      }
      //käydään läpi mapilla jokainen alkio ja muokataan stringeistä päivämäärä ja numeroita
      const formattedBabyData = babyDataArray.map((item) => ({
        ...item,
        date: new Date(item.date),
        weight: parseFloat(item.weight),
        height: parseFloat(item.height),
        eating: parseFloat(item.eating),
        pissing: parseFloat(item.pissing),
        poops: parseFloat(item.poops),
        sleep: parseFloat(item.sleep),
      }));
      //asetetaan lopuksi muokattu taulukko babydatan tilaksi
      setBabyData(formattedBabyData);
    });
  }, []);

  //käytetään kun babydata tai pickerillä valitaan eri aikaväli mitä halutaan esittää
  useEffect(() => {
    let endDate = new Date();
    let startDate = new Date();

    switch (duration) {
      case '1w':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case '1m':
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case '1y':
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      default:
        startDate.setDate(endDate.getDate() - 7);
    }
//suodatetaan aikaväliin sopivat arvot 
    const filtered = babyData.filter(item => {
      return item.date >= startDate && item.date <= endDate;
    });
    //asetetaan arvoksi
    setFilteredData(filtered);
  }, [duration, babyData]);
//line chartteja varten filteröidään kaikki painot,unet ja syömiset halutulta aikaväliltä
  const weightData = filteredData.map(data => data.weight);
  const sleepData = filteredData.map(data => data.sleep);
  const eatingData = filteredData.map(data => data.eating);

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={duration} //aikavälin valinta 
          onValueChange={(itemValue) => setDuration(itemValue)}
        >
          <Picker.Item label="1 Viikko" value="1w" />
          <Picker.Item label="1 Kuukausi" value="1m" />
          <Picker.Item label="1 Vuosi" value="1y" />
        </Picker>
      </View>
      
      <Text style={styles.subHeaderText}>Paino</Text>
      <View style={{ height: 100, flexDirection: 'row', paddingVertical: 10 }}>
      <YAxis
            data={weightData}
            contentInset={{ top: 1, bottom: 1 }}
            svg={{ fontSize: 10, fill: 'grey' }}
          />
        <LineChart
          style={{ flex: 1 }}
          data={weightData}
          gridMin={0}
          contentInset={{ top: 1, bottom: 1 }}
          svg={{ stroke: 'rgb(200, 65, 244)' }}
        >
          <Grid />
        </LineChart>
      </View>

      <Text style={styles.subHeaderText}>Uni tunteina</Text>
      <View style={{ height: 100, flexDirection: 'row', paddingVertical: 10 }}>
      <YAxis
            data={sleepData}
            contentInset={{ top: 1, bottom: 1 }}
            svg={{ fontSize: 10, fill: 'grey' }}
          />
        <LineChart
          style={{ flex: 1 }}
          data={sleepData}
          gridMin={0}
          contentInset={{ top: 1, bottom: 1 }}
          svg={{ stroke: 'rgb(65, 134, 244)' }}
        >
          <Grid />
        
        </LineChart>
      </View>

      <Text style={styles.subHeaderText}>Syöminen</Text>
      <View style={{ height: 100, flexDirection: 'row', paddingVertical: 10 }}>
      <YAxis
            data={eatingData}
            contentInset={{ top: 1, bottom: 1 }}
            svg={{ fontSize: 10, fill: 'grey' }}
          />
        <LineChart
          style={{ flex: 1 }}
          data={eatingData}
          gridMin={0}
          contentInset={{ top: 1, bottom: 1 }}
          svg={{ stroke: 'rgb(65, 244, 134)' }}
        >
          <Grid />
        </LineChart>
      </View>
      <FlatList
        data={babyData}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderText}>Päiväkohtaiset tiedot</Text>
            </View>
          }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Päivämäärä: {item.date.toLocaleDateString()}</Text>
            <Text>Paino: {item.weight} kg</Text>
            <Text>Pituus: {item.height} cm</Text>
            <Text>Syöminen: {item.eating} krt/pv</Text>
            <Text>Pisut: {item.pissing} krt/pv</Text>
            <Text>Kakit: {item.poops} krt/pv</Text>
            <Text>Uni: {item.sleep} h</Text>
            <Text>Merkkipaalut: {item.milestones}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFB6C1',
    marginBottom: 3,
  },
  item: {
    backgroundColor: '#F0F0F0',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  subHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    marginBottom: 5,
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,

  },
  listHeader: {
    padding: 5,
    backgroundColor: '#eee',  
    borderBottomWidth: 1,     
    borderBottomColor: '#FFB6C1' 
  },
  listHeaderText: {
    color:'white',
    fontSize: 14,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  }
});

export default SummaryScreen;
