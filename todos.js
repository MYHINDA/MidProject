import { useState } from "react";

function TodosComp(props) {

    const [isNotCompleted, setIsNotCompleted] = useState(true)

    const [todo, setTodo] = useState({ title: "", completed: false })

    const [isAddTodo, setIsAddTodo] = useState(false)

    const markComplete = (id) => {
        props.callback(id)
        setIsNotCompleted(!isNotCompleted)
    }

    const addTodo = () => {
        if (todo.title !== "") {
            props.todosCallback([...props.tasks, todo])
            setIsAddTodo(false)
            setTodo({ title: "", completed: false })
        }

    }

    return <div>
        Todos - User {props.userId}:   <input type="button" value="Add" onClick={() => setIsAddTodo(true)} style={{ float: "right" }} /><br /><br />
        <div style={{ border: "1px solid black", padding: "10px" }}>
        {
            !isAddTodo && props.tasks.map(item => {
                return <div key={item.id} style={{margin:"10px", width: "90%", padding: "10px", border: "1px solid black" }}>
                    <u>Title:</u> {item.title} <br />
                    <u>Completed:</u> {item.completed ? "True" : "False"} &ensp;&ensp;
                    {
                        !item.completed && <input type="button" value="Mark Completed"
                        onClick={() => markComplete(item.id)} style={{ backgroundColor: "orange" }} />
                    }

                </div>
            })
        }
        {
            isAddTodo && <div>
                <u>Todo:</u><input type={"text"} onChange={e => setTodo({ ...todo, title: e.target.value })} /><br />
                <input type="button" value="Cancel" onClick={() => setIsAddTodo(false)} style={{float:"right"}} /> 
                <input type="button" value="Add" onClick={() => addTodo()} style={{ float: "right" }} />&emsp;&emsp;
            </div>
        }

        </div>
        </div>
}

export default TodosComp;