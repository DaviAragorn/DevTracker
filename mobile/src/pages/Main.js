import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard} from 'react-native'
import MapView, { Marker, Callout} from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'
import {MaterialIcons} from '@expo/vector-icons'
import api from '../services/api'

function Main({ navigation}){

    const [devs, setDevs] = useState([])
    const [currentRegion, setCurrentRegion] = useState(null)
    const [techs, setTechs] = useState('')
    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        async function loadInitialLocation(){
            const { granted } = await requestPermissionsAsync()
            
            if(granted){
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });
            

                const {latitude, longitude} = coords
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta:0.04,
                    longitudeDelta:0.04,
                })
            }
        }

        loadInitialLocation();
    })

    async function loadDevs(){
        const {latitude, longitude} = currentRegion
        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs,
            }
        })

        setDevs(response.data)
    }

    function handleRegionChange(region){
        setCurrentRegion(region)
    }

    if(!currentRegion) {
        return null;
    }

    const _keyboardDidShow = () => {
    };
    
    const _keyboardDidHide = () => {

    };
    
    return (
        <>
            <MapView onRegionChangeComplete={handleRegionChange} initialRegion={currentRegion} style={styles.map}>
                {devs.map(dev => (
                    <Marker key={dev._id}coordinate={{latitude:dev.location.coordinates[1], longitude:dev.location.coordinates[0]}}>
                        <Image style={styles.avatar} source={{uri: dev.avatar_url}}></Image>

                        <Callout onPress={() => {
                            navigation.navigate('Profile', { github_username: dev.github_username})
                        }}>
                        <View style = {styles.callout}>
                            <Text style = {styles.devName}>{dev.name}</Text>
                            <Text style = {styles.devBio}>{dev.bio}</Text>
                            <Text style = {styles.devTech}>{dev.techs.join(', ')}</Text>
                        </View>
                        </Callout>
                    </Marker>
                ) )}
            </MapView>

            <View style= {styles.searchForm}>
                <TextInput style={styles.searchInput}
                           placeholder="search devs by techs"
                           placeholderTextColor='#999'
                           autoCapitalize="words"
                           autoCorrect={false}
                           value={techs}
                           onChangeText={setTechs}/>
                <TouchableOpacity onPress={loadDevs}style={styles.loadButton}>
                <MaterialIcons name='my-location' size={20} color='#fff'></MaterialIcons>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff'
    },
    callout: {
        width: 260,
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTech: {
        marginTop: 5,
    },
    searchForm: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20, 
        zIndex: 0,
        flexDirection: 'row',
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset:{
            width: 4,
            height: 4,
        },
        elevation: 2
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#c40a00', 
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    }
})

export default Main