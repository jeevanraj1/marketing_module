import React from 'react'
import { Grid, Typography, Paper, Button, Box, TextField, Autocomplete, Modal } from '@mui/material'
import { useState, useRef, useEffect } from "react";
import Swal from 'sweetalert2';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { PacketsApi } from "../../../Api";
import { saveAs } from 'file-saver';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60%",
  bgcolor: 'background.paper',
  border: '2px solid #ddd',
  boxShadow: 24,
  border: "10px solid lightblue",
  maxWidth: '600px',
};
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

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function returnFileSize(number) {
  if (number < 1024) {
    return `${number} `; //bytes
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)}`; //KB
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)}`; //MB
  }
}

function returnFileSize1(number) {
  if (number < 1024) {
    return `${number} `; //bytes
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
}



const getFileTypeFromFileName = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();
  if (extension === 'pdf') {
    return 'pdf';
  } else if (extension === 'jpeg' || extension === 'jpg' || extension === 'png' || extension === 'gif') {
    return 'image';
  } else {
    return 'unknown';
  }
};

export default function PacketsImages({ packetCodeforImages, usersCode, packetName }) {
  const [file, setFile] = useState("");
  const [imagetypeDD, setImageTypeDD] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState(false);
  const [browserClicked, setBrowserclicked] = useState(false);
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [base64Url, setBase64Url] = useState("");
  const [packtCode, setPacktCode] = useState(packetCodeforImages);
  const [docementsBaseUrlFetch, setDocementsBaseUrlFetch] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [documentsModal, setDocumentsModal] = useState(false);
  const [popupbase64url, setPopupbase64url] = useState("");
  const [fileType, setFileType] = useState("");
  const [getFilevalidFileType, setGetFilevalidFileType] = useState([])
  const [deleteFileName, setDeleteFileName] = useState("");
  const [formData, setFormData] = useState({
    imageType: ""
  });

  const handleBackdropMobileClick = (event) => {
    event.stopPropagation();
  };
  const fetchImageNames = async () => {
    try {
      const response = await PacketsApi.PacketsAPI_master().fetchByMasterID()
      if (response.status === 200) {
        setImageTypeDD(response.data.items)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const validation = () => {
    const newErrors = {}
    // =====================================imageType==========================================
    if (formData.imageType === "") newErrors.imageType = "Required"
    else if (formData.imageType !== "") newErrors.imageType = errors.imageType

    return newErrors
  }


  const handleClear = () => {
    setSelectedFileName(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.disabled = false;
      localStorage.setItem("Navigation_state", true);
    }
    setFile("")
    setFormData((prevadata) => ({
      ...prevadata,
      imageType: "",
    }))
    setErrors({})
    setBrowserclicked(false)
  }
  const handleFieldChange = (fieldName, value) => {
    if (fieldName === "imageType") {
      getValidFileType(value)
      if (value === "") {
        setBrowserclicked(false)
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
  }

  function validFileType(file) {
    return getFilevalidFileType.includes(file.type);
  }
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    setSelectedFileName(selectedFile.name);
    setFile(selectedFile)

    if (!validFileType(selectedFile)) { // check for valid file type
      Swal.fire({
        title: 'Error',
        text: "Not a Valid File Format",
        icon: 'error',
        customClass: {
          container: 'custom-swal-container'
        }
      });
    }
    if (Number(returnFileSize(selectedFile.size)) > 150) { // check for valid file size
      Swal.fire({
        title: 'Error',
        text: `Upload Size Must be Less than 150 KB Your File size is ${returnFileSize1(selectedFile.size)}`,
        icon: 'error',
        customClass: {
          container: 'custom-swal-container'
        }
      });
    }
    if (Number(returnFileSize(selectedFile.size)) < 150 && validFileType(selectedFile)) { //set image file to display
      const fileReader = new FileReader();
      fileReader.readAsDataURL(selectedFile);
      fileReader.onload = () => {
        console.log(fileReader.result);
        const imageDataUrl = fileReader.result.split(",")[1];;
        console.log(imageDataUrl);
        setBase64Url(imageDataUrl)
        handleOpenModal()
      };
    }
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    handleClear()
  };

  const handelDocumentsModalOpen = (fileData, fileName) => {
    setDocumentsModal(true);
    setPopupbase64url(fileData);
    setDeleteFileName(fileName)
    setFileType(getFileTypeFromFileName(fileName)); // Assuming a function getFileTypeFromFileName is defined elsewhere
  };

  const handelDocumentsModalclose = () => {
    setDocumentsModal(false);
  };
  const upload = async (e) => {
    e.preventDefault()
    const { doc_name } = imagetypeDD?.find(option => option.doc_id === formData.imageType)
    const contCatFileName = packtCode + "-" + doc_name + "." + selectedFileName.split(".")[1]
    const validationErorrs = validation()
    setErrors(validationErorrs)
    const hasErrors = Object.values(validationErorrs).some(error => error !== "" && error !== null && error !== undefined)
    console.log(validationErorrs);
    if (!hasErrors) {
      const newRecord = {
        "packet_code": packetCodeforImages,
        "doc_id": Number(formData.imageType),
        "img_name": contCatFileName
      }
      const documentsUpload = {
        "fileData": base64Url,
        "fileName": contCatFileName,
      }
      try {
        const responseOracle = await PacketsApi.PacketsAPI_master().create_pkt_images(newRecord)
        const responsewebApi = await PacketsApi.PacketsAPI_master().postWebApiDocuments(documentsUpload)
        if (responsewebApi.data.message === "File saved locally successfully" && responseOracle.data.Status === 1) {
          Swal.fire({
            title: 'Saved',
            text: 'Saved Sucessfully',
            icon: 'success',
            customClass: {
              container: 'custom-swal-container'
            }
          });
          handleCloseModal()
          fetchImagesOracleNames(packtCode)
        }
        else if (responseOracle.data.Status === 0) {
          Swal.fire({
            title: 'Error',
            text: `${responseOracle.data.Error}` || 'Unknown Error',
            icon: 'error',
            customClass: {
              container: 'custom-swal-container'
            }
          });
        }
        else if (responsewebApi.data.message === "UPLOAD FAILED") {
          Swal.fire({
            title: 'Error',
            text: 'Image Upload Failed',
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

  const handleDeleteClick = async (e) => {
    const DeleteConfirm = await Swal.fire({
      title: '',
      text: `Are You Sure You want To delete ${deleteFileName.substring(2,deleteFileName.length)} ? You Will Not be Able to Recover This`,
      icon: "warning",
      showDenyButton: true,
      showConfirmButton: true,
      reverseButtons: true,
      denyButtonText: "NO",
      confirmButtonText: "YES",
      customClass: {
        container: 'custom-swal-container'
      }
    })
    if (DeleteConfirm.isConfirmed) {
      try {
        const webApiDeleteResponse = await PacketsApi.PacketsAPI_master().deleteImageWebApi(deleteFileName)
        const oracleDeleteResponse = await PacketsApi.PacketsAPI_master().deleteOracle(deleteFileName)
        console.log(webApiDeleteResponse);
        console.log(oracleDeleteResponse);
        if (webApiDeleteResponse.data === "DELETED SUCCESSFULLY" && oracleDeleteResponse.data.Status === 1) {
          Swal.fire({
            title: 'Sucess',
            text: 'Deleted Successfully',
            icon: 'success',
            customClass: {
              container: 'custom-swal-container'
            }
          });
          fetchImagesOracleNames(packtCode)
          handelDocumentsModalclose()
        }
        else if (oracleDeleteResponse.data.Status === 0) {
          Swal.fire({
            title: 'Error',
            text: `${oracleDeleteResponse.data.Error}` || 'Unknown Error',
            icon: 'error',
            customClass: {
              container: 'custom-swal-container'
            }
          });
        }
        else if (webApiDeleteResponse.data === "DELETE FAILED") {
          Swal.fire({
            title: 'Error',
            text: 'Unknown Error',
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
    if (DeleteConfirm.isDenied) {

    }
  }
  const convertBase64ToFile = (base64String, fileName) => {
    let mime = base64String;
    let bstr = atob(base64String);
    let n = bstr.length;
    let uint8Array = new Uint8Array(n);
    while (n--) {
      uint8Array[n] = bstr.charCodeAt(n);
    }
    let file = new File([uint8Array], fileName, { type: mime });
    return file;
  }
  const handleDownload = () => {
    let file = convertBase64ToFile(popupbase64url, deleteFileName);
    saveAs(file, deleteFileName);
  }
  const fetchImagesOracleNames = async (packtCode) => {
    try {
      const response = await PacketsApi.PacketsAPI_master().fetchAllImages(packtCode)
      console.log(response.data.items);
      const promises = response.data.items.map(async (item) => {
        try {
          const response1 = await PacketsApi.PacketsAPI_master().getDocumentsWebApi(item.img_name)
          return response1.data;
        } catch (error) {
          console.log(error);
        }
      });

      const results = await Promise.all(promises);
      setDocementsBaseUrlFetch(results.filter(result => result !== null))
    } catch (error) {
      console.log(error);
    }
  };
  const getValidFileType = async (doc_id) => {
    try {
      const response = await PacketsApi.PacketsAPI_master().typeCheckDocuments(doc_id)
      if (response.status === 200) {
        const array = response.data.items.map(item => item.file_type)
        setGetFilevalidFileType(array)
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchImageNames()
    fetchImagesOracleNames(packtCode)
    document.title = "Packet Images"
  }, [])
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={12} lg={12} sm={12} xs={12}>
          <Paper sx={{ padding: 2, maxHeight: 250 }} elevation={3}>
            <Grid container spacing={2}>
              <Grid item md={7} lg={7} sm={12} xs={12} style={{ borderRight: "1px dotted black" }}>
                <Grid container spacing={2}>
                  <Grid item md={12} lg={12} sm={12} xs={12} width={1000}>
                    <Typography variant='h5'>
                      Images
                    </Typography>
                  </Grid>
                  {/* =========================Images Type======================== */}
                  <Grid item md={5.5} lg={5.5} sm={12} xs={12}>
                    <Autocomplete
                      disablePortal
                      size='small'
                      fullWidth
                      options={imagetypeDD}
                      getOptionLabel={(options) => options.doc_name}
                      isOptionEqualToValue={(option, value) => option.doc_id === value.doc_id}
                      value={imagetypeDD?.find(option => option.doc_id === formData.imageType) || null}
                      onChange={(e, v) => handleFieldChange("imageType", v?.doc_id || "")}
                      sx={autoCompleteStyle}
                      renderInput={(params) =>
                        <TextField
                          {...params}
                          label="Image Type"
                          required
                          error={Boolean(errors.imageType)}
                          helperText={errors.imageType}
                        />}
                    />
                  </Grid>
                  {/* =========================Browse Button======================== */}
                  <Grid item md={2} lg={2} sm={12} xs={12}>
                    <Button
                      component="label"
                      variant="contained"
                      size='small'
                      fullWidth
                      startIcon={<TravelExploreIcon />}
                      onClick={() => setBrowserclicked(true)}
                      disabled={!formData.imageType && getFilevalidFileType.length === 0}
                    >
                      Browse
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleFileChange}
                        // accept=".jpeg,.pdf,.xlsx,.jpg,.doc,.docx,.ppt,.pptx,.xls"
                        accept={`${getFilevalidFileType}`}
                        ref={fileInputRef}
                      />
                    </Button>
                  </Grid>
                  {/* =========================Clear button======================== */}
                  <Grid item md={2} lg={2} sm={12} xs={12}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size='small'
                      fullWidth
                      onClick={handleClear}
                    >
                      Clear
                    </Button>
                  </Grid>
                  {/* =========================Clear button======================== */}
                  <Grid item md={5.5} lg={5.5} sm={12} xs={12}>
                  </Grid>
                  {/* =========================Clear button======================== */}

                  {/* =========================Clear button======================== */}
                </Grid>
              </Grid>
              {/* ============================== */}
              <Grid item md={5} lg={5} sm={12} xs={12} mt={2}>
                <div style={{ maxHeight: "199px", overflow: "auto" }}>
                  <table border="1" style={{ width: "100%", borderCollapse: "collapse", }}>
                    <thead>
                      <tr>
                        <th colSpan="2" style={{ padding: "2px", backgroundColor: "#f2f2f2", textAlign: "center", }}>Attachments</th>
                      </tr>
                      <tr>
                        <th style={{ fontSize: "13px" }}>Sl No</th>
                        <th style={{ padding: "1px", textAlign: "center", fontSize: "13px" }}>
                          Click Here to Preview
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        docementsBaseUrlFetch.map((items, index) => (
                          <React.Fragment key={index}>
                            <tr>
                              <td style={{ fontSize: "12px", textAlign: "center" }}>{index + 1}</td>
                              <td>
                                <Box onClick={() => handelDocumentsModalOpen(items.fileData, items.fileName)}
                                  sx={{
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    '&:hover': {
                                      color: 'blue', // Change color on hover
                                    },
                                    color: "blue"
                                  }}
                                >
                                  {items.fileName.substring(2,items.fileName.length)}
                                </Box>
                              </td>
                            </tr>
                          </React.Fragment>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </Grid>
              {/* ============================== */}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      {/* ===============================================PopUP===================================================================== */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{ onClick: handleBackdropMobileClick }}
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "550px", padding: "20px", }}>
            {file && (
              <object data={URL.createObjectURL(file)} width="100%" style={{ minHeight: "400px", }}></object>
            )}
          </Box>
          {selectedFileName && browserClicked && (
            <Box sx={{ color: "red", mt: -1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <p><strong style={{ color: "black" }}>Selected File:</strong> <span style={{ backgroundColor: "yellow", color: "red" }}>{selectedFileName}</span></p>
            </Box>
          )}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
            <Button
              variant="contained"
              color="error"
              size='small'
              onClick={upload}
              startIcon={<CloudUploadIcon />}
              disabled={!formData.imageType || !browserClicked || !selectedFileName}
            >
              Upload
            </Button>
            <Button
              onClick={handleCloseModal}
              variant="contained"
              color="secondary"
              size='small'
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal >
      {/* ======================================================== */}
      <Modal
        open={documentsModal}
        onClose={handelDocumentsModalclose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{ onClick: handleBackdropMobileClick }}
      >
        <Box sx={style}>
          {fileType === 'pdf' ? (
            <object data={`data:application/pdf;base64,${popupbase64url}`} width="100%" style={{ minHeight: "400px" }}></object>
          ) : fileType === 'image' ? (
            <img src={`data:image/png;base64,${popupbase64url}`} alt="Preview" style={{ width: "100%", minHeight: "400px" }} />
          ) : (
            <Typography variant="body1">
              Unable to determine file type. Please try again.
            </Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              onClick={handleDownload}
              variant="contained"
              color="secondary"
              size='small'
            // sx={{display:"none"}}
            >
              Download
            </Button>
            <Button
              onClick={handleDeleteClick}
              variant="contained"
              color="error"
              size='small'
            >
              Delete
            </Button>
            <Button
              onClick={handelDocumentsModalclose}
              variant="contained"
              color="secondary"
              size='small'
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal >
    </>
  )
}