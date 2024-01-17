import React from 'react'
import { Grid, Typography, Paper, Button, Box, TextField, Stack } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useForm, Controller, set } from "react-hook-form"
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { officerApi } from '../../../Api';

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
export default function OfficerDT() {
    const [rows, SetRows] = React.useState([])
    const form = useForm({
        defaultValues: {
            officerName: '',
            officerZone: '',
        }
    })
    const { register, handleSubmit, formState, control, setValue, clearErrors,setError } = form
    const { errors } = formState
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
                    //onClick={() => { handleEdit(params.row.state_id, params.row.state_name, params.row.gst_state_code) }}
                    >
                        Edit
                    </ModeEditOutlineRoundedIcon>

                </>
            ),
        },
        {
            field: 'officer_code',
            headerName: 'Officer Code',
            width: 200,
            editable: true,
        },
        {
            field: 'officer_name',
            headerName: 'Officer Name',
            width: 200,
            editable: true,
        },
        {
            field: 'zone_code',
            headerName: 'Zone Code',
            width: 250,
            editable: true,
        },
    ];



    const handleClick = () => {

    }

    const fetchData = async () => {
        try {
            const respone = await officerApi.officerApi_master().fetchAll()
            if (respone.status === 200) {
                SetRows(respone.data.items)
            }
        } catch (error) {
            console.log(error);
        }

    }

    React.useEffect(() => {
        fetchData()
        document.title = "Officer"
    }, [])
    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={12} lg={12} sm={12} xs={12}>
                    <Paper sx={{ padding: 2 }}>
                        <Grid container spacing={2}>
                            {/* =========================Relation  Master======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Typography variant='h5'>
                                    Officers Master
                                </Typography>
                            </Grid>
                            {/* =========================Officer Name======================== */}
                            <Grid item md={3} lg={3} sm={12} xs={12}>
                                <Controller
                                    name='officerName'
                                    control={control}
                                    //rules={}
                                    render={({ field }) => {
                                        return (
                                            <TextField
                                                id="outlined-basic"
                                                label="Officer Name"
                                                variant="outlined"
                                                size='small'
                                                required
                                                fullWidth
                                                sx={textFiledStyle}
                                                onChange={(e)=>{
                                                    let value =e.target.value.toUpperCase().trim()
                                                    field.onChange(value);
                                                    if(value.length <3){
                                                        setError
                                                    }
                                                }}
                                                value={field.value}
                                            />
                                        )
                                    }}
                                />

                            </Grid>
                            {/* =========================Officer Zone======================== */}
                            <Grid item md={3} lg={3} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Officer Zone"
                                    variant="outlined"
                                    size='small'
                                    required
                                    fullWidth
                                    sx={textFiledStyle}
                                />
                            </Grid>
                            {/* =========================Button======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant="contained"
                                        type='submit'
                                        size='small'

                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="contained"
                                        type='submit'
                                        size='small'
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size='small'
                                    >
                                        Clear
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Grid xs={12} sm={12} md={12} lg={12}>
                        <Box sx={{ height: 300, width: '100%', marginTop: '20px' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                getRowId={(row) => row.officer_code.toString()}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 10,
                                        },
                                    },
                                }}
                            // columnVisibilityModel={columnVisibilityModel}
                            // onColumnVisibilityModelChange={(newModel) =>
                            //     setColumnVisibilityModel(newModel)
                            // }
                            //pageSizeOptions={[10, 20]}
                            //disableRowSelectionOnClick
                            //getRowHeight={() => 35}
                            //getRowClassName={getRowClassName}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
