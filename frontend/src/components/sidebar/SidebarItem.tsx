/**
 * Component to display sidebar items
 */
import { Link } from "react-router-dom";

export default function SidebarItem(props:Readonly<{link: string, icon: string, text: string}>){
    return <Link to={props.link} className="sidebar-item">
        <span className="material-icons sidebar-item-icon">
            {props.icon}
        </span>
        <span className="sidebar-item-text">
            {props.text}
        </span>
    </Link>
}
