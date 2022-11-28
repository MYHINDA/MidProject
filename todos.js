import { useState } from "react";

function TodosComp(props) {

    const [isNotCompleted, setIsNotCompleted] = useState(true)

    const markComplete = (id) => {
        props.callback(id)
        setIsNotCompleted(!isNotCompleted)
    }

    return <div style={{ border: "1px solid black", padding: "10px" }}>
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

    </div>
}

export default TodosComp;