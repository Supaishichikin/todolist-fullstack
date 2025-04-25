import { Modal, Button } from "react-bootstrap";
import { UpdateTodo } from "../../types";
import FormTodo from "../form/FormTodo";

export default function TaskModals(props:{new:boolean, show:boolean, setShow:Function, id?:string, values?:UpdateTodo}){
    return <>
        <Modal show={props.show} onHide={() => props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{props.new ? "New Task" : "Update Task"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormTodo new={props.new} values={props.values??
                {title:"", description:"", to_complete_at:new Date(), completed:false}} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.setShow(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => props.setShow(false)}>Save</Button>
            </Modal.Footer>
        </Modal>
    </>
}
