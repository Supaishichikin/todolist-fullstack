/**
 * Interfaces for Layout and style related objects
 */

export interface SidebarContextInterface{
    sidebarOpen: boolean,
    setSidebarOpen: Function
}

export interface SidebarContextProviderInterface{
    children: React.ReactNode
}
