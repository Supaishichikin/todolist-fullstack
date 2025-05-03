import { Form, FormGroup, FormControl, FormLabel, Button, FormText } from "react-bootstrap";
import { useAuth } from "../../contexts/authContextProvider";
import { useNavigate } from "react-router-dom";
import { UserRegister } from "../../services/AuthServices";


export default function AuthForm(props:Readonly<{email?: string, setEmail?: Function, setUsername?: Function,
        password?: string, setPassword?: Function, login?: boolean, username?:string}>){
    const auth = useAuth();
    const navigate = useNavigate();

    return <Form>
            <FormGroup>
                {!props.login && <>
                    <FormLabel>Email</FormLabel>
                    <FormControl onChange={(e) => props.setEmail?.(e.target.value)}
                    type="email" placeholder="Email" />
                </>}
                <FormLabel>Username</FormLabel>
                <FormControl onChange={(e) => props.setUsername?.(e.target.value)} 
                type="text" placeholder="Username" />
                
                <FormLabel>Password</FormLabel>
                <FormControl onChange={(e) => props.setPassword?.(e.target.value)} 
                type="password" placeholder="Password" /> 

                <Button onClick={() => {
                    if(props.login){
                        auth?.login(props.username, props.password).then(()=> navigate('/'))
                    }else{
                        UserRegister(props.email??"", props.password??"", props.username??"")
                        .then(() => {
                            auth?.login(props.username, props.password).then(() => navigate('/'));
                        })
                    }
                }} className="w-100 my-3">
                    {props.login ? "Sign in" : "Sign up"}
                </Button>
            </FormGroup>
            <div className="text-center">
                or continue with
            </div>
            <Button variant="secondary" className="w-100 my-3">Google</Button>
            <div className="d-flex justify-content-center">
                <FormText className="text-center w-75">
                    By clicking continue, you agree to our Terms of Service and Privacy Policy
                </FormText>
            </div>
        </Form>
}
