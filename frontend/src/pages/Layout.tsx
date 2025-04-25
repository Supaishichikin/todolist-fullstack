import React from "react"
import Sidebar from "../components/sidebar/Sidebar"
import "../components/css/Layout.css"

export default function Layout({children}: LayoutProps){
    return <>
        <Sidebar />
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