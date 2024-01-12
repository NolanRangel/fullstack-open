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

const StatisticLine = ({value, text}) => {

    return (
        <>
            <p>{text} {value}</p>
        </>
    )
}

const Statistics = ({good, bad, neutral, all, average, totalClicks, positive}) => {

     return (
         <>
         {totalClicks === 0 ?
            <div>
                <h4>
                    No feedback given
                </h4>
            </div>
         :
             <div>
                 <h2>
                     statistics
                 </h2>

                 <StatisticLine text="good" value={good} />
                 <StatisticLine text="neutral" value={neutral} />
                 <StatisticLine text="bad" value={bad} />
                 <StatisticLine text="all" value={all} />
                 {isNaN(average) ? <p>average 0</p> : <StatisticLine text="average" value={average} /> }
                 {all === 0 ? <p>positive 0 %</p> : <StatisticLine text="positive" value={positive} /> }
             </div>
        }
         </>
     )
}


const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [totalClicks, setTotalClicks] = useState(0);

    let all = good + bad + neutral;
    let average = (good - bad) / (totalClicks);
    let positive = (good / all) * 100;


    const handleClick = (text) => {
        setTotalClicks(totalClicks + 1);
        if(text === 'good') {
            setGood(good + 1);
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
                <Statistics good={good}
                            neutral={neutral}
                            bad={bad}
                            all={all}
                            average={average}
                            totalClicks={totalClicks}
                            positive={positive}
                />
            </div>
        </div>
    )
}

export default App