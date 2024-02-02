<>
                  <Box sx={style}>
                    <Grid container spacing={2} paddingLeft={2} paddingTop={1}>
                      {/* ================ */}
                      <Grid item xs={2} sm={2} md={10} lg={10} sx={{ width: "1000px", borderBottom: "1px solid #000" }}>
                        <Typography variant="h4">
                          Deposite Details
                        </Typography>
                      </Grid>
                      {/* ================ */}
                      <Grid item xs={2} sm={2} md={2} lg={2} sx={{ textAlign: "end", width: "1000px", borderBottom: "1px solid #000" }}>
                        <Button onClick={handleMobileClose} sx={{ marginTop: "-5px" }}>
                          <HighlightOffIcon fontSize='large' />
                        </Button>
                      </Grid>
                      {/* ================ */}
                    </Grid>
                    {/* ================ */}
                    <Grid container spacing={2} padding={2} >
                      {/* ================================================= */}
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Typography component="h5" style={{ borderBottom: "1px dashed #000" }}>
                          Customer Code : 4586
                        </Typography>
                      </Grid>
                      {/* ================================================= */}
                      <Grid item xs={12} sm={12} md={6} lg={6} >
                        <Typography component="h5" style={{ borderBottom: "1px dashed #000" }}>
                          Customer Name : JOHN
                        </Typography>
                      </Grid>
                      {/* ================================================= */}
                      {/* =========================Paymode======================== */}
                      <Grid item md={3} lg={3} sm={12} xs={12}>
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={fetchDepositePaymodeDD}
                          size='small'
                          fullWidth
                          getOptionLabel={(options) => options.dep_mode}
                          isOptionEqualToValue={(option, value) => option.dep_paymode_id === value.dep_paymode_id}
                          value={fetchDepositePaymodeDD.find(option => option.dep_paymode_id === popUpFormData.paymode) || null}
                          onChange={(e, v) => handlePopUpFieldChange("paymode", v?.dep_paymode_id || "")}
                          sx={autoCompleteStyle}
                          renderInput={(params) =>
                            <TextField
                              {...params}
                              label="Paymode"
                            />}
                        />
                      </Grid>
                      {/* =========================Deposite Type======================== */}
                      {gridDepositeType && (<Grid item md={3} lg={3} sm={12} xs={12}>
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={fetchDepositeTypeDD}
                          getOptionLabel={(options) => options.dp_type}
                          renderInput={(params) => <TextField
                            {...params}
                            label="Deposite Type"
                            size='small'
                            fullWidth
                            sx={autoCompleteStyle}
                          />}
                        />
                      </Grid>)}
                      {/* =========================Bank Doc Number======================== */}
                      {gridBankDocNumber && (<Grid item md={3} lg={3} sm={12} xs={12}>
                        <TextField
                          id="outlined-basic"
                          label="Bank Doc Number"
                          variant="outlined"
                          size='small'
                          fullWidth
                          sx={textFiledStyle}
                        />
                      </Grid>)}
                      {/* =========================Bank Name======================== */}
                      {gridBankName && (<Grid item md={3} lg={3} sm={12} xs={12}>
                        <TextField
                          id="outlined-basic"
                          label="Bank Name"
                          variant="outlined"
                          size='small'
                          fullWidth
                          sx={textFiledStyle}
                        />
                      </Grid>)}
                      {/* =========================Deposit Date======================== */}
                      {gridDepositeDate && (<Grid item md={3} lg={3} sm={12} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            disableFuture
                            label="Deposit Date"
                            sx={datePickerStyle}
                            name="Registration_Date"
                            slotProps={{ textField: { size: "small" } }}
                          />
                        </LocalizationProvider>
                      </Grid>)}
                      {/* =========================Expiry Date======================== */}
                      {gridexpireData && (<Grid item md={3} lg={3} sm={12} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            disableFuture
                            label="Expiry Date"
                            sx={datePickerStyle}
                            name="Registration_Date"
                            slotProps={{ textField: { size: "small" } }}
                          />
                        </LocalizationProvider>
                      </Grid>)}
                      {/* =========================GR Number======================== */}
                      {gridgrNumber && (<Grid item md={3} lg={3} sm={12} xs={12}>
                        <TextField
                          id="outlined-basic"
                          label="GR/REF Number"
                          variant="outlined"
                          size='small'
                          fullWidth
                          sx={textFiledStyle}
                        />
                      </Grid>)}
                      {/* =========================GR Date======================== */}
                      {gridgrDate && (<Grid item md={3} lg={3} sm={12} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            disableFuture
                            label="GR Date"
                            sx={datePickerStyle}
                            name="Registration_Date"
                            slotProps={{ textField: { size: "small" } }}
                          />
                        </LocalizationProvider>
                      </Grid>)}

                      {/* =========================Amount======================== */}
                      {gridAmount && (<Grid item md={3} lg={3} sm={12} xs={12}>
                        <TextField
                          id="outlined-basic"
                          label="Amount"
                          variant="outlined"
                          size='small'
                          fullWidth
                          sx={textFiledStyle}
                        />
                      </Grid>)}
                      {/* =========================Remarks======================== */}
                      {gridRemarks && (<Grid item md={8} lg={8} sm={12} xs={12}>
                        <TextField
                          id="outlined-basic"
                          label="Remarks"
                          variant="outlined"
                          size='small'
                          fullWidth
                          sx={textFiledStyle}
                        />
                      </Grid>)}
                      {/* =========================datagrid start======================== */}
                      <Grid item md={12} lg={12} sm={12} xs={12}>
                        <Box sx={{ height: 300, width: '100%', marginTop: '20px' }}>
                          <DataGrid
                            rows={rows}
                            columns={columns}
                            //getRowId={(row) => row.status_id.toString()}
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
                      {/* =========================datagrid end======================== */}
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
                </>