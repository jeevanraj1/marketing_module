import { Grid, TextField, Autocomplete, Typography, Box, Button, Stack, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid'
import { customerApi } from '../../../Api';
import dayjs from 'dayjs';
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";


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
export default function DepositDetails({ closeDepositeDetails, customerCode, userCode, customerName }) {
    const [Errors, setErrors] = useState({});
    const [gridBankDocNumber, setGridBankDocNumber] = useState(false);
    const [gridDepositeDate, setGridDepositeDate] = useState(false);
    const [gridexpireData, setGridExpireData] = useState(false);
    const [gridgrNumber, setGridGrNumber] = useState(false);
    const [gridgrDate, setGridGrDate] = useState(false);
    const [gridBankName, setGridBankName] = useState(false);
    const [gridAmount, setGridAmount] = useState(false);
    const [gridRemarks, setGridRemarks] = useState(false);
    const [gridDepositeType, setgridDepositeType] = useState(false);
    const [gridBillNumber, setgridBillNumber] = useState(false);
    const [gridBillDate, setgridBillDate] = useState(false);
    const [fetchDepositePaymodeDD, setFetchDepositePaymodeDD] = useState([]);
    const [fetchDepositeTypeDD, setFetchDepositeTypeDD] = useState([]);
    const [formData, setFormData] = useState({
        paymode: '',
        depositType: '',
        bankDocNumber: '',
        depositDate: '',
        expireDate: '',
        grNumber: '',
        grDate: '',
        bankName: "",
        amount: "",
        remarks: '',
        billNumber: "",
        billDate: "",
    });
    const [CustomerCode, setCustomerCode] = useState(customerCode);
    const [rows, setRows] = useState([]);
    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        deposit_id: false,
        customer_code: false,
        dep_paymode_id: false,
        deposit_type: false,
    })
    const [depositeId, setDepositeId] = useState(null);
    const [saveButton, setSaveButton] = useState(true);
    const [upadteButton, setUpadteButton] = useState(false);
    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };
    const validation = () => {
        const newErrors = {}
        if (formData.paymode === "") newErrors.paymode = "Required"
        else if (formData.paymode !== "") newErrors.paymode = ""
        // ==========================================Bank========================================
        if (formData.paymode !== "" && formData.paymode === 1) {
            // ==========================================depositType========================================
            if (formData.depositType === "") newErrors.depositType = "Required"
            else if (formData.depositType !== "") newErrors.depositType = Errors?.depositType
            // ==========================================bankDocNumber========================================
            if (formData.bankDocNumber === "") newErrors.bankDocNumber = "Required"
            else if (formData.bankDocNumber !== "") newErrors.bankDocNumber = Errors?.bankDocNumber
            // ==========================================bankName========================================
            if (formData.bankName === "") newErrors.bankName = "Required"
            else if (formData.bankName !== "") newErrors.bankName = Errors?.bankName
            // ==========================================depositDate========================================
            if (formData.depositDate === "") newErrors.depositDate = "Required"
            else if (formData.depositDate !== "") newErrors.depositDate = Errors?.depositDate
            // ==========================================expireDate========================================
            if (formData.expireDate === "") newErrors.expireDate = "Required"
            else if (formData.expireDate !== "") newErrors.expireDate = Errors?.expireDate
            // ==========================================amount========================================
            if (formData.amount === "") newErrors.amount = "Required"
            else if (formData.amount !== "") newErrors.amount = Errors?.amount
            // ==========================================remarks========================================
            if (formData.remarks === "") newErrors.remarks = "Required"
            else if (formData.remarks !== "") newErrors.remarks = Errors?.remarks
        }
        // ==========================================ADJUSTED IN BILL========================================
        if (formData.paymode !== "" && formData.paymode === 2) {
            // ==========================================billNumber========================================
            if (formData.billNumber === "") newErrors.billNumber = "Required"
            else if (formData.billNumber !== "") newErrors.billNumber = Errors?.billNumber
            // ==========================================billDate========================================
            if (formData.billDate === "") newErrors.billDate = "Required"
            else if (formData.billDate !== "") newErrors.billDate = Errors?.billDate
            // ==========================================grNumber========================================
            if (formData.grNumber === "") newErrors.grNumber = "Required"
            else if (formData.grNumber !== "") newErrors.grNumber = Errors?.grNumber
            // ==========================================grDate========================================
            if (formData.grDate === "") newErrors.grDate = "Required"
            else if (formData.grDate !== "") newErrors.grDate = Errors?.grDate
            // ==========================================amount========================================
            if (formData.amount === "") newErrors.amount = "Required"
            else if (formData.amount !== "") newErrors.amount = Errors?.amount
            // ==========================================remarks========================================
            if (formData.remarks === "") newErrors.remarks = "Required"
            else if (formData.remarks !== "") newErrors.remarks = Errors?.remarks
        }
        // ==========================================ONLINE========================================
        if (formData.paymode !== "" && formData.paymode === 3) {
            // ==========================================bankName========================================
            if (formData.bankName === "") newErrors.bankName = "Required"
            else if (formData.bankName !== "") newErrors.bankName = Errors?.bankName
            // ==========================================grNumber========================================
            if (formData.grNumber === "") newErrors.grNumber = "Required"
            else if (formData.grNumber !== "") newErrors.grNumber = Errors?.grNumber
            // ==========================================grDate========================================
            if (formData.grDate === "") newErrors.grDate = "Required"
            else if (formData.grDate !== "") newErrors.grDate = Errors?.grDate
            // ==========================================amount========================================
            if (formData.amount === "") newErrors.amount = "Required"
            else if (formData.amount !== "") newErrors.amount = Errors?.amount
            // ==========================================remarks========================================
            if (formData.remarks === "") newErrors.remarks = "Required"
            else if (formData.remarks !== "") newErrors.remarks = Errors?.remarks
        }
        // ==========================================PAID IN CASH========================================
        if (formData.paymode !== "" && formData.paymode === 4) {
            // ==========================================grNumber========================================
            if (formData.grNumber === "") newErrors.grNumber = "Required"
            else if (formData.grNumber !== "") newErrors.grNumber = Errors?.grNumber
            // ==========================================grDate========================================
            if (formData.grDate === "") newErrors.grDate = "Required"
            else if (formData.grDate !== "") newErrors.grDate = Errors?.grDate
            // ==========================================amount========================================
            if (formData.amount === "") newErrors.amount = "Required"
            else if (formData.amount !== "") newErrors.amount = Errors?.amount
            // ==========================================remarks========================================
            if (formData.remarks === "") newErrors.remarks = "Required"
            else if (formData.remarks !== "") newErrors.remarks = Errors?.remarks
        }
        return newErrors

    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
        if (!hasErrors) {
            try {
                const newRecord = {
                    "customer_code": customerCode,
                    "dep_paymode_id": Number(formData.paymode),
                    "deposit_type": formData.depositType,
                    "deposit_date": formData.depositDate !== "" ? formData.depositDate : null,
                    "expiry_date": formData.expireDate !== "" ? formData.expireDate : null,
                    "gr_no": formData.grNumber !== "" ? formData.grNumber : null,
                    "gr_date": formData.grDate !== "" ? formData.grDate : null,
                    "bank_name": formData.bankName !== "" ? formData.bankName : null,
                    "amount": formData.amount !== "" ? formData.amount : null,
                    "remarks": formData.remarks !== "" ? formData.remarks : null,
                    "instrument_details": formData.bankDocNumber !== "" ? formData.bankDocNumber : null,
                    "bill_no": formData.billNumber !== "" ? formData.billNumber : null,
                    "bill_date": formData.billDate !== "" ? formData.billDate : null,
                }
                console.log(newRecord);
                const response = await customerApi.customerMaster().AddDeposit(newRecord)
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
                    await fetchData(CustomerCode)
                    handleClear();
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

    const handleUpdate = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
        if (!hasErrors) {
            try {
                const newRecord = {
                    "customer_code": customerCode,
                    "dep_paymode_id": Number(formData.paymode),
                    "deposit_type": formData.depositType,
                    "deposit_date": formData.depositDate !== "" ? formData.depositDate : null,
                    "expiry_date": formData.expireDate !== "" ? formData.expireDate : null,
                    "gr_no": formData.grNumber !== "" ? formData.grNumber : null,
                    "gr_date": formData.grDate !== "" ? formData.grDate : null,
                    "bank_name": formData.bankName !== "" ? formData.bankName : null,
                    "amount": formData.amount !== "" ? formData.amount : null,
                    "remarks": formData.remarks !== "" ? formData.remarks : null,
                    "instrument_details": formData.bankDocNumber !== "" ? formData.bankDocNumber : null,
                    "bill_no": formData.billNumber !== "" ? formData.billNumber : null,
                    "bill_date": formData.billDate !== "" ? formData.billDate : null,
                }
                console.log(newRecord);
                console.log(depositeId);
                const response = await customerApi.customerMaster().updateDepositeDetails(depositeId, newRecord)
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
                    await fetchData(CustomerCode)
                    handleClear();
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
    const handleFieldChange = (fieldName, value) => {
        localStorage.setItem("Navigation_state", false)
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
        // =========================Paymode======================== 
        if (fieldName === 'paymode') {
            if (value === '') {
                emptyFields()
            }
            else if (value) {
                setErrors({})
                const paymode = fetchDepositePaymodeDD.find(option => option.dep_paymode_id === value)
                const { dep_mode } = paymode
                if (dep_mode === "BANK") isBank()
                else if (dep_mode === "ADJUSTED IN BILL") isAdjustInBill()
                else if (dep_mode === "ONLINE") isOnline()
                else if (dep_mode === "PAID IN CASH") isPaidInCash()
                setFormData({
                    paymode: '',
                    depositType: '',
                    bankDocNumber: '',
                    depositDate: "",
                    expireDate: "",
                    grNumber: '',
                    grDate: "",
                    bankName: "",
                    amount: "",
                    remarks: '',
                    billNumber: "",
                    billDate: "",
                })
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // =========================depositType======================== 
        if (fieldName === 'depositType') {
            console.log(value);
            if (value === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    depositType: "Required",
                }));
            }
            else if (value !== "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    depositType: "",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // =========================bankDocNumber======================== 
        if (fieldName === 'bankDocNumber') {
            if (value.trim() === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    bankDocNumber: "Required",
                }));
            }
            else if (value.trim() !== "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    bankDocNumber: "",
                }));
            } else if (value.trim().length > 25) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    bankDocNumber: "Value Must be less than 25 Charaters",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // =========================bankName======================== 
        if (fieldName === 'bankName') {
            if (value.trim() === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    bankName: "Required",
                }));
            }
            else if (value.trim().length > 60) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    bankName: "Value Must be less than 60 Charaters",
                }));
            }
            else if (value.trim().length <= 3) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    bankName: "Value Must be more than 3 Charaters",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // =========================depositDate======================== 
        if (fieldName === 'depositDate') {
            if (value === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    depositDate: "Required",
                }));
            }
            else if (value !== "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    depositDate: "",
                }));
                value = dayjs(value).format("DD/MMM/YYYY")
            }

            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // =========================expireDate======================== 
        if (fieldName === 'expireDate') {
            if (value === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    expireDate: "Required",
                }));
            }
            else if (value !== "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    expireDate: "",
                }));
                value = dayjs(value).format("DD/MMM/YYYY")
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // =========================amount======================== 
        if (fieldName === 'amount') {
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
            if (value === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    amount: "Required",
                }));
            }
            else if (!/^\d{0,10}(\.\d{1,2})?$/.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    amount: "Invalid Amount",
                }))
            }
        }
        // =========================remarks======================== 
        if (fieldName === 'remarks') {
            if (value.trim() === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    remarks: "Required",
                }));
            }
            else if (value.trim().length > 100) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    remarks: "Value Must be less than 100 Charaters",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // =========================billNumber======================== 
        if (fieldName === 'billNumber') {
            if (value.trim() === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    billNumber: "Required",
                }));
            }
            else if (value.trim().length > 20) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    billNumber: "Value Must be less than 20 Charaters",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // =========================billDate======================== 
        if (fieldName === 'billDate') {
            if (value === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    billDate: "Required",
                }));
            }
            else if (value !== "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    billDate: "",
                }));
                value = dayjs(value).format("DD/MMM/YYYY")
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // =========================grNumber======================== 
        if (fieldName === 'grNumber') {
            if (value.trim() === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    grNumber: "Required",
                }));
            }
            else if (value.trim().length > 20) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    grNumber: "Value Must be less than 20 Charaters",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // =========================grDate======================== 
        if (fieldName === 'grDate') {
            if (value === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    grDate: "Required",
                }));
            }
            else if (value !== "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    grDate: "",
                }));
                value = dayjs(value).format("DD/MMM/YYYY")
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
    }
    const handleClear = () => {
        setFormData({
            paymode: '',
            depositType: '',
            bankDocNumber: '',
            depositDate: null,
            expireDate: null,
            grNumber: '',
            grDate: null,
            bankName: "",
            amount: "",
            remarks: '',
            billNumber: "",
            billDate: null,
        })
        setErrors({})
        emptyFields()
        localStorage.setItem("Navigation_state", true)
        setSaveButton(true)
        setUpadteButton(false)
    }
    const isBank = () => {
        setGridBankDocNumber(true)
        setgridDepositeType(true)
        setGridDepositeDate(true)
        setGridExpireData(true)
        setGridBankName(true)
        setGridAmount(true)
        setGridRemarks(true)
        setGridGrDate(false)
        setGridGrNumber(false)
        setgridBillNumber(false)
        setgridBillDate(false)
    }
    const isAdjustInBill = () => {
        setGridBankDocNumber(false)
        setgridDepositeType(false)
        setGridDepositeDate(false)
        setGridExpireData(false)
        setGridBankName(false)
        setGridAmount(true)
        setGridRemarks(true)
        setGridGrDate(true)
        setGridGrNumber(true)
        setgridBillNumber(true)
        setgridBillDate(true)
    }
    const isOnline = () => {
        setGridBankDocNumber(false)
        setgridDepositeType(false)
        setGridDepositeDate(false)
        setGridExpireData(false)
        setGridBankName(true)
        setGridAmount(true)
        setGridRemarks(true)
        setGridGrDate(true)
        setGridGrNumber(true)
        setgridBillNumber(false)
        setgridBillDate(false)
    }
    const isPaidInCash = () => {
        setGridBankDocNumber(false)
        setgridDepositeType(false)
        setGridDepositeDate(false)
        setGridExpireData(false)
        setGridBankName(false)
        setGridAmount(true)
        setGridRemarks(true)
        setGridGrDate(true)
        setGridGrNumber(true)
        setgridBillNumber(false)
        setgridBillDate(false)
    }
    const emptyFields = () => {
        setgridDepositeType(false)
        setGridBankDocNumber(false)
        setGridDepositeDate(false)
        setGridExpireData(false)
        setGridBankName(false)
        setGridAmount(false)
        setGridRemarks(false)
        setGridGrDate(false)
        setGridGrNumber(false)
        setgridBillNumber(false)
        setgridBillDate(false)
    }
    const fetch_DepositePaymode_DD = async () => {
        try {
            const response = await customerApi.customerMaster().fetch_DepositePaymode_DD()
            if (response.status === 200) {
                setFetchDepositePaymodeDD(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const fetch_DepositeType_DD = async () => {
        try {
            const response = await customerApi.customerMaster().fetch_DepositeType_DD()
            if (response.status === 200) {
                setFetchDepositeTypeDD(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const fetchData = async (id) => {
        try {
            const response = await customerApi.customerMaster().FetchDepositeDetails(id)
            if (response.status === 200) {
                setRows(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetch_DepositePaymode_DD()
        fetch_DepositeType_DD()
        fetchData(CustomerCode)
    }, [])
    const columns = [
        {
            field: "action",
            headerName: "Action",
            width: 110,
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
                    {/* <DeleteForeverIcon
                        sx={{ color: "red" }}
                        style={{
                            cursor: "pointer",
                            opacity: 1,
                            transition: "opacity 0.3s",
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.opacity = 0.7;
                            e.currentTarget.style.color = "rgba(255, 0, 0, 0.7)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.opacity = 1;
                            e.currentTarget.style.color = "red";
                        }}
                        onClick={() => handleDeleteButtonClick(params.row)}
                    >
                        Delete
                    </DeleteForeverIcon> */}
                </>
            ),
        },
        {
            field: 'deposit_id',
            headerName: 'Deposite ID',
            width: 200,
        },
        {
            field: 'customer_code',
            headerName: 'Customer Code',
            width: 200,
        },
        {
            field: 'dep_paymode_id',
            headerName: 'Pay Mode ID',
            width: 200,
        },
        {
            field: 'dep_mode',
            headerName: 'Pay Mode',
            width: 200,
        },
        {
            field: 'deposit_type',
            headerName: 'Deposit Type',
            width: 200,
        },
        {
            field: 'dp_type',
            headerName: 'Deposit Type',
            width: 200,
        },
        {
            field: 'deposit_date',
            headerName: 'Deposite Date',
            width: 200,
            valueGetter: (params) => params.row.deposit_date ? dayjs(params.row.deposit_date).format("DD/MMM/YYYY") : null
        },
        {
            field: 'expiry_date',
            headerName: 'Expire Date',
            width: 200,
            valueGetter: (params) => params.row.expiry_date ? dayjs(params.row.expiry_date).format("DD/MMM/YYYY") : null
        },
        {
            field: 'gr_no',
            headerName: 'GR Number',
            width: 200,
            align: "right",
            type: 'number',
        },
        {
            field: 'gr_date',
            headerName: 'GR Date',
            width: 200,
            valueGetter: (params) => params.row.gr_date ? dayjs(params.row.gr_date).format("DD/MMM/YYYY") : null
        },
        {
            field: 'bank_name',
            headerName: 'Bank Name',
            width: 200
        },
        {
            field: 'amount',
            headerName: 'Amount',
            width: 200,
            type: 'number'
        },
        {
            field: 'remarks',
            headerName: 'Remarks',
            width: 200
        },
        {
            field: 'instrument_details',
            headerName: 'Back Docement Number',
            width: 200,
            align: "right",
            type: 'number',
        },
        {
            field: 'bill_no',
            headerName: 'Bill Number',
            width: 200,
            align: "right",
            type: 'number',
        },
        {
            field: 'bill_date',
            headerName: 'Bill Date',
            width: 200,
            valueGetter: (params) => params.row.gr_date ? dayjs(params.row.gr_date).format("DD/MMM/YYYY") : null
        },
    ];
    const handleEdit = (row) => {
        localStorage.setItem("Navigation_state", true)
        handleFieldChange("paymode", row.dep_paymode_id)
        setFormData((prevdata) => ({
            ...prevdata,
            routeNames: row.route_code ? row.route_code : null,
            // paymode: row.dep_paymode_id,
            depositType: row.deposit_type ? row.deposit_type : null,
            bankDocNumber: row.instrument_details ? row.instrument_details : null,
            depositDate: row.deposit_date ? dayjs(row.deposit_date) : null,
            expireDate: row.expiry_date ? dayjs(row.expiry_date) : null,
            grNumber: row.gr_no ? row.gr_no : null,
            grDate: row.gr_date ? dayjs(row.gr_date) : null,
            bankName: row.bank_name ? row.bank_name : null,
            amount: row.amount ? row.amount : null,
            remarks: row.remarks ? row.remarks : null,
            billNumber: row.bill_no ? row.bill_no : null,
            billDate: row.bill_date ? dayjs(row.bill_date) : null,
        }))
        setDepositeId(row.deposit_id)
        setSaveButton(false)
        setUpadteButton(true)
    }
    const handleDeleteButtonClick = (row) => {
        console.log(row);
    }
    return (
        <>
            <Grid container spacing={2} paddingLeft={2} paddingTop={1}>
                {/* ================ */}
                <Grid item xs={2} sm={2} md={10} lg={10} sx={{ width: "1000px", borderBottom: "1px solid #000" }}>
                    <Typography variant="h4">
                        Deposit Details
                    </Typography>
                </Grid>
                {/* ================ */}
                <Grid item xs={2} sm={2} md={2} lg={2} sx={{ textAlign: "end", width: "1000px", borderBottom: "1px solid #000" }}>
                    <Button onClick={closeDepositeDetails} sx={{ marginTop: "-5px" }}>
                        <HighlightOffIcon fontSize='large' />
                    </Button>
                </Grid>
                {/* ================ */}
            </Grid>
            <Grid container spacing={2} padding={2} >
                {/* ================================================= */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography component="h5" style={{ borderBottom: "1px dashed #000" }}>
                        Customer Code : {userCode}
                    </Typography>
                </Grid>
                {/* ================================================= */}
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <Typography component="h5" style={{ borderBottom: "1px dashed #000" }}>
                        Customer Name : {customerName}
                    </Typography>
                </Grid>
                {/* ================================================= */}
                {/* =========================Paymode======================== */}
                <Grid item md={3} lg={3} sm={12} xs={12}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={fetchDepositePaymodeDD}
                        size='small'
                        fullWidth
                        getOptionLabel={(options) => options.dep_mode}
                        isOptionEqualToValue={(option, value) => option.dep_paymode_id === value.dep_paymode_id}
                        value={fetchDepositePaymodeDD.find(option => option.dep_paymode_id === formData.paymode) || null}
                        onChange={(e, v) => handleFieldChange("paymode", v?.dep_paymode_id || "")}
                        sx={autoCompleteStyle}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Paymode"
                                required
                                error={Boolean(Errors.paymode)}
                                helperText={Errors.paymode}
                            />}
                    />
                </Grid>
                {/* =========================Deposite Type======================== */}
                {gridDepositeType && (<Grid item md={3} lg={3} sm={12} xs={12}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={fetchDepositeTypeDD}
                        size='small'
                        fullWidth
                        sx={autoCompleteStyle}
                        getOptionLabel={(options) => options.dp_type}
                        isOptionEqualToValue={(option, value) => option.dp_type === value.dp_type}
                        value={fetchDepositeTypeDD.find(option => option.dp_type_id === formData.depositType) || null}
                        onChange={(e, v) => handleFieldChange("depositType", v?.dp_type_id || "")}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Deposite Type"
                                required
                                error={Boolean(Errors.depositType)}
                                helperText={Errors.depositType}
                            />}
                    />
                </Grid>)}
                {/* =========================Bank Doc Number======================== */}
                {gridBankDocNumber && (<Grid item md={3} lg={3} sm={12} xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Bank Doc Number"
                        variant="outlined"
                        size='small'
                        fullWidth
                        sx={textFiledStyle}
                        required
                        value={formData.bankDocNumber}
                        error={Boolean(Errors.bankDocNumber)}
                        helperText={Errors.bankDocNumber}
                        onChange={(e) => handleFieldChange("bankDocNumber", e.target.value.toUpperCase())}
                    />
                </Grid>)}
                {/* =========================Bank Name======================== */}
                {gridBankName && (<Grid item md={3} lg={3} sm={12} xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Bank Name"
                        variant="outlined"
                        size='small'
                        fullWidth
                        sx={textFiledStyle}
                        required
                        value={formData.bankName}
                        onChange={(e) => handleFieldChange("bankName", e.target.value.toUpperCase())}
                        error={Boolean(Errors.bankName)}
                        helperText={Errors.bankName}
                    />
                </Grid>)}
                {/* =========================Deposit Date======================== */}
                {gridDepositeDate && (<Grid item md={3} lg={3} sm={12} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format='DD/MMM/YYYY'
                            label="Deposit Date"
                            sx={datePickerStyle}
                            onChange={(value) => handleFieldChange("depositDate", value)}
                            value={formData.depositDate || null}
                            slotProps={
                                {
                                    textField:
                                    {
                                        size: "small",
                                        required: true,
                                        error: Boolean(Errors.depositDate),
                                        helperText: Errors.depositDate
                                    }
                                }}
                        />
                    </LocalizationProvider>
                </Grid>)}
                {/* =========================Expiry Date======================== */}
                {gridexpireData && (<Grid item md={3} lg={3} sm={12} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Expiry Date"
                            sx={datePickerStyle}
                            format='DD/MMM/YYYY'
                            minDate={(dayjs(formData.depositDate).add(1, "day"))}
                            onChange={(value) => handleFieldChange("expireDate", value)}
                            value={formData.expireDate || null}
                            slotProps={
                                {
                                    textField:
                                    {
                                        size: "small",
                                        required: true,
                                        error: Boolean(Errors.expireDate),
                                        helperText: Errors.expireDate
                                    }
                                }}
                        />
                    </LocalizationProvider>
                </Grid>)}
                {/* =========================Bill Number======================== */}
                {gridBillNumber && (<Grid item md={3} lg={3} sm={12} xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Bill Number"
                        variant="outlined"
                        size='small'
                        fullWidth
                        sx={textFiledStyle}
                        required
                        value={formData.billNumber}
                        onChange={(e) => handleFieldChange("billNumber", e.target.value.toUpperCase())}
                        error={Boolean(Errors.billNumber)}
                        helperText={Errors.billNumber}

                    />
                </Grid>
                )}
                {/* =========================Bill Date======================== */}
                {gridBillDate && (<Grid item md={3} lg={3} sm={12} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Bill Date"
                            format='DD/MMM/YYYY'
                            sx={datePickerStyle}
                            onChange={(value) => handleFieldChange("billDate", value)}
                            value={formData.billDate || null}
                            slotProps={
                                {
                                    textField:
                                    {
                                        size: "small",
                                        required: true,
                                        error: Boolean(Errors.billDate),
                                        helperText: Errors.billDate
                                    }
                                }}
                        />
                    </LocalizationProvider>
                </Grid>)}
                {/* =========================GR/REF Number======================== */}
                {gridgrNumber && (<Grid item md={3} lg={3} sm={12} xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="GR/REF Number"
                        variant="outlined"
                        size='small'
                        fullWidth
                        sx={textFiledStyle}
                        required
                        value={formData.grNumber}
                        onChange={(e) => handleFieldChange("grNumber", e.target.value.toUpperCase())}
                        error={Boolean(Errors.grNumber)}
                        helperText={Errors.grNumber}
                    />
                </Grid>)}
                {/* =========================GR Date======================== */}
                {gridgrDate && (<Grid item md={3} lg={3} sm={12} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="GR Date"
                            sx={datePickerStyle}
                            format='DD/MMM/YYYY'
                            onChange={(value) => handleFieldChange("grDate", value)}
                            value={formData.grDate || null}
                            slotProps={
                                {
                                    textField:
                                    {
                                        size: "small",
                                        required: true,
                                        error: Boolean(Errors.grDate),
                                        helperText: Errors.grDate
                                    }
                                }}
                        />
                    </LocalizationProvider>
                </Grid>)}
                {/* =========================Amount======================== */}
                {gridAmount && (<Grid item md={3} lg={3} sm={12} xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Amount"
                        variant="outlined"
                        size='small'
                        fullWidth
                        sx={textFiledStyle}
                        required
                        value={formData.amount}
                        onChange={(e) => handleFieldChange("amount", e.target.value.replace(/[^0-9.]/g, '').replace(/(\.\d{2})\d*$/, '$1'))}
                        error={Boolean(Errors.amount)}
                        helperText={Errors.amount}
                    />
                </Grid>)}
                {/* =========================Remarks======================== */}
                {gridRemarks && (<Grid item md={8} lg={8} sm={12} xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Remarks"
                        variant="outlined"
                        size='small'
                        fullWidth
                        sx={textFiledStyle}
                        required
                        value={formData.remarks}
                        onChange={(e) => handleFieldChange("remarks", e.target.value.toUpperCase())}
                        error={Boolean(Errors.remarks)}
                        helperText={Errors.remarks}
                    />
                </Grid>)}
                {/* =========================Button======================== */}
                <Grid item md={12} lg={12} sm={12} xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Stack direction="row" spacing={1}>
                        {saveButton && (
                            <Button
                                variant="contained"
                                size='small'
                                onClick={(e) => handleSubmit(e)}
                            >
                                Save
                            </Button>)}
                        {upadteButton && (
                            <Button
                                variant="contained"
                                size='small'
                                onClick={(e) => handleUpdate(e)}
                            >
                                Update
                            </Button>)}
                        <Button
                            variant="contained"
                            size='small'
                            color="error"
                            onClick={() => handleClear()}
                        >
                            Clear
                        </Button>
                    </Stack>
                </Grid>
                {/* =========================datagrid start======================== */}
                <Paper sx={{ width: "100%", marginTop: 3, }}>
                    <Grid item md={12} lg={12} sm={12} xs={12}>
                        <Box sx={{ height: 310, width: '100%', marginTop: '20px' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                getRowId={(row) => row.deposit_id.toString()}
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
                {/* ================ */}
            </Grid>
            {/* ================ */}
        </>
    )
}
