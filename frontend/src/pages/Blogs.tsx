import { useEffect } from "react";
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Blogs = () => {
    const navigate = useNavigate();
    const {loading, blogs} = useBlogs();
    const date = new Date().toLocaleDateString();

    useEffect( () => {

        axios.get(`${BACKEND_URL}/api/v1/blog`, {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        }).catch((e) => {
            navigate("/");
        })
    })

    if(loading){
        return(
            <div>
                <Appbar />
                <div className="flex justify-center">
                    <div>
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <div>
            <div>
                <Appbar />
            </div>
            <div className="flex justify-center">
                <div>
                    {blogs.map((b)=> 
                        <BlogCard 
                            id={b.id}
                            authorName={b.author.name || "Thinley"}
                            title={b.title}
                            content={b.content}
                            publishDate={date}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}