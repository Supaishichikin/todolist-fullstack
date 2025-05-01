import "../../css/TaskCard.css";
import TaskModals from "../modals/TaskModals";
import { useState } from "react";
import { UpdateTask } from "../../types";

export default function TaskCard(props:Readonly<{ id: string, values: UpdateTask}>){
    const [showTaskModal, setShowTaskModal] = useState(false);

    return <div className="task-card">
        <div className="task-card-header">
            <div className="d-flex justify-content-center align-items-center">
                <span className="task-card-title">{props.values.title}</span>
                <span role="button" tabIndex={0} onClick={() => setShowTaskModal(true)} 
                className="material-icons task-card-icon flex-end">
                    edit
                </span>
            </div>
        </div>
        <div className="task-card-body mt-4">
            <span className="task-card-description">
                {props.values.description}
            </span>
        </div>
        <div className="task-card-footer">
            <span className="task-card-priority">
                {props.values.priority}
            </span><br/>
            <span className="task-card-status">
                {props.values.status}
            </span>
        </div>
        <TaskModals new={false} show={showTaskModal} setShow={setShowTaskModal} 
        id={props.id} values={{title:props.values.title, description:props.values.description,
        to_complete_at:props.values.to_complete_at, priority:props.values.priority, status:props.values.status}} />
    </div>
}
