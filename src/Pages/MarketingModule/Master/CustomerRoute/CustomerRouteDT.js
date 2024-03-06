import React from 'react'
import { Grid, Typography, Paper, Button, Box, TextField, Stack, Autocomplete, FormControlLabel, Checkbox, FormHelperText, FormControl, RadioGroup, Radio } from '@mui/material'
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { useState, useEffect } from "react";
import { CustomerRouteApi } from "../../../Api";
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid'
import { cyan } from '@mui/material/colors';
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

const Indent_For = [
    { name: "TODAY", value: "TOD" },
    { name: "TOMORROW", value: "TOM" },
]
export default function CustomerRouteDT() {
    const [rows, setRows] = useState([]);
    const [saveButton, setSaveButton] = useState(true);
    const [updateButton, setUpdateButton] = useState(false);
    const [formData, setFormData] = useState({
        routeName: '',
        customerName: "",
        positionOnRoute: "",
        indentFor: "",
        billRoute: false,
        indentRoute: false,
        batch: "",
    });
    const [routeNames, setRouteNames] = useState([]);
    const [customerNames, setCustomerNames] = useState([]);
    const [errors, setErrors] = useState({});
    const [batchNames, setBatchNames] = useState([]);
    const [customerRouteId, setCustomerRouteId] = useState(null);
    const [searchRoute, setSearchRoute] = useState(true);
    const [seacrchCustomerName, setSeacrchCustomerName] = useState(false);
    const [DDrouteSearch, setDDRouteSearch] = useState([]);
    const [DDCustomerSearch, setDDCustomerSearch] = useState([]);
    const [routeSearch, setRouteSearch] = useState(null);
    const [customerSearch, setCustomerSearch] = useState(null);



    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        cust_route_id: false,
        route_code: false,
        customer_code: false,
        dist_batch_no: false,
    });
    const getRowClassName = (params) => {
        const rowIndex = params.indexRelativeToCurrentPage;
        return rowIndex % 2 === 0 ? "row-even" : "row-odd";
    };
    const validation = () => {
        const newErrors = {}
        //=============================================routeName==================================================
        if (formData.routeName === "") newErrors.routeName = "Required"
        else if (formData.routeName !== "") newErrors.routeName = errors.routeName
        //=============================================customerName===============================================
        if (formData.customerName === "") newErrors.customerName = "Required"
        else if (formData.customerName !== "") newErrors.customerName = errors.customerName
        //=============================================positionOnRoute============================================
        if (formData.positionOnRoute === "") newErrors.positionOnRoute = "Required"
        else if (formData.positionOnRoute !== "") newErrors.positionOnRoute = errors.positionOnRoute
        //=============================================indentFor==================================================
        if (formData.indentFor === "") newErrors.indentFor = "Required"
        else if (formData.indentFor !== "") newErrors.indentFor = errors.indentFor
        //=============================================billRoute==================================================
        if (formData.billRoute === false) newErrors.billRoute = ""
        else if (formData.billRoute !== "") newErrors.billRoute = errors.billRoute
        //=============================================indentRoute=================================================
        if (formData.indentRoute === false) newErrors.indentRoute = ""
        else if (formData.indentRoute !== "") newErrors.indentRoute = errors.indentRoute
        //=============================================batch=================================================
        if (formData.batch === "") newErrors.batch = "Required"
        else if (formData.batch !== "") newErrors.batch = errors.batch
        return newErrors
    }
    const handleFieldChange = async (fieldName, value) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: ""
        }))
        //=============================================batch==================================================
        if (fieldName === "batch") {
            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Required"
                }))
                setRouteNames([])
            }
            DD_RouteName(value)
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value,
            }))
        }
        //=============================================routeName==================================================
        if (fieldName === "routeName") {
            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Required"
                }))
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value,
            }))
        }
        //=============================================customerName===============================================
        if (fieldName === "customerName") {
            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Required"
                }))
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value,
            }))
        }
        //=============================================positionOnRoute============================================
        if (fieldName === 'positionOnRoute') {
            if (value === '') {
                setFormData((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Required",
                }));
            }
            else if (!/^\d{0,4}(\.\d{1,4})?$/.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Invalid position On Route",
                }))
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //=============================================indentFor==================================================
        if (fieldName === "indentFor") {
            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Required"
                }))
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value,
            }))
        }
        //=============================================billRoute==================================================
        if (fieldName === "billRoute") {
            if (formData.batch === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    batch: "Please choose batch First"
                }))
                setFormData((prevdata) => ({
                    ...prevdata,
                    [fieldName]: false,
                }))
            }
            else if (formData.batch !== "" && formData.routeName === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    batch: "",
                    routeName: "Please choose Route First"
                }))
                setFormData((prevdata) => ({
                    ...prevdata,
                    [fieldName]: false,
                }))
            }
            else if (formData.batch !== "" && formData.routeName !== "" && formData.customerName === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    batch: "",
                    routeName: "",
                    customerName: "Please choose Route First"
                }))
                setFormData((prevdata) => ({
                    ...prevdata,
                    [fieldName]: false,
                }))
            }
            else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: ""
                }))
                setFormData((prevdata) => ({
                    ...prevdata,
                    [fieldName]: true,
                }))
            }
            mulitpleBillRoute()
        }
        //=============================================indentRoute================================================
        if (fieldName === "indentRoute") {
            if (formData.batch === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    batch: "Please choose batch First"
                }))
                setFormData((prevdata) => ({
                    ...prevdata,
                    [fieldName]: false,
                }))
            }
            else if (formData.batch !== "" && formData.routeName === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    batch: "",
                    routeName: "Please choose Route First"
                }))
                setFormData((prevdata) => ({
                    ...prevdata,
                    [fieldName]: false,
                }))
            }
            else if (formData.batch !== "" && formData.routeName !== "" && formData.customerName === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    batch: "",
                    routeName: "",
                    customerName: "Please choose Route First"
                }))
                setFormData((prevdata) => ({
                    ...prevdata,
                    [fieldName]: false,
                }))
            }
            else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: ""
                }))
                setFormData((prevdata) => ({
                    ...prevdata,
                    [fieldName]: true,
                }))
            }
            multipleIndentRoute()
        }

    }
    const handleClear = () => {
        setSaveButton(true)
        setUpdateButton(false)
        setErrors({})
        setFormData({
            routeName: '',
            customerName: "",
            positionOnRoute: "",
            indentFor: "",
            billRoute: false,
            indentRoute: false,
            batch: "",
        })
        setRouteNames([])
    }


    const handleUpdate = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
        if (!hasErrors) {
            const newRecord = {
                "route_code": Number(formData.routeName),
                "customer_code": Number(formData.customerName),
                "pos_on_route": Number(formData.positionOnRoute),
                "days": null,
                "indent_for": formData.indentFor,
                "bill_route": formData.billRoute ? "Y" : "N",
                "indent_route": formData.indentRoute ? "Y" : "N",
                "dist_batch_no": Number(formData.batch),
            }
            // const valid = false
            // if (formData.indentRoute === true) {
            //     const resposne = await CustomerRouteApi.PacketsUnitsAPi_master().indentRouteValidation(formData.batch, formData.customerName)
            //     console.log(resposne);
            //     console.log(resposne.data.items.length);
            //     if (resposne.data.items.length === 0 || resposne.data.items[0].status === null) {
            //         valid = true
            //         console.log("hi");
            //     }
            //     else if (resposne.data.items.length !== 0) {
            //         const indentRouteExits = {
            //             cust_route_id: resposne.data.items[0].cust_route_id,
            //             customer_code: resposne.data.items[0].customer_code,
            //             dist_batch_no: resposne.data.items[0].dist_batch_no,
            //             route_code: resposne.data.items[0].route_code,
            //             indent_route: resposne.data.items[0].indent_route,
            //             dist_batch_name: resposne.data.items[0].dist_batch_name,
            //             route_name: resposne.data.items[0].route_name,
            //         }
            //         if (resposne.data.items[0].status === 1) {
            //             const { route_name } = routeNames.find(option => option.route_code === formData.routeName)
            //             console.log(routeNames.find(option => option.route_code === formData.routeName));
            //             Swal.fire({
            //                 title: "Route Exits",
            //                 text: `Indent Route Exist for ${indentRouteExits.dist_batch_name}  batch and ${indentRouteExits.route_name} Route would you like to change this to ${route_name}`,
            //                 showDenyButton: true,
            //                 confirmButtonText: "Save",
            //                 icon: "warning",
            //                 confirmButtonText: "Yes",
            //                 reverseButtons: true,
            //                 denyButtonText: `NO `
            //             })
            //                 .then(async (result) => {
            //                     if (result.isConfirmed) {
            //                         try {
            //                             await CustomerRouteApi.PacketsUnitsAPi_master().indetupdate(indentRouteExits.cust_route_id, {
            //                                 indent_route: "N",
            //                             })
            //                             await CustomerRouteApi.PacketsUnitsAPi_master().update(customerRouteId, newRecord)
            //                             fetchData()
            //                         } catch (error) {
            //                             Swal.fire("Error", 'Unknown Error', "error")
            //                         }
            //                     }
            //                     else if (result.isDenied) {
            //                         // Swal.fire("Changes are not saved", "", "info");
            //                     }
            //                 })
            //             valid = false;
            //         }

            //     }
            // }
            // else if (formData.indentRoute === false) {
            //     valid = true
            // }
            // else if (formData.billRoute === true) {
            //     const resposne = await CustomerRouteApi.PacketsUnitsAPi_master().billRouteValidation(formData.customerName)
            //     console.log(resposne);
            // }
            // else if (formData.billRoute === false) {
            //     valid = true
            // }

            try {
                const response = await CustomerRouteApi.PacketsUnitsAPi_master().update(customerRouteId, newRecord)
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

    const mulitpleBillRoute = async () => {
        // const newRecord = {
        //     "route_code": Number(formData.routeName),
        //     "customer_code": Number(formData.customerName),
        //     "pos_on_route": Number(formData.positionOnRoute),
        //     "days": null,
        //     "indent_for": formData.indentFor,
        //     "indent_route": "Y",
        //     "bill_route": "N",
        //     "dist_batch_no": Number(formData.batch),
        // }
        const resposne = await CustomerRouteApi.PacketsUnitsAPi_master().billRouteValidation(formData.customerName)
        if (resposne.data.items.length === 0 || resposne.data.items[0].status === null) {

        }
        else if (resposne.data.items.length !== 0) {
            const billRoutes = {
                bill_route: resposne.data.items[0].bill_route,
                cust_route_id: resposne.data.items[0].cust_route_id,
                customer_code: resposne.data.items[0].customer_code,
                dist_batch_name: resposne.data.items[0].dist_batch_name,
                dist_batch_no: resposne.data.items[0].dist_batch_no,
                route_code: resposne.data.items[0].route_code,
                route_name: resposne.data.items[0].route_name,
            }
            if (resposne.data.items[0].status === 1) {
                const { route_name } = routeNames.find(option => option.route_code === formData.routeName)
                const billRouteExits = await Swal.fire({
                    title: "Route Exits",
                    text: `Bill Route Exist  ${billRoutes.dist_batch_name}  batch and ${billRoutes.route_name} Route would you like to change this to ${route_name}`,
                    showDenyButton: true,
                    icon: "warning",
                    confirmButtonText: "Yes",
                    reverseButtons: true,
                    denyButtonText: `NO `
                })
                if (billRouteExits.isConfirmed) {
                    try {
                        const response = await CustomerRouteApi.PacketsUnitsAPi_master().billupadte(billRoutes.cust_route_id, { bill_route: "N" })
                        if (response.data.Status === 1) { fetchData() }
                        else {
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
                    // const response = await CustomerRouteApi.PacketsUnitsAPi_master().create(newRecord)
                    // try {
                    //     if (response.data.Status === 1) {
                    //         Swal.fire({
                    //             title: 'Saved',
                    //             text: 'Saved Sucessfully',
                    //             icon: 'success',
                    //             customClass: {
                    //                 container: 'custom-swal-container'
                    //             }
                    //         });
                    //         handleClear()
                    //         fetchData()
                    //         localStorage.setItem("Navigation_state", true)
                    //     } else {
                    //         Swal.fire({
                    //             title: 'Error',
                    //             text: `${response.data.Error}` || 'Unknown Error',
                    //             icon: 'error',
                    //             customClass: {
                    //                 container: 'custom-swal-container'
                    //             }
                    //         });
                    //     }
                    // } catch (error) {
                    //     Swal.fire({
                    //         title: 'Error',
                    //         text: 'Unknown Error',
                    //         icon: 'error',
                    //         customClass: {
                    //             container: 'custom-swal-container'
                    //         }
                    //     });
                    // }
                }
                if (billRouteExits.isDenied) {
                    setFormData((prevdata) => ({
                        ...prevdata,
                        billRoute: false
                    }))
                }
            }
        }
    }

    const multipleIndentRoute = async () => {
        // const newRecord = {
        //     "route_code": Number(formData.routeName),
        //     "customer_code": Number(formData.customerName),
        //     "pos_on_route": Number(formData.positionOnRoute),
        //     "days": null,
        //     "indent_for": formData.indentFor,
        //     "indent_route": "Y",
        //     "bill_route": "N",
        //     "dist_batch_no": Number(formData.batch),
        // }
        const resposne = await CustomerRouteApi.PacketsUnitsAPi_master().indentRouteValidation(formData.batch, formData.customerName)
        if (resposne.data.items.length === 0 || resposne.data.items[0].status === null) {

        }
        else if (resposne.data.items.length !== 0) {
            const indentRouteExits = {
                cust_route_id: resposne.data.items[0].cust_route_id,
                customer_code: resposne.data.items[0].customer_code,
                dist_batch_no: resposne.data.items[0].dist_batch_no,
                route_code: resposne.data.items[0].route_code,
                indent_route: resposne.data.items[0].indent_route,
                dist_batch_name: resposne.data.items[0].dist_batch_name,
                route_name: resposne.data.items[0].route_name,
            }
            if (resposne.data.items[0].status === 1) {
                const { route_name } = routeNames.find(option => option.route_code === formData.routeName)
                const indentRoute = await Swal.fire({
                    title: "Route Exits",
                    text: `Indent Route Exist  ${indentRouteExits.dist_batch_name}  batch and ${indentRouteExits.route_name} Route would you like to change this to ${route_name}`,
                    showDenyButton: true,
                    icon: "warning",
                    confirmButtonText: "Yes",
                    reverseButtons: true,
                    denyButtonText: `NO `
                })
                if (indentRoute.isConfirmed) {
                    try {
                        const response = await CustomerRouteApi.PacketsUnitsAPi_master().indetupdate(indentRouteExits.cust_route_id, {
                            indent_route: "N",
                        })
                        if (response.data.Status === 1) {
                            fetchData()
                        }
                        else {
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
                    // try {
                    //     const response = await CustomerRouteApi.PacketsUnitsAPi_master().create(newRecord)
                    //     console.log(response);
                    //     if (response.data.Status === 1) {
                    //         Swal.fire({
                    //             title: 'Saved',
                    //             text: 'Saved Sucessfully',
                    //             icon: 'success',
                    //             customClass: {
                    //                 container: 'custom-swal-container'
                    //             }
                    //         });
                    //         handleClear()
                    //         fetchData()
                    //         localStorage.setItem("Navigation_state", true)
                    //     } else {
                    //         Swal.fire({
                    //             title: 'Error',
                    //             text: `${response.data.Error}` || 'Unknown Error',
                    //             icon: 'error',
                    //             customClass: {
                    //                 container: 'custom-swal-container'
                    //             }
                    //         });
                    //     }
                    // } catch (error) {
                    //     Swal.fire({
                    //         title: 'Error',
                    //         text: 'Unknown Error',
                    //         icon: 'error',
                    //         customClass: {
                    //             container: 'custom-swal-container'
                    //         }
                    //     });
                    // }

                }
                if (indentRoute.isDenied) {
                    setFormData((prevdata) => ({
                        ...prevdata,
                        indentRoute: false
                    }))
                }
            }

        }



    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        setErrors(validationErorrs)
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
        if (!hasErrors) {
            const newRecord = {
                "route_code": Number(formData.routeName),
                "customer_code": Number(formData.customerName),
                "pos_on_route": Number(formData.positionOnRoute),
                "days": null,
                "indent_for": formData.indentFor,
                "bill_route": formData.billRoute ? "Y" : "N",
                "indent_route": formData.indentRoute ? "Y" : "N",
                "dist_batch_no": Number(formData.batch),
            }
            try {
                const response = await CustomerRouteApi.PacketsUnitsAPi_master().create(newRecord)
                console.log(response);
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
            field: 'cust_route_id',
            headerName: 'Customer Route ID',
            width: 150,
        },
        {
            field: 'dist_batch_name',
            headerName: 'Distbution Batch Name',
            width: 150,
        },
        {
            field: 'route_code',
            headerName: 'Route Code',
            width: 150,
        },
        {
            field: 'route_name',
            headerName: 'Route Name',
            width: 150,
        },
        {
            field: 'customer_code',
            headerName: 'Customer Code',
            width: 150,
        },
        {
            field: 'customer_name',
            headerName: 'Customer Name',
            width: 150,
        },
        {
            field: 'dist_batch_no',
            headerName: 'Distbution Batch Number',
            width: 150,
        },

        {
            field: 'pos_on_route',
            headerName: 'Position On Route',
            width: 70,
            type: 'number'
        },
        {
            field: 'indent_for',
            headerName: 'Indent For',
            width: 100,
            valueGetter: (params) => {
                const value = params.row.indent_for
                return value === "TOD" ? "TODAY" : "TOMORROW"
            }
        },
        {
            field: 'indent_route',
            headerName: 'Indent Route',
            width: 150,
            valueGetter: (params) => {
                const value = params.row.indent_route
                return value === "Y" ? "YES" : "NO"
            }
        },
        {
            field: 'bill_route',
            headerName: 'Bill Route',
            width: 150,
            valueGetter: (params) => {
                const value = params.row.bill_route
                return value === "Y" ? "YES" : "NO"
            }
        },
        {
            field: 'dist_batch_no',
            headerName: 'Distrubution Batch Number',
            width: 150,
        },
    ];

    const handleEdit = async (row) => {
        setCustomerRouteId(row.cust_route_id)
        setUpdateButton(true)
        setSaveButton(false)
        setErrors({})
        await DD_RouteName(row.dist_batch_no)
        let bill_route = null;
        let indent_route = null;
        if (row.bill_route === "Y") bill_route = true
        else if (row.bill_route === "N") bill_route = false

        if (row.indent_route === "Y") indent_route = true
        else if (row.indent_route === "N") indent_route = false
        setFormData((prevdata) => ({
            ...prevdata,
            routeName: row.route_code,
            customerName: row.customer_code,
            positionOnRoute: row.pos_on_route,
            indentFor: row.indent_for,
            billRoute: bill_route,
            indentRoute: indent_route,
            batch: row.dist_batch_no,
        }))
    }
    const handleRadio = (e) => {
        const { value } = e.target;
        if (value === "route") {
            setSearchRoute(true)
            setSeacrchCustomerName(false)
            fetchData()
        }
        if (value === "Name") {
            setSearchRoute(false)
            setSeacrchCustomerName(true)
            fetchData()
        }

    }
    const handlefieldChangeSearch = (fieldname, value) => {
        if (fieldname === "Route") {
            if (value === "") { fetchData(); setRouteSearch(value) }
            else if (value) setRouteSearch(value)

        }

        if (fieldname === "name") {
            if (value === "") { fetchData(); setCustomerSearch(value) }
            else if (value) setCustomerSearch(value)
        }
    }
    const handleSearch = async () => {
        if (searchRoute) {
            if (routeSearch === "" || routeSearch === null) {
                Swal.fire({
                    title: "select a value to search",
                    timer: 1500,
                    icon: 'warning',
                    showConfirmButton: false
                })
                fetchData()
            }
            else {
                try {
                    const respone = await CustomerRouteApi.PacketsUnitsAPi_master().searchRouteName(routeSearch)
                    if (respone.status === 200) {
                        setRows(respone.data.items);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        if (seacrchCustomerName) {
            if (customerSearch === "" || customerSearch === null) {
                Swal.fire({
                    title: "select a value to search",
                    timer: 1500,
                    icon: 'warning',
                    showConfirmButton: false
                })
                fetchData()
            }
            else {
                try {
                    const respone = await CustomerRouteApi.PacketsUnitsAPi_master().searchCustomerName(customerSearch)
                    if (respone.status === 200) {
                        setRows(respone.data.items);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
    const DD_RouteName = async (id) => {
        try {
            const respone = await CustomerRouteApi.PacketsUnitsAPi_master().dd_RouteNames(id)
            if (respone.status === 200) {
                setRouteNames(respone.data.items);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const DD_CustomerName = async () => {
        try {
            const respone = await CustomerRouteApi.PacketsUnitsAPi_master().dd_CustomerName()
            if (respone.status === 200) {
                setCustomerNames(respone.data.items);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const DD_Batch_Name = async () => {
        try {
            const respone = await CustomerRouteApi.PacketsUnitsAPi_master().dd_fetch_distribution_batch_name()
            if (respone.status === 200) {
                setBatchNames(respone.data.items);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const fetchData = async () => {
        try {
            const respone = await CustomerRouteApi.PacketsUnitsAPi_master().fetchAll()
            if (respone.status === 200) {
                setRows(respone.data.items);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const DDSearchRoute = async () => {
        try {
            const respone = await CustomerRouteApi.PacketsUnitsAPi_master().dd_searchRoute()
            if (respone.status === 200) {
                setDDRouteSearch(respone.data.items);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const DDSearchCustomerName = async () => {
        try {
            const respone = await CustomerRouteApi.PacketsUnitsAPi_master().dd_CustomerName()
            if (respone.status === 200) {
                setDDCustomerSearch(respone.data.items);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        DD_CustomerName()
        DD_Batch_Name()
        fetchData()
        DDSearchRoute()
        DDSearchCustomerName()
        document.title = "Customer Route"
    }, [])
    return (
        <>
            {/* ====================================================================================== */}
            <Grid container spacing={2}>
                <Grid item md={10} lg={10} sm={12} xs={12}>
                    {/* =================================Paper=========================================== */}
                    <Paper sx={{ padding: 2 }} elevation={3}>
                        <Grid container spacing={2} mb={2}>
                            <Grid item md={3} lg={3} sm={12} xs={12}>
                                <Typography variant='h5'>
                                    Customer Route
                                </Typography>
                            </Grid>
                            {/* =====================  */}
                            <Grid item md={4} lg={4} sm={12} xs={12} style={{ marginTop: "-8px" }}>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="Search"
                                        onChange={(e) => { handleRadio(e) }}
                                    >
                                        <FormControlLabel
                                            value="route"
                                            control={<Radio style={{ fontSize: 14 }} checked={searchRoute} />}
                                            label={<span style={{ fontSize: 12, fontWeight: "bolder" }}>Route</span>}
                                        />
                                        <FormControlLabel
                                            value="Name"
                                            control={<Radio style={{ fontSize: 14 }} checked={seacrchCustomerName} />}
                                            label={<span style={{ fontSize: 12, fontWeight: "bolder" }}>Customer Name</span>}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            {searchRoute && (
                                <Grid item md={3} lg={3} sm={12} xs={12}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={DDrouteSearch}
                                        getOptionLabel={(options) => options.route_name}
                                        isOptionEqualToValue={(option, value) => option.route_code === value.route_code}
                                        onChange={(event, value) => handlefieldChangeSearch("Route", value?.route_code || "")}
                                        value={DDrouteSearch.find(item => item.route_code === routeSearch) || null}
                                        size='small'
                                        fullWidth
                                        sx={autoCompleteStyle}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                label="Route"
                                            />}
                                    />
                                </Grid>
                            )}
                            {seacrchCustomerName && (
                                <Grid item md={3} lg={3} sm={12} xs={12}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={DDCustomerSearch}
                                        getOptionLabel={(options) => options.customer_name}
                                        isOptionEqualToValue={(option, value) => option.customer_code === value.customer_code}
                                        onChange={(event, value) => handlefieldChangeSearch("name", value?.customer_code || "")}
                                        value={DDCustomerSearch.find(item => item.customer_code === customerSearch) || null}
                                        size='small'
                                        fullWidth
                                        sx={autoCompleteStyle}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                label="Customer Name"
                                            />}
                                    />
                                </Grid>
                            )}
                            <Grid item md={2} lg={2} sm={12} xs={12}>
                                <Button variant="contained"
                                    size='small'
                                    onClick={handleSearch}
                                >
                                    <SearchTwoToneIcon />
                                </Button>
                            </Grid>
                        </Grid>
                        {/* ============================  */}
                        <Grid container spacing={2} >
                            {/* =========================Batch======================== */}
                            <Grid item md={2.5} lg={2.5} sm={12} xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size='small'
                                    fullWidth
                                    options={batchNames}
                                    sx={autoCompleteStyle}
                                    getOptionLabel={(options) => options.dist_batch_name}
                                    isOptionEqualToValue={(option, value) => option.dist_batch_no === value.dist_batch_no}
                                    value={batchNames.find(option => option.dist_batch_no === formData.batch) || null}
                                    onChange={(e, v) => handleFieldChange("batch", v?.dist_batch_no || "")}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Batch"
                                            required
                                            error={Boolean(errors.batch)}
                                            helperText={errors.batch}
                                        />}
                                />
                            </Grid>
                            {/* =========================Route Name======================== */}
                            <Grid item md={4} lg={4} sm={12} xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size='small'
                                    fullWidth
                                    options={routeNames}
                                    sx={autoCompleteStyle}
                                    getOptionLabel={(options) => options.route_name}
                                    isOptionEqualToValue={(option, value) => option.route_code === value.route_code}
                                    value={routeNames.find(option => option.route_code === formData.routeName) || null}
                                    onChange={(e, v) => handleFieldChange("routeName", v?.route_code || "")}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Route Name"
                                            required
                                            error={Boolean(errors.routeName)}
                                            helperText={errors.routeName}
                                        />}
                                />
                            </Grid>
                            {/* =========================Customer Name======================== */}
                            <Grid item md={4} lg={4} sm={12} xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size='small'
                                    fullWidth
                                    options={customerNames}
                                    sx={autoCompleteStyle}
                                    getOptionLabel={(options) => options.customer_name}
                                    isOptionEqualToValue={(option, value) => option.customer_code === value.customer_code}
                                    value={customerNames.find(option => option.customer_code === formData.customerName) || null}
                                    onChange={(e, v) => handleFieldChange("customerName", v?.customer_code || "")}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Customer Name"
                                            required
                                            error={Boolean(errors.customerName)}
                                            helperText={errors.customerName}
                                        />}
                                />
                            </Grid>
                            {/* =========================Position on route======================== */}
                            <Grid item md={2.5} lg={2.5} sm={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Position on route"
                                    variant="outlined"
                                    size='small'
                                    name='statusName'
                                    required
                                    sx={textFiledStyle}
                                    fullWidth
                                    value={formData.positionOnRoute}
                                    onChange={(e) => handleFieldChange("positionOnRoute", e.target.value.replace(/[^0-9.]/g, '').replace(/(\.\d{4})\d*$/, '$1'))}
                                    error={Boolean(errors.positionOnRoute)}
                                    helperText={errors.positionOnRoute}
                                />
                            </Grid>
                            {/* =========================Indent For======================== */}
                            <Grid item md={3} lg={3} sm={12} xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size='small'
                                    fullWidth
                                    options={Indent_For}
                                    sx={autoCompleteStyle}
                                    getOptionLabel={(options) => options.name}
                                    isOptionEqualToValue={(option, value) => option.value === value.value}
                                    value={Indent_For.find(option => option.value === formData.indentFor) || null}
                                    onChange={(e, v) => handleFieldChange("indentFor", v?.value || "")}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Indent For"
                                            required
                                            error={Boolean(errors.indentFor)}
                                            helperText={errors.indentFor}
                                        />}
                                />
                            </Grid>
                            {/* =========================Bill Route======================== */}
                            <Grid item md={2.3} lg={2.3} sm={12} xs={12}>
                                <FormControl error={Boolean(errors.billRoute)}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                size="small"
                                                checked={formData.billRoute}
                                                sx={{
                                                    color: cyan[500],
                                                    '&.Mui-checked': {
                                                        color: cyan[900],
                                                    },
                                                }}
                                                onChange={(e, v) => handleFieldChange("billRoute", v)}
                                            />
                                        }
                                        label="Bill Route"
                                    />
                                    <FormHelperText>{errors.billRoute}</FormHelperText>
                                </FormControl>
                            </Grid>
                            {/* =========================Indent Route======================== */}
                            <Grid item md={3} lg={3} sm={12} xs={12}>
                                <FormControl error={Boolean(errors.indentRoute)}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                size="small"
                                                checked={formData.indentRoute}
                                                sx={{
                                                    color: cyan[500],
                                                    '&.Mui-checked': {
                                                        color: cyan[900],
                                                    },
                                                }}
                                                onChange={(e, v) => handleFieldChange("indentRoute", v)}
                                            />
                                        }
                                        label="App Indent Route"
                                    />
                                    <FormHelperText>{errors.indentRoute}</FormHelperText>
                                </FormControl>
                            </Grid>
                            {/* =========================Button======================== */}
                            <Grid item md={12} lg={12} sm={12} xs={12}>
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
                                    <Button variant="contained"
                                        onClick={handleClear}
                                        color="error"
                                        size='small'>
                                        Clear
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>
                    {/* =================================Paper=========================================== */}
                    <Paper elevation={3}>
                        <Grid xs={12} sm={12} md={12} lg={12}>
                            <Box sx={{ height: 305, width: '100%', marginTop: '20px' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    getRowId={(row) => row.cust_route_id.toString()}
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
                </Grid>
            </Grid>
        </>
    )
}