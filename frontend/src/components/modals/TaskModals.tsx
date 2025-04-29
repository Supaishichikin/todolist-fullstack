import { Modal, Button } from "react-bootstrap";
import { Priority, Status, UpdateTodo } from "../../types";
import FormTodo from "../form/FormTodo";

export default function TaskModals(props:{new:boolean, show:boolean, setShow:Function, id?:string, values?:UpdateTodo}){
    const defaultValues: UpdateTodo = {
        title: "",
        description: "",
        to_complete_at: new Date(),
        priority: Priority.Low,
        status: Status.Todo
    };

    return <>
        <Modal show={props.show} onHide={() => props.setShow(false)}>
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
    </>
}
