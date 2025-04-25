import { Button, Offcanvas } from "react-bootstrap"
import "./Sidebar.css"

export default function Sidebar(){
    return <>
        <Offcanvas className="sidebar" show={true} >
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
                        <div className="sidebar-item">
                            <span className="material-icons sidebar-item-icon">
                                home
                            </span>
                            <span className="sidebar-item-text">
                                Home
                            </span>
                        </div>
                        <div className="sidebar-item">
                            <span className="material-icons sidebar-item-icon">
                                settings
                            </span>
                            <span className="sidebar-item-text">
                                Account settings
                            </span>
                        </div>
                        <div className="sidebar-item">
                            <span className="material-icons sidebar-item-icon">
                                emoji_events
                            </span>
                            <span className="sidebar-item-text">
                                Achievements
                            </span>
                        </div>
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
