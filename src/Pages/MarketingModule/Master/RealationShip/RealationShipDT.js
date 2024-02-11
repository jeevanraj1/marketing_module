import React, { useState, useEffect } from 'react'
import { Grid, Typography, Paper, Button, Box, TextField, Stack } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { RelationApi } from '../../../Api';
import Swal from 'sweetalert2';

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
        height: "15px",
        display: "flex",
        alignItems: "center",
        fontSize: 12,
        fontWeight: "bold",
    },
}

export default function RealationShipDT() {
    const [saveButton, setSaveButton] = useState(true);
    const [updateButton, setUpdateButton] = useState(false);
    const [rows, setRows] = useState([]);
    const [formData, setFormData] = useState({
        relationName: ''
    })
    const [relationId, setRelationId] = useState(null)
    const [errors, setErrors] = useState({})
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
                        onClick={() =>
                            HandleEdit(
                                params.row.rel_name,
                                params.row.rel_type_id,
                            )
                        }
                    >
                        Edit
                    </ModeEditOutlineRoundedIcon>
                </>
            ),
        },
        {
            field: 'rel_type_id',
            headerName: 'Realtion Type ID',
            width: 150,
        },
        {
            field: 'rel_name',
            headerName: 'Realtion Name',
            width: 150,
        },
    ];

    const HandleEdit = (relationName, relationId) => {
        setSaveButton(false)
        setUpdateButton(true)
        setFormData((prevdata) => ({
            ...prevdata,
            relationName: relationName,
        }))
        setRelationId(relationId)
        localStorage.setItem("Navigation_state",true)
    }

    const handleFiledChange = (fieldName, value) => {
        localStorage.setItem("Navigation_state",false)
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
        if (fieldName === "relationName" && value.length <= 3) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                relationName: 'Value must greater than 3 charaters',
            }));
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))

        }
        else if (fieldName === "relationName" && value.length > 3) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                relationName: '',
            }));
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
    }

    const validation = () => {
        const newErrors = {}
        if (formData.relationName === "") {
            newErrors.relationName = "Required"
        }
        else if (formData.relationName.length <= 3) {
            newErrors.relationName = errors.relationName
        }
        return newErrors
    }
    const handleSumbit = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null)
        if (!hasErrors) {
            try {
                const newRecord = {
                    rel_name: formData.relationName.trim()
                }
                const response = await RelationApi.RelationApi_master().create(newRecord)
                if (response.data.Status === 1) {
                    Swal.fire('Saved', 'Successfully', 'success');
                    handleClear();
                    fetchData();
                    localStorage.setItem("Navigation_state",true)
                } else {
                    Swal.fire("Erorr", `${response.status.Error}`, 'error');
                }
            } catch (error) {
                Swal.fire('Error', 'Error posting data', 'error');
            }
        }
    }
    const handleClear = () => {
        setSaveButton(true)
        setUpdateButton(false)
        setFormData({ relationName: '' })
        setErrors({ relationName: '' })
        localStorage.setItem("Navigation_state",true)
    }
    const handleUpadte = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null)
        if (!hasErrors) {
            try {
                const newRecord = {
                    rel_name: formData.relationName.trim()
                }
                const response = await RelationApi.RelationApi_master().update(relationId,newRecord)
                if (response.data.Status === 1) {
                    Swal.fire('Saved', 'Updated Sucessfully', 'success');
                    handleClear();
                    fetchData();
                    localStorage.setItem("Navigation_state",true)
                } else {
                    Swal.fire("Erorr", `${response.status.Error}`, 'error');
                }
            } catch (error) {
                Swal.fire('Error', 'Error posting data', 'error');
            }
        }
    }
    const fetchData = async () => {
        try {
            const response = await RelationApi.RelationApi_master().fetchAll()
            if (response.status === 200) {
                setRows(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        rel_type_id: false
    });
    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };
    useEffect(() => {
        fetchData()
        document.title = "Relation master"
    }, [])

    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={12} lg={12} sm={12} xs={12}>
                    <Paper sx={{ padding: 2 }}>
                        <Grid container spacing={2}>
                            {/* =========================Relation  Master======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Typography variant='h5'>
                                    Relation  Master
                                </Typography>
                            </Grid>
                            {/* =========================Relation Name======================== */}
                            <Grid item md={6} lg={6} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Relation Name"
                                    variant="outlined"
                                    size='small'
                                    required
                                    fullWidth
                                    name='relationName'
                                    sx={textFiledStyle}
                                    value={formData.relationName}
                                    onChange={(e) => handleFiledChange("relationName", e.target.value.toUpperCase())}
                                    error={Boolean(errors.relationName)}
                                    helperText={errors.relationName}
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
                                            onClick={(e) => handleSumbit(e)}
                                        >
                                            Save
                                        </Button>
                                    )}
                                    {updateButton && (
                                        <Button
                                            variant="contained"
                                            type='submit'
                                            size='small'
                                            onClick={(e) => handleUpadte(e)}
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
                                getRowId={(row) => row.rel_type_id.toString()}
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
                                pageSizeOptions={[5,10, 20]}
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

