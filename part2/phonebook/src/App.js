import React, { useState } from 'react'

const Filter = (props) => <div>filter shown with <input value={props.filter} onChange={props.handleFilterChange}/></div>;

const PersonForm =(props) => {
  return (
    <form onSubmit={props.handleSubmit}>
        <div>name: <input value={props.newName} onChange={props.handleNameChange}/></div>
        <div>number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Numbers = ({persons}) => {
  return (
  <table>
    <tbody>
      {persons.map((person) => (
        <Person key={person.name} name={person.name} number={person.number}/>
      ))}
    </tbody>
  </table>
)}

const Person = ({name, number}) => {
  return (<tr>
    <td>{name}</td>
    <td>{number}</td>
  </tr>
)}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] =useState('')
  const [ filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let exists = false;

    persons.forEach((element) => {
      const person = element.name.toLowerCase();
      if (person === newName.toLowerCase()) {
        exists = true;
      }
    });
    
    if (exists) {
      alert(`${newName} is already added to the phonebook`)} 
    else if (newName.length===0 || newNumber.length===0) {
      alert('Do not leave any field empty')} 
    else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
  
      setPersons([...persons, newPerson]);
    }
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} filter={filter}/>
      <h3>add a new person</h3>
      <PersonForm newName={newName} newNumber={newNumber} 
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit}/>
      <h3>Numbers</h3>
      {filter.length===0 
      ? <Numbers persons={persons}/>
      : <Numbers persons={persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))}/>}
    </div>
  )
}

export default App