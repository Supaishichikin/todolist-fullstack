import { Container } from "react-bootstrap"
import { useEffect, useState } from "react"
import AuthForm from "../../components/form/AuthForm"
import { useAuth } from "../../contexts/authContextProvider"
import { useNavigate } from "react-router-dom"


export default function Register(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("");

    // If the user is authenticated we want him to be redirected to homepage
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // redirection to homepage if user is authenticated
        if(auth?.isAuthenticated){
            navigate('/tasks')
        }
    },[auth])

    return <Container className="mt-5 d-flex flex-column align-items-center">
        <h1 className="text-center">Tasks</h1>
        <div className="d-flex justify-content-center flex-column align-items-center mt-5 mb-3">
            <h2>Register</h2>
            <h3 className="mt-3">Create an account to get started</h3>
        </div>
        <AuthForm email={email} setEmail={setEmail} username={username} setUsername={setUsername} 
        login={false} password={password} setPassword={setPassword} />
    </Container>
}
