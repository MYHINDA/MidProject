import { useEffect, useState } from "react";
import axios from 'axios'
import UserComp from "./user";

function MainComp() {

    const [users, setUsers] = useState([])
    
    useEffect(() => {
        getUsers();
    }, [])

    async function getUsers() {
        let resp = await axios.get("https://jsonplaceholder.typicode.com/users")
        setUsers(resp.data)
    }

    return <div style={{padding:"10px"}}>
        search
        <input type="text" />
        <input type="button" value="Add"  /><br/>
        
        {
            users.map(item => { 
                return <div key={item.id}>
                    <UserComp userData={item}/><br/>
                    </div> 
                    })
        }  
    </div>
}

export default MainComp;
