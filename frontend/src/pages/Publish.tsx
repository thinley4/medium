import { useState, useEffect } from "react"
import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle]= useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    // useEffect( () => {

    //     axios.get(`${BACKEND_URL}:3000/api/v1/blog`, {
    //         headers: {
    //             'Authorization': `${localStorage.getItem("token")}`
    //         }
    //     }).catch((e) => {
    //         navigate("/");
    //     })

    // }, [])

    return (
        <div>
            <Appbar />
            <div className="flex justify-center pt-10">
                <div className="w-9/12">
                    <input onChange={(e)=> {
                        setTitle(e.target.value)
                    }} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" required />
                    
                    <textarea onChange={(e) => {
                        setContent(e.target.value)
                    }} id="message" rows={8} className="mt-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    
                    <button onClick={async() => {
                        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                            title,
                            content
                        }, {
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        });
                        navigate(`/blog/${response.data.id}`)
                    }} type="button" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Publish</button>
                </div>
            </div>
        </div>
    )
}