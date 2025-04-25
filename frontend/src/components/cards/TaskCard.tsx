import "../css/TaskCard.css";
import TaskModals from "../modals/TaskModals";
import { useState } from "react";

export default function TaskCard(props:{id:string, title:string, description:string, to_complete_at:Date}){
    const [showTaskModal, setShowTaskModal] = useState(false);

    return <div className="task-card">
        <div className="task-card-header">
            <div className="d-flex justify-content-center align-items-center">
                <span className="task-card-title">{props.title}</span>
                <span onClick={() => setShowTaskModal(true)} 
                className="material-icons task-card-icon flex-end">
                    edit
                </span>
            </div>
        </div>
        <div className="task-card-body mt-4">
            <span className="task-card-description">
                {props.description}
            </span>
        </div>
        <TaskModals new={false} show={showTaskModal} setShow={setShowTaskModal} 
        id={props.id} values={{title:props.title, description:props.description,
        to_complete_at:props.to_complete_at}} />
    </div>
}
