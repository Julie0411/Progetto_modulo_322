import React from "react";
import Calendar from "./Calendar";

export default function Orario({darkThemeEnabled, addVerifiche}){
    return (
        <Calendar darkThemeEnabled={darkThemeEnabled} addVerifiche={addVerifiche}/>
    );
}
