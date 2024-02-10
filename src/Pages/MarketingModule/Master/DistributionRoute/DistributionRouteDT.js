import React from 'react'
import { Grid, Typography, Paper, Button, Box, TextField, Stack, Autocomplete } from '@mui/material'
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState, useEffect } from "react";
import { DistrubutionRoutesAPI } from "../../../Api";
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
const active = [
    { name: "YES", value: "Y" },
    { name: "NO", value: "N" },
]
export default function DistributionRouteDT() {
    const [rows, setRows] = useState([]);
    const [saveButton, setSaveButton] = useState(true);
    const [updateButton, setUpdateButton] = useState(false);
    const [distributionBatchNames, setDistributionBatchNames] = useState([]);
    const [contractorCodeNames, setContractorCodeNames] = useState([]);

    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        taluka_code: false
    });
    const [formData, setFormData] = useState({
        distrubutionBatchName: "",
        routeCode: "",
        routeName: "",
        contractorCode: "",
        vehicleNumber: '',
        active: '',
        routeAlias: '',
        routelenght: '',
        cutoffTime: ''
    });
    const [errors, setErrors] = useState({});

    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };
    const validation = () => {

    }
    const handleClear = () => { }
    const handleUpdate = async (e) => { }
    const handleSubmit = async (e) => { }
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
    const handleEdit = (row) => { }
    const handleDeleteButtonClick = (row) => { }
    const fetchDistributionBatchNames = async () => {
        try {
            const response = await DistrubutionRoutesAPI.DistrubutionRoutesAPI_master().DD_fetch_district_batch_name()
            if (response.status === 200) {
                setDistributionBatchNames(response.data.items)
            }

        } catch (error) {
            console.log(error);
        }
    }
    const fetchContractorCodeName = async () => {
        try {
            const response = await DistrubutionRoutesAPI.DistrubutionRoutesAPI_master().DD_fetch_contractorCodeNames()
            if (response.status === 200) {
                setContractorCodeNames(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const fetchData = async () => {
        try {
            const response = await DistrubutionRoutesAPI.DistrubutionRoutesAPI_master().fetchAll()
            // if (response.status === 200) {
            //     setRows(response.data.items)
            // }

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        // fetchData()
        fetchDistributionBatchNames()
        fetchContractorCodeName()
        document.title = "Distribution Route Master"
    }, [])
    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={8} lg={8} sm={12} xs={12}>
                    <Paper sx={{ padding: 2 }} elevation={3}>
                        <Grid container spacing={2}>
                            {/* =========================Taluk  Master======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Typography variant='h5'>
                                    Distribution Routes
                                </Typography>
                            </Grid>
                            {/* =========================Distribution Batch Name======================== */}
                            <Grid item md={4} lg={4} sm={12} xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size='small'
                                    fullWidth
                                    options={distributionBatchNames}
                                    sx={autoCompleteStyle}
                                    getOptionLabel={(options) => options.dist_batch_name}
                                    isOptionEqualToValue={(option, value) => option.dist_batch_no === value.dist_batch_no}
                                    value={distributionBatchNames.find(option => option.dist_batch_no === formData.distrubutionBatchName) || null}
                                    //onChange={(e, v) => handleFieldChange("distrubutionBatchName", v?.district_code || "")}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Distribution Batch Name"
                                            required
                                            error={Boolean(errors.distrubutionBatchName)}
                                            helperText={errors.distrubutionBatchName}
                                        />}
                                />
                            </Grid>
                            {/* =========================Route Code======================== */}
                            <Grid item md={4} lg={4} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Route Code"
                                    variant="outlined"
                                    size='small'
                                    name='statusName'
                                    required
                                    sx={textFiledStyle}
                                    fullWidth
                                    value={formData.routeCode}
                                    //onChange={(e) => handleFieldChange("routeCode", e.target.value.toUpperCase())}
                                    error={Boolean(errors.routeCode)}
                                    helperText={errors.routeCode}

                                />
                            </Grid>
                            {/* =========================Route Name======================== */}
                            <Grid item md={4} lg={4} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Route Name"
                                    variant="outlined"
                                    size='small'
                                    name='statusName'
                                    required
                                    sx={textFiledStyle}
                                    fullWidth
                                    value={formData.routeName}
                                    // onChange={(e) => handleFieldChange("routeName", e.target.value.toUpperCase())}
                                    error={Boolean(errors.routeName)}
                                    helperText={errors.routeName}
                                />
                            </Grid>
                            {/* =========================Contractor Code======================== */}
                            <Grid item md={4} lg={4} sm={12} xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size='small'
                                    fullWidth
                                    options={contractorCodeNames}
                                    sx={autoCompleteStyle}
                                    getOptionLabel={(options) => options.users_code}
                                    isOptionEqualToValue={(option, value) => option.contractor_code === value.contractor_code}
                                    value={contractorCodeNames.find(option => option.contractor_code === formData.contractorCode) || null}
                                    //onChange={(e, v) => handleFieldChange("contractorCode", v?.contractor_code || "")}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Contractor Code"
                                            required
                                        //error={Boolean(errors.contractorCode)}
                                        //helperText={errors.contractorCode}
                                        />}
                                />
                            </Grid>
                            {/* =========================Vehicle Number======================== */}
                            <Grid item md={4} lg={4} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Vehicle Number"
                                    variant="outlined"
                                    size='small'
                                    name='statusName'
                                    required
                                    sx={textFiledStyle}
                                    fullWidth
                                    value={formData.vehicleNumber}
                                    //onChange={(e) => handleFieldChange("vehicleNumber", e.target.value.toUpperCase())}
                                    error={Boolean(errors.vehicleNumber)}
                                    helperText={errors.vehicleNumber}

                                />
                            </Grid>
                            {/* =========================Active======================== */}
                            <Grid item md={4} lg={4} sm={12} xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size='small'
                                    fullWidth
                                    options={active}
                                    sx={autoCompleteStyle}
                                    getOptionLabel={(options) => options.name}
                                    isOptionEqualToValue={(option, value) => option.value === value.value}
                                    value={active.find(option => option.district_code === formData.active) || null}
                                    //onChange={(e, v) => handleFieldChange("active", v?.value || "")}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Active"
                                            error={Boolean(errors.active)}
                                            helperText={errors.active}
                                        />}
                                />
                            </Grid>
                            {/* =========================Route Alias======================== */}
                            <Grid item md={4} lg={4} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Route Alias"
                                    variant="outlined"
                                    size='small'
                                    name='statusName'
                                    sx={textFiledStyle}
                                    fullWidth
                                    value={formData.routeAlias}
                                    // onChange={(e) => handleFieldChange("routeAlias", e.target.value.toUpperCase())}
                                    error={Boolean(errors.routeAlias)}
                                    helperText={errors.routeAlias}
                                />
                            </Grid>
                            {/* =========================Route Length======================== */}
                            <Grid item md={4} lg={4} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Route Length"
                                    variant="outlined"
                                    size='small'
                                    name='statusName'
                                    sx={textFiledStyle}
                                    fullWidth
                                    value={formData.routelenght}
                                    // onChange={(e) => handleFieldChange("routelenght", e.target.value.toUpperCase())}
                                    // error={Boolean(errors.routelenght)}
                                    helperText={errors.routelenght}
                                />
                            </Grid>
                            {/* =========================Cut Off Time======================== */}
                            <Grid item md={4} lg={4} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Cut Off Time"
                                    variant="outlined"
                                    size='small'
                                    sx={textFiledStyle}
                                    fullWidth
                                value={formData.cutoffTime}
                                // onChange={(e) => handleFieldChange("cutoffTime", e.target.value.toUpperCase())}
                                error={Boolean(errors.cutoffTime)}
                                helperText={errors.cutoffTime}
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
