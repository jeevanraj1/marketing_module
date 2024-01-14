import { Grid, Typography } from "@mui/material";
import React from "react";
import logo from "./MarketingModule/Images/logo.png"

function Welcome() {
  React.useEffect(() => {
    document.title = 'Welcome'
  }, [])
  return (
    <Grid container spacing={1} sx={{ padding: '60px', width:1111}}>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={logo} style={{ width: '280px' }} alt="Logo" />
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            color: "#0628F6",
            // textShadow: "2px 2px #000",
            marginBottom: "20px",
            fontWeight:'bold',
          }}
        >
          Welcome to
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            color: "#0628F6",
            // textShadow: "2px 2px #000",
            fontWeight:'bold'
          }}
        >
          Marketing Module
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Welcome;