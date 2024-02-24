import React from 'react'
import { Grid, Typography, Paper, Button, Box, TextField, Autocomplete } from '@mui/material'
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid'
import dayjs from 'dayjs';
import { IndentEntryAPI } from "../../../Api";

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
export default function IndentEntry() {
    const [rows, setRows] = useState([]);
    const [DDshiftsNames, setDDShiftsNames] = useState([]);
    const [DDcustomerNames, setDDCustomerNames] = useState([]);
    const [DDrouteNames, setDDRouteNames] = useState([]);

    const [formData, setFormData] = useState({
        shifts: "",
        noLabel: "",
        customer: "",
        route: "",
        creditLimit: "",
        phoneNumber: "",
    });


    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        taluka_code: false
    });


    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };
    const handleFieldChange = (fieldName, value) => {
        //===================================================== shifts=============================================================
        if (fieldName === "shifts") {
            if (value === "") {
                setFormData((prevdata) => ({
                    ...prevdata,
                    noLabel: ""
                }))
                setDDRouteNames([])
                setDDCustomerNames([])
            }
            else if (value) {
                setFormData((prevdata) => ({
                    ...prevdata,
                    noLabel: value
                }))
                fetchCustomerNames(value)
                setDDRouteNames([])
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //===================================================== noLabel=============================================================
        if (fieldName === "noLabel") {
            if (value === "") {
            }
            else if (value) {
                setDDRouteNames([])
                fetchCustomerNames(value)
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //===================================================== customer=============================================================
        if (fieldName === "customer") {
            if (value === "") {
            }
            else if (value) {
                fetchRouteNames(formData.noLabel, value)
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //===================================================== route=============================================================
        if (fieldName === "route") {
            if (value === "") {
            }
            else if (value) {
                // fetchRouteNames(formData.noLabel, value)
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //===================================================== creditLimit=============================================================
        //===================================================== phoneNumber=============================================================
    }
    console.log(formData);
    const validation = () => {

    }
    const handleClear = () => {
        setFormData((prevdata) => ({
            ...prevdata,
            // shifts: "",
            noLabel: "",
            customer: "",
            route: "",
            creditLimit: "",
            phoneNumber: "",
        }))
        setDDRouteNames([])
        setDDCustomerNames([])
    }
    const handleUpdate = async (e) => { }
    const handleSubmit = async (e) => { }
    const columns = [
        {
            field: 'packet_name',
            headerName: 'Packet Name',
            width: 150,
        },
        {
            field: 'crate_indent',
            headerName: 'Crate Indent',
            width: 150,
        },
        {
            field: 'packet_indent',
            headerName: 'Packet Indent',
            width: 150,
        },
        {
            field: 'rate',
            headerName: 'Packets Rate',
            width: 110,
        },
        {
            field: 'total',
            headerName: 'Amount',
            width: 140,
        },

    ]

    const fetchShiftNames = async () => {
        const response = await IndentEntryAPI.IndentEntryAPI_master().DD_fetch_district_batch_name()
        if (response.status === 200) {
            setDDShiftsNames(response.data.items);
        }
    }
    // const fetchCustomerNames = async () => {
    //     const response = await IndentEntryAPI.IndentEntryAPI_master().DD_fetch_customer_name()
    //     console.log(response);
    //     if (response.status === 200) {
    //         setDDCustomerNames(response.data.items);
    //     }
    // }
    const fetchCustomerNames = async (id) => {
        const response = await IndentEntryAPI.IndentEntryAPI_master().DD_fetch_customer_name(id)
        console.log(response);
        if (response.status === 200) {
            setDDCustomerNames(response.data.items);
        }
    }
    const fetchRouteNames = async (dist_batch_no, customer_code) => {
        const response = await IndentEntryAPI.IndentEntryAPI_master().DD_fetch_route_name(dist_batch_no, customer_code)
        console.log(response);
        if (response.status === 200) {
            setDDRouteNames(response.data.items);
        }
    }
    useEffect(() => {
        fetchShiftNames()
        //fetchCustomerNames()
        document.title = "Indent entry"
    }, [])
    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={12} lg={12} sm={12} xs={12}>
                    <Paper sx={{ padding: 2 }} elevation={3}>
                        <Grid container spacing={2}>
                            {/* =========================Indent Entry======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Typography variant='h5'>Indent Entry</Typography>
                            </Grid>
                            {/* =========================Indent Date======================== */}
                            <Grid item md={2} lg={2} sm={12} xs={12}>
                                <Typography component='h4' sx={{ fontWeight: "bolder" }}>Indent Date : {dayjs().format("DD-MM-YYYY")}</Typography>
                            </Grid>
                            {/* =========================Shifts======================== */}
                            <Grid item md={3} lg={3} sm={12} xs={12} >
                                <Autocomplete
                                    disablePortal
                                    size='small'
                                    fullWidth
                                    options={DDshiftsNames}
                                    sx={autoCompleteStyle}
                                    getOptionLabel={(options) => options.dist_batch_name}
                                    isOptionEqualToValue={(option, value) => option.dist_batch_no === value.dist_batch_no}
                                    value={DDshiftsNames.find(option => option.dist_batch_no === formData.shifts) || null}
                                    onChange={(e, v) => handleFieldChange("shifts", v?.dist_batch_no || "")}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Shifts"
                                            required
                                        />}
                                />
                            </Grid>
                            {/* ================================================= */}
                        </Grid>
                    </Paper>
                </Grid>
                {/* ================================  */}
                <Grid item md={3.5} lg={3.5} sm={12} xs={12}>
                    <Paper sx={{ padding: 2 }} elevation={3}>
                        <Grid container spacing={2}>
                            {/* =========================""======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size='small'
                                    fullWidth
                                    options={DDshiftsNames}
                                    sx={autoCompleteStyle}
                                    getOptionLabel={(options) => options.dist_batch_name}
                                    isOptionEqualToValue={(option, value) => option.dist_batch_no === value.dist_batch_no}
                                    value={DDshiftsNames.find(option => option.dist_batch_no === formData.noLabel) || null}
                                    onChange={(e, v) => handleFieldChange("noLabel", v?.dist_batch_no || "")}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label=""
                                            required
                                        //error={Boolean(errors.districtName)}
                                        //helperText={errors.districtName}
                                        />}
                                />
                            </Grid>
                            {/* =========================Customer======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size='small'
                                    fullWidth
                                    options={DDcustomerNames}
                                    sx={autoCompleteStyle}
                                    getOptionLabel={(options) => options.user_code}
                                    isOptionEqualToValue={(option, value) => option.customer_code === value.customer_code}
                                    value={DDcustomerNames.find(option => option.customer_code === formData.customer) || null}
                                    onChange={(e, v) => handleFieldChange("customer", v?.customer_code || "")}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Customer"
                                            required
                                        //error={Boolean(errors.districtName)}
                                        //helperText={errors.districtName}
                                        />}
                                />
                            </Grid>
                            {/* =========================Route======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size='small'
                                    fullWidth
                                    options={DDrouteNames}
                                    sx={autoCompleteStyle}
                                    getOptionLabel={(options) => options.route_name}
                                    isOptionEqualToValue={(option, value) => option.route_code === value.route_code}
                                    value={DDrouteNames.find(option => option.route_code === formData.route) || null}
                                    onChange={(e, v) => handleFieldChange("route", v?.route_code || "")}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Route"
                                            required
                                        //error={Boolean(errors.districtName)}
                                        //helperText={errors.districtName}
                                        />}
                                />
                            </Grid>
                            {/* =========================Credit Limit======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Typography component="h4" sx={{ fontWeight: "bolder" }}>Credit Limit:</Typography>
                            </Grid>
                            {/* =========================Mobile Number======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Typography component="h4" sx={{ fontWeight: "bolder" }}>Mobile Number:</Typography>
                            </Grid>
                            {/* =========================Route Name======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12} display="flex" justifyContent="flex-end">
                                <Button variant="contained"
                                    color="error"
                                    size='small'
                                    onClick={handleClear}
                                >
                                    Clear
                                </Button>
                            </Grid>
                            {/* ================================================= */}
                        </Grid>
                    </Paper>
                </Grid>
                {/* ================================  */}
                <Grid item md={8.5} lg={8.5} sm={12} xs={12}>
                    <Paper sx={{ padding: 1 }} elevation={3}>
                        <Box sx={{ height: 369, width: '100%', }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                getRowId={(row) => row.taluka_code.toString()}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 15,
                                        },
                                    },
                                }}
                                columnVisibilityModel={columnVisibilityModel}
                                onColumnVisibilityModelChange={(newModel) =>
                                    setColumnVisibilityModel(newModel)
                                }
                                pageSizeOptions={[15, 30]}
                                disableRowSelectionOnClick
                                getRowHeight={() => 35}
                                getRowClassName={getRowClassName}
                                hideFooter="true"
                            />
                        </Box>
                        {/* =====================  */}
                        <Box display="flex" justifyContent="end">
                            <Typography component="h4" sx={{ fontWeight: "bolder" }}>Total Amount: 100000</Typography>
                        </Box>
                        {/* =====================  */}
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}