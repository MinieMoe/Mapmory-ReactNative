import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, TouchableWithoutFeedback, View, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import SearchBar from './SearchBar';
import MyLocationMarker, { MyMarker } from './MyMarker';

const MyMap = () => {
  //TD: should be the current location of the user 
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324
  })
  const [errMsg, setErrMsg] = useState(null)

  //setting marker of the search result
  const [searchResultLocation, setSearchResultLocation] = useState(null)
  
  const ref = useRef(null)

  /*Getting user current location

  */
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrMsg('Permission to access location was denied');
        return;
      }

      try{
        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });
      }catch(e){
        //User declines to turn on GPS on their phone
        //TD: Direct them to a screen asking them put in zip code?
        console.log('Error trying to get location: ', e)
      }
     
    })();
  }, []);

  const zoomToMarker = (location) => {
    const region = {
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.01, // Adjust these values to control the zoom level
      longitudeDelta: 0.01,
    };
  
    ref.current.animateToRegion(region, 1000); // 1000ms animation duration
  };

  

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <MapView 
          style={styles.map}
          region={{
            ...currentLocation,      
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          ref={ref}
        >
          {currentLocation && <MyLocationMarker currentLocation={currentLocation}/>}
          {searchResultLocation && <MyMarker data={searchResultLocation}/>}
        </MapView>
        <SearchBar 
          onSearch={(resultLocation, placeName) => {
            setSearchResultLocation({
              coordinate : {
                latitude: resultLocation.lat,
                longitude: resultLocation.lng,
              },
              title : placeName
            })
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MyMap