import React from 'react'
import { Grid, Typography, Paper, Button, Box, TextField, Stack } from '@mui/material'
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { useState, useEffect } from "react";
import { DocumentMasterApi } from "../../../Api";
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid'

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

export default function DocumentMaster() {
  const [rows, setRows] = useState([]);
  const [saveButton, setSaveButton] = useState(true);
  const [updateButton, setUpdateButton] = useState(false);
  const [docID, setDocID] = useState(null);
  const [errors, setErrors] = useState({});
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    doc_id: false
  });
  const [formData, setFormData] = useState({
    documentName: "",
    rEMARKS: "",
  });



  const getRowClassName = (params) => {
    const rowIndex = params.indexRelativeToCurrentPage;
    return rowIndex % 2 === 0 ? "row-even" : "row-odd";
  };
  const validation = () => {
    const newErrors = {}
    //====================================documentName==================================
    if (formData.documentName === "") newErrors.documentName = "Required"
    else if (formData.documentName !== "") newErrors.documentName = errors.documentName
    //====================================rEMARKS============================================
    if (formData.rEMARKS === "") newErrors.rEMARKS = ''
    else if (formData.rEMARKS !== "") newErrors.rEMARKS = errors.rEMARKS

    return newErrors
  }
  const handleClear = () => {
    setFormData({
      documentName: "",
      rEMARKS: ""
    })
    setSaveButton(true)
    setUpdateButton(false)
    setErrors({})
    localStorage.setItem("Navigation_state",true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErorrs = validation()
    setErrors(validationErorrs)
    const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
    if (!hasErrors) {
      const newRecord = {
        "doc_name": formData.documentName,
        "remarks": formData.rEMARKS !== "" ? formData.rEMARKS : null,
      }
      try {
        console.log(newRecord);
        const response = await DocumentMasterApi.DocumentMasterApi_Master().create(newRecord)
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
  const handleEdit = (row) => {
    console.log(row);
    setUpdateButton(true)
    setSaveButton(false)
    setFormData((prevdata) => ({
      ...prevdata,
      documentName: row.doc_name,
      rEMARKS: row.remarks,
    }))
    setDocID(row.doc_id)
    setErrors({})
    localStorage.setItem("Navigation_state", true);
  }
  const handleUpdate = async (e) => {
    e.preventDefault()
    const validationErorrs = validation()
    setErrors(validationErorrs)
    const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
    if (!hasErrors) {
      const newRecord = {
        "doc_name": formData.documentName,
        "remarks": formData.rEMARKS !== "" ? formData.rEMARKS : '',
      }
      try {
        console.log(newRecord);
        const response = await DocumentMasterApi.DocumentMasterApi_Master().update(docID, newRecord)
        if (response.data.Status === 1) {
          Swal.fire({
            title: 'Saved',
            text: 'Updated Sucessfully',
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

  const handleFieldChange = (fieldName, value) => {
    localStorage.setItem("Navigation_state", false)
    //====================================documentName============================================   
    if (fieldName === "documentName") {

      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          documentName: "Required",
        }));
      }
      else if (value.trim().length > 30) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          documentName: "Value must be Not More than 30 Characters",
        }));
        value = value.substring(0, 30)
        setTimeout(() => {
          setErrors((prevErrors) => ({
            ...prevErrors,
            documentName: "",
          }))
        }, 1000)
      }
      else if (value.trim().length < 4) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          documentName: "Value Must be Greater Than 3 Charaters",
        }))
      }
      else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          documentName: "",
        }));
      }
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
    //====================================rEMARKS============================================
    if (fieldName === "rEMARKS") {

      if (value.trim().length > 100) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          rEMARKS: "Value must be Not More than 100 Characters",
        }));
        value = value.substring(0, 100)
        setTimeout(() => {
          setErrors((prevErrors) => ({
            ...prevErrors,
            rEMARKS: "",
          }))
        }, 1000)
      }
      else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          rEMARKS: "",
        }));
      }
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value
      }))
    }
  }

  const fetchData = async () => {
    try {
      const response = await DocumentMasterApi.DocumentMasterApi_Master().fetchAll()
      if (response.status === 200) {
        setRows(response.data.items)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    fetchData()
    document.title = "Document Master"
  }, [])

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
      field: 'doc_id',
      headerName: 'Document ID',
      width: 100,
    },
    {
      field: 'doc_name',
      headerName: 'Document Name',
      width: 170,
    },
    {
      field: 'remarks',
      headerName: 'Remarks',
      width: 400,
    },
  ];
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={12} lg={12} sm={12} xs={12}>
          <Paper sx={{ padding: 2 }} elevation={3}>
            <Grid container spacing={2}>
              {/* =========================Master======================== */}
              <Grid item md={12} lg={12} sm={12} xs={12}>
                <Typography variant='h5'>Document Master </Typography>
              </Grid>
              {/* =========================Document Name======================== */}
              <Grid item md={4} lg={4} sm={12} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Document Name"
                  variant="outlined"
                  size='small'
                  required
                  sx={textFiledStyle}
                  fullWidth
                  value={formData.documentName}
                  onChange={(e) => handleFieldChange("documentName", e.target.value.toUpperCase())}
                  error={Boolean(errors.documentName)}
                  helperText={errors.documentName}

                />
              </Grid>
              {/* =========================Remarks======================== */}
              <Grid item md={8} lg={8} sm={12} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Remarks"
                  variant="outlined"
                  size='small'
                  sx={textFiledStyle}
                  fullWidth
                  value={formData.rEMARKS}
                  onChange={(e) => handleFieldChange("rEMARKS", e.target.value.toUpperCase())}
                  error={Boolean(errors.rEMARKS)}
                  helperText={errors.rEMARKS}
                />
              </Grid>
              {/* =========================Name======================== */}
              <Grid item md={12} lg={12} sm={12} xs={12}>
                <Stack direction="row" spacing={1}>
                  {saveButton && (<Button
                    variant="contained"
                    onClick={handleSubmit}
                    type='submit'
                    size='small'>
                    Save
                  </Button>)}
                  {updateButton && (<Button
                    variant="contained"
                    onClick={handleUpdate}
                    type='submit'
                    size='small'>
                    Update
                  </Button>)}
                  <Button
                    variant="contained"
                    onClick={handleClear}
                    color="error"
                    size='small'>
                    Clear
                  </Button>
                </Stack>
              </Grid>
              {/* =========================Name======================== */}
            </Grid>
          </Paper>
          <Grid xs={12} sm={12} md={12} lg={12} mt={1}>
            <Paper sx={{ padding: 2 }} elevation={3}>
              <Box sx={{ height: 300, width: '100%', marginTop: '20px' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  getRowId={(row) => row.doc_id.toString()}
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
        </Grid >
      </Grid >
    </>
  )
}