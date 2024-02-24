import React from 'react'
import { Grid, Typography, Paper, Button, Box, TextField, Stack, Autocomplete } from '@mui/material'
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState,useRef,useEffect } from "react";
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled,useTheme} from '@mui/material/styles';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import * as XLSX from "xlsx";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const textFiledStyle = {
    width: "100%",
    "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "black", borderWidth: "2px" },
    },
    "& .MuiInputLabel-root": {
        color: "black",
        "&.Mui-focused": {
            transform: "translate(16px, -10px)",
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

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

export default function PacketsImages() {
    const theme = useTheme();
    const [rows, setRows] = useState([]);
    const [file, setFile] = useState("");
    const [image, setImage] = useState(null);
    const [failed_DataTable, setfailed_DataTable] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [saveButton, setSaveButton] = useState(true);
    const [updateButton, setUpdateButton] = useState(false);
    const [failed_toUpload, setFailed_toUpload] = useState([]);
    const [loading, setLoading] = useState(false);
    const [browserClicked, setBrowserclicked] = useState(false);
    const fileInputRef = useRef(null);
    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        taluka_code: false
    });
 
    
    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };

    const validation = ()=>{
    }

    const upload = async () => {
    }

    const expectedHeader = [
        "TDATE",
        "TSESSION",
        "R_CODE",
        "SOC_NAME",
      ];

      const varify = async (jsonData) => {
        var filedError = false;
      }

    const arraysEqual = (arr1, arr2) => {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
      };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        setBrowserclicked(true)
        if (file) {
            const fileName = file.name;
            setFile(fileName); // Update the file state with the selected file name
            setSelectedFileName(fileName); // Update the selected file name state
            const fileExtension = fileName.slice(
                ((fileName.lastIndexOf(".") - 1) >>> 0) + 2
            );
    
            if (["xls", "xlsx", "xml", "csv"].includes(fileExtension)) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const data = new Uint8Array(event.target.result);
                    const workbook = XLSX.read(data, { type: "array" });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(sheet, {
                        defval: null,
                        raw: false,
                    });
                    console.log("Parsed JSON data:", jsonData); 

                    const actualHeader = Object.keys(jsonData[0] || {});
    
                    if (!arraysEqual(actualHeader, expectedHeader)) {
                        Swal.fire(
                            "Invalid file headers",
                            "The header does not match the expected format.",
                            "error"
                        );
                        setSelectedFileName("");
                        setFile(""); // Clear the file state if the file is invalid
                        return;
                    }
                    varify(jsonData);
                };
                reader.readAsArrayBuffer(file);
            }
        }
        else{
            setSelectedFileName("");    
        }
    };
    
    const handleClear = () => { 
        setFailed_toUpload([]);
        setfailed_DataTable(false);
        setSelectedFileName("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
          fileInputRef.current.disabled = false;
          localStorage.setItem("Navigation_state", true);
        }
        setFile("")
        setImage("")
    }

    const handleUpdate = async (e) => { }
    const handleSubmit = async (e) => { }

    const images = [
        { label: 'Large'},
        { label: 'Small'},
    ];
    const handleEdit = (row) => { }
    const handleDeleteButtonClick = (row) => { }
    useEffect(() => {
        document.title = "ImagesDT"
    }, [])
    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={8} lg={8} sm={12} xs={12}>
                    <Paper sx={{ padding: 2 }} elevation={3}>
                        <Grid container spacing={2}>
                            {/* =========================Taluk  Master======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Typography variant='h5'>
                                 Images
                                </Typography>
                            </Grid>
                            {/* =========================Image Type======================== */}
                            <Grid item md={3} lg={3} sm={12} xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size='small'
                                    value={image}
                                    fullWidth
                                    options={images}
                                    sx={autoCompleteStyle}
                                    onChange={(event, newValue) => {
                                        setImage(newValue); // Update the state variable when an option is selected
                                    }}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Image Type"
                                            required
                                        />}
                                />
                            </Grid>

                            <Grid item md={1.5} lg={1.5} sm={12} xs={12}>
                            <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            size='small'
                            startIcon={<TravelExploreIcon />}
                            fullWidth
                            onClick={() => setBrowserclicked(true)}
                            >
                            Browse
                           <VisuallyHiddenInput type="file"
                            id="fileInput"
                            onChange={handleFileChange}
                            accept=".xls, .xlsx, .csv,.xml "
                            ref={fileInputRef}
                           />
                           </Button>
                           </Grid>

                              {/* =========================file Name======================== */}

                        {selectedFileName && browserClicked && (
                       <Grid item xs={12} sm={12} md={2.5} lg={2.5}>                        {selectedFileName && (
                        <div style={{ marginTop: -15 ,color:"red"}}>
                         <p>Selected File: {selectedFileName}</p>
                        </div>
                        )}
                        </Grid>
                        )}
                            {/* =========================Upload file======================== */}
                          
                           <Grid item md={1.5} lg={1.5} sm={12} xs={12}>
                           <Button variant="contained"
                                        color="error"
                                        size='small'
                                        fullWidth
                                        onClick={upload}
                                        disabled={loading || failed_DataTable || browserClicked === false}
                                        >
                                     {<CloudUploadIcon  sx={{marginRight:"8px",marginTop:"-4px"}}/>}
                                        Upload
                                    </Button>
                            </Grid>
                            {/* =========================Clear button======================== */}

                            <Grid item md={1.5} lg={1.5} sm={12} xs={12} sx={{ width: "1000px" }}>
                           <Button variant="contained"
                                        color="secondary"
                                        size='small'
                                        fullWidth
                                        onClick={handleClear} 
                                        >
                                        Clear
                                    </Button>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
              {loading && (
                <>
                  <div style={{ width: "900px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 18,
                        marginLeft: 20,
                      }}
                    >
                      <CircularProgress size={60} />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginLeft: 10,
                      }}
                    >
                      <h3 style={{ marginLeft: 78 }}>
                        Uploading Please Wait!!!
                      </h3>
                    </Box>
                  </div>
                </>
              )}
            </Grid>

            {failed_DataTable && !loading && (
              <>
                <Grid item xs={12} sm={12} md={12} lg={12} mb={-1}>
                  <h4 style={{ marginLeft: 300, color: "red" }}>
                    {" "}
                    Please rectify issues with the following data in excel and
                    re-upload
                  </h4>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Paper elevation={3}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow >
                            {/* Extracting headers from the first object in the array */}
                            {Object.keys(failed_toUpload[0]).map(
                              (header, index) => (
                                <TableCell
                                  key={index}
                                  size="small"
                                  sx={{
                                    background: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                  }}
                                >
                                  {header}
                                </TableCell>
                              )
                            )}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/* Mapping through each object in the array to display the values */}
                          {failed_toUpload.map((row, rowIndex) => (
                            <TableRow
                              key={rowIndex}
                              sx={{
                                "&:nth-of-type(odd)": {
                                  backgroundColor: theme.palette.action.hover,
                                },
                              }}
                              hover
                            >
                              {Object.values(row).map((cell, cellIndex) => (
                                <TableCell key={cellIndex} size="small">
                                  {cell === null || cell === "" ? "Null" : cell}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              </>
            )}    
                </Grid>
            </Grid>
        </>
    )
}