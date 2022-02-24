import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useRouteMatch ,useHistory} from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from 'react-router-dom';
import NavItem from './NavItem';
import NavNestedItem from './NavNestedItem';
import { loadSideBar } from '../../api/api';


const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  isActive: {
    color: "#428bb7 !important",
  },

  title: {
    backgroundColor: "transparent",
    flexGrow: 1,
  },
  root: {
    display: "flex",
  },

  appBar: {
    color: "#fff",
    backgroundColor: "#428bb7",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    backgroundColor: "#428bb7",
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    padding: "2px",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  bg: {
    display: "flex",
    padding: "7px",
  },
  menuButton: {
    color: "#fff;",
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  routelink: {
    textDecoration: "none",
    color: "inherit",
  },
  name: {
    paddingLeft: "3px",
  },
}));

// const LOGO = styled.img`
// display:block;
// height:auto;
// max-width:150px;
// `;
// const LogoWraper = styled.div`
// flex:2;
// display:flex;
// justify-content:center;
// `;

export default function MiniDrawer(props) {

  const classes = useStyles();

  const history = useHistory();
  const theme = useTheme();
  
  const [name, setName] = React.useState('');

  const [open, setOpen] = React.useState(true);
  const [menuItem, setMenuItem] = React.useState([]);
  let { url } = useRouteMatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const logout = () => {
    localStorage.removeItem('user_auth_config')
    handleClose();
    history.push('/landing')
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const getMenus = () => {
 
    loadSideBar().then((res) => {
      setMenuItem([...res.data.items])
    }).catch((err) => {
      console.log(err)
    })
    // setMenuItem([
    //   { url: "/dashboard", name: "Dashboard", icon: "fas fa-home cst_icn" },
    //   { url: "/student", name: "Students", icon: "fas fa-users" },
    //   { url: "/tutor", name: "Tutors", icon: "fas fa-user-alt" },
    //   { url: "/subjects", name: "Subjects", icon: "fas fa-user-alt" },
    //   { url: "/class", name: "Classes", icon: "fas fa-user-alt" },
    //   { url: "/session", name: "Sessions", icon: "fas fa-user-alt" },

    //   { url: "/landing", name: "landing", icon: "fas fa-user-alt" },


    //   { url: "/tutor-profile", name: "Tutor Profile", icon: "fas fa-user-alt" },
    //   { url: "/student-profile", name: "Student Profile", icon: "fas fa-user-alt" },
    // ])
    // console.log(res);
    // })
    // .catch((err) => {
    // console.log(err)
    // })
  };

  useEffect(() => {
    setName(JSON.parse(localStorage.getItem('user_auth_config')).user.name)
    getMenus();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />

      {/* ToolBar */}

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>

          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={openMenu}
            >
              <AccountCircle />
              <Typography className={classes.name}>{name}</Typography>
            </IconButton>


            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {/* <Link to={`${url}/settings`}> <MenuItem onClick={handleClose}>Setting</MenuItem></Link> */}
              {/* <MenuItem onClick={handleClose}>Change Password</MenuItem> */}
              <MenuItem onClick={(e) => logout(e)}  >Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar >

      {/* ToolBar */}

      <Drawer

        variant={"permanent"}

        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })
        }
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar, classes.bg}>
          {/* <LogoWraper>
            <LOGO className="text-center" src={Logo} alt="LOGO" />
          </LogoWraper> */}

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        {/* navigation list */}

        <List component="nav" aria-labelledby="nested-list-subheader">
          {
            menuItem.map((item, index) => item.children ? <NavNestedItem item={item} key={index} /> : <NavItem item={item} key={index} />)
          }

        </List>




        {/* <FooterContent /> */}
        {/* navigation List */}
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div >
  );
}
