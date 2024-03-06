import React from 'react'
import { Grid, Typography, Paper, Button, Box, TextField, Stack, Autocomplete } from '@mui/material'
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid'
import { fileTypesAllowedApi } from "../../../Api";


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

const autoCompleteStyle = {
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
    height: "14px",
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    fontWeight: "bold",
    color:"black",
    marginTop:"-2px",
  },
}

export default function FileTypesAllowed() {
    const [rows, setRows] = useState([]);
    const [saveButton, setSaveButton] = useState(true);
    const [updateButton, setUpdateButton] = useState(false);
    const [documentNameDD, setDocumentNameDD] = useState([]);
    const [fileTypeNameDD, setFileTypeNameDD] = useState([]);
    const [typeId, setTypeId] = useState(null);
    const [errors, setErrors] = useState({});

    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        type_id: false,
        doc_id: false,
        ft_id: false,
    });

    const [formData, setFormData] = useState({
        documentName: "",
        fileTypeName: ""
    });

    const fetchDocumentNames = async () => {
        try {
            const response = await fileTypesAllowedApi.fileTypesAllowedApi_Master().DD_fetch_documentName()
            if (response.status === 200) {
                setDocumentNameDD(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const fetchFileTypeNames = async () => {
        try {
            const response = await fileTypesAllowedApi.fileTypesAllowedApi_Master().DD_fetch_file_typeName()
            if (response.status === 200) {
                setFileTypeNameDD(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const fetchData = async () => {
        try {
            const response = await fileTypesAllowedApi.fileTypesAllowedApi_Master().fetchAll()
            console.log(response);
            if (response.status === 200) {
                setRows(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };
    const handleFieldChange = (fieldName, value) => {
        localStorage.setItem("Navigation_state", false)
        //====================================documentName============================================
        if (fieldName === "documentName") {
            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: 'Required'
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "",
                }));
            }
            setFormData((prevData) => ({
                ...prevData,
                [fieldName]: value
            }));
        }
        //====================================fileTypeName============================================
        if (fieldName === "fileTypeName") {
            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: 'Required'
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "",
                }));
            }
            setFormData((prevData) => ({
                ...prevData,
                [fieldName]: value
            }));
        }
    }
    const validation = () => {
        const newErrors = {}
        //====================================documentName==================================
        if (formData.documentName === "") newErrors.documentName = "Required"
        else if (formData.documentName !== "") newErrors.documentName = errors.documentName
        //====================================fileTypeName=======================================
        if (formData.fileTypeName === "") newErrors.fileTypeName = "Required"
        else if (formData.fileTypeName !== "") newErrors.fileTypeName = errors.fileTypeName

        return newErrors
    }
    const handleClear = () => {
        setFormData({
            documentName: "",
            fileTypeName: ""
        })
        setSaveButton(true)
        setUpdateButton(false)
        setErrors({})
        // setMasterID(null)
        fetchData()
        localStorage.setItem("Navigation_state", true)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
        if (!hasErrors) {
            const newRecord = {
                "doc_id": formData.documentName,
                "ft_id": formData.fileTypeName,
            }
            try {
                console.log(newRecord);
                const response = await fileTypesAllowedApi.fileTypesAllowedApi_Master().create(newRecord)
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
    const handleUpdate = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
        if (!hasErrors) {
            const newRecord = {
                "doc_id": formData.documentName,
                "ft_id": formData.fileTypeName,
            }
            try {
                console.log(newRecord);
                const response = await fileTypesAllowedApi.fileTypesAllowedApi_Master().update(typeId, newRecord)
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

    const handleDeleteButtonClick = async (params) => {
        await handleDeleteConfirm(params);
    };

    const handleDeleteConfirm = async (row) => {
        try {
            const shouldDelete = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this data!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, keep it',
                reverseButtons: true,
            });

            if (shouldDelete.isConfirmed) {
                console.log("Hi");
                console.log(row);
                const response = await fileTypesAllowedApi.fileTypesAllowedApi_Master().delete(row.type_id);
                console.log(response);
                if (response.data.Status === 1) {
                    Swal.fire(`Deleted Successfully`, '', 'success');
                    fetchData();
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: response.data.Error || 'Unknown Error',
                        icon: 'error',
                    });
                }
            }
        } catch (error) {
            Swal.fire('Error', 'Error Deleting Data', 'error');
        }
    };
    const handleEdit = (row) => {
        console.log(row);
        setUpdateButton(true)
        setSaveButton(false)
        setFormData((prevdata) => ({
            ...prevdata,
            documentName: row.doc_id,
            fileTypeName: row.ft_id
        }))
        setTypeId(row.type_id)
        setErrors({})
        localStorage.setItem("Navigation_state", true);
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
                    <DeleteForeverIcon
                        sx={{ color: "red" }}
                        style={{
                            cursor: "pointer",
                            opacity: 1,
                            transition: "opacity 0.3s",
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.opacity = 0.7;
                            e.currentTarget.style.color = "rgba(255, 0, 0, 0.7)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.opacity = 1;
                            e.currentTarget.style.color = "red";
                        }}
                        onClick={() => handleDeleteButtonClick(params.row)}
                    >
                        Delete
                    </DeleteForeverIcon>
                </>
            ),
        },
        {
            field: 'type_id',
            headerName: 'Type ID',
            width: 80,
        },
        {
            field: 'doc_id',
            headerName: 'Document ID',
            width: 150,
        },
        {
            field: 'doc_name',
            headerName: 'Document Name',
            width: 150,
        },
        {
            field: 'ft_id',
            headerName: 'File Type ID',
            width: 150,
        },
        {
            field: 'file_type',
            headerName: 'File Type',
            width: 150,
        },
    ];

    useEffect(() => {
        fetchDocumentNames()
        fetchFileTypeNames()
        fetchData()
        document.title = "File Types Allowed"
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
                                    File Types Allowed
                                </Typography>
                            </Grid>
                            {/* =========================Document Name======================== */}
                            <Grid item md={4} lg={4} sm={12} xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size='small'
                                    fullWidth
                                    options={documentNameDD}
                                    sx={autoCompleteStyle}
                                    getOptionLabel={(options) => options.doc_name}
                                    isOptionEqualToValue={(option, value) => option.doc_id === value.doc_id}
                                    value={documentNameDD.find(option => option.doc_id === formData.documentName) || null}
                                    onChange={(e, v) => handleFieldChange("documentName", v?.doc_id || "")}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Document Name"
                                            required
                                            error={Boolean(errors.documentName)}
                                            helperText={errors.documentName}
                                        />}
                                />
                            </Grid>

                            {/* =========================Extension======================== */}
                            <Grid item md={4} lg={4} sm={12} xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size='small'
                                    fullWidth

                                    options={fileTypeNameDD}
                                    sx={autoCompleteStyle}
                                    getOptionLabel={(options) => options.file_type}
                                    isOptionEqualToValue={(option, value) => option.ft_id === value.ft_id}
                                    value={fileTypeNameDD.find(option => option.ft_id === formData.fileTypeName) || null}
                                    onChange={(e, v) => handleFieldChange("fileTypeName", v?.ft_id || "")}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Extension"
                                            required
                                            error={Boolean(errors.fileTypeName)}
                                            helperText={errors.fileTypeName}
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
                                getRowId={(row) => row.type_id.toString()}
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
