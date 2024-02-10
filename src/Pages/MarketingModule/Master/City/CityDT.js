import React from 'react'
import { Grid, Typography, Paper, Button, Box, TextField, Stack, Autocomplete } from '@mui/material'
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { useState, useEffect } from "react";
import { CityAPI } from "../../../Api";
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

export default function CityDT() {
    const [rows, setRows] = useState([]);
    const [saveButton, setSaveButton] = useState(true);
    const [updateButton, setUpdateButton] = useState(false);
    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        city_code: false,
        taluka_code: false,
    });
    const [fetchTalukaName, setFetchTalukaName] = useState([]);
    const [cityCode, setCityCode] = useState(null);


    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };
    const [formData, setFormData] = useState({
        talukaName: "",
        cityName: ""
    });
    const [errors, setErrors] = useState({})

    const validation = () => {
        const newErrors = {}
        if (formData.talukaName === "") newErrors.talukaName = "Required"
        else if (formData.talukaName !== "") newErrors.talukaName = errors.talukaName

        if (formData.cityName === "") newErrors.cityName = "Required"
        else if (formData.cityName !== "") newErrors.cityName = errors.cityName
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
                    "city_name": formData.cityName.trim(),
                    "taluka_code": Number(formData.talukaName)
                }
                const respone = await CityAPI.CityAPI_master().create(newRecord)
                console.log(respone);
                if (respone.data.Status === 1) {
                    Swal.fire("sucess", "Saved Sucessfully", "success")
                    handleClear()
                    fetchData()
                    localStorage.setItem("Navigation_state", true)
                }
                else if (respone.data.Status === 0) {
                    Swal.fire('Error', `${respone.data.Error}`, 'error')
                }
            } catch (error) {
                Swal.fire('Error', `${error}`, 'error')
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
                    "city_name": formData.cityName.trim(),
                    "taluka_code": Number(formData.talukaName)
                }
                const respone = await CityAPI.CityAPI_master().update(cityCode,newRecord)
                if (respone.data.Status === 1) {
                    Swal.fire("sucess", "Updated Sucessfully", "success")
                    handleClear()
                    fetchData()
                    localStorage.setItem("Navigation_state", true)
                }
                else if (respone.data.Status === 0) {
                    Swal.fire('Error', `${respone.data.Error}`, 'error')
                }
            } catch (error) {
                Swal.fire('Error', `${error}`, 'error')
            }
        }
    }
    const handleFieldChange = (fieldName, value) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
        if (fieldName === "talukaName") {
            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    talukaName: "Required",
                }));
            }
            else if (value) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    talukaName: "",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                talukaName: value
            }))
        }
        if (fieldName === "cityName") {
            if (value.trim() === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    cityName: "Required",
                }));
            }
            else if (value.trim().length < 3) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    cityName: "Value must be Greater than 3 characters",
                }));
            }
            else if (value.trim().length > 40) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    cityName: "Value must be less than 40 characters",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                cityName: value
            }))
        }
    }
    const fetchTalukaNames = async () => {
        try {
            const response = await CityAPI.CityAPI_master().fetchTalukaName()
            if (response.status === 200) {
                setFetchTalukaName(response.data.items);
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
            field: 'city_code',
            headerName: 'City Code',
            width: 150,
        },
        {
            field: 'city_name',
            headerName: 'City Name',
            width: 150,
        },
        {
            field: 'taluka_code',
            headerName: 'Taluka Code',
            width: 110,
        },
        {
            field: 'taluka_name',
            headerName: 'Taluka Name',
            width: 200,
        },
    ];
    const handleEdit = (row) => {
        setSaveButton(false)
        setUpdateButton(true)
        setErrors({})
        setFormData((prevdata) => ({
            ...prevdata,
            talukaName: row.taluka_code,
            cityName: row.city_name
        }))
        setCityCode(row.city_code)
    }
    const handleClear = () => {
        setErrors({})
        setFormData({ talukaName: "", cityName: "" })
        setSaveButton(true)
        setUpdateButton(false)
    }
    const fetchData = async () => {
        try {
            const response = await CityAPI.CityAPI_master().fetchAll()
            if (response.status === 200) {
                setRows(response.data.items);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchTalukaNames()
        fetchData()
        document.title="City Master"
    }, [])
    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={12} lg={12} sm={12} xs={12}>
                    <Paper sx={{ padding: 2 }} elevation={9}>
                        <Grid container spacing={2}>
                            {/* =========================City  Master======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Typography variant='h5'>
                                    City Master
                                </Typography>
                            </Grid>
                            {/* =========================Taluka Name======================== */}
                            <Grid item md={6} lg={6} sm={12} xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size='small'
                                    fullWidth
                                    options={fetchTalukaName}
                                    sx={autoCompleteStyle}
                                    getOptionLabel={(options) => options.taluka_name}
                                    isOptionEqualToValue={(option, value) => option.taluka_code === value.taluka_code}
                                    value={fetchTalukaName.find(option => option.taluka_code === formData.talukaName) || null}
                                    onChange={(e, v) => handleFieldChange("talukaName", v?.taluka_code || "")}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Taluka Name"
                                            required
                                            error={Boolean(errors.talukaName)}
                                            helperText={errors.talukaName}
                                        />}
                                />
                            </Grid>
                            {/* =========================City Name======================== */}
                            <Grid item md={6} lg={6} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="City Name"
                                    variant="outlined"
                                    size='small'
                                    name='statusName'
                                    required
                                    sx={textFiledStyle}
                                    fullWidth
                                    value={formData.cityName}
                                    onChange={(e) => handleFieldChange("cityName", e.target.value.toUpperCase())}
                                    error={Boolean(errors.cityName)}
                                    helperText={errors.cityName}

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
                                getRowId={(row) => row.city_code.toString()}
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
