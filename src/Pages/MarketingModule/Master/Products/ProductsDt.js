import React from 'react'
import { Grid, Typography, Paper, Button, Box, TextField, Stack, Autocomplete } from '@mui/material'
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useState, useEffect } from "react";
import { ProductsApi } from "../../../Api";
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid'


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
    "& input": {
        height: "10px",
        display: "flex",
        alignItems: "center",
        fontSize: 12,
        fontWeight: "bold",
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
    "& input": {
        height: "10px",
        display: "flex",
        alignItems: "center",
        fontSize: 12,
        fontWeight: "bold",
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

const MILK_OR_PRODUCT = [
    { name: "MILK", value: 0 },
    { name: "PRODUCT", value: 1 }
]
const CONSIDER_AS_MILK = [
    { name: "YES", value: "Y" },
    { name: "NO", value: "N" }
]



export default function ProductsDt() {
    const [rows, setRows] = useState([]);
    const [searchByCode, setSearchByCode] = React.useState(true)
    const [searchByName, setSearchByName] = React.useState(false)
    const [DDProductCode, setDDProductCode] = useState([]);
    const [DDProductName, setDDProductName] = useState([]);
    const [saveButton, setSaveButton] = useState(true);
    const [updateButton, setUpdateButton] = useState(false);
    const [productCode, setProductCode] = useState(null);
    const [productSuppliers, setProductSuppliers] = useState([]);

    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        product_code: false,
        default_unit: false,
        kg_per_ltr: false
    });

    const [formData, setFormData] = useState({
        usersCode: "",
        productName: "",
        shortName: "",
        milkOrProduct: null,
        considerUnderMilk: 'N',
        positionFor: "",
        productSupplier: "",
    });

    const [errors, setErrors] = useState({});

    const validation = () => {
        const newErrors = {}
        // =====================================usersCode==========================================
        if (formData.usersCode === "") newErrors.usersCode = "Required"
        else if (formData.usersCode !== "") newErrors.usersCode = errors.usersCode
        //====================================productName============================================
        if (formData.productName === "") newErrors.productName = "Required"
        else if (formData.productName !== "") newErrors.productName = errors.productName
        //====================================shortName============================================
        if (formData.shortName === "") newErrors.shortName = "Required"
        else if (formData.shortName !== "") newErrors.shortName = errors.shortName
        //====================================milkOrProduct============================================
        if (formData.milkOrProduct === "") newErrors.milkOrProduct = "Required"
        else if (formData.milkOrProduct === null) newErrors.milkOrProduct = "Required"
        else if (formData.milkOrProduct !== "") newErrors.milkOrProduct = errors.milkOrProduct
        //====================================considerUnderMilk============================================
        if (formData.considerUnderMilk === "") newErrors.considerUnderMilk = "Required"
        else if (formData.considerUnderMilk !== "") newErrors.considerUnderMilk = errors.active
        //====================================positionFor============================================
        if (formData.positionFor === "") newErrors.positionFor = "Required"
        else if (formData.positionFor !== "") newErrors.positionFor = errors.positionFor
        //====================================productSupplier============================================
        if (formData.productSupplier === "") newErrors.productSupplier = "Required"
        else if (formData.productSupplier !== "") newErrors.productSupplier = errors.productSupplier

        return newErrors
    }


    //SEARCH: handlefieldChange
    const handlefieldChangeSearch = async (fieldname, value) => {
        if (fieldname === "ProductName") {
            if (value === "") {
                setProductCode("")
                fetchData()
            }
            else if (value) {
                setProductCode(value)
            }
        }
        if (fieldname === "ProductCode") {
            if (value === "") {
                setProductCode("")
                fetchData()
            }
            else if (value) {
                setProductCode(value)
            }
        }
    }

    const handleSearch = () => {
        if (productCode === "") fetchData()
        else if (productCode !== "") fetchProductDetails(productCode)
    }

    const fetchProductDetails = async (id) => {
        try {
            const response = await ProductsApi.ProductsApi_master().fetchByProductCode(id)
            console.log(response);
            if (response.status === 200) {
                setRows(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const fetchProductCode = async () => {
        try {
            const response = await ProductsApi.ProductsApi_master().dd_UsersCode()
            if (response.status === 200) {
                setDDProductCode(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchProductName = async () => {
        try {
            const response = await ProductsApi.ProductsApi_master().dd_ProductName()
            if (response.status === 200) {
                setDDProductName(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const ProductSupplier = async () => {
        try {
            const response = await ProductsApi.ProductsApi_master().dd_ProductSuplier()
            if (response.status === 200) {
                setProductSuppliers(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleRadio = (e) => {
        const { value } = e.target;
        if (value === 'Code') {
            setSearchByCode(true);
            setSearchByName(false);
        } else if (value === 'Name') {
            setSearchByCode(false);
            setSearchByName(true);
        }
    }
    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };

    const handleClear = () => {
        setFormData((prevadata) => ({
            ...prevadata,
            usersCode: "",
            productName: "",
            shortName: "",
            milkOrProduct: "",
            considerUnderMilk: 'N',
            positionFor: "",
            productSupplier: "",
        }))
        setSaveButton(true)
        setUpdateButton(false)
        setErrors({})
        localStorage.setItem("Navigation_state", true)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
        if (!hasErrors) {
            const newRecord = {
                "product_name": formData.productName.trim(),
                "users_code": formData.usersCode.trim(),
                "product_alias": formData.shortName.trim() !== "" ? formData.shortName : null,
                "m_or_p": formData.milkOrProduct,
                "consider_as_milk": formData.considerUnderMilk,
                "prod_position": Number(formData.positionFor),
                "default_unit": null,
                "kg_per_ltr": null,
                "prod_supply_id": Number(formData.productSupplier)
            }
            try {
                console.log(newRecord);
                const response = await ProductsApi.ProductsApi_master().update(productCode, newRecord)
                if (response.data.Status === 1) {
                    Swal.fire({
                        title: 'Saved',
                        text: 'Updated Sucessfully',
                        icon: 'success',
                        customClass: {
                            container: 'custom-swal-container'
                        }
                    });
                    handleClear()
                    fetchData()
                    localStorage.setItem("Navigation_state", true)

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



    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
        console.log(formData);
        if (!hasErrors) {
            const newRecord = {
                "product_name": formData.productName.trim(),
                "users_code": formData.usersCode.trim(),
                "product_alias": formData.shortName.trim() !== "" ? formData.shortName : null,
                "m_or_p": formData.milkOrProduct,
                "consider_as_milk": formData.considerUnderMilk,
                "prod_position": Number(formData.positionFor),
                "default_unit": null,
                "kg_per_ltr": null,
                "prod_supply_id": Number(formData.productSupplier)
            }
            try {
                console.log(newRecord);
                const response = await ProductsApi.ProductsApi_master().create(newRecord)
                if (response.data.Status === 1) {
                    Swal.fire({
                        title: 'Saved',
                        text: 'Saved Sucessfully',
                        icon: 'success',
                        customClass: {
                            container: 'custom-swal-container'
                        }
                    });
                    handleClear()
                    fetchData()
                    localStorage.setItem("Navigation_state", true)

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
            field: 'product_code',
            headerName: 'Product Code',
            width: 150,
        },
        {
            field: 'product_name',
            headerName: 'Product Name',
            width: 150,
        },
        {
            field: 'users_code',
            headerName: 'Product Code',
            width: 150,
        },
        {
            field: 'product_alias',
            headerName: 'Short Name',
            width: 150,
        },
        {
            field: 'm_or_p',
            headerName: 'Milk or Product',
            width: 110,
        },
        {
            field: 'consider_as_milk',
            headerName: 'Consider Under Milk',
            width: 150,
        },
        {
            field: 'prod_position',
            headerName: 'Position for Sorting',
            width: 150,
        },
        {
            field: 'default_unit',
            headerName: 'Default Unit',
            width: 110,
        },
        {
            field: 'kg_per_ltr',
            headerName: 'KG per Litre',
            width: 110,
        },
        {
            field: 'prod_supply_id',
            headerName: 'Product Suppler Code',
            width: 150,
        },

    ];

    const handleEdit = (row) => {
        console.log(row);
        setUpdateButton(true)
        setSaveButton(false)
        setProductCode(row.product_code)
        setFormData((prevdata) => ({
            ...prevdata,
            usersCode: row.users_code,
            productName: row.product_name,
            shortName: row.product_alias,
            milkOrProduct: row.m_or_p,
            considerUnderMilk: row.consider_as_milk,
            positionFor: row.prod_position,
            productSupplier: row.prod_supply_id,
        }))
        setErrors({})

        localStorage.setItem("Navigation_state", true)
    }

    const fetchData = async () => {
        try {
            const response = await ProductsApi.ProductsApi_master().fetchAll()
            if (response.status === 200) {
                setRows(response.data.items)
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
        fetchProductCode()
        fetchProductName()
        ProductSupplier()
        document.title = "Products"
    }, [])


    const handleFieldChange = (fieldName, value) => {
        localStorage.setItem("Navigation_state", false)
        // ======================================usersCode=================================
        if (fieldName === "usersCode") {
            if (value.trim() === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    customerCode: "Required",
                }));
            }
            else if (value.trim().length > 10) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    usersCode: "Value must be Not More than 10 Characters",
                }));
                value = value.substring(0, 10)
                setTimeout(() => {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        usersCode: "",
                    }))
                }, 1000)
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // ======================================productName=================================
        if (fieldName === "productName") {
            if (value.trim() === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    productName: "Required",
                }));
            }
            else if (value.trim().length > 40) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    productName: "Value must be Not More than 40 Characters",
                }));
                value = value.substring(0, 40)
                setTimeout(() => {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        productName: "",
                    }))
                }, 1000)
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // ======================================shortName=================================
        if (fieldName === "shortName") {
            if (value.trim() === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    shortName: "Required",
                }));
            }
            else if (value.trim().length > 15) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    shortName: "Value must be Not More than 15 Characters",
                }));
                value = value.substring(0, 15)
                setTimeout(() => {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        shortName: "",
                    }))
                }, 1000)
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //====================================milkOrProduct============================================
        if (fieldName === "milkOrProduct") {
            if (value === "" || value === null) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: 'Required'
                }))
            }
            else if (value) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: ''
                }))
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value?.value
            }))
        }
        //====================================considerUnderMilk============================================
        if (fieldName === "considerUnderMilk") {
            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: 'Required'
                }))
            }
            else if (value) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: ''
                }))
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //====================================productSupplier============================================
        if (fieldName === "productSupplier") {
            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: 'Required'
                }))
            }
            else if (value) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: ''
                }))
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //====================================productSupplier============================================
        if (fieldName === "positionFor") {
            if (value.trim() === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    positionFor: "Required",
                }));
            }
            else if (value.trim().length > 10) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    positionFor: "Value must be Not More than 10 Characters",
                }));
                value = value.substring(0, 10)
                setTimeout(() => {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        positionFor: "",
                    }))
                }, 1000)
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
    }
    return (
        <>
            <Grid container spacing={2}>
                {/* ======================================  */}
                <Grid item md={4} lg={4} sm={12} xs={12}>
                    <Paper sx={{ padding: 2, pb: "73px" }} elevation={3}>
                        <Grid container spacing={2}>
                            {/* =========================Product  Master======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Typography variant='h5'>
                                    Products
                                </Typography>
                            </Grid>
                            {/* =========================Product Code ======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Product Code"
                                    variant="outlined"
                                    size='small'
                                    required
                                    sx={textFiledStyle}
                                    fullWidth
                                    value={formData.usersCode}
                                    onChange={(e) => handleFieldChange("usersCode", e.target.value.toUpperCase())}
                                    error={Boolean(errors.usersCode)}
                                    helperText={errors.usersCode}
                                />
                            </Grid>
                            {/* =========================Product Name ======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Product Name"
                                    variant="outlined"
                                    size='small'
                                    required
                                    sx={textFiledStyle}
                                    fullWidth
                                    value={formData.productName}
                                    onChange={(e) => handleFieldChange("productName", e.target.value.toUpperCase())}
                                    error={Boolean(errors.productName)}
                                    helperText={errors.productName}
                                />
                            </Grid>
                            {/* =========================Product Alias ======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Short Name"
                                    variant="outlined"
                                    size='small'
                                    required
                                    sx={textFiledStyle}
                                    fullWidth
                                    value={formData.shortName}
                                    onChange={(e) => handleFieldChange("shortName", e.target.value.toUpperCase())}
                                    error={Boolean(errors.shortName)}
                                    helperText={errors.shortName}
                                />
                            </Grid>
                            {/* =========================Milk or Product======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size='small'
                                    fullWidth
                                    options={MILK_OR_PRODUCT}
                                    sx={autoCompleteStyle}
                                    getOptionLabel={(options) => options.name}
                                    isOptionEqualToValue={(option, value) => option.value === value.value}
                                    value={MILK_OR_PRODUCT.find(option => option.value === formData.milkOrProduct) || null}
                                    onChange={(e, v) => handleFieldChange("milkOrProduct", v || null)}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Milk or Product"
                                            required
                                            error={Boolean(errors.milkOrProduct)}
                                            helperText={errors.milkOrProduct}
                                        />}
                                />
                            </Grid>
                            {/* =========================Consider Under Milk======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size='small'
                                    fullWidth
                                    options={CONSIDER_AS_MILK}
                                    sx={autoCompleteStyle}
                                    getOptionLabel={(options) => options.name}
                                    isOptionEqualToValue={(option, value) => option.value === value.value}
                                    value={CONSIDER_AS_MILK.find(option => option.value === formData.considerUnderMilk) || null}
                                    onChange={(e, v) => handleFieldChange("considerUnderMilk", v?.value || null)}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Consider Under Milk"
                                            required
                                            error={Boolean(errors.considerUnderMilk)}
                                            helperText={errors.considerUnderMilk}
                                        />}
                                />
                            </Grid>
                            {/* ========================= Position / Sequence No======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Position / Sequence No"
                                    variant="outlined"
                                    size='small'
                                    name='statusName'
                                    required
                                    sx={textFiledStyle}
                                    fullWidth
                                    value={formData.positionFor}
                                    onChange={(e) => handleFieldChange("positionFor", e.target.value.replace(/[^0-9.]/g, ''))}
                                    error={Boolean(errors.positionFor)}
                                    helperText={errors.positionFor}
                                />
                            </Grid>
                            {/* =========================Product Supplier======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size='small'
                                    fullWidth
                                    options={productSuppliers}
                                    sx={autoCompleteStyle}
                                    getOptionLabel={(options) => options.prod_supplier}
                                    isOptionEqualToValue={(option, value) => option.prod_supply_id === value.prod_supply_id}
                                    value={productSuppliers.find(option => option.prod_supply_id === formData.productSupplier) || null}
                                    onChange={(e, v) => handleFieldChange("productSupplier", v?.prod_supply_id || "")}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Product Supplier"
                                            required
                                            error={Boolean(errors.productSupplier)}
                                            helperText={errors.productSupplier}
                                        />}
                                />
                            </Grid>
                            {/* =========================Button======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Stack direction="row" spacing={2}>
                                    {saveButton && (
                                        <Button
                                            variant="contained"
                                            sx={{ height: "25px" }}
                                            onClick={handleSubmit}
                                            type='submit'
                                            size='small'>
                                            Save
                                        </Button>
                                    )}
                                    {updateButton && (
                                        <Button
                                            variant="contained"
                                            sx={{ height: "25px" }}
                                            onClick={handleUpdate}
                                            type='submit'
                                            size='small'>
                                            Update
                                        </Button>
                                    )}
                                    <Button variant="contained"
                                        onClick={handleClear}
                                        color="error"
                                        sx={{ height: "25px" }}
                                        size='small'>
                                        Clear
                                    </Button>
                                </Stack>
                            </Grid>
                            {/* =========================Button======================== */}
                        </Grid>
                    </Paper>
                </Grid>
                {/* ======================================  */}
                <Grid item md={8} lg={8} xs={12} sm={12}>
                    <Paper sx={{ padding: 2 }} elevation={3}>
                        {/* ============================================== */}
                        <Grid container spacing={2}>
                            <Grid item md={5} lg={5} sm={12} xs={12} style={{ marginTop: "-8px" }}>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="Search"
                                        onChange={(e) => { handleRadio(e) }}
                                    >
                                        <FormControlLabel
                                            value="Code"
                                            control={<Radio style={{ fontSize: 14 }} checked={searchByCode} />}
                                            label={<span style={{ fontSize: 12, fontWeight: "bolder" }}>Product Code</span>}
                                        />
                                        <FormControlLabel
                                            value="Name"
                                            control={<Radio style={{ fontSize: 14 }} checked={searchByName} />}
                                            label={<span style={{ fontSize: 12, fontWeight: "bolder" }}>Product Name</span>}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            {searchByCode && (
                                <Grid item md={3} lg={3} sm={12} xs={12}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={DDProductCode}
                                        getOptionLabel={(options) => options.users_code}
                                        isOptionEqualToValue={(option, value) => option.product_code === value.product_code}
                                        onChange={(event, value) => handlefieldChangeSearch("ProductCode", value?.product_code || "")}
                                        size='small'
                                        fullWidth
                                        sx={autoCompleteStyle}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                label="Product Code"
                                            />}
                                    />
                                </Grid>
                            )}
                            {searchByName && (
                                <Grid item md={3} lg={3} sm={12} xs={12}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={DDProductName}
                                        getOptionLabel={(options) => options.product_name}
                                        isOptionEqualToValue={(option, value) => option.product_code === value.product_code}
                                        onChange={(event, value) => handlefieldChangeSearch("ProductName", value?.product_code || "")}
                                        size='small'
                                        fullWidth
                                        sx={autoCompleteStyle}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                label="Product Name"
                                            />}
                                    />
                                </Grid>
                            )}
                            <Grid item md={2} lg={2} sm={12} xs={12}>
                                <Button variant="contained"
                                    sx={{ height: "25px" }}
                                    size='small'
                                    onClick={handleSearch}
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                        {/* =============================================  */}
                        <Box sx={{ height: 330, width: '100%', marginTop: '20px' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                getRowId={(row) => row.product_code.toString()}
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
                {/* ======================================  */}
            </Grid>
        </>
    )
}

