import logo from './logo.svg';
import './App.css';
import axios from "axios"
import React, {useEffect, useState} from 'react';
import Student from './Student';


function App() {
  const [nameFilter, setNameFilter] = useState("")
  const [tagFilter, setTagFilter] = useState("")
  const [students, setStudents] = useState([])
  const [filteredStudents, setFilteredStudents] = useState([])


  useEffect( () => {
    async function getDataAndAddTagProperty() {
      const {data} = await axios.get("https://api.hatchways.io/assessment/students")
      let students = data.students
      let studentsWithTag = students.map(student => {student.tags = ["t", "ta", "tag"]; return student})
      setStudents(studentsWithTag)}
    getDataAndAddTagProperty()
  }, [])



  useEffect(() => {
    if (nameFilter !== "" && tagFilter === "") {
      let filteredStudents = students.filter(student => (student.firstName + student.lastName).toLowerCase().includes(nameFilter.toLowerCase()))
      setFilteredStudents(filteredStudents)
    } 
    else if (nameFilter === "" && tagFilter !== "") {
      let filteredStudents = students.filter(student => (student.tags.includes(tagFilter.toLowerCase())))
      setFilteredStudents(filteredStudents)
    }
    else if (nameFilter !== "" && tagFilter !== "") {
      let filteredStudents = students.filter(student => ((student.firstName + student.lastName).toLowerCase().includes(nameFilter.toLowerCase())) && (student.tags.includes(tagFilter.toLowerCase())))
      setFilteredStudents(filteredStudents)
    }
    else {setFilteredStudents(students)}
  }, [students, nameFilter, tagFilter])

  return (
    <div className="App">
      <input type="text" placeholder={"Search by name"} value={nameFilter} onChange={(event)=>{setNameFilter(event.target.value)}}/>
      <input type="text" placeholder={"Search by tag"} value={tagFilter} onChange={(event)=>{setTagFilter(event.target.value)}}/>  
      {students.length !==0 ? 
        <div>
          {filteredStudents.length !==0 ?
          (<div> 
            {filteredStudents.map(student => (<Student data={student} key={student.id} setStudents={setStudents} students={students}> </Student>))}   
           </div>)
          : <div> <p> No matching </p>  </div>
          }
        </div>
        : <div> <p> Loading </p>  </div>}
    </div>
  );
}

export default App;
