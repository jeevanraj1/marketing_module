import React from 'react'
import { Grid, Typography, Paper, Button, Box, TextField, Stack } from '@mui/material'
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { useState, useEffect } from "react";
import { StatusApi } from "../../../Api";
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
export default function StatusDT() {

    const [rows, setRows] = useState([]);
    const [statusID, setstatusID] = useState([]);
    const [saveButton, setSaveButton] = useState(true);
    const [updateButton, setUpdateButton] = useState(false);
    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        status_id: false
    });
    const [formData, setFormData] = React.useState({
        statusName: "",
    });
    const [errors, setErrors] = React.useState({})

    const handleEdit = (row) => {
        setFormData((prevdata) => ({
            ...prevdata,
            statusName: row.status_name
        }))
        setstatusID(row.status_id)
        setUpdateButton(true)
        setSaveButton(false)
        localStorage.setItem("Navigation_state",true)
    }

    const handleFiledChange = (fieldName, value) => {
        localStorage.setItem("Navigation_state",false)
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
        if (fieldName === "statusName" && value.length <= 3) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                statusName: 'Value must greater than 3 charaters',
            }));
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))

        }
        else if (fieldName === "statusName" && value.length > 3) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                statusName: '',
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
            statusName: "",
        }))
        setSaveButton(true)
        setUpdateButton(false)
        setErrors((prevdata) => ({
            ...prevdata,
            statusName: ""
        }))
        localStorage.setItem("Navigation_state",true)
    }

    const fetchData = async () => {
        try {
            const response = await StatusApi.Status_master().fetchAll();
            console.log(response);
            if (response.status === 200) {
                setRows(response.data.items);

            } else {
                console.error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
        document.title = 'Status'
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        console.log(validationErorrs);
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null )
        if (!hasErrors) {
            try {
                const newRecord = {
                    status_name: formData.statusName
                };
                const response = await StatusApi.Status_master().create(newRecord);
                if (response.data.Status === 1) {
                    Swal.fire('Saved', 'Successfully', 'success');
                    handleClear();
                    fetchData();
                    localStorage.setItem("Navigation_state",true)
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: `${response.data.Error}` || 'Unknown Error',
                        icon: 'error',
                    });
                }
            } catch (error) {
                Swal.fire('Error', 'Error posting data', 'error');
            }
        }

    }
    const handleUpdate = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        console.log(validationErorrs);
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null)
        if (!hasErrors) {
            try {
                const newRecord = {
                    status_name: formData.statusName
                };
                const response = await StatusApi.Status_master().update(statusID, newRecord)
                if (response.data.Status === 1) {
                    Swal.fire('Saved', 'Updated Sucessfully', 'success');
                    handleClear();
                    fetchData();
                    localStorage.setItem("Navigation_state",true)
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: `${response.data.Error}` || 'Unknown Error',
                        icon: 'error',
                    });
                }
            } catch (error) {
                Swal.fire('Error', 'Error posting data', 'error');
            }
        }
    }


    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };

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
            field: "status_id",
            headerName: "Status Id",
            width: 120
        },
        {
            field: "status_name",
            headerName: "Status Name",
            width: 200
        },
    ];

    const validation = () => {
        const newErrors = {}
        if (formData.statusName === "") {
            newErrors.statusName = "Required "
        } else if (formData.statusName.length <= 3) {
            newErrors.statusName = errors.statusName
        }
        return newErrors
    }


    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={12} lg={12} sm={12} xs={12}>
                    <Paper sx={{ padding: 2 }} elevation={9}>
                        <Grid container spacing={2}>
                            {/* =========================Relation  Master======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Typography variant='h5'>
                                    Status Master
                                </Typography>
                            </Grid>
                            {/* =========================Status Name======================== */}
                            <Grid item md={6} lg={6} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Status Name"
                                    variant="outlined"
                                    size='small'
                                    name='statusName'
                                    required
                                    sx={textFiledStyle}
                                    fullWidth
                                    value={formData.statusName}
                                    onChange={(e) => handleFiledChange("statusName", e.target.value.toUpperCase().trim())}
                                    error={Boolean(errors.statusName)}
                                    helperText={errors.statusName}

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
                                getRowId={(row) => row.status_id.toString()}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 10,
                                        },
                                    },
                                }}
                                columnVisibilityModel={columnVisibilityModel}
                                onColumnVisibilityModelChange={(newModel) =>
                                    setColumnVisibilityModel(newModel)
                                }
                                pageSizeOptions={[10, 20]}
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
