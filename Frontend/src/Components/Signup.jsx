import React from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { useForm } from "react-hook-form"
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import Login from "./Login";

function Signup (){
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      
    
      const onSubmit = async (data) => {
        const userInfo = {
            fullname: data.fullname,
            email: data.email,
            password: data.password,
        };
        
        console.log(data); // Log form data
    
        try {
            const res = await axios.post("http://localhost:4001/users/signup", userInfo);
            console.log(res.data); // Log response data
    
            if (res.data) {
                toast.success("Signup Successfully");
                localStorage.setItem("Users", JSON.stringify(res.data.user)); // Ensure res.data.user is valid
                navigate(from, { replace: true });
            }
        } catch (err) {
            if (err.response) {
                console.log(err);
                toast.error("Error: " + err.response.data.message);
            }
        }
    };
    
  return(
    <>
    <div className="flex h-screen items-center justify-center">
    <div className="w-[600px]">
    <div className="modal-box dark:bg-slate-900 dark:border">
    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
    {/* if there is a button in form, it will close the modal */}
    <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
    <h3 className="font-bold text-lg">Signup</h3>
    <div className="mt-4 space-y-2">
        <span>Name</span><br/>
        <input type="text" placeholder="Enter your name" className="w-80 px-3 py-1 border rounded-md outline-none dark:bg-slate-900"
        {...register("fullname", { required: true })}></input>
        <br />
        {errors.fullname && (
        <span className="text-sm text-red-500">This field is required</span>
        )}
    </div>
    <div className="mt-4 space-y-2">
        <span>Email</span><br/>
        <input type="email" placeholder="Enter your email" className="w-80 px-3 py-1 border rounded-md outline-none dark:bg-slate-900"
        {...register("email", { required: true })}></input>
        <br />
        {errors.email && (
        <span className="text-sm text-red-500">This field is required</span>
        )}
    </div>
    <div className="mt-4 space-y-2">
        <span>Password</span><br/>
        <input type="password" placeholder="Enter your password" className="w-80 px-3 py-1 border rounded-md outline-none dark:bg-slate-900"
        {...register("password", { required: true })}></input>
        <br />
        {errors.password && (
        <span className="text-sm text-red-500">This field is required</span>
        )}
    </div>
    <div className="flex justify-around mt-4">
        <button className="bg-purple-300 px-3 py-1 hover:bg-purple-400 rounded-md dark:bg-violet-500 dark:hover:bg-violet-600" type="submit">Signup</button>
        <p className="text-xl">
            Have account? <button to="/" className="underline text-violet-500 cursor-pointer" type="sumbit" onClick={()=> document.getElementById("my_modal_3").showModal()}>
            Login
            </button>
            <Login/>
        </p>
    </div>
    </form>
    </div>
    </div>
    </div>
    </>
  )
}

export default Signup;