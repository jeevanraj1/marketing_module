import React from 'react'
import { Grid, Typography, Paper, Button, Box, TextField, Stack } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const textFiledStyle = {
    width: "100%",
    "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "black", borderWidth: "2px" },
    },
    "& .MuiInputLabel-root": {
        color: "black",
        "&.Mui-focused": {
            transform: "translate(14px, -5px)",
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

    const handleClick = () => {

    }

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
                            <Grid item md={3} lg={3} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Relation Name"
                                    variant="outlined"
                                    size='small'
                                    required
                                    fullWidth
                                    sx={textFiledStyle}
                                />
                            </Grid>
                            {/* =========================Button======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" type='submit' size='small'>
                                        Save
                                    </Button>
                                    <Button variant="contained" type='submit' size='small'>
                                        Update
                                    </Button>
                                    <Button variant="contained" color="error" size='small'>
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
                                // getRowId={(row) => row.state_id.toString()}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 10,
                                        },
                                    },
                                }}
                            // columnVisibilityModel={columnVisibilityModel}
                            // onColumnVisibilityModelChange={(newModel) =>
                            //     setColumnVisibilityModel(newModel)
                            // }
                            //pageSizeOptions={[10, 20]}
                            //disableRowSelectionOnClick
                            //getRowHeight={() => 35}
                            //getRowClassName={getRowClassName}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
