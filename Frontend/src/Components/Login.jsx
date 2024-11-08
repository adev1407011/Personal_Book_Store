import React from "react";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

function Login (){
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    await axios
      .post("http://localhost:4001/users/login", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Loggedin Successfully");
          document.getElementById("my_modal_3").close();
          setTimeout(() => {
            window.location.reload();
            localStorage.setItem("Users", JSON.stringify(res.data.user));
          }, 1000);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
          setTimeout(() => {}, 2000);
        }
      });
  };
  return(
    <>
    <dialog id="my_modal_3" className="modal">
    <div className="modal-box dark:bg-slate-900 dark:border" >
    <form onSubmit={handleSubmit(onSubmit)} method="">
    {/* if there is a button in form, it will close the modal */}
    <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
    onClick={() => document.getElementById("my_modal_3").close()}>✕</Link>
    
    <h3 className="font-bold text-lg">Login</h3>
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
        <button type="submit" className="bg-purple-300 px-3 py-1 hover:bg-purple-400 rounded-md dark:bg-violet-500 dark:hover:bg-violet-600">Login</button>
        {/* <p> */}
            {/* Not registered? <Link to="/signup" className="underline text-violet-500 cursor-pointer">Signup</Link>
        </p> */}
    </div>
    </form>
    </div>
    </dialog>
    </>
  )
}

export default Login;