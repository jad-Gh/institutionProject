import { Button, Col, Container, Row } from "react-bootstrap"


const AddInstitution = (props)=>{
    return (

        <Container>
            <Row>
                <h3>Add Institution</h3>
            </Row>
            <Row className="d-flex justify-content-end">
                <Col md="6">
                    <Row className="d-flex">
                        <Col>
                            <Button variant="secondary" onClick={()=>{props.toggleAddInstitution()}} className="w-100">
                                Cancel
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="primary" className="w-100">
                                Add
                            </Button> 
                        </Col>
                    </Row>
                </Col>
                
            </Row>
        </Container>
    )
}

export default AddInstitution