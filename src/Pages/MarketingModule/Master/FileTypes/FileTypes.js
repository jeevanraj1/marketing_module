import React from 'react'
import { Grid, Typography, Paper, Button, Box, TextField, Stack, Autocomplete } from '@mui/material'
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid'
import { fileTypesApi } from "../../../Api";

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

export default function FileTypes() {
    const [rows, setRows] = useState([]);
    const [saveButton, setSaveButton] = useState(true);
    const [updateButton, setUpdateButton] = useState(false);
    const [ftId, setFtId] = useState(null);
    const [errors, setErrors] = useState({});

    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        ft_id: false
    });

    const [formData, setFormData] = useState({
        fileType: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
        if (!hasErrors) {
            const newRecord = {
                "file_type": formData.fileType,
            }
            try {
                console.log(newRecord);
                const response = await fileTypesApi.fileTypesApi_Master().create(newRecord)
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
                    localStorage.setItem("Navigation_state", true)
                    handleClear()
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
    const fetchData = async () => {
        try {
            const response = await fileTypesApi.fileTypesApi_Master().fetchAll()
            if (response.status === 200) {
                setRows(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleFieldChange = (fieldName, value) => {
        localStorage.setItem("Navigation_state", false)
        //====================================fileType======================================= 
        if (fieldName === "fileType") {

            if (value.trim() === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    fileType: "Required",
                }));
            }
            else if (value.trim().length > 80) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    fileType: "Value must be Not More than 80 Characters",
                }));
                value = value.substring(0, 80)
                setTimeout(() => {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        fileType: "",
                    }))
                }, 1000)
            }
            else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    fileType: "",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
    }

    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };
    const validation = () => {
        const newErrors = {}
        //====================================fileType==================================
        if (formData.fileType === "") newErrors.fileType = "Required"
        else if (formData.fileType !== "") newErrors.fileType = errors.fileType

        return newErrors
    }
    const handleClear = () => {
        setFormData({
            fileType: ""
        })
        setSaveButton(true)
        setUpdateButton(false)
        setErrors({})
        localStorage.setItem("Navigation_state", true)
    }

    const handleEdit = (row) => {
        console.log(row);
        setUpdateButton(true)
        setSaveButton(false)
        setFormData((prevdata) => ({
            ...prevdata,
            fileType: row.file_type

        }))
        setFtId(row.ft_id)
        setErrors({})
        localStorage.setItem("Navigation_state", true);
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
        if (!hasErrors) {
            const newRecord = {
                "file_type": formData.fileType
            }
            try {
                console.log(newRecord);
                const response = await fileTypesApi.fileTypesApi_Master().update(ftId, newRecord)
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
                    localStorage.setItem("Navigation_state", true)
                    handleClear()
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
            field: 'ft_id',
            headerName: 'FT ID',
            width: 150,
        },
        {
            field: 'file_type',
            headerName: 'FILE TYPE',
            width: 150,
        },
    ];
    useEffect(() => {
        fetchData()
        document.title = "File Types"
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
                                    File Types
                                </Typography>
                            </Grid>
                            {/* =========================fileType======================== */}
                            <Grid item md={6} lg={6} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="FileTypes"
                                    variant="outlined"
                                    size='small'
                                    sx={textFiledStyle}
                                    fullWidth
                                    value={formData.fileType}
                                    onChange={(e) => handleFieldChange("fileType", e.target.value)}
                                    error={Boolean(errors.fileType)}
                                    helperText={errors.fileType}
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
                                getRowId={(row) => row.ft_id.toString()}
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