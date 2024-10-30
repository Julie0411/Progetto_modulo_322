import React from "react";
import {Text, View, StyleSheet} from "react-native";

export default function Verifiche(props){
    const darkThemeEnabled = props.darkThemeEnabled;

    const styles = StyleSheet.create({
        background: {
            backgroundColor: darkThemeEnabled ? '#121212' : 'white',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            color: darkThemeEnabled ? 'white' : 'black',
            fontSize: 20
        }
    })

    return (
        <View style={styles.background}>
            <Text style={styles.text}>Verifiche!</Text>
        </View>
    );
}


