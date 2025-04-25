import { Container } from "react-bootstrap"
import { useState } from "react"
import AuthForm from "../components/form/AuthForm"
export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return <Container className="mt-5 d-flex flex-column align-items-center">
        <h1 className="text-center">Todo</h1>
        <div className="d-flex justify-content-center flex-column align-items-center mt-5 mb-3">
            <h2>Log in</h2>
            <h3 className="mt-3">Enter your email and password to log in</h3>
        </div>
        <AuthForm email={email} setEmail={setEmail} login={true} 
            password={password} setPassword={setPassword} />
    </Container>
}