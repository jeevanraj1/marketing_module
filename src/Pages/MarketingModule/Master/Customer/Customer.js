import { Grid, Paper, TextField, Autocomplete, Typography, Box, Button, Modal, Stack, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate, useLocation } from 'react-router-dom';
import { customerApi } from '../../../Api';
import Swal from 'sweetalert2';
import DepositDetails from './DepositDetails';
import AddGSTDetails from './AddGSTDetails';
import dayjs from 'dayjs';
import AddAddress from './AddAddress';


//inputProps={{maxLength:40}}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60%",
  bgcolor: 'background.paper',
  border: '2px solid #ddd',
  boxShadow: 24,
  border: "10px solid lightblue"
};
const textFiledStyle = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "black", borderWidth: "2px" },
  },
  "& .MuiInputLabel-root": {
    color: "black",
    "&.Mui-focused": {
      transform: "translate(14px, -10px)",
    },
  },
  "& input, & label": {
    height: "15px",
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
}

const autoCompleteStyle = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "black", borderWidth: "2px" },
  },
  "& .MuiInputLabel-root": {
    color: "black",
    "&.Mui-focused": {
      transform: "translate(14px, -10px)",
    },
  },
  "& input, & label": {
    height: "15px",
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
}
const datePickerStyle = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
      borderWidth: "2px",
      height: "35px",
      paddingBottom: "5px",

    },
  },
  "& .MuiInputLabel-root": {
    color: "black",
    "&.Mui-focused": {
      transform: "translate(14px, -8px)",
    },
  },
  "& input": {
    height: "12px",
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: "-1px",
  },
  "& label": {
    height: "14px",
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: "-1px",
  },
}

export default function Customer() {
  const navigate = useNavigate()
  const location = useLocation()
  const [updateButton, setUpdateButton] = useState(false);
  const [saveButton, setSaveButton] = useState(true);
  const [officerNames, setOfficerNames] = useState([])
  const [realationTypeNames, setRealationTypeNames] = useState([])
  const [fetchStatusDD, setFetchStatusDD] = useState([])
  const [fetchRateCategoryDD, setFetchRateCategoryDD] = useState([])
  const [fetchBillCategoryDD, setfetchBillCategoryDD] = useState([]);
  const [fetchPayModeDD, setFetchPayModeDD] = useState([]);
  const [fetchBankMasterDD, setFetchBankMasterDD] = useState([]);
  const [fetchBranchMasterDD, setFetchBranchMasterDD] = useState([]);
  const [fetchCustomerTypeDD, setFetchCustomerTypeDD] = useState([]);
  const initialState = location.state || {
    // ======================================Personal Details===============================
    customerCode: '',
    customerName: '',
    customerAlias: '',
    customerStatus: '',
    relationType: '',
    relationName: '',
    officerName: '',
    registrationDate: dayjs(),
    // ======================================Customer Category===============================
    customerType: '',
    billCategory: '',
    rateCategory: '',
    paymode: "",
    // ======================================Bank Details====================================
    bankName: '',
    branchName: "",
    ifscCode: '',
    accNumber: '',
    // ======================================Deposit Details=================================
    totalDepositeAmount: 0,
    FdLock: '',
    creditLimit: '',
    currentBalance: '',
    // ======================================Tax Details=====================================
    panNumber: '',
    gstNumber: '',
    aadharNumber: '',
    tcsPercentage: '',
    // ======================================Contact Details=================================
    phoneNumber: '',
    emailId: '',
    alternatePhoneNumber: "",
  }
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [GSTDeatils, setGSTDeatils] = useState(false);
  const [AddressDetails, setAddressDetails] = useState(false);
  const [AddDocements, setAddDocements] = useState(false);
  const [customerCode, setcustomerCode] = useState(null);
  const [extraDetails, setExtraDetails] = useState(false);
  const [bankDetailsShow, setBankDetailsShow] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const aadhraRegex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

  const handleMobileOpen = () => setMobileOpen(true);
  const handleMobileClose = () => {
    setMobileOpen(false)
  };
  const HandleGSTDeatilsOpen = () => setGSTDeatils(true)
  const HandleGSTDetailsClose = () => setGSTDeatils(false)
  const handleAddressDetailsOpen = () => setAddressDetails(true)
  const HandleAddressDetailsClose = () => setAddressDetails(false)
  const fdLock = [
    { name: "YES", value: 'Y' },
    { name: "NO", value: "N" }
  ]
  const validation = () => {
    const newErrors = {}
    // ======================================customerCode=================================
    if (formData.customerCode.trim() === "") newErrors.customerCode = "Required"
    else if (formData.customerCode.trim().length > 10) newErrors.customerCode = errors.customerCode
    // ======================================customerCode=================================
    if (formData.customerName.trim() === "") newErrors.customerName = "Required"
    else if (formData.customerName.length.trim() > 50) newErrors.customerName = errors.customerName
    // ======================================customerAlias=================================
    if (formData.customerAlias.trim() === "") newErrors.customerAlias = ""
    else if (formData.customerAlias.trim().length > 20) newErrors.customerAlias = errors.customerAlias
    // ======================================customerStatus=================================
    if (formData.customerStatus === '') newErrors.customerStatus = 'Required'
    else if (formData.customerStatus !== "") newErrors.customerStatus = errors.customerStatus
    // ======================================relationType=================================
    if (formData.relationType === '') newErrors.relationType = ''
    else if (formData.relationType !== "") newErrors.relationType = errors.relationType
    // ======================================relationName=================================
    if (formData.relationName.trim() === '') newErrors.relationName = ''
    else if (formData.relationName.trim().length > 40) newErrors.relationName = errors.relationName
    // ======================================officerName=================================
    if (formData.officerName === '') newErrors.officerName = 'Required'
    else if (formData.officerName !== "") newErrors.officerName = errors.officerName
    // ======================================registrationDate=================================
    if (formData.registrationDate === '') newErrors.registrationDate = ''
    else if (formData.registrationDate !== "") newErrors.registrationDate = errors.registrationDate
    // ======================================customerType=================================
    if (formData.customerType === '') newErrors.customerType = 'Required'
    else if (formData.customerType !== "") newErrors.customerType = errors.customerType
    // ======================================billCategory=================================
    if (formData.billCategory === '') newErrors.billCategory = 'Required'
    else if (formData.billCategory !== "") newErrors.billCategory = errors.billCategory
    // ======================================rateCategory=================================
    if (formData.rateCategory === '') newErrors.rateCategory = 'Required'
    else if (formData.rateCategory !== "") newErrors.rateCategory = errors.rateCategory
    // ======================================paymode=================================
    if (formData.paymode === '') newErrors.paymode = 'Required'
    else if (formData.paymode !== "") newErrors.paymode = errors.paymode
    // ======================================paymode Challan/IMPS/RTGS/NEFT=================================
    if (formData.paymode !== "" && (formData.paymode === "B" || formData.paymode === "R")) {
      // ======================================bankName=================================
      if (formData.bankName === "") newErrors.bankName = 'Required'
      else if (formData.bankName !== "") newErrors.bankName = errors.bankName
      // ======================================branchName=================================
      if (formData.branchName === "") newErrors.branchName = 'Required'
      else if (formData.branchName !== "") newErrors.branchName = errors.branchName
      // ======================================accNumber=================================
      if (formData.accNumber === "") newErrors.accNumber = 'Required'
      else if (formData.accNumber !== "") newErrors.accNumber = errors.accNumber
    }
    // ======================================FdLock=================================
    if (formData.FdLock === '') newErrors.FdLock = 'Required'
    else if (formData.FdLock !== "") newErrors.FdLock = errors.FdLock
    // ======================================creditLimit=================================
    if (formData.creditLimit === '') newErrors.creditLimit = 'Required'
    else if (formData.creditLimit !== "") newErrors.creditLimit = errors.creditLimit
    // ======================================panNumber=================================
    if (formData.panNumber === '') newErrors.panNumber = ''
    else if (formData.panNumber !== "") newErrors.panNumber = errors.panNumber
    // ======================================gstNumber=================================
    if (formData.gstNumber === '') newErrors.gstNumber = ''
    else if (formData.gstNumber !== "") newErrors.gstNumber = errors.gstNumber
    // ======================================tcsPercentage pending=================================
    // ======================================phoneNumber=================================
    if (formData.phoneNumber === '') newErrors.phoneNumber = ''
    else if (formData.phoneNumber !== "") newErrors.phoneNumber = errors.phoneNumber
    //==========================================emailId=============================
    if (formData.emailId === '') newErrors.emailId = ''
    else if (formData.emailId !== "") newErrors.emailId = errors.emailId
    //======================================alternatePhoneNumber=================================
    if (formData.alternatePhoneNumber === '') newErrors.alternatePhoneNumber = ''
    else if (formData.alternatePhoneNumber !== "") newErrors.alternatePhoneNumber = errors.alternatePhoneNumber

    return newErrors
  }

  const handleFieldChange = async (fieldName, value) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
    setFormData((prevdata) => ({
      ...prevdata,
      [fieldName]: value
    }))
    // ======================================customerCode=================================
    if (fieldName === "customerCode") {
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          customerCode: "Required",
        }));
      }
      else if (value.trim().length > 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          customerCode: "Value must be Not More than 10 Characters",
        }));
        value = value.substring(0, 10)
        setTimeout(() => {
          setErrors((prevErrors) => ({
            ...prevErrors,
            customerCode: "",
          }))
        }, 1000)
      }
      else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          customerCode: "",
        }));
      }
    }
    // ======================================customerName=================================
    if (fieldName === "customerName") {
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          customerName: "Required",
        }));
      }
      else if (value.trim().length > 50) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          customerName: "Value must be Not More than 50 Characters",
        }));
        value = value.substring(0, 10)
        setTimeout(() => {
          setErrors((prevErrors) => ({
            ...prevErrors,
            customerName: "",
          }))
        }, 1000)
      }
      else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          customerName: "",
        }));
      }
    }
    // ======================================customerAlias=================================
    if (fieldName === "customerAlias") {
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          customerAlias: "",
        }));
      }
      else if (value.trim().length > 20) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          customerAlias: "Value must be Not More than 20 Characters",
        }));
        value = value.substring(0, 20)
        setTimeout(() => {
          setErrors((prevErrors) => ({
            ...prevErrors,
            customerAlias: "",
          }))
        }, 1000)
      }
      else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          customerAlias: "",
        }));
      }
    }
    // ======================================customerStatus=================================
    if (fieldName === "customerStatus") {
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
      if (value === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          customerStatus: "Required",
        }));
      }
      else if (value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          customerStatus: "",
        }));
      }
    }
    // ======================================relationType=================================
    if (fieldName === "relationType") {
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
      if (value === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          relationType: "",
        }));
      }
      else if (value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          relationType: "",
        }));
      }
    }// ======================================relationName=================================
    if (fieldName === "relationName") {
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          relationName: "",
        }));
      }
      else if (value.trim().length > 40) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          relationName: "Value must be Not More than 40 Characters",
        }));
        value = value.substring(0, 40)
        setTimeout(() => {
          setErrors((prevErrors) => ({
            ...prevErrors,
            relationName: "",
          }))
        }, 1000)
      }
      else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          customerAlias: "",
        }));
      }
    }
    // ======================================officerName=================================
    if (fieldName === "officerName") {
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
      if (value === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          officerName: "Required",
        }));
      }
      else if (value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          officerName: "",
        }));
      }
    }
    // ==============================registrationDate=========================================
    if (fieldName === 'registrationDate') {
      if (value === '') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          registrationDate: "",
        }));
      }
      else if (value !== "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          registrationDate: "",
        }));
      }
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    // ======================================customerType=================================
    if (fieldName === "customerType") {
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
      if (value === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          customerType: "Required",
        }));
      }
      else if (value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          customerType: "",
        }));
      }
    }
    // ======================================billCategory=================================
    if (fieldName === "billCategory") {
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
      if (value === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          billCategory: "Required",
        }));
      }
      else if (value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          billCategory: "",
        }));
      }
    }
    // ======================================rateCategory=================================
    if (fieldName === "rateCategory") {
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
      if (value === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          rateCategory: "Required",
        }));
      }
      else if (value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          rateCategory: "",
        }));
      }
    }
    // ======================================paymode===============================
    if (fieldName === "paymode") {
      if (value === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          paymode: "Required",
        }))
        setBankDetailsShow(false)
      }
      else if (value !== "") {
        const paymode = fetchPayModeDD.find(option => option.pay_mode === value)
        const { pay_mode } = paymode
        if (pay_mode === "B") setBankDetailsShow(true)
        else if (pay_mode === "R") setBankDetailsShow(true)
        else setBankDetailsShow(false)
      }
      console.log(value);
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    // ======================================FdLock=================================
    if (fieldName === "FdLock") {
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
      if (value === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          FdLock: "Required",
        }));
      }
      else if (value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          FdLock: "",
        }));
      }
    }
    // ======================================creditLimit===============================
    if (fieldName === "creditLimit") {
      if (value === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          creditLimit: "Required",
        }))
      }
      else if (!/^\d{0,8}(\.\d{1,2})?$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          creditLimit: "Invalid Credit Limit",
        }))
      }
    }
    // ======================================panNumber=================================
    if (fieldName === "panNumber") {
      if (!panRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          panNumber: "Invalid PAN",
        }))
      }
      else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          panNumber: "",
        }))
      }
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    // ======================================gstNumber===============================
    if (fieldName === "gstNumber") {
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
      if (value === '') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          gstNumber: "Invalid GST Number",
        }))
      }
      else if (value) {
        if (!gstRegex.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            gstNumber: "Invalid GST Number",
          }))
        } else {
          if (value.length > 14) {
            if (!(formData.panNumber === value.substring(2, 12))) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                gstNumber: "PAN and GSt not matching",
              }))
            }
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              gstNumber: "",
            }))
          }
        }
      }
    }
    // ======================================aadharNumber=================================
    if (fieldName === "aadharNumber") {
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
      if (!aadhraRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          aadharNumber: "Invalid Aadhar",
        }))
      }
      else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          aadharNumber: "",
        }))
      }
    }
    // ======================================phoneNumber=================================
    if (fieldName === "phoneNumber") {
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
      if (value.trim().length < 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: "Invalid Number",
        }))
      }
      else if (value.trim().length > 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: "Invalid Number",
        }))
        value = value.substring(0, 10)
        setTimeout(() => {
          setErrors((prevErrors) => ({
            ...prevErrors,
            phoneNumber: "",
          }))
        }, 1000)
      }
      else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: "",
        }))
      }
    }
    // ======================================emailId=================================
    if (fieldName === "emailId") {
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
      if (!emailRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          emailId: "Invalid Email",
        }))
      }
      else if (value.trim().length > 50) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          emailId: "Value must be less than 50 Characters",
        }))
      }
      else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          emailId: "",
        }))
      }
    }
    // ======================================alternatePhoneNumber=================================
    if (fieldName === "alternatePhoneNumber") {
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
      if (value.trim().length < 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          alternatePhoneNumber: "Invalid Number",
        }))
      }
      else if (value.trim().length > 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          alternatePhoneNumber: "Invalid Number",
        }))
        value = value.substring(0, 10)
        setTimeout(() => {
          setErrors((prevErrors) => ({
            ...prevErrors,
            alternatePhoneNumber: "",
          }))
        }, 1000)
      }
      else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          alternatePhoneNumber: "",
        }))
      }
    }
    // ======================================bankName===============================
    if (fieldName === 'bankName') {
      if (value === "") {
        setFetchBranchMasterDD([])
        setFormData((prevdata) => ({
          ...prevdata,
          ifscCode: ''
        }))
        setErrors((prevErrors) => ({
          ...prevErrors,
          bankName: "Required",
        }))
      }
      else if (value) {
        try {
          const respone = await fetch_BranchMasterDD(value)
          setFormData((prevdata) => ({
            ...prevdata,
            ifscCode: ''
          }))
        } catch (error) {
          console.log(error);
        }
      }
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    // ======================================branchName===============================
    if (fieldName === "branchName") {
      if (value === "") {
        setFormData(prevdata => ({
          ...prevdata,
          ifscCode: ''
        }))
        setErrors((prevErrors) => ({
          ...prevErrors,
          branchName: "Required",
        }))
      } else if (value) {
        const branch = fetchBranchMasterDD.find(option => option.branch_code === value)
        setFormData(prevdata => ({
          ...prevdata,
          ifscCode: branch.ifsc_code
        }))
      }
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    // ======================================accNumber===============================
    if (fieldName === "accNumber") {
      if (value === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          accNumber: "Required",
        }))
      }
      else if (value.length < 5) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          accNumber: "Value Must be Greater Than 5 Charaters",
        }))
      }
      else if (value.length > 25) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          accNumber: "Value Must be Greater Than 25 Charaters",
        }))
        value = value.substring(0, 25)
      }
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErorrs = validation()
    setErrors(validationErorrs)
    console.log(validationErorrs);
    const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
    console.log(hasErrors);
    if (!hasErrors) {
      console.log("hi");
      const newRecord = {
        "user_code": formData.customerCode,
        "customer_name": formData.customerName,
        "customer_alias": formData.customerAlias,
        "status_id": Number(formData.customerStatus),
        "rel_type_id": Number(formData.relationType),
        "rel_name": formData.relationName,
        "customer_type": Number(formData.customerType),
        "rate_catag": Number(formData.rateCategory),
        "bill_catag": Number(formData.billCategory),
        "pay_mode": Number(formData.paymode),
        "bank_code": Number(formData.bankName),
        "branch_code": Number(formData.branchName),
        "account_no": formData.accNumber,
        "fd_lock": formData.FdLock,
        "fd_limit": formData.creditLimit,
        "pan_no": formData.panNumber,
        "gst_no": formData.gstNumber,
        "aadhar_no": Number(formData.aadharNumber),
        "mobile": Number(formData.phoneNumber),
        "email": formData.emailId,
        "officer_code": Number(formData.officerName),
      }
      try {
        // const response = await customerApi.customerMaster().create(newRecord)
        // if (response.data.Status === 1) {
        //   Swal.fire('Saved', 'Saved Sucessfully', 'success');
        //   setUpdateButton(true)
        //   setSaveButton(false)
        //   setcustomerCode(response.data.customer_code)
        //   setExtraDetails(true)
        //   localStorage.setItem("Navigation_state", true)
        // } else {
        //   Swal.fire({
        //     title: 'Error',
        //     text: `${response.data.Error}` || 'Unknown Error',
        //     icon: 'error',
        //   });
        // }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Unknown Error',
          icon: 'error',
        });
      }

    }

  }




  const handleBackdropMobileClick = (event) => {
    event.stopPropagation();
  };
  const handleClose = () => {
    navigate(-1)
  }



  const fetch_customerType_DD = async () => {
    try {
      const response = await customerApi.customerMaster().fetch_customerType_DD()
      if (response.status === 200) {
        setFetchCustomerTypeDD(response.data.items)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const fetch_BranchMasterDD = async (id) => {
    try {
      const response = await customerApi.customerMaster().fetch_BranchMaster_DD(id)
      if (response.status === 200) {
        setFetchBranchMasterDD(response.data.items)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const fetch_BankMasteDD = async () => {
    try {
      const response = await customerApi.customerMaster().fetch_BankMaster_DD()
      if (response.status === 200) {
        setFetchBankMasterDD(response.data.items)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const fetch_PayModeDD = async () => {
    try {
      const response = await customerApi.customerMaster().fetch_Paymode_DD()
      if (response.status === 200) {
        setFetchPayModeDD(response.data.items)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const fetch_BillCategoryDD = async () => {
    try {
      const response = await customerApi.customerMaster().fetch_BillCategory_DD()
      if (response.status === 200) {
        setfetchBillCategoryDD(response.data.items)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetch_RateCategoryDD = async () => {
    try {
      const response = await customerApi.customerMaster().fetch_RateCateogry_DD()
      if (response.status === 200) {
        setFetchRateCategoryDD(response.data.items)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const fetch_officerNames = async () => {
    try {
      const respone = await customerApi.customerMaster().fetch_OfficerName_DD()
      if (respone.status === 200) {
        setOfficerNames(respone.data.items)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetch_relationType_DD = async () => {
    try {
      const respone = await customerApi.customerMaster().fetch_relationType_DD()
      if (respone.status === 200) {
        setRealationTypeNames(respone.data.items)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const fetch_status_DD = async () => {
    try {
      const respone = await customerApi.customerMaster().fetch_status_DD()
      if (respone.status === 200) {
        setFetchStatusDD(respone.data.items)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (location.state !== null) {
      setUpdateButton(true)
      setSaveButton(false)
      setExtraDetails(true)
      const { customer_code } = location.state
      setcustomerCode(customer_code)
    }
    fetch_officerNames()
    fetch_relationType_DD()
    fetch_status_DD()
    fetch_RateCategoryDD()
    fetch_BillCategoryDD()
    fetch_PayModeDD()
    fetch_BankMasteDD()
    fetch_customerType_DD()
    document.title = 'Create Customer'
  }, [])
  return (
    <>
      <Paper sx={{ p: 2 }} elevation={3}>
        <Grid container spacing={2}>
          <Grid item md={12} lg={12} sm={12} xs={12}>
            {/* =========================Personal Details======================== */}
            <Typography variant="h6">
              Personal Details
            </Typography>
          </Grid>
          {/* =========================Customer Code======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Customer Code"
              variant="outlined"
              size='small'
              name='customerCode'
              required
              fullWidth
              sx={textFiledStyle}
              value={formData.customerCode}
              onChange={(e) => handleFieldChange("customerCode", e.target.value.toUpperCase())}
              error={Boolean(errors.customerCode)}
              helperText={errors.customerCode}
            />
          </Grid>
          {/* =========================Customer Name======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Customer Name"
              variant="outlined"
              size='small'
              fullWidth
              name='customerName'
              sx={textFiledStyle}
              required
              value={formData.customerName}
              onChange={(e) => handleFieldChange("customerName", e.target.value.toUpperCase())}
              error={Boolean(errors.customerName)}
              helperText={errors.customerName}
            />
          </Grid>
          {/* =========================Customer Alise======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Customer Alias"
              variant="outlined"
              size='small'
              fullWidth
              name='customerAlias'
              sx={textFiledStyle}
              value={formData.customerAlias}
              onChange={(e) => handleFieldChange("customerAlias", e.target.value.toUpperCase())}
              error={Boolean(errors.customerAlias)}
              helperText={errors.customerAlias}
            />
          </Grid>
          {/* =========================Status Dropdown======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={fetchStatusDD}
              sx={autoCompleteStyle}
              getOptionLabel={(options) => options.status_name}
              isOptionEqualToValue={(option, value) => option.status_id === value.status_id}
              value={fetchStatusDD.find(option => option.status_id === formData.customerStatus) || null}
              onChange={(e, v) => handleFieldChange("customerStatus", v?.status_id || "")}
              renderInput={(params) =>
                <TextField
                  {...params}
                  label="Status"
                  size='small'
                  fullWidth
                  required
                  error={Boolean(errors.customerStatus)}
                  helperText={errors.customerStatus}
                />}
            />
          </Grid>
          {/* =========================Relation Type Dropdown======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={realationTypeNames}
              sx={autoCompleteStyle}
              getOptionLabel={(options) => options.rel_name}
              isOptionEqualToValue={(option, value) => option.rel_type_id === value.rel_type_id}
              value={realationTypeNames.find(option => option.rel_type_id === formData.relationType) || null}
              onChange={(e, v) => handleFieldChange("relationType", v?.rel_type_id || "")}
              renderInput={(params) =>
                <TextField
                  {...params}
                  label="Relation Type"
                  size='small'
                  fullWidth
                  error={Boolean(errors.relationType)}
                  helperText={errors.relationType}
                />}
            />
          </Grid>
          {/* =========================Relationship Name======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Relation Name"
              variant="outlined"
              size='small'
              name='relationName'
              fullWidth
              sx={textFiledStyle}
              value={formData.relationName}
              onChange={(e) => handleFieldChange("relationName", e.target.value.toUpperCase())}
              error={Boolean(errors.relationName)}
              helperText={errors.relationName}
            />
          </Grid>
          {/* =========================Officer Name Dropdown======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={officerNames}
              size='small'
              fullWidth
              sx={autoCompleteStyle}
              getOptionLabel={(options) => options.officer_name}
              isOptionEqualToValue={(option, value) => option.officer_code === value.officer_code}
              value={officerNames.find(option => option.officer_code === formData.officerName) || null}
              onChange={(e, v) => handleFieldChange("officerName", v?.officer_code || "")}
              renderInput={(params) =>
                <TextField
                  {...params}
                  label="Officer Name"
                  error={Boolean(errors.officerName)}
                  helperText={errors.officerName}
                  required
                />}
            />
          </Grid>
          {/* =========================Registration Date======================== */}
          {/* defalut system date */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disableFuture
                label="Registration Date"
                sx={datePickerStyle}
                format='DD/MM/YYYY'
                value={formData.registrationDate}
                onChange={(value) => handleFieldChange("registrationDate", value)}
                slotProps={
                  {
                    textField:
                    {
                      size: "small",
                    }
                  }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

      </Paper>
      {/* =========================Paper end======================== */}
      <Paper sx={{ mt: 2, p: 2 }} elevation={3}>
        <Grid container spacing={2}>
          {/* =========================Customer Category======================== */}
          <Grid item md={12} lg={12} sm={12} xs={12}>
            <Typography variant="h6">
              Customer Category
            </Typography>
          </Grid>
          {/* =========================Customer Type======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={fetchCustomerTypeDD}
              sx={autoCompleteStyle}
              size='small'
              fullWidth
              getOptionLabel={(options) => options.customer_type_name}
              isOptionEqualToValue={(option, value) => option.customer_type_id === value.customer_type_id}
              value={fetchCustomerTypeDD.find(option => option.customer_type_id === formData.customerType) || null}
              onChange={(e, v) => handleFieldChange("customerType", v?.customer_type_id || "")}
              renderInput={(params) =>
                <TextField
                  {...params}
                  label="Customer Type"
                  error={Boolean(errors.customerType)}
                  helperText={errors.customerType}
                  required
                />}
            />
          </Grid>
          {/* =========================Bill category======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size='small'
              fullWidth
              sx={autoCompleteStyle}
              options={fetchBillCategoryDD}
              getOptionLabel={(options) => options.bill_catag_name}
              isOptionEqualToValue={(option, value) => option.bill_catag === value.bill_catag}
              value={fetchBillCategoryDD.find(option => option.bill_catag === formData.billCategory) || null}
              onChange={(e, v) => handleFieldChange("billCategory", v?.bill_catag || "")}
              renderInput={(params) =>
                <TextField
                  {...params}
                  label="Bill category"
                  error={Boolean(errors.billCategory)}
                  helperText={errors.billCategory}
                  required
                />}
            />
          </Grid>
          {/* =========================Rate category======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={fetchRateCategoryDD}
              sx={autoCompleteStyle}
              size='small'
              fullWidth
              getOptionLabel={(options) => options.catag_name}
              isOptionEqualToValue={(option, value) => option.catag_code === value.catag_code}
              value={fetchRateCategoryDD.find(option => option.catag_code === formData.rateCategory) || null}
              onChange={(e, v) => handleFieldChange("rateCategory", v?.catag_code || "")}
              renderInput={(params) =>
                <TextField
                  {...params}
                  label="Rate category"
                  error={Boolean(errors.rateCategory)}
                  helperText={errors.rateCategory}
                  required
                />}
            />
          </Grid>
          {/* =========================Paymode Dropdown======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <Autocomplete
              disablePortal
              options={fetchPayModeDD}
              size='small'
              sx={autoCompleteStyle}
              getOptionLabel={options => options.description}
              isOptionEqualToValue={(options, value) => options.pay_mode === value.pay_mode}
              value={fetchPayModeDD.find(option => option.pay_mode === formData.paymode) || null}
              onChange={(e, value) => handleFieldChange("paymode", value?.pay_mode || "")}
              renderInput={(params) =>
                <TextField
                  {...params}
                  label="Paymode"
                  error={Boolean(errors.paymode)}
                  helperText={errors.paymode}
                  required
                />}
            />
          </Grid>
        </Grid>
      </Paper>
      {/* =========================Paper end======================== */}
      {bankDetailsShow && (<Paper sx={{ mt: 2, p: 2 }} elevation={3}>
        <Grid container spacing={2}>
          {/* ========================= Bank Details======================== */}
          <Grid item md={12} lg={12} sm={12} xs={12}>
            <Typography variant="h6">
              Bank Details
            </Typography>
          </Grid>
          {/* =========================Bank name======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={fetchBankMasterDD}
              getOptionLabel={(options) => options.bank_name}
              isOptionEqualToValue={(option, value) => option.bank_code === value.bank_code}
              value={fetchBankMasterDD.find((option) => option.bank_code === formData.bankName) || null}
              onChange={(e, value) => handleFieldChange("bankName", value?.bank_code || '')}
              sx={autoCompleteStyle}
              fullWidth
              size='small'
              renderInput={(params) =>
                <TextField
                  {...params}
                  label="Bank Name"
                  error={Boolean(errors.bankName)}
                  helperText={errors.bankName}
                  required
                />}
            />
          </Grid>
          {/* =========================Branch name======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={fetchBranchMasterDD}
              getOptionLabel={options => options.branch_name}
              isOptionEqualToValue={(option, value) => option.branch_code === value.branch_code}
              value={fetchBranchMasterDD.find(option => option.branch_code === formData.branchName) || null}
              onChange={(event, value) => handleFieldChange("branchName", value?.branch_code || "")}
              sx={autoCompleteStyle}
              fullWidth
              size='small'
              renderInput={(params) =>
                <TextField
                  {...params}
                  label="Branch Name"
                  error={Boolean(errors.branchName)}
                  helperText={errors.branchName}
                  required
                />}
            />
          </Grid>
          {/* =========================IFSC Code======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="IFSC Code"
              variant="outlined"
              size='small'
              fullWidth
              sx={textFiledStyle}
              value={formData.ifscCode || ''}
              InputProps={{
                readOnly: true,
              }}
              required
            />
          </Grid>
          {/* =========================Account Number======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Account Number"
              variant="outlined"
              size='small'
              fullWidth
              required
              sx={textFiledStyle}
              value={formData.accNumber}
              onChange={(e) => handleFieldChange("accNumber", e.target.value.toUpperCase())}
              error={Boolean(errors.accNumber)}
              helperText={errors.accNumber}
            />
          </Grid>
          {/* =========================Button======================== */}
        </Grid>
      </Paper>)}
      {/* =========================Paper end======================== */}
      <Paper sx={{ mt: 2, p: 2 }} elevation={3}>
        <Grid container spacing={2}>
          {/* =========================Deposite Details======================== */}
          <Grid item md={12} lg={12} sm={12} xs={12}>
            <Typography variant="h6">
              Deposit Details
            </Typography>
          </Grid>
          {/* =========================Total Deposit Amount======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Total Deposit Amount"
              variant="outlined"
              size='small'
              fullWidth
              disabled
              sx={textFiledStyle}
              value={formData.totalDepositeAmount}
            />
          </Grid>
          {/* =========================FD Lock======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size='small'
              sx={autoCompleteStyle}
              options={fdLock}
              getOptionLabel={(options) => options.name}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              value={fdLock.find(option => option.value === formData.FdLock) || null}
              onChange={(e, v) => handleFieldChange("FdLock", v?.value || "")}
              renderInput={(params) =>
                <TextField
                  {...params}
                  label="FD Lock"
                  required
                  helperText={errors.FdLock}
                  error={Boolean(errors.FdLock)}
                />}
            />
          </Grid>
          {/* =========================Credit Limit======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Credit Limit"
              variant="outlined"
              size='small'
              fullWidth
              required
              sx={textFiledStyle}
              value={formData.creditLimit}
              onChange={(e) => handleFieldChange("creditLimit", e.target.value.replace(/[^0-9.]/g, '').replace(/(\.\d{2})\d*$/, '$1'))}
              error={Boolean(errors.creditLimit)}
              helperText={errors.creditLimit}
            />
          </Grid>
          {/* =========================Current Balance======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Current Balance"
              variant="outlined"
              size='small'
              fullWidth
              disabled
              sx={textFiledStyle}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
      </Paper>
      {/* =========================Paper end======================== */}
      <Paper sx={{ mt: 2, p: 2 }} elevation={3}>
        <Grid container spacing={2}>
          {/* =========================Tax Details======================== */}
          <Grid item md={12} lg={12} sm={12} xs={12}>
            <Typography variant="h6">
              Tax Details
            </Typography>
          </Grid>
          {/* =========================PAN Number======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="PAN Number"
              variant="outlined"
              size='small'
              fullWidth
              sx={textFiledStyle}
              value={formData.panNumber}
              onChange={(e) => handleFieldChange("panNumber", e.target.value.toUpperCase())}
              error={Boolean(errors.panNumber)}
              helperText={errors.panNumber}
            />
          </Grid>
          {/* =========================GST Number======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="GST Number"
              variant="outlined"
              size='small'
              fullWidth
              sx={textFiledStyle}
              value={formData.gstNumber}
              onChange={(e) => handleFieldChange("gstNumber", e.target.value.toUpperCase())}
              error={Boolean(errors.gstNumber)}
              helperText={errors.gstNumber}
            />
          </Grid>
          {/* =========================Aadhar Number======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Aadhar Number"
              variant="outlined"
              size='small'
              fullWidth
              sx={textFiledStyle}
              value={formData.aadharNumber}
              onChange={(e) => handleFieldChange("aadharNumber", e.target.value.replace(/[^0-9]/g, ''))}
              error={Boolean(errors.aadharNumber)}
              helperText={errors.aadharNumber}
            />
          </Grid>
          {/* =========================TCS Percentage======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="TCS Percentage"
              variant="outlined"
              size='small'
              fullWidth
              sx={textFiledStyle}
            // value={formData.aadharNumber}
            // onChange={(e) => handleFieldChange("aadharNumber", e.target.value.replace(/[^0-9]/g, ''))}
            // error={Boolean(errors.aadharNumber)}
            // helperText={errors.aadharNumber}
            />
          </Grid>
        </Grid>
      </Paper>
      {/* =========================Paper end======================== */}
      <Paper sx={{ mt: 2, p: 2 }} elevation={3}>
        <Grid container spacing={2}>
          {/* =========================Contact Details======================== */}
          <Grid item md={12} lg={12} sm={12} xs={12}>
            <Typography variant="h6">
              Contact Details
            </Typography>
          </Grid>
          {/* =========================Phone Number======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              size='small'
              fullWidth
              sx={textFiledStyle}
              value={formData.phoneNumber}
              onChange={(e) => handleFieldChange("phoneNumber", e.target.value.replace(/[^0-9]/g, ''))}
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber}
            />
          </Grid>
          {/* =========================Email ID======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Email ID"
              variant="outlined"
              size='small'
              fullWidth
              sx={textFiledStyle}
              value={formData.emailId}
              onChange={(e) => handleFieldChange("emailId", e.target.value)}
              error={Boolean(errors.emailId)}
              helperText={errors.emailId}
            />
          </Grid>
          {/* =========================Alternate Phone Number======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Alternate Phone Number"
              variant="outlined"
              size='small'
              fullWidth
              sx={textFiledStyle}
              value={formData.alternatePhoneNumber}
              onChange={(e) => handleFieldChange("alternatePhoneNumber", e.target.value.replace(/[^0-9]/g, ''))}
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber}
            />
          </Grid>
          {/* =========================btn======================== */}
          <Grid item md={12} lg={12} sm={12} xs={12}>
            <Stack spacing={{ xs: 1, sm: 1, md: 1 }} direction={{ xs: 'column', sm: 'row' }}>
              {/* =========================Add Deposite button======================== */}
              {extraDetails && (<>
                <Button
                  variant='contained'
                  size='small'
                  onClick={handleMobileOpen}
                >
                  Add Deposit
                </Button>
                <Button
                  variant='contained'
                  size='small'
                  onClick={HandleGSTDeatilsOpen}
                >
                  GST Details
                </Button>
                <Button
                  variant='contained'
                  size='small'
                  onClick={handleAddressDetailsOpen}
                >
                  Address Details
                </Button>
                <Button
                  variant='contained'
                  size='small'
                //onClick={HandleGSTDeatilsOpen}
                >
                  Add Documents
                </Button>
              </>
              )}
              <Modal
                open={mobileOpen}
                onClose={handleMobileClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                BackdropProps={{ onClick: handleBackdropMobileClick }}
              >
                <Box sx={style}>
                  <DepositDetails
                    closeDepositeDetails={handleMobileClose}
                    customerCode={customerCode}
                    userCode={formData.customerCode}
                    customerName={formData.customerName}
                  />
                </Box>
              </Modal>
              <Modal
                open={GSTDeatils}
                onClose={HandleGSTDetailsClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                BackdropProps={{ onClick: handleBackdropMobileClick }}
              >
                <Box sx={style}>
                  <AddGSTDetails
                    closeGSTDetails={HandleGSTDetailsClose}
                    customerCode={customerCode}
                    userCode={formData.customerCode}
                    customerName={formData.customerName}
                  />
                </Box>
              </Modal>
              <Modal
                open={AddressDetails}
                onClose={HandleAddressDetailsClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                BackdropProps={{ onClick: handleBackdropMobileClick }}
              >
                <Box sx={style}>
                  <AddAddress
                    CloseAddressDetails={HandleAddressDetailsClose}
                    customerCode={customerCode}
                    userCode={formData.customerCode}
                    customerName={formData.customerName}
                  />
                </Box>
              </Modal>
              {/* =========================btn======================== */}
              {saveButton && (
                <Button
                  variant="contained"
                  size='small'
                  onClick={(e) => handleSubmit(e)}
                >Save
                </Button>
              )}
              {updateButton && (
                <Button
                  variant="contained"
                  size='small'
                >Update
                </Button>
              )}
              <Button
                variant="contained"
                size='small'
                color="error"
                onClick={() => handleClose()}
              >
                Close
              </Button>
            </Stack>
          </Grid>
          {/* ================================================= */}
        </Grid>
      </Paper>
      {/* =========================Paper end======================== */}
    </>
  )
}
