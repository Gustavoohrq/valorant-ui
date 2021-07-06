import React, { useEffect } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import * as Font from 'expo-font'



export default function LoadingScreen({ navigation: { navigate } }) {


    useEffect(() => {
        async function loadFont() {

            await Font.loadAsync({
                bold: require('../assets/fonts/Montserrat-Bold.ttf'),
                regular: require('../assets/fonts/Montserrat-Regular.ttf'),
                light: require('../assets/fonts/Montserrat-Light.ttf'),
                alfa: require('../assets/fonts/alfa-slab-one-regular.ttf')
            })
            setInterval(() => {
                navigate('HomeScreen')
            }, 1000)
        }
        loadFont()
    }, [])


    return (
        <View style={styles.container}>
            <Image style={{ width: 180, height: 180 }} source={{ uri: 'https://img.icons8.com/color/452/valorant.png' }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1B252D",
        justifyContent: 'center',
        alignItems: 'center'
    }

})