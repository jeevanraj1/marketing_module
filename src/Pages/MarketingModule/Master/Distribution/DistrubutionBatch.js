import React from 'react'
import { Grid, Typography, Paper, Button, Box, TextField, Stack } from '@mui/material'
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { useState, useEffect } from "react";
import { DistributionBatchAPI } from "../../../Api";
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid'

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

export default function DistrubutionBatch() {
    const [rows, setRows] = useState([]);
    const [saveButton, setSaveButton] = useState(true);
    const [updateButton, setUpdateButton] = useState(false);
    const [distrubutionBatchNumber, setDistrubutionBatchNumber] = useState(null);
    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        dist_batch_no: false
    });
    const [formData, setFormData] = useState({
        distrubutionBatchName: '',
        shift: '',
        startTime: '',
        cutOffTime: ""
    });
    const [errors, setErrors] = useState({});
    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };
    const validation = () => {
        const newErrors = {}

        if (formData.distrubutionBatchName === "") newErrors.distrubutionBatchName = "Required"
        else if (formData.distrubutionBatchName !== "") newErrors.distrubutionBatchName = errors.distrubutionBatchName

        if (formData.shift === "") newErrors.shift = "Required"
        else if (formData.shift !== "") newErrors.shift = errors.shift

        if (formData.startTime === "") newErrors.startTime = ""
        else if (formData.startTime !== "") newErrors.startTime = errors.startTime

        if (formData.cutOffTime === "") newErrors.cutOffTime = ""
        else if (formData.cutOffTime !== "") newErrors.cutOffTime = errors.cutOffTime

        return newErrors
    }

    const handleFieldChange = (fieldName, value) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: ''
        }))
        //==============================distrubutionBatchName=========================
        if (fieldName === "distrubutionBatchName") {
            if (value.trim() === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: 'Required'
                }))
            }
            else if (value.trim().length < 3) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: 'Value must me be More Than 3 Charaters'
                }))
            }
            else if (value.trim().length > 50) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: 'Value must me be less Than 50 Charaters'
                }))
                value = value.substring(0, 50)
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //==============================shift=========================
        if (fieldName === "shift") {
            if (value.trim() === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: 'Required'
                }))
            }
            else if (value.trim().length > 2) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: 'Value must me be less Than 2 Charaters'
                }))
                value = value.substring(0, 2)
                setTimeout(() => {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        [fieldName]: ''
                    }))
                }, 1000)
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //==============================startTime=========================
        if (fieldName === "startTime") {
            if (value.trim() === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: ''
                }))
            }
            else if (value.trim().length < 3) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: 'Value must me be more Than 3 Charaters'
                }))
            }
            else if (value.trim().length > 12) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: 'Value must me be less Than 12 Charaters'
                }))
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //==============================cutOffTime=========================
        if (fieldName === "cutOffTime") {
            if (value.trim() === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: ''
                }))
            }
            else if (value.trim().length < 3) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: 'Value must me be more Than 3 Charaters'
                }))
            }
            else if (value.trim().length > 12) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: 'Value must me be less Than 12 Charaters'
                }))
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
    }
    const handleClear = () => {
        setFormData({
            distrubutionBatchName: '',
            shift: '',
            startTime: '',
            cutOffTime: ""
        })
        setErrors({})
        setSaveButton(true)
        setUpdateButton(false)
    }
    const handleUpdate = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
        if (!hasErrors) {
            const newRecord = {
                "dist_batch_name": formData.distrubutionBatchName,
                "shift": formData.shift,
                "st_time": formData.startTime !== "" ? formData.startTime : null,
                "cut_off": formData.cutOffTime !== "" ? formData.cutOffTime : null,
            }
            try {
                const response = await DistributionBatchAPI.DistributionBatch_master().update(distrubutionBatchNumber,newRecord)
                if (response.data.Status === 1) {
                    Swal.fire({
                        title: 'Saved',
                        text: 'Updated Sucessfully',
                        icon: 'success',
                    });
                    handleClear();
                    fetchData()
                    localStorage.setItem("Navigation_state", true)
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: `${response.data.Error}` || 'Unknown Error',
                        icon: 'error',
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Unknown Error',
                    icon: 'error',
                });
            }

        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
        if (!hasErrors) {
            const newRecord = {
                "dist_batch_name": formData.distrubutionBatchName,
                "shift": formData.shift,
                "st_time": formData.startTime !== "" ? formData.startTime : null,
                "cut_off": formData.cutOffTime !== "" ? formData.cutOffTime : null,
            }
            try {
                const response = await DistributionBatchAPI.DistributionBatch_master().create(newRecord)
                if (response.data.Status === 1) {
                    Swal.fire({
                        title: 'Saved',
                        text: 'Saved Sucessfully',
                        icon: 'success',
                    });
                    handleClear();
                    fetchData()
                    localStorage.setItem("Navigation_state", true)
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: `${response.data.Error}` || 'Unknown Error',
                        icon: 'error',
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Unknown Error',
                    icon: 'error',
                });
            }

        }
    }
    const columns = [
        {
            field: "action",
            headerName: "Action",
            width: 69,
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
            field: 'dist_batch_no',
            headerName: 'Distrubution Batch Number',
            width: 150,
        },
        {
            field: 'dist_batch_name',
            headerName: 'Distrubution Batch Name',
            width: 150,
        },
        {
            field: 'shift',
            headerName: 'Shift',
            width: 50,
        },
        {
            field: 'st_time',
            headerName: 'Start Time',
            width: 110,
            type: 'number',
        },
        {
            field: 'cut_off',
            headerName: 'Cut Off Time',
            width: 110,
            type: 'number',
        },

    ];
    const fetchData = async () => {
        try {
            const response = await DistributionBatchAPI.DistributionBatch_master().fetchAll()
            if (response.status === 200) {
                setRows(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleEdit = (row) => {
        setUpdateButton(true)
        setSaveButton(false)
        console.log(row);
        setFormData((prevdata) => ({
            ...prevdata,
            distrubutionBatchName: row.dist_batch_name,
            shift: row.shift,
            startTime: row.st_time,
            cutOffTime: row.cut_off
        }))
        setDistrubutionBatchNumber(row.dist_batch_no)
    }
    useEffect(() => {
        document.title = "Distribution Batch master"
        fetchData()
    }, [])
    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={6} lg={6} sm={12} xs={12}>
                    <Paper sx={{ padding: 2 }} elevation={3} >
                        <Grid container spacing={2}>
                            {/* =========================Distribution Batch======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Typography variant='h5'>
                                    Distribution Batch 
                                </Typography>
                            </Grid>
                            {/* =========================Distubution Batch Name======================== */}
                            <Grid item md={6} lg={6} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Distubution Batch Name"
                                    variant="outlined"
                                    size='small'
                                    required
                                    sx={textFiledStyle}
                                    fullWidth
                                    value={formData.distrubutionBatchName}
                                    onChange={(e) => handleFieldChange("distrubutionBatchName", e.target.value.toUpperCase())}
                                    error={Boolean(errors.distrubutionBatchName)}
                                    helperText={errors.distrubutionBatchName}

                                />
                            </Grid>
                            {/* =========================Shift======================== */}
                            <Grid item md={6} lg={6} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Shift"
                                    variant="outlined"
                                    size='small'
                                    required
                                    sx={textFiledStyle}
                                    fullWidth
                                    value={formData.shift}
                                    onChange={(e) => handleFieldChange("shift", e.target.value.toUpperCase())}
                                    error={Boolean(errors.shift)}
                                    helperText={errors.shift}

                                />
                            </Grid>
                            {/* =========================Start Time======================== */}
                            <Grid item md={6} lg={6} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Start Time"
                                    variant="outlined"
                                    size='small'
                                    name='statusName'
                                    sx={textFiledStyle}
                                    fullWidth
                                    value={formData.startTime}
                                    onChange={(e) => handleFieldChange("startTime", e.target.value.toUpperCase())}
                                    error={Boolean(errors.startTime)}
                                    helperText={errors.startTime}

                                />
                            </Grid>
                            {/* =========================CutOff Time======================== */}
                            <Grid item md={6} lg={6} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Cut-Off Time"
                                    variant="outlined"
                                    size='small'
                                    name='statusName'
                                    sx={textFiledStyle}
                                    fullWidth
                                    value={formData.cutOffTime}
                                    onChange={(e) => handleFieldChange("cutOffTime", e.target.value.toUpperCase())}
                                    error={Boolean(errors.cutOffTime)}
                                    helperText={errors.cutOffTime}

                                />
                            </Grid>
                            {/* =========================Button======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Stack spacing={{ xs: 1, sm: 1, md: 1 }} direction={{ xs: 'column', sm: 'row' }}>
                                    {saveButton && (
                                        <Button
                                            variant="contained"
                                            onClick={handleSubmit}
                                            type='submit'
                                            size='small'>
                                            Save
                                        </Button>
                                    )}
                                    {updateButton && (
                                        <Button
                                            variant="contained"
                                            onClick={handleUpdate}
                                            type='submit'
                                            size='small'>
                                            Update
                                        </Button>
                                    )}
                                    <Button variant="contained"
                                        onClick={handleClear}
                                        color="error"
                                        size='small'>
                                        Clear
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Grid xs={12} sm={12} md={12} lg={12}>
                        <Box sx={{ height: 300, width: '100%', marginTop: '20px' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                getRowId={(row) => row.dist_batch_no.toString()}
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
                </Grid>
            </Grid>
        </>
    )
}
