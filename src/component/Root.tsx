import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";


export default function Root() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
