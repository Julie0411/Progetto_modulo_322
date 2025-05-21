import GradesContext from "../context/GradesContext.js";
import {useContext} from "react";

export const writeGrades = () => {

    const { grades } = useContext(GradesContext);
    const file = require("/src/grades.json");
    const grade = []
    for (const grade of grades) {
         grade.add({"subject":grades.subject,"grade":grades.grade});
        console.log(grade);
    }
    console.log(grade)
    file.write(grade);
}