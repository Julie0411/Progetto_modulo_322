import React, {useState} from 'react';
import Settings from "./src/screens/Settings";
import {Pressable, SafeAreaView, StatusBar} from "react-native";
import GradeDetails from "./src/screens/GradeDetails";
import TabNavigator from "./src/navigation/TabNavigator";
import Ionicons from "react-native-vector-icons/Ionicons";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {createStackNavigator} from '@react-navigation/stack';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

const Stack = createStackNavigator();

export default function App() {

    const [darkThemeEnabled, setDarkThemeEnabled] = useState(false);

    const [selectedClass, setSelectedClass] = useState({label: "I2a", maturityIsEnabled: true});

    const [verifications, setVerifications] = useState([]);

    const [grades, setGrades] = useState([]);

    const [maturityIsEnabled, setMaturityIsEnabled] = useState(false);

    const [sortAscending, setSortAscending] = useState(true);

    const theme = darkThemeEnabled ? DarkTheme : DefaultTheme;

    const toggleTheme = () => setDarkThemeEnabled(prev => !prev);

    const toggleMaturity = () => setMaturityIsEnabled(!maturityIsEnabled);

    const BackButton = ({navigation}) => {
        return (
            <Pressable
                style={{marginLeft: 16}}
                onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                    navigation.goBack();
                }}
            >
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color={darkThemeEnabled ? 'white' : 'black'}
                />
            </Pressable>
        );
    };

    const addVerification = (item) => {
        setVerifications(prev => [...prev, {
            id: item.id,
            subject: item.subject,
            teacher: item.teacher,
            classroom: item.classroom,
            data: {...item.start},
            text: item.text || ""
        }]);
    };

    const deleteVerification = (id) => {
        setVerifications(prev => prev.filter(v => v.id !== id));
    };

    const addGrade = (lessonTitle, newGrade) => {
        console.log(lessonTitle, newGrade);
        setGrades(prev => {
            const existingSubject = prev.find(subject => subject.title === lessonTitle);

            if (existingSubject) {
                return prev.map(subject => subject.title === lessonTitle ? {
                    ...subject,
                    grades: [...subject.grades, newGrade]
                } : subject);
            } else {
                return [...prev, {title: lessonTitle, grades: [newGrade]}];
            }
        });
    };

    const deleteGrade = (lessonTitle, gradeToDelete) => {
        setGrades(prev => {
            const existingSubject = prev.find(subject => subject.title === lessonTitle);

            if (existingSubject) {
                return prev.map(subject => subject.title === lessonTitle ? {
                    ...subject,
                    grades: subject.grades.filter(grade => grade.text !== gradeToDelete.text)
                } : subject);
            }

            return prev;
        });
    };

    return (
        <>
            <StatusBar barStyle={darkThemeEnabled ? 'light-content' : 'dark-content'}/>
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: darkThemeEnabled ? 'black' : 'white'
            }}>
                <NavigationContainer theme={theme}>
                    <Stack.Navigator id="MainStack">
                        <Stack.Screen
                            name="TabNavigator"
                            options={{headerShown: false}}
                        >
                            {(navigation) => (
                                <TabNavigator
                                    verifications={verifications}
                                    addVerification={addVerification}
                                    deleteVerification={deleteVerification}
                                    darkThemeEnabled={darkThemeEnabled}
                                    toggleTheme={toggleTheme}
                                    selectedClass={selectedClass}
                                    setSelectedClass={setSelectedClass}
                                    toggleMaturity={toggleMaturity}
                                    maturityIsEnabled={maturityIsEnabled}
                                    navigation={navigation}
                                    grades={grades}
                                    addGrade={addGrade}
                                />
                            )}
                        </Stack.Screen>
                        <Stack.Screen
                            name="Settings"
                            options={({navigation}) => ({
                                headerTitle: "Impostazioni",
                                headerStyle: {backgroundColor: darkThemeEnabled ? 'black' : 'white'},
                                headerLeft: () => <BackButton navigation={navigation}/>
                            })}
                        >
                            {(props) => (
                                <Settings
                                    {...props}
                                    toggleTheme={toggleTheme}
                                    darkThemeEnabled={darkThemeEnabled}
                                    selectedClass={selectedClass}
                                    setSelectedClass={setSelectedClass}
                                    setMaturityIsEnabled={setMaturityIsEnabled}
                                />
                            )}
                        </Stack.Screen>
                        <Stack.Screen
                            name="GradeDetails"
                            options={({route, navigation}) => ({
                                headerTitle: route?.params?.lessonTitle || "Note",
                                headerStyle: {backgroundColor: darkThemeEnabled ? 'black' : 'white'},
                                headerLeft: () => <BackButton navigation={navigation}/>,
                                headerRight: () => (
                                    <Pressable
                                        style={{marginRight: 16}}
                                        onPress={() => {
                                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
                                            setSortAscending(!sortAscending)
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name={sortAscending ? "sort-clock-ascending" : "sort-clock-descending"}
                                            size={24}
                                            color={darkThemeEnabled ? 'white' : 'black'}
                                        />
                                    </Pressable>
                                )
                            })}
                        >
                            {props => (
                                <GradeDetails
                                    {...props}
                                    darkThemeEnabled={darkThemeEnabled}
                                    handleAddGrade={addGrade}
                                    handleDeleteGrade={deleteGrade}
                                    grades={grades.find(g => g.title === props.route?.params?.lessonTitle)?.grades || []}
                                    sortAscending={sortAscending}
                                />
                            )}
                        </Stack.Screen>
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </>
    );
}
