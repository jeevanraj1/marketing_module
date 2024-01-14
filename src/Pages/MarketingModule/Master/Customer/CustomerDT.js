import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Grid, Paper, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';


export default function CustomerDT() {
    const navigate = useNavigate()
    const [searchByCode, setSearchByCode] = React.useState(true)
    const [searchByName, setSearchByName] = React.useState(false)
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

    const handleSearch = (e) => {
        const { value } = e.target;

        if (value === 'Code') {
            setSearchByCode(true);
            setSearchByName(false);
        } else if (value === 'Name') {
            setSearchByCode(false);
            setSearchByName(true);
        }
    }

    const handleClick = () => {
        navigate("/customer/CustomerCreate")
    }

    const status = [
        { name: "Active", },
        { name: "Inactive" }
    ]
    React.useEffect(() => {
        document.title = 'Customer'
    }, [])
    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={12} lg={12} sm={12} xs={12}>
                    <Paper sx={{ padding: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Typography variant='h5'>
                                    Customer  Master
                                </Typography>
                            </Grid>
                            <Grid item md={3} lg={3} sm={12} xs={12}>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="Search"
                                        onChange={(e) => { handleSearch(e) }}
                                    >
                                        <FormControlLabel
                                            value="Code"
                                            control={<Radio checked={searchByCode} />}
                                            label="User Code"
                                        />
                                        <FormControlLabel
                                            value="Name"
                                            control={<Radio checked={searchByName} />}
                                            label="User Name"
                                        />

                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            {searchByCode && (
                                <Grid item md={3} lg={3} sm={12} xs={12}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={status}
                                        getOptionLabel={(options) => options.name}
                                        renderInput={(params) => <TextField
                                            {...params}
                                            label="Code"
                                            size='small'
                                            fullWidth
                                            sx={{
                                                marginTop: 0.5,
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": {
                                                        borderColor: "black",
                                                        borderWidth: "2px",
                                                    },
                                                },
                                                "& .MuiInputLabel-root": {
                                                    color: "black",
                                                    "&.Mui-focused": {
                                                        transform: "translate(14px, -8px)",
                                                    },
                                                },
                                                "& input, & label": {
                                                    height: "14px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    fontSize: 12,
                                                    fontWeight: "bold",
                                                },
                                            }}
                                        />}
                                    />
                                </Grid>
                            )}
                            {searchByName && (
                                <Grid item md={3} lg={3} sm={12} xs={12}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={status}
                                        getOptionLabel={(options) => options.name}
                                        renderInput={(params) => <TextField
                                            {...params}
                                            label="Name"
                                            size='small'
                                            fullWidth
                                            sx={{
                                                marginTop: 0.5,
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": {
                                                        borderColor: "black",
                                                        borderWidth: "2px",
                                                    },
                                                },
                                                "& .MuiInputLabel-root": {
                                                    color: "black",
                                                    "&.Mui-focused": {
                                                        transform: "translate(14px, -8px)",
                                                    },
                                                },
                                                "& input, & label": {
                                                    height: "14px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    fontSize: 12,
                                                    fontWeight: "bold",
                                                },
                                            }}
                                        />}
                                    />
                                </Grid>
                            )}
                            <Grid item md={3} lg={3} sm={12} xs={12}>
                                <Button variant="contained"
                                    size='small'
                                    sx={{ marginTop: 0.5, marginLeft: "-10px" }}
                                >Search
                                </Button>
                            </Grid>
                            <Grid item md={3} lg={3} sm={12} xs={12} sx={{ textAlign: "end" }}>
                                <Button
                                    variant="contained"
                                    onClick={() => handleClick()}
                                    size='small'
                                    sx={{ marginTop: 0.5 }}
                                >Create
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid item md={12} lg={12} sm={12} xs={12}>
                            <Box sx={{ height: 400, marginTop: 2 }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 5,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[5]}
                                    checkboxSelection
                                    disableRowSelectionOnClick
                                />
                            </Box>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}
