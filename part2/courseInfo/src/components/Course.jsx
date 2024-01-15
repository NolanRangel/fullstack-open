import Header from "./Header.jsx";
import Content from "./Content.jsx";
import Total from "./Total.jsx";

const Course = ({ courses }) => {


    return (
        <>
            <h2>
                Web development curriculum
            </h2>
            {courses.map((course, i) => {
                const totalExercises = course.parts.reduce((acc, part) => {
                    return acc + part.exercises
                }, 0)


                return <div key={i}>
                            <Header course={course}/>
                            <Content course={course}/>
                            <Total totalExercises={totalExercises}/>
                        </div>
            })}

        </>
    )

}


export default Course