import React from 'react';
import Header from "./header";
import Loader from "../loader";

const Layout = ({children,isLoading=false}) => {
    return (

        <div style={{width:'100%'}}>
            <Header/>
            <div className="app-container">
                {isLoading?<Loader/>:children}
            </div>

        </div>
    );
};

export default Layout;
