import React, { useContext } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import gif from "./loading.gif";
import { LoadingContext } from "./LoadingContext";


export default function Layout() {
    const { loading } = useContext(LoadingContext);

    return (
        <main>
            <Header />
            {loading && <div className="loading"> <img src={gif} alt="Loading..." /></div>}
            <Outlet />
        </main>
    );
}
