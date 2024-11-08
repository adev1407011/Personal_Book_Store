import React from "react";
import toast, { Toaster } from 'react-hot-toast';
import Home from "./Home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Collectionbook from "./Collection/Collectionbook";
import Signup from "./Components/Signup";
import { useAuth } from "./Context/Authuprovider";
import AdminPanel from "./AdminPanel";
import EditBook from "./Components/EditBook";
import DeleteBook from "./Components/DeleteBook";

function App (){
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return(
    <>
    
    <div className="dark:bg-slate-900 dark:text-white">
      <Routes>
        <Route path="/" element={<Home/>}/>
        {/*<Route path="/collection" element={authUser ? <Collectionbook /> : <Navigate to="/signup" />}/>*/}
        <Route path="/admin" element={<AdminPanel />} /> {/* Add this line */}
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/edit" element={<EditBook />} /> 
        <Route path="/delete" element={<DeleteBook/>} />
        <Route path="/collection" element={<Collectionbook />}/>
      </Routes>
      <Toaster />
    </div>
    </>
  )
}

export default App;