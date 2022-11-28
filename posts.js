

function PostsComp(props) {

    return <div>
        {
            props.posts.map((item,index)=>{
                return <div key={index} style={{padding:"1px", border:"1px solid black", width:"80%"}}>
                    Title:<input type="text" value={item.title} /><br />
                    Body:<input type="text" value={item.body} /><br />
            </div>
            })
        }
    </div>
}

export default PostsComp;