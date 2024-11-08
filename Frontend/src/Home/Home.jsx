import React from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Booklist from "../Components/Booklist";
import Footer from "../Components/Footer";

function Home (){
  return(
    <>
    <div>
      <Navbar/>
      <Banner/>
      <Booklist/>
      <Footer/>
    </div>
    </>
  )
}

export default Home;