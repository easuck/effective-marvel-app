import {FC} from "react";
import Header from "./header/Header.tsx";
import Footer from "./footer/Footer.tsx";
import {Outlet} from "react-router-dom";

const Layout: FC = () =>{
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout;