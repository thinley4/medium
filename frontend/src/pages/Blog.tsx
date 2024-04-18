import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import FullBlog from "../components/FullBlog";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { Appbar } from "../components/Appbar";
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

// atomFamilies/selector Families
export default function(){
    const navigate = useNavigate();
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });
    
    useEffect( () => {

        axios.get(`${BACKEND_URL}/api/v1/blog`, {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        }).catch((e) => {
            navigate("/");
        })

    }, [])

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