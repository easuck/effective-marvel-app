import {FC} from "react";
import Header from "../header/Header.tsx";
import Footer from "../footer/Footer.tsx";
import {Outlet} from "react-router-dom";
import styles from "./styles.module.css"
import {ToastContainer} from "react-toastify";

const Layout: FC = () =>{
    return (
        <div className={styles.content}>
            <Header/>
            <Outlet/>
            <Footer/>
            <ToastContainer/>
        </div>
    )
}

export default Layout;