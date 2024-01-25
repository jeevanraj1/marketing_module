import * as React from "react";
import { useState, useEffect } from "react";
import translate from "translate";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Box, TextField, Button, Grid, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BankMasterApi } from "../../../Api";
import Swal from 'sweetalert2';
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";

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
export default function BankMasterDT() {
    const [englishText, setEnglishText] = useState("");
    const [kannadaText, setKannadaText] = useState("");
    const [saveButton, setSavebutton] = useState(true);
    const [Updatebutton, setUpdateButton] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [columnVisibilityModel, setColumnVisibilityModel] = useState({ bank_code: false });
    const [bankcode, setBankcode] = useState("");

    const [errors, setErrors] = React.useState({
        englishText: null,
    });
    const fetchData = async () => {
        try {
            const response = await BankMasterApi.bankmaster().fetchAll();
            console.log(response);
            if (response.status === 200) {
                setRows(response.data.items);
            } else {
                alert(response.data.Error);
            }
        } catch (error) {
            Swal.fire('Error', 'Error Fetching data', 'error');
        }
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
                            HandleEdit(params.row)
                        }
                    >
                        Edit
                    </ModeEditOutlineRoundedIcon>

                </>
            ),
        },
        { field: "bank_name", headerName: "Bank name", width: 300 },
        { field: "bank_alias", headerName: "Bank Alias", width: 200 },
        { field: "bank_code", headerName: "Bank Code", width: 200 }
    ];
    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };
    const HandleEdit = (row) => {
        setEnglishText(row.bank_name)
        setKannadaText(row.bank_alias)
        setBankcode(row.bank_code)
        setSavebutton(false)
        setUpdateButton(true)
    }


    useEffect(() => {
        fetchData()
    }, []);

    if (bankcode === null) {
        if (englishText === "") {
            localStorage.setItem("Navigation_state", true);
        } else {
            localStorage.setItem("Navigation_state", false);
        }
    }
    const handleClear = () => {
        setEnglishText('')
        setUpdateButton(false)
        setSavebutton(true)
        setKannadaText('')
        setErrors({})
    }

    const handleInputChange = (event) => {

        localStorage.setItem("Navigation_state", false);
        const newEnglishText = event.target.value.toUpperCase();


        if (newEnglishText.length <= 3) {
            setErrors({
                englishText: "Minimum 4 Characters Required"
            })
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                englishText: null,
            }));
        }

        setEnglishText(newEnglishText);
        setKannadaText("");

        if (newEnglishText !== "") {
            translateToKannada();
        }
    };

    const handlekannadaTextChange = (event) => {
        localStorage.setItem("Navigation_state", false);
        setKannadaText(event.target.value.toUpperCase());
    }

    const translateToKannada = async () => {
        try {
            const translatedText = await translate(englishText, {
                from: "en",
                to: "kn",
            });
            setKannadaText(translatedText);
        } catch (error) {
            console.error("Translation error:", error);
        }
    };

    const validation = () => {
        const newErrors = {};

        if (englishText === "") {
            newErrors.englishText = "* Bank Name Required";
        } else if (englishText.length <= 3) {
            newErrors.englishText = "Minimum 4 Characters Required"
        }
        return newErrors;
    }

    const handleSubmit = async () => {
        // Call the validation function to get the validation errors
        const validationErrors = validation();
        // Update the state with the validation errors
        setErrors(validationErrors);
        // Check if there are any errors in the validation results
        const hasErrors = Object.values(validationErrors).some(error => error !== null);
        if (!hasErrors) {
            try {

                const newRecord = {
                    bank_name: englishText != null ? englishText.trim() : null,
                    bank_alias: kannadaText,
                    bank_group: "0",
                };


                const response = await BankMasterApi.bankmaster().create(newRecord);

                if (response.data.Status === 1) {
                    setEnglishText("");
                    setKannadaText("");
                    localStorage.setItem("Navigation_state", true);
                    Swal.fire('Saved', 'Successfully', 'success');
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: response.data.Error || 'Unknown Error',
                        icon: 'error',
                    });
                    // Error: Something went wrong
                    //console.error("Failed to post data");
                }
            } catch (error) {
                // console.error("Error posting data:", error);
                Swal.fire('Error', 'Error posting data', 'error');
            }
        }
    };

    const handleUpdate = async () => {
        const validationErrors = validation();
        setErrors(validationErrors);
        const hasErrors = Object.values(validationErrors).some(error => error !== null);
        if (!hasErrors) {
            try {
                const updateRecord = {
                    bank_name: englishText != null ? englishText.trim() : null,
                    bank_alias: kannadaText,
                    bank_group: "0",
                };

                const response = await BankMasterApi.bankmaster().update(
                    Number(bankcode),
                    updateRecord
                );
                    console.log(response);
                if (response.data.Status === 1) {
                    setEnglishText("");
                    setKannadaText("");
                    localStorage.setItem("Navigation_state", true);
                    Swal.fire('Updated', 'Successfully', 'success');
                    fetchData()
                    handleClear()
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: response.data.Error || 'Unknown Error',
                        icon: 'error',
                    });
                }
            } catch (error) {
                Swal.fire('Error', 'Error updating data', 'error');
            }
        }
    };

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item md={7} lg={7} sm={12} xs={12}>
                    <Paper elevation={3} sx={{ width: "100%" }}>
                        <Grid container spacing={2} marginTop={3}
                            sx={{ padding: "20px", paddingTop: "0" }}
                        >
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography variant="h5">Bank Master</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    size="small"
                                    id="outlined-basic"
                                    label="Bank Name *"
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
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    size="small"
                                    id="outlined-basic"
                                    label="ಬ್ಯಾಂಕ್ ಹೆಸರು"
                                    variant="outlined"
                                    value={kannadaText || ''}
                                    onChange={handlekannadaTextChange}
                                    fullWidth
                                    sx={textFiledStyle}
                                />
                            </Grid>
                            {/* ================ */}
                            <Grid item xs={12} sm={3} md={12} sx={{ textAlign: "left" }}>
                                <Stack direction="row" spacing={2}>
                                    {saveButton && (
                                        <Button
                                            variant="contained"
                                            onClick={handleSubmit}
                                            type='submit'
                                            size='small'>
                                            Save
                                        </Button>
                                    )}
                                    {Updatebutton && (
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
                            {/* ================ */}
                            {/* ================================ */}
                        </Grid>
                    </Paper>
                    <Paper elevation={3} sx={{ width: "100%", marginTop: 3, }}>
                        {/* ================ */}
                        <Grid item md={12} lg={12} sm={12} xs={12}>
                            <Box sx={{ height: 300, width: '100%' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    getRowId={(row) => row.bank_code.toString()}
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
            {/* grid End */}
        </div>
    );
}