import grades from "../context/GradesContext.js";

export const writeGrades = () => {
    const file = require("download/grades.json");
    const grade = []
    for (const grade of grades) {
        grade.add({"subject":grade.subject,"grade":grade.grade});
        console.log(grade);
    }
    file.write(grades);
}