import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PersonIcon from "@mui/icons-material/Person";
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import RoutingComponent from './RoutingComponent';
import { Collapse } from "@mui/material";
import Popover from '@mui/material/Popover';
import Diversity3Icon from "@mui/icons-material/Diversity3";
import MenuIcon from "@mui/icons-material/Menu";
import CampaignIcon from '@mui/icons-material/Campaign';
import Groups2Icon from '@mui/icons-material/Groups2';
import { useNavigate } from 'react-router-dom';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import CategoryIcon from '@mui/icons-material/Category';
import TurnSlightRightIcon from '@mui/icons-material/TurnSlightRight';
const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function ResponsiveDrawer({ onLogout }) {
    const theme = useTheme();
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(true);
    const [openMarketingModule, setOpenMarketingModule] = React.useState(false);
    const [openMaster, setopenMaster] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleLogout = () => {
        localStorage.removeItem("Navigation_state");
        onLogout();
    };

    const handleMarketingModuleClick = () => {
        setOpenMarketingModule(!openMarketingModule)
        setopenMaster(false)
    }
    const handleMasterClick = () => {
        setopenMaster(!openMaster)
    }
    const handleListItemClick = (text) => {
        const route = text
        if (route === "/customer") navigate("/customer")
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [backgroundColor, setBackgroundColor] = React.useState('#fff');
    const [textColor, setTextColor] = React.useState('#000');

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setBackgroundColor('#1976D2');
        setTextColor('#fff');

    };

    const handleClose = () => {
        setAnchorEl(null);
        setBackgroundColor('#fff');
        setTextColor('#000');
    };

    const openkaro = Boolean(anchorEl);
    const ida = open ? 'simple-popover' : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Marketing Module
                    </Typography>
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" onClick={handleLogout}>Logout</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                pl: 2,
                                height: "30px",
                                '&:hover': {
                                    backgroundColor: '#1976D2',
                                    color: 'white',
                                },
                            }}
                            onClick={() => handleMarketingModuleClick()}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}>
                                <CampaignIcon sx={{ color: 'blue', marginRight: 0 }} />
                            </ListItemIcon>
                            <ListItemText  primary="Marketing Module" className="calibriFont" sx={{ opacity: open ? 1 : 0 }}/>
                            {openMarketingModule ? <ExpandLess sx={{ opacity: open ? 1 : 0 }}/> : <ExpandMore sx={{ opacity: open ? 1 : 0 }}/>}
                        </ListItemButton>
                        <Collapse
                            in={openMarketingModule}
                            timeout="auto"
                            unmountOnExit>
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        height: 30,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 4,
                                        '&:hover': {
                                            backgroundColor: '#1976D2',
                                            color: 'white',
                                        },
                                    }}
                                    onClick={() => handleMasterClick()}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}>
                                        <PersonIcon
                                            sx={{ marginLeft: "-5px", color: "lightskyblue" }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText sx={{ opacity: open ? 1 : 0 }} className="calibriFont" primary="Master"/>
                                    {openMaster ? <ExpandLess sx={{ opacity: open ? 1 : 0 }}/> : <ExpandMore sx={{ opacity: open ? 1 : 0 }}/>}
                                </ListItemButton>
                                <Collapse
                                    in={openMaster}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <ListItem disablePadding sx={{ display: 'block' }}>
                                        <ListItemButton
                                            sx={{
                                                height: 30,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 6,
                                                '&:hover': {
                                                    backgroundColor: '#1976D2',
                                                    color: 'white',
                                                },
                                            }}
                                            aria-describedby={ida} onClick={handleClick}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}>
                                                <Groups2Icon sx={{ color: "orange" }} />
                                            </ListItemIcon>
                                            <ListItemText sx={{ opacity: open ? 1 : 0 }} className="calibriFont" primary="Customer"/>
                                        </ListItemButton>
                                        <Popover
                                            id={ida}
                                            open={openkaro}
                                            anchorEl={anchorEl}
                                            onClose={handleClose}
                                            onClick={() => {
                                                setBackgroundColor('#1976D2');
                                                setTextColor('#fff');
                                            }}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <div style={{ background: "#fff" }}>
                                                <ListItemButton
                                                    sx={{
                                                        pl: 0,
                                                        height: "30px",
                                                        background: "#fff",
                                                        padding: 2,
                                                        color: "#000",
                                                        '&:hover': {
                                                            backgroundColor: '#1976D2',
                                                            color: '#fff',
                                                        },
                                                    }}
                                                    onClick={() => handleListItemClick("/customer")}
                                                >
                                                    <ListItemIcon>
                                                        <PersonAddAlt1Icon
                                                            sx={{ marginLeft: "-5px", color: "orange" }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary="New Customer"
                                                        sx={{ marginLeft: "-30px" }}
                                                        className="calibriFont"
                                                    />
                                                </ListItemButton>
                                                <ListItemButton
                                                    sx={{
                                                        pl: 0,
                                                        height: "30px",
                                                        background: "#fff",
                                                        padding: 2,
                                                        color: "#000",
                                                        '&:hover': {
                                                            backgroundColor: 'orange',
                                                            color: '#fff',
                                                        },
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <TurnSlightRightIcon
                                                            sx={{ marginLeft: "-5px", color: "blue" }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary="Add To Route"
                                                        sx={{ marginLeft: "-30px" }}
                                                        className="calibriFont"
                                                    />
                                                </ListItemButton>
                                                <ListItemButton
                                                    sx={{
                                                        pl: 0,
                                                        height: "30px",
                                                        background: "#fff",
                                                        padding: 2,
                                                        color: "#000",
                                                        '&:hover': {
                                                            backgroundColor: '#1976D2',
                                                            color: '#fff',
                                                        },
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <CategoryIcon
                                                            sx={{ marginLeft: "-5px", color: "orange" }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary="customer category"
                                                        sx={{ marginLeft: "-30px" }}
                                                        className="calibriFont"
                                                    />
                                                </ListItemButton>
                                            </div>
                                        </Popover>
                                    </ListItem>
                                </Collapse>
                            </ListItem>
                        </Collapse>
                    </ListItem>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <div>
                    <RoutingComponent />
                </div>
            </Box>
        </Box>
    );
}