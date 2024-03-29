import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"
import { useNavigate } from "react-router-dom"

export const Blogs = () => {
    const navigate = useNavigate();
    const {loading, blogs} = useBlogs();

    if(!blogs){
        navigate("/");
    }

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
                            publishDate="12 March 2024"
                        />
                    )}
                </div>
            </div>
        </div>
    )
}