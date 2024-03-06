import React from 'react'
import { Grid, Typography, Paper, Button, Box, TextField, Stack, Autocomplete } from '@mui/material'
//import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState, useEffect } from "react";
import { DocumentMasterLinkApi } from "../../../Api";
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';


const autoCompleteStyle = {
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
export default function DocumentsMasterLink() {
  const [rows, setRows] = useState([]);
  const [saveButton, setSaveButton] = useState(true);
  //const [updateButton, setUpdateButton] = useState(false);
  const [masterNameDD, setMasterNameDD] = useState([]);
  const [documentNameDD, setDocumentNameDD] = useState([]);
  const [masterID, setMasterID] = useState(null);
  const [errors, setErrors] = useState({});
  const [showGrid, setShowGrid] = useState(false);


  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    link_id: false,
    master_id: false,
    doc_id: false
  });

  const [formData, setFormData] = useState({
    mASTER: "",
    documentName: "",
  });
  const fetchMasterNames = async () => {
    try {
      const response = await DocumentMasterLinkApi.DocumentMasterLinkApi_Master().DD_fetch_masterName()
      if (response.status === 200) {
        setMasterNameDD(response.data.items)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchDocumentNames = async () => {
    try {
      const response = await DocumentMasterLinkApi.DocumentMasterLinkApi_Master().DD_fetch_documentName()
      if (response.status === 200) {
        setDocumentNameDD(response.data.items)
      }
    } catch (error) {
      console.log(error);
    }
  }

  //For SEARCH by MasterName:
  const handleFieldChangeSearch = async (fieldname, value) => {
    if (fieldname === "mASTERSearch") {
      if (value === "") {
        setMasterID(null)
        fetchData()
      }
      else if (value) {
        setMasterID(value)
      }
    }
  }

  const handleSearch = () => {
    if (masterID === null) Swal.fire("Select a Value to Search")
    else if (masterID !== "")
      fetchMasterDetails(masterID)
    setShowGrid(true);
  }

  const fetchMasterDetails = async (id) => {
    try {
      const response = await DocumentMasterLinkApi.DocumentMasterLinkApi_Master().fetchByMasterId(id)
      console.log(response);
      if (response.status === 200) {
        setRows(response.data.items)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getRowClassName = (params) => {
    const rowIndex = params.indexRelativeToCurrentPage;
    return rowIndex % 2 === 0 ? "row-even" : "row-odd";
  };
  const validation = () => {
    const newErrors = {}
    //====================================documentName==================================
    if (formData.mASTER === "") newErrors.mASTER = "Required"
    else if (formData.mASTER !== "") newErrors.mASTER = errors.mASTER
    //====================================rEMARKS=======================================
    if (formData.documentName === "") newErrors.documentName = "Required"
    else if (formData.documentName !== "") newErrors.documentName = errors.documentName

    return newErrors
  }
  const handleClear = () => {
    setFormData({
      mASTER: "",
      documentName: ""
    })
    setSaveButton(true)
    //setUpdateButton(false)
    setErrors({})
    setMasterID(null)
    fetchData()
    localStorage.setItem("Navigation_state", true)
  }
  const handleFieldChange = (fieldName, value) => {
    localStorage.setItem("Navigation_state", false)
    //====================================mASTER============================================
    if (fieldName === "mASTER") {
      if (value === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: 'Required'
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "",
        }));
      }
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value
      }));
    }
    //====================================documentName============================================
    if (fieldName === "documentName") {
      if (value === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: 'Required'
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "",
        }));
      }
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value
      }));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErorrs = validation()
    setErrors(validationErorrs)
    const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
    if (!hasErrors) {
      const newRecord = {
        "master_id": formData.mASTER,
        "doc_id": formData.documentName,
      }
      try {
        console.log(newRecord);
        const response = await DocumentMasterLinkApi.DocumentMasterLinkApi_Master().create(newRecord)
        if (response.data.Status === 1) {
          Swal.fire({
            title: 'Saved',
            text: 'Saved Sucessfully',
            icon: 'success',
            customClass: {
              container: 'custom-swal-container'
            }
          });
          fetchData()
          localStorage.setItem("Navigation_state", true)
          handleClear()
        } else {
          Swal.fire({
            title: 'Error',
            text: `${response.data.Error}` || 'Unknown Error',
            icon: 'error',
            customClass: {
              container: 'custom-swal-container'
            }
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Unknown Error',
          icon: 'error',
          customClass: {
            container: 'custom-swal-container'
          }
        });
      }
    }
  }

  const handleDeleteButtonClick = async (params) => {
    await handleDeleteConfirm(params);
  };

  const handleDeleteConfirm = async (row) => {
    try {
      const shouldDelete = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this data!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
        reverseButtons: true,
      });

      if (shouldDelete.isConfirmed) {
        console.log("Hi");
        console.log(row);
        const response = await DocumentMasterLinkApi.DocumentMasterLinkApi_Master().delete(row.link_id);
        console.log(response);
        if (response.data.Status === 1) {
          Swal.fire(`Deleted Successfully`, '', 'success');
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

  const fetchData = async () => {
    try {
      const response = await DocumentMasterLinkApi.DocumentMasterLinkApi_Master().fetchAll()
      console.log(response);
      if (response.status === 200) {
        setRows(response.data.items)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMasterNames()
    fetchDocumentNames()
    fetchData()
    document.title = "Document-Masters  UI Link"
  }, []);

  const columns = [
    {
      field: "action",
      headerName: "Action",
      width: 69,
      renderCell: (params) => (
        <>
          <DeleteForeverIcon
            sx={{ color: "red" }}
            style={{
              cursor: "pointer",
              opacity: 1,
              transition: "opacity 0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.opacity = 0.7;
              e.currentTarget.style.color = "rgba(255, 0, 0, 0.7)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.opacity = 1;
              e.currentTarget.style.color = "red";
            }}
            onClick={() => handleDeleteButtonClick(params.row)}
          >
            Delete
          </DeleteForeverIcon>
        </>
      ),
    },
    {
      field: 'link_id',
      headerName: 'Link ID',
      width: 80,
    },
    {
      field: 'master_id',
      headerName: 'Master ID',
      width: 150,
    },
    {
      field: 'master',
      headerName: 'Master',
      width: 150,
    },
    {
      field: 'doc_id',
      headerName: 'Document ID',
      width: 150,
    },
    {
      field: 'doc_name',
      headerName: 'Document Name',
      width: 200,
    },
  ];
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={12} lg={12} sm={12} xs={12}>
          <Paper sx={{ padding: 2,height:300 }} elevation={3}>
            <Grid container spacing={2}>
              {/* =========================Master======================== */}
              <Grid item md={12} lg={12} sm={12} xs={12}>
                <Typography variant='h5'>Document-Masters UI Link</Typography>
              </Grid>
              {/* =========================SEARCH BY MASTERNAME======================== */}
              <Grid item md={4} lg={4} sm={12} xs={12}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  fullWidth
                  options={masterNameDD}
                  sx={autoCompleteStyle}
                  getOptionLabel={(options) => options.master}
                  isOptionEqualToValue={(option, value) => option.master_id === value.master_id}
                  value={masterNameDD.find(option => option.master_id === masterID) || null}
                  onChange={(e, v) => handleFieldChangeSearch("mASTERSearch", v?.master_id || "")}
                  renderInput={(params) =>
                    <TextField
                      {...params}
                      label="Name"
                    />}
                />
              </Grid>
              {/* =========================Name======================== */}
              <Grid item md={4} lg={4} sm={12} xs={12}>
                <Button variant="contained"
                  color="primary"
                  size='small' onClick={handleSearch}>
                  <SearchTwoToneIcon></SearchTwoToneIcon>
                </Button>
              </Grid>
              {/* =========================mASTER======================== */}
              <Grid item md={4} lg={4} sm={12} xs={12}>
              </Grid>
              {/* =========================mASTER======================== */}
              <Grid item md={4} lg={4} sm={12} xs={12}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  fullWidth
                  options={masterNameDD}
                  sx={autoCompleteStyle}
                  getOptionLabel={(options) => options.master}
                  isOptionEqualToValue={(option, value) => option.master_id === value.master_id}
                  value={masterNameDD.find(option => option.master_id === formData.mASTER) || null}
                  onChange={(e, v) => handleFieldChange("mASTER", v?.master_id || "")}
                  renderInput={(params) =>
                    <TextField
                      {...params}
                      label="Masters"
                      required
                      error={Boolean(errors.mASTER)}
                      helperText={errors.mASTER}
                    />}
                />
              </Grid>
              {/* =========================Document Name======================== */}
              <Grid item md={4} lg={4} sm={12} xs={12}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  fullWidth
                  options={documentNameDD}
                  sx={autoCompleteStyle}
                  getOptionLabel={(options) => options.doc_name}
                  isOptionEqualToValue={(option, value) => option.doc_id === value.doc_id}
                  value={documentNameDD.find(option => option.doc_id === formData.documentName) || null}
                  onChange={(e, v) => handleFieldChange("documentName", v?.doc_id || "")}
                  renderInput={(params) =>
                    <TextField
                      {...params}
                      label="Document Name"
                      required
                      error={Boolean(errors.documentName)}
                      helperText={errors.documentName}
                    />}
                />
              </Grid>

              {/* ========================Button======================== */}
              <Grid item md={12} lg={12} sm={12} xs={12}>
                <Stack direction="row" spacing={1}>
                  {saveButton && (<Button
                    variant="contained"
                    onClick={handleSubmit}
                    type='submit'
                    size='small'>
                    Save
                  </Button>)}
                  {/* {updateButton && (<Button
                    variant="contained"
                    onClick={handleUpdate}
                    type='submit'
                    size='small'>
                    Update
                  </Button>)} */}
                  <Button
                    variant="contained"
                    onClick={handleClear}
                    color="error"
                    size='small'>
                    Clear
                  </Button>
                </Stack>
              </Grid>
              {/* =========================Grid======================== */}
            </Grid>
          </Paper>
          {showGrid && // Conditionally render the grid based on showGrid state
            <Grid xs={12} sm={12} md={12} lg={12} mt={1}>
              <Paper sx={{ padding: 2 }} elevation={3}>
                <Box sx={{ height: 300, width: '100%', marginTop: '20px' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row.link_id.toString()}
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
              </Paper>
            </Grid>
          }
        </Grid>
      </Grid>
    </>
  )
}