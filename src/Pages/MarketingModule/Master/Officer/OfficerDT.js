import React, { useState, useEffect } from 'react'
import { Grid, Typography, Paper, Button, Box, TextField, Stack } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { officerApi } from '../../../Api';
import Swal from 'sweetalert2';

const textFiledStyle = {
    wiwidth: "100%",
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
export default function OfficerDT() {
    const [rows, SetRows] = React.useState([])
    const [formData, setFormData] = React.useState({
        officerName: '',
        officerZone: '',
    })
    const [saveButton, SetSaveButton] = React.useState(true)
    const [updateButton, SetUpdateButton] = React.useState(false)
    const [officerCode, setOfficerCode] = React.useState(null)
    const [errors, setErrors] = useState({})

    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };

    const columns = [
        {
            field: "action",
            headerName: "Action",
            width: 100,
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
            field: 'officer_code',
            headerName: 'Officer Code',
            width: 150,
        },
        {
            field: 'officer_name',
            headerName: 'Officer Name',
            width: 150,
        },
        {
            field: 'zone_code',
            headerName: 'Zone Code',
            width: 150,
            type: 'number',
        },
    ];

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        officer_code: false,
    });


    const handleEdit = (row) => {
        setFormData((prevdata) => ({
            ...prevdata,
            officerName: row.officer_name,
            officerZone: row.zone_code
        }))
        setOfficerCode(row.officer_code)
        SetUpdateButton(true)
        SetSaveButton(false)
        localStorage.setItem("Navigation_state", true)
    }
    const fetchData = async () => {
        try {
            const respone = await officerApi.officerApi_master().fetchAll()
            if (respone.status === 200) {
                SetRows(respone.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }


    const handleFiledChange = (fieldName, value) => {
        localStorage.setItem("Navigation_state", false)
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
        if (fieldName === "officerName") {
            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    officerName: 'Required',
                }));
            }
            else if (value.length > 40) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    officerName: 'Value must be less Than 40 charaters',
                }));
            }
            else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    officerName: '',
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }


        if (fieldName === "officerZone" && value.length > 3) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                officerZone: 'Value must within than 3 digits',
            }));

            setTimeout(() => {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    officerZone: '',
                }));
            }, 1000);
        }
        else if (fieldName === "officerZone" && value.length <= 3) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                officerZone: '',
            }));
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }

    }

    const handleClear = () => {
        setFormData((prevdata) => ({
            ...prevdata,
            officerName: "",
            officerZone: ""
        }))
        SetSaveButton(true)
        SetUpdateButton(false)
        setErrors((prevErrors) => ({
            ...prevErrors,
            officerName: '',
            officerZone: ""
        }));
        localStorage.setItem("Navigation_state", true)
    }

    const validation = () => {
        const newErrors = {}
        if (formData.officerName === "") {
            newErrors.officerName = "Requried"
        }
        else if (formData.officerName !== "") {
            newErrors.officerName = errors.officerName
        }

        if (formData.officerZone === "") {
            newErrors.officerZone = ""
        } else if (formData.officerZone !== "") {
            newErrors.officerZone = errors.officerZone
        }

        return newErrors
    }

    const handlesave = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null)
        if (!hasErrors) {
            const newrecord = {
                officer_name: formData.officerName.trim(),
                zone_code: Number(formData.officerZone)
            }
            try {
                const respone = await officerApi.officerApi_master().create(newrecord)
                if (respone.data.Status === 1) {
                    Swal.fire("sucess", "Saved Sucessfully", "success")
                    handleClear()
                    fetchData()
                    localStorage.setItem("Navigation_state", true)
                } else {
                    Swal.fire('Error' `${respone.data.Error}`, 'error')
                }
            } catch (error) {
                Swal.fire("error", `Unknown Error`, "error")
            }
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null)
        if (!hasErrors) {
            const newrecord = {
                officer_name: formData.officerName.trim(),
                zone_code: Number(formData.officerZone)
            }
            try {
                const respone = await officerApi.officerApi_master().update(officerCode, newrecord)
                if (respone.data.Status === 1) {
                    Swal.fire("sucess", "Updated Sucessfully", "success")
                    handleClear()
                    fetchData()
                    localStorage.setItem("Navigation_state", true)
                } else {
                    Swal.fire('Error' `${respone.data.Error}`, 'error')
                }
            } catch (error) {
                Swal.fire("error", `Unknown Error`, "error")
            }
        }
    }

    React.useEffect(() => {
        fetchData()
        document.title = "Officer Master"
    }, [])
    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={8} lg={8} sm={12} xs={12}>
                    <Paper sx={{ padding: 2 }}>
                        <Grid container spacing={2}>
                            {/* =========================Relation  Master======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Typography variant='h5'>
                                    Officers Master
                                </Typography>
                            </Grid>
                            {/* =========================Officer Name======================== */}
                            <Grid item md={6} lg={6} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Officer Name"
                                    variant="outlined"
                                    size='small'
                                    name='officerName'
                                    required
                                    fullWidth

                                    sx={textFiledStyle}
                                    value={formData.officerName || ""}
                                    onChange={(e) => handleFiledChange("officerName", e.target.value.toUpperCase())}
                                    error={Boolean(errors.officerName)}
                                    helperText={errors.officerName}
                                />
                            </Grid>
                            {/* =========================Officer Zone======================== */}
                            <Grid item md={6} lg={6} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Officer Zone"
                                    variant="outlined"
                                    size='small'
                                    name='officerZone'
                                    fullWidth
                                    sx={textFiledStyle}
                                    value={formData.officerZone || ''}
                                    onChange={(e) => handleFiledChange("officerZone", e.target.value.replace(/[^0-9]/g, '').trim())}
                                    error={Boolean(errors.officerZone)}
                                    helperText={errors.officerZone}
                                />
                            </Grid>
                            {/* =========================Button======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Stack spacing={{ xs: 1, sm: 1, md: 1 }} direction={{ xs: 'column', sm: 'row' }}>
                                    {saveButton && (
                                        <Button
                                            variant="contained"
                                            type='submit'
                                            size='small'
                                            onClick={handlesave}
                                        >
                                            Save
                                        </Button>
                                    )}
                                    {updateButton && (
                                        <Button
                                            variant="contained"
                                            type='submit'
                                            size='small'
                                            onClick={(e) => handleUpdate(e)}
                                        >
                                            Update
                                        </Button>
                                    )}

                                    <Button
                                        variant="contained"
                                        color="error"
                                        size='small'
                                        onClick={() => handleClear()}
                                    >
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
                                getRowId={(row) => row.officer_code.toString()}
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
