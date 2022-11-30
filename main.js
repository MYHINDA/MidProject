import { useEffect, useState } from "react";
import axios from 'axios'

import UserComp from "./user";


function MainComp() {

    const [users, setUsers] = useState([])
    const [user, setUser] = useState({id:11, name:"", email:""})
    const [isAddUser, setIsAddUser] = useState(false)
    const [query, setQuery] = useState("")
    
    function addUser() {
        setUser({ ...user, id: user.id + 1 })
        setIsAddUser(false)
        setUsers([...users, user])
    }
    useEffect(() => {
        getUsers();
        
    }, [])

    async function getUsers() {
        let resp = await axios.get("https://jsonplaceholder.typicode.com/users")
        setUsers(resp.data)
    }

    async function updateUserLocal(user) {
        
        let arr = users
        arr.find(x => x.id === user.id).name = user.name
        arr.find(x => x.id === user.id).email = user.email
        setUsers(arr)
        await axios.put("https://jsonplaceholder.typicode.com/users/" + user.id, user)
        alert("updated")
    }

    async function deleteUserLocal(id) {
        let arr = users
        
        setUsers(arr.filter(x => x.id !== id))
        await axios.delete("https://jsonplaceholder.typicode.com/users/" + id)
        alert("deleted")
    }
    
    

    return <div style={{padding:"10px"}}>
        search
        <input type="text" onChange={(e) => setQuery(e.target.value)} />
        <input type="button" value="Add" onClick={()=>setIsAddUser(true)} /><br/>
        
        {
            users.filter(item => {
                if (query === '') {
                    return item;
                } else if (item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
                    (item.email.toLocaleLowerCase().includes(query.toLocaleLowerCase()))) {
                    return item;
                }
            }).map(item => { 
                return <div key={item.id}>
                    <UserComp userData={item} callback={updateUserLocal} deleteCallBack={deleteUserLocal} /><br/>
                    </div> 
                    })
        }
        {
            isAddUser && <div border="1">
                Name: <input type={"text"} onChange={e => setUser({ ...user, name: e.target.value })} />
                Email: <input type={"text"} onChange={e => setUser({ ...user, email: e.target.value })} />
                <input type="button" value={"add"} onClick={()=>addUser()} />
            </div>
        }
    </div>
}

export default MainComp;
