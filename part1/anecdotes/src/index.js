import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
const Title = ({text}) => <h1>{text}</h1>

const Votes = (props) => {
  //setMax here, so it updates instantly in the UI
  props.setMax(props.points.indexOf(Math.max(...props.points)))
  return <p>has {props.points[props.selected]} votes</p>}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [max, setMax] = useState(anecdotes.length)

  const handleClickVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const handleClickNext = () => setSelected(Math.floor(Math.random() * anecdotes.length));
  

  return (
    <div>
      <Title text="Anecdote of the day" />
      {props.anecdotes[selected]}
      <Votes selected={selected} points={points} max={max} setMax={setMax}/>
      <p>
        <button onClick={handleClickVote}>Vote</button>
        <button onClick={handleClickNext}>Next anecdote</button>
      </p>
      <Title text="Anecdote with most votes"/>
      {points[max] === 0
      ? <p>No anecdote has been rated</p>
      : <div>
      {props.anecdotes[max]}
      <p>has {points[max]} points</p>
      </div>}
    </div>
  )
}


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)