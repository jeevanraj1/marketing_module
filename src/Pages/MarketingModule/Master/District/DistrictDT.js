import React from 'react'
import { Grid, Typography, Paper, Button, Box, TextField, Stack } from '@mui/material'
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { useState, useEffect } from "react";
import { DistrictAPI } from "../../../Api";
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

export default function DistrictDT() {
    const [rows, setRows] = useState([]);
    const [saveButton, setSaveButton] = useState(true);
    const [updateButton, setUpdateButton] = useState(false);
    const [districtCode, setDistrictCode] = useState(null);
    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        district_code: false
    });
    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };
    const [formData, setFormData] = React.useState({
        districtName: "",
    });
    const [errors, setErrors] = React.useState({})
    const validation = () => {
        const newErrors = {}
        if (formData.districtName.trim() === "") newErrors.districtName = "Requried"
        else if (formData.districtName !== "") newErrors.districtName = errors.districtName
        return newErrors
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null)
        if (!hasErrors) {
            try {
                const newRecord = {
                    "district_name": formData.districtName.trim()
                }
                console.log(newRecord);
                const respone = await DistrictAPI.DistrictAPI_master().create(newRecord)
                if (respone.data.Status === 1) {
                    Swal.fire("sucess", "Saved Sucessfully", "success")
                    handleClear()
                    fetchData()
                    localStorage.setItem("Navigation_state", true)
                } else {
                    Swal.fire('Error' ,`${respone.data.Error}`, 'error')
                }
            } catch (error) {
                console.log(error);
                Swal.fire('Error' ,`error while posting`, 'error')
            }
        }
    }
    const handleUpdate = async (e) => {
        console.log("hi");
        e.preventDefault()
        const validationErorrs = validation()
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null)
        if (!hasErrors) {
            try {
                const newRecord = {
                    "district_name": formData.districtName.trim()
                }
                const respone = await DistrictAPI.DistrictAPI_master().update(districtCode,newRecord)
                if (respone.data.Status === 1) {
                    Swal.fire("sucess", "Updated Sucessfully", "success")
                    handleClear()
                    fetchData()
                    localStorage.setItem("Navigation_state", true)
                } else {
                    Swal.fire('Error' ,`${respone.data.Error}`, 'error')
                }
            } catch (error) {
                Swal.fire('Error' ,`error while posting`, 'error')
            }
        }
    }
    const handleClear = () => {
        setFormData({ districtName: "" })
        setErrors({})
        setSaveButton(true)
        setUpdateButton(false)
        localStorage.setItem("Navigation_state", true)
    }
    const handleFiledChange = (fieldName, value) => {
        localStorage.setItem("Navigation_state", false)
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
        if (fieldName === "districtName") {
            if (value.trim() === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    districtName: "Required",
                }));
            }
            else if (value.trim().length < 3) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    districtName: "Value must be Greater than 3 characters",
                }));
            }
            else if (value.trim().length > 40) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    districtName: "Value must be less than 40 characters",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value,
            }));
        }
    }
    const fetchData = async () => {
        try {
            const response = await DistrictAPI.DistrictAPI_master().fetchAll()
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
            field: 'district_code',
            headerName: 'District Code',
            width: 150,
        },
        {
            field: 'district_name',
            headerName: 'District name',
            width: 150,
        },
    ];
    const handleEdit = (row) => {
        setSaveButton(false)
        setUpdateButton(true)
        setFormData((prevdata) => ({
            ...prevdata,
            districtName: row.district_name
        }))
        setDistrictCode(row.district_code)
        localStorage.setItem("Navigation_state", true)
    }
    useEffect(() => {
        fetchData();
        document.title = "District Master"
    }, [])
    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={12} lg={12} sm={12} xs={12}>
                    <Paper sx={{ padding: 2 }} elevation={9}>
                        <Grid container spacing={2}>
                            {/* =========================District  Master======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Typography variant='h5'>
                                    District Master
                                </Typography>
                            </Grid>
                            {/* =========================District Name======================== */}
                            <Grid item md={6} lg={6} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="District Name"
                                    variant="outlined"
                                    size='small'
                                    name='statusName'
                                    required
                                    sx={textFiledStyle}
                                    fullWidth
                                    value={formData.districtName}
                                    onChange={(e) => handleFiledChange("districtName", e.target.value.toUpperCase())}
                                    error={Boolean(errors.districtName)}
                                    helperText={errors.districtName}

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
                                getRowId={(row) => row.district_code.toString()}
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
