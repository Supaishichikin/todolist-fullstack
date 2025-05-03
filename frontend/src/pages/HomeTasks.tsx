import { Container } from "react-bootstrap";
import "../css/Home.css";
import TaskCard from "../components/cards/TaskCard";
import TaskModals from "../components/modals/TaskModals";
import { useEffect, useState } from "react";
import { Priority, Status, Task } from "../types/tasks";
import { getTasks } from "../services/TaskServices";

export default function HomeTasks() {
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [tasks, setTasks] = useState([] as Task[])

    useEffect(() => {
        getTasks().then((response) =>{
            setTasks(response)
        })
    },[])

    useEffect(()=>{
        if(tasks){
            if(tasks.length > 0){
                console.log(tasks)
            }
        }
    }, [tasks])

    return <Container className="home-container">
        <h1 className="text-center mt-5 task-title">Tasks</h1>
        <div className="task-container">
            <div className="task-column-container">
                <div className="d-flex justify-content-between align-items-center">
                    <h3>To Do</h3>
                    <button tabIndex={0} onClick={() => setShowTaskModal(true)}
                    className="material-icons task-add-icon">
                        add_circle_outline
                    </button>
                </div>
                <div className="task-column py-2">
                    <TaskCard id="1" values={{ title:"Task 1", description:"Description 1",
                    to_complete_at:new Date('2025-04-25T10:30:00'), priority:Priority.Low, status:Status.Todo}} />
                    <TaskCard id="2" values={{ title:"Task 2", description:"Description 2",
                    to_complete_at:new Date('2025-04-25T11:30:00'), priority:Priority.Medium, status:Status.Todo}} />
                    <TaskCard id="3" values={{ title:"Task 3", description:"Description 3",
                    to_complete_at:new Date('2025-04-25T12:30:00'), priority:Priority.High, status:Status.Todo}} />
                </div>
            </div>
            <div className="task-column-container">
                <h3>Done</h3>
                <div className="task-column">
                    
                </div>
            </div>
            <TaskModals new={true} show={showTaskModal} setShow={setShowTaskModal} />
        </div>
    </Container>;
}