import { Search } from "@material-ui/icons";
import axios from "axios";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Navbar, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import { CONFIG, DELETE_INSTITUTION, GET_ACTIVE_INSTITUTIONS, GET_INSTITUTIONS,UPDATE_INSTITUTION_STATUS } from "../API";
import logo from "../Assets/mdsl_logo_cropped.png";
import NavigationBar from "../NavigationBar/NavigationBar";
import AddInstitution from "./AddInstitution";
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';



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
        setState(prevState => {
            return {...prevState,deleteModalOpen:!state.deleteModalOpen,instIdToDelete:row?.instId,instNameToDelete:row?.instName};
        });
    }

    const toggleAddInstitution = ()=>{
        setState(prevState => {
            return {...prevState,addInstitution:!state.addInstitution};
        });
    }

    const getActiveInstitutions = ()=>{
        setState(prevState => {
            return {...prevState,dropdownLoading:true};
        });

        CONFIG.headers.Authorization = "Bearer " + localStorage.getItem("token");
        axios.get(GET_ACTIVE_INSTITUTIONS,CONFIG)
        .then((res)=>{
            setState(prevState => {
                return {...prevState,
                    dropdownLoading:false,
                    activeInstitutions:res?.data?.map((item)=>{
                        return {
                            label:item?.instName,
                            value:item?.instId
                        }
                    })               
                };
            });
            
        }).catch((err)=>{
            if (err?.response?.status===401){
                localStorage.clear();
                navigator("/")
            }else {
                toast.error(err?.response?.data?.message ?? "Error Occured Fetching Active Institutions")
                setState(prevState => {
                    return {...prevState,dropdownLoading:false,};
                });
            }
        })
    }

    const getAllInstitutions = ()=>{
        setState(prevState => {
            return {...prevState,tableLoading:true};
        });

        CONFIG.headers.Authorization = "Bearer " + localStorage.getItem("token");
        axios.get(GET_INSTITUTIONS,CONFIG)
        .then((res)=>{
            setState(prevState => {
                return {...prevState,
                    dropdownLoading:true,
                    tableLoading:false,
                    tableData:res?.data?.map((item,index)=>{
                        return {
                           ...item,
                           enabled:<Form.Check 
                                    type="switch"
                                    id={`custom-switch${index}`}
                                    label={item?.instStatus==="1" ? "Enabled" : "Disabled"}
                                    checked={item?.instStatus==="1"}
                                    onClick={()=>{
                                        if (!state.loading)
                                        changeStatus(item?.instId,item?.instStatus==="1" ? "0":"1")
                                    }}
                                    disabled={state.loading}
                                    />
                        }
                    })
                };
            });
        }).catch((err)=>{
            if (err?.response?.status===401){
                localStorage.clear();
                navigator("/")
            }else {
                toast.error(err?.response?.data?.message ?? "Error Occured Fetching Table Institutions")
                setState(prevState => {
                    return {...prevState,tableLoading:false,};
                });
            }
        })
    }

    const deleteInstitution = ()=>{
        setState(prevState => {
            return {...prevState,loading:true,};
        });
        CONFIG.headers.Authorization = "Bearer " + localStorage.getItem("token");
        axios.delete(`${DELETE_INSTITUTION}/${state.instIdToDelete}`,CONFIG)
        .then((res)=>{
            setState(prevState => {
                return {...prevState,loading:false,};
            });
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
                setState(prevState => {
                    return {...prevState,loading:false,};
                });
            }
        })
    }

    const changeStatus = (id,status)=>{
        setState(prevState => {
            return {...prevState,loading:true,};
        });
        CONFIG.headers.Authorization = "Bearer " + localStorage.getItem("token");
        let data = {
            id:id,
            status:status,
        }
        axios.post(`${UPDATE_INSTITUTION_STATUS}`,data,CONFIG)
        .then((res)=>{
            setState(prevState => {
                return {...prevState,loading:false,};
            });
            toast.success("Institution Status Updated Successfully")
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
                    toast.error("Error Occured Updating Institution Status")
                }
                setState(prevState => {
                    return {...prevState,loading:false,};
                });
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
                        <Row className="justify-content-end"> 
                            <Button 
                            className="add-btn"
                            variant="success"
                            disabled={state.loading}
                            onClick={()=>{}}
                            >
                                Export
                            </Button> 
                            <Button 
                            className="add-btn mx-2"
                            disabled={state.loading}
                            onClick={()=>{toggleAddInstitution()}}
                            >
                                + Add
                            </Button> 
                        </Row>
                    </Col>
                </Row>
                <Row className="mb-2">
                    {
                    // state.tableLoading ?
                    // <Col md="12" className="text-center">
                    //     Loading...
                    // </Col>
                    // :
                    <MaterialTable
                        columns={[
                            { title: 'Name', field: 'instName' },
                            { title: 'Code', field: 'instCode' },
                            { title: 'Status', field: 'enabled' },
                           
                        ]}
                        data={state.tableData}  
                        isLoading={state.tableLoading}
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
                            pageSize:5,
                            // pageSizeOptions:[],
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
                    <Button variant="secondary" onClick={toggleDeleteModal} disabled={state.loading}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={deleteInstitution} disabled={state.loading}>
                        {state.loading ? <HourglassEmptyIcon/>:"Delete"}
                    </Button>
                </Modal.Footer>
                
            </Modal>
        </div>
    )
}

export default Institution;