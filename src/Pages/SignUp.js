import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import logoImage from './MarketingModule/Images/logo.png';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { sign_up_Api } from "./Api"
import dayjs from 'dayjs';

const defaultTheme = createTheme();

export default function SignUp() {
    const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{3,}$/;
    const passwordRegx = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:"<>?~`-])(?!.*\s).{8,}$/
    const phoneRegex = /^\d{10}$/;

    const [formData, setFormData] = React.useState({
        Login_id: "",
        User_Name: "",
        Mobile_No: "",
        Email_id: "",
        Password: "",
        Confirm_password: ""
    });

    const [errors, setErrors] = React.useState({
        Login_id: "",
        User_Name: "",
        Mobile_No: "",
        Email_id: "",
        Password: "",
        Confirm_password: ""
    });


    const navigate = useNavigate()


    const handleFieldChange = (fieldName, value) => {
        localStorage.setItem("Navigation_state", false);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: null,
        }));

        setFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: value,
        }));

        if (fieldName === "loginid" && value.length < 3) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                Login_id: "min 3 Characters ",
            }));
            setFormData((prevFormData) => ({
                ...prevFormData,
                Login_id: value,
            }));
        } else if (fieldName === "loginid" && value.length >= 3) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                Login_id: "",
            }));
            setFormData((prevFormData) => ({
                ...prevFormData,
                Login_id: value,
            }));
        }

        if (fieldName === "username" && value.length < 3) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                User_Name: "min 3 Characters ",
            }));
            setFormData((prevFormData) => ({
                ...prevFormData,
                User_Name: value,
            }));
        } else if (fieldName === "username" && value.length >= 3) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                User_Name: "",
            }));
            setFormData((prevFormData) => ({
                ...prevFormData,
                User_Name: value,
            }));
        }
        if (fieldName === "mobile") {
            if (value !== "") {
                if (!phoneRegex.test(value)) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        Mobile_No: "Invalid Phone Number",
                    }));
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        Mobile_No: value,
                    }));
                } else if (phoneRegex.test(value)) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        Mobile_No: "",
                    }));
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        Mobile_No: value,
                    }));
                }
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    Mobile_No: "",
                }));
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    Mobile_No: value,
                }));
            }
        }

        if (fieldName === "email") {
            if (value !== "") {
                if (!emailRegex.test(value)) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        Email_id: "Invalid Email Id",
                    }));
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        Email_id: value,
                    }));
                } else if (emailRegex.test(value)) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        Email_id: "",
                    }));
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        Email_id: value,
                    }));
                }
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    Email_id: "",
                }));
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    Email_id: value,
                }));
            }
        }


        if (fieldName === "password" && !passwordRegx.test(value)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                Password: "Password needs uppercase, digit, special character and Length 8."
            }));
            setFormData((prevFormData) => ({
                ...prevFormData,
                Password: value,
            }));
        }
        else if (fieldName === "password" && passwordRegx.test(value)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                Password: "",
            }));
            setFormData((prevFormData) => ({
                ...prevFormData,
                Password: value,
            }));
        }

        if (fieldName === "confirmpassword" && value !== formData.Password) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                Confirm_password: "Passwords do not match.",
            }));
            setFormData((prevFormData) => ({
                ...prevFormData,
                Confirm_password: value,
            }));
        } else if (fieldName === "confirmpassword" && value === formData.Password) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                Confirm_password: "",
            }));
            setFormData((prevFormData) => ({
                ...prevFormData,
                Confirm_password: value,
            }));
        }
    };

    const validation = () => {
        const newErrors = {};

        if (!formData.Login_id) {
            newErrors.Login_id = "* Login Id Required";
        } else if (formData.Login_id.length < 3) {
            newErrors.Login_id = "min 3 Characters";
        }
        if (!formData.User_Name) {
            newErrors.User_Name = "* User Name Required";
        } else if (formData.User_Name.length < 3) {
            newErrors.User_Name = "min 3 Characters";
        }
        if (formData.Mobile_No === "") {
            newErrors.Mobile_No = "";
        } else if (formData.Mobile_No.length < 10) {
            newErrors.Mobile_No = "Invalid Phone Number";
        }
        if (formData.Email_id === "") {
            newErrors.Email_id = "";
        } else if (!emailRegex.test(formData.Email_id)) {
            newErrors.Email_id = "Invalid Email Format";
        }
        if (!formData.Password) {
            newErrors.Password = "* Password Required";
        }
        else if (!passwordRegx.test(formData.Password)) {
            newErrors.Password = "Invalid Email Format";
        }
        if (!formData.Confirm_password) {
            newErrors.Confirm_password = "* Confirm Password Required";
        } else if (formData.Password !== formData.Confirm_password) {
            newErrors.Confirm_password = "Passwords do not match";
        }


        return newErrors;
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validation();
        // Update the state with the validation errors
        setErrors(validationErrors);
        // Check if there are any errors in the validation results
        const hasErrors = Object.values(validationErrors).some(
            (error) => error !== null && error !== "" && error !== undefined
        );
        if (!hasErrors) {
            try {
                const newRecord = {
                    login_id: formData.Login_id,
                    user_name: formData.User_Name,
                    mobile_no: formData.Mobile_No,
                    email_id: formData.Email_id,
                    password: formData.Password,
                    user_status: "Y",
                    create_date: dayjs(new Date()).format("DD/MMM/YYYY"),
                };
                console.log(newRecord);
                const response = await sign_up_Api.user_mast().create(newRecord);
                console.log(response);
                if (response.data.Status === 1) {
                    Swal.fire('Account Created Successfully', 'Login to Enter', 'success');
                    localStorage.setItem("Navigation_state", true);
                    navigate('/')
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: response.data.Error || 'Unknown Error',
                        icon: 'error',
                    });
                }
            } catch (error) {
                Swal.fire('Error', 'Error posting data', 'error');
            }
        }
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={8} lg={8} xl={8}
                    sx={{
                        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://cdn.pixabay.com/photo/2021/12/13/16/20/marketing-6868612_1280.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>
                    <div style={{ marginTop: 151, textAlign: 'center' }}>
                        <h1 style={{ fontSize: 61, color: 'white', marginBottom: 0, paddingBottom: 0, textTransform: 'uppercase', textShadow: '2px 3px black' }}>Hassan Milk Union</h1>
                        <h1 style={{ fontSize: 46, color: 'white', marginTop: 35, textTransform: 'uppercase', textShadow: '2px 3px black' }}>Marketing Module</h1>
                    </div>

                </Grid>

                <Grid item xs={12} sm={8} md={4} lg={4} xl={4} component={Paper} elevation={6} square>
                    <Box sx={{ my: 1, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                        <ThemeProvider theme={defaultTheme}>
                            <Container component="main" maxWidth="xs">
                                <CssBaseline />
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

                                    <img src={logoImage} alt="logo" style={{ width: 200 }} />
                                    <Typography component="h1" variant="h5" marginTop={5}>
                                        Sign Up
                                    </Typography>
                                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                                        {/* ========================= */}
                                        <TextField margin="normal"
                                            required
                                            fullWidth
                                            size='small'
                                            sx={{
                                                marginTop: "-5px", "& .MuiOutlinedInput-root":
                                                    { "& fieldset": { borderColor: "black", borderWidth: "2px" }, }, "& .MuiInputLabel-root": { color: "black" },
                                            }}
                                            label="Login ID"
                                            name="loginid"
                                            value={formData.Login_id || ''}
                                            onChange={(e) =>
                                                handleFieldChange("loginid", e.target.value)
                                            }
                                            error={Boolean(errors.Login_id)}
                                            helperText={errors.Login_id}
                                        />
                                        {/* ========================= */}
                                        <TextField margin="normal"
                                            required
                                            fullWidth
                                            size='small'
                                            sx={{
                                                marginTop: "9px", "& .MuiOutlinedInput-root":
                                                    { "& fieldset": { borderColor: "black", borderWidth: "2px" }, }, "& .MuiInputLabel-root": { color: "black" },
                                            }}
                                            label="User Name"
                                            name="username"
                                            value={formData.User_Name || ''}
                                            onChange={(e) =>
                                                handleFieldChange("username", e.target.value)
                                            }
                                            error={Boolean(errors.User_Name)}
                                            helperText={errors.User_Name}
                                        />
                                        {/* ========================= */}
                                        <TextField margin="normal"
                                            fullWidth
                                            size='small'
                                            sx={{
                                                marginTop: "9px", "& .MuiOutlinedInput-root":
                                                    { "& fieldset": { borderColor: "black", borderWidth: "2px" }, }, "& .MuiInputLabel-root": { color: "black" },
                                            }}
                                            label="Mobile"
                                            name="mobile"
                                            value={formData.Mobile_No || ''}
                                            onChange={(e) =>
                                                handleFieldChange("mobile", e.target.value.replace(/[^0-9.]/g, ''))
                                            }
                                            error={Boolean(errors.Mobile_No)}
                                            helperText={errors.Mobile_No} />
                                        {/* ========================= */}
                                        <TextField margin="normal"
                                            fullWidth
                                            size='small'
                                            sx={{
                                                marginTop: "9px", "& .MuiOutlinedInput-root":
                                                    { "& fieldset": { borderColor: "black", borderWidth: "2px" }, }, "& .MuiInputLabel-root": { color: "black" },
                                            }}
                                            label="Email"
                                            name="email"
                                            value={formData.Email_id || ''}
                                            onChange={(e) =>
                                                handleFieldChange("email", e.target.value)
                                            }
                                            error={Boolean(errors.Email_id)}
                                            helperText={errors.Email_id}
                                        />
                                        {/* ========================= */}
                                        <TextField margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            size='small'
                                            sx={{
                                                marginTop: "9px"
                                                , "& .MuiOutlinedInput-root": {
                                                    "& fieldset": { borderColor: "black", borderWidth: "2px" },
                                                }, "& .MuiInputLabel-root": { color: "black" },
                                            }}
                                            label="Password"
                                            type="password"
                                            value={formData.Password || ''}
                                            onChange={(e) =>
                                                handleFieldChange("password", e.target.value)
                                            }
                                            error={Boolean(errors.Password)}
                                            helperText={errors.Password}
                                        />
                                        {/* ========================= */}
                                        <TextField margin="normal"
                                            required
                                            fullWidth
                                            name="confirmpassword"
                                            size='small'
                                            sx={{
                                                marginTop: "9px"
                                                , "& .MuiOutlinedInput-root": {
                                                    "& fieldset": { borderColor: "black", borderWidth: "2px" },
                                                }, "& .MuiInputLabel-root": { color: "black" },
                                            }}
                                            label="Confirm Password"
                                            type="password"
                                            value={formData.Confirm_password || ''}
                                            onChange={(e) =>
                                                handleFieldChange("confirmpassword", e.target.value)
                                            }
                                            error={Boolean(errors.Confirm_password)}
                                            helperText={errors.Confirm_password}
                                        />
                                        {/* ========================= */}
                                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                            Sign Up
                                        </Button>
                                    </Box>
                                    <Typography component="p" variant="p" marginTop={1}>
                                        Hassan Milk Union                                    </Typography>
                                </Box>
                            </Container>
                            <Typography component="p" variant="p" marginTop={1} sx={{ textAlign: 'center', marginTop: '25px' }}>
                                &copy; Copyright {new Date().getFullYear()} Siri Technologies Mysuru
                            </Typography>
                        </ThemeProvider>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}