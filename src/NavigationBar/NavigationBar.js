import axios from "axios";
import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CONFIG, SIGNOUT } from "../API";
import logo from "../Assets/mdsl_logo_cropped.png";


const NavigationBar = ()=>{

    const navigator = useNavigate();

    const logout = ()=>{
        CONFIG.headers.Authorization = "Bearer " + localStorage.getItem("token");
        axios.post(SIGNOUT,{},CONFIG)
        .then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            localStorage.clear();
            navigator("/");
        })
    }

    return (
           <Navbar className="mb-2">
                <Container>
                    <Navbar.Brand href="/institution">
                        <img src={logo} alt="logo" width={"90px"} height={"30px"}/>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <div className="logout-btn" onClick={logout}>
                            Logout
                        </div>
                    </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        
    )
}

export default NavigationBar;