import React from "react";
// import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink, useRouteMatch } from "react-router-dom";


const useStyles = makeStyles((theme) => ({


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
    textDecoration: "none !important",
    color: "inherit",
  },
  name: {
    paddingLeft: "3px",
  },
}));
export default function NavItem(props) {
  const classes = useStyles();

  let { path, url } = useRouteMatch();

  let Icon = `${props.item.icon}`
  return (
          <NavLink activeStyle={{ color: '#428bb7' }} to={`${path}${props.item.url}`} className={classes.routelink} activeClassName={classes.isActive} >
      <ListItem
        className={classes.SideBarBtn}
        button
      >
        
        <ListItemIcon>
        <i className={props.item.icon} ></i>
        </ListItemIcon>
        <ListItemText primary={props.item.name} />
      </ListItem>
    </NavLink>
  )
}