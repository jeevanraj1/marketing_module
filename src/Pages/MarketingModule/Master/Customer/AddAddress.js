import { Grid, TextField, Autocomplete, Typography, Box, Button, Stack, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid'
import { customerApi } from '../../../Api';

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
        height: "10px",
        display: "flex",
        alignItems: "center",
        fontSize: 12,
        fontWeight: "bold",
    },
}
const status = [
    { name: "ACTIVE", value: "Y" },
    { name: "INACTIVE", value: "N" },
]
const AddressType = [
    { name: "SHIPPING ADDRESS", value: "S" },
    { name: "BILLING ADDRESS", value: "B" },
]
const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
export default function AddAddress({ CloseAddressDetails }) {
    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        gst_id: false
    })
    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };
    return (
        <>
            <Grid container spacing={2} paddingLeft={2} paddingTop={1}>
                {/* ================ */}
                <Grid item xs={2} sm={2} md={10} lg={10} sx={{ width: "1000px", borderBottom: "1px solid #000" }}>
                    <Typography variant="h4">
                        Address Details
                    </Typography>
                </Grid>
                {/* ================ */}
                <Grid item xs={2} sm={2} md={2} lg={2} sx={{ textAlign: "end", width: "1000px", borderBottom: "1px solid #000" }}>
                    <Button onClick={CloseAddressDetails} sx={{ marginTop: "-5px" }}>
                        <HighlightOffIcon fontSize='large' />
                    </Button>
                </Grid>
                {/* ================ */}
            </Grid>
            {/* ================ */}
            <Grid container spacing={2} padding={2} >
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography component="h5" style={{ borderBottom: "1px dashed #000" }}>
                        Customer Code : 4586
                    </Typography>
                </Grid>
                {/* ================================================= */}
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <Typography component="h5" style={{ borderBottom: "1px dashed #000" }}>
                        Customer Name : JOHN
                    </Typography>
                </Grid>
                {/* ================================================= */}
                {/* =========================Address Type======================== */}
                <Grid item md={4} lg={4} sm={12} xs={12}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={AddressType}
                        size='small'
                        fullWidth
                        getOptionLabel={(options) => options.name}
                        //isOptionEqualToValue={(option, value) => option.dep_paymode_id === value.dep_paymode_id}
                        //value={fetchDepositePaymodeDD.find(option => option.dep_paymode_id === formData.paymode) || null}
                        //onChange={(e, v) => handleFieldChange("paymode", v?.dep_paymode_id || "")}
                        sx={autoCompleteStyle}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Address Type"
                                required
                            //error={Boolean(Errors.paymode)}
                            //helperText={Errors.paymode}
                            />}
                    />
                </Grid>
                {/* =========================Address 1======================== */}
                <Grid item md={12} lg={12} sm={12} xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Address 1"
                        variant="outlined"
                        size='small'
                        fullWidth
                        sx={textFiledStyle}
                        required
                    //value={formData.phoneNumber}
                    //onChange={(e) => handleFieldChange("phoneNumber", e.target.value.replace(/[^0-9]/g, ''))}
                    //error={Boolean(errors.phoneNumber)}
                    //helperText={errors.phoneNumber}
                    />
                </Grid>
                {/* =========================Address 2======================== */}
                <Grid item md={12} lg={12} sm={12} xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Address 2"
                        variant="outlined"
                        size='small'
                        fullWidth
                        sx={textFiledStyle}
                        required
                    //value={formData.phoneNumber}
                    //onChange={(e) => handleFieldChange("phoneNumber", e.target.value.replace(/[^0-9]/g, ''))}
                    //error={Boolean(errors.phoneNumber)}
                    //helperText={errors.phoneNumber}
                    />
                </Grid>
                {/* =========================Address 3======================== */}
                <Grid item md={12} lg={12} sm={12} xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Address 3"
                        variant="outlined"
                        size='small'
                        fullWidth
                        sx={textFiledStyle}
                        required
                    //value={formData.phoneNumber}
                    //onChange={(e) => handleFieldChange("phoneNumber", e.target.value.replace(/[^0-9]/g, ''))}
                    //error={Boolean(errors.phoneNumber)}
                    //helperText={errors.phoneNumber}
                    />
                </Grid>
                {/* =========================City======================== */}
                <Grid item md={4} lg={4} sm={12} xs={12}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={AddressType}
                        size='small'
                        fullWidth
                        getOptionLabel={(options) => options.name}
                        //isOptionEqualToValue={(option, value) => option.dep_paymode_id === value.dep_paymode_id}
                        //value={fetchDepositePaymodeDD.find(option => option.dep_paymode_id === formData.paymode) || null}
                        //onChange={(e, v) => handleFieldChange("paymode", v?.dep_paymode_id || "")}
                        sx={autoCompleteStyle}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="City"
                                required
                            //error={Boolean(Errors.paymode)}
                            //helperText={Errors.paymode}
                            />}
                    />
                </Grid>
                {/* =========================PinCode======================== */}
                <Grid item md={4} lg={4} sm={12} xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="PinCode"
                        variant="outlined"
                        size='small'
                        fullWidth
                        sx={textFiledStyle}
                        required
                    //value={formData.phoneNumber}
                    //onChange={(e) => handleFieldChange("phoneNumber", e.target.value.replace(/[^0-9]/g, ''))}
                    //error={Boolean(errors.phoneNumber)}
                    //helperText={errors.phoneNumber}
                    />
                </Grid>
                {/* =========================Taluk======================== */}
                <Grid item md={4} lg={4} sm={12} xs={12}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        //options={fetchDepositePaymodeDD}
                        size='small'
                        fullWidth
                        //getOptionLabel={(options) => options.dep_mode}
                        //isOptionEqualToValue={(option, value) => option.dep_paymode_id === value.dep_paymode_id}
                        //value={fetchDepositePaymodeDD.find(option => option.dep_paymode_id === formData.paymode) || null}
                        //onChange={(e, v) => handleFieldChange("paymode", v?.dep_paymode_id || "")}
                        sx={autoCompleteStyle}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Taluk"
                                required
                            //error={Boolean(Errors.paymode)}
                            //helperText={Errors.paymode}
                            />}
                    />
                </Grid>
                {/* =========================District======================== */}
                <Grid item  md={4} lg={4} sm={12} xs={12}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        //options={fetchDepositePaymodeDD}
                        size='small'
                        fullWidth
                        //getOptionLabel={(options) => options.dep_mode}
                        //isOptionEqualToValue={(option, value) => option.dep_paymode_id === value.dep_paymode_id}
                        //value={fetchDepositePaymodeDD.find(option => option.dep_paymode_id === formData.paymode) || null}
                        //onChange={(e, v) => handleFieldChange("paymode", v?.dep_paymode_id || "")}
                        sx={autoCompleteStyle}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="District"
                                required
                            //error={Boolean(Errors.paymode)}
                            //helperText={Errors.paymode}
                            />}
                    />
                </Grid>
                {/* =========================Location======================== */}
                <Grid item  md={4} lg={4} sm={12} xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Location"
                        variant="outlined"
                        size='small'
                        fullWidth
                        sx={textFiledStyle}
                        required
                    //value={formData.phoneNumber}
                    //onChange={(e) => handleFieldChange("phoneNumber", e.target.value.replace(/[^0-9]/g, ''))}
                    //error={Boolean(errors.phoneNumber)}
                    //helperText={errors.phoneNumber}
                    />
                </Grid>
                {/* =========================Status======================== */}
                <Grid item  md={4} lg={4} sm={12} xs={12}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={status}
                        size='small'
                        fullWidth
                        getOptionLabel={(options) => options.name}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        //value={fetchDepositePaymodeDD.find(option => option.dep_paymode_id === formData.paymode) || null}
                        //onChange={(e, v) => handleFieldChange("paymode", v?.dep_paymode_id || "")}
                        sx={autoCompleteStyle}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Status"
                                required
                            //error={Boolean(Errors.paymode)}
                            //helperText={Errors.paymode}
                            />}
                    />
                </Grid>
                {/* =========================BTN======================== */}
                <Grid item md={12} lg={12} sm={12} xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="contained"
                            size='small'
                        //onClick={(e) => handleSubmit(e)}
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            size='small'
                            color="error"
                        //onClick={() => handleClear()}
                        >
                            Clear
                        </Button>
                    </Stack>
                </Grid>
                 {/* =========================datagrid start======================== */}
                 <Grid item md={12} lg={12} sm={12} xs={12}>
                    <Box sx={{ height: 150, width: '100%', marginTop: '20px' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            //getRowId={(row) => row.gst_id.toString()}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 1,
                                    },
                                },
                            }}
                            columnVisibilityModel={columnVisibilityModel}
                            onColumnVisibilityModelChange={(newModel) =>
                                setColumnVisibilityModel(newModel)
                            }
                            pageSizeOptions={[1,5, 10, 20]}
                            disableRowSelectionOnClick
                            getRowHeight={() => 35}
                            getRowClassName={getRowClassName}
                        />
                    </Box>
                </Grid>
                {/* =========================datagrid end======================== */}
            </Grid>
        </>
    )
}
