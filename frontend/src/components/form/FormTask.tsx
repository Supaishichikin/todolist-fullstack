/**
 * Component to handle cretation/update tasks form
 */
import { Form} from "react-bootstrap"
import { UpdateTask, Status, Priority } from "../../types/tasks"
import { useState } from "react";

export default function FormTask(props:Readonly<{new:boolean, values:UpdateTask}>){

    const [title, setTitle] = useState(props.values?.title??"");
    const [description, setDescription] = useState(props.values?.description??"");
    const [toCompleteAt, setToCompleteAt] = useState(props.values?.to_complete_at?
    props.values?.to_complete_at.toISOString().split('T')[0]:new Date().toISOString().split('T')[0]);
    const [status, setStatus] = useState(props.values?.status??Status.Todo);
    const [priority, setPriority] = useState(props.values?.priority??Priority.Low);

    return <Form>
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
                value={toCompleteAt}
                onChange={(e) => setToCompleteAt(e.target.value)    } />
            </Form.Group>
            <Form.Group className="mb-3" controlId="priority">
                <Form.Label>Priority</Form.Label>
                <Form.Control as="select" value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}>
                    {Object.values(Priority).map((priority) => (
                        <option key={priority} value={priority}>{priority}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            {!props.new &&
            <Form.Group className="mb-3" controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" value={status}
                onChange={(e) => setStatus(e.target.value as Status)}>
                    {Object.values(Status).map((status) => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            }
        </Form>
}