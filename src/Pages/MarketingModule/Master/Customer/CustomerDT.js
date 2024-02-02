import React, { useState } from 'react'
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
import { customerApi } from '../../../Api';
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";


export default function CustomerDT() {
    const navigate = useNavigate()
    const [searchByCode, setSearchByCode] = React.useState(true)
    const [searchByName, setSearchByName] = React.useState(false)
    const [Rows, setRows] = useState([]);
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

                </>
            ),
        },
        {
            field: 'customer_code',
            headerName: 'Customer Code',
            width: 90
        },
        {
            field: 'user_code',
            headerName: 'Customer Code',
            width: 150,
        },
        {
            field: 'customer_name',
            headerName: 'Customer Name',
            width: 150,
        },
        {
            field: 'customer_alias',
            headerName: 'Customer Alias',
            width: 150,
        },
        {
            field: 'status_id',
            headerName: 'Status Id',
            width: 150,
        },
        {
            field: 'rel_type_id',
            headerName: 'Relation Type ID',
            width: 150,
        },
        {
            field: 'rel_name',
            headerName: 'Relation Name',
            width: 150,
        },
        {
            field: 'customer_type',
            headerName: 'Customer Type',
            width: 150,
        },
        {
            field: 'bill_catag',
            headerName: 'Bill Catageory',
            width: 150,
        },
        {
            field: 'rate_catag',
            headerName: 'Rate Catageory',
            width: 150,
        },
        {
            field: 'pay_mode',
            headerName: 'Pay Mode',
            width: 150,
        },
        {
            field: 'bank_code',
            headerName: 'Bank Code',
            width: 150,
        },
        {
            field: 'branch_code',
            headerName: 'Branch Code',
            width: 150,
        },
        {
            field: 'account_no',
            headerName: 'Account Number',
            width: 150,
        },
        {
            field: 'fd_lock',
            headerName: 'FD Lock',
            width: 150,
        },
        {
            field: 'fd_limit',
            headerName: 'FD Limit',
            width: 150,
        },
        {
            field: 'balance',
            headerName: 'Balance',
            width: 150,
        },
        {
            field: 'pan_no',
            headerName: 'Pan Number',
            width: 150,
        },
        {
            field: 'gst_no',
            headerName: 'Gst Number',
            width: 150,
        },
        {
            field: 'aadhar_no',
            headerName: 'Aadhar Number',
            width: 150,
        },
        {
            field: 'mobile',
            headerName: 'Mobile Number',
            width: 150,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 150,
        },
        {
            field: 'officer_code',
            headerName: 'Officer Code',
            width: 150,
        },
        {
            field: 'registration_date',
            headerName: 'Registration Date',
            width: 150,
        },
        {
            field: 'tcs_perc',
            headerName: 'TCS Percentage',
            width: 150,
        },
        {
            field: 'alternate_ph_no',
            headerName: 'Alternate Phone Number',
            width: 150,
        },

    ];
    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };
    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        deposit_id: false,
        customer_code: false,
        dep_paymode_id: false,
    })
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
    const handleEdit = (row) => {
        console.log(row);
    }
    const handleClick = () => {
        navigate("CreateCustomer")
    }
    const FetchData = async () => {
        try {
            const respone = await customerApi.customerMaster().FetchAll()
            if (respone.status === 200) {
                setRows(respone.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const status = [
        { name: "Active", },
        { name: "Inactive" }
    ]
    React.useEffect(() => {
        document.title = 'Customer'
        FetchData()
    }, [])
    console.log(Rows);
    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={12} lg={12} sm={12} xs={12}>
                    <Paper sx={{ padding: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item md={12} lg={12} sm={12} xs={12} width={1000}>
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
                            <Grid item md={2} lg={2} sm={12} xs={12}>
                                <Button variant="contained"
                                    size='small'
                                    sx={{ marginTop: 0.5, marginLeft: "-10px" }}
                                >Search
                                </Button>
                            </Grid>
                            <Grid item md={4} lg={4} sm={12} xs={12} sx={{ textAlign: "end" }}>
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
                                    rows={Rows}
                                    columns={columns}
                                    getRowId={(row) => row.customer_code.toString()}
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
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}
