import React from "react";
import { Text, View, StyleSheet, ScrollView, Switch } from "react-native";
import {useStyles} from "../utils/hooks/useStyles";

const Settings = ({ darkThemeEnabled, toggleTheme }) => {
    const [maturityIsEnabled, setMaturityIsEnabled] = React.useState(false);
    const toggleMaturity = () => setMaturityIsEnabled(!maturityIsEnabled);

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
                    <Switch onValueChange={toggleMaturity} value={maturityIsEnabled} />
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
};

export default Settings;

const createStyles = (colors) => StyleSheet.create({
    settingsContainer: {
        backgroundColor: colors.background,
        flexDirection: 'column',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 8,
        width: '100%',
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
    },
    footer: {
        height: 60,
        borderRadius: 8,
        padding: 10,
        marginTop: 20,
        alignItems: 'center',
    }
});
