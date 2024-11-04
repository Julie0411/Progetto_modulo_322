import {Text, View, StyleSheet} from "react-native";
import React from "react";

export default function Note(props){
    const darkThemeEnabled = props.darkThemeEnabled;
    const styles = StyleSheet.create({
        background: {
            backgroundColor: darkThemeEnabled ? 'black' : 'white',
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
            <Text style={styles.text}>Note!</Text>
        </View>
    );
}


