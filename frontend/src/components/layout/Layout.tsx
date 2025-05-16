/**
 * Component to handle main behavior of page display
 */

import React from "react";
import Sidebar from "../sidebar/Sidebar";
import { SidebarContextProvider } from "../../contexts/sidebarContextProvider";
import "../../css/Layout.css";

export default function Layout({children}: Readonly<LayoutProps>){
    return <>
        <SidebarContextProvider>
            <Sidebar />
        </SidebarContextProvider>
        <LayoutContent>
            {children}
        </LayoutContent>
    </>
}

interface LayoutProps {
    children: React.ReactNode;
}

const LayoutContent: React.FC<LayoutProps> = ({children}) => {
    return <div className="main-content">
        {children}
    </div>
}