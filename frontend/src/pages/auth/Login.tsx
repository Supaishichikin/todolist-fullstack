import { Container } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useAuth } from "../../contexts/authContextProvider"
import AuthForm from "../../components/form/AuthForm"
import { useNavigate } from "react-router-dom"
export default function Login(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

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
            <h2>Log in</h2>
            <h3 className="mt-3">Enter your email and password to log in</h3>
        </div>
        <AuthForm  username={username} setUsername={setUsername} login={true} 
            password={password} setPassword={setPassword} />
    </Container>
}