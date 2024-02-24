import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Grid, Paper, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import { PacketsApi, customerApi } from '../../../Api';
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import Swal from 'sweetalert2';


const autocompleteStyle = {
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
export default function PacketsDT() {
    const navigate = useNavigate()
    const [searchByCode, setSearchByCode] = React.useState(true)
    const [searchByName, setSearchByName] = React.useState(false)
    const [Rows, setRows] = useState([]);
    const [DDPacketCode, setDDPacketCode] = useState([]);
    const [DDPacketName, setDDPacketName] = useState([]);
    const [packetCode, setpacketCode] = useState(null);
   


    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        packet_code: false,
        product_code:false,
        category_id:false
    });

    const columns = [
        {
            field: "action",
            headerName: "Action",
            width: 110,
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
        // {==========1.VARIANT DETAILS=================}
        {
            field: 'packet_code',
            headerName: 'Packets Code',
            width: 90
        },
        {
            field: 'users_code',
            headerName: 'Packets Code',
            width: 90
        },
        {
            field: 'packet_name',
            headerName: 'Packets Name',
            width: 170,
        },
        {
            field: 'packet_alias',
            headerName: 'Packet Alias',
            width: 190,
        },
        {
            field: 'milk_or_product',
            headerName: 'Milk Or Product',
            width: 190,
        },
        {
            field: 'product_code',
            headerName: 'Product Code',
            width: 190,
        },
        {
            field: 'product_name',
            headerName: 'Product Name',
            width: 190,
        },
        {
            field: 'unit_id',
            headerName: 'Unit',
            width: 190,
        },

        {
            field: 'pack_size',
            headerName: 'Packet Size',
            width: 170,
        },
        {
            field: 'crates',
            headerName: 'Supplied In Crates',
            width: 170,
        },
        {
            field: 'crate_or_not',
            headerName: 'Crate Or Not',
            width: 170,
        },
        {
            field: 'terminated',
            headerName: 'Terminated',
            width: 190,
        },
        {
            field: 'utp_issue',
            headerName: 'Issue In UTP Rate',
            width: 170,
        },
        // {==========2.TAX DETAILS=================}

        {
            field: 'sac_no',
            headerName: 'Product Name',
            width: 190,
        },
        {
            field: 'gst',
            headerName: 'Packets Alias',
            width: 170,
        },
        {
            field: 'cgst',
            headerName: 'Product Name',
            width: 190,
        },
        {
            field: 'sgst',
            headerName: 'Packets Alias',
            width: 170,
        },
        {
            field: 'igst',
            headerName: 'Product Name',
            width: 190,
        },
        // {==========3.ROUTE SHEET SETTINGS=================}   
        {
            field: 'packet_position',
            headerName: 'Position',
            width: 170,
        },
        {
            field: 'make_zero',
            headerName: 'Make Zero in Reset Indent',
            width: 170,
        },
        {
            field: 'packet_type',
            headerName: 'Display in Route Sheet',
            width: 170,
        },
        // {==========4.APP SETTINGS=================}   
        {
            field: 'indent_in',
            headerName: 'Indent In',
            width: 170,
        },
        {
            field: 'allow_in_both',
            headerName: 'Allow In Both',
            width: 170,
        },
        {
            field: 'notify_qty',
            headerName: 'Make Zero in Reset Indent',
            width: 170,
        },
        {
            field: 'category_id',
            headerName: 'Category Id',
            width: 170,
        },
           {
            field: 'cat_name',
            headerName: 'Category Name',
            width: 170,
        },

        {
            field: 'selected',
            headerName: 'Display in App',
            width: 170,
        },
        {
            field: 'shelf_life',
            headerName: 'Shelf Life',
            width: 170,
        },
        {
            field: 'min_order_qty',
            headerName: 'Minimum Order Quantity',
            width: 170,
        },

        {
            field: 'max_order_qty',
            headerName: 'Maximum Order Quantity',
            width: 170,
        },
    
        // {==========5.RATES=================}   
        {
            field: 'mrp',
            headerName: 'MRP',
            width: 170,
        },
        {
            field: 'agent_comm',
            headerName: 'Dealers Commission',
            width: 170,
        },
        {
            field: 'sub_rate',
            headerName: 'Subsidy Rate',
            width: 170,
        },


    ];
    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };


    const handleEdit = (row) => {
        localStorage.setItem("Navigation_state",true)
        //navigationPacketCode
        const Statevalue = {
            // ======================================1.Variant Details===============================
            usersCode: row.users_code,
            packetName: row.packet_name,
            packetAlias: row.packet_alias,
            milkOrProduct: row.milk_or_product,
            productName: row.product_code,
            unitName: row.unit_id,
            packetSize: row.pack_size, //pack_size
            packetsPerCrate: row.crate_or_not,  //crate_or_not 
            suppliedInCrates: row.crates, //crates
            tERMINATED: row.terminated,
            issueInUtpRate: row.utp_issue, //utp_issue  
            // ======================================2.Tax Details===============================
            HsnCode: row.sac_no, //sac_no
            gST: row.gst,
            cGST: row.cgst,
            sGST: row.sgst,
            iGST: row.igst,
            // ======================================3.Route Sheet Settings====================================
            pOSITION: row.packet_position, //packet_position
            makeZeroinResetIndent: row.make_zero,  //make_zero
            displayinRouteSheet: row.packet_type, //packet_type
            // ======================================4.App Settings=================================
            indentIn: row.indent_in,
            allowInBoth: row.allow_in_both,
            notifyQuantity: row.notify_qty,
            cATEGORY: row.category_id,
            displayInApp: row.selected, //selected
            shelfLife: row.shelf_life,
            minOrderQty: row.min_order_qty,   //new
            maxOrderQty: row.max_order_qty,   //new
            // ======================================5.Rates=================================
            mRP: row.mrp,
            dealersCommission:row.agent_comm,
            sUBSIDY: row.sub_rate,
            lastRateModifiedDate: row.last_rt_modified_dt,  //new

            packetCode:row.packet_code,
        }
        console.log(Statevalue);
        navigate("CreatePackets",{state:Statevalue})
    }
    const handleClick = () => {
        navigate("CreatePackets")
    }


    const handleRadio = (e) => {
        const { value } = e.target;
        if (value === 'Code') {
            setSearchByCode(true);
            setSearchByName(false);
            fetchData()
        } else if (value === 'Name') {
            setSearchByCode(false);
            setSearchByName(true);
            fetchData()
        }
    }

    //SEARCH: handlefieldChange
    const handlefieldChangeSearch = async (fieldname, value) => {
        if (fieldname === "PacketName") {
            if (value === "") {
                setpacketCode(null)
                fetchData()
            }
            else if (value) {
                setpacketCode(value)
            }

        }
        if (fieldname === "PacketCode") {
            if (value === "") {
                setpacketCode(null)
                fetchData()
            }
            else if (value) {
                setpacketCode(value)
            }

        }
    }

    const handleSearch = () => {
        if (packetCode === null) Swal.fire("jasdn")
        else if (packetCode !== "") fetchPacketDetails(packetCode)

        setpacketCode(null)
    }

    const fetchPacketDetails = async (id) => {
        try {
            const response = await PacketsApi.PacketsAPI_master().fetchByPacketCode(id)
            console.log(response);
            if (response.status === 200) {
                setRows(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }



    const fetchPacketCode = async () => {
        try {
            const response = await PacketsApi.PacketsAPI_master().DD_UsersCode()
            if (response.status === 200) {
                setDDPacketCode(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPacketName = async () => {
        try {
            const response = await PacketsApi.PacketsAPI_master().DD_PacketName()
            if (response.status === 200) {
                setDDPacketName(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }


    const fetchData = async () => {
        try {
            const respone = await PacketsApi.PacketsAPI_master().fetchAll()
            console.log(respone);
            if (respone.status === 200) {
                setRows(respone.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }


    React.useEffect(() => {
        document.title = 'Packets Master'
        fetchData()
        fetchPacketCode()
        fetchPacketName()

    }, [])
    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={12} lg={12} sm={12} xs={12}>
                    <Paper sx={{ padding: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item md={12} lg={12} sm={12} xs={12} width={1000}>
                                <Typography variant='h5'>
                                    Packets  Master
                                </Typography>
                            </Grid>
                            <Grid item md={4} lg={4} sm={12} xs={12}>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="Search"
                                        onChange={(e) => { handleRadio(e) }}
                                    >
                                        <FormControlLabel
                                            value="Code"
                                            control={<Radio checked={searchByCode} />}
                                            label="Packets Code"
                                        />
                                        <FormControlLabel
                                            value="Name"
                                            control={<Radio checked={searchByName} />}
                                            label="Packets Name"
                                        />

                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            {searchByCode && (
                                <Grid item md={3} lg={3} sm={12} xs={12}>
                                    <Autocomplete
                                        disablePortal
                                        options={DDPacketCode}
                                        getOptionLabel={(options) => options.users_code}
                                        isOptionEqualToValue={(option, value) => option.packet_code === value.packet_code}
                                        onChange={(event, value) => handlefieldChangeSearch("PacketCode", value?.packet_code || "")}
                                        size='small'
                                        fullWidth
                                        sx={autocompleteStyle}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                label="Packets Code"
                                            />}
                                    />
                                </Grid>
                            )}
                            {searchByName && (
                                <Grid item md={3} lg={3} sm={12} xs={12}>
                                    <Autocomplete
                                        disablePortal
                                        options={DDPacketName}
                                        getOptionLabel={(options) => options.packet_name}
                                        isOptionEqualToValue={(option, value) => option.packet_code === value.packet_code}
                                        onChange={(event, value) => handlefieldChangeSearch("PacketName", value?.packet_code || "")}
                                        size='small'
                                        fullWidth
                                        sx={autocompleteStyle}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                label="Packets Name"
                                            />}
                                    />
                                </Grid>
                            )}
                            <Grid item md={2} lg={2} sm={12} xs={12}>
                                <Button variant="contained"
                                    size='small'
                                    onClick={handleSearch}
                                >
                                    Search
                                </Button>
                            </Grid>
                            <Grid item md={3} lg={3} sm={12} xs={12} sx={{ textAlign: "end" }}>
                                <Button
                                    variant="contained"
                                    onClick={() => handleClick()}
                                    size='small'
                                >Create
                                </Button>
                            </Grid>
                        </Grid>
                        <Paper elevation={3} sx={{ width: "100%", marginTop: 3, }}>
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Box sx={{ height: 315, width: '100%' }}>
                                    <DataGrid
                                        rows={Rows}
                                        columns={columns}
                                        getRowId={(row) => row.packet_code.toString()}
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
                        </Paper>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}
