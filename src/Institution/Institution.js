import { Search } from "@material-ui/icons";
import MaterialTable from "material-table";
import { useState } from "react";
import { Button, Col, Container, Form, Modal, Navbar, Row } from "react-bootstrap";
import Select from "react-select";
import logo from "../Assets/mdsl_logo_cropped.png";
import NavigationBar from "../NavigationBar/NavigationBar";
import AddInstitution from "./AddInstitution";



const Institution = ()=>{

    const [state,setState] = useState({
        loading:false,
        deleteModalOpen:false,
        addInstitution:false,
        editInstituion:false,
    });

    const toggleDeleteModal = ()=>{
        setState({...state,deleteModalOpen:!state.deleteModalOpen});
    }

    const toggleAddInstitution = ()=>{
        setState({...state,addInstitution:!state.addInstitution});
    }

    return (
        <div>
           <NavigationBar/>
           {!state.addInstitution && !state.editInstituion && <Container >
                <Row>
                    <Col sm="4" className="p-2">
                        <Select
                            className="basic-single "
                            classNamePrefix="select"
                            placeholder="Select an Institution..."
                            // isDisabled={isDisabled}
                            // isLoading={isLoading}
                            isClearable={true}
                            // isRtl={isRtl}
                            isSearchable={true}
                            // name="color"
                            options={[{label:"hi",value:"hi"}]}
                        />
                    </Col>
                    <Col sm="8" className="p-2">
                        <Row >
                            <Col className="d-flex justify-content-end">
                                <Button 
                                className="add-btn"
                                onClick={()=>{toggleAddInstitution()}}
                                >
                                    + Add
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <MaterialTable
                        columns={[
                            { title: 'Name', field: 'name' },
                            { title: 'Surname', field: 'surname' },
                            { title: 'Birth Year', field: 'birthYear', },
                            {title: "Status", field:"status"}
                        ]}
                        data={[
                            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63,
                            status:  
                            <Form.Check 
                            type="switch"
                            id="custom-switch1"
                            label="Active"
                            />
                        
                        },
                            { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
                        ]}        
                        actions={[
                            {
                                icon: "edit",
                                tooltip: 'Edit',
                                onClick: (event, rowData) => alert("You saved " + rowData.name)
                            },
                            {
                                icon: "delete" ,
                                tooltip: 'Delete',
                                onClick: (event, rowData) => {toggleDeleteModal()}
                            }
                        ]}
                        options={{
                            search:false,
                            actionsColumnIndex:6,
                            showTitle:false,
                            pageSize:10,
                            pageSizeOptions:[],

                        }}
                        />
                </Row>
           </Container>}

           {state.addInstitution && <AddInstitution toggleAddInstitution={toggleAddInstitution}/>}


           <Modal
            show={state.deleteModalOpen}
            onHide={toggleDeleteModal}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete Institution
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <p>
                        Are you sure you want to delete this institution?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleDeleteModal}>
                        Close
                    </Button>
                    <Button variant="primary">Delete</Button>
                </Modal.Footer>
                
            </Modal>
        </div>
    )
}

export default Institution;