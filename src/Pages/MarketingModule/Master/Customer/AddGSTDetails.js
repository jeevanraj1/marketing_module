import { Grid, TextField, Autocomplete, Typography, Box, Button, Stack, } from '@mui/material'
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
const status = [
    { name: "INFORCE", value: "I" },
    { name: "CANCELLED", value: "C" },
]
export default function AddGSTDetails({ closeGSTDetails, customerCode, userCode, customerName }) {
    const [rows, setRows] = useState([]);
    const [formData, setFormData] = useState({
        gst_reg_date: '',
        gst_cancel_date: "",
        status: "I",
    });
    const [customerCodeForGst, setCustomerCodeForGst] = useState(1);
    const [maxGstCancleDate, setMaxGstCancleDate] = useState(null);
    const [errors, setErrors] = useState({});
    const [GSTID, setGSTID] = useState(null);
    const [updateButton, setUpdateButton] = useState(false);
    const [saveButton, setSaveButton] = useState(true);
    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        gst_id: false
    })
    const [showCancleDate, setShowCancleDate] = useState(false);

    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };
    const handleFieldChange = async (fieldName, value) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));

        if (fieldName === "Regdate") {
            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    gst_reg_date: "Required",
                }));
            }
            else if (value !== "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    gst_reg_date: "",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                gst_reg_date: value
            }))
        }
        if (fieldName === "CancelDate") {
            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    gst_cancel_date: "Required",
                }));
            }
            else if (value !== "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    gst_cancel_date: "",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                gst_cancel_date: value
            }))
        }
        if (fieldName === "status") {
            if (value === "C") setShowCancleDate(true)
            else if (value === "") {
                setShowCancleDate(false);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    status: "Required",
                }));
            }
            else if (value === "I") setShowCancleDate(false)
            setFormData((prevdata) => ({
                ...prevdata,
                status: value
            }))
        }
    }
    const validation = () => {
        const newErrors = {}
        if (formData.gst_reg_date === "") newErrors.gst_reg_date = "Required"
        else if (formData.gst_reg_date !== "") newErrors.gst_reg_date = errors.gst_reg_date

        if (formData.status === "") newErrors.status = "Required"
        else if (formData.status !== "") newErrors.status = errors.status

        if (formData.status === "C") {
            if (formData.gst_cancel_date === "") newErrors.gst_cancel_date = "Required"
            else if (formData.gst_cancel_date !== "") newErrors.gst_cancel_date = errors.gst_cancel_date
        }
        return newErrors
    }
    const handleSave = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        console.log(validationErorrs);
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
        if (!hasErrors) {
            try {
                const response = await customerApi.customerMaster().gstStatusCheck(customerCodeForGst)
                if (response.data.items[0].count === 0) {
                    const newRecord = {
                        "customer_code": customerCodeForGst,
                        "regd_date": formData.gst_reg_date,
                        "cncl_date": formData.gst_cancel_date,
                        "gst_status": formData.status,
                    }
                    try {
                        const response = await customerApi.customerMaster().addGstDetails(newRecord)
                        if (response.data.Status === 1) {
                            Swal.fire({
                                title: 'Saved',
                                text: 'Saved Sucessfully',
                                icon: 'success',
                                customClass: {
                                    container: 'custom-swal-container'
                                }
                            });
                            fetchData(customerCodeForGst)
                            handleClear()
                            getMaxGstCancleDate(customerCodeForGst)
                        }
                        else {
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
                else {
                    Swal.fire({
                        title: 'error',
                        text: 'You already have inforce',
                        icon: 'warning',
                        customClass: {
                            container: 'custom-swal-container'
                        }
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }

    }
    const handleUpdate = async (e) => {
        console.log(formData);
        e.preventDefault()
        const validationErorrs = validation()
        console.log(validationErorrs);
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
        if (!hasErrors) {
            const newRecord = {
                "customer_code": customerCodeForGst,
                "regd_date": dayjs(formData.gst_reg_date).format("DD/MMM/YYYY"),
                "cncl_date": dayjs(formData.gst_cancel_date).format("DD/MMM/YYYY"),
                "gst_status": formData.status,
            }
            try {
                const response = await customerApi.customerMaster().UpdateGSTDetails(GSTID, newRecord)
                if (response.data.Status === 1) {
                    Swal.fire({
                        title: 'Saved',
                        text: 'Updated Sucessfully',
                        icon: 'success',
                        customClass: {
                            container: 'custom-swal-container'
                        }
                    });
                    fetchData(customerCodeForGst)
                    handleClear()
                    setShowCancleDate(false)
                    getMaxGstCancleDate(customerCodeForGst)
                }
                else {
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

    const getMaxGstCancleDate = async (customerCodeForGst) => {
        try {
            const response = await customerApi.customerMaster().gstCancleDate(customerCodeForGst)
            if (response.data.items[0].result === "Y") {
                setMaxGstCancleDate(null);
            } else {
                setMaxGstCancleDate(dayjs(response.data.items[0].result).format('DD/MMM/YYYY'))
            }
        } catch (error) {
            console.log(error);
        }
    }
    const fetchData = async (customerCodeForGst) => {
        try {
            const response = await customerApi.customerMaster().fetchGSTDetails(customerCodeForGst)
            if (response.status === 200) {
                setRows(response.data.items);
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
            field: 'gst_id',
            headerName: 'GST ID',
            width: 150,
        },
        {
            field: 'regd_date',
            headerName: 'Registration Date',
            width: 150,
        },
        {
            field: 'cncl_date',
            headerName: 'Expire Date',
            width: 150,
        },
        {
            field: 'gst_status',
            headerName: 'GST Status',
            type: 'number',
            width: 110,
        },
    ];
    const handleEdit = (row) => {
        setSaveButton(false)
        setUpdateButton(true)
        setErrors({})
        setGSTID(row.gst_id)
        if (row.gst_status === "INFORCE") {
            setFormData((prevdata) => ({
                ...prevdata,
                gst_reg_date: dayjs(row.regd_date),
                gst_cancel_date: dayjs() || null,
                status: "I"
            }))
        }
    }
    const handleClear = ()=>{
        setFormData({gst_cancel_date:"",gst_reg_date:"",status:"I"})
        setSaveButton(true)
        setUpdateButton(false)
        setErrors({})
        setShowCancleDate(false)
    }
    rows.forEach(item => {
        item.regd_date = dayjs(item.regd_date).format("DD/MMM/YYYY")

        if (item.cncl_date === null) item.cncl_date = null
        else item.cncl_date = dayjs(item.cncl_date).format("DD/MMM/YYYY")

        if (item.gst_status === "I") item.gst_status = "INFORCE"
        else if (item.gst_status === "C") item.gst_status = "CANCELLED"
    })
    useEffect(() => {
        fetchData(customerCodeForGst)
        getMaxGstCancleDate(customerCodeForGst)
    }, [])
    return (
        <>
            <Grid container spacing={2} paddingLeft={2} paddingTop={1}>
                {/* ================ */}
                <Grid item xs={2} sm={2} md={10} lg={10} sx={{ width: "1000px", borderBottom: "1px solid #000" }}>
                    <Typography variant="h4">
                        GST  Details
                    </Typography>
                </Grid>
                {/* ================ */}
                <Grid item xs={2} sm={2} md={2} lg={2} sx={{ textAlign: "end", width: "1000px", borderBottom: "1px solid #000" }}>
                    <Button onClick={closeGSTDetails} sx={{ marginTop: "-5px" }}>
                        <HighlightOffIcon fontSize='large' />
                    </Button>
                </Grid>
                {/* ================ */}
            </Grid>
            {/* ================ */}
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
                {/* =========================Registration Date======================== */}
                <Grid item md={3.7} lg={3.7} sm={12} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format='DD/MM/YYYY'
                            label="GST Registration/Activation Date"
                            sx={datePickerStyle}
                            minDate={dayjs(maxGstCancleDate).add(1, "day") || null}
                            value={formData.gst_reg_date || null}
                            onChange={(date) => handleFieldChange("Regdate", dayjs(date).format("DD/MMM/YYYY"))}
                            slotProps={
                                {
                                    textField:
                                    {
                                        size: "small",
                                        required: true,
                                        error: Boolean(errors.gst_reg_date),
                                        helperText: errors.gst_reg_date
                                    }
                                }}
                        />
                    </LocalizationProvider>
                </Grid>

                {/* =========================Cancel Date======================== */}
                <Grid item md={3} lg={3} sm={12} xs={12}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={status}
                        size='small'
                        fullWidth
                        getOptionLabel={(options) => options.name}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        value={status.find(option => option.value === formData.status) || null}
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
                {/* =========================Cancel Date======================== */}
                {showCancleDate && (<Grid item md={3.7} lg={3.7} sm={12} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format='DD/MM/YYYY'
                            label="GST Cancellation Date"
                            sx={datePickerStyle}
                            value={formData.gst_cancel_date || null}
                            minDate={dayjs(formData.gst_reg_date).add(1, "day")}
                            onChange={(value) => handleFieldChange("CancelDate", value)}
                            slotProps={
                                {
                                    textField:
                                    {
                                        size: "small",
                                        required: true,
                                        error: Boolean(errors.gst_cancel_date),
                                        helperText: errors.gst_cancel_date
                                    }
                                }}
                        />
                    </LocalizationProvider>
                </Grid>)}
                {/* =========================Button======================== */}
                <Grid item md={12} lg={12} sm={12} xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Stack direction="row" spacing={1}>
                        {saveButton && (<Button
                            variant="contained"
                            size='small'
                            onClick={handleSave}
                        >
                            Save
                        </Button>)}
                        {updateButton && (<Button
                            variant="contained"
                            size='small'
                            onClick={handleUpdate}
                        >
                            Update
                        </Button>)}
                        <Button
                            variant="contained"
                            size='small'
                            color="error"
                            onClick={handleClear}
                        >
                            Clear
                        </Button>
                    </Stack>
                </Grid>
                {/* =========================datagrid start======================== */}
                <Grid item md={12} lg={12} sm={12} xs={12}>
                    <Box sx={{ height: 300, width: '100%', marginTop: '20px' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            getRowId={(row) => row.gst_id.toString()}
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
                {/* ================ */}
            </Grid>
        </>
    )
}
