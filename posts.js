import { useState } from "react";


function PostsComp(props) {

    const [post, setPost] = useState({ title: "", body: "" })

    const [isAddPost, setIsAddPost] = useState(false)

    const addPost = () => {
        if (post.title !== "" && post.body !== "") {
            props.postsCallback([...props.posts, post])
            setIsAddPost(false)
            setPost({ title: "", body: "" })
        }



    }

    return <div >

        Posts - User {props.userId}: <input type="button" value="Add" onClick={() => setIsAddPost(true)} style={{ float: "right" }} /><br /><br />
        <div style={{border:"1px solid black",padding: "10px"}}>
            {
                props.posts.map((item, index) => {
                    return <div key={index} style={{ padding: "10px", width: "94%", border: "1px solid black" }}>
                        <u>Title:</u>  {item.title} <br /><br />
                        <u>Body:</u>  {item.body}  <br />
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
        <br /><br />
    </div>
}

export default PostsComp;