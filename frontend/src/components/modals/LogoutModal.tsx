import { Button, Modal } from "react-bootstrap";
import { useAuth } from "../../contexts/authContextProvider";

export default function LogoutModal(props:Readonly<{open:boolean, setOpen:Function}>){
    const auth = useAuth();
    return <Modal show={props.open} onHide={() => props.setOpen(false)}>
            <Modal.Header>
                <Modal.Title>Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to logout?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.setOpen(false)}>Cancel</Button>
                <Button variant="danger" onClick={() => {
                    auth?.logout(auth.userRefreshToken);
                }}>Logout</Button>
            </Modal.Footer>
        </Modal>
}
