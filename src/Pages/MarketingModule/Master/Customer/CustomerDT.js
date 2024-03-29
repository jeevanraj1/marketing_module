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
import Swal from 'sweetalert2';

const autocompleteStyle = {
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
export default function CustomerDT() {
    const navigate = useNavigate()
    const [searchByCode, setSearchByCode] = React.useState(true)
    const [searchByName, setSearchByName] = React.useState(false)
    const [Rows, setRows] = useState([]);
    const [DDCusomerName, setDDCusomerName] = useState([]);
    const [DDCustomerCode, setDDCustomerCode] = useState([]);
    const [customerCode, setCustomerCode] = useState(null);

    const columns = [
        {
            field: "action",
            headerName: "Action",
            width: 110,
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
            width: 170,
        },
        {
            field: 'customer_name',
            headerName: 'Customer Name',
            width: 190,
        },
        {
            field: 'customer_alias',
            headerName: 'Customer Alias',
            width: 170,
        },
        {
            field: 'status_id',
            headerName: 'Status Id',
            width: 160,
        },
        {
            field: 'status_name',
            headerName: 'Status Name',
            width: 160,
        },
        {
            field: 'rel_type_id',
            headerName: 'Relation Type ID',
            width: 150,
        },
        {
            field: 'rel_name2',
            headerName: 'Relation Type Name',
            width: 200,
        },
        {
            field: 'rel_name',
            headerName: 'Relation Name',
            width: 170,
        },
        {
            field: 'customer_type',
            headerName: 'Customer Type',
            width: 150,
        },
        {
            field: 'customer_type_name',
            headerName: 'Customer Type Name',
            width: 220,
        },
        {
            field: 'bill_catag',
            headerName: 'Bill Catageory',
            width: 150,
        },
        {
            field: 'bill_catag_name',
            headerName: 'Bill Catageory Name',
            width: 200,
        },
        {
            field: 'rate_catag',
            headerName: 'Rate Catageory',
            width: 150,
        },
        {
            field: 'catag_name',
            headerName: 'Rate Catageory Name',
            width: 220,
        },
        {
            field: 'pay_mode',
            headerName: 'Pay Mode',
            width: 150,
        },
        {
            field: 'description',
            headerName: 'Pay Mode',
            width: 250,
        },
        {
            field: 'bank_code',
            headerName: 'Bank Code',
            width: 150,
        },
        {
            field: 'bank_name',
            headerName: 'Bank Name',
            width: 200,
        },
        {
            field: 'branch_code',
            headerName: 'Branch Code',
            width: 200,
        },
        {
            field: 'branch_name',
            headerName: 'Branch Name',
            width: 200,
        },
        {
            field: 'account_no',
            headerName: 'Account Number',
            width: 200,
            align: 'right',
        },
        {
            field: 'fd_lock',
            headerName: 'FD Lock',
            width: 200,
        },
        {
            field: 'fd_limit',
            headerName: 'FD Limit',
            width: 200,
            type: 'number'
        },
        {
            field: 'balance',
            headerName: 'Balance',
            width: 200,
        },
        {
            field: 'pan_no',
            headerName: 'Pan Number',
            width: 200,
        },
        {
            field: 'gst_no',
            headerName: 'Gst Number',
            width: 200,
        },
        {
            field: 'aadhar_no',
            headerName: 'Aadhar Number',
            width: 200,
            align: 'right'
        },
        {
            field: 'mobile',
            headerName: 'Mobile Number',
            width: 200,
            align: 'right'
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
        },
        {
            field: 'officer_code',
            headerName: 'Officer Code',
            width: 200,
        },
        {
            field: 'officer_name',
            headerName: 'Officer Name',
            width: 200,
        },
        {
            field: 'registration_date',
            headerName: 'Registration Date',
            width: 200,
        },
        {
            field: 'tcs_perc',
            headerName: 'TCS Percentage',
            width: 200,
        },
        {
            field: 'alternate_ph_no',
            headerName: 'Alternate Phone Number',
            width: 230,
            align: 'right',
        },
        {
            field: 'main_customer_code',
            headerName: 'Main Customer Code',
            width: 160,
        },
        {
            field: 'customer_name1',
            headerName: 'Main Customer Name',
            width: 150,
        },

    ];
    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };
    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        customer_code: false,
        status_id: false,
        rel_type_id: false,
        customer_type: false,
        bill_catag: false,
        rate_catag: false,
        pay_mode: false,
        bank_code: false,
        branch_code: false,
        officer_code: false,
        fd_lock: false,
        registration_date: false,
    })
    const handleRadio = (e) => {
        const { value } = e.target;
        if (value === 'Code') {
            setSearchByCode(true);
            setSearchByName(false);
            FetchData()
        } else if (value === 'Name') {
            setSearchByCode(false);
            setSearchByName(true);
            FetchData()
        }
    }
    const handleEdit = (row) => {
        console.log(row.main_customer_code,);
        const values = {
            // ======================================Personal Details===============================
            customerCode: row.user_code,
            customerName: row.customer_name,
            customerAlias: row.customer_alias,
            customerStatus: row.status_id,
            relationType: row.rel_type_id,
            relationName: row.rel_name,
            officerName: row.officer_code,
            registrationDate: row.registration_date,
            mainCustomerName: row.main_customer_code,
            // ======================================Customer Category===============================
            customerType: row.customer_type,
            billCategory: row.bill_catag,
            rateCategory: row.rate_catag,
            paymode: row.pay_mode,
            // ======================================Bank Details====================================
            bankName: row.bank_code,
            branchName: row.branch_code,
            ifscCode: '',
            accNumber: row.account_no,
            // ======================================Deposit Details=================================
            totalDepositeAmount: 0,
            FdLock: row.fd_lock,
            creditLimit: row.fd_limit,
            currentBalance: row.balance,
            // ======================================Tax Details=====================================
            panNumber: row.pan_no,
            gstNumber: row.gst_no,
            aadharNumber: row.aadhar_no,
            tcsPercentage: row.tcs_perc,
            // ======================================Contact Details=================================
            phoneNumber: row.mobile,
            emailId: row.email,
            alternatePhoneNumber: row.alternate_ph_no,
            // ==================================================================================
            customer_code: row.customer_code,
        }
        navigate("CreateCustomer", { state: values })
    }
    const handleClick = () => {
        navigate("CreateCustomer")
    }

    const handlefieldChange = async (fieldname, value) => {
        if (fieldname === "CustomerName") {
            if (value === "") {
                setCustomerCode("")
                FetchData()
            }
            else if (value) {
                setCustomerCode(value)
            }
        }
        if (fieldname === "CustomerCode") {
            if (value === "") {
                setCustomerCode("")
                FetchData()
            }
            else if (value) {
                setCustomerCode(value)
            }
        }
    }
    const handleSearch = () => {
        if (customerCode === "" || customerCode === null) {
            Swal.fire({
                title: "select a value to search",
                timer: 1500,
                icon: 'warning',
                showConfirmButton: false
            })
            FetchData()
        }
        else if (customerCode !== "") fetchCustomerDeatils(customerCode)
    }
    const fetchCustomerDeatils = async (id) => {
        try {
            const respone = await customerApi.customerMaster().fetchByCustomerCode(id)
            console.log(respone);
            if (respone.status === 200) {
                setRows(respone.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const FetchData = async () => {
        try {
            const respone = await customerApi.customerMaster().FetchAll()
            console.log(respone);
            if (respone.status === 200) {
                setRows(respone.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fectchCustomerName = async () => {
        try {
            const response = await customerApi.customerMaster().dd_CustomerName()
            if (response.status === 200) {
                setDDCusomerName(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const fectchCustomercode = async () => {
        try {
            const response = await customerApi.customerMaster().dd_UserCode()
            if (response.status === 200) {
                setDDCustomerCode(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(() => {
        document.title = 'Customer Master'
        FetchData()
        fectchCustomerName()
        fectchCustomercode()
    }, [])
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
                            <Grid item md={4} lg={4} sm={12} xs={12}>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="Search"
                                        onChange={(e) => { handleRadio(e) }}
                                    >
                                        <FormControlLabel
                                            value="Code"
                                            control={<Radio checked={searchByCode} />}
                                            label="Customer Code"
                                        />
                                        <FormControlLabel
                                            value="Name"
                                            control={<Radio checked={searchByName} />}
                                            label="Customer Name"
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
                                        onChange={(event, value) => handlefieldChange("CustomerCode", value?.customer_code || "")}
                                        size='small'
                                        fullWidth
                                        sx={autocompleteStyle}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                label="customer Code"
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
                                        onChange={(event, value) => handlefieldChange("CustomerName", value?.customer_code || "")}
                                        size='small'
                                        fullWidth
                                        sx={autocompleteStyle}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                label="customer Name"
                                            />}
                                    />
                                </Grid>
                            )}
                            <Grid item md={2} lg={2} sm={12} xs={12}>
                                <Button variant="contained"
                                    size='small'
                                    onClick={handleSearch}
                                >
                                    Search
                                </Button>
                            </Grid>
                            <Grid item md={3} lg={3} sm={12} xs={12} sx={{ textAlign: "end" }}>
                                <Button
                                    variant="contained"
                                    onClick={() => handleClick()}
                                    size='small'
                                >Create
                                </Button>
                            </Grid>
                        </Grid>
                        <Paper elevation={3} sx={{ width: "100%", marginTop: 3, }}>
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Box sx={{ height: 315, width: '100%' }}>
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
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}