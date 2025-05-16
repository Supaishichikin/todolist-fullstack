/**
 * Sidebar main component
 */

import { Offcanvas } from "react-bootstrap";
import SidebarItem from "./SidebarItem";
import "../../css/Sidebar.css";
import LogoutModal from "../modals/LogoutModal";
import { useState } from "react";
import { useSidebar } from "../../contexts/sidebarContextProvider";

export default function Sidebar(){
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const sidebar = useSidebar();

    return <Offcanvas className="sidebar" show={sidebar?.sidebarOpen??true} backdrop={false} >
                <div>
                    <Offcanvas.Header>
                        <Offcanvas.Title>
                            <div className="user-initials d-flex text-white
                            justify-content-center align-items-center">
                                <span className="user-initials-text">J</span>
                            </div>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className="sidebar-content">
                            <SidebarItem link="/tasks" icon="home" text="Home" />
                            <SidebarItem link="/settings" icon="settings" text="Account settings" />
                            <SidebarItem link="/achievements" icon="emoji_events" text="Achievements" />
                        </div>
                    </Offcanvas.Body>
                </div>
                <div className="d-flex justify-content-start">
                    <button onClick={() => setShowLogoutModal(true)}
                    className="material-icons text-black power-settings-icon">
                        power_settings_new
                    </button>
                </div>
                <LogoutModal open={showLogoutModal} setOpen={setShowLogoutModal} />
            </Offcanvas>
}
