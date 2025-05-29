import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <div className="flex flex-col min-h-screen">
    //       <Navbar />
    //     </div>
       
    //     <Route path="/" element={<Home />} />
    //   </Routes>
    // </BrowserRouter>
    <>
    <Navbar />
    </>
  );
}

export default App;
