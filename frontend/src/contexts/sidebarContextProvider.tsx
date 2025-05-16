/**
 * Context provider to handle page display according to the state of the side bar
 */
import { useContext, useEffect, useMemo, useState } from "react";
import SidebarContext from "./sidebarContext";
import { SidebarContextProviderInterface } from "../types/styleAndLayout";

export const SidebarContextProvider: React.FC<SidebarContextProviderInterface> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1280) {
              setSidebarOpen(false);
            } else if (window.innerWidth > 1280) {
              setSidebarOpen(true);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
    }, []);

    return <SidebarContext.Provider value={useMemo(() => ({
        sidebarOpen,
        setSidebarOpen
    }), [sidebarOpen])}>
        {children}
    </SidebarContext.Provider>
}

export const useSidebar = () => {
    return useContext(SidebarContext);
}