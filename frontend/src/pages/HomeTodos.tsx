import { Container } from "react-bootstrap";
import "../components/css/Home.css";
import TaskCard from "../components/cards/TaskCard";
import TaskModals from "../components/modals/TaskModals";
import { useState } from "react";

export default function HomeTodos() {
    const [showTaskModal, setShowTaskModal] = useState(false);

    return <Container className="home-container">
        <h1 className="text-center mt-5 todo-title">Todo</h1>
        <div className="todo-container">
            <div className="todo-column-container">
                <div className="d-flex justify-content-between align-items-center">
                    <h3>To Do</h3>
                    <span onClick={() => setShowTaskModal(true)} className="material-icons todo-add-icon">
                        add_circle_outline
                    </span>
                </div>
                <div className="todo-column py-2">
                    <TaskCard id="1" values={{ title:"Task 1", description:"Description 1",
                    to_complete_at:new Date('2025-04-25T10:30:00'), completed:false}} />
                    <TaskCard id="2" values={{ title:"Task 2", description:"Description 2",
                    to_complete_at:new Date('2025-04-25T11:30:00'), completed:false}} />
                    <TaskCard id="3" values={{ title:"Task 3", description:"Description 3",
                    to_complete_at:new Date('2025-04-25T12:30:00'), completed:false}} />
                </div>
            </div>
            <div className="todo-column-container">
                <h3>Done</h3>
                <div className="todo-column">
                    
                </div>
            </div>
            <TaskModals new={true} show={showTaskModal} setShow={setShowTaskModal} />
        </div>
    </Container>;
}