import React from 'react'
import { Grid, Typography, Paper, Button, Box, TextField, Autocomplete } from '@mui/material'
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import {
    GridRowModes,
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridCellModes,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { IndentEntryAPI } from "../../../Api";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

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
    const [rowModesModel, setRowModesModel] = useState({});
    const [formData, setFormData] = useState({
        shifts: "",
        noLabel: "",
        customer: "",
        route: "",
        creditLimit: "",
        phoneNumber: "",
    });
    const [totalAmountGrid, setTotalAmountGrid] = useState(0);
    const [cellModesModel, setCellModesModel] = useState({});

    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        indent_number: false,
        packet_code: false,
        indent_position: false,
        crate_or_not: false,
        packet_position: false,
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
                getGridRows(value)
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //===================================================== creditLimit=============================================================
        //===================================================== phoneNumber=============================================================
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
    const columns = [
        {
            field: 'indent_number',
            headerName: 'Indent Number',
            width: 150,
        },
        {
            field: 'packet_code',
            headerName: 'Packet Code',
            width: 150,
        },
        {
            field: 'packet_name',
            headerName: 'Packet Name',
            width: 175,
        },
        {
            field: 'crate_or_not',
            headerName: 'Crate Or not',
            width: 175,
        },
        {
            field: 'crt',
            headerName: 'Crate Indent',
            width: 150,
            editable: true,
            type: 'number',
        },
        {
            field: 'pkt',
            headerName: 'Packet Indent',
            width: 150,
            editable: true,
            type: 'number'
        },
        {
            field: 'rate',
            headerName: 'Packets Rate',
            width: 110,
            type: 'number'
        },
        {
            field: 'amt',
            headerName: 'Amount',
            width: 110,
            type: 'number'
        },
        {
            field: 'packet_position',
            headerName: 'packet Position',
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 150,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ]
    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    }

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
    const fetchShiftNames = async () => {
        const response = await IndentEntryAPI.IndentEntryAPI_master().DD_fetch_district_batch_name()
        if (response.status === 200) {
            setDDShiftsNames(response.data.items);
        }
    }
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };
    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    const processRowUpdate = async (newRow) => {
        // const { pkt, rate, crt, crate_or_not} = newRow;
        // const crateIndent = pkt / crate_or_not
        // const packetIndent = crate_or_not * crt
        // const amount = pkt * rate;
        // const updatedRow = { ...newRow, pkt: packetIndent, crt: crateIndent, amt: amount };
        // return updatedRow;
    }


    const handelCellEditingStart = (params, event) => {
        console.log(params);
    }


    const fetchCustomerNames = async (id) => {
        const response = await IndentEntryAPI.IndentEntryAPI_master().DD_fetch_customer_name(id)
        if (response.status === 200) {
            setDDCustomerNames(response.data.items);
        }
    }
    const fetchRouteNames = async (dist_batch_no, customer_code) => {
        const response = await IndentEntryAPI.IndentEntryAPI_master().DD_fetch_route_name(dist_batch_no, customer_code)
        if (response.status === 200) {
            setDDRouteNames(response.data.items);
        }
    }
    const getGridRows = async (indentNumber) => {
        const response = await IndentEntryAPI.IndentEntryAPI_master().getGridRows(indentNumber)
        console.log(response);
        if (response.status === 200) {
            setRows(response.data.items);
        }
    }
    useEffect(() => {
        fetchShiftNames()
        //fetchCustomerNames()
        document.title = "Indent entry"
    }, [])
    // const fetchCustomerNames = async () => {
    //     const response = await IndentEntryAPI.IndentEntryAPI_master().DD_fetch_customer_name()
    //     console.log(response);
    //     if (response.status === 200) {
    //         setDDCustomerNames(response.data.items);
    //     }
    // }
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
                                    isOptionEqualToValue={(option, value) => option.indent_number === value.indent_number}
                                    value={DDrouteNames.find(option => option.indent_number === formData.route) || null}
                                    onChange={(e, v) => handleFieldChange("route", v?.indent_number || "")}
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
                                getRowId={(row) => row.packet_code.toString()}
                                columnVisibilityModel={columnVisibilityModel}
                                onColumnVisibilityModelChange={(newModel) =>
                                    setColumnVisibilityModel(newModel)
                                }
                                disableRowSelectionOnClick
                                getRowClassName={getRowClassName}
                                getRowHeight={() => 35}
                                editMode="row"
                                hideFooter={true}
                                slotProps={{
                                    toolbar: { setRows, setRowModesModel },
                                }}
                                onRowEditStop={handleRowEditStop}
                                processRowUpdate={processRowUpdate}
                                rowModesModel={rowModesModel}
                                onRowModesModelChange={handleRowModesModelChange}
                                onProcessRowUpdateError={(error) => console.error("Error updating row:", error)}
                                onCellEditStart={() => console.log("cell edit started")}
                            // loading={rows.length === 0}
                            />
                        </Box>
                        {/* =====================  */}
                        <Box display="flex" justifyContent="end">
                            <Typography component="h4" sx={{ fontWeight: "bolder" }}>Total Amount: {totalAmountGrid}</Typography>
                        </Box>
                        {/* =====================  */}
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}