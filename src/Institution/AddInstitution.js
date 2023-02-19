import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { Step, Stepper } from "react-form-stepper"
import Select from "react-select"
import { toast } from "react-toastify"
import { ADD_INSTITUTION, CONFIG, COUNTRY_LIST } from "../API"
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';


const AddInstitution = (props)=>{

    const [state,setState] = useState({
        loading:false,
        activetab:0,

        instCode:"",
        instName:"",
        instStatus:"0",
        countrySelected:"",
        countryList:[],
        daysToLockUser:"",
        sessionTimeout:"",
        customerIdLength:"",
        nationalIdLength:"",
        accountNbLength:"",
        hsmEncPinLength:"",
        hsmPort:"",
        hsmIp:"",
        hsmMsgHeaderLength:"",
        adhocRnNewExp:"0",
        adhocRpNewExp:"0",
        renewalOutputPath:"",
        ecomOutputPath:"",
        embossingOutputPath:"",
        encryptionKey:"",

        hostIntegration:"0",
        hostName:"",
        hostUrl:"",
        hostType:"",
        requestBody:"",
        responseBody:"",

        daysToChangePassword:"",
        warningChangePassword:"",
        passwordLength:"",
        passwordHistory:"",
        upperFlag:"0",
        upperCount:"",
        lowerCount:"",
        lowerFlag:"0",
        numberCount:"",
        numberFlag:"0",
        specialCharactersCount:"",
        specialCharactersFlag:"0",
        specialCharactersList:"",


    })

    const changeActivetab = (tab)=>{
        if (validate()){
            setState(prevState => {
                return {...prevState,activetab:tab,};
            });
        }
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

    const getAllCountries = ()=>{
        setState(prevState => {
            return {...prevState,
                loading:true,};
        });

        CONFIG.headers.Authorization = "Bearer " + localStorage.getItem("token");
        axios.get(COUNTRY_LIST,CONFIG)
        .then((res)=>{

            setState(prevState => {
                return {...prevState,
                    loading:false,
                    countryList:res?.data?.map((item)=>{
                        return {
                            label:item?.countryDesc,
                            value:item?.countryId
                        }
                    })
                };
            });

        }).catch((err)=>{
            toast.error("Error Loading Countries")
            setState(prevState => {
                return {...prevState,
                    loading:false,};
            });
        })
    }

    const addInstitution = ()=>{

        if (validate()){
            setState(prevState => {
                return {...prevState,
                    loading:true,};
            });
            let data = {
                "accountNbLength": state.accountNbLength,
                "adhocRnNewExp": state.adhocRnNewExp,
                "adhocRpNewExp": state.adhocRpNewExp,
                "countryId": state.countrySelected?.value,
                "customerIdLength": state.customerIdLength,
                "daysToChangePassword": state.daysToChangePassword,
                "daysToLockUser": state.daysToLockUser,
                "ecomOutputPath": state.ecomOutputPath,
                "embossingOutputPath": state.embossingOutputPath,
                "encryptionKey": state.encryptionKey,
                "hostConfigurations": {
                "hostId": 0,
                "hostName": state.hostName,
                "hostType": state.hostType,
                "hostUrl": state.hostUrl,
                "requestBody": state.requestBody,
                "responseBody": state.responseBody
                },
                "hostIntegration": state.hostIntegration,
                "hsmEncPinLength": state.hsmEncPinLength,
                "hsmIp": state.hsmIp,
                "hsmMsgHeaderLength": state.hsmMsgHeaderLength,
                "hsmPort": state.hsmPort,
                "instCode": state.instCode,
                "instId": 0,
                "instName": state.instName,
                "instStatus": state.instStatus,
                "nationalIdLength": state.nationalIdLength,
                "passwordPolicies": {
                "lowerCount": state.lowerCount,
                "lowerFlag": state.lowerFlag,
                "numberCount": state.numberCount,
                "numberFlag": state.numberFlag,
                "passwordHistory": state.passwordHistory,
                "passwordLength": state.passwordLength,
                "policyId": 0,
                "specialCharactersCount": state.specialCharactersCount,
                "specialCharactersFlag": state.specialCharactersFlag,
                "specialCharactersList": state.specialCharactersList,
                "upperCount": state.upperCount,
                "upperFlag": state.upperFlag
                },
                "renewalOutputPath": state.renewalOutputPath,
                "sessionTimeout": state.sessionTimeout,
                "warningChangePassword": state.warningChangePassword
            }
            axios.post(ADD_INSTITUTION,data,CONFIG)
            .then((res)=>{
                toast.success("Institution Added Successfully!");
                props.toggleAddInstitution(true)
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
                        toast.error("Error Occured Adding Institution")
                    }
                    setState(prevState => {
                        return {...prevState,loading:false,};
                    });
                }
            })
        }
    
    }

    const validate = ()=>{

        let specialList = "!@#$%^&*()_+=-][{}\|';/.,:?><\" "

        if (state.activetab===0){

            if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(state.instCode)){
                toast.error("Please Enter a valid Institution Code")
                return false;
            }

            if (!/^\d+(\.\d+)*$/.test(state.hsmIp) && state.hsmIp!==""){
                toast.error("Please Enter a valid HSM IP")
                return false;
            }
        }

        if (state.activetab===1){

        }

        if (state.activetab===2){
            console.log("here")
            if (/\w*[a-zA-Z0-9]\w*/.test(state.specialCharactersList) && state.specialCharactersList!==""){
                toast.error("Please Enter a valid Special Character list")
                return false;
            }
        }
        

        return true;
    }

    useEffect(()=>{
        getAllCountries()
    },[])


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
            <Col md="12" className="scrollable-container px-1">
                {state.activetab ===0 && 
                <>
                    <Row>
                        <Col md="4">
                            <Form.Label htmlFor="instCode">Code<span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                id="instCode"
                                name="instCode"
                                maxLength={"10"}
                                value={state.instCode}
                                onChange={onChangeHandler}
                            />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="instName">Name<span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                id="instName"
                                name="instName"
                                maxLength={"50"}
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
                            <Form.Label htmlFor="countryId">Country<span className="text-danger">*</span></Form.Label>
                            <Select
                                className="basic-single "
                                classNamePrefix="select"
                                placeholder="Select a Country..."
                                // isDisabled={isDisabled}
                                isLoading={state.loading}
                                isClearable={true}
                                // isRtl={isRtl}
                                value={state.countrySelected}
                                isSearchable={true}
                                onChange={(e)=>{
                                    setState(prevState => {
                                    return {...prevState,
                                        countrySelected:e,};
                                });
                            }}
                                // name="color"
                                options={state.countryList}
                            />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="daysToLockUser">Days to Lock User</Form.Label>
                            <Form.Control
                                type="text"
                                id="daysToLockUser"
                                name="daysToLockUser"
                                maxLength={"3"}
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
                                maxLength={"3"}
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
                                maxLength={"3"}
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
                                maxLength={"3"}
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
                                maxLength={"3"}
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
                                maxLength={"2"}
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
                                maxLength={"50"}
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
                                maxLength={"10"}
                                value={state.hsmPort}
                                onChange={numberOnChangeHandler}
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
                                maxLength={"2"}
                                value={state.hsmMsgHeaderLength}
                                onChange={numberOnChangeHandler}
                            />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="adhocRnNewExp">adhocRnNewExp</Form.Label>
                            <Form.Check
                                type="switch"
                                id="adhocRnNewExp"
                                name="adhocRnNewExp"
                                label={state?.adhocRnNewExp==="1" ? "Enabled" : "Disabled"}
                                checked={state?.adhocRnNewExp==="1"}
                                onClick={()=>{
                                    setState(prevState => {
                                        return {...prevState,
                                            adhocRnNewExp:state?.adhocRnNewExp==="1" ? "0":"1",};
                                    });
                                }}
                            />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="adhocRpNewExp">adhocRpNewExp</Form.Label>
                            <Form.Check
                                type="switch"
                                id="adhocRpNewExp"
                                name="adhocRpNewExp"
                                label={state?.adhocRpNewExp==="1" ? "Enabled" : "Disabled"}
                                checked={state?.adhocRpNewExp==="1"}
                                onClick={()=>{
                                    setState(prevState => {
                                        return {...prevState,
                                            adhocRpNewExp:state?.adhocRpNewExp==="1" ? "0":"1",};
                                    });
                                }}
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
                    <Row>
                        <Col md="4">
                            {/* <Form.Label htmlFor="hostIntegration">Has Host Integration</Form.Label> */}
                            <Form.Check 
                                type={"checkbox"}
                                id={`hostIntegration`}
                                label={`Has Host Integration`}
                                checked={state.hostIntegration === "1"}
                                onChange={(e)=>{ 
                                    setState(prevState => {
                                        return {...prevState,
                                            hostIntegration: !e.target.checked ? "0":"1",};
                                    });
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <Form.Label htmlFor="renewalOutputPath">Host Name</Form.Label>
                            <Form.Control
                                type="text"
                                id="hostName"
                                name="hostName"
                                maxLength={"100"}
                                value={state.hostName}
                                onChange={onChangeHandler}
                                disabled={state.hostIntegration !== "1"}
                            />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="hostType">Host Type</Form.Label>
                            <Form.Control
                                type="text"
                                id="hostType"
                                name="hostType"
                                maxLength={"100"}
                                value={state.hostType}
                                onChange={onChangeHandler}
                                disabled={state.hostIntegration !== "1"}
                            />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="hostUrl">Host URL</Form.Label>
                            <Form.Control
                                type="text"
                                id="hostUrl"
                                name="hostUrl"
                                maxLength={"100"}
                                value={state.hostUrl}
                                onChange={onChangeHandler}
                                disabled={state.hostIntegration !== "1"}

                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <Form.Label htmlFor="requestBody">Request Body</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={"3"}
                                id="requestBody"
                                name="requestBody"
                                maxLength={"500"}
                                value={state.requestBody}
                                onChange={onChangeHandler}
                                disabled={state.hostIntegration !== "1"}
                            />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="responseBody">Response Body</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={"3"}
                                id="responseBody"
                                name="responseBody"
                                maxLength={"500"}
                                value={state.responseBody}
                                onChange={onChangeHandler}
                                disabled={state.hostIntegration !== "1"}
                            />
                        </Col>
                    </Row>
                </>
                }
                {state.activetab ===2 && 
                <>
                    <Row>
                        <Col md="4">
                            <Form.Label htmlFor="daysToChangePassword">Days To Change Password</Form.Label>
                            <Form.Control
                                type="text"
                                id="daysToChangePassword"
                                name="daysToChangePassword"
                                maxLength={"3"}
                                value={state.daysToChangePassword}
                                onChange={numberOnChangeHandler}
                            />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="warningChangePassword">Password Warning</Form.Label>
                            <Form.Control
                                type="text"
                                id="warningChangePassword"
                                name="warningChangePassword"
                                maxLength={"3"}
                                value={state.warningChangePassword}
                                onChange={numberOnChangeHandler}
                            />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="passwordLength">Password Length</Form.Label>
                            <Form.Control
                                type="text"
                                id="passwordLength"
                                name="passwordLength"
                                maxLength={"2"}
                                value={state.passwordLength}
                                onChange={numberOnChangeHandler}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <Form.Label htmlFor="passwordHistory">Password History</Form.Label>
                            <Form.Control
                                type="text"
                                id="passwordHistory"
                                name="passwordHistory"
                                maxLength={"2"}
                                value={state.passwordHistory}
                                onChange={numberOnChangeHandler}
                            />
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="upperCount">Capital Letters</Form.Label>
                            <Row className="d-flex">
                                <Col sm="3" className="d-flex align-items-center">
                                    <Form.Check 
                                        type={"checkbox"}
                                        id={`upperFlag`}
                                        label={state.upperFlag === "1"? "On":"Off"}
                                        checked={state.upperFlag === "1"}
                                        onChange={(e)=>{ 
                                            setState(prevState => {
                                                return {...prevState,
                                                    upperFlag: !e.target.checked ? "0":"1",};
                                            });
                                        }}
                                    />
                                </Col>
                                <Col sm="9">
                                    <Form.Control
                                        type="text"
                                        id="upperCount"
                                        name="upperCount"
                                        maxLength={"2"}
                                        value={state.upperCount}
                                        onChange={numberOnChangeHandler}
                                        disabled={state.upperFlag!=="1"}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="lowerCount">Lowercase Letters</Form.Label>
                            <Row className="d-flex">
                                <Col sm="3" className="d-flex align-items-center">
                                    <Form.Check 
                                        type={"checkbox"}
                                        id={`lowerFlag`}
                                        label={state.lowerFlag === "1" ? "On": "Off"}
                                        checked={state.lowerFlag === "1"}
                                        onChange={(e)=>{ 
                                            setState(prevState => {
                                                return {...prevState,
                                                    lowerFlag: !e.target.checked ? "0":"1",};
                                            });
                                        }}
                                    />
                                </Col>
                                <Col sm="9">
                                    <Form.Control
                                        type="text"
                                        id="lowerCount"
                                        name="lowerCount"
                                        maxLength={"2"}
                                        value={state.lowerCount}
                                        onChange={numberOnChangeHandler}
                                        disabled={state.lowerFlag!=="1"}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <Form.Label htmlFor="numberCount">Number Count</Form.Label>
                            <Row className="d-flex">
                                <Col sm="3" className="d-flex align-items-center">
                                    <Form.Check 
                                        type={"checkbox"}
                                        id={`numberFlag`}
                                        label={state.numberFlag === "1" ? "On":"Off"}
                                        checked={state.numberFlag === "1"}
                                        onChange={(e)=>{ 
                                            setState(prevState => {
                                                return {...prevState,
                                                    numberFlag: !e.target.checked ? "0":"1",};
                                            });
                                        }}
                                    />
                                </Col>
                                <Col sm="9">
                                    <Form.Control
                                        type="text"
                                        id="numberCount"
                                        name="numberCount"
                                        maxLength={"2"}
                                        value={state.numberCount}
                                        onChange={numberOnChangeHandler}
                                        disabled={state.numberFlag!=="1"}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="specialCharactersCount">Special Chars. Count</Form.Label>
                            <Row className="d-flex">
                                <Col sm="3" className="d-flex align-items-center">
                                    <Form.Check 
                                        type={"checkbox"}
                                        id={`specialCharactersFlag`}
                                        label={state.specialCharactersFlag === "1" ? "On":"Off"}
                                        checked={state.specialCharactersFlag === "1"}
                                        onChange={(e)=>{ 
                                            setState(prevState => {
                                                return {...prevState,
                                                    specialCharactersFlag: !e.target.checked ? "0":"1",};
                                            });
                                        }}
                                    />
                                </Col>
                                <Col sm="9">
                                    <Form.Control
                                        type="text"
                                        id="specialCharactersCount"
                                        name="specialCharactersCount"
                                        maxLength={"2"}
                                        value={state.specialCharactersCount}
                                        onChange={numberOnChangeHandler}
                                        disabled={state.specialCharactersFlag!=="1"}
                                    />
                                </Col>
                            </Row>

                        </Col>
                        <Col md="4">
                            <Form.Label htmlFor="specialCharactersList">Special Chars. List</Form.Label>
                            <Form.Control
                                type="text"
                                id="specialCharactersList"
                                name="specialCharactersList"
                                maxLength={"50"}
                                value={state.specialCharactersList}
                                onChange={ onChangeHandler}
                                disabled={state.specialCharactersFlag !== "1"}
                            />
                        </Col>
                    </Row>
                </>
                }
            </Col>
            <Row>
                <Col md="3">
                    <Row className="d-flex justify-content-start my-1">
                        <Col>
                            <Button variant="secondary" onClick={()=>{props.toggleAddInstitution(false)}} className="w-100">
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
                            <Button variant="secondary" onClick={()=>{changeActivetab(state.activetab-1)}} className="w-100" disabled={state.loading}>
                                Back
                            </Button>}
                        </Col>
                        <Col>
                            {state.activetab===2 
                            ? 
                            <Button 
                            variant="primary" 
                            className="w-100" 
                            onClick={()=>{addInstitution()}} 
                            disabled={state.loading}>
                                {state.loading ? <HourglassEmptyIcon/> : "Add"}
                            </Button>
                            :
                            <Button 
                            variant="primary" 
                            className="w-100" 
                            onClick={()=>{changeActivetab(state.activetab+1)}}
                            disabled={
                                state.activetab===0 ?
                                (!state.instName || !state.instCode || !state.countrySelected)
                                :
                                state.activetab===1 ? 
                                false
                                :
                                false
                            }
                            >
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