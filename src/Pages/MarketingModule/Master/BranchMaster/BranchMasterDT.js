import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, Paper, Stack } from "@mui/material";
import { BranchMasterApi, BankMasterApi } from "../../../Api";
import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import translate from "translate";
import Swal from 'sweetalert2';

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
        height: "15px",
        display: "flex",
        alignItems: "center",
        fontSize: 12,
        fontWeight: "bold",
    },
}

export default function BranchMasterDT() {
    const [rows, setRows] = useState([]);
    const [branchCode, setbranchCode] = useState([]);
    const [ifsccode, setIfscCode] = useState("");
    const [bankCodeSelected, setBankCodeSelected] = useState("");
    const [searchbankCodeSelected, setsearchbankCodeSelected] = useState("");
    const [saveButton, setSaveButton] = useState(true);
    const [updateButton, setUpdateButton] = useState(false);
    const [banknames, setBanknames] = useState([]);
    const [englishText, setEnglishText] = useState("");
    const [kannadaText, setKannadaText] = useState("");
    const [edit, setEdit] = useState(false);

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        bank_code: false,
    });

    const [errors, setErrors] = React.useState({
        englishText: null,
        bankCodeSelected: null,
        ifsccode: null,
    });

    if (edit === false) {
        if (englishText === "" && bankCodeSelected === "" && ifsccode === "") {
            localStorage.setItem("Navigation_state", true);
        }
    }

    const validation = () => {
        const newErrors = {};

        if (englishText === "") {
            newErrors.englishText = "* Branch Name Required";
        } else if (englishText.length <= 3) {
            newErrors.englishText = "Minimum 4 Characters Required"
        }


        if (bankCodeSelected === "") {
            newErrors.bankCodeSelected = "* Bank Name Required";
        }

        if (ifsccode === "") {
            newErrors.ifsccode = "* IFSC Code Required";
        } else if (ifsccode.length != 11) {
            newErrors.ifsccode = "IFSC Must be 11 Characters";
        }
        return newErrors;
    }

    const fetchBankMasterData = async () => {
        try {
            const response = await BankMasterApi.bankmaster().fetchAll();
            if (response.status === 200) {
                setBanknames(response.data.items);
            } else {
                alert(response.data.Error);
                //console.error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const bankNamesArray = banknames.map((bank) => ({
        bankcode: bank.bank_code,
        bankname: bank.bank_name,
    }));

    const handleSearchDRPBankNameSelect = (event, newValue) => {
        if (newValue !== null) {
            setsearchbankCodeSelected(newValue.bankcode);
        } else if (newValue === null) {
            fetchData()
            setsearchbankCodeSelected("");
        }
    };

    const handleDRPBankNameSelect = (event, newValue) => {
        localStorage.setItem("Navigation_state", false);
        console.log(newValue);
        if (newValue !== null) {
            setBankCodeSelected(newValue.bankcode);
            setErrors({
                ...errors,
                bankCodeSelected: null,
            });
        } else {
            setBankCodeSelected("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call the validation function to get the validation errors
        const validationErrors = validation();
        // Update the state with the validation errors
        setErrors(validationErrors);
        // Check if there are any errors in the validation results
        const hasErrors = Object.values(validationErrors).some(error => error !== null);
        if (!hasErrors) {
            try {
                // Create the data object to be sent in the POST request
                const newRecord = {
                    branch_name: englishText != null ? englishText.trim() : null,
                    branch_name_kan: kannadaText,
                    ifsc_code: ifsccode != null ? ifsccode.trim() : null,
                    bank_code: bankCodeSelected,
                };
                // Send the POST request to the specified URL
                // console.log(typeof newRecord.bank_code);
                const response = await BranchMasterApi.BranchMaster().create(newRecord);
                console.log(response);

                if (response.data.Status === 1) {
                    // setshowSuccessAlert(true);
                    fetchData();
                    setEnglishText("");
                    setKannadaText("");
                    setIfscCode("");
                    setBankCodeSelected("");
                    setEdit(false);
                    localStorage.setItem("Navigation_state", true);
                    Swal.fire('Saved', 'Successfully', 'success');
                } else {
                    // Error: Something went wrong
                    Swal.fire({
                        title: 'Error',
                        text: response.data.Error || 'Unknown Error',
                        icon: 'error',
                    });
                }
            } catch (error) {
                Swal.fire('Error', 'Error Posting Data', 'error');
            }
        }
    };

    const handleInputChange = (event) => {
        localStorage.setItem("Navigation_state", false);
        const newEnglishText = event.target.value.toUpperCase();
        if (newEnglishText.length <= 3) {
            setErrors({
                ...errors,
                englishText: "Minimum 4 characters Required"
            })
        } else {
            setErrors({
                ...errors,
                englishText: null
            })
        }

        setEnglishText(newEnglishText);
        setKannadaText(""); // Clear Kannada text immediately

        if (newEnglishText !== "") {
            translateToKannada();
        }
    };

    const handlekannadaTextChange = (event) => {
        localStorage.setItem("Navigation_state", false);
        setKannadaText(event.target.value.toUpperCase());
    }

    const handleIfscCode = (e) => {
        setIfscCode(e.target.value.toUpperCase());
        if (ifsccode.length != 10) {
            setErrors({
                ...errors,
                ifsccode: "IFSC Must be 11 Characters"
            })
        } else {
            setErrors({
                ...errors,
                ifsccode: null
            })
        }
    }

    const translateToKannada = async () => {
        try {
            const translatedText = await translate(englishText, {
                from: "en",
                to: "kn",
            });
            setKannadaText(translatedText);
        } catch (error) {
            // console.error("Translation error:", error);
        }
    };


    const HandleEdit = (
        branch_code,
        branch_name,
        branch_name_kan,
        ifsc_code,
        bank_code
    ) => {
        setErrors({
            englishText: null,
            bankCodeSelected: null,
            ifsccode: null,
        })
        setbranchCode(branch_code);
        setEnglishText(branch_name);
        setKannadaText(branch_name_kan);
        setIfscCode(ifsc_code);
        setBankCodeSelected(bank_code);
        setSaveButton(false);
        setUpdateButton(true);
        setEdit(true);
        localStorage.setItem("Navigation_state", true);
    };

    const HandleSearch = async () => {
        try {
            const response = await BranchMasterApi.BranchMaster().fetchByBack_code(searchbankCodeSelected);
            console.log(response);
            if (response.status === 200) {
                if (response.data.items.length !== 0) {
                    setRows(response.data.items);
                } else {
                    Swal.fire('', 'No Branches for this bank', '');
                }


            } else {
                console.error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    const handleUpdate = async () => {
        console.log('Updating branch with ID:', branchCode);
        // Call the validation function to get the validation errors
        const validationErrors = validation();
        // Update the state with the validation errors
        setErrors(validationErrors);
        // Check if there are any errors in the validation results
        const hasErrors = Object.values(validationErrors).some(error => error !== null);
        if (!hasErrors) {
            try {
                // Create the data object to be sent in the PUT request
                const newRecord = {
                    branch_name: englishText != null ? englishText.trim() : null,
                    branch_name_kan: kannadaText,
                    ifsc_code: ifsccode != null ? ifsccode.trim() : null,
                    bank_code: bankCodeSelected,
                };

                // Send the POST request to the specified URL

                const response = await BranchMasterApi.BranchMaster().update(branchCode, newRecord);

                if (response.data.Status === 1) {
                    fetchData();
                    Swal.fire('Updated', 'Successfully', 'success');
                    setEnglishText("");
                    setKannadaText("");
                    setBankCodeSelected("");
                    setIfscCode("");
                    setEdit(false);
                    localStorage.setItem("Navigation_state", true);
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: response.data.Error || 'Unknown Error',
                        icon: 'error',
                    });
                }
            } catch (error) {
                Swal.fire('Error', 'Error updating data', 'error');;
            }
        }


    };


    const fetchData = async () => {
        try {
            const response = await BranchMasterApi.BranchMaster().fetchAll();
            if (response.status === 200) {
                console.log(response.data.items);
                setRows(response.data.items);
            } else {
                console.error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    console.log(rows);


    const handleDeleteConfirm = async (row) => {
        try {
            const shouldDelete = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this employee!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, keep it',
                reverseButtons: true,
            });

            if (shouldDelete.isConfirmed) {

                //const response = await BankMasterApi.bankmaster().delete(row.bank_code);
                const response = await BranchMasterApi.BranchMaster().delete(row.branch_code);

                if (response.data.Status === '1') {
                    Swal.fire(`Deleted Successfully`, '', 'success');
                    setEdit(false);
                    fetchData();
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: response.data.Error || 'Unknown Error',
                        icon: 'error',
                    });
                }
            }
        } catch (error) {
            Swal.fire('Error', 'Error Deleting Data', 'error');
        }
    };




    const handleButtonClose = () => {
        setBankCodeSelected("");
        setEnglishText("");
        setIfscCode("");
        setKannadaText("");
        setsearchbankCodeSelected("");
        fetchData();
        setSaveButton(true);
        setEdit(false);
        localStorage.setItem("Navigation_state", true);
        setUpdateButton(false);
        setErrors({
            englishText: null,
            bankCodeSelected: null,
            ifsccode: null,
        })
    }

    useEffect(() => {
        fetchData();
        fetchBankMasterData();
    }, []);

    //color adding the grid row
    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage; // Get the current row index
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
                        onClick={() =>
                            HandleEdit(
                                params.row.branch_code,
                                params.row.branch_name,
                                params.row.branch_name_kan,
                                params.row.ifsc_code,
                                params.row.bank_code
                            )
                        }
                    >
                        Edit
                    </ModeEditOutlineRoundedIcon>
                </>
            ),
        },
        { field: "branch_name", headerName: "Branch name", width: 300 },
        { field: "branch_name_kan", headerName: "Branch Name Kannada", width: 300 },
        { field: "ifsc_code", headerName: "IFSC Code", width: 130 },
        { field: "bank_code", headerName: "Bank Code", width: 200 },
        { field: "bank_name", headerName: "Bank Name", width: 220 },
    ];

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={7} lg={7}>
                    {/* ================ */}
                    <Paper elevation={3} sx={{ width: "100%", marginTop: 2 }}>
                        <Grid container spacing={2} sx={{ padding: "20px", paddingTop: "5px" }} >
                            {/* ================ */}
                            <Grid item md={12} lg={12} sm={12} xs={12} >
                                <Typography variant="h5">Branch Master</Typography>
                            </Grid>
                            {/* ================ */}
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Autocomplete
                                    id="country-select-demo"
                                    size="small"
                                    options={bankNamesArray}
                                    autoHighlight
                                    getOptionLabel={(option) => option.bankname}
                                    value={
                                        bankNamesArray.find(
                                            (option) => option.bankcode === bankCodeSelected
                                        ) || null
                                    }
                                    onChange={handleDRPBankNameSelect}
                                    renderInput={(params) => (
                                        <TextField
                                            size="small"
                                            id="outlined-basic"
                                            {...params}
                                            required
                                            label="Bank Name"
                                            sx={textFiledStyle}
                                            error={errors.bankCodeSelected}
                                            helperText={errors.bankCodeSelected}
                                        />
                                    )}
                                />
                            </Grid>
                            {/* ================ */}
                            {/* ================ */}
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <TextField size="small"
                                    id="outlined-basic"
                                    label="Branch Name *"
                                    variant="outlined"
                                    value={englishText || ''}
                                    onChange={handleInputChange}
                                    fullWidth
                                    sx={textFiledStyle}
                                    error={Boolean(errors.englishText)}
                                    helperText={errors.englishText}
                                />

                            </Grid>
                            {/* ================ */}
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <TextField
                                    size="small"
                                    id="outlined-basic"
                                    label="Branch Name kannada"
                                    variant="outlined"
                                    value={kannadaText || ''}
                                    fullWidth
                                    onChange={handlekannadaTextChange}
                                    sx={textFiledStyle}
                                />
                            </Grid>
                            {/* ================ */}
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <TextField size="small"
                                    id="outlined-basic"
                                    label="IFSC Code *"
                                    variant="outlined"
                                    value={ifsccode || ''}
                                    onChange={handleIfscCode}
                                    fullWidth
                                    sx={textFiledStyle}
                                    error={Boolean(errors.ifsccode)}
                                    helperText={errors.ifsccode} />
                            </Grid>
                            {/* ================ */}
                            {/* ================ */}
                            <Grid item xs={12} sm={12} md={5} sx={{ textAlign: "left" }}>
                                <Stack direction="row">
                                    {saveButton && (
                                        <Button
                                            variant="contained"
                                            onClick={handleSubmit}
                                            sx={{ marginRight: 2 }}
                                        >
                                            Save
                                        </Button>
                                    )}
                                    {updateButton && (
                                        <Button
                                            variant="contained"
                                            onClick={handleUpdate}
                                            sx={{ marginRight: 2 }}
                                        >
                                            Update
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        onClick={handleButtonClose}
                                        sx={{ marginRight: 2, backgroundColor: "red" }}
                                    >
                                        CLEAR
                                    </Button>
                                </Stack>

                            </Grid>
                            {/* ================ */}
                            {/* ================================ */}
                        </Grid>
                    </Paper>
                </Grid>
                {/* =============================  */}
                <Grid item xs={12} sm={12} md={5} lg={5}>
                    <Paper elevation={3} sx={{ width: "100%" }}>
                        <Grid container spacing={2} marginTop={0} sx={{ padding: "20px", paddingTop: "0", paddingBottom: "121px" }}>
                            {/* ================ */}
                            <Grid item xs={12} sm={12} md={10} lg={10}>
                                <Typography variant="h5">Search</Typography>
                            </Grid>
                            {/* ================ */}
                            <Grid item xs={9} sm={9} md={10} lg={10}>
                                <Autocomplete
                                    id="country-select-demo"
                                    size="small"
                                    options={bankNamesArray}
                                    autoHighlight
                                    getOptionLabel={(option) => option.bankname}
                                    value={
                                        bankNamesArray.find(
                                            (option) => option.bankcode === searchbankCodeSelected
                                        ) || null
                                    }
                                    sx={textFiledStyle}
                                    onChange={handleSearchDRPBankNameSelect}
                                    renderInput={(params) => (
                                        <TextField
                                            size="small"
                                            id="outlined-basic"
                                            {...params}
                                            label="Bank Name"

                                        />
                                    )}
                                />


                            </Grid>
                            {/* ================================ */}
                            <Grid item xs={3} sm={3} md={2} lg={2}>
                                <Button variant="contained" color="primary" onClick={HandleSearch}>
                                    <SearchIcon />
                                </Button>
                            </Grid>
                            {/* ================================ */}
                        </Grid>
                    </Paper>
                </Grid>
                {/* ================ */}
            </Grid>
            <div style={{ height: 400, maxWidth: "100%", overflow: "auto", marginTop: "40px" }}>
                <Paper elevation={3} sx={{ maxWidth: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        getRowId={(row) => row.branch_code.toString()}
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
                        getRowHeight={() => 35}
                        getRowClassName={getRowClassName}
                    />
                </Paper>
            </div>
        </>
    );
}
