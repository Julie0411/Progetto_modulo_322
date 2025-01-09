import React, {useState} from 'react';
import Settings from "./src/screens/Settings";
import {Pressable} from "react-native";
import {StatusBar} from "expo-status-bar";
import GradeDetails from "./src/screens/GradeDetails";
import TabNavigator from "./src/navigation/TabNavigator";
import Ionicons from "react-native-vector-icons/Ionicons";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {createStackNavigator} from '@react-navigation/stack';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
// Create stack navigator instance
const Stack = createStackNavigator();

export default function App() {
    // State management for theme
    const [darkThemeEnabled, setDarkThemeEnabled] = useState(false);
    // State for selected class and its maturity status
    const [selectedClass, setSelectedClass] = useState({label: "I2a", maturityIsEnabled: true});
    // State for verifications list
    const [verifications, setVerifications] = useState([]);
    // State for grades list
    const [grades, setGrades] = useState([]);
    // State for maturity feature toggle
    const [maturityIsEnabled, setMaturityIsEnabled] = useState(false);
    // State for sorting direction
    const [sortAscending, setSortAscending] = useState(true);
    // Theme selection based on darkThemeEnabled state
    const theme = darkThemeEnabled ? DarkTheme : DefaultTheme;
    // Theme toggle function
    const toggleTheme = () => setDarkThemeEnabled(prev => !prev);
    // Maturity feature toggle function
    const toggleMaturity = () => setMaturityIsEnabled(!maturityIsEnabled);
    // Back button component with haptic feedback
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
    // Function to add new verification
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
    // Function to delete verification by id
    const deleteVerification = (id) => {
        setVerifications(prev => prev.filter(v => v.id !== id));
    };
    // Function to add new grade to a subject
    const addGrade = (subjectTitle, newGrade) => {
        console.log(subjectTitle, newGrade);
        setGrades(prev => {
            const existingSubject = prev.find(subject => subject.title === subjectTitle);

            if (existingSubject) {
                return prev.map(subject => subject.title === subjectTitle ? {
                    ...subject,
                    grades: [...subject.grades, newGrade]
                } : subject);
            } else {
                return [...prev, {title: subjectTitle, grades: [newGrade]}];
            }
        });
    };
    // Function to delete grade from a subject
    const deleteGrade = (subjectTitle, gradeToDelete) => {
        setGrades(prev => {
            const existingSubject = prev.find(subject => subject.title === subjectTitle);

            if (existingSubject) {
                return prev.map(subject => subject.title === subjectTitle ? {
                    ...subject,
                    grades: subject.grades.filter(grade => grade.text !== gradeToDelete.text)
                } : subject);
            }

            return prev;
        });
    };

    return (
        <>
            <NavigationContainer theme={theme}>
                <StatusBar style={darkThemeEnabled ? "light" : "dark"}/>
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
                            headerTitle: route?.params?.subjectTitle || "Note",
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
                                grades={grades.find(g => g.title === props.route?.params?.subjectTitle)?.grades || []}
                                sortAscending={sortAscending}
                            />
                        )}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
