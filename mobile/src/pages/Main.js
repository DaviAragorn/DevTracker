import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import MapView, { Marker, Callout} from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'
import {MaterialIcons} from '@expo/vector-icons'
import api from '../services/api'
import {connect, disconnect, subscribeToNewDevs} from '../services/socket'
import mapStyle from './MapStyle'

function Main({ navigation}){

    const [devs, setDevs] = useState([])
    const [currentRegion, setCurrentRegion] = useState(null)
    const [techs, setTechs] = useState('')
    useEffect(() => {
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

    useEffect(() => {
         subscribeToNewDevs(dev => setDevs([...devs, dev]))
    }, [devs])

    function setupWebsocket(){
        disconnect()

        const { latitude, longitude} = currentRegion

        connect( latitude, longitude, techs);

        subscribeToNewDevs
    }

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
        setupWebsocket()
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
            <MapView onRegionChangeComplete={handleRegionChange} initialRegion={currentRegion} style={styles.map} customMapStyle={mapStyle}>
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

            <KeyboardAvoidingView style= {styles.searchForm} behavior='padding' keyboardVerticalOffset={110}>
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
            </KeyboardAvoidingView>
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
        backgroundColor: '#323538',
        color: '#fff',
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