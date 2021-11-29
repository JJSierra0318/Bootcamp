import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({text}) => <h1>{text}</h1>

const Button = ({text, handleClick}) => <button onClick={handleClick}>
    {text}
  </button>

const Statistics = ({text, value}) => {
  return <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title text="give feedback" />
      <Button text="good" handleClick={() => setGood(good + 1)}/>
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" handleClick={() => setBad(bad + 1)}/>
      <Title text="statistics" />
      { good + neutral + bad === 0 ?
        (<p>No feedback given</p>)
      : (<table>
          <tbody>
          <Statistics text="good" value={good}/>
          <Statistics text="neutral" value={neutral}/>
          <Statistics text="bad" value={bad}/>
          <Statistics text="all" value={good + neutral + bad}/>
          <Statistics text="average" value={(good - bad) / (good + neutral + bad)}/>
          <Statistics text="positive" value={good / (good + neutral + bad) * 100 + "%"}/>
          </tbody>
        </table>)}
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)