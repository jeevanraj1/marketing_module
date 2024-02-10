import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import logo from './MarketingModule/Images/logo.png'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { sign_in_Api } from './Api';
import Swal from 'sweetalert2';

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate()

  const [formData, setFormData] = React.useState({
    Login_id: "",
    Password: "",
  });

  console.log(formData.Login_id);

  const [errors, setErrors] = React.useState({
    Login_id: "",
    Password: "",
  });

  const validation = () => {
    const newErrors = {};

    if (!formData.Login_id) {
      newErrors.Login_id = "* Login Id Required";
    }
    if (!formData.Password) {
      newErrors.Password = "* Password Required";
    }
    return newErrors;

  }


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

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validation();
    setErrors(validationErrors);
    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== null && error !== "" && error !== undefined
    );
    if (!hasErrors) {
      event.preventDefault();
      try {
        const response = await sign_in_Api.sign_in().fetchby_login_id(formData.Login_id);
        if (response.data.items[0].password === formData.Password) {
          localStorage.setItem('login', 'Success');
          localStorage.setItem('login_id', formData.Login_id);
          localStorage.setItem("Navigation_state", true);
          navigate(`/marketing-module/user=${formData.Login_id}`)
        } else {
          localStorage.setItem('login', 'Fail');
          Swal.fire('', 'Login Id and Password are incorrect', 'warning');
        }
      } catch (error) {
        Swal.fire('', 'User Id and Password are incorrect', 'warning');

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
            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)), url(https://cdn.pixabay.com/photo/2021/12/13/16/20/marketing-6868612_1280.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
          <div style={{ marginTop: 151, textAlign: 'center' }}>
            <h1 style={{ fontSize: 61, color: 'white', marginBottom: 0, paddingBottom: 0, textTransform: 'uppercase', textShadow: '2px 3px black' }}>Hassan Milk Union</h1>
            <h1 style={{ fontSize: 46, color: 'white', marginTop: 35, textTransform: 'uppercase', textShadow: '2px 3px black' }}> Marketing  Module</h1>
          </div>

        </Grid>

        <Grid item xs={12} sm={8} md={4} lg={4} xl={4} component={Paper} elevation={6} square>
          <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <ThemeProvider theme={defaultTheme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

                  <img src={logo} alt="logo" style={{ width: 200 }} />
                  <Typography component="h1" variant="h5" marginTop={5} marginBottom={3}>
                    Log In
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} noValidate >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size='small'
                      onChange={(e) =>
                        handleFieldChange("Login_id", e.target.value)
                      }
                      error={Boolean(errors.Login_id)}
                      helperText={errors.Login_id}
                      sx={{
                        marginTop: "-5px"
                        , "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "black", borderWidth: "2px" },
                        }, "& .MuiInputLabel-root": { color: "black" },
                      }}
                      label="Login ID"
                      name="Login_id"
                    />
                    <TextField
                      margin="normal"
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
                      type="Password"
                      id="Password"
                      autoComplete="current-Password"
                      onChange={(e) =>
                        handleFieldChange("Password", e.target.value)
                      }
                      error={Boolean(errors.Password)}
                      helperText={errors.Password}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                      Log In
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link variant="body2" component={RouterLink} to="/ForgotPassword">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link variant="body2" component={RouterLink} to="/SignUp">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                  <Typography component="p" variant="p" marginTop={1}>
                    Hassan Milk Union
                  </Typography>
                </Box>
              </Container>
              <Typography component="p" variant="p" marginTop={1} sx={{ textAlign: 'center', marginTop: '25px' }}>
                &copy; Copyright {new Date().getFullYear()}. Siri Technologies Mysuru
              </Typography>
            </ThemeProvider>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}


