import Part from "./Part.jsx";


const Content = ({ parts }) => {
    console.log(parts, '****')

    return (
        <>
            {parts.map((part, i) => {
                return <Part part={part} key={i}  />
            })}
        </>
    )
}


export default Content