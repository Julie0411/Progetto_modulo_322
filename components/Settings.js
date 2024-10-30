import React from "react";
import { Text, View, StyleSheet, ScrollView, Switch, Dimensions } from "react-native";

export default function Settings({ toggleTheme, darkThemeEnabled }) {
    const [maturitaIsEnabled, setMaturitaIsEnabled] = React.useState(false);
    const toggleMaturita = () => setMaturitaIsEnabled(!maturitaIsEnabled);
    return (
        <View style={{
            backgroundColor: darkThemeEnabled ? '#121212' : '#d5d5d5',
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <ScrollView>
                <View style={[styles.element,{backgroundColor: darkThemeEnabled ? '#2e2e2e' : 'white',marginTop: 10}]}>
                    <Text style={{ color: darkThemeEnabled ? 'white' : 'black'}}>Maturità</Text>
                    <Switch onValueChange={toggleMaturita} value={maturitaIsEnabled} />
                </View>
                <View style={[{backgroundColor: darkThemeEnabled ? '#2e2e2e' : 'white'},styles.element]}>
                    <Text style={{ color: darkThemeEnabled ? 'white' : 'black' }}>Dark Theme</Text>
                    <Switch trackColor={{true: '#818181'}} thumbColor={'#3c3c3c'} onValueChange={toggleTheme} value={darkThemeEnabled} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    element:{
        flex: 1, flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get("window").width,
        padding: 20,
        marginTop: 5,
    }
})
