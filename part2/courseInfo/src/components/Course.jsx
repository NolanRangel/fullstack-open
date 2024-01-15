import Header from "./Header.jsx";
import Content from "./Content.jsx";

const Course = ({ course }) => {

    return (
        <>
            <Header course={course}/>
            <Content parts={course.parts}/>
        </>
    )

}


export default Course