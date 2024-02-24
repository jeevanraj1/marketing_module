import React from 'react'
import { Grid, Typography, Paper, Button, Box, TextField, Stack, Autocomplete } from '@mui/material'
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { useState, useEffect } from "react";
import { PacketsUnitsAPi } from "../../../Api";
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid'

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
export default function PacketUnitsDT() {
    const [rows, setRows] = useState([]);
    const [saveButton, setSaveButton] = useState(true);
    const [updateButton, setUpdateButton] = useState(false);
    const [DDGSTUnits, setDDGSTUnits] = useState([]);
    const [formdata, setFormdata] = useState({
        unitName: "",
        gstUnits: ""
    });
    const [errors, setErrors] = useState({});
    const [unitId, setUnitId] = useState(null);


    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        unit_id: false
    });


    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };
    const validation = () => {
        const newErrors = {}
        // ===========================================================unitName===========================================
        if (formdata.unitName === "") newErrors.unitName = "Required"
        else if (formdata.unitName !== "") newErrors.unitName = errors.unitName
        // ===========================================================gstUnits===========================================
        if (formdata.gstUnits === "") newErrors.gstUnits = "Required"
        else if (formdata.gstUnits !== "") newErrors.gstUnits = errors.gstUnits

        return newErrors
    }
    const handleClear = () => {
        setSaveButton(true)
        setUpdateButton(false)
        setErrors({})
        setFormdata({
            gstUnits: "",
            unitName: "",
        })
        localStorage.setItem("Navigation_state", true)
    }
    const handleFieldChange = (fieldname, value) => {
        localStorage.setItem("Navigation_state", false)
        setErrors((preErrors) => ({
            ...preErrors,
            [fieldname]: ''
        }))
        // ===========================================================unitName===========================================
        if (fieldname === "unitName") {
            if (value === "") {
                setErrors((preErrors) => ({
                    ...preErrors,
                    [fieldname]: "Required",
                }))
            }
            else if (value.trim().length > 10) {
                setErrors((preErrors) => ({
                    ...preErrors,
                    [fieldname]: "Value Must Be less than 10 Charaters",
                }))
            }
            setFormdata((prevdata) => ({
                ...prevdata,
                [fieldname]: value,
            }))
        }
        // ===========================================================gstUnits===========================================
        if (fieldname === "gstUnits") {
            if (value === "") {
                setErrors((preErrors) => ({
                    ...preErrors,
                    [fieldname]: "Required",
                }))
            }
            setFormdata((prevdata) => ({
                ...prevdata,
                [fieldname]: value,
            }))
        }

    }
    const handleUpdate = async (e) => { 
        e.preventDefault()
        const validationErorrs = validation()
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
        if (!hasErrors) {
            const newRecord = {
                "uom": formdata.unitName.trim(),
                "gst_unit": formdata.gstUnits,
                "description": null,
            }
            try {
                const response = await PacketsUnitsAPi.PacketsUnitsAPi_master().update(unitId,newRecord);
                if (response.data.Status === 1) {
                    Swal.fire({
                        title: 'Saved',
                        text: 'Updated Sucessfully',
                        icon: 'success',
                        customClass: {
                            container: 'custom-swal-container'
                        }
                    });
                    handleClear()
                    fetchData()
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
    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
        if (!hasErrors) {
            const newRecord = {
                "uom": formdata.unitName.trim(),
                "gst_unit": formdata.gstUnits,
                "description": null,
            }
            try {
                const response = await PacketsUnitsAPi.PacketsUnitsAPi_master().create(newRecord)
                if (response.data.Status === 1) {
                    Swal.fire({
                        title: 'Saved',
                        text: 'Saved Sucessfully',
                        icon: 'success',
                        customClass: {
                            container: 'custom-swal-container'
                        }
                    });
                    handleClear()
                    fetchData()
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
            field: 'unit_id',
            headerName: 'Taluka Code',
            width: 150,
        },
        {
            field: 'uom',
            headerName: 'Unit Name',
            width: 150,
        },
        {
            field: 'gst_unit',
            headerName: 'GST Units',
            width: 110,
        },

    ];
    const fetchGSTUnits = async () => {
        try {
            const response = await PacketsUnitsAPi.PacketsUnitsAPi_master().DD_gst_units()
            if (response.status === 200) {
                setDDGSTUnits(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchData = async () => {
        const response = await PacketsUnitsAPi.PacketsUnitsAPi_master().fetchAll()
        if (response.status === 200) {
            setRows(response.data.items)
        }
    }
    const handleEdit = (row) => {
        setSaveButton(false)
        setUpdateButton(true)
        setFormdata((prevdata) => ({
            ...prevdata,
            unitName: row.uom,
            gstUnits: row.gst_unit,
        }))
        setErrors({})
        setUnitId(row.unit_id)
        localStorage.setItem("Navigation_state", true)
    }
    useEffect(() => {
        fetchData()
        fetchGSTUnits()
        document.title = "Packets Units"
    }, [])
    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={12} lg={12} sm={12} xs={12}>
                    <Paper sx={{ padding: 2 }} elevation={3}>
                        <Grid container spacing={2}>
                            {/* =========================Taluk  Master======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Typography variant='h5'>
                                    Packet Units
                                </Typography>
                            </Grid>
                            {/* =========================Unit Name======================== */}
                            <Grid item md={4} lg={4} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Unit Name"
                                    variant="outlined"
                                    size='small'
                                    required
                                    sx={textFiledStyle}
                                    fullWidth
                                    value={formdata.unitName}
                                    onChange={(e) => handleFieldChange("unitName", e.target.value.toUpperCase())}
                                    error={Boolean(errors.unitName)}
                                    helperText={errors.unitName}
                                />
                            </Grid>
                            {/* =========================GSt Units======================== */}
                            <Grid item md={8} lg={8} sm={12} xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size='small'
                                    fullWidth
                                    options={DDGSTUnits}
                                    sx={autoCompleteStyle}
                                    getOptionLabel={(options) => options.unit_name}
                                    renderOption={(props, options) => (
                                        <Box component="li" {...props}>
                                            {options.unit_name} ({options.gst_unit})
                                        </Box>
                                    )}
                                    isOptionEqualToValue={(option, value) => option.gst_unit === value.gst_unit}
                                    value={DDGSTUnits.find(option => option.gst_unit === formdata.gstUnits) || null}
                                    onChange={(e, v) => handleFieldChange("gstUnits", v?.gst_unit || "")}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="GST Units"
                                            required
                                            error={Boolean(errors.gstUnits)}
                                            helperText={errors.gstUnits}
                                        />}
                                />
                            </Grid>

                            {/* =========================Button======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Stack direction="row" spacing={2}>
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
                                getRowId={(row) => row.unit_id.toString()}
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
