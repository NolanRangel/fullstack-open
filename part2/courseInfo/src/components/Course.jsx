import Header from "./Header.jsx";
import Content from "./Content.jsx";
import Total from "./Total.jsx";

const Course = ({ course, totalExercises }) => {

    return (
        <>
            <Header course={course}/>
            <Content parts={course.parts}/>
            <Total totalExercises={totalExercises}/>
        </>
    )

}


export default Course