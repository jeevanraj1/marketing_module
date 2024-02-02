import React from 'react'
import { Grid, Typography, Paper, Button, Box, TextField, Stack, Autocomplete } from '@mui/material'
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { useState, useEffect } from "react";
import { TalukaAPI } from "../../../Api";
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

export default function TalukaDT() {
    const [rows, setRows] = useState([]);
    const [talukaCode, setTalukaCode] = useState(null);
    const [saveButton, setSaveButton] = useState(true);
    const [updateButton, setUpdateButton] = useState(false);
    const [fetchDistrictNamesDD, setFetchDistrictNamesDD] = useState([]);
    const [errors, setErrors] = React.useState({})
    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        taluka_code: false
    });
    const [formData, setFormData] = React.useState({
        talukaName: "",
        districtName: "",
    });
    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };

    const validation = () => {
        const newErrors = {}
        if (formData.talukaName === "") newErrors.talukaName = "Required"
        else if (formData.talukaName !== "") newErrors.talukaName = errors.talukaName

        if (formData.districtName === "") newErrors.districtName = "Required"
        else if (formData.districtName !== "") newErrors.districtName = errors.districtName
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
                    "taluka_name": formData.talukaName.trim(),
                    "district_code": Number(formData.districtName)
                }
                const respone = await TalukaAPI.TalukaAPI_master().create(newRecord)
                if (respone.data.Status === 1) {
                    Swal.fire("sucess", "Saved Sucessfully", "success")
                    handleClear()
                    fetchData()
                    localStorage.setItem("Navigation_state", true)
                } else {
                    Swal.fire('Error' `${respone.data.Error}`, 'error')
                }
            } catch (error) {
                Swal.fire('Error' `error while posting`, 'error')
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
                    "taluka_name": formData.talukaName.trim(),
                    "district_code": Number(formData.districtName)
                }
                const respone = await TalukaAPI.TalukaAPI_master().update(talukaCode, newRecord)
                console.log(respone);
                if (respone.data.Status === 1) {
                    Swal.fire("sucess", "Updated Sucessfully", "success")
                    handleClear()
                    fetchData()
                    localStorage.setItem("Navigation_state", true)
                } 
                else if (respone.data.Status === 0) {
                    Swal.fire('Error' ,`${respone.data.Error}`, 'error')
                }
            } catch (error) {
                Swal.fire('Error' ,`${error}`, 'error')
            }

            
        }
    }
    const handleFieldChange = (fieldName, value) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
        if (fieldName === "districtName") {
            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    districtName: "Required",
                }));
            }
            else if (value) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    districtName: "",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                districtName: value
            }))
        }
        if (fieldName === "talukaName") {
            if (value.trim() === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    talukaName: "Required",
                }));
            }
            else if (value.trim().length < 3) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    talukaName: "Value must be Greater than 3 characters",
                }));
            }
            else if (value.trim().length > 40) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    talukaName: "Value must be less than 40 characters",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                talukaName: value
            }))
        }
    }
    const handleClear = () => {
        setFormData({ talukaName: "", districtName: "" })
        setErrors({})
        setSaveButton(true)
        setUpdateButton(false)
    }
    const fetchDistrictNameDD = async () => {
        try {
            const response = await TalukaAPI.TalukaAPI_master().fetchDistrictNameDD()
            if (response.status === 200) {
                setFetchDistrictNamesDD(response.data.items);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const fetchData = async () => {
        try {
            const response = await TalukaAPI.TalukaAPI_master().fetchAll()
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
            field: 'taluka_code',
            headerName: 'Taluka Code',
            width: 150,
        },
        {
            field: 'taluka_name',
            headerName: 'Taluka Name',
            width: 150,
        },
        {
            field: 'district_code',
            headerName: 'District Code',
            width: 110,
        },

    ];
    const handleEdit = (row) => {
        console.log(row);
        setFormData((prevdata) => ({
            ...prevdata,
            talukaName: row.taluka_name,
            districtName: row.district_code
        }))
        setTalukaCode(row.taluka_code)
        setSaveButton(false)
        setUpdateButton(true)
        setErrors({})
    }
    useEffect(() => {
        fetchDistrictNameDD()
        fetchData()
        document.title="Taluka Master"
    }, [])
    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={12} lg={12} sm={12} xs={12}>
                    <Paper sx={{ padding: 2 }} elevation={9}>
                        <Grid container spacing={2}>
                            {/* =========================Taluk  Master======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Typography variant='h5'>
                                    Taluk Master
                                </Typography>
                            </Grid>
                            {/* =========================District Name======================== */}
                            <Grid item md={6} lg={6} sm={12} xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size='small'
                                    fullWidth
                                    options={fetchDistrictNamesDD}
                                    sx={autoCompleteStyle}
                                    getOptionLabel={(options) => options.district_name}
                                    isOptionEqualToValue={(option, value) => option.district_code === value.district_code}
                                    value={fetchDistrictNamesDD.find(option => option.district_code === formData.districtName) || null}
                                    onChange={(e, v) => handleFieldChange("districtName", v?.district_code || "")}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="District Name"
                                            required
                                            error={Boolean(errors.districtName)}
                                            helperText={errors.districtName}
                                        />}
                                />
                            </Grid>
                            {/* =========================Taluk Name======================== */}
                            <Grid item md={6} lg={6} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Taluk Name"
                                    variant="outlined"
                                    size='small'
                                    name='statusName'
                                    required
                                    sx={textFiledStyle}
                                    fullWidth
                                    value={formData.talukaName}
                                    onChange={(e) => handleFieldChange("talukaName", e.target.value.toUpperCase())}
                                    error={Boolean(errors.talukaName)}
                                    helperText={errors.talukaName}

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
                                getRowId={(row) => row.taluka_code.toString()}
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
