/**
=========================================================
* Soft UI Dashboard PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// clsx is a utility for constructing className strings conditionally
import clsx from "clsx";

// @mui material components
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard PRO React example components
import SidenavCollapse from "./SidenavCollapse";
import SidenavList from "./SidenavList";
import SidenavItem from "./SidenavItem";

// Custom styles for the Sidenav
import styles from "./styles/sidenav";

// Images
import { TnafosSearchLogo } from "../../../assets/icons/svg/TnafosSearchLogo";

// Soft UI Dashboard PRO React context
import { useSoftUIController } from "context";
import SidebarMenu from "constants/SidebarMenu";
import { ListItemSecondaryAction } from "@mui/material";

function Sidenav({ routes, ...rest }) {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [openNestedCollapse, setOpenNestedCollapse] = useState(false);
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentSidenav } = controller;
  const classes = styles({ miniSidenav, transparentSidenav });
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];
  const itemName = pathname.split("/").slice(1)[1];

  const closeSizenav = () => dispatch({ type: "MINI_SIDENAV", value: true });

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      dispatch({
        type: "MINI_SIDENAV",
        value: window.innerWidth < 1200,
      });
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  // Render all the nested collapse items from the routes.js
  const renderNestedCollapse = (collapse) => {
    const template = collapse.map(({ name, route, key, items, to }) =>
      to ? (
        <Link
          key={items.id}
          href={items.to}
          target="_blank"
          rel="noreferrer"
          className={classes.sidenav_navlink}
        >
          <SidenavItem name={items.title} nested />
        </Link>
      ) : (
        <NavLink to={route} key={items.id} className={classes.sidenav_navlink}>
          <SidenavItem name={items.title} active={route === pathname} nested />
        </NavLink>
      )
    );

    return template;
  };

  // Render the all the collpases from the routes.js
  const renderCollapse = (collapses) =>
    collapses.map(({ name, collapse, item, route, href, key }) => {
      let returnValue;

      if (collapse) {
        returnValue = (
          <SidenavItem
            key={item.id}
            name={item.heading}
            active={key === itemName}
            open={openNestedCollapse === name}
            onClick={() =>
              openNestedCollapse === name
                ? setOpenNestedCollapse(false)
                : setOpenNestedCollapse(name)
            }
          >
            {renderNestedCollapse(collapse)}
          </SidenavItem>
        );
      } else {
        returnValue = item.to ? (
          <Link
            href={item.to}
            key={item.id}
            target="_blank"
            rel="noreferrer"
            className={classes.sidenav_navlink}
          >
            <SidenavItem name={item.heading} active={key === itemName} />
          </Link>
        ) : (
          <NavLink to={route} key={key} className={classes.sidenav_navlink}>
            <SidenavItem name={name} active={key === itemName} />
          </NavLink>
        );
      }
      return <SidenavList key={item.id}>{returnValue}</SidenavList>;
    });

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = SidebarMenu.map(
    ({ type, name, icon, title, item, collapse, noCollapse, key, route }) => {
      let returnValue;

      if (type === "collapse") {
        returnValue = item.to ? (
          <Link
            href={item.to}
            key={item.id}
            target="_blank"
            rel="noreferrer"
            className={classes.sidenav_navlink}
          >
            <SidenavCollapse
              name={item.heading}
              icon={item.icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </Link>
        ) : (
          <SidenavCollapse
            key={item.id}
            name={item.heading}
            icon={item.icon}
            active={key === collapseName}
            open={openCollapse === name}
            onClick={() =>
              openCollapse === name
                ? setOpenCollapse(false)
                : setOpenCollapse(name)
            }
          >
            {collapse ? renderCollapse(collapse) : null}
          </SidenavCollapse>
        );
      } else if (type === "title") {
        returnValue = (
          <SuiTypography
            key={item.id}
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            customClass={classes.sidenav_title}
          >
            {item.heading}
          </SuiTypography>
        );
      } else if (type === "divider") {
        returnValue = <Divider key={key} />;
      }

      return returnValue;
    }
  );

  return (
    <Drawer
      {...rest}
      variant="permanent"
      classes={{
        paper: clsx(classes.sidenav, {
          [classes.sidenav_open]: !miniSidenav,
          [classes.sidenav_close]: miniSidenav,
        }),
      }}
    >
      <SuiBox customClass={classes.sidenav_header}>
        <SuiBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          customClass="cursor-pointer"
          onClick={closeSizenav}
        >
          <SuiTypography variant="h6" textColor="secondary">
            <Icon className=" font-bold">close</Icon>
          </SuiTypography>
        </SuiBox>
        <NavLink to="/">
          <SuiBox
            component="img"
            src={TnafosSearchLogo}
            alt="Soft UI Logo"
            customClass={classes.sidenav_logo}
          />
          {/* <SuiBox customClass={classes.sidenav_logoLabel}>
            <SuiTypography component="h6" variant="button" fontWeight="medium">
              Soft UI Dashboard PRO
            </SuiTypography>
          </SuiBox> */}
        </NavLink>
      </SuiBox>
      <Divider />
      <List>{renderRoutes}</List>

      {/* <SuiBox customClass={classes.sidenav_footer}>
        <SidenavCard />
      </SuiBox> */}
    </Drawer>
  );
}

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  SidebarMenu: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;