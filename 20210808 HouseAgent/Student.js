import React, {useState} from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';



export default function Student({data, setStudents, students}) {
    let {city, company, email, firstName, grades, id, lastName, pic, skill, tags} = data

    const [display, setDisplay] = useState(-1)
    const [newTag, setNewTag] = useState("")

    console.log(display)
    function toggleDisplay() {
        setDisplay(prev => prev * -1)
    }

    function addTag(e) {
        e.preventDefault()
        let studentsCopy = [...students]
        let index = studentsCopy.findIndex(element => element.id === id)
        studentsCopy[index].tags.push(newTag.toLowerCase())
        setNewTag("")
        setStudents(studentsCopy)
    }

    return (
        <div className = "Student row">
            <div className="column1"> 
                <img src={pic}></img> <br/>
            </div>
            <div className="column2"> 
                <p className="name"> <b> {(firstName + " " + lastName).toUpperCase()} </b>  </p> 
                <div className="info">
                    Email: {email} <br/>
                    Company: {company} <br/>
                    Skill: {skill} <br/>
                    Average: {((grades.reduce((cumulative, element) => {return cumulative + parseInt(element)}, 0))/grades.length) + "%"}
                    <br/>
                    <br/>
                    {display === 1 ? 
                         grades.map((grade, index) => 
                         (<div className="grade" key={index + grade}> 
                             <span>{`Test ${index + 1}`}</span>     
                             <span>{`${grade}%`}</span>
                         </div>)
                        )
                     :null} 
                    {
                     tags.length >3 ? tags.map((tag, index) => 
                     {if (index >2) {return (<button className="taglist" key={index + tag}> 
                         {tag.toLowerCase()}
                     </button>)}}
                    ):null    
                    }
                    <form onSubmit={e=> addTag(e)}>
                        <input type="text" className="tag" placeholder={"Add a tag"} value={newTag} onChange={(event)=>{setNewTag(event.target.value)}}/>
                    </form>
                </div>         
            </div>
            <div className="column3"> 
                <button onClick={(event)=>{toggleDisplay()}}>
                    {display === -1? <AiOutlinePlus className="icon"> </AiOutlinePlus> : <AiOutlineMinus className="icon"> </AiOutlineMinus> }
                </button> 
            </div>
        </div>
    )
}
