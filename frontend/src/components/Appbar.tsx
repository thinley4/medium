import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return(
        <div className="flex justify-between border-b-2 px-10 py-5">
            <Link to={"/blogs"}>
                <div>
                    Medium
                </div>
            </Link>
            <div>
                <Link to={"/publish"}>
                    <button type="button" className="mr-10 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Post</button>
                </Link>
                <Link to={"/"}>
                    <Avatar name="T" size="big" />
                </Link>
            </div>
        </div>
    )
}