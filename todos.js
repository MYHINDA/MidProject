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

    return <div style={{ border: "1px solid black", padding: "10px" }}>
        Todos:   <input type="button" value="Add" onClick={() => setIsAddTodo(true)} />
        {
            props.tasks.map(item => {
                return <div key={item.id} style={{ width: "80%", padding: "10px", border: "1px solid black" }}>
                    Title:<input type="text" value={item.title} /><br />
                    Completed: <input type="text" value={item.completed} /><br />
                    {!item.completed && <input type="button" value="Mark Completed"
                        onClick={() => markComplete(item.id)} />}

                </div>
            })
        }
        {
            isAddTodo && <div>
                <input type={"text"} onChange={e => setTodo({ ...todo, title: e.target.value })} /><br />
                <input type="button" value={"Cancel"} onClick={() => setIsAddTodo(false)} /><br />
                <input type="button" value="Add" onClick={() => addTodo()} />
            </div>
        }

    </div>
}

export default TodosComp;