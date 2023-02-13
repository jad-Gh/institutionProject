import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/mdsl_logo.png";


const Login = ()=>{

    const [state,setState] = useState({
        username:"",
        password:"",
        error:"something went wrong",
        loading:false,
    });
    const navigate = useNavigate();

    const signIn = ()=>{
        setState({...state,loading:true})
        navigate("/institution")
    }

    return (
        <div className="login">
            <Container >
                <Col>
                    <Row>
                        <Col>
                            <img src={logo} alt="logo" width={"260px"} height={"100px"}/>
                        </Col>
                    </Row>  
                    <Row>
                        <Col>
                            <Card className="p-3">
                                <Card.Title>
                                    Login
                                </Card.Title>
                                <Row>
                                    <Col className="">
                                        Enter Your Login Details to Access Your Account 
                                    </Col>
                                </Row>
                                <Row className="dynamic-spacing">
                                    <Row>
                                        <Col className="text-start">
                                            Username
                                        </Col>
                                    </Row>
                                    <Form.Control 
                                    type="text" 
                                    placeholder="Username" 
                                    className="my-2" 
                                    value={state.username}
                                    maxLength={80}
                                    onChange={(e)=>{
                                        setState({...state,username:e.target.value})
                                    }}
                                    />

                                    <Row>
                                        <Col className="text-start mt-2">
                                            Password
                                        </Col>
                                    </Row>
                                    <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    className="my-2 mb-4" 
                                    value={state.password}
                                    maxLength={80}
                                    onChange={(e)=>{
                                        setState({...state,password:e.target.value})
                                    }}
                                    />

                                    <Row>
                                        <Col className="text-danger">
                                            {state.error}
                                        </Col>
                                    </Row>

                                    <Button 
                                    className="mt-3" 
                                    disabled={!state.username || !state.password  || state.loading}
                                    onClick={()=>{signIn()}}
                                    >
                                        Login
                                    </Button>
                                </Row>   
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Container>
        </div>
    )
}

export default Login;