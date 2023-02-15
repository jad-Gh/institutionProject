import { Search } from "@material-ui/icons";
import axios from "axios";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Navbar, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import { CONFIG, DELETE_INSTITUTION, GET_ACTIVE_INSTITUTIONS, GET_INSTITUTIONS } from "../API";
import logo from "../Assets/mdsl_logo_cropped.png";
import NavigationBar from "../NavigationBar/NavigationBar";
import AddInstitution from "./AddInstitution";



const Institution = ()=>{

    const [state,setState] = useState({
        loading:false,
        dropdownLoading:false,
        tableLoading:false,
        deleteModalOpen:false,
        addInstitution:false,
        editInstituion:false,
        activeInstitutions:[],
        tableData:[],

        instNameToDelete:null,
        instIdToDelete:null,
    });

    const navigator = useNavigate();

    const toggleDeleteModal = (row)=>{
        setState({...state,deleteModalOpen:!state.deleteModalOpen,instIdToDelete:row?.instId,instNameToDelete:row?.instName});
    }

    const toggleAddInstitution = ()=>{
        setState({...state,addInstitution:!state.addInstitution});
    }

    const getActiveInstitutions = ()=>{
        setState({...state,dropdownLoading:true})

        CONFIG.headers.Authorization = "Bearer " + localStorage.getItem("token");
        axios.get(GET_ACTIVE_INSTITUTIONS,CONFIG)
        .then((res)=>{
            setState({
                ...state,
                dropdownLoading:false,
                activeInstitutions:res?.data?.map((item)=>{
                    return {
                        label:item?.instName,
                        value:item?.instId
                    }
                })
            })
        }).catch((err)=>{
            if (err?.response?.status===401){
                localStorage.clear();
                navigator("/")
            }else {
                toast.error(err?.response?.data?.message ?? "Error Occured Fetching Active Institutions")
                setState({...state,dropdownLoading:false,})
            }
        })
    }

    const getAllInstitutions = ()=>{
        setState({...state,tableLoading:true})

        CONFIG.headers.Authorization = "Bearer " + localStorage.getItem("token");
        axios.get(GET_INSTITUTIONS,CONFIG)
        .then((res)=>{
            setState({
                ...state,
                tableLoading:false,
                tableData:res?.data?.map((item,index)=>{
                    return {
                       ...item,
                       enabled:<Form.Check 
                                type="switch"
                                id={`custom-switch${index}`}
                                label={item?.instStatus==="1" ? "Enabled" : "Disabled"}
                                checked={item?.instStatus==="1"}
                                onClick={()=>{}}
                                disabled={state.loading}
                                />
                    }
                })
            })
        }).catch((err)=>{
            if (err?.response?.status===401){
                localStorage.clear();
                navigator("/")
            }else {
                toast.error(err?.response?.data?.message ?? "Error Occured Fetching Table Institutions")
                setState({...state,tableLoading:false,})
            }
        })
    }

    const deleteInstitution = ()=>{
        setState({...state,loading:true})

        CONFIG.headers.Authorization = "Bearer " + localStorage.getItem("token");
        axios.delete(`${DELETE_INSTITUTION}/${state.instIdToDelete}`,CONFIG)
        .then((res)=>{
            // setState({
            //     ...state,
            //    loading:false,
            //    deleteModalOpen:false,
            //    instIdToDelete:null,
            //    instNameToDelete:null
            // })
            toggleDeleteModal()
            toast.success("Institution Deleted Successfully")
            getAllInstitutions();
            getActiveInstitutions();
        }).catch((err)=>{
            if (err?.response?.status===401){
                localStorage.clear();
                navigator("/")
            }else {
                if (err?.response?.data?.errors.length > 0){
                    err?.response?.data?.errors.forEach((item)=>{
                        toast.error(item)
                    })
                } else {
                    toast.error("Error Occured Deleting Institution")
                }
                setState({...state,loading:false,})
            }
        })
    }

    useEffect(()=>{
        getActiveInstitutions();
        getAllInstitutions();
    },[])

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
                            options={state.activeInstitutions}
                            isLoading={state.dropdownLoading}
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
                    {state.tableLoading ?
                    <Col md="12" className="text-center">
                        Loading...
                    </Col>
                    :
                    <MaterialTable
                        columns={[
                            { title: 'Name', field: 'instName' },
                            { title: 'Code', field: 'instCode' },
                            { title: 'Status', field: 'enabled' },
                           
                        ]}
                        data={state.tableData}  
                          
                        actions={[
                            {
                                icon: "edit",
                                tooltip: 'Edit',
                                onClick: (event, rowData) => alert("You saved " + rowData.name)
                            },
                            {
                                icon: "delete" ,
                                tooltip: 'Delete',
                                onClick: (event, rowData) => {
                                    toggleDeleteModal(rowData)
                                }
                            }
                        ]}
                        options={{
                            search:false,
                            actionsColumnIndex:6,
                            showTitle:false,
                            pageSize:10,
                            pageSizeOptions:[],

                        }}
                        />}
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
                        Are you sure you want to delete institution <b>{state.instNameToDelete}</b>?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleDeleteModal}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={deleteInstitution} disabled={state.loading}>
                        Delete
                    </Button>
                </Modal.Footer>
                
            </Modal>
        </div>
    )
}

export default Institution;