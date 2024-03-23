import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export default function({ blog }: {blog: Blog}){
    return(
        <div>
            <Appbar />
            <div className="grid grid-cols-12 px-10 w-full pt-12">
                <div className=" col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 py-4">
                        Posted on January 2, 2024
                    </div>
                    <div className="text-slate-800">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div>
                        Author
                    </div>
                    <div className="flex items-center pt-4">
                        <div>
                            <Avatar name={`${blog.author.name}`} size="big"/>
                        </div>
                        <div className="pl-5">
                            <div className=" font-bold text-2xl">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-3">
                                Detail of author about interest/education/expertise. What kind of blog.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}