import { Link } from "react-router-dom"

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishDate: string,
    id: string
}

export const BlogCard = ({authorName, title, content, publishDate, id}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="border-b-2 p-4 cursor-pointer">
                <div className="flex items-center">
                    <Avatar name={authorName} size="small"/><div className="pl-2">{authorName} . </div>
                    <div className="text-sm text-gray-500">{publishDate}</div>
                </div>
                <div className="font-bold text-xl pt-2">
                    {title}
                </div>
                <div className="text-md pt-2 max-w-4xl">
                    {content.slice(0, 150) + "..."}
                </div>
                <div className="text-sm text-gray-500 pt-5">
                    {`${Math.ceil(content.length / 100)} min read`}
                </div>
            </div>
        </Link>
    )
}

export function Avatar ({ name, size }: {name: string, size: string}) {
    return(
        <div className={`relative inline-flex items-center justify-center ${size == "small" ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-gray-500 rounded-full`}>
            <span className={`${size == "small" ? "text-xs": "text-md"} text-white`}>{name[0]}</span>
        </div>
    )
}