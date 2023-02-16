import { useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { Step, Stepper } from "react-form-stepper"


const AddInstitution = (props)=>{

    const [state,setState] = useState({
        loading:false,
        activetab:0,

        instCode:"",
        instName:"",
        instStatus:"0",
        countryId:"",
        daysToLockUser:"",
        sessionTimeout:"",
        customerIdLength:"",
        nationalIdLength:"",
        accountNbLength:"",
        hsmEncPinLength:"",
        hsmPort:"",
        hsmIp:"",
        hsmMsgHeaderLength:"",
        adhocRnNewExp:"",
        adhocRpNewExp:"",
        renewalOutputPath:"",
        ecomOutputPath:"",
        embossingOutputPath:"",
        encryptionKey:"",

    })

    const changeActivetab = (tab)=>{
        setState(prevState => {
            return {...prevState,activetab:tab,};
        });
    }

    const onChangeHandler = (e) =>{
        setState(prevState => {
            return {...prevState,
                [e.target.name]:e.target.value,};
        });
    }

    const numberOnChangeHandler = (e) =>{
        const re = /^[0-9\b]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            setState(prevState => {
                return {...prevState,
                    [e.target.name]:e.target.value,};
            });
        }  
    }


    return (

        <Container>
            <Row>
                <h3>Add Institution</h3>
            </Row>
            <Row center>
                <Stepper 
                activeStep={state.activetab}
                connectorStyleConfig={{
                    disabledColor:"#B0AFB1",
                    activeColor:"#191F6C",
                    completedColor:"#191F6C"
                }}
                styleConfig={{
                    activeBgColor:"#191F6C",
                    completedBgColor:"#191F6C",
                    inactiveBgColor:"#B0AFB1"
                }}
                >
                    <Step label="Basic Info" />
                    <Step label="Host Info" />
                    <Step label="Privacy Policy" />
                </Stepper>
            </Row>
            <Row>
                {state.activetab ===0 && 
                <>
                    <Row>
                        <Col md="4">
                            <Form.Label htmlFor="instCode">Code</Form.Label>
                            <Form.Control
                                type="text"
                                id="instCode"
                                name="instCode"
                                maxLength={"100"}
                                value={state.instCode}
                                onChange={onChangeHandler}
                            />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="instName">Name</Form.Label>
                            <Form.Control
                                type="text"
                                id="instName"
                                name="instName"
                                maxLength={"100"}
                                value={state.instName}
                                onChange={onChangeHandler}
                            />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="instStatus">Status</Form.Label>
                            <Form.Check
                                type="switch"
                                id="instStatus"
                                name="instStatus"
                                label={state?.instStatus==="1" ? "Enabled" : "Disabled"}
                                checked={state?.instStatus==="1"}
                                onClick={()=>{
                                    setState(prevState => {
                                        return {...prevState,
                                            instStatus:state?.instStatus==="1" ? "0":"1",};
                                    });
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <Form.Label htmlFor="countryId">Country ID</Form.Label>
                            <Form.Control
                                type="text"
                                id="countryId"
                                name="countryId"
                                maxLength={"100"}
                                value={state.countryId}
                                onChange={numberOnChangeHandler}
                            />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="daysToLockUser">Days to Lock User</Form.Label>
                            <Form.Control
                                type="text"
                                id="daysToLockUser"
                                name="daysToLockUser"
                                maxLength={"100"}
                                value={state.daysToLockUser}
                                onChange={numberOnChangeHandler}
                            />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="sessionTimeout">Session Timeout</Form.Label>
                            <Form.Control
                                type="text"
                                id="sessionTimeout"
                                name="sessionTimeout"
                                maxLength={"100"}
                                value={state.sessionTimeout}
                                onChange={numberOnChangeHandler}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <Form.Label htmlFor="customerIdLength">Customer ID Length</Form.Label>
                            <Form.Control
                                type="text"
                                id="customerIdLength"
                                name="customerIdLength"
                                maxLength={"100"}
                                value={state.customerIdLength}
                                onChange={numberOnChangeHandler}
                            />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="nationalIdLength">National ID Length</Form.Label>
                            <Form.Control
                                type="text"
                                id="nationalIdLength"
                                name="nationalIdLength"
                                maxLength={"100"}
                                value={state.nationalIdLength}
                                onChange={numberOnChangeHandler}
                            />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="accountNbLength">Account Number Length</Form.Label>
                            <Form.Control
                                type="text"
                                id="accountNbLength"
                                name="accountNbLength"
                                maxLength={"100"}
                                value={state.accountNbLength}
                                onChange={numberOnChangeHandler}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <Form.Label htmlFor="hsmEncPinLength">HSM PIN Length</Form.Label>
                            <Form.Control
                                type="text"
                                id="hsmEncPinLength"
                                name="hsmEncPinLength"
                                maxLength={"100"}
                                value={state.hsmEncPinLength}
                                onChange={numberOnChangeHandler}
                            />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="hsmIp">HSM IP</Form.Label>
                            <Form.Control
                                type="text"
                                id="hsmIp"
                                name="hsmIp"
                                maxLength={"100"}
                                value={state.hsmIp}
                                onChange={onChangeHandler}
                            />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="hsmPort">HSM Port</Form.Label>
                            <Form.Control
                                type="text"
                                id="hsmPort"
                                name="hsmPort"
                                maxLength={"100"}
                                value={state.hsmPort}
                                onChange={onChangeHandler}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <Form.Label htmlFor="hsmMsgHeaderLength">HSM Msg. Header Length</Form.Label>
                            <Form.Control
                                type="text"
                                id="hsmMsgHeaderLength"
                                name="hsmMsgHeaderLength"
                                maxLength={"100"}
                                value={state.hsmMsgHeaderLength}
                                onChange={numberOnChangeHandler}
                            />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="adhocRnNewExp">adhocRnNewExp</Form.Label>
                            <Form.Control
                                type="text"
                                id="adhocRnNewExp"
                                name="adhocRnNewExp"
                                maxLength={"100"}
                                value={state.adhocRnNewExp}
                                onChange={onChangeHandler}
                            />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="adhocRpNewExp">adhocRpNewExp</Form.Label>
                            <Form.Control
                                type="text"
                                id="adhocRpNewExp"
                                name="adhocRpNewExp"
                                maxLength={"100"}
                                value={state.adhocRpNewExp}
                                onChange={onChangeHandler}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <Form.Label htmlFor="renewalOutputPath">Renewal Output Path</Form.Label>
                            <Form.Control
                                type="text"
                                id="renewalOutputPath"
                                name="renewalOutputPath"
                                maxLength={"100"}
                                value={state.renewalOutputPath}
                                onChange={onChangeHandler}
                            />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="ecomOutputPath">Ecom Output Path</Form.Label>
                            <Form.Control
                                type="text"
                                id="ecomOutputPath"
                                name="ecomOutputPath"
                                maxLength={"100"}
                                value={state.ecomOutputPath}
                                onChange={onChangeHandler}
                            />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="embossingOutputPath">Embossing Output Path</Form.Label>
                            <Form.Control
                                type="text"
                                id="embossingOutputPath"
                                name="embossingOutputPath"
                                maxLength={"100"}
                                value={state.embossingOutputPath}
                                onChange={onChangeHandler}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <Form.Label htmlFor="encryptionKey">Encryption Key</Form.Label>
                            <Form.Control
                                type="text"
                                id="encryptionKey"
                                name="encryptionKey"
                                maxLength={"100"}
                                value={state.encryptionKey}
                                onChange={onChangeHandler}
                            />
                        </Col>
                    </Row>
                </>
                }
                {state.activetab ===1 && 
                <>
                
                </>
                }
                {state.activetab ===3 && 
                <>
                
                </>
                }
            </Row>
            <Row>
                <Col md="3">
                    <Row className="d-flex justify-content-start my-1">
                        <Col>
                            <Button variant="secondary" onClick={()=>{props.toggleAddInstitution()}} className="w-100">
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col md="3">
                </Col>
                <Col md="6">
                    <Row className="d-flex justify-content-end my-1">
                        <Col>
                            {state.activetab!==0 && 
                            <Button variant="secondary" onClick={()=>{changeActivetab(state.activetab-1)}} className="w-100">
                                Back
                            </Button>}
                        </Col>
                        <Col>
                            {state.activetab===2 
                            ? 
                            <Button variant="primary" className="w-100" onClick={()=>{}}>
                                Add
                            </Button>
                            :
                            <Button variant="primary" className="w-100" onClick={()=>{changeActivetab(state.activetab+1)}}>
                                Next
                            </Button>
                             }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default AddInstitution