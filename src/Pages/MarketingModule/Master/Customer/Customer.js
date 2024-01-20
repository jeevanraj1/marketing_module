import { Grid, Paper, TextField, Autocomplete, Typography, Box, Button, Modal, Stack, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import { customerApi } from '../../../Api';

//inputProps={{maxLength:40}}

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60%",
  bgcolor: 'background.paper',
  border: '2px solid #ddd',
  boxShadow: 24,
};
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

const autoCompleteStyle = {
  // "& .MuiOutlinedInput-root": {
  //   "& fieldset": {
  //     borderColor: "black",
  //     borderWidth: "2px",
  //   },
  // },
  // "& .MuiInputLabel-root": {
  //   color: "black",
  //   "&.Mui-focused": {
  //     transform: "translate(14px, -8px)",
  //   },
  // },
  // "& input, & label": {
  //   height: "14px",
  //   display: "flex",
  //   alignItems: "center",
  //   fontSize: 12,
  //   fontWeight: "bold",
  // },
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

const datePickerStyle = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
      borderWidth: "2px",
      height: "35px",
      paddingBottom: "5px",

    },
  },
  "& .MuiInputLabel-root": {
    color: "black",
    "&.Mui-focused": {
      transform: "translate(14px, -8px)",
    },
  },
  "& input": {
    height: "12px",
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: "-1px",
  },
  "& label": {
    height: "14px",
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: "-1px",
  },
}
export default function Customer() {
  const navigate = useNavigate()
  const [officerNames,setOfficerNames] = useState([]) 
  const [realationTypeNames,setRealationTypeNames] = useState([]) 
  const [fetchStatusDD,setFetchStatusDD] = useState([]) 
  const status = [
    { name: "Active", },
    { name: "Inactive" }
  ]
  const fdLock = [
    { name: "Yes", },
    { name: "No" }
  ]

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleMobileOpen = () => setMobileOpen(true);
  const handleMobileClose = () => setMobileOpen(false);

  const handleBackdropMobileClick = (event) => {
    event.stopPropagation();
  };
  const handleClose = () => {
    navigate(-1)
  }

  const fetch_officerNames = async()=>{
    try {
      const respone = await customerApi.customerMaster().fetch_OfficerName_DD()
      if(respone.status===200){
        setOfficerNames(respone.data.items)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetch_relationType_DD = async()=>{
    try {
      const respone = await customerApi.customerMaster().fetch_relationType_DD()
      if(respone.status===200){
        setRealationTypeNames(respone.data.items)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const fetch_status_DD = async()=>{
    try {
      const respone = await customerApi.customerMaster().fetch_status_DD()
      console.log(respone);
      if(respone.status===200){
        setFetchStatusDD(respone.data.items)
      }
    } catch (error) {
      console.log(error);
    }
  }
console.log(officerNames);
  useEffect(()=>{
    fetch_officerNames()
    fetch_relationType_DD()
    fetch_status_DD()
  },[])
  return (
    <>
      <Paper sx={{ p: 2 }} elevation={3}>
        <Grid container spacing={2}>
          <Grid item md={12} lg={12} sm={12} xs={12}>
            {/* =========================Personal Details======================== */}
            <Typography variant="h6">
              Personal Details
            </Typography>
          </Grid>
          {/* =========================Customer Code======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Customer Code"
              variant="outlined"
              size='small'
              required
              fullWidth
              sx={textFiledStyle}
            />
          </Grid>
          {/* =========================Customer Name======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Customer Name"
              variant="outlined"
              size='small'
              fullWidth
              sx={textFiledStyle}
            />
          </Grid>
          {/* =========================Customer Alise======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Customer Alias"
              variant="outlined"
              size='small'
              fullWidth
              sx={textFiledStyle}
            />
          </Grid>
          {/* =========================Status Dropdown======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={fetchStatusDD}
              getOptionLabel={(options) => options.status_name}
              renderInput={(params) => <TextField
                {...params}
                label="Status"
                size='small'
                fullWidth
                sx={autoCompleteStyle}
              />}
            />
          </Grid>
          {/* =========================Relation Type======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={realationTypeNames}
              getOptionLabel={(options) => options.rel_name}
              renderInput={(params) => <TextField
                {...params}
                label="Relation Type"
                size='small'
                fullWidth
                sx={autoCompleteStyle}
              />}
            />
          </Grid>
          {/* =========================Relationship Name======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Relationship Name"
              variant="outlined"
              size='small'
              fullWidth
              sx={textFiledStyle}
            />
          </Grid>
          {/* =========================Officer Name======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={officerNames}
              getOptionLabel={(options) => options.officer_name}
              renderInput={(params) => <TextField
                {...params}
                label="Officer Name"
                size='small'
                fullWidth
                sx={autoCompleteStyle}
              />}
            />
          </Grid>
        </Grid>
      </Paper>
      {/* =========================Paper end======================== */}
      <Paper sx={{ mt: 2, p: 2 }} elevation={3}>
        <Grid container spacing={2}>
          {/* =========================Customer Category======================== */}
          <Grid item md={12} lg={12} sm={12} xs={12}>
            <Typography variant="h6">
              Customer Category
            </Typography>
          </Grid>
          {/* =========================Customer Type======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Customer Type"
              variant="outlined"
              size='small'
              fullWidth
              sx={textFiledStyle}
            />
          </Grid>
          {/* =========================Bill category======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={status}
              getOptionLabel={(options) => options.name}
              renderInput={(params) => <TextField
                {...params}
                label="Bill category"
                size='small'
                fullWidth
                sx={autoCompleteStyle}
              />}
            />
          </Grid>
          {/* =========================Rate category======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={status}
              getOptionLabel={(options) => options.name}
              renderInput={(params) => <TextField
                {...params}
                label="Rate category"
                size='small'
                fullWidth
                sx={autoCompleteStyle}
              />}
            />
          </Grid>
          {/* =========================Paymode Dropdown======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={status}
              getOptionLabel={(options) => options.name}
              renderInput={(params) => <TextField
                {...params}
                label="Paymode"
                size='small'
                sx={autoCompleteStyle}
              />}
            />
          </Grid>
        </Grid>
      </Paper>
      {/* =========================Paper end======================== */}
      <Paper sx={{ mt: 2, p: 2 }} elevation={3}>
        <Grid container spacing={2}>
          {/* ========================= Bank Details======================== */}
          <Grid item md={12} lg={12} sm={12} xs={12}>
            <Typography variant="h6">
              Bank Details
            </Typography>
          </Grid>
          {/* =========================Bank name======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={status}
              getOptionLabel={(options) => options.name}
              renderInput={(params) => <TextField
                {...params}
                label="Bank name"
                size='small'
                fullWidth
                sx={autoCompleteStyle}
              />}
            />
          </Grid>
          {/* =========================Branch name======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={status}
              getOptionLabel={(options) => options.name}
              renderInput={(params) => <TextField
                {...params}
                label="Branch name"
                size='small'
                fullWidth
                sx={autoCompleteStyle}
              />}
            />
          </Grid>

          {/* =========================IFSC Code======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="IFSC Code"
              variant="outlined"
              size='small'
              fullWidth
              sx={textFiledStyle}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          {/* =========================Account Number======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Account Number"
              variant="outlined"
              size='small'
              fullWidth
              sx={textFiledStyle}
            />
          </Grid>
        </Grid>
      </Paper>
      {/* =========================Paper end======================== */}
      <Paper sx={{ mt: 2, p: 2 }} elevation={3}>
        <Grid container spacing={2}>
          {/* =========================Deposite Details======================== */}
          <Grid item md={12} lg={12} sm={12} xs={12}>
            <Typography variant="h6">
              Deposit Details
            </Typography>
          </Grid>
          {/* =========================Total Deposit Amount======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Total Deposit Amount"
              variant="outlined"
              size='small'
              fullWidth
              disabled
              sx={textFiledStyle}
            />
          </Grid>
          {/* =========================FD Lock======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={fdLock}
              getOptionLabel={(options) => options.name}
              renderInput={(params) => <TextField
                {...params}
                label="FD Lock"
                size='small'
                sx={autoCompleteStyle}
              />}
            />
          </Grid>
          {/* =========================Credit Limit======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Credit Limit"
              variant="outlined"
              size='small'
              fullWidth
              sx={textFiledStyle}
            />
          </Grid>
          {/* =========================Current Balance======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Current Balance"
              variant="outlined"
              size='small'
              fullWidth
              disabled
              sx={textFiledStyle}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
      </Paper>
      {/* =========================Paper end======================== */}
      <Paper sx={{ mt: 2, p: 2 }} elevation={3}>
        <Grid container spacing={2}>
          {/* =========================Tax Details======================== */}
          <Grid item md={12} lg={12} sm={12} xs={12}>
            <Typography variant="h6">
              Tax Details
            </Typography>
          </Grid>
          {/* =========================PAN Number======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="PAN Number"
              variant="outlined"
              size='small'
              fullWidth
              sx={textFiledStyle}
            />
          </Grid>
          {/* =========================GST Number======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="GST Number"
              variant="outlined"
              size='small'
              fullWidth
              sx={textFiledStyle}
            />
          </Grid>
          {/* =========================Aadhar Number======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Aadhar Number"
              variant="outlined"
              size='small'
              fullWidth
              sx={textFiledStyle}
            />
          </Grid>
        </Grid>
      </Paper>
      {/* =========================Paper end======================== */}
      <Paper sx={{ mt: 2, p: 2 }} elevation={3}>
        <Grid container spacing={2}>
          {/* =========================Contact Details======================== */}
          <Grid item md={12} lg={12} sm={12} xs={12}>
            <Typography variant="h6">
              Contact Details
            </Typography>
          </Grid>
          {/* =========================Phone Number======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              size='small'
              fullWidth
              sx={textFiledStyle}
            />
          </Grid>
          {/* =========================Email ID======================== */}
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Email ID"
              variant="outlined"
              size='small'
              fullWidth
              sx={textFiledStyle}
            />
          </Grid>
          {/* =========================btn======================== */}
          <Grid item md={12} lg={12} sm={12} xs={12}>
            <Stack direction="row" spacing={1}>
              {/* =========================Add Deposite button======================== */}
              <Button
                variant='contained'
                size='small'
                onClick={handleMobileOpen}
              >Add Deposit
              </Button>
              <Modal
                open={mobileOpen}
                onClose={handleMobileClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                BackdropProps={{ onClick: handleBackdropMobileClick }}
              // slotProps={{
              //   backdrop:handleBackdropMobileClick()
              // }}
              >
                <Box sx={style}>
                  <Grid container spacing={2}>
                    {/* ================ */}
                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ textAlign: "end", width: "1000px" }}>
                      <Button onClick={handleMobileClose} sx={{ marginTop: "-5px" }}>
                        <HighlightOffIcon fontSize='large' />
                      </Button>
                    </Grid>
                    {/* ================ */}
                  </Grid>
                  {/* ================ */}
                  <Grid container spacing={2} padding={2} >
                    {/* =========================Customer Code======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                      <TextField
                        id="outlined-basic"
                        label="Customer Code"
                        variant="outlined"
                        size='small'
                        fullWidth
                        sx={textFiledStyle}
                      />
                    </Grid>
                    {/* =========================Customer Name======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                      <TextField
                        id="outlined-basic"
                        label="Customer Name"
                        variant="outlined"
                        size='small'
                        fullWidth
                        sx={textFiledStyle}
                      />
                    </Grid>
                    {/* =========================Paymode======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={status}
                        getOptionLabel={(options) => options.name}
                        renderInput={(params) => <TextField
                          {...params}
                          label="Paymode"
                          size='small'
                          fullWidth
                          sx={autoCompleteStyle}
                        />}
                      />
                    </Grid>
                    {/* =========================Deposite Type======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={status}
                        getOptionLabel={(options) => options.name}
                        renderInput={(params) => <TextField
                          {...params}
                          label="Deposite Type"
                          size='small'
                          fullWidth
                          sx={autoCompleteStyle}
                        />}
                      />
                    </Grid>
                    {/* =========================Bank Doc Number======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                      <TextField
                        id="outlined-basic"
                        label="Bank Doc Number"
                        variant="outlined"
                        size='small'
                        fullWidth
                        sx={textFiledStyle}
                      />
                    </Grid>
                    {/* =========================Deposit Date======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          disableFuture
                          label="Deposit Date"
                          sx={datePickerStyle}
                          name="Registration_Date"
                          slotProps={{ textField: { size: "small" } }}
                        />
                      </LocalizationProvider>
                    </Grid>
                    {/* =========================Expiry Date======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          disableFuture
                          label="Expiry Date"
                          sx={datePickerStyle}
                          name="Registration_Date"
                          slotProps={{ textField: { size: "small" } }}
                        />
                      </LocalizationProvider>
                    </Grid>
                    {/* =========================GR Number======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                      <TextField
                        id="outlined-basic"
                        label="GR Number"
                        variant="outlined"
                        size='small'
                        fullWidth
                        sx={textFiledStyle}
                      />
                    </Grid>
                    {/* =========================GR Date======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          disableFuture
                          label="GR Date"
                          sx={datePickerStyle}
                          name="Registration_Date"
                          slotProps={{ textField: { size: "small" } }}
                        />
                      </LocalizationProvider>
                    </Grid>
                    {/* =========================Bank Name======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                      <TextField
                        id="outlined-basic"
                        label="Bank Name"
                        variant="outlined"
                        size='small'
                        fullWidth
                        sx={textFiledStyle}
                      />
                    </Grid>
                    {/* =========================Amount======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                      <TextField
                        id="outlined-basic"
                        label="Amount"
                        variant="outlined"
                        size='small'
                        fullWidth
                        sx={textFiledStyle}
                      />
                    </Grid>
                    {/* =========================Remarks======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                      <TextField
                        id="outlined-basic"
                        label="Remarks"
                        variant="outlined"
                        size='small'
                        fullWidth
                        sx={textFiledStyle}
                      />
                    </Grid>
                    {/* =========================Button======================== */}
                    <Grid item md={12} lg={12} sm={12} xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Stack direction="row" spacing={1}>
                        <Button variant="contained" size='small' >Save</Button>
                        <Button variant="contained" size='small' color="error">
                          Clear
                        </Button>
                      </Stack>
                    </Grid>
                    {/* ================ */}
                  </Grid>
                  {/* ================ */}
                </Box>
              </Modal>
              {/* =========================btn======================== */}
              <Button
                variant="contained"
                size='small'
              >Save
              </Button>
              <Button
                variant="contained"
                size='small'
                color="error"
                onClick={() => handleClose()}
              >
                Close
              </Button>
            </Stack>
          </Grid>
          {/* ================================================= */}
        </Grid>
      </Paper>
      {/* =========================Paper end======================== */}
    </>
  )
}
