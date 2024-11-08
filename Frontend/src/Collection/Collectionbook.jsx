import React from "react";
import Navbar from "../Components/Navbar";
import Bookcollection from "../Components/Bookcollection";
import Footer from "../Components/Footer";

function Collectionbook (){
  return(
    <>
    <div>
      <Navbar/>
      <div className="min-h-screen">
      <Bookcollection/>
      </div>
      <Footer/>
    </div>
    </>
  )
}

export default Collectionbook ;
 