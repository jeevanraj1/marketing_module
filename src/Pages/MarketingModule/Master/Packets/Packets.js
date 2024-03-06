import { Grid, Paper, TextField, Autocomplete, Typography, Box, Button, Modal, Stack, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { PacketsApi } from '../../../Api';
import Swal from 'sweetalert2';
import PacketsImages from './PacketsImages';
import dayjs from 'dayjs';

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
const datePickerStyle = {
    width: "100%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
      borderWidth: "2px",
      height: "33px",
      paddingBottom: "5px",

    },
  },
  "& input": {
    height: "11px",
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
    fontSize: 14,
    fontWeight: "bold",
    marginTop: "-1px",
  },
}
const Milk_Or_Product = [
    { Name: "MILK", value: 0 },
    { Name: "PRODUCT", value: 1 },
]
const Supplied_In_Crates = [
    { Name: "YES", value: 0 },
    { Name: "NO", value: 1 }
]
const Terminated = [
    { Name: "YES", value: 1 },
    { Name: "NO", value: 0 }
]
const Issue_In_Utp_rate = [
    { Name: "YES", value: "Y" },
    { Name: "NO", value: "N" }
]
const Make_Zero_In_Reset_Indent = [
    { Name: "YES", value: 1 },
    { Name: "NO", value: 0 }
]
const Allow_In_Both = [
    { Name: "YES", value: "Y" },
    { Name: "NO", value: "N" }
]
const Display_In_App = [
    { Name: "YES", value: 1 },
    { Name: "NO", value: 0 }
]
const Display_In_Route_Sheet = [
    { Name: "ACROSS", value: "A" },
    { Name: "DOWN", value: "D" }
]
const Indent_In = [
    { Name: "CRATE", value: "C" },
    { Name: "PACKET", value: "P" }
]
export default function Packets() {
    const navigate = useNavigate()
    const location = useLocation()
    const [updateButton, setUpdateButton] = useState(false);
    const [saveButton, setSaveButton] = useState(true);
    const [enableImageGrid, setEnableImageGrid] = useState(false);

    const [formData, setFormData] = useState({
        // ======================================1.Variant Details===============================
        usersCode: '',
        packetName: '',
        packetAlias: '',
        milkOrProduct: '',
        productName: '',
        unitName: '',
        packetSize: '',   //pack_size
        packetsPerCrate: 0,  //crate_or_not 
        suppliedInCrates: '', //crates
        tERMINATED: '',
        issueInUtpRate: '', //utp_issue  
        // ======================================2.Tax Details===============================
        HsnCode: '', //sac_no
        gST: '',
        cGST: '',
        sGST: '',
        iGST: '',
        // ======================================3.Route Sheet Settings====================================
        pOSITION: '', //packet_position
        makeZeroinResetIndent: '',  //make_zero
        displayinRouteSheet: '', //packet_type
        // ======================================4.App Settings=================================
        indentIn: '',
        allowInBoth: '',
        notifyQuantity: '',
        cATEGORY: '',
        displayInApp: '', //selected
        shelfLife: '',
        minOrderQty: '',
        maxOrderQty: '',
        // ======================================5.Rates=================================
        mRP: '',
        dealersCommission: '',
        sUBSIDY: '',
        //lastRateModifiedDate: ''

    });
    const [errors, setErrors] = useState({});
    const [productNamesDD, setProductNamesDD] = useState([]);
    const [unitDD, setUnitDD] = useState([]);
    const [categoriesDD, setcategoriesDD] = useState([]);
    const [packetCode, setPacketCode] = useState(null);

    const validation = () => {
        const newErrors = {}
        // ======================================1.Variant Details===============================

        // ======================================usersCode=================================
        if (formData.usersCode === "") newErrors.usersCode = "Required"
        else if (formData.usersCode !== "") newErrors.usersCode = errors.usersCode
        // ======================================packetName=================================
        if (formData.packetName === "") newErrors.packetName = "Required"
        else if (formData.packetName !== "") newErrors.packetName = errors.packetName
        // ======================================packetAlias=================================
        if (formData.packetAlias === "") newErrors.packetAlias = "Required"
        else if (formData.packetAlias !== "") newErrors.packetAlias = errors.packetAlias
        // ======================================milkOrProduct=================================
        if (formData.milkOrProduct === '') newErrors.milkOrProduct = "Required"
        else if (formData.milkOrProduct !== "") newErrors.milkOrProduct = errors.milkOrProduct
        // ======================================productName=================================
        if (formData.productName === '') newErrors.productName = "Required"
        else if (formData.productName !== "") newErrors.productName = errors.productName
        // ======================================unitName=================================
        if (formData.unitName === '') newErrors.unitName = "Required"
        else if (formData.unitName !== "") newErrors.unitName = errors.unitName
        // ======================================packetSize=================================
        if (formData.packetSize === '') newErrors.packetSize = "Required"
        else if (formData.packetSize !== "") newErrors.packetSize = errors.packetSize
        // ======================================packetsPerCrate=================================
        if (formData.packetsPerCrate === '') newErrors.packetsPerCrate = "Required"
        else if (formData.packetsPerCrate !== "") newErrors.packetsPerCrate = errors.packetsPerCrate
        // ======================================suppliedInCrates=================================
        if (formData.suppliedInCrates === '') newErrors.suppliedInCrates = "Required"
        else if (formData.suppliedInCrates !== "") newErrors.suppliedInCrates = errors.suppliedInCrates
        // ======================================tERMINATED=================================
        if (formData.tERMINATED === '') newErrors.tERMINATED = "Required"
        else if (formData.tERMINATED !== "") newErrors.tERMINATED = errors.tERMINATED
        // ======================================issueInUtpRate=================================
        if (formData.issueInUtpRate === '') newErrors.issueInUtpRate = "Required"
        else if (formData.issueInUtpRate !== "") newErrors.issueInUtpRate = errors.issueInUtpRate

        // ======================================2.Tax Details===========================


        // ======================================HsnCode=================================
        if (formData.HsnCode === '') newErrors.HsnCode = "Required"
        else if (formData.HsnCode !== "") newErrors.HsnCode = errors.HsnCode
        // ======================================gST=================================
        if (formData.gST === "") newErrors.gST = "Required"
        else if (formData.gST !== "") newErrors.gST = errors.gST
        // ======================================cGST=================================
        if (formData.cGST === "") newErrors.cGST = 'Required'
        else if (formData.cGST !== "") newErrors.cGST = errors.cGST
        // ======================================sGST=================================
        if (formData.sGST === "") newErrors.sGST = 'Required'
        else if (formData.sGST !== "") newErrors.sGST = errors.sGST
        // ======================================iGST=================================
        if (formData.iGST === "") newErrors.iGST = 'Required'
        else if (formData.iGST !== "") newErrors.iGST = errors.iGST

        // ======================================3.Route Sheet Settings==================

        // ======================================pOSITION=================================
        if (formData.pOSITION === '') newErrors.pOSITION = 'Required'
        else if (formData.pOSITION !== "") newErrors.pOSITION = errors.pOSITION
        // ======================================makeZeroinResetIndent=================================
        if (formData.makeZeroinResetIndent === '') newErrors.makeZeroinResetIndent = 'Required'
        else if (formData.makeZeroinResetIndent !== "") newErrors.makeZeroinResetIndent = errors.makeZeroinResetIndent
        // ======================================displayinRouteSheet =================================
        if (formData.displayinRouteSheet === '') newErrors.displayinRouteSheet = "Required"
        else if (formData.displayinRouteSheet !== "") newErrors.displayinRouteSheet = errors.displayinRouteSheet

        // ======================================4.App Settings==========================

        // ======================================indentIn=================================
        if (formData.indentIn === '') newErrors.indentIn = "Required"
        else if (formData.indentIn !== "") newErrors.indentIn = errors.indentIn
        // ======================================allowInBoth=================================
        if (formData.allowInBoth === '') newErrors.allowInBoth = "Required"
        else if (formData.allowInBoth !== "") newErrors.allowInBoth = errors.allowInBoth
        // ======================================notifyQuantity=================================
        if (formData.notifyQuantity === '') newErrors.notifyQuantity = "Required"
        else if (formData.notifyQuantity !== "") newErrors.notifyQuantity = errors.notifyQuantity
        // ======================================cATEGORY=================================
        if (formData.cATEGORY === '') newErrors.cATEGORY = "Required"
        else if (formData.cATEGORY !== "") newErrors.cATEGORY = errors.cATEGORY
        //========================================displayInApp  =============================
        if (formData.displayInApp === '') newErrors.displayInApp = "Required"
        else if (formData.displayInApp !== "") newErrors.displayInApp = errors.displayInApp
        //======================================shelfLife=================================
        if (formData.shelfLife === '') newErrors.shelfLife = "Required"
        else if (formData.shelfLife !== "") newErrors.shelfLife = errors.shelfLife
        // ======================================minOrderQty=================================
        if (formData.minOrderQty === '') newErrors.minOrderQty = "Required"
        else if (formData.minOrderQty !== "") newErrors.minOrderQty = errors.minOrderQty
        //==========================================maxOrderQty  =============================
        if (formData.maxOrderQty === '') newErrors.maxOrderQty = "Required"
        else if (formData.maxOrderQty !== "") newErrors.maxOrderQty = errors.maxOrderQty

        //=======================================5.Rates=================================

        //======================================mRP======================================
        if (formData.mRP === '') newErrors.mRP = "Required"
        else if (formData.mRP !== "") newErrors.mRP = errors.mRP
        //=====================================dealersCommission==========================
        if (formData.dealersCommission === '') newErrors.dealersCommission = "Required"
        else if (formData.dealersCommission !== "") newErrors.dealersCommission = errors.dealersCommission
        //======================================sUBSIDY===================================
        if (formData.sUBSIDY === '') newErrors.sUBSIDY = "Required"
        else if (formData.sUBSIDY !== "") newErrors.sUBSIDY = errors.sUBSIDY

        return newErrors

    }


    const fetchProductNames = async () => {
        try {
            const response = await PacketsApi.PacketsAPI_master().DD_fetch_product_name()
            if (response.status === 200) {
                setProductNamesDD(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchUnitNames = async () => {
        try {
            const response = await PacketsApi.PacketsAPI_master().DD_fetch_unit_name()
            if (response.status === 200) {
                setUnitDD(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const fetchCategoryNames = async () => {
        try {
            const response = await PacketsApi.PacketsAPI_master().DD_fetch_category_name()
            if (response.status === 200) {
                setcategoriesDD(response.data.items)
            }
        } catch (error) {
            console.log(error);
        }
    }


    const handleFieldChange = async (fieldName, value) => {
        localStorage.setItem("Navigation_state", false)
        // ======================================1.Variant Details=================================

        // ======================================usersCode=================================
        if (fieldName === "usersCode") {

            if (value.trim() === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    usersCode: "Required",
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
            else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    usersCode: "",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }

        // ======================================packetName=================================
        if (fieldName === "packetName") {

            if (value.trim() === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    packetName: "Required",
                }));
            }
            else if (value.trim().length > 40) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    packetName: "Value must be Not More than 40 Characters",
                }));
                value = value.substring(0, 40)
                setTimeout(() => {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        packetName: "",
                    }))
                }, 1000)
            }
            else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    packetName: "",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // ======================================packetAlias=================================
        if (fieldName === "packetAlias") {

            if (value.trim() === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    packetAlias: "Required",
                }));
            }
            else if (value.trim().length > 10) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    packetAlias: "Value must be Not More than 10 Characters",
                }));
                value = value.substring(0, 10)
                setTimeout(() => {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        packetAlias: "",
                    }))
                }, 1000)
            }
            else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    packetAlias: "",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //====================================milkOrProduct============================================
        if (fieldName === "milkOrProduct") {
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
                [fieldName]: value?.value
            }));
        }
        //====================================productName============================================
        if (fieldName === "productName") {
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
        //====================================unitName============================================
        if (fieldName === "unitName") {
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
        //====================================packetSize============================================
        if (fieldName === 'packetSize') {

            if (value?.trim() === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Required",
                }));
            }
            else if (!/^\d{0,5}(\.\d{1,3})?$/.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Invalid Packet Size",
                }))
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "",
                }));
            }

            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))

        }
        //====================================issueInUtpRate============================================
        if (fieldName === "issueInUtpRate") {
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
        //====================================suppliedInCrates============================================
        if (fieldName === "suppliedInCrates") {
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
                [fieldName]: value?.value
            }));
        }
        // ======================================packetsPerCrate=================================
        if (fieldName === "packetsPerCrate") {

            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    packetsPerCrate: "Required",
                }));
            }
            else if (value.trim().length > 4) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    packetsPerCrate: "Value Must Not Be More Than 4 Digits",
                }));
                value = value.substring(0, 4)
                setTimeout(() => {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        packetsPerCrate: "",
                    }))
                }, 1000)
            }
            else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    packetsPerCrate: "",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //====================================tERMINATED============================================
        if (fieldName === "tERMINATED") {
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
                [fieldName]: value?.value
            }));
        }
        //====================================2.Tax Details============================================
        // ======================================HsnCode=================================
        if (fieldName === "HsnCode") {

            if (value.trim() === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    HsnCode: "Required",
                }));
            }
            else if (value.trim().length > 12) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    HsnCode: "Value must be Not More than 10 Characters",
                }));
                value = value.substring(0, 12)
                setTimeout(() => {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        HsnCode: "",
                    }))
                }, 1000)
            }
            else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    HsnCode: "",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //=================================gST==============================
        if (fieldName === 'gST') {
            if (value === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Required",
                }));
            } else if (!/^\d{0,6}(\.\d{1,2})?$/.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Invalid Percentage",
                }))
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //=================================cGST==============================
        if (fieldName === 'cGST') {

            if (value?.trim() === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Required",
                }));
            }
            else if (!/^\d{0,10}(\.\d{1,2})?$/.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Invalid Percentage",
                }))
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //=================================sGST==============================
        if (fieldName === 'sGST') {
            if (value?.trim() === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Required",
                }));
            }
            else if (!/^\d{0,10}(\.\d{1,2})?$/.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Invalid Percentage",
                }))
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //=================================iGST==============================
        if (fieldName === 'iGST') {

            if (value?.trim() === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Required",
                }));
            }
            else if (!/^\d{0,10}(\.\d{1,2})?$/.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Invalid Percentage",
                }))
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // ======================================3.Route Sheet Settings=================================
        // ======================================pOSITION=================================
        if (fieldName === "pOSITION") {

            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    pOSITION: "Required",
                }));
            }
            else if (value.trim().length > 3) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    pOSITION: "Value Must Not Be More Than 3 Digits",
                }));
                value = value.substring(0, 3)
                setTimeout(() => {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        pOSITION: "",
                    }))
                }, 1000)
            }
            else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    pOSITION: "",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //====================================makeZeroinResetIndent============================================
        if (fieldName === "makeZeroinResetIndent") {
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
                [fieldName]: value?.value
            }));
        }
        //====================================displayinRouteSheet============================================
        if (fieldName === "displayinRouteSheet") {
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
        //====================================4.App Settings============================================
        //====================================indentIn============================================
        if (fieldName === "indentIn") {
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
        //====================================allowInBoth============================================
        if (fieldName === "allowInBoth") {
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
        // ======================================notifyQuantity=================================
        if (fieldName === "notifyQuantity") {

            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    notifyQuantity: "Required",
                }));
            }
            else if (value.trim().length > 5) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    notifyQuantity: "Value Must Not Be More Than 5 Digits",
                }));
                value = value.substring(0, 5)
                setTimeout(() => {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        notifyQuantity: "",
                    }))
                }, 1000)
            }
            else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    notifyQuantity: "",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //====================================cATEGORY============================================
        if (fieldName === "cATEGORY") {
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
        //====================================displayInApp============================================
        if (fieldName === "displayInApp") {
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
                [fieldName]: value?.value
            }));
        }
        // ======================================shelfLife=================================
        if (fieldName === "shelfLife") {

            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    shelfLife: "Required",
                }));
            }
            else if (value.trim().length > 2) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    shelfLife: "Value Must Not Be More Than 2 Digits",
                }));
                value = value.substring(0, 2)
                setTimeout(() => {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        shelfLife: "",
                    }))
                }, 1000)
            }
            else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    shelfLife: "",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // ======================================minOrderQty=================================
        if (fieldName === "minOrderQty") {

            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    minOrderQty: "Required",
                }));
            }
            else if (value.trim().length > 6) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    minOrderQty: "Value Must Not Be More Than 6 Digits",
                }));
                value = value.substring(0, 6)
                setTimeout(() => {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        minOrderQty: "",
                    }))
                }, 1000)
            }
            else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    minOrderQty: "",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        // ======================================maxOrderQty=================================
        if (fieldName === "maxOrderQty") {

            if (value === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    maxOrderQty: "Required",
                }));
            }
            else if (value.trim().length > 6) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    maxOrderQty: "Value Must Not Be More Than 6 Digits",
                }));
                value = value.substring(0, 6)
                setTimeout(() => {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        maxOrderQty: "",
                    }))
                }, 1000)
            }
            else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    maxOrderQty: "",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //====================================5.Rate=========================================
        //====================================mRP============================================
        if (fieldName === 'mRP') {

            if (value?.trim() === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Required",
                }));
            }
            else if (!/^\d{0,5}(\.\d{1,3})?$/.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Invalid MRP",
                }))
            }
            else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //====================================dealersCommission============================================
        if (fieldName === 'dealersCommission') {

            if (value?.trim() === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Required",
                }));
            }
            else if (!/^\d{0,5}(\.\d{1,3})?$/.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Invalid Commission",
                }))
            }
            else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }
        //====================================sUBSIDY============================================
        if (fieldName === 'sUBSIDY') {

            if (value?.trim() === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Required",
                }));
            }
            else if (!/^\d{0,5}(\.\d{1,3})?$/.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "Invalid Subsidy",
                }))
            }
            else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [fieldName]: "",
                }));
            }
            setFormData((prevdata) => ({
                ...prevdata,
                [fieldName]: value
            }))
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        setErrors(validationErorrs)
        console.log(validationErorrs);
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
        console.log(hasErrors);
        console.log(formData);
        if (!hasErrors) {
            console.log("hi");
            const newRecord = {

                //--------------------1.Variant Details-----------------
                "users_code": formData.usersCode,
                "packet_name": formData.packetName,
                "packet_alias": formData.packetAlias,
                "milk_or_product": Number(formData.milkOrProduct),
                "product_code": formData.productName,
                "unit_id": formData.unitName,
                "pack_size": Number(formData.packetSize),
                "crate_or_not": Number(formData.packetsPerCrate),
                "crates": Number(formData.suppliedInCrates),
                "terminated": Number(formData.tERMINATED),
                "utp_issue": formData.issueInUtpRate,
                //--------------------2.Tax Details-----------------------
                "sac_no": formData.HsnCode,
                "gst": Number(formData.gST),
                "cgst": Number(formData.cGST),
                "sgst": Number(formData.sGST),
                "igst": Number(formData.iGST),
                //-------------------3.Route Sheet Settings---------------
                "packet_position": Number(formData.pOSITION),
                "make_zero": Number(formData.makeZeroinResetIndent),
                "packet_type": formData.displayinRouteSheet,
                //------------------4.App Settings-------------------------
                "indent_in": formData.indentIn,
                "allow_in_both": formData.allowInBoth,
                "notify_qty": Number(formData.notifyQuantity),
                "category_id": Number(formData.cATEGORY),
                "selected": Number(formData.displayInApp),
                "shelf_life": Number(formData.shelfLife),
                "min_order_qty": Number(formData.minOrderQty),    //new
                "max_order_qty": Number(formData.maxOrderQty),    //new
                //------------------5.Rate---------------------------------
                "mrp": Number(formData.mRP),
                "agent_comm": Number(formData.dealersCommission),  //new  
                "sub_rate": Number(formData.sUBSIDY),              //new   
                //------------------REMAINING FIELDS------------------------
                "reg_or_not": null,
                "sub_to_agent": null,
                "cess": null,
                "ed": null,
                "pack_size1": null,
                "uom": null,
            }
            try {
                console.log(newRecord);
                const response = await PacketsApi.PacketsAPI_master().create(newRecord)
                if (response.data.Status === 1) {
                    setEnableImageGrid(true)
                    Swal.fire({
                        title: 'Saved',
                        text: 'Saved Sucessfully',
                        icon: 'success',
                        customClass: {
                            container: 'custom-swal-container'
                        }
                    });
                    //handleClose()
                    localStorage.setItem("Navigation_state", true)
                    setPacketCode(response.data.packet_code)
                    //handleClear()
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

    const handleUpdate = async (e) => {
        e.preventDefault()
        const validationErorrs = validation()
        setErrors(validationErorrs)
        console.log(validationErorrs);
        const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
        console.log(hasErrors);
        if (!hasErrors) {
            console.log("hi");
            const newRecord = {
                //--------------------1.Variant Details-----------------
                "users_code": formData.usersCode,
                "packet_name": formData.packetName,
                "packet_alias": formData.packetAlias,
                "milk_or_product": Number(formData.milkOrProduct),
                "product_code": formData.productName,
                "unit_id": formData.unitName,
                "pack_size": Number(formData.packetSize),
                "crate_or_not": Number(formData.packetsPerCrate),
                "crates": Number(formData.suppliedInCrates),
                "terminated": Number(formData.tERMINATED),
                "utp_issue": formData.issueInUtpRate,
                //--------------------2.Tax Details-----------------------
                "sac_no": formData.HsnCode,
                "gst": Number(formData.gST),
                "cgst": Number(formData.cGST),
                "sgst": Number(formData.sGST),
                "igst": Number(formData.iGST),
                //-------------------3.Route Sheet Settings---------------
                "packet_position": Number(formData.pOSITION),
                "make_zero": Number(formData.makeZeroinResetIndent),
                "packet_type": formData.displayinRouteSheet,
                //------------------4.App Settings-------------------------
                "indent_in": formData.indentIn,
                "allow_in_both": formData.allowInBoth,
                "notify_qty": Number(formData.notifyQuantity),
                "category_id": Number(formData.cATEGORY),
                "selected": Number(formData.displayInApp),
                "shelf_life": Number(formData.shelfLife),
                "min_order_qty": Number(formData.minOrderQty),    //new
                "max_order_qty": Number(formData.maxOrderQty),    //new
                //------------------5.Rate---------------------------------
                "mrp": Number(formData.mRP),
                "agent_comm": Number(formData.dealersCommission),  //new
                "sub_rate": Number(formData.sUBSIDY),              //new   
                //------------------REMAINING FIELDS------------------------
                "reg_or_not": null,
                "sub_to_agent": null,
                "cess": null,
                "ed": null,
                "pack_size1": null,
                "uom": null,
            }

            try {
                console.log(newRecord);
                const response = await PacketsApi.PacketsAPI_master().update(packetCode, newRecord)
                if (response.data.Status === 1) {
                    Swal.fire({
                        title: 'Saved',
                        text: 'Updated Sucessfully',
                        icon: 'success',
                        customClass: {
                            container: 'custom-swal-container'
                        }
                    });

                    handleClose()
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

    const handleClose = () => {
        localStorage.setItem("Navigation_state", true)
        navigate(-1)
    }

    useEffect(() => {
        if (location.state !== null) {
            //console.log(location.state);
            setUpdateButton(true)
            setSaveButton(false)
            const {
                usersCode,
                packetName,
                packetAlias,
                milkOrProduct,
                productName,
                unitName,
                packetSize,   //pack_size
                packetsPerCrate,  //crate_or_not 
                suppliedInCrates, //crates
                tERMINATED,
                issueInUtpRate, //utp_issue  
                // ======================================2.Tax Details===============================
                HsnCode, //sac_no
                gST,
                cGST,
                sGST,
                iGST,
                // ======================================3.Route Sheet Settings====================================
                pOSITION, //packet_position
                makeZeroinResetIndent,  //make_zero
                displayinRouteSheet, //packet_type
                // ======================================4.App Settings=================================
                indentIn,
                allowInBoth,
                notifyQuantity,
                cATEGORY,
                displayInApp, //selected
                shelfLife,
                minOrderQty,
                maxOrderQty,
                // ======================================5.Rates=================================
                mRP,
                dealersCommission,
                sUBSIDY,
                lastRateModifiedDate,
                packetCode
            } = location.state
            setFormData((prevdata) => ({
                ...prevdata,
                usersCode,
                packetName,
                packetAlias,
                milkOrProduct,
                productName,
                unitName,
                packetSize,   //pack_size
                packetsPerCrate,  //crate_or_not 
                suppliedInCrates, //crates
                tERMINATED,
                issueInUtpRate, //utp_issue  
                // ======================================2.Tax Details===============================
                HsnCode, //sac_no
                gST,
                cGST,
                sGST,
                iGST,
                // ======================================3.Route Sheet Settings====================================
                pOSITION, //packet_position
                makeZeroinResetIndent,  //make_zero
                displayinRouteSheet, //packet_type
                // ======================================4.App Settings=================================
                indentIn,
                allowInBoth,
                notifyQuantity,
                cATEGORY,
                displayInApp, //selected
                shelfLife,
                minOrderQty,  //new
                maxOrderQty,  //new
                // ======================================5.Rates=================================
                mRP,
                dealersCommission,
                sUBSIDY,
                lastRateModifiedDate,   //new

            }))
            setPacketCode(packetCode)
            setEnableImageGrid(true)
        }
        fetchProductNames()
        fetchUnitNames()
        fetchCategoryNames()
        document.title = 'Create Packets'
    }, [])
    return (
        <>
            <Paper sx={{ p: 2 }} elevation={3}>
                <Grid container spacing={2}>
                    <Grid item md={12} lg={12} sm={12} xs={12}>
                        {/* =========================1.Variant Details======================== */}
                        <Typography variant="h6">
                            Variant Details
                        </Typography>
                    </Grid>
                    {/* =========================usersCode/PacketCode======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Packet Code"
                            variant="outlined"
                            size='small'
                            required
                            fullWidth
                            sx={textFiledStyle}
                            value={formData.usersCode}
                            onChange={(e) => handleFieldChange("usersCode", e.target.value.toUpperCase())}
                            error={Boolean(errors.usersCode)}
                            helperText={errors.usersCode}
                        />
                    </Grid>
                    {/* =========================Packet Name======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Packet Name"
                            variant="outlined"
                            size='small'
                            required
                            fullWidth
                            sx={textFiledStyle}
                            value={formData.packetName}
                            onChange={(e) => handleFieldChange("packetName", e.target.value.toUpperCase())}
                            error={Boolean(errors.packetName)}
                            helperText={errors.packetName}
                        />
                    </Grid>
                    {/* =========================Packet Alias======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Packet Alias"
                            variant="outlined"
                            size='small'
                            fullWidth
                            sx={textFiledStyle}
                            required
                            value={formData.packetAlias}
                            onChange={(e) => handleFieldChange("packetAlias", e.target.value.toUpperCase())}
                            error={Boolean(errors.packetAlias)}
                            helperText={errors.packetAlias}
                        />
                    </Grid>
                    {/* =========================Milk Or Product======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={Milk_Or_Product}
                            sx={autoCompleteStyle}
                            getOptionLabel={(options) => options.Name}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            value={Milk_Or_Product.find(option => option.value === formData.milkOrProduct) || null}
                            onChange={(e, v) => handleFieldChange("milkOrProduct", v || "")}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Milk Or Product"
                                    size='small'
                                    fullWidth
                                    required
                                    error={Boolean(errors.milkOrProduct)}
                                    helperText={errors.milkOrProduct}
                                />}
                        />
                    </Grid>
                    {/* =========================Product Name======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={productNamesDD}
                            sx={autoCompleteStyle}
                            getOptionLabel={(options) => options.product_name}
                            isOptionEqualToValue={(option, value) => option.product_code === value.product_code}
                            value={productNamesDD.find(option => option.product_code === formData.productName) || null}
                            onChange={(e, v) => handleFieldChange("productName", v?.product_code || "")}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Product Name"
                                    size='small'
                                    fullWidth
                                    required
                                    error={Boolean(errors.productName)}
                                    helperText={errors.productName}
                                />}
                        />
                    </Grid>
                    {/* =========================Unit======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={unitDD}
                            sx={autoCompleteStyle}
                            getOptionLabel={(options) => options.uom}
                            isOptionEqualToValue={(option, value) => option.unit_id === value.unit_id}
                            value={unitDD.find(option => option.unit_id === formData.unitName) || null}
                            onChange={(e, v) => handleFieldChange("unitName", v?.unit_id || "")}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Unit"
                                    size='small'
                                    fullWidth
                                    required
                                    error={Boolean(errors.unitName)}
                                    helperText={errors.unitName}
                                />}
                        />
                    </Grid>
                    {/* =========================Packet Size======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Packet Size"
                            variant="outlined"
                            size='small'
                            required
                            fullWidth
                            sx={textFiledStyle}
                            value={formData.packetSize}
                            onChange={(e) => handleFieldChange("packetSize", e.target.value.replace(/[^0-9.]/g, '').replace(/(\.\d{3})\d*$/, '$1'))}
                            error={Boolean(errors.packetSize)}
                            helperText={errors.packetSize}
                        />
                    </Grid>
                    {/* =========================Issue In Utp rate======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={Issue_In_Utp_rate}
                            sx={autoCompleteStyle}
                            getOptionLabel={(options) => options.Name}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            value={Issue_In_Utp_rate.find(option => option.value === formData.issueInUtpRate) || null}
                            onChange={(e, v) => handleFieldChange("issueInUtpRate", v?.value || "")}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Issue In Utp rate"
                                    size='small'
                                    fullWidth
                                    required
                                    error={Boolean(errors.issueInUtpRate)}
                                    helperText={errors.issueInUtpRate}
                                />}
                        />
                    </Grid>

                    {/* =========================Supplied In Crates======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={Supplied_In_Crates}
                            sx={autoCompleteStyle}
                            getOptionLabel={(options) => options.Name}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            value={Supplied_In_Crates.find(option => option.value === formData.suppliedInCrates) || null}
                            onChange={(e, v) => handleFieldChange("suppliedInCrates", v || "")}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Supplied In Crates"
                                    size='small'
                                    fullWidth
                                    required
                                    error={Boolean(errors.suppliedInCrates)}
                                    helperText={errors.suppliedInCrates}
                                />}
                        />
                    </Grid>
                    {/* =========================Packet Per Crate======================== */}
                    {formData.suppliedInCrates === 0 && ( // Show the text field only when suppliedInCrates is 'Y'
                        <Grid item md={3} lg={3} sm={12} xs={12}>
                            <TextField
                                id="outlined-basic"
                                label="Packet Per Crate"
                                variant="outlined"
                                size='small'
                                required
                                fullWidth
                                sx={textFiledStyle}
                                value={formData.packetsPerCrate}
                                onChange={(e) => handleFieldChange("packetsPerCrate", e.target.value.replace(/[^0-9]/g, ''))}
                                error={Boolean(errors.packetsPerCrate)}
                                helperText={errors.packetsPerCrate}
                            />
                        </Grid>
                    )}

                    {/* =========================Terminated======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={Terminated}
                            sx={autoCompleteStyle}
                            getOptionLabel={(options) => options.Name}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            value={Terminated.find(option => option.value === formData.tERMINATED) || null}
                            onChange={(e, v) => handleFieldChange("tERMINATED", v || "")}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Terminated"
                                    size='small'
                                    fullWidth
                                    required
                                    error={Boolean(errors.tERMINATED)}
                                    helperText={errors.tERMINATED}
                                />}
                        />
                    </Grid>

                </Grid>
            </Paper>
            {/* =========================Paper end======================== */}
            <Paper sx={{ mt: 2, p: 2 }} elevation={3}>
                <Grid container spacing={2}>
                    <Grid item md={12} lg={12} sm={12} xs={12}>
                        {/* =========================2.TAX Details======================== */}
                        <Typography variant="h6">
                            Tax Details
                        </Typography>
                    </Grid>
                    {/* =========================HSN Code======================== */}
                    <Grid item md={4} lg={4} sm={12} xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="HSN Code"
                            variant="outlined"
                            size='small'
                            required
                            fullWidth
                            sx={textFiledStyle}
                            value={formData.HsnCode}
                            onChange={(e) => handleFieldChange("HsnCode", e.target.value.toUpperCase())}
                            error={Boolean(errors.HsnCode)}
                            helperText={errors.HsnCode}
                        />
                    </Grid>
                    {/* =========================GST Percentage======================== */}
                    <Grid item md={2} lg={2} sm={12} xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="GST Percentage"
                            variant="outlined"
                            size='small'
                            required
                            fullWidth
                            sx={textFiledStyle}
                            value={formData.gST}
                            onChange={(e) => handleFieldChange("gST", e.target.value.replace(/[^0-9.]/g, '').replace(/(\.\d{2})\d*$/, '$1'))}
                            error={Boolean(errors.gST)}
                            helperText={errors.gST}
                        />
                    </Grid>
                    {/* =========================CGST Percentage======================== */}
                    <Grid item md={2} lg={2} sm={12} xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="CGST Percentage"
                            variant="outlined"
                            size='small'
                            fullWidth
                            sx={textFiledStyle}
                            required
                            value={formData.cGST}
                            onChange={(e) => handleFieldChange("cGST", e.target.value.replace(/[^0-9.]/g, '').replace(/(\.\d{2})\d*$/, '$1'))}
                            error={Boolean(errors.cGST)}
                            helperText={errors.cGST}
                        />
                    </Grid>
                    {/* =========================SGST Percentage======================== */}
                    <Grid item md={2} lg={2} sm={12} xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="SGST Percentage"
                            variant="outlined"
                            size='small'
                            fullWidth
                            sx={textFiledStyle}
                            required
                            value={formData.sGST}
                            onChange={(e) => handleFieldChange("sGST", e.target.value.replace(/[^0-9.]/g, '').replace(/(\.\d{2})\d*$/, '$1'))}
                            error={Boolean(errors.sGST)}
                            helperText={errors.sGST}
                        />
                    </Grid>
                    {/* =========================IGST Percentage======================== */}
                    <Grid item md={2} lg={2} sm={12} xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="IGST Percentage"
                            variant="outlined"
                            size='small'
                            fullWidth
                            sx={textFiledStyle}
                            required
                            value={formData.iGST}
                            onChange={(e) => handleFieldChange("iGST", e.target.value.replace(/[^0-9.]/g, '').replace(/(\.\d{2})\d*$/, '$1'))}
                            error={Boolean(errors.iGST)}
                            helperText={errors.iGST}
                        />
                    </Grid>
                </Grid>
            </Paper>
            {/* =========================Paper end======================== */}
            <Paper sx={{ mt: 2, p: 2 }} elevation={3}>
                <Grid container spacing={2}>
                    <Grid item md={12} lg={12} sm={12} xs={12}>
                        {/* =========================3.Route Sheet Settings======================== */}
                        <Typography variant="h6">
                            Route Sheet Settings
                        </Typography>
                    </Grid>
                    {/* =========================Position======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Position"
                            variant="outlined"
                            size='small'
                            required
                            fullWidth
                            sx={textFiledStyle}
                            value={formData.pOSITION}
                            onChange={(e) => handleFieldChange("pOSITION", e.target.value.replace(/[^0-9]/g, ''))}
                            error={Boolean(errors.pOSITION)}
                            helperText={errors.pOSITION}
                        />
                    </Grid>
                    {/* =========================Make Zero In Reset Indent======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={Make_Zero_In_Reset_Indent}
                            sx={autoCompleteStyle}
                            getOptionLabel={(options) => options.Name}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            value={Make_Zero_In_Reset_Indent.find(option => option.value === formData.makeZeroinResetIndent) || null}
                            onChange={(e, v) => handleFieldChange("makeZeroinResetIndent", v || "")}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Make Zero In Reset Indent"
                                    size='small'
                                    fullWidth
                                    required
                                    error={Boolean(errors.makeZeroinResetIndent)}
                                    helperText={errors.makeZeroinResetIndent}
                                />}
                        />
                    </Grid>
                    {/* =========================Display In Route Sheet======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={Display_In_Route_Sheet}
                            sx={autoCompleteStyle}
                            getOptionLabel={(options) => options.Name}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            value={Display_In_Route_Sheet.find(option => option.value === formData.displayinRouteSheet) || null}
                            onChange={(e, v) => handleFieldChange("displayinRouteSheet", v?.value || "")}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Display In Route Sheet"
                                    size='small'
                                    fullWidth
                                    required
                                    error={Boolean(errors.displayinRouteSheet)}
                                    helperText={errors.displayinRouteSheet}
                                />}
                        />
                    </Grid>
                </Grid>
            </Paper>
            {/* =========================Paper end======================== */}
            <Paper sx={{ mt: 2, p: 2 }} elevation={3}>
                <Grid container spacing={2}>
                    {/* =========================4.App Settings======================== */}
                    <Grid item md={12} lg={12} sm={12} xs={12}>
                        <Typography variant="h6">
                            App Settings
                        </Typography>
                    </Grid>
                    {/* =========================Indent In======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={Indent_In}
                            sx={autoCompleteStyle}
                            getOptionLabel={(options) => options.Name}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            value={Indent_In.find(option => option.value === formData.indentIn) || null}
                            onChange={(e, v) => handleFieldChange("indentIn", v?.value || "")}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Indent In"
                                    size='small'
                                    fullWidth
                                    required
                                    error={Boolean(errors.indentIn)}
                                    helperText={errors.indentIn}
                                />}
                        />
                    </Grid>

                    {/* =========================Allow In Both======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={Allow_In_Both}
                            sx={autoCompleteStyle}
                            getOptionLabel={(options) => options.Name}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            value={Allow_In_Both.find(option => option.value === formData.allowInBoth) || null}
                            onChange={(e, v) => handleFieldChange("allowInBoth", v?.value || "")}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Allow In Both"
                                    size='small'
                                    fullWidth
                                    required
                                    error={Boolean(errors.allowInBoth)}
                                    helperText={errors.allowInBoth}
                                />}
                        />
                    </Grid>
                    {/* =========================Notify Quantity======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Notify Quantity"
                            variant="outlined"
                            size='small'
                            required
                            fullWidth
                            sx={textFiledStyle}
                            value={formData.notifyQuantity}
                            onChange={(e) => handleFieldChange("notifyQuantity", e.target.value.replace(/[^0-9]/g, ''))}
                            error={Boolean(errors.notifyQuantity)}
                            helperText={errors.notifyQuantity}
                        />
                    </Grid>
                    {/* =========================Category======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={categoriesDD}
                            sx={autoCompleteStyle}
                            getOptionLabel={(options) => options.cat_name}
                            isOptionEqualToValue={(option, value) => option.category_id === value.category_id}
                            value={categoriesDD.find(option => option.category_id === formData.cATEGORY) || null}
                            onChange={(e, v) => handleFieldChange("cATEGORY", v?.category_id || "")}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Category"
                                    size='small'
                                    fullWidth
                                    required
                                    error={Boolean(errors.cATEGORY)}
                                    helperText={errors.cATEGORY}
                                />}
                        />
                    </Grid>
                    {/* =========================Display In App======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={Display_In_App}
                            sx={autoCompleteStyle}
                            getOptionLabel={(options) => options.Name}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            value={Display_In_App.find(option => option.value === formData.displayInApp) || null}
                            onChange={(e, v) => handleFieldChange("displayInApp", v || "")}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Display In App"
                                    size='small'
                                    fullWidth
                                    required
                                    error={Boolean(errors.displayInApp)}
                                    helperText={errors.displayInApp}
                                />}
                        />
                    </Grid>
                    {/* =========================Shelf Life======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Shelf Life"
                            variant="outlined"
                            size='small'
                            required
                            fullWidth
                            sx={textFiledStyle}
                            value={formData.shelfLife}
                            onChange={(e) => handleFieldChange("shelfLife", e.target.value.replace(/[^0-9]/g, ''))}
                            error={Boolean(errors.shelfLife)}
                            helperText={errors.shelfLife}
                        />
                    </Grid>

                    {/* =========================Min Order Quantity======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Min Order Quantity"
                            variant="outlined"
                            size='small'
                            required
                            fullWidth
                            sx={textFiledStyle}
                            value={formData.minOrderQty}
                            onChange={(e) => handleFieldChange("minOrderQty", e.target.value.replace(/[^0-9]/g, ''))}
                            error={Boolean(errors.minOrderQty)}
                            helperText={errors.minOrderQty}
                        />
                    </Grid>

                    {/* =========================Max Order Quantity======================== */}
                    <Grid item md={3} lg={3} sm={12} xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Max Order Quantity"
                            variant="outlined"
                            size='small'
                            required
                            fullWidth
                            sx={textFiledStyle}
                            value={formData.maxOrderQty}
                            onChange={(e) => handleFieldChange("maxOrderQty", e.target.value.replace(/[^0-9]/g, ''))}
                            error={Boolean(errors.maxOrderQty)}
                            helperText={errors.maxOrderQty}
                        />
                    </Grid>
                </Grid>
            </Paper>
            {/* =========================Paper end======================== */}
            <Paper sx={{ mt: 2, p: 2 }} elevation={3}>
                <Grid container spacing={2}>
                    <Grid item md={12} lg={12} sm={12} xs={12}>
                        {/* =========================5.Rate======================== */}
                        <Typography variant="h6">
                            Rate
                        </Typography>
                    </Grid>
                    {/* =========================MRP======================== */}
                    <Grid item md={2} lg={2} sm={12} xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="MRP"
                            variant="outlined"
                            size='small'
                            required
                            fullWidth
                            sx={textFiledStyle}
                            value={formData.mRP}
                            onChange={(e) => handleFieldChange("mRP", e.target.value.replace(/[^0-9.]/g, '').replace(/(\.\d{3})\d*$/, '$1'))}
                            error={Boolean(errors.mRP)}
                            helperText={errors.mRP}
                        />
                    </Grid>
                    {/* =========================dealersCommission======================== */}
                    <Grid item md={2} lg={2} sm={12} xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Dealers Commission"
                            variant="outlined"
                            size='small'
                            required
                            fullWidth
                            sx={textFiledStyle}
                            value={formData.dealersCommission}
                            onChange={(e) => handleFieldChange("dealersCommission", e.target.value.replace(/[^0-9.]/g, '').replace(/(\.\d{3})\d*$/, '$1'))}
                            error={Boolean(errors.dealersCommission)}
                            helperText={errors.dealersCommission}
                        />
                    </Grid>
                    {/* =========================Subsidy Rate======================== */}
                    <Grid item md={2} lg={2} sm={12} xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Subsidy Rate"
                            variant="outlined"
                            size='small'
                            required
                            fullWidth
                            sx={textFiledStyle}
                            value={formData.sUBSIDY}
                            onChange={(e) => handleFieldChange("sUBSIDY", e.target.value.toUpperCase())}
                            error={Boolean(errors.sUBSIDY)}
                            helperText={errors.sUBSIDY}
                        />
                    </Grid>
                    {/* =========================Last Rate Modified Date======================== */}
                    <Grid item md={4} lg={4} sm={12} xs={12}>
                        {location.state !== null && (<label> <b>Last Rate Modified Date :</b> <span><mark>{dayjs().format("DD/MM/YYYY")}</mark></span></label>)}
                    </Grid>
                    {/* =========================Button======================== */}
                    <Grid item md={12} lg={12} sm={12} xs={12}>
                        <Stack spacing={{ xs: 1, sm: 1, md: 1 }} direction={{ xs: 'column', sm: 'row' }}>
                            {saveButton && (
                                <Button
                                    variant="contained"
                                    size='small'
                                    onClick={(e) => handleSubmit(e)}
                                >Save
                                </Button>
                            )}
                            {updateButton && (
                                <Button
                                    variant="contained"
                                    size='small'
                                    onClick={(e) => handleUpdate(e)}
                                >Update
                                </Button>
                            )}
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
                </Grid>
            </Paper>

            {enableImageGrid && (
                <Grid container spacing={2} mt={1}>
                    <Grid item md={12} lg={12} sm={12} xs={12}>
                        <PacketsImages
                            packetCodeforImages={packetCode}
                            usersCode = {formData.usersCode}
                            packetName={formData.packetName}
                        />
                    </Grid>
                </Grid>)}
            {/* =========================Paper end======================== */}
        </>
    )
}