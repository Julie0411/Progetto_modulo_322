import React from "react";
import { Text, View, StyleSheet, ScrollView, Switch } from "react-native";
import {useStyles} from "../utils/hooks/useStyles";

const createStyles = (colors) => StyleSheet.create({
    settingsContainer: {
        backgroundColor: colors.background,
        flexDirection: 'column',
        alignItems: "stretch",
        height: '100%',
    },
    element: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '100%',
        padding: 20,
        marginTop: 10,
        backgroundColor: colors.surface,
        height: 60,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    text: {
        color: colors.text,
    }
});

const Settings = ({ darkThemeEnabled, toggleTheme }) => {
    const [maturitaIsEnabled, setMaturitaIsEnabled] = React.useState(false);
    const toggleMaturita = () => setMaturitaIsEnabled(!maturitaIsEnabled);

    const styles = useStyles(createStyles, darkThemeEnabled);

    return (
        <View style={styles.settingsContainer}>
            <ScrollView
                horizontal={false}
                contentContainerStyle={{ flexGrow: 1 }}
                alwaysBounceHorizontal={false}
            >
                <View style={[styles.element, { marginTop: 10 }]}>
                    <Text style={styles.text}>Maturità</Text>
                    <Switch onValueChange={toggleMaturita} value={maturitaIsEnabled} />
                </View>
                <View style={styles.element}>
                    <Text style={styles.text}>Dark Theme</Text>
                    <Switch
                        trackColor={{ true: '#818181' }}
                        thumbColor={'#3c3c3c'}
                        onValueChange={toggleTheme}
                        value={darkThemeEnabled}
                    />
                </View>
                <View style={styles.element}>
                    <Text style={styles.text}>Informazione</Text>
                </View>
                <View style={styles.element}>
                    <Text style={styles.text}>Hai altre domande?</Text>
                </View>
                <View style={styles.element}>
                    <Text style={styles.text}>Buy Andrea a coffee</Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.text}>v: a0.1</Text>
                </View>
            </ScrollView>
        </View>
    );
}

export default Settings;
