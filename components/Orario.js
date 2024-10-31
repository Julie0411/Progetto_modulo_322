import React, { useRef, useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Calendar from "./Calendar";
import VerificationInputSheet from "./ButtomSheet/VerificationInputSheet";
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
    const snapPoints = useMemo(() => ["10%","50%"], []);
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
        <GestureHandlerRootView>
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
                        index={1}
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

