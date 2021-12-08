import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Form from './components/Form'
import Person from './components/Person'
import AddedNotification from './components/AddedNotification'
import ErrorNotification from './components/ErrorNotification'



const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] =useState('')
  const [ filter, setFilter] = useState('')
  const [ addedMessage, setAddedMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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
    let id = '';

    persons.forEach((element) => {
      const person = element.name.toLowerCase();
      if (person === newName.toLowerCase()) {
        exists = true;
        console.log(element.id)
        id = element.id;
      }
    });
    
    if (exists) {
      if (window.confirm(`${newName} is already added to the phonebook, replace de old number with a new one`)){
        const newPerson = {
          name: newName,
          number: newNumber,
        }

        personService
          .update(id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id===id ? returnedPerson : person))
          })
      }}

    else if (newName.length===0 || newNumber.length===0) {
      alert('Do not leave any field empty')} 
    else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
  
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          
        })

      setAddedMessage(`Added ${newName}`)
      setTimeout(() => {
        setAddedMessage(null)
      }, 5000)
    }
    setNewName('');
    setNewNumber('');
  }

  const handleClickDelete = (id, name) => {

    if (window.confirm(`Delete ${name}`)){
      const personFilter = persons.filter((person) => person.id !== id)
      personService
        .remove(id)
        .then(() => {
          setPersons(personFilter)
        })
        .catch(error => {
          setErrorMessage(`${name} was already removed from the server`)
          setTimeout(() => {
            setErrorMessage(null)
            setPersons(personFilter)
          }, 5000)
        })
    }}

  return (
    <div>
      <h2>Phonebook</h2>
      <AddedNotification message={addedMessage}/>
      <ErrorNotification message={errorMessage}/>
      <Filter handleFilterChange={handleFilterChange} filter={filter}/>
      <h3>add a new person</h3>
      <Form newName={newName} newNumber={newNumber} 
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit}/>
      <h3>Numbers</h3>
      <table>
        <tbody>
        {persons.map((person) => {
          if (person.name.toLowerCase().includes(filter.toLowerCase())) {
            return <Person key={person.id} id={person.id} name={person.name} number={person.number} handleClickDelete={() => {handleClickDelete(person.id, person.name)}}/>
          }
          return undefined
        })}
      </tbody>
    </table>
    </div>
  )
}

export default App