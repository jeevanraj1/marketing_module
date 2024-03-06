import React from 'react'
import { Grid, Typography, Paper, Button, Box, TextField, Stack, Autocomplete } from '@mui/material'
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { useState, useEffect } from "react";
import { billCategoryApi } from "../../../Api";
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



const autoCreditOptions = [
  { Name: "Yes", value: "Y" },
  { Name: "No", value: "N" }
]
export default function BillCategoryDT() {
  const [saveButton, setSaveButton] = useState(true);
  const [updateButton, setUpdateButton] = useState(false);
  const [rows, setrows] = useState([]);
  const [autoCredit, setAutoCredit] = useState("N");
  const [errors, setErrors] = useState({});
  const [BillCategoryId, setBillCategoryId] = useState(null);


  const [FormData, setFormData] = useState({
    billCategoryName: "",
  });


  const handleFieldChange = (fieldName, value) => {
    localStorage.setItem("Navigation_state", false)
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));

    if (fieldName === "billCategoryName") {
      if (value.trim().length <= 3) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          billCategoryName: 'Value must be greater than 3 characters',
        }));
      }
      else if (value.trim().length > 50) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          billCategoryName: 'Value must be less than or equal to 50 characters',
        }));
        value = value.substring(0, 50);
      }
      else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          billCategoryName: '',
        }));
      }
      setFormData((prevdata) => ({
        ...prevdata,
        [fieldName]: value,
      }));
    }

    if (fieldName === "autoCredit") {
      if (value === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          autoCredit: 'Default value is No can be changed',
        }));
      }
      else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          autoCredit: '',
        }));
      }
      setAutoCredit(value)
    }
  };

  const validation = () => {
    const { billCategoryName } = FormData
    const newErrors = {}
    if (!billCategoryName || billCategoryName.trim() === "") {
      newErrors.billCategoryName = "Required"
    }
    else if (billCategoryName.trim().length <= 3) {
      newErrors.billCategoryName = "Value must be greater than 3 characters"
    }
    else if (billCategoryName.trim().length > 50) {
      newErrors.billCategoryName = "Value must be less than or equal to 50 characters"
    }
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErorrs = validation()
    setErrors(validationErorrs)
    const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null)
    try {
      if (!hasErrors) {
        const newRecord = {
          bill_catag_name: FormData.billCategoryName.trim(),
          auto_credit: autoCredit.trim()
        }
        const respone = await billCategoryApi.BillCategory_Master().create(newRecord)
        if (respone.data.Status === 1) {
          Swal.fire("sucess", "Saved Sucessfully", "success")
          handelClear()
          fetchData()
          localStorage.setItem("Navigation_state", true)
        } else {
          Swal.fire('Error' `${respone.data.Error}`, 'error')
        }
      }
    } catch (error) {
      Swal.fire('Error' `error while posting`, 'error')
    }
  }

  const handleEdit = (row) => {
    setUpdateButton(true)
    setSaveButton(false)
    setBillCategoryId(row.bill_catag)
    if (row.auto_credit === "YES") {
      setAutoCredit("Y")
    }
    else if (row.auto_credit === "NO") {
      setAutoCredit("N")
    }
    setFormData({ billCategoryName: row.bill_catag_name })
    localStorage.setItem("Navigation_state", true)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const validationErorrs = validation()
    setErrors(validationErorrs)
    const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null)
    if (!hasErrors) {
      try {
        const newRecord = {
          bill_catag_name: FormData.billCategoryName.trim(),
          auto_credit: autoCredit.trim()
        }
        console.log(newRecord);
        const respone = await billCategoryApi.BillCategory_Master().update(BillCategoryId, newRecord)
        if (respone.data.Status === 1) {
          Swal.fire("sucess", "Updated Sucessfully", "success")
          handelClear()
          fetchData()
          localStorage.setItem("Navigation_state", true)
        } else {
          Swal.fire('Error' `${respone.data.Error}`, 'error')
        }
      } catch (error) {
        Swal.fire('Error' `error while posting`, 'error')
      }
    }
  }
  const handelClear = () => {
    setSaveButton(true)
    setUpdateButton(false)
    setFormData({ billCategoryName: "" })
    setErrors({ billCategoryName: "", autoCredit: "" })
    setAutoCredit("N")
    localStorage.setItem("Navigation_state", true)
  }
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    bill_catag: false
  });
  const getRowClassName = (params) => {
    const rowIndex = params.indexRelativeToCurrentPage;
    return rowIndex % 2 === 0 ? "row-even" : "row-odd";
  };

  const fetchData = async () => {
    try {
      const response = await billCategoryApi.BillCategory_Master().fetchAll()
      if (response.status === 200) {
        setrows(response.data.items);
      }
    } catch (error) {
      Swal.fire('error', 'Error while fetching data', 'error')
    }
  }
  rows.forEach(item => {
    if (item.auto_credit === "Y") {
      item.auto_credit = "YES"
    } else if (item.auto_credit === "N") {
      item.auto_credit = "NO"
    }
  })
  useEffect(() => {
    fetchData()
    document.title = "Bill Category Master"
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
      field: 'bill_catag',
      headerName: 'Bill Category',
      width: 150,
    },
    {
      field: 'bill_catag_name',
      headerName: 'Bill Category Name',
      width: 150,
    },
    {
      field: 'auto_credit',
      headerName: 'Auto Credit',
      width: 110,
    },
  ];
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={9} lg={9} sm={12} xs={12}>
          <Paper elevation={3} sx={{ marginTop: 1 }}>
            <Grid container spacing={2} sx={{ padding: "20px", paddingTop: "5px" }} >
              {/* ====================  */}
              <Grid item xs={12} sm={12} md={12} >
                <Typography variant="h5">
                  Bill Category Master
                </Typography>
              </Grid>
              {/* ====================  */}
              <Grid item md={6} lg={6} sm={12} xs={12}>
                <TextField
                  size="small"
                  id="outlined-basic"
                  label="Bill Category Name"
                  variant="outlined"
                  name='stateName'
                  fullWidth
                  required
                  sx={textFiledStyle}
                  value={FormData.billCategoryName}
                  onChange={(e) => handleFieldChange("billCategoryName", e.target.value.toUpperCase())}
                  error={Boolean(errors.billCategoryName)}
                  helperText={errors.billCategoryName}
                />
              </Grid>
              {/* ====================  */}
              <Grid item md={6} lg={6} sm={12} xs={12}>
                <Autocomplete
                  size="small"
                  options={autoCreditOptions}
                  getOptionLabel={(options) => options.Name}
                  autoHighlight
                  value={autoCreditOptions.find((option) => option.value === autoCredit) || null}
                  onChange={(event, value) => handleFieldChange("autoCredit", (value?.value || ''))}
                  sx={autoCompleteStyle}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      id="outlined-basic"
                      label="Auto Credit"
                      name=''
                      error={Boolean(errors.autoCredit)}
                      helperText={errors.autoCredit}
                    />
                  )}
                />

              </Grid>
              {/* ================ */}
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ textAlign: "left" }}>
                <Stack spacing={{ xs: 1, sm: 1, md: 1 }} direction={{ xs: 'column', sm: 'row' }}>
                  {saveButton && (
                    <Button
                      variant="contained"
                      type='submit'
                      size='small'
                      onClick={(e) => handleSubmit(e)}
                    >
                      Save
                    </Button>
                  )}
                  {updateButton && (
                    <Button
                      variant="contained"
                      type='submit'
                      size='small'
                      onClick={(e) => handleUpdate(e)}
                    >
                      Update
                    </Button>
                  )}
                  <Button variant="contained"
                    color="error"
                    size='small'
                    onClick={() => handelClear()}
                  >
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
            <Grid xs={12} sm={12} md={12} lg={12}>
              <Box sx={{ height: 300, width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  getRowId={(row) => row.bill_catag.toString()}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5, 10, 20]}
                  disableRowSelectionOnClick
                  columnVisibilityModel={columnVisibilityModel}
                  onColumnVisibilityModelChange={(newModel) =>
                    setColumnVisibilityModel(newModel)
                  }
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
