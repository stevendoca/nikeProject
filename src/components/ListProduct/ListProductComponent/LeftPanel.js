import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import CheckIcon from "@mui/icons-material/Check";

import React from "react";
import { makeStyles } from "@mui/styles";
import CollapseCheckBox from "./CollapseCheckBox";

const useStyles = makeStyles((theme) => ({
  filter: {
    backgroundColor: "white",
    float: "left",
    width: 190,
    fontSize: 16,
  },
  root: {
    width: 290,
    marginRight: 20,
    "&.down .MuiDrawer-paper": {
      top: "36px",
    },
    "&.up .MuiDrawer-paper": {
      top: "100px",
    },
    "& .MuiDrawer-paper": {
      maxHeight: "100vh",
      top: "0px",
      position: "sticky",
      flexShrink: 0,
      boxSizing: "border-box",
      border: "none",
      marginTop: "20px",
      overflowY: "auto",
      zIndex: 0,
      "&::-webkit-scrollbar": {
        appearance: "none",
        width: "5px",
        maxHeight: "20%",
      },
      "&::-webkit-scrollbar-track": {
        WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0)",
      },
      "&::-webkit-scrollbar-thumb": {
        height: "100px",
        borderRadius: "50px",
        color: "#7e7e7e",
        boxShadow: "inset 0 0 0 20px",
      },
    },
  },
  colorList: {
    display: "flex",
    flexWrap: "wrap",
  },
  toggleBtn: {
    width: "calc(100% / 3 )",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    "& > div": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& svg": {
        transform: "scale(.7)",
        display: "none",
      },
    },
    "& .active": {
      backgroundColor: "red",
      "& svg": {
        display: "block",
      },
    },
    "& div": {
      width: "25px",
      height: "25px",
      borderRadius: "50px",
      border: "1px solid #757575",
    },
    "&:active div": {
      transform: "scale(.95)",
    },
  },
}));
const LeftPanel = (props) => {
  const {
    drawerWidth,
    menu,
    colors,
    open,
    brands,
    sports,
    athletes,
    bestfor,
    collaborator,
    setFilter,
    filter,
  } = props;
  const classes = useStyles();
  const customToggleButton = (value) => {
    return value !== "Multi" ? (
      <Button
        disableRipple
        key={value}
        className={classes.toggleBtn}
        onClick={() => handleFilterColor(value)}
      >
        <div
          style={{ backgroundColor: value }}
          className={filter.listColor.includes(value) ? "active" : ""}
        >
          <CheckIcon sx={{ fill: value !== "white" ? "white" : "black" }} />
        </div>
        <p>{value}</p>
      </Button>
    ) : (
      <Button
        disableRipple
        key={value}
        className={classes.toggleBtn}
        onClick={() => handleFilterColor(value)}
      >
        <div
          style={{
            background:
              "radial-gradient(rgb(255, 255, 255) 20%, transparent 20%) 0px 0px / 15px 15px, radial-gradient(rgb(255, 255, 255) 20%, transparent 20%) 8px 8px, rgb(0, 0, 0)",
          }}
        ></div>
        <p>{value}</p>
      </Button>
    );
  };
  const handleFilterTypeProduct = (key, value) => {
    setFilter({ ...filter, [key]: [value] });
  };
  const handleFilterColor = (value) => {
    if (value === "Multi") return setFilter({ ...filter, listColor: [] });
    const arr = filter.listColor;
    const index = arr.indexOf(value);
    if (index !== -1) {
      arr.splice(index, 1);
    } else {
      arr.push(value);
    }
    setFilter({ ...filter, listColor: arr });
  };
  const handleChangeGender = (event) => {
    const value = event.target.value;
    const arr = filter.gender;
    const index = arr.indexOf(value);
    event.target.checked ? arr.push(value) : arr.splice(index, 1);
    setFilter({ ...filter, gender: arr });
  };

  return (
    <Drawer
      className={classes.root}
      sx={{
        width: drawerWidth,
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <List sx={{ marginBottom: "30px" }}>
        {menu.map((text, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => handleFilterTypeProduct("typeProduct", text)}
          >
            <ListItemButton
              sx={{ padding: 0, "&:hover": { backgroundColor: "transparent" } }}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Accordion disableGutters defaultExpanded sx={{ boxShadow: "none" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ padding: 0 }}>
          <p>Gender</p>
        </AccordionSummary>
        <AccordionDetails
          sx={{ padding: 0, display: "flex", flexDirection: "column" }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filter.gender.includes("male") ? true : false}
                  value="male"
                  onChange={handleChangeGender}
                />
              }
              label="Men"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filter.gender.includes("female") ? true : false}
                  value="female"
                  onChange={handleChangeGender}
                />
              }
              label="Women"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filter.gender.includes("Unisex") ? true : false}
                  value="Unisex"
                  onChange={handleChangeGender}
                />
              }
              label="Unisex"
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Divider />
      <Accordion disableGutters defaultExpanded sx={{ boxShadow: "none" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ padding: 0 }}>
          <p>Kids</p>
        </AccordionSummary>
        <AccordionDetails
          sx={{ padding: 0, display: "flex", flexDirection: "column" }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filter.gender.includes("kid") ? true : false}
                  value="kid"
                  onChange={handleChangeGender}
                />
              }
              label="Boys"
            />
            <FormControlLabel
              control={<Checkbox value="kid" onChange={handleChangeGender} />}
              label="Girls"
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Divider />
      <Accordion disableGutters defaultExpanded sx={{ boxShadow: "none" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ padding: 0 }}>
          <p>Colour</p>
        </AccordionSummary>
        <AccordionDetails
          sx={{ padding: 0, display: "flex", flexDirection: "column" }}
        >
          <div className={classes.colorList}>
            {colors.map((color) => customToggleButton(color))}
            {customToggleButton("Multi")}
          </div>
        </AccordionDetails>
      </Accordion>

      <Divider />
      <CollapseCheckBox title="Brand" arr={brands} />

      <Divider />
      <CollapseCheckBox title="Sports" arr={sports} />

      <Divider />
      <CollapseCheckBox title="Athletes" arr={athletes} />

      <Divider />
      <CollapseCheckBox title="Best for" arr={bestfor} />

      <Divider />
      <Accordion disableGutters defaultExpanded sx={{ boxShadow: "none" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ padding: 0 }}>
          <p>Collaborator</p>
        </AccordionSummary>
        <AccordionDetails
          sx={{ padding: 0, display: "flex", flexDirection: "column" }}
        >
          <FormGroup>
            {collaborator.map((cola, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox />}
                label={cola}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Drawer>
  );
};

export default LeftPanel;
