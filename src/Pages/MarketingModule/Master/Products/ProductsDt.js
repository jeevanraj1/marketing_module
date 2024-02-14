import React from 'react'
import { Grid, Typography, Paper, Button, Box, TextField, Stack, Autocomplete } from '@mui/material'
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { TalukaAPI } from "../../../Api";
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
            transform: "translate(14px, -10px)",
        },
    },
    "& input": {
        height: "10px",
        display: "flex",
        alignItems: "center",
        fontSize: 12,
        fontWeight: "bold",
    },
    "& label": {
        height: "14px",
        display: "flex",
        alignItems: "center",
        fontSize: 12,
        fontWeight: "bold",
        marginTop: "-1px",
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
    "& input": {
        height: "10px",
        display: "flex",
        alignItems: "center",
        fontSize: 12,
        fontWeight: "bold",
    },
    "& label": {
        height: "14px",
        display: "flex",
        alignItems: "center",
        fontSize: 12,
        fontWeight: "bold",
        marginTop: "-1px",
    },
}
export default function ProductsDt() {
    const [rows, setRows] = useState([]);
    const [DDCustomerCode, setDDCustomerCode] = useState([]);
    const [searchByCode, setSearchByCode] = React.useState(true)
    const [searchByName, setSearchByName] = React.useState(false)
    const [saveButton, setSaveButton] = useState(true);
    const [updateButton, setUpdateButton] = useState(false);
    const [DDCusomerName, setDDCusomerName] = useState([]);

    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        taluka_code: false
    });
    const handleSearch = () => {

    }
    const handleClick = () => {
        // navigate("CreateCustomer")
    }

    const handleRadio = (e) => {
        const { value } = e.target;
        if (value === 'Code') {
            setSearchByCode(true);
            setSearchByName(false);
        } else if (value === 'Name') {
            setSearchByCode(false);
            setSearchByName(true);
        }
    }
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
    useEffect(() => {
        document.title = "Distribution Route Master"
    }, [])
    return (
        <>
            <Grid container spacing={2}>
                {/* ======================================  */}
                <Grid item md={4} lg={4} sm={12} xs={12}>
                    <Paper sx={{ padding: 2, pb: "73px" }} elevation={3}>
                        <Grid container spacing={2}>
                            {/* =========================Taluk  Master======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Typography variant='h5'>
                                    Products
                                </Typography>
                            </Grid>
                            {/* =========================Product Code ======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Product Code"
                                    variant="outlined"
                                    size='small'
                                    name='statusName'
                                    required
                                    sx={textFiledStyle}
                                    fullWidth
                                //value={formData.talukaName}
                                //onChange={(e) => handleFieldChange("talukaName", e.target.value.toUpperCase())}
                                // error={Boolean(errors.talukaName)}
                                //helperText={errors.talukaName}
                                />
                            </Grid>
                            {/* =========================Product Name ======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Product Name"
                                    variant="outlined"
                                    size='small'
                                    name='statusName'
                                    required
                                    sx={textFiledStyle}
                                    fullWidth
                                //value={formData.talukaName}
                                //onChange={(e) => handleFieldChange("talukaName", e.target.value.toUpperCase())}
                                // error={Boolean(errors.talukaName)}
                                //helperText={errors.talukaName}
                                />
                            </Grid>
                            {/* =========================Product Alias ======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Product Alias"
                                    variant="outlined"
                                    size='small'
                                    name='statusName'
                                    required
                                    sx={textFiledStyle}
                                    fullWidth
                                //value={formData.talukaName}
                                //onChange={(e) => handleFieldChange("talukaName", e.target.value.toUpperCase())}
                                // error={Boolean(errors.talukaName)}
                                //helperText={errors.talukaName}
                                />
                            </Grid>
                            {/* =========================Milk or Product======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size='small'
                                    fullWidth
                                    //options={fetchDistrictNamesDD}
                                    sx={autoCompleteStyle}
                                    // getOptionLabel={(options) => options.district_name}
                                    // isOptionEqualToValue={(option, value) => option.district_code === value.district_code}
                                    // value={fetchDistrictNamesDD.find(option => option.district_code === formData.districtName) || null}
                                    //onChange={(e, v) => handleFieldChange("districtName", v?.district_code || "")}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Milk or Product"
                                            required
                                        //error={Boolean(errors.districtName)}
                                        //helperText={errors.districtName}
                                        />}
                                />
                            </Grid>
                            {/* =========================Consider Under Milk======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size='small'
                                    fullWidth
                                    //options={fetchDistrictNamesDD}
                                    sx={autoCompleteStyle}
                                    // getOptionLabel={(options) => options.district_name}
                                    // isOptionEqualToValue={(option, value) => option.district_code === value.district_code}
                                    // value={fetchDistrictNamesDD.find(option => option.district_code === formData.districtName) || null}
                                    //onChange={(e, v) => handleFieldChange("districtName", v?.district_code || "")}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Consider Under Milk"
                                            required
                                        //error={Boolean(errors.districtName)}
                                        //helperText={errors.districtName}
                                        />}
                                />
                            </Grid>
                            {/* ========================= Position for ======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Position for"
                                    variant="outlined"
                                    size='small'
                                    name='statusName'
                                    required
                                    sx={textFiledStyle}
                                    fullWidth
                                //value={formData.talukaName}
                                //onChange={(e) => handleFieldChange("talukaName", e.target.value.toUpperCase())}
                                // error={Boolean(errors.talukaName)}
                                //helperText={errors.talukaName}
                                />
                            </Grid>
                            {/* =========================Button======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Stack direction="row" spacing={2}>
                                    {saveButton && (
                                        <Button
                                            variant="contained"
                                            sx={{ height: "25px" }}
                                            onClick={handleSubmit}
                                            type='submit'
                                            size='small'>
                                            Save
                                        </Button>
                                    )}
                                    {updateButton && (
                                        <Button
                                            variant="contained"
                                            sx={{ height: "25px" }}
                                            onClick={handleUpdate}
                                            type='submit'
                                            size='small'>
                                            Update
                                        </Button>
                                    )}
                                    <Button variant="contained"
                                        onClick={handleClear}
                                        color="error"
                                        sx={{ height: "25px" }}
                                        size='small'>
                                        Clear
                                    </Button>
                                </Stack>
                            </Grid>
                            {/* =========================Button======================== */}
                        </Grid>
                    </Paper>
                </Grid>
                {/* ======================================  */}
                <Grid item md={8} lg={8} xs={12} sm={12}>
                    <Paper sx={{ padding: 2 }} elevation={3}>
                        {/* ============================================== */}
                        <Grid container spacing={2}>
                            <Grid item md={6} lg={6} sm={12} xs={12} style={{ marginTop: "-8px" }}>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="Search"
                                        onChange={(e) => { handleRadio(e) }}
                                    >
                                        <FormControlLabel
                                            value="Code"
                                            control={<Radio style={{ fontSize: 14 }} checked={searchByCode} />}
                                            label={<span style={{ fontSize: 14 }}>Product Code</span>}
                                        />
                                        <FormControlLabel
                                            value="Name"
                                            control={<Radio style={{ fontSize: 14 }} checked={searchByName} />}
                                            label={<span style={{ fontSize: 14 }}>Product Name</span>}
                                        />
                                    </RadioGroup>
                                </FormControl>

                            </Grid>
                            {searchByCode && (
                                <Grid item md={3} lg={3} sm={12} xs={12}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={DDCustomerCode}
                                        getOptionLabel={(options) => options.user_code}
                                        isOptionEqualToValue={(option, value) => option.customer_code === value.customer_code}
                                        //onChange={(event, value) => handlefieldChange("CustomerCode", value?.customer_code || "")}
                                        size='small'
                                        fullWidth
                                        sx={autoCompleteStyle}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                label="Product Code"
                                            />}
                                    />
                                </Grid>
                            )}
                            {searchByName && (
                                <Grid item md={3} lg={3} sm={12} xs={12}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={DDCusomerName}
                                        getOptionLabel={(options) => options.customer_name}
                                        isOptionEqualToValue={(option, value) => option.customer_code === value.customer_code}
                                        //onChange={(event, value) => handlefieldChange("CustomerName", value?.customer_code || "")}
                                        size='small'
                                        fullWidth
                                        sx={autoCompleteStyle}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                label="Product Name"
                                            />}
                                    />
                                </Grid>
                            )}
                            <Grid item md={2} lg={2} sm={12} xs={12}>
                                <Button variant="contained"
                                    sx={{ height: "25px" }}
                                    size='small'
                                    onClick={handleSearch}
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                        {/* =============================================  */}
                        <Box sx={{ height: 333, width: '100%', marginTop: '20px' }}>
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
                    </Paper>
                </Grid>
                {/* ======================================  */}
            </Grid>
        </>
    )
}