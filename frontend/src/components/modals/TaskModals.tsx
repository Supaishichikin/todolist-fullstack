import { Form, Modal, Button } from "react-bootstrap";
import { UpdateTodo } from "../../types";
import { useState } from "react";

export default function TaskModals(props:{new:boolean, show:boolean, setShow:Function, id?:string, values?:UpdateTodo}){
    const [title, setTitle] = useState(props.values?.title??"");
    const [description, setDescription] = useState(props.values?.description??"");
    const [to_complete_at, setToCompleteAt] = useState(props.values?.to_complete_at?
    props.values?.to_complete_at.toISOString().split('T')[0]:new Date().toISOString().split('T')[0]);
    const [completed, setCompleted] = useState(props.values?.completed??false);

    return <>
        <Modal show={props.show} onHide={() => props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{props.new ? "New Task" : "Update Task"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="to_complete_at">
                        <Form.Label>To complete at</Form.Label>
                        <Form.Control type="date" 
                        value={to_complete_at}
                        onChange={(e) => setToCompleteAt(e.target.value)    } />
                    </Form.Group>
                    {!props.new &&
                    <Form.Group className="mb-3" controlId="completed">
                        <Form.Label>Completed</Form.Label>
                        <Form.Check type="checkbox" label="Completed"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)} />
                    </Form.Group>
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.setShow(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => props.setShow(false)}>Save</Button>
            </Modal.Footer>
        </Modal>
    </>
}
