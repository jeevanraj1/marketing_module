import { Grid, TextField, Autocomplete, Typography, Box, Button, Stack, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid'
import { customerApi } from '../../../Api';
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";

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
        height: "10px",
        display: "flex",
        alignItems: "center",
        fontSize: 12,
        fontWeight: "bold",
    },
}
const status = [
    { name: "ACTIVE", value: "Y" },
    { name: "INACTIVE", value: "N" },
]
const AddressType = [
    { name: "SHIPPING ADDRESS", value: "S" },
    { name: "BILLING ADDRESS", value: "B" },
]

export default function AddAddress({ CloseAddressDetails, customerCode, userCode, customerName }) {
    const [DDCityNames, setDDCityNames] = useState([]);
    const [DDTalukaNames, setDDTalukaNames] = useState([]);
    const [DDDistrictNames, setDDDistrictNames] = useState([]);
    const [CustomerCodeForAddress, setCustomerCodeForAddress] = useState(1);
    const [formdata, setFormdata] = useState({
        addressType: '',
        address1: "",
        address2: "",
        address3: "",
        city: "",
        pinCode: "",
        taluka: "",
        district: "",
        location: "",
        status: "",
    });
    const [errors, setErrors] = useState({});
    const [updateButton, setUpdateButton] = useState(false);
    const [saveButton, setSaveButton] = useState(true);
    const [rows, setRows] = useState([]);
    const [addressId, setAddressId] = useState(null);
    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        address_id: false
    })
    // const pincodeRegex = (/^[1-9]{1}[0-9]{5}|[1-9]{1}[0-9]{3}\\s[0-9]{3}$/)
    const pincodeRegex = /^[0-9]{6}$/;
    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };
    const validation = () => {
        const newErrors = {}

        if (formdata.addressType === "") newErrors.addressType = "Required"
        else if (formdata.addressType !== "") newErrors.addressType = errors.addressType

        if (formdata.address1 === "") newErrors.address1 = "Required"
        else if (formdata.address1 !== "") newErrors.address1 = errors.address1

        if (formdata.address2 === "") newErrors.address2 = "Required"
        else if (formdata.address2 !== "") newErrors.address2 = errors.address2

        if (formdata.address3 === "") newErrors.address3 = "Required"
        else if (formdata.address3 !== "") newErrors.address3 = errors.address3

        if (formdata.city === "") newErrors.city = "Required"
        else if (formdata.city !== "") newErrors.city = errors.city

        if (formdata.pinCode === "") newErrors.pinCode = "Required"
        else if (formdata.pinCode !== "") newErrors.pinCode = errors.pinCode

        if (formdata.taluka === "") newErrors.taluka = "Required"
        else if (formdata.taluka !== "") newErrors.taluka = errors.taluka

        if (formdata.district === "") newErrors.district = "Required"
        else if (formdata.district !== "") newErrors.district = errors.district

        if (formdata.location === "") newErrors.location = "Required"
        else if (formdata.location !== "") newErrors.location = errors.location

        if (formdata.status === "") newErrors.status = "Required"
        else if (formdata.status !== "") newErrors.status = errors.status

        return newErrors
    }
    const handleFieldChange = (fieldName, value) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: ""
        }))
        // =========================addressType======================== 
        if (fieldName === "addressType") {
            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Required"
                }))
            }
            else if (value) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: ""
                }))
            }
            setFormdata((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // =========================address1======================== 
        if (fieldName === "address1") {
            if (value.trim() === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Required"
                }))
            }
            else if (value.trim().length < 3) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "value must be greater than 3 characters"
                }))
            }
            else if (value.trim().length > 60) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "value must be less than 60 characters"
                }))
                value = value.substring(0, 60)
            }
            setFormdata((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // =========================address2========================
        if (fieldName === "address2") {
            if (value.trim() === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Required"
                }))
            }
            else if (value.trim().length < 3) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "value must be greater than 3 characters"
                }))
            }
            else if (value.trim().length > 60) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "value must be less than 60 characters"
                }))
                value = value.substring(0, 60)
            }
            setFormdata((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // =========================address3======================== 
        if (fieldName === "address3") {
            if (value.trim() === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Required"
                }))
            }
            else if (value.trim().length < 3) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "value must be greater than 3 characters"
                }))
            }
            else if (value.trim().length > 60) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "value must be less than 60 characters"
                }))
                value = value.substring(0, 60)
            }
            setFormdata((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // =========================city======================== 
        if (fieldName === "city") {
            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Required"
                }))
            }
            else if (value) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: ""
                }))
            }
            setFormdata((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // =========================pinCode======================== 
        if (fieldName === "pinCode") {
            if (value.trim() === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Required"
                }))
            }
            else if (!pincodeRegex.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Invalid Pin Code"
                }))
            }
            setFormdata((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //=========================taluka======================== 
        if (fieldName === "taluka") {
            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Required"
                }))
            }
            else if (value) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: ""
                }))
            }
            setFormdata((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // =========================district======================== 
        if (fieldName === "district") {
            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Required"
                }))
            }
            else if (value) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: ""
                }))
            }
            setFormdata((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // =========================location======================== 
        if (fieldName === "location") {
            if (value.trim() === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Required"
                }))
            }
            else if (value.trim().length < 3) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "value must be greater than 3 characters"
                }))
            }
            else if (value.trim().length > 60) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "value must be less than 60 characters"
                }))
                value = value.substring(0, 60)
            }
            setFormdata((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // =========================status======================== 
        if (fieldName === "status") {
            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Required"
                }))
            }
            else if (value) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: ""
                }))
            }
            setFormdata((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        console.log(validationErorrs);
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
        if (!hasErrors) {
            const newRecord = {
                "address1": formdata.address1,
                "address2": formdata.address2,
                "address3": formdata.address3,
                "customer_code": CustomerCodeForAddress,
                "taluka_code": Number(formdata.taluka),
                "district_code": Number(formdata.district),
                "city_code": Number(formdata.city),
                "pincode": Number(formdata.pinCode),
                "location": formdata.location,
                "address_type": formdata.addressType,
                "addr_status": formdata.status,
            }
            try {
                const response = await customerApi.customerMaster().addAddress(newRecord)
                if (response.data.Status === 1) {
                    Swal.fire({
                        title: 'Saved',
                        text: 'Saved Sucessfully',
                        icon: 'success',
                        customClass: {
                            container: 'custom-swal-container'
                        }
                    });
                    fetchData(CustomerCodeForAddress)
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
        console.log(validationErorrs);
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
        if (!hasErrors) {
            const newRecord = {
                "address1": formdata.address1,
                "address2": formdata.address2,
                "address3": formdata.address3,
                "customer_code": CustomerCodeForAddress,
                "taluka_code": Number(formdata.taluka),
                "district_code": Number(formdata.district),
                "city_code": Number(formdata.city),
                "pincode": Number(formdata.pinCode),
                "location": formdata.location,
                "address_type": formdata.addressType,
                "addr_status": formdata.status,
            }
            try {
                const response = await customerApi.customerMaster().addAddress(newRecord)
                if (response.data.Status === 1) {
                    Swal.fire({
                        title: 'Saved',
                        text: 'Updated Sucessfully',
                        icon: 'success',
                        customClass: {
                            container: 'custom-swal-container'
                        }
                    });
                    fetchData(CustomerCodeForAddress)
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
    const handleClear = () => {
        setFormdata({
            addressType: '',
            address1: "",
            address2: "",
            address3: "",
            city: "",
            pinCode: "",
            taluka: "",
            district: "",
            location: "",
            status: "",
        })
        setErrors({})
        setSaveButton(true)
        setUpdateButton(false)
    }
    const fetchData = async (CustomerCodeForAddress) => {
        try {
            const response = await customerApi.customerMaster().addressFetchAll(CustomerCodeForAddress)
            if (response.status === 200) {
                setRows(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const dd_Fetch_districtName = async () => {
        try {
            const response = await customerApi.customerMaster().DD_fetch_DistrictName()
            if (response.status === 200) {
                setDDDistrictNames(response.data.items);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const dd_Fetch_TalukaName = async () => {
        try {
            const response = await customerApi.customerMaster().DD_fetch_TalukaName()
            if (response.status === 200) {
                setDDTalukaNames(response.data.items);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const dd_Fetch_cityName = async () => {
        try {
            const response = await customerApi.customerMaster().DD_fetch_cityName()
            if (response.status === 200) {
                setDDCityNames(response.data.items);

            }
        } catch (error) {
            console.log(error);
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
            field: 'address_id',
            headerName: 'Address ID',
            width: 150,
        },
        {
            field: 'address1',
            headerName: 'Address 1',
            width: 150,
        },
        {
            field: 'address2',
            headerName: 'Address 2',
            width: 150,
        },
        {
            field: 'address3',
            headerName: 'Address 3',
            width: 150,
        },
        {
            field: 'address_type',
            headerName: 'Address Type',
            width: 150,
        },
        {
            field: 'city_code',
            headerName: 'City Code',
            width: 150,
        },
        {
            field: 'district_code',
            headerName: 'District Code',
            width: 150,
        },
        {
            field: 'location',
            headerName: 'Location',
            width: 150,
        },
        {
            field: 'pincode',
            headerName: 'Pincode',
            width: 150,
        },
        {
            field: 'taluka_code',
            headerName: 'taluka Code',
            width: 150,
        },
        {
            field: 'addr_status',
            headerName: 'Address Status',
            width: 150,
        },

    ];
    const handleEdit = (row) => {
        console.log(row);
        setSaveButton(false)
        setUpdateButton(true)
        setErrors({})
        let address_type
        let addr_status
        if (row.address_type === "B") address_type = "B"
        else if (row.address_type === "S") address_type = "S"
        if (row.addr_status === "Y") addr_status = "Y"
        else if (row.addr_status === "N") addr_status = "N"
        setFormdata((prevdata) => ({
            ...prevdata,
            addressType: address_type,
            address1: row.address1,
            address2: row.address2,
            address3: row.address3,
            city: row.city_code,
            pinCode: row.pincode,
            taluka: row.taluka_code,
            district: row.district_code,
            location: row.location,
            status:addr_status,
        }))
    }
    useEffect(() => {
        dd_Fetch_cityName()
        dd_Fetch_TalukaName()
        dd_Fetch_districtName()
        fetchData(CustomerCodeForAddress)
    }, [CustomerCodeForAddress])
    return (
        <>
            <Grid container spacing={2} paddingLeft={2} paddingTop={1}>
                {/* ================ */}
                <Grid item xs={2} sm={2} md={10} lg={10} sx={{ width: "1000px", borderBottom: "1px solid #000" }}>
                    <Typography variant="h4">
                        Address Details
                    </Typography>
                </Grid>
                {/* ================ */}
                <Grid item xs={2} sm={2} md={2} lg={2} sx={{ textAlign: "end", width: "1000px", borderBottom: "1px solid #000" }}>
                    <Button onClick={CloseAddressDetails} sx={{ marginTop: "-5px" }}>
                        <HighlightOffIcon fontSize='large' />
                    </Button>
                </Grid>
                {/* ================ */}
            </Grid>
            {/* ================ */}
            <Grid container spacing={2} padding={2} >
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
                {/* =========================Address Type======================== */}
                <Grid item md={4} lg={4} sm={12} xs={12}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={AddressType}
                        size='small'
                        fullWidth
                        getOptionLabel={(options) => options.name}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        value={AddressType.find(option => option.value === formdata.addressType) || null}
                        onChange={(e, v) => handleFieldChange("addressType", v?.value || "")}
                        sx={autoCompleteStyle}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Address Type"
                                required
                                error={Boolean(errors.addressType)}
                                helperText={errors.addressType}
                            />}
                    />
                </Grid>
                {/* =========================Address 1======================== */}
                <Grid item md={12} lg={12} sm={12} xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Address 1"
                        variant="outlined"
                        size='small'
                        fullWidth
                        sx={textFiledStyle}
                        required
                        value={formdata.address1}
                        onChange={(e) => handleFieldChange("address1", e.target.value.toUpperCase())}
                        error={Boolean(errors.address1)}
                        helperText={errors.address1}
                    />
                </Grid>
                {/* =========================Address 2======================== */}
                <Grid item md={12} lg={12} sm={12} xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Address 2"
                        variant="outlined"
                        size='small'
                        fullWidth
                        sx={textFiledStyle}
                        required
                        value={formdata.address2}
                        onChange={(e) => handleFieldChange("address2", e.target.value.toUpperCase())}
                        error={Boolean(errors.address2)}
                        helperText={errors.address2}
                    />
                </Grid>
                {/* =========================Address 3======================== */}
                <Grid item md={12} lg={12} sm={12} xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Address 3"
                        variant="outlined"
                        size='small'
                        fullWidth
                        sx={textFiledStyle}
                        required
                        value={formdata.address3}
                        onChange={(e) => handleFieldChange("address3", e.target.value.toUpperCase())}
                        error={Boolean(errors.address3)}
                        helperText={errors.address3}
                    />
                </Grid>
                {/* =========================City======================== */}
                <Grid item md={4} lg={4} sm={12} xs={12}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={DDCityNames}
                        size='small'
                        fullWidth
                        getOptionLabel={(options) => options.city_name}
                        isOptionEqualToValue={(option, value) => option.city_code === value.city_code}
                        value={DDCityNames.find(option => option.city_code === formdata.city) || null}
                        onChange={(e, v) => handleFieldChange("city", v?.city_code || "")}
                        sx={autoCompleteStyle}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="City"
                                required
                                error={Boolean(errors.city)}
                                helperText={errors.city}
                            />}
                    />
                </Grid>
                {/* =========================PinCode======================== */}
                <Grid item md={4} lg={4} sm={12} xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="PinCode"
                        variant="outlined"
                        size='small'
                        fullWidth
                        sx={textFiledStyle}
                        required
                        value={formdata.pinCode}
                        onChange={(e) => handleFieldChange("pinCode", e.target.value.replace(/[^0-9]/g, ''))}
                        error={Boolean(errors.pinCode)}
                        helperText={errors.pinCode}
                    />
                </Grid>
                {/* =========================Taluk======================== */}
                <Grid item md={4} lg={4} sm={12} xs={12}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={DDTalukaNames}
                        size='small'
                        fullWidth
                        getOptionLabel={(options) => options.taluka_name}
                        isOptionEqualToValue={(option, value) => option.taluka_code === value.taluka_code}
                        value={DDTalukaNames.find(option => option.taluka_code === formdata.taluka) || null}
                        onChange={(e, v) => handleFieldChange("taluka", v?.taluka_code || "")}
                        sx={autoCompleteStyle}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Taluk"
                                required
                                error={Boolean(errors.taluka)}
                                helperText={errors.taluka}
                            />}
                    />
                </Grid>
                {/* =========================District======================== */}
                <Grid item md={4} lg={4} sm={12} xs={12}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={DDDistrictNames}
                        size='small'
                        fullWidth
                        getOptionLabel={(options) => options.district_name}
                        isOptionEqualToValue={(option, value) => option.district_code === value.district_code}
                        value={DDDistrictNames.find(option => option.district_code === formdata.district) || null}
                        onChange={(e, v) => handleFieldChange("district", v?.district_code || "")}
                        sx={autoCompleteStyle}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="District"
                                required
                                error={Boolean(errors.district)}
                                helperText={errors.district}
                            />}
                    />
                </Grid>
                {/* =========================Location======================== */}
                <Grid item md={4} lg={4} sm={12} xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Location"
                        variant="outlined"
                        size='small'
                        fullWidth
                        sx={textFiledStyle}
                        required
                        value={formdata.location}
                        onChange={(e) => handleFieldChange("location", e.target.value.toUpperCase())}
                        error={Boolean(errors.location)}
                        helperText={errors.location}
                    />
                </Grid>
                {/* =========================Status======================== */}
                <Grid item md={4} lg={4} sm={12} xs={12}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={status}
                        size='small'
                        fullWidth
                        getOptionLabel={(options) => options.name}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        value={status.find(option => option.value === formdata.status) || null}
                        onChange={(e, v) => handleFieldChange("status", v?.value || "")}
                        sx={autoCompleteStyle}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Status"
                                required
                                error={Boolean(errors.status)}
                                helperText={errors.status}
                            />}
                    />
                </Grid>
                {/* =========================BTN======================== */}
                <Grid item md={12} lg={12} sm={12} xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Stack direction="row" spacing={1}>
                        {saveButton && (<Button
                            variant="contained"
                            size='small'
                            onClick={(e) => handleSubmit(e)}
                        >
                            Save
                        </Button>)}
                        {updateButton && (<Button
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
                <Grid item md={12} lg={12} sm={12} xs={12}>
                    <Box sx={{ height: 169, width: '100%', marginTop: '20px' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            getRowId={(row) => row.address_id.toString()}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 1,
                                    },
                                },
                            }}
                            columnVisibilityModel={columnVisibilityModel}
                            onColumnVisibilityModelChange={(newModel) =>
                                setColumnVisibilityModel(newModel)
                            }
                            pageSizeOptions={[1, 5, 10, 20]}
                            disableRowSelectionOnClick
                            getRowHeight={() => 35}
                            getRowClassName={getRowClassName}
                        />
                    </Box>
                </Grid>
                {/* =========================datagrid end======================== */}
            </Grid>
        </>
    )
}
