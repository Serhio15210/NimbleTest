import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/home/page";
import ContactPage from "../pages/contact/page";
import React from "react";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/contact/:id",
        element: <ContactPage/>
    },
]);
