import { useParams } from "react-router-dom";
import { useBlog, useCheck } from "../hooks"
import FullBlog from "../components/FullBlog";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { Appbar } from "../components/Appbar";
import { useNavigate } from "react-router-dom"

// atomFamilies/selector Families
export default function(){
    const navigate = useNavigate();
    const { id } = useParams();
    const {currStatus} = useCheck();
    const {loading, blog} = useBlog({
        id: id || ""
    });

    // checking token
    if(!currStatus) {
        navigate('/');
    }

    if(loading) {
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