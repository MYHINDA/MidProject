import axios from "axios";
import { useState } from "react";
import PostsComp from "./posts";
import TodosComp from "./todos";


function UserComp(props) {

    const [showTasks, setShowTasks] = useState(false)

    const [showPosts, setShowPosts] = useState(false)

    const [showOtherData, setShowOtherData] = useState(false)

    const [todos, setTodos] = useState([])

    const [posts, setPosts] = useState([])

    const [allCompleted, setAllCompleted] = useState(false)
    
    const [newUserData, setNewUserData] = useState({ id: props.userData.id, name: props.userData.name, email:props.userData.email})

    async function getTodosAndPosts() {

        setShowTasks(!showTasks)

        let resp = await axios.get("https://jsonplaceholder.typicode.com/todos/?userId=" + props.userData.id)
        setTodos(resp.data)

        setShowPosts(!showPosts)

        resp = await axios.get("https://jsonplaceholder.typicode.com/posts/?userId=" + props.userData.id)
        setPosts(resp.data)
    }
    const deleteUser = () => {
        axios.delete("https://jsonplaceholder.typicode.com/users/" + props.userData.id)
    }
    const getOtherData = () => {
        setShowOtherData(!showOtherData)
    }    
    const markCompleted = (id) => {
        let arr = todos;
        arr.find(x => x.id === id).completed = true
        setTodos(arr)

        setAllCompleted(arr.every(v=>v.completed===true))
    }
    
    
        return <div>
        
    
        <div style={{ border: allCompleted ? "1px solid green" : "1px solid red", padding: "10px", width: "50%", float: "left" }}>
        <span onClick={getTodosAndPosts}>ID:{props.userData.id}</span><br /><br />
            Name: <input type="text" onfocus="this.value=''" value={newUserData.name}
                onChange={e => setNewUserData({ ...newUserData, name: e.target.value })} /><br /><br />
        
            Email: <input type="text" value={newUserData.email}
                onChange={e => setNewUserData({ ...newUserData, email: e.target.value })} /><br /><br />
        
        <input type="button" value="Other data" onMouseOver={getOtherData} style={{ mergin: "18px" }} />
        
        <input type="button" value="Update" style={{ background: "orange" }}
                onClick={() => props.callback(newUserData)} />
            
        <input type="button" value="Delete" style={{ background: "orange" }}
                    onClick={() => props.deleteCallBack(newUserData.id)} />
</div>
        <div style={{ padding: "10px", width: "30%", float: "right" }}>
            {
                showPosts && <h3> post user {props.userData.id}</h3> && <br /> &&
                <PostsComp posts={posts} />                
            }
        </div>
        <div style={{ padding: "10px", width: "30%", float: "right" }}>
            {
                showTasks && <h3> task user {props.userData.id}</h3> && <br /> &&
                <TodosComp callback={markCompleted} tasks={todos} />
            }
        </div>
        {
            showOtherData &&
            <div style={{ width: "320px", padding: "5px", borderRadius: "25px", border: "1px solid black" }}>
                    <span style={{padding:"16px"}}> street:</span> <input type="text" value={props.userData.address.street} /><br />
                    <span style={{ padding: "23px" }}> city:</span> <input type="text" value={props.userData.address.city} /><br />
                    <span style={{padding:"4px"}}> zipcode:</span> <input type="text" value={props.userData.address.zipcode} /><br />

            </div>

        }

    
    </div>
    
}

export default UserComp;