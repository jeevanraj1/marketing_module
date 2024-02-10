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
  "& .MuiInputLabel-root": {
    color: "black",
    "&.Mui-focused": {
      transform: "translate(16px, -10px)",
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
  const [DDCusomerName, setDDCusomerName] = useState([]);
  const [DDCustomerCode, setDDCustomerCode] = useState([]);
  const [saveButton, setSaveButton] = useState(true);
  const [updateButton, setUpdateButton] = useState(false);
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
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    contractor_code: false,
    contractor_type: false,
    gst_no: false,
    cess: false,
    bank_code: false,
    branch_code: false,
    tds: false,
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
      else if (value?.trim().length > 5) {
        setMasterErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Value Must Be less than 5 Charaters"
        }))
        value = value.substring(0, 5)
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
  }
  const MasterHandleUpdate = async (e) => {
    e.preventDefault()
    const validationErorrs = Mastervalidation()
    setMasterErrors(validationErorrs)
    const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error!=undefined)
    if (!hasErrors) {
      const newRecord = {
        "contractor_name": masterFormData.contractorName.trim(),
        "contractor_type": null,
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
        const response = await ContractorAPi.ContractorAPi_master().update(contractorCode,newRecord)
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
          fetchData()
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
    const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error!=undefined)
    if (!hasErrors) {
      const newRecord = {
        "contractor_name": masterFormData.contractorName.trim(),
        "contractor_type": null,
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
          fetchData()
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
      field: 'contractor_code',
      headerName: 'Contractor Code',
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
      align: "right"
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
      align: "right"
    },
    {
      field: 'phone_no',
      headerName: 'Phone Number',
      width: 150,
      align: "right"
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
      width: 150,
    },
  ];
  const handleEdit = async (row) => {
    setMasterErrors({})
    setContractorCode(row.contractor_code)
    setMasterSaveButton(false)
    setMasterUpdateButton(true)
    MasterHandleFieldChange("branchName", row.branch_code)
    MasterHandleFieldChange("bankName", row.bank_code)
    try {
      const response = await ContractorAPi.ContractorAPi_master().fetch_ifcs(row.branch_code)
      console.log(response.data.items[0].ifsc_code);
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
  const fetchData = async () => {
    const response = await ContractorAPi.ContractorAPi_master().fetchAll()
    if (response.status === 200) {
      setRows(response.data.items)
    }
  }
  useEffect(() => {
    fetchBankNames()
    fetchData()
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
              <Grid item md={4} lg={4} sm={12} xs={12}>
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
                    options={DDCustomerCode}
                    getOptionLabel={(options) => options.user_code}
                    isOptionEqualToValue={(option, value) => option.customer_code === value.customer_code}
                    // onChange={(event, value) => handlefieldChange("CustomerCode", value?.customer_code || "")}
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
                    options={DDCusomerName}
                    getOptionLabel={(options) => options.customer_name}
                    isOptionEqualToValue={(option, value) => option.customer_code === value.customer_code}
                    //onChange={(event, value) => handlefieldChange("CustomerName", value?.customer_code || "")}
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
                //onClick={handleSearch}
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

      <Paper elevation={3} sx={{ padding: 2, marginBottom: "30px" }}>
        <Grid container spacing={2}>
          <Grid item md={12} lg={12} sm={12} xs={12}>
            <Typography variant='h5'>
              Contractor Details
            </Typography>
          </Grid>
          {/* =========================Route Name========================= */}
          <Grid item md={4.2} lg={4.2} sm={12} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size='small'
              fullWidth
              //options={fetchDistrictNamesDD}
              sx={autoCompleteStyle}
              // getOptionLabel={(options) => options.district_name}
              // isOptionEqualToValue={(option, value) => option.district_code === value.district_code}
              // value={fetchDistrictNamesDD.find(option => option.district_code === formData.districtName) || null}
              // onChange={(e, v) => MasterHandleFieldChange("districtName", v?.district_code || "")}
              renderInput={(params) =>
                <TextField
                  {...params}
                  label="Route Name"
                  required
                //error={Boolean(errors.districtName)}
                //helperText={errors.districtName}
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
                //minDate={dayjs(maxGstCancleDate).add(1, "day") || null}
                //value={formData.gst_reg_date || null}
                // onChange={(date) => handleFieldChange("Regdate", dayjs(date).format("DD/MMM/YYYY"))}
                slotProps={
                  {
                    textField:
                    {
                      size: "small",
                      required: true,
                      //error: Boolean(errors.gst_reg_date),
                      //helperText: errors.gst_reg_date
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
                //minDate={dayjs(maxGstCancleDate).add(1, "day") || null}
                //value={formData.gst_reg_date || null}
                // onChange={(date) => handleFieldChange("Regdate", dayjs(date).format("DD/MMM/YYYY"))}
                slotProps={
                  {
                    textField:
                    {
                      size: "small",
                      required: true,
                      //error: Boolean(errors.gst_reg_date),
                      //helperText: errors.gst_reg_date
                    }
                  }}
              />
            </LocalizationProvider>
          </Grid>
          {/* =========================Contractor Date======================== */}
          <Grid item md={1.8} lg={1.8} sm={12} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format='DD/MM/YYYY'
                label="Contractor Date"
                sx={datePickerStyle}
                //minDate={dayjs(maxGstCancleDate).add(1, "day") || null}
                //value={formData.gst_reg_date || null}
                // onChange={(date) => handleFieldChange("Regdate", dayjs(date).format("DD/MMM/YYYY"))}
                slotProps={
                  {
                    textField:
                    {
                      size: "small",
                      required: true,
                      //error: Boolean(errors.gst_reg_date),
                      //helperText: errors.gst_reg_date
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
            //value={formData.talukaName}
            //onChange={(e) => handleFieldChange("talukaName", e.target.value.toUpperCase())}
            // error={Boolean(errors.talukaName)}
            //helperText={errors.talukaName}

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
            //value={formData.talukaName}
            //onChange={(e) => handleFieldChange("talukaName", e.target.value.toUpperCase())}
            // error={Boolean(errors.talukaName)}
            //helperText={errors.talukaName}

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
            //value={formData.talukaName}
            //onChange={(e) => handleFieldChange("talukaName", e.target.value.toUpperCase())}
            // error={Boolean(errors.talukaName)}
            //helperText={errors.talukaName}

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
            //value={formData.talukaName}
            //onChange={(e) => handleFieldChange("talukaName", e.target.value.toUpperCase())}
            // error={Boolean(errors.talukaName)}
            //helperText={errors.talukaName}

            />
          </Grid>
          {/* =========================Order Date======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format='DD/MM/YYYY'
                label="Order Date"
                sx={datePickerStyle}
                //minDate={dayjs(maxGstCancleDate).add(1, "day") || null}
                //value={formData.gst_reg_date || null}
                // onChange={(date) => handleFieldChange("Regdate", dayjs(date).format("DD/MMM/YYYY"))}
                slotProps={
                  {
                    textField:
                    {
                      size: "small",
                      required: true,
                      //error: Boolean(errors.gst_reg_date),
                      //helperText: errors.gst_reg_date
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
              // isOptionEqualToValue={(option, value) => option.district_code === value.district_code}
              // value={fetchDistrictNamesDD.find(option => option.district_code === formData.districtName) || null}
              //onChange={(e, v) => handleFieldChange("districtName", v?.district_code || "")}
              renderInput={(params) =>
                <TextField
                  {...params}
                  label="Contract Type"
                  required
                //error={Boolean(errors.districtName)}
                //helperText={errors.districtName}
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
              // isOptionEqualToValue={(option, value) => option.district_code === value.district_code}
              // value={fetchDistrictNamesDD.find(option => option.district_code === formData.districtName) || null}
              //onChange={(e, v) => handleFieldChange("districtName", v?.district_code || "")}
              renderInput={(params) =>
                <TextField
                  {...params}
                  label="Contract Closed"
                  required
                //error={Boolean(errors.districtName)}
                //helperText={errors.districtName}
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
                //minDate={dayjs(maxGstCancleDate).add(1, "day") || null}
                //value={formData.gst_reg_date || null}
                // onChange={(date) => handleFieldChange("Regdate", dayjs(date).format("DD/MMM/YYYY"))}
                slotProps={
                  {
                    textField:
                    {
                      size: "small",
                      required: true,
                      //error: Boolean(errors.gst_reg_date),
                      //helperText: errors.gst_reg_date
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
            //value={formData.talukaName}
            //onChange={(e) => handleFieldChange("talukaName", e.target.value.toUpperCase())}
            // error={Boolean(errors.talukaName)}
            //helperText={errors.talukaName}

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
            />
          </Grid>
          {/* =========================Button======================== */}
          <Grid item md={12} lg={12} sm={12} xs={12}>
            <Stack spacing={{ xs: 1, sm: 1, md: 1 }} direction={{ xs: 'column', sm: 'row' }}>
              <Button
                variant="contained"
                onClick={handleContractorDepositeOpen}
                size='small'
              >
                Contractor Deposit
              </Button>
              {saveButton && (<Button
                variant="contained"
                size='small'
              //onClick={handleSave}
              >
                Save
              </Button>)}
              {updateButton && (<Button
                variant="contained"
                size='small'
              //onClick={handleUpdate}
              >
                Update
              </Button>)}
              <Button
                variant="contained"
                size='small'
                color="error"
              //onClick={handleClear}
              >
                Clear
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3}>
        {/* =========================datagrid start======================== */}
        <Grid item md={12} lg={12} sm={12} xs={12}>
          <Box sx={{ height: 300, width: '100%', marginTop: '20px' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.contractor_code.toString()}
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
        </Grid>
        {/* =========================datagrid end======================== */}
      </Paper>

      {/* ================================Pop UP========================== */}
      <Modal
        open={contractorDeposite}
        onClose={handleContractorDepositeClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{ onClick: handleBackdropMobileClick }}
      >
        <Box sx={style}>
          <ContractorDeposite
            closeContractorDeposit={handleContractorDepositeClose}
            contractorCode={null}
          />
        </Box>
      </Modal>
    </>
  )
}
