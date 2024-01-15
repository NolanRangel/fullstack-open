import { useState } from 'react'


const Anecdote = ({ anecdotes, selected, points, maxAnecdote, max, title }) => {

    return (
        <>
            { title === "Anecdote of the day" ?
                <div>
                    <h2>
                        {title}
                    </h2>
                    <h4>
                        {anecdotes[selected]}
                    </h4>
                    { points[selected] ?
                    <p>
                        has {points[selected]} votes
                    </p>
                    :
                    <p>
                        has 0 votes
                    </p>
                    }
                </div>
            :
                <div>
                    <h2>
                        {title}
                    </h2>
                    <p>
                        {maxAnecdote}
                    </p>
                    { max > -1 ?
                        <p>
                            has {max} votes
                        </p>
                    :
                        <p>
                            no votes cast yet
                        </p>
                    }
                </div>
            }
        </>

    )
}

const Button = ({ text, randomAnecdote, handleClick }) => {

    return (
        <>
            <button onClick={handleClick}>
                {text}
            </button>
        </>
    )
}

const App = () => {
    const [selected, setSelected] = useState(0)

    const [maxes, setMaxes] = useState({
        max: -1,
        maxAnecdote: '',
    })

    const [points, setPoints] = useState({
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
    })

    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]


    const handleVote = () => {

        const newPoints = {
            ...points,
            [selected]: points[selected] += 1
        }
        setPoints(newPoints);

        for(const point in points) {
            if (points[point] <= 0) {
                continue
            } else if (points[point] > maxes.max) {
                const newMax = {
                    ...maxes,
                    max: points[point],
                    maxAnecdote: anecdotes[point],
                }
                setMaxes(newMax);
            }
        }
    }

    const randomAnecdote = () => {
        let anecdoteLength = anecdotes.length;

        setSelected(Math.floor(Math.random() * anecdoteLength))
    };


    return (
        <div>
            <div>
                <Anecdote anecdotes={anecdotes} selected={selected} points={points} title={"Anecdote of the day"}/>
                <div style={{display: "flex", gap: "20px"}}>
                    <Button text={"vote"} handleClick={handleVote}/>
                    <Button text={"next anecdote"} handleClick={randomAnecdote}/>
                </div>
            </div>
            <hr/>
            <div>
                <Anecdote anecdotes={anecdotes} points={points} maxAnecdote={maxes.maxAnecdote} max={maxes.max} title={"Anecdote with most votes"}/>
            </div>
        </div>
    )
}

export default App