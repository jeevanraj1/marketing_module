// import React from 'react'

// export default function SignUp() {
//   return (
//     <div>
//       /SignUp
//     </div>
//   )
// }

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


const defaultTheme = createTheme();

export default function SignUp() {
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const enteredUsername = data.get('email');
        const enteredPassword = data.get('password');
        navigate('/')

        // if (enteredUsername === 'milkbill' && enteredPassword === 'milk123') {
        //  } 
        //  else {
        //     // Display alert for invalid user
        //     alert('Invalid user credentials');
        // }
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
                        <h1 style={{ fontSize: 46, color: 'white', marginTop: 35, textTransform: 'uppercase', textShadow: '2px 3px black' }}> Marketing Module</h1>
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
                                        <TextField margin="normal" required fullWidth size='small' sx={{
                                            marginTop: "-5px", "& .MuiOutlinedInput-root":
                                                { "& fieldset": { borderColor: "black", borderWidth: "2px" }, }, "& .MuiInputLabel-root": { color: "black" },
                                        }} id="email" label="Login ID" name="loginid" autoComplete="email" autoFocus />
                                        {/* ========================= */}
                                        <TextField margin="normal" required fullWidth size='small' sx={{
                                            marginTop: "9px", "& .MuiOutlinedInput-root":
                                                { "& fieldset": { borderColor: "black", borderWidth: "2px" }, }, "& .MuiInputLabel-root": { color: "black" },
                                        }} id="email" label="User Name" name="username" autoComplete="email" autoFocus />
                                        {/* ========================= */}
                                        <TextField margin="normal" required fullWidth size='small' sx={{
                                            marginTop: "9px", "& .MuiOutlinedInput-root":
                                                { "& fieldset": { borderColor: "black", borderWidth: "2px" }, }, "& .MuiInputLabel-root": { color: "black" },
                                        }} id="email" label="Mobile" name="mobile" autoComplete="email" autoFocus />
                                        {/* ========================= */}
                                        <TextField margin="normal" required fullWidth size='small' sx={{
                                            marginTop: "9px", "& .MuiOutlinedInput-root":
                                                { "& fieldset": { borderColor: "black", borderWidth: "2px" }, }, "& .MuiInputLabel-root": { color: "black" },
                                        }} id="email" label="Email" name="email" autoComplete="email" autoFocus />
                                        {/* ========================= */}
                                        <TextField margin="normal" required fullWidth name="password" size='small' sx={{
                                            marginTop: "9px"
                                            , "& .MuiOutlinedInput-root": {
                                                "& fieldset": { borderColor: "black", borderWidth: "2px" },
                                            }, "& .MuiInputLabel-root": { color: "black" },
                                        }} label="Password" type="password" id="password"
                                            autoComplete="current-password" />
                                        {/* ========================= */}
                                        <TextField margin="normal" required fullWidth name="password" size='small' sx={{
                                            marginTop: "9px"
                                            , "& .MuiOutlinedInput-root": {
                                                "& fieldset": { borderColor: "black", borderWidth: "2px" },
                                            }, "& .MuiInputLabel-root": { color: "black" },
                                        }} label="Confirm Password" type="password" id="password"
                                            autoComplete="current-password" />
                                        {/* ========================= */}
                                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                            Sign Up
                                        </Button>
                                    </Box>
                                    <Typography component="p" variant="p" marginTop={1}>
                                        Hassan Milk Union Ltd
                                    </Typography>
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
