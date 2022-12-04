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

    const [userBackground, setUserBackground] = useState(false)

    const [newUserData, setNewUserData] = useState({ id: props.userData.id, name: props.userData.name, email: props.userData.email })

    async function getTodosAndPosts() {

        setUserBackground(!userBackground)

        setShowTasks(!showTasks)

        let resp = await axios.get("https://jsonplaceholder.typicode.com/todos/?userId=" + props.userData.id)
        setTodos(resp.data)

        setShowPosts(!showPosts)

        resp = await axios.get("https://jsonplaceholder.typicode.com/posts/?userId=" + props.userData.id)
        setPosts(resp.data)
    }

    const getOtherData = () => {
        setShowOtherData(!showOtherData)
    }

    const markCompleted = (id) => {

        let arr = todos;
        arr.find(x => x.id === id).completed = true
        setTodos(arr)

        setAllCompleted(arr.every(v => v.completed === true))
    }


    return <div>


        <div style={{
            border: allCompleted ? "1px solid green" : "1px solid red",
            background: userBackground ? "#ff7733" : "",
            padding: "10px",
            width: "30%"
        }}>
            <span onClick={getTodosAndPosts}><u>ID:</u>{props.userData.id}</span><br /><br />
            <u>Name:</u> <input type="text" onfocus="this.value=''" value={newUserData.name}
                onChange={e => setNewUserData({ ...newUserData, name: e.target.value })} /><br /><br />

            <u>Email:</u> <input type="text" value={newUserData.email}
                onChange={e => setNewUserData({ ...newUserData, email: e.target.value })} /><br /><br />

            <input type="button" value="Other data" onMouseOver={getOtherData} />&ensp; &ensp;

            <input type="button" value="Update" style={{ background: "orange" }}
                onClick={() => props.callback(newUserData)} />&ensp;

            <input type="button" value="Delete" style={{ background: "orange" }}
                onClick={() => props.deleteCallBack(newUserData.id)} /><br /><br />

            {/* -------- Show Other data ---- */}
            {
                showOtherData &&
                <div style=

                    {{
                        width: "290px",
                        height: "70px",
                        padding: "5px",
                        borderRadius: "25px",
                        border: "1px solid black"
                    }}

                >


                    <span style={{ padding: "10px" }}> <u>Street:</u></span>  &ensp;&ensp;<input type="text" value={props.userData.address.street} /><br />
                    <span style={{ padding: "10px" }}> <u>City:</u></span> &ensp; &emsp;<input type="text" value={props.userData.address.city} /><br />
                    <span style={{ padding: "10px" }}> <u>Zipcode:</u></span>  <input type="text" value={props.userData.address.zipcode} /><br />

                </div>

            }
        </div>

        {/* -------- Show Posts ---- */}
        <div style={{
            padding: "10px", width: "30%", float: "right"
        }}>
            {
                showPosts && <h3> post user {props.userData.id}</h3> && <br /> &&
                <PostsComp posts={posts} postsCallback={setPosts} userId={props.userData.id} />
            }
        </div>

        {/* -------- Show Tasks \ Todos ---- */}

        <div style={{ padding: "10px", width: "30%", float: "right" }}>
            {
                showTasks && <h3> task user {props.userData.id}</h3> && <br /> &&
                <TodosComp callback={markCompleted} tasks={todos} todosCallback={setTodos} userId={props.userData.id} />
            }
        </div>




    </div >

}

export default UserComp;