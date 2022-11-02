import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
// import Button from "@material-ui/core/Button";
import React, { useEffect } from "react";
import { useState } from "react";
import API from "../../Axios/API";
import AddIcon from "@mui/icons-material/Add";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "100%",
  },
  sizeUl: {
    listStyle: "none",
  },
  MuiButton: {
    "& .MuiButton-root": {
      margin: "0.5rem",
    },
  },
  delete: {
    position: "relative",
  },
  hiddenClear: {
    position: "absolute",
    top: "0",
    right: "0",
    color: "#fff",
    background: "#555",
    opacity: "0.5",
    cursor: "pointer",
    fontSize: "20px",
    "&:hover": {
      opacity: "1",
      color: "#f50057",
      background: "#efefef",
    },
  },
}));
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
const EditProduct = (props) => {
  const item = props.item;
  const [newData, setNewData] = useState({
    _id: item._id,
    color: item.color,
    typeProduct: item.typeProduct,
    img: item.img,
    name: item.name,
    message: item.message,
    price: item.price,
    description: item.description,
    sizes: item.sizes,
    imgDetails: item.imgDetails,
    userCreated: item.userCreated,
    gender: item.gender,
    status: item.status,
  });
  const [selectedCategory, setSelectedCategory] = useState(item.typeProduct);
  const [category, setCategory] = useState([]);
  const [genders, setGender] = useState([]);
  const [size, setSize] = useState(newData.sizes);
  const [imgDetailsColor, setImgDetailsColor] = useState(newData.imgDetails);
  const sizeData = [...size];
  const classes = useStyles();
  const getCategories = async () => {
    const res = await API(`product/categories`, "GET");
    setCategory(res.data);
  };
  const getGenders = async () => {
    const res = await API(`product/genders`, "GET");
    console.log("gender", res.data);
    setGender(res.data);
  };
  const handleChangeCategory = (e) => {
    setSelectedCategory(e.target.value);
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };
  const handleChangeGender = (e) => {
    setGender(e.target.value);
    setNewData({ ...newData, gender: e.target.value });
  };
  const handleChangeDetail = () => {};
  let newSize = null;
  const handleChangeSize = (e) => {
    newSize = { size: e.target.value };
  };
  const handleAddSize = (e) => {
    e.preventDefault();
    if (newSize === null) {
      alert("Enter size please");
    } else {
      const found = size.some((item) => item.size === newSize.size);
      if (found) {
        alert("This size already exist");
      } else {
        sizeData.push(newSize);
        setSize(sizeData);
        setNewData({ ...newData, sizes: size });
      }
    }
  };
  const handleDelete = (sizeDelete) => () => {
    setSize((item) => item.filter((size) => size !== sizeDelete));
  };
  let colorData = null;
  let newImg = [...imgDetailsColor];
  let detailColorGallery = null;
  const handleColor = (e) => {
    colorData = { color: e.target.value, imgs: [] };
  };
  const handleAddColor = (e) => {
    e.preventDefault();
    if (colorData === null) {
      alert("Please enter color");
    } else {
      const found = newImg.some((item) => item.color === colorData.color);
      if (found) {
        alert("Color already exist");
      } else {
        newImg.push(colorData);
        setImgDetailsColor(newImg);
        setNewData({ ...newData, imgDetails: newImg });
      }
    }
  };
  const handleAddColorImg = (index) => {
    const found = newImg[index].imgs.some(
      (el) => el.img === detailColorGallery.img
    );
    if (detailColorGallery === null) {
      alert("Please enter ulr");
    } else {
      if (found) {
        alert("Your image already exist in the gallery");
      } else {
        newImg[index].imgs.push(detailColorGallery);
        setImgDetailsColor(newImg);
        setNewData({ ...newData, imgDetails: newImg });
      }
    }
  };
  const listSize = size.map((item) => {
    return <Chip label={item.size} onDelete={handleDelete} />;
  });

  useEffect(() => {
    getCategories();
    getGenders();
  }, []);
  return (
    <div className={classes.container}>
      <AppBar sx={{ position: "relative" }} className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Edit {item.name}
          </Typography>
          <Button>Cancel</Button>
          <Button autoFocus color="inherit">
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>
        <Grid container spacing={4} style={{ maxWidth: "100%" }}>
          <Grid item xs={4} style={{ padding: "1rem" }}>
            <Box component="form">
              <TextField
                style={{ margin: "1rem 0" }}
                variant="outlined"
                fullWidth
                label="Name"
                id="name"
                defaultValue={item.name}
                onChange={handleChangeDetail}
              />
              <TextField
                style={{ margin: "1rem 0" }}
                variant="outlined"
                fullWidth
                label="Short Description"
                id="description"
                defaultValue={item.message}
                onChange={handleChangeDetail}
              />
              <TextField
                style={{ margin: "1rem 0" }}
                variant="outlined"
                fullWidth
                label="Detail"
                multiline
                minRows={4}
                id="detail"
                defaultValue={item.description}
                onChange={handleChangeDetail}
              />
              <TextField
                style={{ margin: "1rem 0" }}
                id="outlined-select-currency"
                fullWidth
                select
                label="Product Type"
                onChange={handleChangeCategory}
              >
                {category.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Gender"
                style={{ margin: "1rem 0" }}
                id="outlined-select-currency"
                fullWidth
                select
                lable="Genders"
                onChange={handleChangeGender}
              >
                {genders.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                style={{ margin: "1rem 0" }}
                label="Color"
                fullWidth
                id="color"
                defaultValue={item.color}
                onChange={handleChangeDetail}
              />
              <TextField
                style={{ margin: "1rem 0" }}
                label="Price"
                fullWidth
                id="price"
                defaultValue={item.price}
                onChange={handleChangeDetail}
              />
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box>
              <div>
                <h3>Thumbnail</h3>
                <Box display="inline">
                  <img src={item.img} width="70px" height="70px" />
                  <TextField
                    style={{ margin: "0 1rem" }}
                    variant="outlined"
                    label="Image"
                    id="img"
                    onChange={handleChangeDetail}
                    defaultValue={item.img}
                  />
                </Box>
              </div>
              <Divider />
              <div>
                <h3>Sizes</h3>
                <Box>
                  <TextField
                    label="Add Size"
                    id="size"
                    onChange={handleChangeSize}
                  />
                  <Button
                    style={{ margin: "0.5rem" }}
                    variant="outlined"
                    className={classes.MuiButton}
                    onClick={handleAddSize}
                    color="primary"
                  >
                    Add <AddIcon />
                  </Button>
                </Box>
              </div>
              <Paper
                maxWidth="100px"
                style={{ height: "90px", paddingTop: "2px", marginTop: "10px" }}
              >
                <ul className={classes.sizeUl}>
                  <li className={classes.sizeUl}></li>
                  {listSize}
                </ul>
              </Paper>
              <Divider />
              <div>
                <h3>Gallery</h3>
                <Box>
                  <TextField label="Color" id="color" onChange={handleColor} />
                  <Button
                    style={{ margin: "0.5rem" }}
                    variant="outlined"
                    className={classes.MuiButton}
                    onClick={handleAddColor}
                  >
                    Add <AddIcon />
                  </Button>
                </Box>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default EditProduct;
