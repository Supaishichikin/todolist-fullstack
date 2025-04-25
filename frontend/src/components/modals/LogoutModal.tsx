import { Button, Modal } from "react-bootstrap";

export default function LogoutModal(props:{open:boolean, setOpen:Function}){
    return <>
        <Modal show={props.open} onHide={() => props.setOpen(false)}>
            <Modal.Header>
                <Modal.Title>Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to logout?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.setOpen(false)}>Cancel</Button>
                <Button variant="danger" onClick={() => props.setOpen(false)}>Logout</Button>
            </Modal.Footer>
        </Modal>
    </>
}
