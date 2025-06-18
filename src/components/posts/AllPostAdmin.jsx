import { useEffect, useState } from "react"
import { GetAllPosts } from "../../managers/PostManager"


export const AllPostAdmin = () => {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        GetAllPosts().then(data => {
        console.log("Fetched posts:", data)
        setPosts(data)
        })
    }, [])

    return (
        <div>
            <h2>Posts</h2>
            {posts?.map((post)=>(
                <div key={post.id} className="post-card">
                    <h3>{post.title}</h3>
                    <p></p>
                </div>
            ))}
        </div>
    )
}