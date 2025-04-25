import { Button, Offcanvas } from "react-bootstrap";
import SidebarItem from "./SidebarItem";
import "../css/Sidebar.css";

export default function Sidebar(){
    return <>
        <Offcanvas className="sidebar" show={true} backdrop={false} >
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
                        <SidebarItem link="/" icon="home" text="Home" />
                        <SidebarItem link="/settings" icon="settings" text="Account settings" />
                        <SidebarItem link="/achievements" icon="emoji_events" text="Achievements" />
                    </div>
                </Offcanvas.Body>
            </div>
            <div className="d-flex justify-content-start">
                <span className="material-icons text-black power-settings-icon">
                    power_settings_new
                </span>
            </div>
        </Offcanvas>
    </>
}
