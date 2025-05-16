/**
 * Creation and Update tasks modal component
 */

import { Modal, Button } from "react-bootstrap";
import { Priority, Status, UpdateTask } from "../../types/tasks";
import FormTodo from "../form/FormTask";

export default function TaskModals(props:Readonly<{new:boolean, show:boolean, setShow:Function, id?:string, values?:UpdateTask}>){
    const defaultValues: UpdateTask = {
        title: "",
        description: "",
        to_complete_at: new Date(),
        priority: Priority.Low,
        status: Status.Todo
    };

    return <Modal show={props.show} onHide={() => props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{props.new ? "New Task" : "Update Task"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormTodo new={props.new} values={props.values ?? defaultValues} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.setShow(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => props.setShow(false)}>Save</Button>
            </Modal.Footer>
        </Modal>
}
