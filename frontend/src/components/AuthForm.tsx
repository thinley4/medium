import { SignupInput } from "@thinley/medium-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios, { AxiosError } from 'axios';
import { BACKEND_URL } from "../config";


export default function({type}: {type: "signup" | "signin"}) {
    const navigate = useNavigate();
    const [postInput, setPostInput] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type=='signup' ? "signup" : "signin"}`, postInput);
            const jwt = response?.data?.token;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch(e) {
            //alert
            const error = e as AxiosError
            alert(error?.response?.data)          
        }
    }

    return(
        <div className="flex justify-center items-center h-screen">
            <div>
                <div className="flex justify-center">
                    <div className="text-center px-11">
                        <div className="font-bold text-3xl">
                            {type == "signup" ? "Create an account" : "Sign in"}
                        </div>
                        <div className="text-gray-400">
                            {type == "signup" ? "Already have an account?" : "Don't have account?"}
                            
                            <Link className="underline" to={type=="signup" ?"/signin" : "/"}>{type == "signup" ? "Login" : "Create"}</Link>
                        </div>
                    </div>
                </div>
                <div className="pt-6">
                    {type=='signup' ?
                        <LabelledInput type="text" label="Name:" placeholder="Thinley..." onChange={(e)=> {
                            setPostInput({
                                ...postInput,
                                name: e.target.value
                            })
                        }}/> : null}
                        <LabelledInput type="email" label="Email:" placeholder="Thinley@gmail.com..." onChange={(e)=> {
                            setPostInput({
                                ...postInput,
                                email: e.target.value
                            })
                        }}/>
                        <LabelledInput type="password" label="Password:" placeholder="....." onChange={(e)=> {
                            setPostInput({
                                ...postInput,
                                password: e.target.value
                            })
                        }}/>
                </div>
                <button onClick={sendRequest} type="button" className="w-full mt-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                    {type == 'signup' ? "Sign up" : "Sign in"}
                </button>
            </div>
        </div>
    )
}
interface LabelledInputType{
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type: string
}

function LabelledInput({label, placeholder, onChange, type}: LabelledInputType){
    return(
        <div>
            <label className="block mb-2 text-sm font-medium pt-4">{label}</label>
            <input onChange={onChange} type={type} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    )
}