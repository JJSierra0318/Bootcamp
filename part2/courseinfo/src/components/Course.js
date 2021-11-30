const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const total = course.parts.reduce((previous, current) =>
      previous + current.exercises, 0)
      return <p><strong>total of {total} exercises</strong></p>
  }
  
  const Part = ({name, exercises}) => {
    return (
      <p>
        {name} {exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    const parts = course.parts;
    return (
      <div>
        {parts.map((part) => (
          <Part key = {part.id} name = {part.name} exercises = {part.exercises}/>
        ))}
      </div>
    ) 
  }
  
  const Course = ({courses}) => {
    return (
      <div>
        {courses.map((course) => (
        <div key = {course.id}>
          <Header course = {course}/>
          <Content course = {course}/>
          <Total course = {course}/>
        </div>
      ))}
      </div>
    )
  }

  export default Course