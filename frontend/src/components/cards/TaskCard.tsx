import "../css/TaskCard.css";

export default function TaskCard(){
    return <div className="task-card">
        <div className="task-card-header">
            <div className="d-flex justify-content-center align-items-center">
                <span className="task-card-title">Task Title</span>
                <span className="material-icons task-card-icon flex-end">
                    edit
                </span>
            </div>
        </div>
        <div className="task-card-body mt-4">
            <span className="task-card-description">
                Task Description
            </span>
        </div>
    </div>
}
