import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Marker } from 'react-native-maps';

const MyLocationMarker = ({currentLocation}) => {
    return (
        <>
            <Marker 
                coordinate={currentLocation}
                title="You're here!"
                image={require('../assets/yourLocationMarker.png')}
            />
        </>
    );
}

const MyMarker = ({data}) => {
    return (
        <>
            <Marker 
                coordinate={data.coordinate}
                title={data.title}
            />
        </>
    );
}

const MyDraggableMarker = ({coordinate, onDragEnd, title}) => {
    return (
        <>
            <Marker 
                coordinate={coordinate}
                title={title}
                draggable
                onDragEnd={(e) => onDragEnd(e.nativeEvent.coordinate)}
            />
        </>
    );
}


const styles = StyleSheet.create({})

export default MyLocationMarker;
export {MyDraggableMarker, MyMarker}
