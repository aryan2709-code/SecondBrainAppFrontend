import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordref = useRef<HTMLInputElement>(null);
    const [message , setMessage ] = useState("");
    const[error , setErrors]  = useState("");
    const[loading , setLoading] = useState(false);
    const navigate = useNavigate();
    
    async function signin() {
        try{
            setLoading(true);
            const username = usernameRef.current?.value;
            const password = passwordref.current?.value;
            if(!username || !password)
            {
                setErrors("Enter both username and password")
                return;
            }
            
           const response =   await axios.post(BACKEND_URL + "/api/v1/signin" , {
                    username,
                    password
            })
            const jwt = response.data.token;
            localStorage.setItem("token" , jwt);


            // Handle successful signup
            setMessage("User Signed In Successfully");
            setErrors("");
    
            // Clear inputs
            if(usernameRef.current) usernameRef.current.value = "";
            if(passwordref.current) passwordref.current.value = "";

            //redirect the user to the dashboard
            navigate("/dashboard");
    
        }catch(err:any){
                // handle different error responses
                if(err.response)
                {
                    switch(err.response.status)
                    {
                        case 403 : 
                        setErrors("Wrong Username or Password");
                        break;
                        default:
                        setErrors(err.response.data.message || "Something Went wrong")
                    }
                }else{
                    setErrors("Network error occured")
                }
                setMessage("");
            }finally{
              setLoading(false);
            }   
    }
    
    return <div className="h-screen w-full bg-gray-900 flex flex-col justify-center items-center">
        <div className="text-3xl font-mono text-white font-extrabold m-8 ">SIGN IN TO ACCESS YOUR SECOND BRAIN</div>
        <div className=" rounded border w-72 flex flex-col justify-center items-center pt-2 bg-gray-800">

        {error.length>0 && ( 
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 w-full">
            <ul className="list-disc pl-4">
                {
                        <li>{error}</li>
                }
            </ul>
             </div>
        )} 

{message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 w-full">
                    {message}
                </div>}



            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordref} placeholder="Password" />
            <div className="flex justify-center m-2" >
            <Button onClick={signin} variant="primary" text="SignIn" loading = {loading}/>   
            </div>
            
        </div>
    </div>
}