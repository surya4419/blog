//import React from 'react'
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom"
import { SignupType } from "@23951a67h1/medium-common";
import axios from "axios";
import {BACKEND_URL} from "../../config"
import { useNavigate } from "react-router-dom";

const Auth = ({ type }: {type:"signup" | "signin"}) => {

    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupType>({
        name:"",
        email:"",
        password: ""
    })
    
    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs")
        }catch(e){
            alert("Error while signing up")
        }
    }

  return (
    <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                <div className="text-3xl font-extrabold">
                    Create an account
                </div>
                <div className="text-slate-400">
                    {type === "signin"?"dont have an account" :"Already have an account?"}
                    <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>{type === "signin" ? "/signup" : "/signin"}</Link>
                 </div>
            </div>
            <div className="pt-8">
            {type === "signup"? <LabelledInput label="name" placeholder="name.." onChange={(e)=> {
                    setPostInputs ({
                        ...postInputs,
                        name: e.target.value
                    })
            }}/> : null }

            <LabelledInput label="email" placeholder="email.." onChange={(e)=> {
                                setPostInputs({
                                    ...postInputs,
                                    email: e.target.value
                                })
                        }}/>   

            <LabelledInput label="password" placeholder="password.."  type={"password"} onChange={(e)=> {
                                setPostInputs ({
                                    ...postInputs,
                                    password: e.target.value
                                })
                        }}/>   
             <button onClick={sendRequest} type="button" className="text-gray-900 mt-8 bg-white border w-full border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">{type == "signin"? "signin":"signup"}</button> 
             </div>
                        </div>     
            </div>
      
    </div>
  )
}

interface LabelledInputType{
    label: string;
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?:string;
}

function LabelledInput({label,placeholder,type,onChange}: LabelledInputType){
    return <div>
         <div>
            <label  className="block mb-2 text-sm  text-black font-semibold pt-4 ">{label}</label>
            <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    </div>
}

export default Auth
