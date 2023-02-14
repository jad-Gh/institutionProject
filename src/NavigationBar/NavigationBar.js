import { Container, Navbar } from "react-bootstrap";
import logo from "../Assets/mdsl_logo_cropped.png";


const NavigationBar = ()=>{
    return (
        
           <Navbar className="mb-2">
                <Container>
                    <Navbar.Brand href="/institution">
                        <img src={logo} alt="logo" width={"90px"} height={"30px"}/>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <div className="logout-btn">
                            Logout
                        </div>
                    </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        
    )
}

export default NavigationBar;