import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Box, Stack, TextField, Button, Grid, Typography } from "@mui/material";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import Swal from 'sweetalert2';
import { RateCategoryApi } from '../../../Api';

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



export default function RateCategoryDT() {

  const [rows, setRows] = useState([]);
  const [catagcode, setCatagcode] = useState([]);
  const [saveButton, setSaveButton] = useState(true);
  const [updateButton, setUpdateButton] = useState();
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({ catag_code: false });

  const [formData, setFormData] = React.useState({
    catagName: "",
  });
  const [errors, setErrors] = React.useState({})

  const handleEdit = (row) => {
    setFormData((prevdata) => ({
      ...prevdata,
      catagName: row.catag_name

    }))
    setCatagcode(row.catag_code)
    setUpdateButton(true)
    setSaveButton(false)
    localStorage.setItem("Navigation_state",true)
  }

  const handleFieldChange = (fieldName, value) => {
    localStorage.setItem("Navigation_state",false)
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
    if (fieldName === "catagName") {
      if (value.trim().length > 5) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          catagName: 'Must be less than 5 Characters'
        }))
        value = value.substring(0, 5)
      }
      else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          catagName: ''
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
    if (formData.catagName === "") {
      newErrors.catagName = "Required "

    } else if (formData.catagName.length > 5) {
      newErrors.catagName = errors.catagName
    }
    return newErrors
  }

  const handleClear = () => {
    setFormData((prevdata) => ({
      ...prevdata,
      catagName: "",
    }))
    setSaveButton(true)
    setUpdateButton(false)
    setErrors((prevdata) => ({
      ...prevdata,
      catagName: ""
    }))
    localStorage.setItem("Navigation_state",true)
  }

  const fetchData = async () => {
    try {
      const response = await RateCategoryApi.RateCategory().fetchAll();
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
    document.title = 'Rate Category'
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
          catag_name: formData.catagName
        };
        const response = await RateCategoryApi.RateCategory().create(newRecord);
        if (response.data.Status === 1) {
          Swal.fire('Saved', 'Successfully', 'success');
          handleClear();
          fetchData();
          localStorage.setItem("Navigation_state",true)
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
          catag_name: formData.catagName
        };
        const response = await RateCategoryApi.RateCategory().update(catagcode, newRecord)
        if (response.data.Status === 1) {
          Swal.fire('Saved', 'Updated Sucessfully', 'success');
          handleClear();
          fetchData();
          localStorage.setItem("Navigation_state",true)
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
      field: 'catag_code',
      headerName: 'Catag Code',
      width: 120,

    },
    {
      field: 'catag_name',
      headerName: 'Catagory Name',
      width: 160,

    },
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={7} lg={7} sm={12} xs={12}>
          <Paper elevation={3} sx={{ width: "100%", marginTop: 1 }}>
            <Grid container spacing={2} sx={{ padding: "20px", paddingTop: "5px" }} >
              {/* ====================  */}
              <Grid item  md={12} lg={12} sm={12} xs={12} >
                <Typography variant="h5">Rate Category Master</Typography>
              </Grid>
              {/* ====================  */}
              <Grid item  md={6} lg={6} sm={12} xs={12}>
                <TextField
                  size="small"
                  id="outlined-basic"
                  label="Rate Category Name"
                  variant="outlined"
                  name='catagName'
                  fullWidth
                  required
                  sx={textFiledStyle}
                  value={formData.catagName}
                  onChange={(e) => handleFieldChange("catagName", e.target.value.toUpperCase())}
                  error={Boolean(errors.catagName)}
                  helperText={errors.catagName}
                />
              </Grid>
              {/* ====================  */}
              {/* ================ */}
              <Grid item md={12} lg={12} sm={12} xs={12} sx={{ textAlign: "left" }}>
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
                  getRowId={(row) => row.catag_code.toString()}
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
                  pageSizeOptions={[5,10, 20]}
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