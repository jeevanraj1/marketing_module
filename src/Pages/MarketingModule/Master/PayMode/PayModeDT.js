// import React from 'react'
// import { Grid, Typography, Paper, Button, Box, TextField, Stack } from '@mui/material'
// import { DataGrid } from '@mui/x-data-grid'
// import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
// import Swal from 'sweetalert2';
// import { paymodeApi } from '../../../Api';


// const textFiledStyle = {
//     width: "100%",
//     "& .MuiOutlinedInput-root": {
//         "& fieldset": { borderColor: "black", borderWidth: "2px" },
//     },
//     "& .MuiInputLabel-root": {
//         color: "black",
//         "&.Mui-focused": {
//             transform: "translate(14px, -5px)",
//         },
//     },
//     "& input, & label": {
//         height: "15px",
//         display: "flex",
//         alignItems: "center",
//         fontSize: 12,
//         fontWeight: "bold",
//     },
// }

// export default function PayModeDT() {

//     const [rows, setRows] = React.useState([])
//     const [errors, setErrors] = React.useState({});
//     const [formData, setFormData] = React.useState({
//         paymode: '',
//         description: '',
//     });
//     const [pay_id, setPay_id] = React.useState(null);
//     const [saveButton, setSaveButton] = React.useState(true);
//     const [updateButton, setUpdateButton] = React.useState(false);
//     const columns = [
//         {
//             field: "action",
//             headerName: "Action",
//             width: 100,
//             renderCell: (params) => (
//                 <>
//                     <ModeEditOutlineRoundedIcon
//                         sx={{ color: "blue", marginRight: 2 }}
//                         style={{
//                             cursor: "pointer",
//                             opacity: 1,
//                             transition: "opacity 0.3s",
//                         }}
//                         onMouseOver={(e) => {
//                             e.currentTarget.style.opacity = 0.7;
//                             e.currentTarget.style.color = "lightblue";
//                         }}
//                         onMouseOut={(e) => {
//                             e.currentTarget.style.opacity = 1;
//                             e.currentTarget.style.color = "blue";
//                         }}
//                         onClick={() =>
//                             HandleEdit(
//                                 params.row.pay_id,
//                                 params.row.pay_mode,
//                                 params.row.description,
//                             )
//                         }
//                     >
//                         Edit
//                     </ModeEditOutlineRoundedIcon>
//                     {/* <DeleteForeverIcon
//                 sx={{ color: "red" }}
//                 style={{
//                   cursor: "pointer",
//                   opacity: 1,
//                   transition: "opacity 0.3s",
//                 }}
//                 onMouseOver={(e) => {
//                   e.currentTarget.style.opacity = 0.7;
//                   e.currentTarget.style.color = "rgba(255, 0, 0, 0.7)";
//                 }}
//                 onMouseOut={(e) => {
//                   e.currentTarget.style.opacity = 1;
//                   e.currentTarget.style.color = "red";
//                 }}
//                 // onClick={() => handleDeleteButtonClick(params.row.slab_id)}
//               >
//                 Delete
//               </DeleteForeverIcon> */}
//                 </>
//             ),
//         },
//         {
//             field: 'pay_id',
//             headerName: 'pay_id',
//             width: 150,
//             align: "right"
//         },
//         {
//             field: 'pay_mode',
//             headerName: 'Pay Mode',
//             width: 150,
//         },
//         {
//             field: 'description',
//             headerName: 'Description',
//             width: 450,
//         },
//     ];
//     const HandleEdit = async (pay_id, pay_mode, description) => {
//         setPay_id(pay_id);
//         setFormData({
//             paymode: pay_mode,
//             description: description,
//         });
//         setSaveButton(false);
//         setUpdateButton(true);
//     }
//     const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
//         pay_id: false,
//     });

//     const getRowClassName = (params) => {
//         const rowIndex = params.indexRelativeToCurrentPage;
//         return rowIndex % 2 === 0 ? "row-even" : "row-odd";
//     };

//     const fetch_paymode = async () => {
//         try {
//             const response = await paymodeApi.paymodeapi_master().fetchAll();
//             if (response.status === 200) {
//                 setRows(response.data.items)
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     const handleFieldChange = (fieldName, value) => {
//         setErrors((prevErrors) => ({
//             ...prevErrors,
//             [fieldName]: "",
//         }));

//         if (fieldName === 'paymode' && value.length > 2) {
//             setErrors((prevErrors) => ({
//                 ...prevErrors,
//                 paymode: 'Value must be 2 characters or less',
//             }));
//             setTimeout(() => {
//                 setErrors("");
//             }, 1000);
//         } else {
//             // setErrors((prevErrors) => ({
//             //     ...prevErrors,
//             //     paymode: '',
//             // }));
//             setFormData({
//                 ...formData,
//                 [fieldName]: value,
//             });
//         }

//     };
//     console.log(errors);
//     const HandelSave = async () => {
//         if (!formData.paymode.trim()) {
//             setErrors({ paymode: "*Required" });
//             return;
//         }
//         console.log(Object.keys(errors).length);
//         if (Object.keys(errors).length === 0) {
//             try {
//                 const newRecord = {
//                     pay_mode: formData.paymode,
//                     description: formData.description,
//                 };
//                 console.log(newRecord);
//                 const response = await paymodeApi.paymodeapi_master().create(newRecord);
//                 if (response.data.Status === 1) {
//                     Swal.fire("", "Saved Successfully", "success");
//                     localStorage.setItem("Navigation_state", true);
//                     fetch_paymode()
//                     setFormData({
//                         paymode: '',
//                         description: '',
//                     });
//                 } else {
//                     Swal.fire("", response.data.Error, "error");
//                 }
//             } catch (error) {
//                 Swal.fire("", `${error}`, "error");
//             }
//         }
//     }
//     const HandleClear = () => {
//         setFormData({
//             paymode: '',
//             description: '',
//         });
//         setSaveButton(true);
//         setUpdateButton(false)
//         setErrors({});
//         localStorage.setItem("Navigation_state", true);
//     }
//     React.useEffect(() => {
//         fetch_paymode()
//     }, [])
//     return (
//         <>
//             <Grid container spacing={2}>
//                 <Grid item md={7} lg={7} sm={12} xs={12}>
//                     <Paper sx={{ padding: 2 }}>
//                         <Grid container spacing={2}>
//                             {/* =========================Relation  Master======================== */}
//                             <Grid item md={12} lg={12} sm={12} xs={12}>
//                                 <Typography variant='h5'>
//                                     Pay Mode Master
//                                 </Typography>
//                             </Grid>
//                             {/* =========================Payment Mode======================== */}
//                             <Grid item md={2.5} lg={2.5} sm={12} xs={12}>
//                                 <TextField
//                                     id="outlined-basic"
//                                     label="Payment Mode"
//                                     variant="outlined"
//                                     size='small'
//                                     required
//                                     fullWidth
//                                     name='paymode'
//                                     inputProps={{ maxLength: 3 }}
//                                     sx={textFiledStyle}
//                                     value={formData.paymode || ''}
//                                     onChange={(e) => handleFieldChange("paymode", e.target.value.toUpperCase().trim())}
//                                     error={Boolean(errors.paymode)}
//                                     helperText={errors.paymode || ""}
//                                 />
//                             </Grid>
//                             {/* =========================Description======================== */}
//                             <Grid item md={7} lg={7} sm={12} xs={12}>
//                                 <TextField
//                                     id="outlined-basic"
//                                     label="Description"
//                                     variant="outlined"
//                                     size='small'
//                                     required
//                                     fullWidth
//                                     name='description'
//                                     sx={textFiledStyle}
//                                     value={formData.description || ''}
//                                     onChange={(e) => handleFieldChange("description", e.target.value.toUpperCase().trim())}
//                                 />
//                             </Grid>
//                             {/* =========================Button======================== */}
//                             <Grid item md={12} lg={12} sm={12} xs={12}>
//                                 <Stack direction="row" spacing={2}>
//                                     {saveButton && (
//                                         <Button
//                                             variant="contained"
//                                             type='submit'
//                                             size='small'
//                                             onClick={() => HandelSave()}
//                                         >
//                                             Save
//                                         </Button>
//                                     )}
//                                     {updateButton && (
//                                         <Button
//                                             variant="contained"
//                                             type='submit'
//                                             size='small'
//                                         >
//                                             Update
//                                         </Button>
//                                     )}


//                                     <Button
//                                         variant="contained"
//                                         color="error"
//                                         size='small'
//                                         onClick={() => HandleClear()}
//                                     >
//                                         Clear
//                                     </Button>
//                                 </Stack>
//                             </Grid>
//                         </Grid>
//                     </Paper>
//                     <Grid xs={12} sm={12} md={12} lg={12}>
//                         <Box sx={{ height: 300, width: '100%', marginTop: '20px' }}>
//                             <DataGrid
//                                 rows={rows}
//                                 columns={columns}
//                                 getRowId={(row) => row.pay_id.toString()}
//                                 initialState={{
//                                     pagination: {
//                                         paginationModel: {
//                                             pageSize: 10,
//                                         },
//                                     },
//                                 }}
//                                 columnVisibilityModel={columnVisibilityModel}
//                                 onColumnVisibilityModelChange={(newModel) =>
//                                     setColumnVisibilityModel(newModel)
//                                 }
//                                 pageSizeOptions={[10, 20]}
//                                 disableRowSelectionOnClick
//                                 getRowHeight={() => 35}
//                                 getRowClassName={getRowClassName}
//                             />
//                         </Box>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </>
//     )
// }

import { Paper } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { useEffect } from "react";
import { paymode_Api } from "../../../Api";
import { useState } from 'react';
import Swal from "sweetalert2";

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

export default function PayModeDT() {
    const [rows, setRows] = useState([]);
    const [errors, setErrors] = useState({});
    const [pay_id, setPay_id] = useState(null);
    const [saveButton, setSaveButton] = useState(true);
    const [updateButton, setUpdateButton] = useState(false);

    const [formData, setFormData] = useState({
        paymode: '',
        description: '',
    });

    const HandleEdit = async (pay_id, pay_mode, description) => {
        setPay_id(pay_id);
        setFormData({
            paymode: pay_mode,
            description: description,
        });
        setSaveButton(false);
        setUpdateButton(true);
        localStorage.setItem("Navigation_state", true)
    }
    console.log(errors);
    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };
    const columns = [
        {
            field: "action",
            headerName: "Action",
            width: 100,
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
                        onClick={() =>
                            HandleEdit(
                                params.row.pay_id,
                                params.row.pay_mode,
                                params.row.description,
                            )
                        }
                    >
                        Edit
                    </ModeEditOutlineRoundedIcon>
                </>
            ),
        },
        {
            field: 'pay_id',
            headerName: 'pay_id',
            width: 150,
            align: "right"
        },
        {
            field: 'pay_mode',
            headerName: 'Pay Mode',
            width: 150,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 150,
        },
    ];

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        pay_id: false,
    });


    const handleFieldChange = (fieldName, value) => {
        localStorage.setItem("Navigation_state", false)
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
        if (fieldName === "paymode" && value.length > 2) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                paymode: 'Value must be within 2 characters',
            }));
            setTimeout(() => {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    paymode: '',
                }));
            }, 1000)
        }
        else if (fieldName === "paymode" && value.length <= 2) {

            setErrors((prevErrors) => ({
                ...prevErrors,
                paymode: '',
            }));
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }


        if (fieldName === "description" && value.length <= 3) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                description: 'Value must greater than 3 charaters',
            }));
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))

        }
        else if (fieldName === "description" && value.length > 3) {

            setErrors((prevErrors) => ({
                ...prevErrors,
                description: '',
            }));
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }

    }

    const validation = () => {

        const newErrors = {}

        if (formData.paymode === "") {
            newErrors.paymode = "Required"
        }
        else if (formData.paymode !== "") {
            newErrors.paymode = errors.paymode
        }

        if (formData.description === "") {
            newErrors.description = "Required"
        } else if (formData.description !== "") {
            newErrors.description = errors.description
        }

        return newErrors
    }
    const fetch_paymode = async () => {
        try {
            const response = await paymode_Api.paymode().fetchAll();
            console.log(response);
            if (response.status === 200) {
                setRows(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const HandelSave = async (e) => {
        e.preventDefault();
        const validationErorrs = validation()
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
        if (!hasErrors) {
            const newRecord = {
                pay_mode: formData.paymode,
                description: formData.description.trim(),
            };
            console.log(newRecord);
            try {
                const response = await paymode_Api.paymode().create(newRecord);
                console.log(response.data);
                if (response.data.Status === 1) {
                    Swal.fire("", "Saved Successfully", "success");
                    localStorage.setItem("Navigation_state", true);
                    fetch_paymode()
                    setFormData({
                        paymode: '',
                        description: '',
                    });
                    localStorage.setItem("Navigation_state", true)
                } else {
                    Swal.fire("Error", response.data.Error, "error");
                }
            } catch (error) {
                Swal.fire("error", `${error}`, "error");
            }
        }

    }

    const HandelUpdate = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
        if (!hasErrors) {
            console.log("hi");
            const newRecord = {
                pay_mode: formData.paymode,
                description: formData.description.trim(),
            };
            try {
                const response = await paymode_Api.paymode().update(pay_id, newRecord)
                console.log(response);
                if (response.data.Status === 1) {
                    Swal.fire("success", "Updated Successfully", "success");
                    localStorage.setItem("Navigation_state", true);
                    fetch_paymode()
                    setFormData({
                        paymode: '',
                        description: '',
                    });
                    localStorage.setItem("Navigation_state", true)
                    setSaveButton(true);
                    setUpdateButton(false)
                } else {
                    Swal.fire("Error", `${response.data.Error}`, "error");
                }
            } catch (error) {
                console.log(error);
            }
        }

    }

    const HandleClear = () => {
        setFormData((prevdata) => ({
            ...prevdata,
            paymode: "",
            description: ""
        }))
        setSaveButton(true);
        setUpdateButton(false)

        setErrors((prevErrors) => ({
            ...prevErrors,
            paymode: "",
            description: ""
        }));
        localStorage.setItem("Navigation_state", true);
    }

    useEffect(() => {
        fetch_paymode()
        document.title = "PayMode"
    }, []);

    return (
        <>
            {/* ============================================================================  */}
            {/* fields start  */}
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={10} lg={10}>
                        <Paper elevation={3} sx={{ width: "100%", marginTop: "-30px" }}>
                            <Grid
                                container
                                spacing={2}
                                marginTop={3}
                                sx={{ padding: "20px", paddingTop: "1px" }}
                            >
                                <Grid item xs={12} sm={12} md={12} sx={{ marginBottom: "0" }}>
                                    <Typography variant="h5">Pay Mode</Typography>
                                </Grid>
                                {/* ====================  */}

                                <Grid item xs={12} sm={12} md={3} lg={3}>
                                    <TextField id="outlined-basic"
                                        label="Pay Mode"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        name="paymode"
                                        value={formData.paymode}
                                        required
                                        sx={textFiledStyle}
                                        error={Boolean(errors.paymode)}
                                        helperText={errors.paymode || ""}
                                        onChange={(e) => handleFieldChange("paymode", e.target.value.toUpperCase().trim())}
                                    />
                                </Grid>

                                {/* ================ */}


                                <Grid item xs={12} sm={12} md={8} lg={8}>
                                    <TextField id="outlined-basic"
                                        label="Description"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        required
                                        name="description"
                                        value={formData.description}
                                        inputProps={{ maxLength: 40 }}
                                        sx={textFiledStyle}
                                        error={Boolean(errors.description)}
                                        helperText={errors.description || ""}
                                        onChange={(e) => handleFieldChange("description", e.target.value.toUpperCase())}
                                    />
                                </Grid>



                                <Grid item xs={12} sm={12} md={1} lg={1}>
                                </Grid>

                                {/* ================ */}

                                {saveButton && (
                                    <Grid item xs={12} sm={12} md={1} lg={1}>
                                        <Stack spacing={4} direction="row">
                                            <Button
                                                variant="contained"
                                                onClick={HandelSave}
                                                size="small"
                                            >
                                                Save
                                            </Button>
                                        </Stack>
                                    </Grid>
                                )}


                                {/* ================ */}

                                {updateButton && (
                                    <Grid item xs={12} sm={12} md={1} lg={1}>
                                        <Stack spacing={4} direction="row" >
                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={HandelUpdate}
                                            >
                                                Update
                                            </Button>
                                        </Stack>
                                    </Grid>
                                )}

                                {/* ================ */}

                                <Grid item xs={12} sm={12} md={1} lg={1} sx={{ marginLeft: -1 }} >
                                    <Stack spacing={2} direction="row">
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={HandleClear}
                                            size="small"
                                        >
                                            Clear
                                        </Button>
                                    </Stack>
                                </Grid>

                                {/* ================ */}
                            </Grid>
                        </Paper>
                        {/* grid End */}
                    </Grid>
                </Grid>

                {/* ======================================== */}

                <Grid container spacing={2} sx={{ marginTop: 0 }}>
                    <Grid item xs={12} sm={12} md={10} lg={10}>
                        <Paper elevation={3} sx={{ maxWidth: "100%" }}>
                            <div style={{ maxWidth: "auto", overflow: "auto" }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    format="DD/MMM/YYYY"
                                    getRowId={(row) => row.pay_id.toString()}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                    columnVisibilityModel={columnVisibilityModel}
                                    onColumnVisibilityModelChange={(newModel) =>
                                        setColumnVisibilityModel(newModel)
                                    }
                                    pageSizeOptions={[5, 10]}
                                    disableRowSelectionOnClick
                                    getRowHeight={() => 35}
                                    getRowClassName={getRowClassName}
                                />
                            </div>
                        </Paper>
                    </Grid>



                </Grid>
            </div>
            {/* fields End  */}
            {/* =========================================================================  */}
        </>
    );
}
