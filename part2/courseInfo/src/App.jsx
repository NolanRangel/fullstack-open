import Course from "./components/Course.jsx";
import {useState, useEffect} from "react";


const App = () => {
    const [totalExercises, setTotalExercises] = useState(0)
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }

    useEffect(() => {

        const totalExercises = course.parts.reduce((acc, obj) => {
            return acc + obj.exercises;
        }, 0)

        setTotalExercises(totalExercises);
    }, [course]);


    return <Course course={course} totalExercises={totalExercises} />
}

export default App