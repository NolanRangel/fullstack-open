import Part from "./Part.jsx";


const Content = ({ course }) => {

    return (
        <>
            {course.parts.map((part, i) => {
                return <Part part={part} key={i}  />
            })}
        </>
    )
}


export default Content