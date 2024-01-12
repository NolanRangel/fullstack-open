import { useState } from 'react'


const Anecdote = ({ anecdotes, selected, points }) => {

    return (
        <div>
            <h2>
                {anecdotes[selected]}
            </h2>
            <p>
                has {points[selected]} votes
            </p>
        </div>
    )
}

const Button = ({ text, randomAnecdote, handleVote }) => {

    return (
        <>
            { text === "next anecdote" ?
                <button onClick={() => randomAnecdote()}>
                    {text}
                </button>
            :
                <button onClick={() => handleVote()}>
                    {text}
                </button>
            }

        </>
    )
}

const App = () => {
    const [selected, setSelected] = useState(0)
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


    const randomAnecdote = () => {
        let anecdoteLength = anecdotes.length;

        setSelected(0)
        setSelected(Math.floor(Math.random() * anecdoteLength))


        const newPoints = {
            ...points,
            [selected]: points[selected] += 1
        }
        setPoints(newPoints);


    };

    const handleVote = () => {
        const newPoints = {
            ...points,
            [selected]: points[selected] += 1
        }
        setPoints(newPoints);
    }

    console.log(points)

    return (
        <div>
            <Anecdote anecdotes={anecdotes} selected={selected} points={points}/>
            <Button text={"vote"} handleVote={handleVote}/>
            <Button text={"next anecdote"} randomAnecdote={randomAnecdote}/>
        </div>
    )
}

export default App