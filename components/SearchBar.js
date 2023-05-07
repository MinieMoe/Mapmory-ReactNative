import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env'
import Constants from 'expo-constants';
import { useRef, useEffect } from 'react';
import CancelIcon from '../assets/Icons/CancelIcon';

const SearchBar = ({onSearch}) => {
    const ref = useRef();

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder='Recall your memory...'
                fetchDetails
                onPress={(data, details = null) => {
                    onSearch(details.geometry.location, data.structured_formatting.main_text)
                }}
                query={{
                    key: GOOGLE_MAPS_API_KEY,
                    language: 'en',
                }}
                ref={ref}
                styles={{
                    container:{
                        backgroundColor: 'white',
                        borderRadius: 5,
                        elevation: 1.5,
                        shadowColor: 'black',
                        shadowOffset: {width:0, height: 4},
                        shadowRadius: 1.5,
                        shadowOpacity: 0.25,
                    }
                }}
            />
            <Pressable style={styles.button} onPress={() => {
                    if (ref.current?.getAddressText() === ''){
                        ref.current?.blur()
                    }else{
                        ref.current?.setAddressText('')
                    }
                }}>
                <CancelIcon />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '90%',
        position: 'absolute',
        top: Constants.statusBarHeight,
        marginTop: 5,
    },
    button:{
        marginLeft: 10,
        justifyContent: 'center',
        height: 50,
    }

})

export default SearchBar;
