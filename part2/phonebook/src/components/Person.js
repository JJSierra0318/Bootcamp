import React from "react"

const Person = ({id, name, number, handleClickDelete}) => {

    return (<tr>
      <td>{name}</td>
      <td>{number}</td>
      <td><button onClick={handleClickDelete}>delete</button></td>
    </tr>
  )}

  export default Person