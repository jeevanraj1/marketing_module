import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Box, Stack, TextField, Button, Grid, Typography } from "@mui/material";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import Swal from 'sweetalert2';
import { CustomerTypeApi } from '../../../Api';

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
export default function CustomerTypeDT() {
    const [rows, setRows] = useState([]);
    const [customerTypeId, setCustomerTypeId] = useState();
    const [saveButton, setSaveButton] = useState(true);
    const [updateButton, setUpdateButton] = useState();
    const [columnVisibilityModel, setColumnVisibilityModel] = useState({ customer_type_id: false });

    const [formData, setFormData] = React.useState({
        customerTypeName: "",
    });
    const [errors, setErrors] = React.useState({})

    const handleEdit = (row) => {
        setFormData((prevdata) => ({
            ...prevdata,
            customerTypeName: row.customer_type_name
        }))
        setCustomerTypeId(row.customer_type_id)
        setUpdateButton(true)
        setSaveButton(false)
        localStorage.setItem("Navigation_state", true)
    }

    const handleFieldChange = (fieldName, value) => {
        localStorage.setItem("Navigation_state", false)
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
        if (fieldName === "customerTypeName") {
            if (value.trim().length > 15) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    customerTypeName: 'Must be less than 15 Characters'
                }))
                value = value.substring(0, 15)
                setTimeout(() => {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        customerTypeName: ''
                    }))
                }, 1000)
            }
            else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    customerTypeName: ''
                }))
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
    }

    const validation = () => {
        const newErrors = {}
        if (formData.customerTypeName === "") {
            newErrors.customerTypeName = "Required "
        } else if (formData.customerTypeName.trim().length > 15) {
            newErrors.customerTypeName = "Value Must Be Less Than 15 Charaters"
        }
        return newErrors
    }

    const handleClear = () => {
        setFormData((prevdata) => ({
            ...prevdata,
            customerTypeName: "",
        }))
        setSaveButton(true)
        setUpdateButton(false)
        setErrors((prevdata) => ({
            ...prevdata,
            customerTypeName: ""
        }))
        localStorage.setItem("Navigation_state", true)
    }

    const fetchData = async () => {
        try {
            const response = await CustomerTypeApi.CustomerTypeApi_master().fetchAll();
            console.log(response);
            if (response.status === 200) {
                setRows(response.data.items);

            } else {
                console.error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchData();
        document.title = 'Customer Type Master'
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        console.log(validationErorrs);
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null)
        if (!hasErrors) {
            try {
                const newRecord = {
                    customer_type_name: formData.customerTypeName.trim()
                };
                const response = await CustomerTypeApi.CustomerTypeApi_master().create(newRecord);
                if (response.data.Status === 1) {
                    Swal.fire('Saved', 'Successfully', 'success');
                    handleClear();
                    fetchData();
                    localStorage.setItem("Navigation_state", true)
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: `${response.data.Error}` || 'Unknown Error',
                        icon: 'error',
                    });
                }
            } catch (error) {
                Swal.fire('Error', 'Error posting data', 'error');
            }
        }

    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        console.log(validationErorrs);
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null)
        if (!hasErrors) {
            try {
                const newRecord = {
                    customer_type_name: formData.customerTypeName
                };
                const response = await CustomerTypeApi.CustomerTypeApi_master().update(customerTypeId,newRecord)
                if (response.data.Status === 1) {
                    Swal.fire('Saved', 'Updated Sucessfully', 'success');
                    handleClear();
                    fetchData();
                    localStorage.setItem("Navigation_state", true)
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: `${response.data.Error}` || 'Unknown Error',
                        icon: 'error',
                    });
                }
            } catch (error) {
                Swal.fire('Error', 'Error posting data', 'error');
            }
        }
    }

    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };


    const columns = [
        {
            field: "action",
            headerName: "Action",
            width: 120,
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
            field: 'customer_type_id',
            headerName: 'Customer Type Code',
            width: 120,

        },
        {
            field: 'customer_type_name',
            headerName: 'Customer Type Name',
            width: 160,

        },
    ];
    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={8} lg={8} sm={12} xs={12}>
                    <Paper elevation={3} sx={{ width: "100%", marginTop: 1 }}>
                        <Grid container spacing={2} sx={{ padding: "20px", paddingTop: "5px" }} >
                            {/* ====================  */}
                            <Grid item md={12} lg={12} sm={12} xs={12} >
                                <Typography variant="h5">Customer Type Master</Typography>
                            </Grid>
                            {/* ====================  */}
                            <Grid item md={8} lg={8} sm={12} xs={12}>
                                <TextField
                                    size="small"
                                    id="outlined-basic"
                                    label="Customer Type Name"
                                    variant="outlined"
                                    name='catagName'
                                    fullWidth
                                    required
                                    sx={textFiledStyle}
                                    value={formData.customerTypeName}
                                    onChange={(e) => handleFieldChange("customerTypeName", e.target.value.toUpperCase())}
                                    error={Boolean(errors.customerTypeName)}
                                    helperText={errors.customerTypeName}
                                />
                            </Grid>
                            {/* ====================  */}
                            {/* ================ */}
                            <Grid item md={12} lg={12} sm={12} xs={12} sx={{ textAlign: "left" }}>
                                <Stack spacing={{ xs: 1, sm: 1, md: 1 }} direction={{ xs: 'column', sm: 'row' }}>
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
                                    <Button
                                        variant="contained"
                                        onClick={handleClear}
                                        color="error"
                                        size='small'>
                                        Clear
                                    </Button>
                                </Stack>
                            </Grid>
                            {/* ================================ */}
                        </Grid>
                    </Paper>
                    {/* grid End */}
                    <Paper elevation={3} sx={{ width: "100%", marginTop: 3, }}>
                        {/* ================ */}
                        <Grid item md={12} lg={12} sm={12} xs={12}>
                            <Box sx={{ height: 300, width: '100%' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    getRowId={(row) => row.customer_type_id.toString()}
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
                        {/* ================ */}
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}
