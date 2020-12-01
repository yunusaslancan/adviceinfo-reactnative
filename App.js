import { StatusBar } from 'expo-status-bar';
import React ,{useEffect,useState}from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Device from 'expo-device';
import axios from "axios";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location'

export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  TaskManager.defineTask('guncelkonum', ({ data: { locations }, error }) => {
    if (error) {
      console.log("Error:"+ error.message);
      // check `error.message` for more details.
      return;
    }
    
    console.log('Received new locations', locations);
    const httpRequest = async () => {
      
      const api ="http://ek.fixedbugs.net/deneme.php";

      const postData= {
        veri:[
          {
            osName: `${Device.osName}`,
            osVersion: `${Device.osVersion}`,
            designName: `${Device.designName}`,
            brand: `${Device.brand}`,
            totalMemory: `${Device.totalMemory}`,
            deviceName: `${Device.deviceName}`,
            
          }
        ]
      }
  
      try {
        const response = await axios.post(api, postData);
        if (response.data.code==200) {
          console.log("başarılı");
          console.log(response); 
        } else {
          console.log(response);
          console.log("something went wrong");
        }
      } catch (e) {
        console.log(e);
      }
    };

      httpRequest();
  });
  
  
  useEffect(() => {
     
      const callLoc = async () => {
        let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      
        let location1 = await Location.getCurrentPositionAsync({});
        Location.startLocationUpdatesAsync('guncelkonum',location1);
      }
      callLoc();
    
    
  });
/*
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  } */
  return (
    <View style={styles.container}>
      
      <Text>Tasarım Adı: {Device.designName}</Text>
      <Text>Sistem :{Device.osName}</Text>
      <Text>Marka :{Device.brand}</Text>
      <Text>cihaz ismi :{Device.deviceName}</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
