import React, {useState} from 'react';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from "./src/navigation/TabNavigator";
import Settings from "./src/screens/Settings";
import {Pressable, StatusBar} from "react-native";
import GradeDetails from "./src/screens/GradeDetails";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();

export default function App() {

    const [darkThemeEnabled, setDarkThemeEnabled] = useState(true);

    const [selectedClass, setSelectedClass] = useState({label: "I2a", maturityIsEnabled: true});

    const [verifications, setVerifications] = useState([]);

    const [grades, setGrades] = useState([]);

    const [maturityIsEnabled, setMaturityIsEnabled] = useState(false);

    const theme = darkThemeEnabled ? DarkTheme : DefaultTheme;

    const toggleTheme = () => setDarkThemeEnabled(prev => !prev);

    const toggleMaturity = () => setMaturityIsEnabled(!maturityIsEnabled);

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

    const addGrade = (lessonTitle, newGrade) => {
        setGrades(prev => {
            const existingSubject = prev.find(subject => subject.title === lessonTitle);
            if (existingSubject) {
                return prev.map(subject =>
                    subject.title === lessonTitle
                        ? {...subject, grades: [...subject.grades, newGrade]}
                        : subject
                );
            } else {
                return [...prev, {
                    title: lessonTitle,
                    grades: [newGrade]
                }];
            }
        });
    };

    const deleteGrade = (lessonTitle, gradeToDelete) => {
        setGrades(prev => {
            const existingSubject = prev.find(subject => subject.title === lessonTitle);
            if (existingSubject) {
                return prev.map(subject =>
                    subject.title === lessonTitle
                        ? {
                            ...subject,
                            grades: subject.grades.filter(grade => grade.text !== gradeToDelete.text)
                        }
                        : subject
                );
            }
            return prev;
        });
    };


    const deleteVerification = (id) => {
        setVerifications(prev => prev.filter(v => v.id !== id));
    };

    const BackButton = ({navigation}) => {
        return (
            <Pressable onPress={() => navigation.goBack()} style={{marginLeft: 16}}>
                <Ionicons name="arrow-back" size={24} color={darkThemeEnabled ? 'white' : 'black'}/>
            </Pressable>
        );
    };

    return (
        <>
            <StatusBar barStyle={darkThemeEnabled ? 'light-content' : 'dark-content'}/>
            <NavigationContainer theme={theme}>
                <Stack.Navigator>

                    <Stack.Screen
                        name="TabNavigator"
                        options={{headerShown: false}}
                    >
                        {(navigation) => (
                            <TabNavigator
                                {...{
                                    verifications, addVerification, deleteVerification,
                                    darkThemeEnabled, toggleTheme, selectedClass,
                                    setSelectedClass, toggleMaturity, maturityIsEnabled,
                                    navigation, grades, addGrade
                                }}
                            />
                        )}
                    </Stack.Screen>

                    <Stack.Screen
                        name="Settings"
                        options={({ navigation }) => ({
                            headerTitle: "Impostazioni",
                            headerLeft: () => <BackButton navigation={navigation} />
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
                            headerLeft: () => <BackButton navigation={navigation}/>,
                            headerRight: () => (
                                <Pressable
                                    onPress={() => navigation.setParams({ showSheet: Date.now() })}
                                    style={{marginRight: 16}}
                                >
                                    <Ionicons
                                        name="add-outline"
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
                            />
                        )}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
