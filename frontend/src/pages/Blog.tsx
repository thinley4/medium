import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import FullBlog from "../components/FullBlog";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { Appbar } from "../components/Appbar";

// atomFamilies/selector Families
export default function(){
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });

    if(loading || !blog) {
        return (
            <div>
                <Appbar />
                <div className="p-5">
                    <BlogSkeleton />    
                </div>
            </div>
        )
    }
    return(
        <div>
            <FullBlog blog={blog} />
        </div>
    )
}