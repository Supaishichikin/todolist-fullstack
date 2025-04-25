import { Form, FormGroup, FormControl, FormLabel, Button, FormText } from "react-bootstrap";

export default function AuthForm(props: {email?: string, setEmail?: Function,
        password?: string, setPassword?: Function, login?: boolean}){
    return <>
        <Form>
            <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormControl type="email" placeholder="Email" />
                
                <FormLabel>Password</FormLabel>
                <FormControl type="password" placeholder="Password" /> 

                <Button className="w-100 my-3" type="submit">{props.login ? "Sign in" : "Sign up"}</Button>
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
    </>
}
