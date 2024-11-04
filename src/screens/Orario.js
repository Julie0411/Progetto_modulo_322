import React, { useRef, useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Calendar from "../components/Calendar";
import VerificationInputSheet from "../components/bottomSheet/VerificationInputSheet";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Orario(props) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        handleStyle: {
            backgroundColor: props.darkThemeEnabled ? 'rgba(0,0,0,1)' : 'white',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
        },
        handleIndicatorStyle: {
            backgroundColor: props.darkThemeEnabled ? 'white' : 'black',
            marginTop: 5
        }
    });

    const { darkThemeEnabled, addVerification } = props;
    const [selectedEvent, setSelectedEvent] = useState(null);
    const bottomSheetModalRef = useRef(null);

    const snapPoints = useMemo(() => ["30%"], []);

    const handleEventPress = (event) => {
        setSelectedEvent(event);
        bottomSheetModalRef.current?.present();
    };

    const handleSaveText = (text) => {
        if (selectedEvent) {
            addVerification({ ...selectedEvent, text });
        }
        bottomSheetModalRef.current?.close();
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <View style={styles.container}>
                    <Calendar
                        darkThemeEnabled={darkThemeEnabled}
                        addVerification={addVerification}
                        onEventPress={handleEventPress}
                    />
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        snapPoints={snapPoints}
                        enablePanDownToClose={true}
                        keyboardBehavior="interactive"
                        handleStyle={styles.handleStyle}
                        handleIndicatorStyle={styles.handleIndicatorStyle}
                    >
                        <VerificationInputSheet
                            darkThemeEnabled={darkThemeEnabled}
                            selectedEvent={selectedEvent}
                            setSelectedEvent={setSelectedEvent}
                            onSave={handleSaveText}
                        />
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}
