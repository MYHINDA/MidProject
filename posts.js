import { useState } from "react";


function PostsComp(props) {

    const [post, setPost] = useState({ title: "", body: "" })
    
    const [isAddPost, setIsAddPost] = useState(false)

    const addPost = () => {
        props.postsCallback([...props.posts, post])
        setIsAddPost(false)
    }

    return <div>

        Posts:   <input type="button" value="Add" onClick={()=>setIsAddPost(true)}/>
        {
            props.posts.map((item,index)=>{
                return <div key={index} style={{padding:"1px", border:"1px solid black", width:"80%"}}>
                    Title:<input type="text" value={item.title} /><br />
                    Body:<input type="text" value={item.body} /><br />
            </div>
            })
        }
        {
            isAddPost && <div>
                Title: <input type="text" onChange={e => setPost({ ...post, title: e.target.value })} /><br /><br />
                Body:  <input type="text" onChange={e => setPost({ ...post, body: e.target.value })} /><br /><br />

                <input type="button" value={"Cancel"} onClick={() => setIsAddPost(false)} />
                <input type="button" value={"Add"} onClick={() => addPost()} />
            </div>
        }
    </div>
}

export default PostsComp;