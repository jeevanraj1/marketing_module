import React, { useState, useEffect } from 'react';
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
import { Collapse } from "@mui/material";
import Popover from '@mui/material/Popover';
import MenuIcon from "@mui/icons-material/Menu";
import CampaignIcon from '@mui/icons-material/Campaign';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import CategoryIcon from '@mui/icons-material/Category';
import TurnSlightRightIcon from '@mui/icons-material/TurnSlightRight';
import Swal from 'sweetalert2';
import ErrorBoundary from './ErrorBoundary';
import customerIcon from './MarketingModule/Images/icons/customer.svg';
import relationIcon from './MarketingModule/Images/icons/relation.svg';
import paymodeICON from './MarketingModule/Images/icons/paymode.svg';
import statusICon from './MarketingModule/Images/icons/marketing-status.svg';
import OfficerIcon from './MarketingModule/Images/icons/officer.svg';
import BillCategoryIcon from './MarketingModule/Images/icons/bill-category.svg';
import RateCategoryIcon from './MarketingModule/Images/icons/rate-category.svg';
import BankMasterIcon from './MarketingModule/Images/icons/bank-master.svg';
import BranchMasterIcon from './MarketingModule/Images/icons/branch-master.svg';
import CustomerTypeIcon from './MarketingModule/Images/icons/customers-type.svg'
import CityIcon from "./MarketingModule/Images/icons/cityIcon.svg"
import TalukIcon from "./MarketingModule/Images/icons/TalukIcon.svg"
import DistrictIcon from "./MarketingModule/Images/icons/DistrictIcon.svg"
import bankIcon from "./MarketingModule/Images/icons/bank.svg"
import AddressIcon from "./MarketingModule/Images/icons/AddressIcon.svg"
import RouteIcon from "./MarketingModule/Images/icons/RouteIcon.svg"
import DistributionRouteIcon from "./MarketingModule/Images/icons/DistributionIcon.svg"
import DistributionBatchIcon from "./MarketingModule/Images/icons/DistributionBatchIcon.svg"


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

const hover = {
    pl: 0,
    height: "30px",
    background: "#fff",
    padding: 2,
    color: "#000",
    '&:hover': {
        backgroundColor: '#1976D2',
        color: '#fff',
    },
}

export default function ResponsiveDrawer() {
    const theme = useTheme();
    const navigate = useNavigate()
    const location = useLocation()
    const [open, setOpen] = useState(true);
    const [openMarketingModule, setOpenMarketingModule] = useState(false);
    const [openMaster, setopenMaster] = useState(false);
    const popOverIconStyle = {
        minWidth: 0,
        mr: open ? 3 : 'auto',
        justifyContent: 'center',
    }
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleLogout = () => {
        localStorage.clear();
        navigate("/")
    };

    const handleMarketingModuleClick = () => {
        setOpenMarketingModule(!openMarketingModule)
        setopenMaster(false)
        setBackgroundColor('#fff');
        setTextColor('#000');
    }
    const handleMasterClick = () => {
        setopenMaster(!openMaster)
        setBackgroundColor('#fff');
        setTextColor('#000');
    }
    const handleListItemClick = (text) => {
        const route = text
        const checkEditState = localStorage.getItem("Navigation_state")
        if (checkEditState === "true" || checkEditState === null) {
            if (route === "/customer") { navigate("customer"); handleClose() }
            else if (route === "/relation") { navigate("relation"); handleClose() }
            else if (route === "/Paymode") { navigate("Paymode"); handleClose() }
            else if (route === "/Status") { navigate("Status"); handleClose() }
            else if (route === "/Officer") navigate("Officer")
            else if (route === "/BillCategory") { navigate("BillCategory"); handleClose() }
            else if (route === "/RateCategory") { navigate("RateCategory"); handleClose() }
            else if (route === "/CustomerType") navigate("CustomerType")
            else if (route === "/BankMaster") { navigate("BankMaster"); handleBankClose() }
            else if (route === "/BranchMaster") { navigate("BranchMaster"); handleBankClose() }
            else if (route === "/District") { navigate("District"); handleAddressClose() }
            else if (route === "/Taluka") { navigate("Taluka"); handleAddressClose() }
            else if (route === "/City") { navigate("City"); handleAddressClose() }
            else if (route === "/DistributionRoute") { navigate("DistributionRoute"); handleRouteClose() }
            else if (route === "/DistrubutionBatch") { navigate("DistrubutionBatch"); handleRouteClose() }
            else if (route === "/Contractor") navigate("Contractor")
            else if (route === "/ContractorType") navigate("ContractorType")
            else if (route === "/Products") navigate("Products")
        }
        else {
            const handleNavigate = async (text) => {
                try {
                    const shouldNavigate = await Swal.fire({
                        title: 'Editing of this page has started!',
                        html: 'Would you like to close without saving press <span style="color:blue;"> OK</span>,<br> To continue the editing press <span style="color:red;"> CANCEL</span>',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'OK',
                        cancelButtonText: 'CANCEL',
                        reverseButtons: true,
                        confirmButtonColor: 'blue',
                        cancelButtonColor: 'red'
                    });
                    if (shouldNavigate.isConfirmed) {
                        localStorage.setItem("Navigation_state", true);
                        handleListItemClick(text);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            handleNavigate(text)
        }

    }

    const [anchorEl, setAnchorEl] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState('#fff');
    const [textColor, setTextColor] = useState('#000');

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

    const [anchorE2, setAnchorE2] = useState(null);
    const openBank = Boolean(anchorE2);
    const bankID = open ? 'simple-popover' : undefined;
    const handleBankClick = (event) => {
        setAnchorE2(event.currentTarget);
        setBackgroundColor('#fff');
        setTextColor('#000');
    }
    const handleBankClose = () => {
        setAnchorE2(null);
        setBackgroundColor('#fff');
        setTextColor('#000');
        console.log("color change in bank close");
    }


    const [anchorE3, setAnchorE3] = useState(null);
    const openAddress = Boolean(anchorE3);
    const AddressId = open ? 'simple-popover' : undefined;
    const handleAddressClick = (event) => {
        setAnchorE3(event.currentTarget);
    }
    const handleAddressClose = () => {
        setAnchorE3(null);
    }

    const [anchorE4, setAnchorE4] = useState(null);
    const openRoutes = Boolean(anchorE4);
    const routeID = open ? 'simple-popover' : undefined;
    const handleRouteClick = (event) => {
        setAnchorE4(event.currentTarget);
    }
    const handleRouteClose = () => {
        setAnchorE4(null);
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <div style={{ maxWidth: "100%" }}>
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
            </div>
            <div style={{ maxWidth: "100%" }}>
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
                                    sx={popOverIconStyle}>
                                    <CampaignIcon sx={{ color: '#ee6c4d', marginRight: 0, fontSize: 30 }} />
                                </ListItemIcon>
                                <ListItemText primary="Marketing Module" className="calibriFont" sx={{ opacity: open ? 1 : 0 }} />
                                {openMarketingModule ? <ExpandLess sx={{ opacity: open ? 1 : 0 }} /> : <ExpandMore sx={{ opacity: open ? 1 : 0 }} />}
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
                                            sx={popOverIconStyle}>
                                            <PersonIcon
                                                sx={{ marginLeft: "-5px", color: "#ffb703", fontSize: 27, }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText sx={{ opacity: open ? 1 : 0 }} className="calibriFont" primary="Master" />
                                        {openMaster ? <ExpandLess sx={{ opacity: open ? 1 : 0, }} /> : <ExpandMore sx={{ opacity: open ? 1 : 0 }} />}
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
                                                    // background:backgroundColor,
                                                    // color:textColor,
                                                }}
                                                onClick={handleClick}
                                            >
                                                <ListItemIcon
                                                    sx={popOverIconStyle}>
                                                    <img src={customerIcon} alt="" width={20} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    sx={{ opacity: open ? 1 : 0, ml: -1 }}
                                                    className="calibriFont"
                                                    primary="Customer"
                                                />
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
                                                <ListItemButton
                                                    sx={hover}
                                                    onClick={() => handleListItemClick("/customer")}
                                                >
                                                    <ListItemIcon>
                                                        <PersonAddAlt1Icon
                                                            sx={{
                                                                ...popOverIconStyle,
                                                                color: " #ffb703"
                                                            }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary="New Customer"
                                                        sx={{ marginLeft: "-25px" }}
                                                        className="calibriFont"
                                                    />
                                                </ListItemButton>
                                                {/* ======== New Customer end =========== */}
                                                <ListItemButton
                                                    sx={hover}
                                                >
                                                    <ListItemIcon>
                                                        <TurnSlightRightIcon
                                                            sx={{
                                                                ...popOverIconStyle,
                                                                color: " #ee6c4d"
                                                            }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary="Add To Route"
                                                        sx={{ marginLeft: "-25px" }}
                                                        className="calibriFont"
                                                    />
                                                </ListItemButton>
                                                {/* ======== Add to route end =========== */}
                                                <ListItemButton
                                                    sx={hover}
                                                >
                                                    <ListItemIcon>
                                                        <CategoryIcon
                                                            sx={{
                                                                ...popOverIconStyle,
                                                                color: " #fb8500"
                                                            }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary="Customer Category"
                                                        sx={{ marginLeft: "-25px" }}
                                                        className="calibriFont"
                                                    />
                                                    {/* ======== Customer end =========== */}
                                                </ListItemButton>
                                                {/* ======== Customer Category  end =========== */}
                                                <ListItem disablePadding sx={{ display: 'block' }}>
                                                    <ListItemButton
                                                        sx={hover}
                                                        onClick={() => { handleListItemClick("/BillCategory") }}
                                                    >
                                                        <ListItemIcon
                                                            sx={popOverIconStyle}
                                                        >
                                                            <img src={BillCategoryIcon} alt="" width={20} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary="Bill Category"
                                                            sx={{ marginLeft: "-10px" }}
                                                            className="calibriFont" />
                                                    </ListItemButton>
                                                </ListItem>
                                                {/* ======== Bill Category end =========== */}
                                                <ListItem disablePadding sx={{ display: 'block' }}>
                                                    <ListItemButton
                                                        sx={hover}
                                                        onClick={() => { handleListItemClick("/RateCategory") }}
                                                    >
                                                        <ListItemIcon
                                                            sx={popOverIconStyle}>
                                                            <img src={RateCategoryIcon} alt="" width={20} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary="Rate Category"
                                                            sx={{ marginLeft: "-10px" }}
                                                            className="calibriFont" />
                                                    </ListItemButton>
                                                </ListItem>
                                                {/* ======== Rate Category end =========== */}
                                                <ListItem disablePadding sx={{ display: 'block' }}>
                                                    <ListItemButton
                                                        sx={hover}
                                                        onClick={() => { handleListItemClick("/Paymode") }}
                                                    >
                                                        <ListItemIcon
                                                            sx={popOverIconStyle}>
                                                            <img src={paymodeICON} alt="" width={20} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary="Pay mode"
                                                            sx={{ marginLeft: "-10px" }}
                                                            className="calibriFont" />
                                                    </ListItemButton>
                                                </ListItem>
                                                {/* ======== Pay Mode end =========== */}
                                                <ListItem disablePadding sx={{ display: 'block' }}>
                                                    <ListItemButton
                                                        sx={hover}
                                                        onClick={() => { handleListItemClick("/Status") }}
                                                    >
                                                        <ListItemIcon
                                                            sx={popOverIconStyle}>
                                                            <img src={statusICon} alt="" width={20} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary="Status"
                                                            sx={{ marginLeft: "-10px" }}
                                                            className="calibriFont" />
                                                    </ListItemButton>
                                                </ListItem>
                                                {/* ======== Status end =========== */}
                                                <ListItem disablePadding sx={{ display: 'block' }}>
                                                    <ListItemButton
                                                        sx={hover}
                                                        onClick={() => { handleListItemClick("/relation") }}
                                                    >
                                                        <ListItemIcon
                                                            sx={popOverIconStyle}>
                                                            <img src={relationIcon} alt="" width={20} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary="Relation"
                                                            sx={{ marginLeft: "-10px" }}
                                                            className="calibriFont" />
                                                    </ListItemButton>
                                                </ListItem>
                                                {/* ======== Relation end =========== */}
                                            </Popover>
                                        </ListItem>
                                        {/* ======== Customer end =========== */}
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
                                                onClick={handleBankClick}
                                            >
                                                <ListItemIcon
                                                    sx={popOverIconStyle}>
                                                    <img src={bankIcon} alt="" width={20} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    sx={{ opacity: open ? 1 : 0, ml: -1 }}
                                                    className="calibriFont"
                                                    primary="Bank"
                                                />
                                            </ListItemButton>
                                            <Popover
                                                id={bankID}
                                                open={openBank}
                                                anchorEl={anchorE2}
                                                onClose={handleBankClose}
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
                                                <ListItem disablePadding sx={{ display: 'block' }}>
                                                    <ListItemButton
                                                        sx={hover}
                                                        onClick={() => { handleListItemClick("/BankMaster") }}
                                                    >
                                                        <ListItemIcon
                                                            sx={popOverIconStyle}>
                                                            <img src={BankMasterIcon} alt="" width={20} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary="Bank Master"
                                                            sx={{ marginLeft: "-10px" }}
                                                            className="calibriFont" />
                                                    </ListItemButton>
                                                </ListItem>
                                                {/* ======== Bank Master end =========== */}
                                                <ListItem disablePadding sx={{ display: 'block' }}>
                                                    <ListItemButton
                                                        sx={hover}
                                                        onClick={() => { handleListItemClick("/BranchMaster") }}
                                                    >
                                                        <ListItemIcon
                                                            sx={popOverIconStyle}>
                                                            <img src={BranchMasterIcon} alt="" width={20} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            className="calibriFont"
                                                            sx={{ marginLeft: "-10px" }}
                                                            primary="Branch Master" />
                                                    </ListItemButton>
                                                </ListItem>
                                                {/* ======== Branch Master end =========== */}
                                            </Popover>
                                        </ListItem>
                                        {/* ======== Bank End =========== */}
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
                                                onClick={handleAddressClick}
                                            >
                                                <ListItemIcon
                                                    sx={popOverIconStyle}>
                                                    <img src={AddressIcon} alt="" width={20} />
                                                </ListItemIcon>
                                                <ListItemText sx={{ opacity: open ? 1 : 0, ml: -1 }}
                                                    className="calibriFont"
                                                    primary="Address" />
                                            </ListItemButton>
                                            <Popover
                                                id={AddressId}
                                                open={openAddress}
                                                anchorEl={anchorE3}
                                                onClose={handleAddressClose}
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
                                                <ListItem disablePadding sx={{ display: 'block' }}>
                                                    <ListItemButton
                                                        sx={hover}
                                                        aria-describedby={ida}
                                                        onClick={() => { handleListItemClick("/District") }}
                                                    >
                                                        <ListItemIcon
                                                            sx={popOverIconStyle}>
                                                            <img src={DistrictIcon} alt="" width={20} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            className="calibriFont"
                                                            sx={{ marginLeft: "-10px" }}
                                                            primary="District" />
                                                    </ListItemButton>
                                                </ListItem>
                                                {/* ======== District Master end =========== */}
                                                <ListItem disablePadding sx={{ display: 'block' }}>
                                                    <ListItemButton
                                                        sx={hover}
                                                        aria-describedby={ida}
                                                        onClick={() => { handleListItemClick("/Taluka") }}
                                                    >
                                                        <ListItemIcon
                                                            sx={popOverIconStyle}>
                                                            <img src={TalukIcon} alt="" width={20} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            sx={{ marginLeft: "-10px" }}
                                                            className="calibriFont"
                                                            primary="Taluk" />
                                                    </ListItemButton>
                                                </ListItem>
                                                {/* ======== Taluka Master End =========== */}
                                                <ListItem disablePadding sx={{ display: 'block' }}>
                                                    <ListItemButton
                                                        sx={hover}
                                                        aria-describedby={ida}
                                                        onClick={() => { handleListItemClick("/City") }}
                                                    >
                                                        <ListItemIcon
                                                            sx={popOverIconStyle}>
                                                            <img src={CityIcon} alt="" width={20} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            className="calibriFont"
                                                            sx={{ marginLeft: "-10px" }}
                                                            primary="City" />
                                                    </ListItemButton>
                                                </ListItem>
                                                {/* ======== City Master end =========== */}
                                            </Popover>
                                        </ListItem>
                                        {/* ======== Address End=========== */}
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
                                                onClick={handleRouteClick}
                                            >
                                                <ListItemIcon
                                                    sx={popOverIconStyle}>
                                                    <img src={RouteIcon} alt="" width={20} />
                                                </ListItemIcon>
                                                <ListItemText sx={{ opacity: open ? 1 : 0, ml: -1 }}
                                                    className="calibriFont"
                                                    primary="Route" />
                                            </ListItemButton>
                                            <Popover
                                                id={routeID}
                                                open={openRoutes}
                                                anchorEl={anchorE4}
                                                onClose={handleRouteClose}
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
                                                <ListItem disablePadding sx={{ display: 'block' }}>
                                                    <ListItemButton
                                                        sx={hover}
                                                        aria-describedby={ida}
                                                        onClick={() => { handleListItemClick("/DistrubutionBatch") }}
                                                    >
                                                        <ListItemIcon
                                                            sx={popOverIconStyle}>
                                                            <img src={DistributionBatchIcon} alt="" width={20} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            sx={{ marginLeft: "-10px" }}
                                                            className="calibriFont"
                                                            primary="Distribution Batch" />
                                                    </ListItemButton>
                                                </ListItem>
                                                {/* ======== Distribution batch end =========== */}
                                                <ListItem disablePadding sx={{ display: 'block' }}>
                                                    <ListItemButton
                                                        sx={hover}
                                                        aria-describedby={ida}
                                                        onClick={() => { handleListItemClick("/DistributionRoute") }}
                                                    >
                                                        <ListItemIcon
                                                            sx={popOverIconStyle}>
                                                            <img src={DistributionRouteIcon} alt="" width={20} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            sx={{ marginLeft: "-10px" }}
                                                            className="calibriFont"
                                                            primary="Distribution Route" />
                                                    </ListItemButton>
                                                </ListItem>
                                                {/* ======== Distribution Route end =========== */}

                                            </Popover>
                                        </ListItem>
                                        {/* ======== Route End=========== */}
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
                                                aria-describedby={ida}
                                                onClick={() => { handleListItemClick("/Officer") }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        mr: open ? 3 : 'auto',
                                                        justifyContent: 'center',
                                                    }}>
                                                    <img src={OfficerIcon} alt="" width={20} />
                                                </ListItemIcon>
                                                <ListItemText sx={{ opacity: open ? 1 : 0, ml: -1 }}
                                                    className="calibriFont"
                                                    primary="Officer" />
                                            </ListItemButton>
                                        </ListItem>
                                        {/* ======== Officers end =========== */}
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
                                                aria-describedby={ida}
                                                onClick={() => { handleListItemClick("/CustomerType") }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        mr: open ? 3 : 'auto',
                                                        justifyContent: 'center',
                                                    }}>
                                                    <img src={CustomerTypeIcon} alt="" width={20} />
                                                </ListItemIcon>
                                                <ListItemText sx={{ opacity: open ? 1 : 0, ml: -1 }}
                                                    className="calibriFont"
                                                    primary="Customer Type" />
                                            </ListItemButton>
                                        </ListItem>
                                        {/* ======== Customer Type end =========== */}
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
                                                aria-describedby={ida}
                                                onClick={() => { handleListItemClick("/Contractor") }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        mr: open ? 3 : 'auto',
                                                        justifyContent: 'center',
                                                    }}>
                                                    <img src={DistrictIcon} alt="" width={20} />
                                                </ListItemIcon>
                                                <ListItemText sx={{ opacity: open ? 1 : 0, ml: -1 }}
                                                    className="calibriFont"
                                                    primary="Contractor" />
                                            </ListItemButton>
                                        </ListItem>
                                        {/* ======== Contractor Type end =========== */}
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
                                                aria-describedby={ida}
                                                onClick={() => { handleListItemClick("/Products") }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        mr: open ? 3 : 'auto',
                                                        justifyContent: 'center',
                                                    }}>
                                                    <img src={DistrictIcon} alt="" width={20} />
                                                </ListItemIcon>
                                                <ListItemText sx={{ opacity: open ? 1 : 0, ml: -1 }}
                                                    className="calibriFont"
                                                    primary="Products" />
                                            </ListItemButton>
                                        </ListItem>
                                        {/* ======== Products Type end =========== */}
                                    </Collapse>
                                </ListItem>
                            </Collapse>
                        </ListItem>
                    </List>
                </Drawer>
            </div>
            <div style={{ maxWidth: "100%", overflow: "auto" }}>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Box>
                        <ErrorBoundary key={location.pathname} componentName="outlet" ><Outlet /></ErrorBoundary>
                    </Box>
                </Box>
            </div>
        </Box>
    );
}