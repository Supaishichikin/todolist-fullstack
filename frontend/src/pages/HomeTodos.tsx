import { Container } from "react-bootstrap";
import "../components/css/Home.css";
import TaskCard from "../components/cards/TaskCard";

export default function HomeTodos() {
    return <Container className="home-container">
        <h1 className="text-center mt-5 todo-title">Todo</h1>
        <div className="todo-container">
            <div className="todo-column-container">
                <div className="d-flex justify-content-between align-items-center">
                    <h3>To Do</h3>
                    <span className="material-icons todo-add-icon">
                        add_circle_outline
                    </span>
                </div>
                <div className="todo-column py-2">
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                </div>
            </div>
            <div className="todo-column-container">
                <h3>Done</h3>
                <div className="todo-column">
                    
                </div>
            </div>
        </div>
    </Container>;
}