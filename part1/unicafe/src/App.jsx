import { useState } from 'react'

const Button = ({text, handleClick}) => {

    return (
        <>
            <button onClick={() => handleClick(text)}>
                {text}
            </button>
        </>
    )

}


const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)


    const handleClick = (text) => {
        if(text === 'good') {
            setGood(good + 1)
        } else if (text === 'neutral') {
            setNeutral(neutral + 1);
        } else {
            setBad(bad + 1);
        }
    }

    return (
        <div>
            <div>
                <h2>
                    give feedback
                </h2>
                <Button handleClick={handleClick} text={"good"}/>
                <Button handleClick={handleClick} text={"neutral"}/>
                <Button handleClick={handleClick} text={"bad"}/>
            </div>
            <div>
                <h2>
                    statistics
                </h2>
                <p>good {good}</p>
                <p>neutral {neutral}</p>
                <p>bad {bad}</p>
            </div>
        </div>
    )
}

export default App