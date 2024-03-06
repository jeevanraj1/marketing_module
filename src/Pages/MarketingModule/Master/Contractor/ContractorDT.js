import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Grid, Typography, Paper, Button, TextField, Stack, Autocomplete, Box, Modal, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material'
import { ContractorAPi } from '../../../Api';
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ContractorDeposite from './ContractorDeposite';
import Swal from 'sweetalert2';

const textFiledStyle = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "black", borderWidth: "2px" },
  },
  "& input": {
    height: "11px",
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
  "& label": {
    height: "11px",
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    fontWeight: "bold",
    color:"black",
  },
}

const autoCompleteStyle = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "black", borderWidth: "2px" },
  },
  "& input": {
    height: "11px",
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
  "& label": {
    height: "14px",
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    fontWeight: "bold",
    color:"black",
    marginTop:"-2px",
  },
}
const datePickerStyle = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
      borderWidth: "2px",
      height: "33px",
      paddingBottom: "5px",

    },
  },
  "& input": {
    height: "11px",
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
    fontSize: 14,
    fontWeight: "bold",
    marginTop: "-1px",
  },
}
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

const TDS = [
  { name: "YES", value: "Y" },
  { name: "NO", value: "N" }
]

const Contractor_Detail_Type = [
  { name: "TEMPORARY", value: "T" },
  { name: "PERMANENT", value: "P" },
]

const Contract_closed = [
  { name: "ACTIVE", value: "Y" },
  { name: "INACTIVE", value: "N" },
]
export default function ContractorDT() {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const [searchByCode, setSearchByCode] = useState(true)
  const [searchByName, setSearchByName] = useState(false)
  const [rows, setRows] = useState([]);
  const [childSaveButton, setchildSaveButton] = useState(true);
  const [childUpdateButton, setchildUpdateButton] = useState(false);
  const [masterSaveButton, setMasterSaveButton] = useState(true);
  const [masterUpdateButton, setMasterUpdateButton] = useState(false);
  const [MasterClearButton, setMasterClearButton] = useState(true);
  const [contractorDeposite, setContractorDeposite] = useState(false);
  const [masterFormData, setMasterFormData] = useState({
    usersCode: '',
    contractorName: '',
    tds: '',
    tdsPercentage: '',
    panNo: '',
    surcharge: '',
    phoneNumber: '',
    bankName: '',
    branchName: '',
    ifcsCode: '',
    accountNumber: '',
  });
  const [masterErrors, setMasterErrors] = useState({});
  const [bankNames, setBankNames] = useState([]);
  const [branchNames, setBranchNames] = useState([]);
  const [contractorCode, setContractorCode] = useState(null);
  const [routeNames, setRouteNames] = useState([]);
  const [childFormData, setChildFormData] = useState({
    routeName: '',
    periodFrom: '',
    periodTo: "",
    contractDate: "",
    ratePerkm: '',
    vehicleNumber: '',
    vehicleCapacity: '',
    orderNumber: '',
    orderDate: '',
    contractType: '',
    contractClosed: '',
    periodOfExtension: '',
    extensionNumber: '',
    contractorDeposit: '',
  });
  const [contractorDeatilsCode, setContractorDeatilsCode] = useState(null);
  const [showGrid, setShowGrid] = useState(false);
  const [showContractorDetails, setShowContractorDetails] = useState(false);
  const [extraDetails, setExtraDetails] = useState(false);
  const [DDcontractorCode, setDDcontractorCode] = useState([]);
  const [DDContractorName, setDDContractorName] = useState([]);
  const [searchContractorCode, setSearchContractorCode] = useState(null);


  const [chlidErrors, setChlidErrors] = useState({});
  const handleRadio = (e) => {
    const { value } = e.target;
    if (value === 'Code') {
      setSearchByCode(true);
      setSearchByName(false);
    } else if (value === 'Name') {
      setSearchByCode(false);
      setSearchByName(true);
    }
  }

  const getRowClassName = (params) => {
    const rowIndex = params.indexRelativeToCurrentPage;
    return rowIndex % 2 === 0 ? "row-even" : "row-odd";
  };
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    contractor_code: false,
    contractor_code2: false,
    contractor_type: false,
    gst_no: false,
    cess: false,
    bank_code: false,
    branch_code: false,
    tds: false,
    cont_det_code: false,
    notification_number: false,
    notification_date: false,
    route_code: false,
    route_length: false,
  })
  const handleContractorDepositeOpen = () => setContractorDeposite(true)
  const handleContractorDepositeClose = () => setContractorDeposite(false)
  const handleBackdropMobileClick = (event) => {
    event.stopPropagation();
  };
  const Mastervalidation = () => {
    const newErrors = {}
    // =====================================usersCode==========================================
    if (masterFormData.usersCode === "") newErrors.usersCode = "Required"
    else if (masterFormData.usersCode !== "") newErrors.usersCode = masterErrors.usersCode
    // =====================================contractorName==========================================
    if (masterFormData.contractorName === "") newErrors.contractorName = "Required"
    else if (masterFormData.contractorName !== "") newErrors.contractorName = masterErrors.contractorName
    // =====================================tds==========================================
    if (masterFormData.tds === "") newErrors.tds = "Required"
    else if (masterFormData.tds !== "") newErrors.tds = masterErrors.tds
    // =====================================tdsPercentage==========================================
    if (masterFormData.tdsPercentage === "") newErrors.tdsPercentage = "Required"
    else if (masterFormData.tdsPercentage !== "") newErrors.tdsPercentage = masterErrors.tdsPercentage
    // =====================================panNo==========================================
    if (masterFormData.panNo === "") newErrors.panNo = "Required"
    else if (masterFormData.panNo !== "") newErrors.panNo = masterErrors.panNo
    // =====================================surcharge==========================================
    if (masterFormData.surcharge === "") newErrors.surcharge = "Required"
    else if (masterFormData.surcharge !== "") newErrors.surcharge = masterErrors.surcharge
    // =====================================phoneNumber==========================================
    if (masterFormData.phoneNumber === "") newErrors.phoneNumber = "Required"
    else if (masterFormData.phoneNumber !== "") newErrors.phoneNumber = masterErrors.phoneNumber
    // =====================================bankName==========================================
    if (masterFormData.bankName === "") newErrors.bankName = "Required"
    else if (masterFormData.bankName !== "") newErrors.bankName = masterErrors.bankName
    // =====================================branchName==========================================
    if (masterFormData.branchName === "") newErrors.branchName = "Required"
    else if (masterFormData.branchName !== "") newErrors.branchName = masterErrors.branchName
    // =====================================accountNumber==========================================
    if (masterFormData.accountNumber === "") newErrors.accountNumber = "Required"
    else if (masterFormData.accountNumber !== "") newErrors.accountNumber = masterErrors.accountNumber
    return newErrors
  }
  const MasterHandleFieldChange = async (fieldName, value) => {
    localStorage.setItem("Navigation_state", false)
    setMasterErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: ""
    }))
    //=================================usersCode==============================
    if (fieldName === "usersCode") {
      if (value?.trim() === "") {
        setMasterErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Required"
        }))
      }
      else if (value?.trim().length > 10) {
        setMasterErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Value Must Be less than 10 Charaters"
        }))
        value = value.substring(0, 10)
        setTimeout(() => {
          setMasterErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: ""
          }))
        }, [])
      }
      setMasterFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    //=================================contractorName==============================
    if (fieldName === "contractorName") {
      if (value?.trim() === "") {
        setMasterErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Required"
        }))
      }
      else if (value?.trim().length > 40) {
        setMasterErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Value Must Be less than 40 Charaters"
        }))
        value = value.substring(0, 40)
        setTimeout(() => {
          setMasterErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: ""
          }))
        }, [])
      }
      else if (value?.trim().length < 3) {
        setMasterErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Value Must Be more than 3 Charaters"
        }))
      }
      setMasterFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    //=================================tds==============================
    if (fieldName === "tds") {
      if (value === "") {
        setMasterErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Required"
        }))
      }
      else if (value) {
      }
      setMasterFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    //=================================tdsPercentage==============================
    if (fieldName === 'tdsPercentage') {
      setMasterFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
      if (value?.trim() === '') {
        setMasterErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Required",
        }));
      }
      else if (!/^\d{0,3}(\.\d{1,3})?$/.test(value)) {
        setMasterErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Invalid Percentage",
        }))
      }
    }
    //=================================panNo==============================
    if (fieldName === "panNo") {
      if (!panRegex.test(value)) {
        setMasterErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Invalid PAN",
        }))
      }
      else {
        setMasterErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "",
        }))
      }
      setMasterFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    //=================================surcharge==============================
    if (fieldName === "surcharge") {
      if (value?.trim() === "") {
        setMasterErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Required"
        }))
      }
      else if (value?.trim().length > 10) {
        setMasterErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Value Must Be less than 10 Charaters"
        }))
        value = value.substring(0, 10)
        setTimeout(() => {
          setMasterErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: ""
          }))
        }, [])
      }
      setMasterFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    //=================================phoneNumber==============================
    if (fieldName === "phoneNumber") {
      if (value?.trim() === "") {
        setMasterErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Required"
        }))
      }
      else if (value?.trim().length > 10) {
        setMasterErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Value Must Be less than 10 Charaters"
        }))
        value = value.substring(0, 10)
        setTimeout(() => {
          setMasterErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: ""
          }))
        }, [])
      }
      else if (value?.trim().length < 10) {
        setMasterErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Invalid Phone Number"
        }))
      }
      else {
        setMasterErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: ""
        }))
      }
      setMasterFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    //=================================bankName==============================
    if (fieldName === "bankName") {
      if (value === "") {
        setMasterErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Required"
        }))
        setBranchNames([])
        setMasterFormData((prevdata) => ({
          ...prevdata,
          ifcsCode: ""
        }))
      }
      else if (value) {
        const bankName = bankNames.find(item => item.bank_code === value)
        if (bankName) {
          const { bank_code } = bankName
          const response = await ContractorAPi.ContractorAPi_master().fetch_BranchMaster_DD(bank_code)
          console.log(response);
          if (response.status === 200) {
            setBranchNames(response.data.items)
          }
        }
      }
      setMasterFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    //=================================branchName==============================
    if (fieldName === "branchName") {
      if (value === "") {
        setMasterErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Required"
        }))
        setMasterFormData((prevdata) => ({
          ...prevdata,
          ifcsCode: ""
        }))
      }
      else if (value) {
        const branchName = branchNames.find(item => item.branch_code === value)
        if (branchName) {
          const { ifsc_code } = branchName
          setMasterFormData((prevdata) => ({
            ...prevdata,
            ifcsCode: ifsc_code
          }))
        }
      }
      setMasterFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    //=================================ifcsCode==============================
    //=================================accountNumber==============================
    if (fieldName === "accountNumber") {
      if (value?.trim() === "") {
        setMasterErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Required"
        }))
      }
      else if (value?.trim().length > 25) {
        setMasterErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Value Must Be less than 25 Charaters"
        }))
        value = value.substring(0, 25)
        setTimeout(() => {
          setMasterErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: ""
          }))
        }, [])
      }
      setMasterFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
  }
  const MasterClear = () => {
    setMasterErrors({})
    setMasterFormData({
      usersCode: '',
      contractorName: '',
      tds: '',
      tdsPercentage: '',
      panNo: '',
      surcharge: '',
      phoneNumber: '',
      bankName: '',
      branchName: '',
      ifcsCode: '',
      accountNumber: '',
    })
    setMasterSaveButton(true)
    setMasterUpdateButton(false)
    setBranchNames([])
    setSearchContractorCode()
    setShowGrid(false)
    setShowContractorDetails(false)
    localStorage.setItem("Navigation_state", true)
  }
  const MasterHandleUpdate = async (e) => {
    e.preventDefault()
    const validationErorrs = Mastervalidation()
    setMasterErrors(validationErorrs)
    const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
    if (!hasErrors) {
      const newRecord = {
        "contractor_name": masterFormData.contractorName.trim(),
        "users_code": masterFormData.usersCode.trim(),
        "bank_code": Number(masterFormData.bankName),
        "branch_code": Number(masterFormData.branchName),
        "account_no": masterFormData.accountNumber.trim(),
        "pan_no": masterFormData.panNo.trim(),
        "cess": null,
        "tds": masterFormData.tds,
        "sur_chg": Number(masterFormData.surcharge),
        "phone_no": Number(masterFormData.phoneNumber),
        "gst_no": null,
        "tds_prc": Number(masterFormData.tdsPercentage)
      }
      try {
        const response = await ContractorAPi.ContractorAPi_master().update(contractorCode, newRecord)
        console.log(response);
        if (response.data.Status === 1) {
          Swal.fire({
            title: 'Saved',
            text: 'Updated Sucessfully',
            icon: 'success',
            customClass: {
              container: 'custom-swal-container'
            }
          });
          fetchData(contractorCode)
          MasterClear();
          localStorage.setItem("Navigation_state", true)
          setMasterSaveButton(true)
          setMasterUpdateButton(false)
        } else {
          Swal.fire({
            title: 'Error',
            text: `${response.data.Error}` || 'Unknown Error',
            icon: 'error',
            customClass: {
              container: 'custom-swal-container'
            }
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Unknown Error',
          icon: 'error',
          customClass: {
            container: 'custom-swal-container'
          }
        });
      }
    }
  }
  const MasterHandleSubmit = async (e) => {
    e.preventDefault()
    const validationErorrs = Mastervalidation()
    setMasterErrors(validationErorrs)
    console.log(validationErorrs);
    const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
    if (!hasErrors) {
      const newRecord = {
        "contractor_name": masterFormData.contractorName.trim(),
        "users_code": masterFormData.usersCode.trim(),
        "bank_code": Number(masterFormData.bankName),
        "branch_code": Number(masterFormData.branchName),
        "account_no": masterFormData.accountNumber.trim(),
        "pan_no": masterFormData.panNo.trim(),
        "cess": null,
        "tds": masterFormData.tds,
        "sur_chg": Number(masterFormData.surcharge),
        "phone_no": Number(masterFormData.phoneNumber),
        "gst_no": null,
        "tds_prc": Number(masterFormData.tdsPercentage)
      }
      try {
        const response = await ContractorAPi.ContractorAPi_master().create(newRecord)
        if (response.data.Status === 1) {
          Swal.fire({
            title: 'Saved',
            text: 'Saved Sucessfully',
            icon: 'success',
            customClass: {
              container: 'custom-swal-container'
            }
          });
          MasterClear();
          localStorage.setItem("Navigation_state", true)
          setMasterSaveButton(true)
          setMasterUpdateButton(false)
          setContractorCode(response.data.contractor_code)
          setShowContractorDetails(true)
        } else {
          Swal.fire({
            title: 'Error',
            text: `${response.data.Error}` || 'Unknown Error',
            icon: 'error',
            customClass: {
              container: 'custom-swal-container'
            }
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Unknown Error',
          icon: 'error',
          customClass: {
            container: 'custom-swal-container'
          }
        });
      }
    }
  }

  const columns = [
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <>
          <ModeEditOutlineRoundedIcon
            sx={{ color: "blue", marginRight: 2 }}
            style={{
              cursor: "pointer",
              opacity: 1,
              transition: "opacity 0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.opacity = 0.7;
              e.currentTarget.style.color = "lightblue";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.opacity = 1;
              e.currentTarget.style.color = "blue";
            }}
            onClick={() => { handleEdit(params.row) }}
          >
            Edit
          </ModeEditOutlineRoundedIcon>
        </>
      ),
    },
    {
      field: 'contractor_code2',
      headerName: 'Contractor Code',
      width: 150,
    },
    {
      field: 'cont_det_code',
      headerName: 'Contractor Deatils Code',
      width: 150,
    },
    {
      field: 'contractor_name',
      headerName: 'Contractor Name',
      width: 150,
    },
    {
      field: 'contractor_type',
      headerName: 'Contractor Type',
      width: 150,
    },
    {
      field: 'users_code',
      headerName: 'Contractor Code',
      width: 150,
    },
    {
      field: 'bank_code',
      headerName: 'Bank Code',
      width: 150,
      align: "right"
    },
    {
      field: 'branch_code',
      headerName: 'Branch Code',
      width: 150,
      align: "right"
    },
    {
      field: 'account_no',
      headerName: 'Account Number',
      width: 150,
      align: "right",
      type: "number",
    },
    {
      field: 'pan_no',
      headerName: 'PAN Number',
      width: 150,
    },
    {
      field: 'cess',
      headerName: 'Cess',
      width: 150,
    },
    {
      field: 'tds',
      headerName: 'TDS',
      width: 150,
    },
    {
      field: 'sur_chg',
      headerName: 'Surcharge',
      width: 150,
      align: "right",
      type: "number",
    },
    {
      field: 'phone_no',
      headerName: 'Phone Number',
      width: 150,
      align: "right",
      // type:"number",
    },
    {
      field: 'gst_no',
      headerName: 'Gst Number',
      width: 150,
    },
    {
      field: 'tds_prc',
      headerName: 'TDS Percentage',
      align: "right",
      type: "number",
      width: 150,
    },
    {
      field: 'route_name',
      headerName: 'Route Name',
      width: 150,
    },
    {
      field: 'route_code',
      headerName: 'Route Code',
      width: 150,
    },
    {
      field: 'period_from',
      headerName: 'Period from',
      width: 150,
      valueGetter: (params) => {
        const value = params.row.period_from
        return dayjs(value).format("DD/MMM/YYYY")
      }
    },
    {
      field: 'period_to',
      headerName: 'Period To',
      width: 150,
      valueGetter: (params) => dayjs(params.row.period_to).format("DD/MMM/YYYY")
    },
    {
      field: 'contract_date',
      headerName: 'contract_date',
      width: 150,
      valueGetter: (params) => {
        const value = params.row.contract_date
        return dayjs(value).format("DD/MMM/YYYY")
      }
    },
    {
      field: 'rate_per_km',
      headerName: 'Rate Per Km',
      width: 150,
      align: "right",
      type: "number",
    },
    {
      field: 'vehicle_no',
      headerName: 'Vehicle Number',
      width: 150,
      align: "right",
      type: "number",
    },
    {
      field: 'vehicle_capacity',
      headerName: 'Vehicle Capacity',
      width: 150,
      align: "right",
      type: "number",
    },
    {
      field: 'order_number',
      headerName: 'Order Number',
      width: 150,
      align: "right",
      type: "number",
    },
    {
      field: 'order_date',
      headerName: 'Order Date',
      width: 150,
      valueGetter: (params) => dayjs(params.row.order_date).format("DD/MMM/YYYY")
    },
    {
      field: 'notification_number',
      headerName: 'Notification Number',
      width: 150,
      align: "right",
      type: "number",
    },
    {
      field: 'notification_date',
      headerName: 'Notification Date',
      width: 150,
    },
    {
      field: 'period_of_extension',
      headerName: 'Period of extension',
      width: 150,
      valueGetter: (params) => dayjs(params.row.period_of_extension).format("DD/MMM/YYYY")
    },
    {
      field: 'extension_order_no',
      headerName: 'extension Order Number',
      width: 150,
      align: "right",
      type: "number",
    },
    {
      field: 'contract_closed',
      headerName: 'Contract Closed',
      width: 150,
      valueGetter: (params) => {
        const value = params.row.contract_closed
        return value === "Y" ? "YES" : "NO"
      }
    },
    {
      field: 'route_length',
      headerName: 'Route Length',
      width: 150,
    },
    {
      field: 'contract_type',
      headerName: 'Contract Type',
      width: 150,
      valueGetter: (params) => {
        const value = params.row.contract_type
        return value === "T" ? "TEMPORARY" : "PERMANENT"
      }
    },
  ];
  const handleEdit = async (row) => {
    console.log(row);
    setMasterErrors({})
    setContractorCode(row.contractor_code2)
    setMasterSaveButton(false)
    setMasterUpdateButton(true)
    MasterHandleFieldChange("branchName", row.branch_code)
    MasterHandleFieldChange("bankName", row.bank_code)
    try {
      const response = await ContractorAPi.ContractorAPi_master().fetch_ifcs(row.branch_code)
      setMasterFormData((prevdata) => ({
        ...prevdata,
        usersCode: row.users_code,
        contractorName: row.contractor_name,
        tds: row.tds,
        tdsPercentage: row.tds_prc,
        panNo: row.pan_no,
        surcharge: row.sur_chg,
        phoneNumber: row.phone_no,
        bankName: row.bank_code,
        // branchName: row.branch_code,
        ifcsCode: response.data.items[0].ifsc_code,
        accountNumber: row.account_no,
      }))
    } catch (error) {
      console.log(error);
    }
    if (row.cont_det_code) {
      setchildSaveButton(false)
      setchildUpdateButton(true)
      setChildFormData((prevdate) => ({
        ...prevdate,
        routeName: row.route_code,
        periodFrom: dayjs(row.period_from),
        periodTo: dayjs(row.period_to),
        contractDate: dayjs(row.contract_date),
        ratePerkm: row.rate_per_km,
        vehicleNumber: row.vehicle_no,
        vehicleCapacity: row.vehicle_capacity,
        orderNumber: row.order_number,
        orderDate: dayjs(row.order_date),
        contractType: row.contract_type,
        contractClosed: row.contract_closed,
        periodOfExtension: dayjs(row.period_of_extension),
        extensionNumber: row.extension_order_no,
      }))
      setContractorDeatilsCode(row.cont_det_code)
      setExtraDetails(true)
    }

    localStorage.setItem("Navigation_state", true)
  }
  const childValidation = () => {
    const newErrors = {}
    // ======================================routeName===============================================
    if (childFormData.routeName === "") newErrors.routeName = "Required"
    else if (childFormData.routeName !== "") newErrors.routeName = chlidErrors.routeName
    // ======================================periodFrom==============================================
    if (childFormData.periodFrom === "") newErrors.periodFrom = "Required"
    else if (childFormData.periodFrom !== "") newErrors.periodFrom = chlidErrors.periodFrom
    // ======================================periodTo================================================
    if (childFormData.periodTo === "") newErrors.periodTo = "Required"
    else if (childFormData.periodTo !== "") newErrors.periodTo = chlidErrors.periodTo
    // ======================================contractDate============================================
    if (childFormData.contractDate === "") newErrors.contractDate = "Required"
    else if (childFormData.contractDate !== "") newErrors.contractDate = chlidErrors.contractDate
    // ======================================ratePerkm===============================================
    if (childFormData.ratePerkm === "") newErrors.ratePerkm = "Required"
    else if (childFormData.ratePerkm !== "") newErrors.ratePerkm = chlidErrors.ratePerkm
    // ======================================vehicleNumber===========================================
    if (childFormData.vehicleNumber === "") newErrors.vehicleNumber = "Required"
    else if (childFormData.vehicleNumber !== "") newErrors.vehicleNumber = chlidErrors.vehicleNumber
    // ======================================vehicleCapacity=========================================
    if (childFormData.vehicleCapacity === "") newErrors.vehicleCapacity = "Required"
    else if (childFormData.vehicleCapacity !== "") newErrors.vehicleCapacity = chlidErrors.vehicleCapacity
    // ======================================orderNumber============================================
    if (childFormData.orderNumber === "") newErrors.orderNumber = "Required"
    else if (childFormData.orderNumber !== "") newErrors.orderNumber = chlidErrors.orderNumber
    // ======================================orderDate============================================
    if (childFormData.orderDate === "") newErrors.orderDate = "Required"
    else if (childFormData.orderDate !== "") newErrors.orderDate = chlidErrors.orderDate
    // ======================================contractType============================================
    if (childFormData.contractType === "") newErrors.contractType = "Required"
    else if (childFormData.contractType !== "") newErrors.contractType = chlidErrors.contractType
    // ======================================contractClosed============================================
    if (childFormData.contractClosed === "") newErrors.contractClosed = "Required"
    else if (childFormData.contractClosed !== "") newErrors.contractClosed = chlidErrors.contractClosed
    // ======================================periodOfExtension============================================
    if (childFormData.periodOfExtension === "") newErrors.periodOfExtension = "Required"
    else if (childFormData.periodOfExtension !== "") newErrors.periodOfExtension = chlidErrors.periodOfExtension
    // ======================================extensionNumber============================================
    if (childFormData.extensionNumber === "") newErrors.extensionNumber = "Required"
    else if (childFormData.extensionNumber !== "") newErrors.extensionNumber = chlidErrors.extensionNumber
    // ======================================contractorDeposit============================================
    return newErrors
  }
  const childHandleFieldChange = (fieldName, value) => {
    localStorage.setItem("Navigation_state", false)
    setChlidErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: ''
    }))
    // ======================================routeName===============================================
    if (fieldName === "routeName") {
      if (value === "") {
        setChlidErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Required"
        }))
      }
      else if (value) {
      }
      setChildFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    // ======================================periodFrom==============================================
    if (fieldName === "periodFrom") {
      if (value === "") {
        setChlidErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Required"
        }))
      }
      else if (value) {
      }
      setChildFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    // ======================================periodTo================================================
    if (fieldName === "periodTo") {
      if (value === "") {
        setChlidErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Required"
        }))
      }
      else if (value) {
      }
      setChildFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    // ======================================contractDate============================================
    if (fieldName === "contractDate") {
      if (value === "") {
        setChlidErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Required"
        }))
      }
      else if (value) {
      }
      setChildFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    // ======================================ratePerkm===============================================
    if (fieldName === 'ratePerkm') {
      setChildFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
      if (value === '') {
        setChlidErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Required",
        }));
      }
      else if (!/^\d{0,8}(\.\d{1,2})?$/.test(value)) {
        setChlidErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Invalid Rate Per km",
        }))
      }
    }
    // ======================================vehicleNumber===========================================
    if (fieldName === "vehicleNumber") {
      if (value?.trim() === "") {
        setChlidErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Required"
        }))
      }
      else if (value?.trim().length > 10) {
        setChlidErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Value Must Be less than 10 Charaters"
        }))
        value = value.substring(0, 10)
        setTimeout(() => {
          setChlidErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: ""
          }))
        }, [])
      }
      setChildFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    // ======================================vehicleCapacity=========================================
    if (fieldName === "vehicleCapacity") {
      if (value?.trim() === "") {
        setChlidErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Required"
        }))
      }
      else if (value?.trim().length > 10) {
        setChlidErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Value Must Be less than 10 Charaters"
        }))
        value = value.substring(0, 10)
        setTimeout(() => {
          setChlidErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: ""
          }))
        }, [])
      }
      setChildFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    // ======================================orderNumber============================================
    if (fieldName === "orderNumber") {
      if (value?.trim() === "") {
        setChlidErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Required"
        }))
      }
      else if (value?.trim().length > 10) {
        setChlidErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Value Must Be less than 10 Charaters"
        }))
        value = value.substring(0, 10)
        setTimeout(() => {
          setChlidErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: ""
          }))
        }, [])
      }
      setChildFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    // ======================================orderDate============================================
    if (fieldName === "orderDate") {
      if (value === "") {
        setChlidErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Required"
        }))
      }
      else if (value) {
      }
      setChildFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    // ======================================contractType============================================
    if (fieldName === "contractType") {
      if (value === "") {
        setChlidErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Required"
        }))
      }
      else if (value) {
      }
      setChildFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    // ======================================contractClosed============================================
    if (fieldName === "contractClosed") {
      if (value === "") {
        setChlidErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Required"
        }))
      }
      else if (value) {
      }
      setChildFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    // ======================================periodOfExtension============================================
    if (fieldName === "periodOfExtension") {
      if (value === "") {
        setChlidErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Required"
        }))
      }
      else if (value) {
      }
      setChildFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    // ======================================extensionNumber============================================
    if (fieldName === "extensionNumber") {
      if (value?.trim() === "") {
        setChlidErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Required"
        }))
      }
      else if (value?.trim().length > 10) {
        setChlidErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Value Must Be less than 10 Charaters"
        }))
        value = value.substring(0, 10)
        setTimeout(() => {
          setChlidErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: ""
          }))
        }, [])
      }
      setChildFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    // ======================================contractorDeposit============================================
  }
  const handleChildClear = () => {
    setChlidErrors({})
    setChildFormData({
      routeName: '',
      periodFrom: '',
      periodTo: "",
      contractDate: "",
      ratePerkm: '',
      vehicleNumber: '',
      vehicleCapacity: '',
      orderNumber: '',
      orderDate: '',
      contractType: '',
      contractClosed: '',
      periodOfExtension: '',
      extensionNumber: '',
      contractorDeposit: '',
    })
    setchildSaveButton(true)
    setchildUpdateButton(false)
    localStorage.setItem("Navigation_state", true)
  }
  const handleChildSave = async (e) => {
    e.preventDefault()
    const validationErorrs = childValidation()
    setChlidErrors(validationErorrs)
    console.log(validationErorrs);
    const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
    if (!hasErrors) {
      const newRecord = {
        "contractor_code": contractorCode,
        "route_code": Number(childFormData.routeName),
        "period_from": childFormData.periodFrom,
        "period_to": childFormData.periodTo,
        "contract_date": childFormData.contractDate,
        "rate_per_km": childFormData.ratePerkm,
        "vehicle_no": childFormData.vehicleNumber,
        "vehicle_capacity": childFormData.vehicleCapacity,
        "order_number": childFormData.orderNumber,
        "order_date": childFormData.orderDate,
        'notification_number': null,
        "notification_date": null,
        "period_of_extension": childFormData.periodOfExtension,
        'extension_order_no': childFormData.extensionNumber,
        'contract_closed': childFormData.contractClosed,
        "route_length": null,
        "contract_type": childFormData.contractType
      }
      try {
        console.log(newRecord);
        const response = await ContractorAPi.ContractorAPi_master().contractDetailsCreate(newRecord)
        console.log(response);
        if (response.data.Status === 1) {
          Swal.fire({
            title: 'Saved',
            text: 'Saved Sucessfully',
            icon: 'success',
            customClass: {
              container: 'custom-swal-container'
            }
          });
          handleChildClear()
          localStorage.setItem("Navigation_state", true)
          setShowGrid(true)
          fetchData(contractorCode)
        } else {
          Swal.fire({
            title: 'Error',
            text: `${response.data.Error}` || 'Unknown Error',
            icon: 'error',
            customClass: {
              container: 'custom-swal-container'
            }
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Unknown Error',
          icon: 'error',
          customClass: {
            container: 'custom-swal-container'
          }
        });
      }
    }
  }
  const handleChildUpdate = async (e) => {
    e.preventDefault()
    const validationErorrs = childValidation()
    setChlidErrors(validationErorrs)
    console.log(validationErorrs);
    const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
    if (!hasErrors) {
      const newRecord = {
        "contractor_code": contractorCode,
        "route_code": Number(childFormData.routeName),
        "period_from": childFormData.periodFrom,
        "period_to": childFormData.periodTo,
        "contract_date": childFormData.contractDate,
        "rate_per_km": childFormData.ratePerkm,
        "vehicle_no": childFormData.vehicleNumber,
        "vehicle_capacity": childFormData.vehicleCapacity,
        "order_number": childFormData.orderNumber,
        "order_date": childFormData.orderDate,
        'notification_number': null,
        "notification_date": null,
        "period_of_extension": childFormData.periodOfExtension,
        'extension_order_no': childFormData.extensionNumber,
        'contract_closed': childFormData.contractClosed,
        "route_length": null,
        "contract_type": childFormData.contractType
      }
      try {
        console.log(newRecord);
        console.log(contractorDeatilsCode);
        const response = await ContractorAPi.ContractorAPi_master().updateContrcatDetails(contractorDeatilsCode, newRecord)
        if (response.data.Status === 1) {
          Swal.fire({
            title: 'Saved',
            text: 'Updated Sucessfully',
            icon: 'success',
            customClass: {
              container: 'custom-swal-container'
            }
          });
          fetchData(contractorCode)
          handleChildClear()
          localStorage.setItem("Navigation_state", true)
        } else {
          Swal.fire({
            title: 'Error',
            text: `${response.data.Error}` || 'Unknown Error',
            icon: 'error',
            customClass: {
              container: 'custom-swal-container'
            }
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Unknown Error',
          icon: 'error',
          customClass: {
            container: 'custom-swal-container'
          }
        });
      }
    }
  }

  const handlefieldChange = (fieldName, value) => {
    if (fieldName === "contractorName") {
      if (value === "") {
        setSearchContractorCode("")
      }
      else if (value) {
        setSearchContractorCode(value)
      }
    }
    if (fieldName === "contractorCode") {
      if (value === "") {
        setSearchContractorCode("")
      }
      else if (value) {
        setSearchContractorCode(value)
      }
    }
  }
  const handleSearch = async () => {
    if(searchContractorCode === null || searchContractorCode === ""){
      Swal.fire({
        title: "select a value to search",
        timer: 1500,
        icon: 'warning',
        showConfirmButton: false
    })
    }
    else {
      try {
        const response = await ContractorAPi.ContractorAPi_master().fetchById(searchContractorCode)
        if (response.status === 200) {
          console.log(response.data.items);
          MasterHandleFieldChange("bankName", response.data.items[0].bank_code)
          MasterHandleFieldChange("branchName", response.data.items[0].branch_code)
          const ifsc = await ContractorAPi.ContractorAPi_master().fetch_ifcs(response.data.items[0].branch_code)
          setMasterFormData((prevdata) => ({
            ...prevdata,
            usersCode: response.data.items[0].users_code,
            contractorName: response.data.items[0].contractor_name,
            tds: response.data.items[0].tds,
            tdsPercentage: response.data.items[0].tds_prc,
            panNo: response.data.items[0].pan_no,
            surcharge: response.data.items[0].sur_chg,
            phoneNumber: response.data.items[0].phone_no,
            // bankName: response.data.items[0],
            //branchName: response.data.items[0],
            ifcsCode: ifsc.data.items[0].ifsc_code,
            accountNumber: response.data.items[0].account_no,
          }))
          setContractorCode(response.data.items[0].contractor_code2)
          fetchData(response.data.items[0].contractor_code2)
          setShowContractorDetails(true)
          setMasterUpdateButton(true)
          setMasterSaveButton(false)
          if (response.data.items[0].cont_det_code !== null) {
            setShowGrid(true)
            setShowContractorDetails(true)
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  const fetchContractorCode = async () => {
    try {
      const response = await ContractorAPi.ContractorAPi_master().DD_contractor_code()
      if (response.status === 200) {
        setDDcontractorCode(response.data.items)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const fetchContractorName = async () => {
    try {
      const response = await ContractorAPi.ContractorAPi_master().DD_contractor_name()
      if (response.status === 200) {
        setDDContractorName(response.data.items)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const fetchBankNames = async () => {
    try {
      const response = await ContractorAPi.ContractorAPi_master().fetch_BankMaster_DD()
      if (response.status === 200) {
        setBankNames(response.data.items)
      }

    } catch (error) {
      console.log(error);
    }
  }
  const fetchData = async (contractorCode) => {
    try {
      const response = await ContractorAPi.ContractorAPi_master().fetchById(contractorCode)
      console.log(response);
      if (response.status === 200) {
        if (response.data.items[0].cont_det_code === null) {
          setRows([])
        }
        else if (response.data.items[0].cont_det_code !== null) {
          setRows(response.data.items)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchRouteName = async () => {
    try {
      const response = await ContractorAPi.ContractorAPi_master().DD_contractor_details_route_name()
      if (response.status === 200) {
        setRouteNames(response.data.items)
      }

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchBankNames()
    fetchData()
    fetchRouteName()
    fetchContractorCode()
    fetchContractorName()
    document.title = "Contractor Master"
  }, [])
  return (
    <>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: "20px" }}>
        <Grid container spacing={2}>
          <Grid item md={12} lg={12} sm={12} xs={12}>
            <Grid container spacing={2}>
              <Grid item md={12} lg={12} sm={12} xs={12} width={1000}>
                <Typography variant='h5'>
                  Contractor  Master
                </Typography>
              </Grid>
              <Grid item md={5} lg={5} sm={12} xs={12}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="Search"
                    onChange={(e) => { handleRadio(e) }}
                  >
                    <FormControlLabel
                      value="Code"
                      control={<Radio checked={searchByCode} />}
                      label="Contractor Code"
                    />
                    <FormControlLabel
                      value="Name"
                      control={<Radio checked={searchByName} />}
                      label="Contractor Name"
                    />

                  </RadioGroup>
                </FormControl>
              </Grid>
              {searchByCode && (
                <Grid item md={3} lg={3} sm={12} xs={12}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={DDcontractorCode}
                    getOptionLabel={(options) => options.users_code}
                    isOptionEqualToValue={(option, value) => option.contractor_code === value.contractor_code}
                    onChange={(event, value) => handlefieldChange("contractorCode", value?.contractor_code || "")}
                    value={DDcontractorCode.find(item=>item.contractor_code === searchContractorCode) || null}
                    size='small'
                    fullWidth
                    sx={autoCompleteStyle}
                    renderInput={(params) =>
                      <TextField
                        {...params}
                        label="Contractor Code"
                      />}
                  />
                </Grid>
              )}
              {searchByName && (
                <Grid item md={3} lg={3} sm={12} xs={12}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={DDContractorName}
                    getOptionLabel={(options) => options.contractor_name}
                    isOptionEqualToValue={(option, value) => option.contractor_code === value.contractor_code}
                    onChange={(event, value) => handlefieldChange("contractorName", value?.contractor_code || "")}
                    value={DDContractorName.find(item=>item.contractor_code === searchContractorCode) || null}
                    size='small'
                    fullWidth
                    sx={autoCompleteStyle}
                    renderInput={(params) =>
                      <TextField
                        {...params}
                        label="Contractor Name"
                      />}
                  />
                </Grid>
              )}
              <Grid item md={2} lg={2} sm={12} xs={12}>
                <Button variant="contained"
                  size='small'
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ padding: 2, marginBottom: "30px" }}>
        <Grid container spacing={2} >
          {/* =========================Taluk  Master======================== */}
          <Grid item md={12} lg={12} sm={12} xs={12}>
            <Typography variant='h5'>
              Contractor
            </Typography>
          </Grid>
          {/* =========================Contractor Code======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Contractor Code"
              variant="outlined"
              size='small'
              name='statusName'
              required
              sx={textFiledStyle}
              fullWidth
              value={masterFormData.usersCode}
              onChange={(e) => MasterHandleFieldChange("usersCode", e.target.value.toUpperCase())}
              error={Boolean(masterErrors.usersCode)}
              helperText={masterErrors.usersCode}

            />
          </Grid>
          {/* =========================Contractor Name======================== */}
          <Grid item md={9} lg={9} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Contractor Name"
              variant="outlined"
              size='small'
              name='statusName'
              required
              sx={textFiledStyle}
              fullWidth
              value={masterFormData.contractorName}
              onChange={(e) => MasterHandleFieldChange("contractorName", e.target.value.toUpperCase())}
              error={Boolean(masterErrors.contractorName)}
              helperText={masterErrors.contractorName}

            />
          </Grid>
          {/* =========================TDS======================== */}
          <Grid item md={1.5} lg={1.5} sm={12} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size='small'
              fullWidth
              options={TDS}
              sx={autoCompleteStyle}
              getOptionLabel={(options) => options.name}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              value={TDS.find(option => option.value === masterFormData.tds) || null}
              onChange={(e, v) => MasterHandleFieldChange("tds", v?.value || "")}
              renderInput={(params) =>
                <TextField
                  {...params}
                  label="TDS"
                  required
                  error={Boolean(masterErrors.tds)}
                  helperText={masterErrors.tds}
                />}
            />
          </Grid>
          {/* =========================TDS Percentage======================== */}
          <Grid item md={1.5} lg={1.5} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="TDS Percentage"
              variant="outlined"
              size='small'
              name='statusName'
              required
              sx={textFiledStyle}
              fullWidth
              value={masterFormData.tdsPercentage}
              onChange={(e) => MasterHandleFieldChange("tdsPercentage", e.target.value.replace(/[^0-9.]/g, '').replace(/(\.\d{3})\d*$/, '$1'))}
              error={Boolean(masterErrors.tdsPercentage)}
              helperText={masterErrors.tdsPercentage}

            />
          </Grid>
          {/* =========================PAN No======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="PAN No"
              variant="outlined"
              size='small'
              name='statusName'
              required
              sx={textFiledStyle}
              fullWidth
              value={masterFormData.panNo}
              onChange={(e) => MasterHandleFieldChange("panNo", e.target.value.toUpperCase())}
              error={Boolean(masterErrors.panNo)}
              helperText={masterErrors.panNo}

            />
          </Grid>
          {/* =========================Surcharge======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Surcharge"
              variant="outlined"
              size='small'
              name='statusName'
              required
              sx={textFiledStyle}
              fullWidth
              value={masterFormData.surcharge}
              onChange={(e) => MasterHandleFieldChange("surcharge", e.target.value.replace(/[^0-9]/g, ''))}
              error={Boolean(masterErrors.surcharge)}
              helperText={masterErrors.surcharge}

            />
          </Grid>
          {/* =========================Phone Number======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              size='small'
              name='statusName'
              required
              sx={textFiledStyle}
              fullWidth
              value={masterFormData.phoneNumber}
              onChange={(e) => MasterHandleFieldChange("phoneNumber", e.target.value.replace(/[^0-9]/g, ''))}
              error={Boolean(masterErrors.phoneNumber)}
              helperText={masterErrors.phoneNumber}
            />
          </Grid>
          {/* =========================Bank Name======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size='small'
              fullWidth
              options={bankNames}
              sx={autoCompleteStyle}
              getOptionLabel={(options) => options.bank_name}
              isOptionEqualToValue={(option, value) => option.bank_code === value.bank_code}
              value={bankNames.find(option => option.bank_code === masterFormData.bankName) || null}
              onChange={(e, v) => MasterHandleFieldChange("bankName", v?.bank_code || "")}
              renderInput={(params) =>
                <TextField
                  {...params}
                  label="Bank Name"
                  required
                  error={Boolean(masterErrors.bankName)}
                  helperText={masterErrors.bankName}
                />}
            />
          </Grid>
          {/* =========================Branch Name======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size='small'
              fullWidth
              options={branchNames}
              sx={autoCompleteStyle}
              getOptionLabel={(options) => options.branch_name}
              isOptionEqualToValue={(option, value) => option.branch_code === value.branch_code}
              value={branchNames.find(option => option.branch_code === masterFormData.branchName) || null}
              onChange={(e, v) => MasterHandleFieldChange("branchName", v?.branch_code || "")}
              renderInput={(params) =>
                <TextField
                  {...params}
                  label="Branch Name"
                  required
                  error={Boolean(masterErrors.branchName)}
                  helperText={masterErrors.branchName}
                />}
            />
          </Grid>
          {/* =========================IFSC code======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="IFSC code"
              variant="outlined"
              size='small'
              name='statusName'
              sx={textFiledStyle}
              fullWidth
              value={masterFormData.ifcsCode}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          {/* =========================Account Number======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Account Number"
              variant="outlined"
              size='small'
              name='statusName'
              required
              sx={textFiledStyle}
              fullWidth
              value={masterFormData.accountNumber}
              onChange={(e) => MasterHandleFieldChange("accountNumber", e.target.value.toUpperCase())}
              error={Boolean(masterErrors.accountNumber)}
              helperText={masterErrors.accountNumber}

            />
          </Grid>
          {/* =========================Button======================== */}
          <Grid item md={12} lg={12} sm={12} xs={12}>
            <Stack spacing={{ xs: 1, sm: 1, md: 1 }} direction={{ xs: 'column', sm: 'row' }}>

              {masterSaveButton && (
                <Button
                  variant="contained"
                  onClick={MasterHandleSubmit}
                  type='submit'
                  size='small'>
                  Save
                </Button>
              )}
              {masterUpdateButton && (
                <Button
                  variant="contained"
                  onClick={MasterHandleUpdate}
                  type='submit'
                  size='small'>
                  Update
                </Button>
              )}
              {MasterClearButton && (
                <Button
                  variant="contained"
                  onClick={MasterClear}
                  color="error"
                  size='small'>
                  Clear
                </Button>)}
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {showContractorDetails && (
        <Paper elevation={3} sx={{ padding: 2, marginBottom: "30px" }}>
          <Grid container spacing={2}>
            <Grid item md={12} lg={12} sm={12} xs={12}>
              <Typography variant='h5'>
                Contractor Details
              </Typography>
            </Grid>
            {/* =========================Route Name========================= */}
            {/* users_code */}
            <Grid item md={4.2} lg={4.2} sm={12} xs={12}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size='small'
                fullWidth
                options={routeNames}
                sx={autoCompleteStyle}
                getOptionLabel={(options) => options.route_name}
                isOptionEqualToValue={(option, value) => option.route_code === value.route_code}
                value={routeNames.find(option => option.route_code === childFormData.routeName) || null}
                onChange={(e, v) => childHandleFieldChange("routeName", v?.route_code || "")}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="Route Name"
                    required
                    error={Boolean(chlidErrors.routeName)}
                    helperText={chlidErrors.routeName}
                  />}
              />
            </Grid>
            {/* =========================Period From======================== */}
            <Grid item md={1.5} lg={1.5} sm={12} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format='DD/MM/YYYY'
                  label="Period From"
                  sx={datePickerStyle}
                  value={childFormData.periodFrom || null}
                  onChange={(date) => childHandleFieldChange("periodFrom", dayjs(date).format("DD/MMM/YYYY"))}
                  slotProps={
                    {
                      textField:
                      {
                        size: "small",
                        required: true,
                        error: Boolean(chlidErrors.periodFrom),
                        helperText: chlidErrors.periodFrom
                      }
                    }}
                />
              </LocalizationProvider>
            </Grid>
            {/* =========================Period To======================== */}
            <Grid item md={1.5} lg={1.5} sm={12} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format='DD/MM/YYYY'
                  label="Period To"
                  sx={datePickerStyle}
                  value={childFormData.periodTo || null}
                  onChange={(date) => childHandleFieldChange("periodTo", dayjs(date).format("DD/MMM/YYYY"))}
                  slotProps={
                    {
                      textField:
                      {
                        size: "small",
                        required: true,
                        error: Boolean(chlidErrors.periodTo),
                        helperText: chlidErrors.periodTo
                      }
                    }}
                />
              </LocalizationProvider>
            </Grid>
            {/* =========================Contract Date======================== */}
            <Grid item md={1.8} lg={1.8} sm={12} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format='DD/MM/YYYY'
                  label="Contract Date"
                  sx={datePickerStyle}
                  value={childFormData.contractDate || null}
                  onChange={(date) => childHandleFieldChange("contractDate", dayjs(date).format("DD/MMM/YYYY"))}
                  slotProps={
                    {
                      textField:
                      {
                        size: "small",
                        required: true,
                        error: Boolean(chlidErrors.contractDate),
                        helperText: chlidErrors.contractDate
                      }
                    }}
                />
              </LocalizationProvider>
            </Grid>
            {/* =========================Rate Per KM======================== */}
            <Grid item md={1.5} lg={1.5} sm={12} xs={12}>
              <TextField
                id="outlined-basic"
                label="Rate Per KM"
                variant="outlined"
                size='small'
                name='statusName'
                required
                sx={textFiledStyle}
                fullWidth
                value={childFormData.ratePerkm}
                onChange={(e) => childHandleFieldChange("ratePerkm", e.target.value.replace(/[^0-9.]/g, '').replace(/(\.\d{2})\d*$/, '$1'))}
                error={Boolean(chlidErrors.ratePerkm)}
                helperText={chlidErrors.ratePerkm}
              />
            </Grid>
            {/* =========================Vehicle Capacity======================== */}
            <Grid item md={1.5} lg={1.5} sm={12} xs={12}>
              <TextField
                id="outlined-basic"
                label="Vehicle Capacity"
                variant="outlined"
                size='small'
                name='statusName'
                required
                sx={textFiledStyle}
                fullWidth
                value={childFormData.vehicleCapacity}
                onChange={(e) => childHandleFieldChange("vehicleCapacity", e.target.value.toUpperCase())}
                error={Boolean(chlidErrors.vehicleCapacity)}
                helperText={chlidErrors.vehicleCapacity}
              />
            </Grid>
            {/* =========================Vehicle Number======================== */}
            <Grid item md={3} lg={3} sm={12} xs={12}>
              <TextField
                id="outlined-basic"
                label="Vehicle Number"
                variant="outlined"
                size='small'
                name='statusName'
                required
                sx={textFiledStyle}
                fullWidth
                value={childFormData.vehicleNumber}
                onChange={(e) => childHandleFieldChange("vehicleNumber", e.target.value.toUpperCase())}
                error={Boolean(chlidErrors.vehicleNumber)}
                helperText={chlidErrors.vehicleNumber}
              />
            </Grid>

            {/* =========================Order Number======================== */}
            <Grid item md={3} lg={3} sm={12} xs={12}>
              <TextField
                id="outlined-basic"
                label="Order Number"
                variant="outlined"
                size='small'
                name='statusName'
                required
                sx={textFiledStyle}
                fullWidth
                value={childFormData.orderNumber}
                onChange={(e) => childHandleFieldChange("orderNumber", e.target.value.toUpperCase())}
                error={Boolean(chlidErrors.orderNumber)}
                helperText={chlidErrors.orderNumber}
              />
            </Grid>
            {/* =========================Order Date======================== */}
            <Grid item md={3} lg={3} sm={12} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format='DD/MM/YYYY'
                  label="Order Date"
                  sx={datePickerStyle}
                  value={childFormData.orderDate || null}
                  onChange={(date) => childHandleFieldChange("orderDate", dayjs(date).format("DD/MMM/YYYY"))}
                  slotProps={
                    {
                      textField:
                      {
                        size: "small",
                        required: true,
                        error: Boolean(chlidErrors.orderDate),
                        helperText: chlidErrors.orderDate
                      }
                    }}
                />
              </LocalizationProvider>
            </Grid>
            {/* =========================Contract Type========================= */}
            <Grid item md={3} lg={3} sm={12} xs={12}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size='small'
                fullWidth
                options={Contractor_Detail_Type}
                sx={autoCompleteStyle}
                getOptionLabel={(options) => options.name}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                value={Contractor_Detail_Type.find(option => option.value === childFormData.contractType) || null}
                onChange={(e, v) => childHandleFieldChange("contractType", v?.value || "")}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="Contract Type"
                    required
                    error={Boolean(chlidErrors.contractType)}
                    helperText={chlidErrors.contractType}
                  />}
              />
            </Grid>
            {/* =========================Contract Closed========================= */}
            <Grid item md={3} lg={3} sm={12} xs={12}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size='small'
                fullWidth
                options={Contract_closed}
                sx={autoCompleteStyle}
                getOptionLabel={(options) => options.name}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                value={Contract_closed.find(option => option.value === childFormData.contractClosed) || null}
                onChange={(e, v) => childHandleFieldChange("contractClosed", v?.value || "")}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="Contract Closed"
                    required
                    error={Boolean(chlidErrors.contractClosed)}
                    helperText={chlidErrors.contractClosed}
                  />}
              />
            </Grid>
            {/* =========================Period Of Extension======================== */}
            <Grid item md={3} lg={3} sm={12} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format='DD/MM/YYYY'
                  label="Period Of Extension"
                  sx={datePickerStyle}
                  value={childFormData.periodOfExtension || null}
                  onChange={(date) => childHandleFieldChange("periodOfExtension", dayjs(date).format("DD/MMM/YYYY"))}
                  slotProps={
                    {
                      textField:
                      {
                        size: "small",
                        required: true,
                        error: Boolean(chlidErrors.periodOfExtension),
                        helperText: chlidErrors.periodOfExtension
                      }
                    }}
                />
              </LocalizationProvider>
            </Grid>
            {/* =========================Extension Number======================== */}
            <Grid item md={3} lg={3} sm={12} xs={12}>
              <TextField
                id="outlined-basic"
                label="Extension Number"
                variant="outlined"
                size='small'
                name='statusName'
                required
                sx={textFiledStyle}
                fullWidth
                value={childFormData.extensionNumber}
                onChange={(e) => childHandleFieldChange("extensionNumber", e.target.value.toUpperCase())}
                error={Boolean(chlidErrors.extensionNumber)}
                helperText={chlidErrors.extensionNumber}
              />
            </Grid>
            {/* =========================Contractor Deposit======================== */}
            <Grid item md={3} lg={3} sm={12} xs={12}>
              <TextField
                id="outlined-basic"
                label="Contractor Deposit"
                variant="outlined"
                size='small'
                sx={textFiledStyle}
                fullWidth
                inputProps={{
                  readOnly: true
                }}
                value={childFormData.contractorDeposit}
              />
            </Grid>
            {/* =========================Button======================== */}
            <Grid item md={12} lg={12} sm={12} xs={12}>
              <Stack spacing={{ xs: 1, sm: 1, md: 1 }} direction={{ xs: 'column', sm: 'row' }}>
                {childSaveButton && (<Button
                  variant="contained"
                  size='small'
                  onClick={handleChildSave}
                >
                  Save
                </Button>)}
                {childUpdateButton && (<Button
                  variant="contained"
                  size='small'
                  onClick={handleChildUpdate}
                >
                  Update
                </Button>)}
                <Button
                  variant="contained"
                  size='small'
                  color="error"
                  onClick={handleChildClear}
                >
                  Clear
                </Button>
                {extraDetails && (<Button
                  variant="contained"
                  onClick={handleContractorDepositeOpen}
                  size='small'
                >
                  Contractor Deposit
                </Button>)}
              </Stack>
            </Grid>
          </Grid>
        </Paper>)}
      <Paper elevation={3}>
        {/* =========================datagrid start======================== */}
        {showGrid && (
          <Grid item md={12} lg={12} sm={12} xs={12}>
            <Box sx={{ height: 320, width: '100%', marginTop: '20px' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row?.cont_det_code.toString()}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) =>
                  setColumnVisibilityModel(newModel)
                }
                pageSizeOptions={[5, 10, 20]}
                disableRowSelectionOnClick
                getRowHeight={() => 35}
                getRowClassName={getRowClassName}
              />
            </Box>
          </Grid>)}
        {/* =========================datagrid end======================== */}
      </Paper>
      {/* ================================Pop UP========================== */}
      <Modal
        open={contractorDeposite}
        onClose={handleContractorDepositeClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
          onClick: handleBackdropMobileClick
        }}
      >
        <Box sx={style}>
          <ContractorDeposite
            closeContractorDeposit={handleContractorDepositeClose}
            contractorCode={contractorCode}
            usersCode={masterFormData.usersCode}
            contractorName={masterFormData.contractorName}
          />
        </Box>
      </Modal>
    </>
  )
}
