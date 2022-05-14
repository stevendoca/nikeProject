import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { MenuItem, Skeleton } from "@mui/material";
import { Hidden } from "@mui/material";

const MerchMenus = styled("div")(({ theme }) => ({
  width: 880,
  margin: "auto",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));
const MenuTitle = styled(Paper)(() => ({
  display: "block",
  marginBottom: 24,
  fontSize: 16,
  color: "black",
  textDecoration: "none",
  boxShadow: "none",
  "&:hover": {
    color: "black",
  },
}));
const menuItem = styled(Paper)(() => ({
  display: "block",
  color: "#757575",
  marginBottom: 12,
  fontSize: 16,
  textDecoration: "none",
  lineHeight: 1.428571,
  boxShadow: "none",
  "&:hover": {
    color: "black",
  },
}));
const MerchMenuMobile = styled(Paper)(() => ({
  marginLeft: 24,
  marginBottom: 20,
  boxShadow: "none",
}));
const MerchMenu = (props) => {
  const [merchMenu, setMerchMenu] = useState(false);
  const [merchMobile, setMerchMobile] = useState(0);
  return (
    <div>
      <Hidden xsDown>
        <MerchMenus>
          <Grid
            container
            spacing={3}
            onMouseEnter={() => setMerchMenu(true)}
            onMouseLeave={() => setMerchMenu(false)}
          >
            {" "}
            {props.merch?.map((item, key) => {
              return (
                <Grid key={key} item sm={3}>
                  <MenuTitle>{item.heading}</MenuTitle>
                  <MenuItem>{item.title1}</MenuItem>
                  <MenuItem>{item.title2}</MenuItem>
                  <MenuItem>{item.title3}</MenuItem>
                  <MenuItem>{item.title4}</MenuItem>
                  {merchMenu && (
                    <div>
                      <MenuItem>{item.title5}</MenuItem>
                      <MenuItem>{item.title6}</MenuItem>
                      <MenuItem>{item.title7}</MenuItem>
                      <MenuItem>{item.title8}</MenuItem>
                      <MenuItem>{item.title9}</MenuItem>
                      <MenuItem>{item.title10}</MenuItem>
                      <MenuItem>{item.title11}</MenuItem>
                      <MenuItem>{item.title12}</MenuItem>
                    </div>
                  )}
                </Grid>
              );
            })}
          </Grid>
        </MerchMenus>
      </Hidden>
      {/* merchMenu for mobile */}
      <Hidden smUp>
        {props.merch?.map((item, key) => {
          return (
            <div key={key}>
              <MenuItem
                onClick={() =>
                  setMerchMobile((prevState) => ({
                    show: !prevState.show,
                    index: key + 1,
                  }))
                }
              >
                {item.heading}
              </MenuItem>
              {merchMobile.show && merchMobile.index === key + 1 && (
                <MerchMenuMobile>
                  <MenuItem>{item.title1}</MenuItem>
                  <MenuItem>{item.title2}</MenuItem>
                  <MenuItem>{item.title3}</MenuItem>
                  <MenuItem>{item.title4}</MenuItem>
                  <MenuItem>{item.title5}</MenuItem>
                  <MenuItem>{item.title6}</MenuItem>
                  <MenuItem>{item.title7}</MenuItem>
                  <MenuItem>{item.title8}</MenuItem>
                  <MenuItem>{item.title9}</MenuItem>
                  <MenuItem>{item.title10}</MenuItem>
                  <MenuItem>{item.title11}</MenuItem>
                  <MenuItem>{item.title12}</MenuItem>
                </MerchMenuMobile>
              )}
            </div>
          );
        })}
      </Hidden>
    </div>
  );
};

export default MerchMenu;
