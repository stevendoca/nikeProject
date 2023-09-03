// import { FormControlLabel, Grid, makeStyles } from "@material-ui/core";

// import { withStyles } from "@material-ui/styles";
// import Checkbox from "@mui/material/Checkbox";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import { Skeleton } from "@mui/material";
// import {
//   filterColorHandler,
//   filterSizeHandler,
// } from "../../../features/product/productSlice";
// const useStyles = makeStyles({
//   Filter: {
//     backgroundColor: "white",
//     float: "left",
//     width: 190,
//     fontSize: 16,
//   },
//   FilterTop: {
//     paddingBottom: 40,
//   },
//   FilterItem: {
//     color: "black",
//     textDecoration: "none",
//     "&:hover": {
//       color: "#757575",
//     },
//     fontSize: 16,
//   },
//   FilterGroup: {
//     paddingBottom: 20,
//     borderTop: "1px solid #e5e5e5",
//   },
//   FilterName: {
//     padding: "12px 0",
//     cursor: "pointer",
//     color: "black",
//   },
//   FilterIcon: {
//     float: "right",
//   },
//   FilterCheckboxContainer: {
//     paddingLeft: 5,
//   },
//   FilterCheckboxLabel: {
//     "&:hover": {
//       color: "#757575",
//     },
//   },
//   Color: {
//     width: 28,
//     height: 28,
//     borderRadius: "50%",
//     paddingTop: 3,
//     color: "white",
//     fontWeight: "bold",
//   },
//   ColorContainer: {
//     cursor: "pointer",
//   },
//   ColorName: {
//     marginTop: 5,
//     fontSize: 12,
//     "&:hover": {
//       color: "#757575",
//     },
//   },
//   size: {
//     padding: "5px 10px",
//     textAlign: "center",
//     border: "1px #CCCCCC solid",
//     borderRadius: 5,
//     cursor: "pointer",
//   },
// });
// const BlackCheckBox = withStyles({
//   root: {
//     width: 30,
//     height: 30,
//     color: "#cccccc",
//     "&$checked": {
//       color: "black",
//     },
//   },
//   checked: {},
// })((props) => <Checkbox color="default" {...props} />);

// const ListProductFilter = (props) => {
//   const classes = useStyles();
//   const dispatch = useDispatch();

//   const filterColor = useSelector((state) => state.product.filterColor);
//   const filterSize = useSelector((state) => state.product.filterSize);
//   const data = useSelector((state) => state.product.data);
//   const isLoading = useSelector((state) => state.product.isLoading);

//   const [gender, setGender] = useState(true);
//   const [color, setColor] = useState(true);
//   const [brand, setBrand] = useState(true);
//   const [sport, setSport] = useState(true);
//   const [athlete, setAthlete] = useState(true);
//   const [bestFor, setBestFor] = useState(true);
//   const [collaborator, setCollaborator] = useState(true);
//   useEffect(() => {
//     console.log("filterColor ", filterColor);
//   }, [filterColor]);
//   const capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };
//   var colorDataStorageTemp = new Set();
//   var colorData = [];
//   for (let i = 0; i < data.length; i++) {
//     for (let j = 0; j < data[i].imgDetails.length; j++) {
//       const colorSplit = data[i].imgDetails[j].color.split("/");
//       for (let n = 0; n < colorSplit.length; n++) {
//         colorDataStorageTemp.add(colorSplit[n]);
//       }
//     }
//   }
//   for (let item of colorDataStorageTemp) {
//     colorData.push(item);
//   }
//   let listColorLazyLoad = [];
//   for (let i = 0; i < 12; i++) {
//     listColorLazyLoad.push(
//       <Grid item xs={4} className={classes.ColorContainer}>
//         {" "}
//         <Skeleton>
//           <div
//             className={classes.Color}
//             style={{
//               backgroundColor: "white",
//               color: "black",
//               border: "1px #CCCCCC solid",
//             }}
//           >
//             &#1003
//           </div>
//         </Skeleton>{" "}
//         <Skeleton>
//           {" "}
//           <div className={classes.ColorName}>black</div>
//         </Skeleton>
//       </Grid>
//     );
//   }
//   const handleFilterAndClickFilterColor = async (item) => {
//     await clickFilterColor(item);
//     props.handleFilter(item);
//   };
//   const clickFilterColor = (filter) => {
//     if (filter !== "") {
//       if (filterColor.indexOf(filter) > -1) {
//         const tempfilterColor = [...filterColor];
//         tempfilterColor.splice(filterColor.indexOf(filter), 1);
//         dispatch(filterColorHandler({ filterColor: tempfilterColor }));
//       } else {
//         const tempFilterColor = [...filterColor];
//         tempFilterColor.push(filter);
//         dispatch(filterColorHandler({ filterColor: tempFilterColor }));
//       }
//     } else {
//       dispatch(filterColorHandler({ filterColor: [] }));
//       dispatch(filterSizeHandler({ filterSize: [] }));
//     }
//   };
//   const listColor = colorData.map((item, index) => (
//     <Grid
//       key={index}
//       item
//       xs={4}
//       className={classes.ColorContainer}
//       onClick={() => {
//         clickFilterColor(item);
//         props.handleFilter(item);
//       }}
//     >
//       {item === "white" ? (
//         <center>
//           {filterColor.indexOf(item) === -1 ? (
//             <div
//               className={classes.Color}
//               style={{ backgroundColor: item, border: "1px #CCCCCC solid" }}
//             ></div>
//           ) : (
//             <div
//               className={classes.Color}
//               style={{
//                 backgroundColor: item,
//                 color: "black",
//                 border: "1px #CCCCCC solid",
//               }}
//             >
//               &#10003;
//             </div>
//           )}
//           <div className={classes.ColorName}>{capitalizeFirstLetter(item)}</div>
//         </center>
//       ) : (
//         <center>
//           {filterColor.indexOf(item) === -1 ? (
//             <div
//               className={classes.Color}
//               style={{ backgroundColor: item }}
//             ></div>
//           ) : (
//             <div className={classes.Color} style={{ backgroundColor: item }}>
//               &#10003;
//             </div>
//           )}
//           <div className={classes.ColorName}>{capitalizeFirstLetter(item)}</div>
//         </center>
//       )}
//     </Grid>
//   ));

//   const clickFilterSize = (filter) => {
//     if (filterSize.indexOf(filter) > -1) {
//       filterSize.splice(filterSize.indexOf(filter), 1);
//       dispatch(filterSizeHandler({ filterSize: filterSize }));
//     } else {
//       const tempFilterSize = [...filterSize];
//       tempFilterSize.push(filter);
//       dispatch(filterSizeHandler({ filterSize: tempFilterSize }));
//     }
//   };
//   let sizeDataStorageTemp = new Set();
//   let sizeData = [];
//   for (let i = 0; i < data.length; i++) {
//     for (let j = 0; j < data[i].sizes.length; j++) {
//       sizeDataStorageTemp.add(data[i].sizes[j].size);
//     }
//   }
//   for (let item of sizeDataStorageTemp) {
//     sizeData.push(item);
//   }
//   let listSize = sizeData.map((item, index) => (
//     <Grid item xs={4} key={index}>
//       {" "}
//       {filterSize.indexOf(item) === -1 ? (
//         <div
//           className={classes.size}
//           onClick={() => {
//             clickFilterSize(item);
//             props.handleFilter(item);
//           }}
//         >
//           {item}
//         </div>
//       ) : (
//         <div
//           className={classes.size}
//           style={{ border: "1px black solid" }}
//           onClick={() => {
//             clickFilterSize(item);
//             props.handleFilter(item);
//           }}
//         >
//           {item}
//         </div>
//       )}
//     </Grid>
//   ));

//   return (
//     <Grid item md={2}>
//       <div className={classes.Filter}>
//         <div className={classes.FilterTop}>
//           <a href="#a" className={classes.FilterItem}>
//             Clothing
//           </a>
//         </div>
//         <div className={classes.FilterGroup}>
//           <div
//             className={classes.FilterName}
//             onClick={() => setGender((gender) => !gender)}
//           >
//             Gender
//             {gender && <ExpandLessIcon className={classes.FilterIcon} />}
//             {!gender && <ExpandMoreIcon className={classes.FilterIcon} />}
//           </div>
//           {gender && (
//             <div className={classes.FilterCheckboxContainer}>
//               <div>
//                 <FormControlLabel
//                   control={<BlackCheckBox />}
//                   label="Men"
//                   className={classes.FilterCheckboxLabel}
//                 />
//               </div>
//               <div>
//                 <FormControlLabel
//                   control={<BlackCheckBox />}
//                   label="Women"
//                   className={classes.FilterCheckboxLabel}
//                 />
//               </div>
//             </div>
//           )}
//         </div>

//         <div className={classes.FilterGroup}>
//           <div
//             className={classes.FilterName}
//             onClick={() => {
//               setColor((color) => !color);
//             }}
//           >
//             Color{" "}
//             {filterColor.length > 0 && <span>{`(${filterColor.length})`}</span>}
//             {color && <ExpandLessIcon className={classes.FilterIcon} />}
//             {!color && <ExpandMoreIcon className={classes.FilterIcon} />}
//           </div>
//           {color && (
//             <div>
//               {isLoading ? (
//                 <Grid container spacing={2}>
//                   {listColorLazyLoad}
//                 </Grid>
//               ) : (
//                 //display color
//                 <Grid container spacing={2}>
//                   <Grid
//                     item
//                     xs={4}
//                     className={classes.ColorContainer}
//                     onClick={() => {
//                       clickFilterColor("");
//                       props.handleFilter("");
//                     }}
//                   >
//                     <center>
//                       {filterColor !== "" ? (
//                         <div
//                           className={classes.Color}
//                           style={{ backgroundColor: "black" }}
//                         ></div>
//                       ) : (
//                         <div
//                           className={classes.Color}
//                           style={{ backgroundColor: "black" }}
//                         >
//                           &#10003;
//                         </div>
//                       )}
//                       <div className={classes.ColorName}>Multi-Color</div>
//                     </center>
//                   </Grid>
//                   {listColor}
//                 </Grid>
//               )}
//             </div>
//           )}
//         </div>
//         <div className={classes.FilterGroup}>
//           <div
//             className={classes.FilterName}
//             onClick={() => setBrand((brand) => !brand)}
//           >
//             size {filterSize.length > 0 && <span>({filterSize.length})</span>}
//             {brand && <ExpandLessIcon className={classes.FilterIcon} />}
//             {!brand && <ExpandMoreIcon className={classes.FilterIcon} />}
//           </div>
//           {brand && (
//             <div>
//               {" "}
//               {isLoading ? (
//                 <Grid container spacing={1}>
//                   {listSize}
//                 </Grid>
//               ) : (
//                 <Grid container spacing={1}>
//                   {listSize}
//                 </Grid>
//               )}
//             </div>
//           )}
//         </div>
//         <div className={classes.FilterGroup}>
//           <div className={classes.FilterName} onClick={() => setSport(!sport)}>
//             {" "}
//             Sport {sport && (
//               <ExpandLessIcon className={classes.FilterIcon} />
//             )}{" "}
//             {!sport && <ExpandMoreIcon className={classes.FilterGroup} />}{" "}
//           </div>
//           {sport && (
//             <div className={classes.FilterCheckboxContainer}>
//               {" "}
//               <div>
//                 <FormControlLabel
//                   control={<BlackCheckBox />}
//                   label="LifeStyle"
//                   className={classes.FilterCheckboxLabel}
//                 />
//               </div>
//               <div>
//                 <FormControlLabel
//                   control={<BlackCheckBox />}
//                   label="Basketball"
//                   className={classes.FilterCheckboxLabel}
//                 />
//               </div>
//               <div>
//                 <FormControlLabel
//                   control={<BlackCheckBox />}
//                   label="Dance"
//                   className={classes.FilterCheckboxLabel}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//         <div className={classes.FilterGroup}>
//           <div
//             className={classes.FilterName}
//             onClick={() => setAthlete((athlete) => !athlete)}
//           >
//             Athletes{" "}
//             {athlete && <ExpandLessIcon className={classes.FilterIcon} />}{" "}
//             {!athlete && <ExpandMoreIcon className={classes.FilterIcon} />}
//           </div>
//           {athlete && (
//             <div className={classes.FilterCheckboxContainer}>
//               {" "}
//               <div>
//                 <FormControlLabel
//                   className={classes.FilterCheckboxLabel}
//                   control={<BlackCheckBox />}
//                   label="cr7"
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//         <div className={classes.FilterGroup}>
//           <div
//             className={classes.FilterName}
//             onClick={() => setBestFor(!bestFor)}
//           >
//             Best For{" "}
//             {bestFor && <ExpandLessIcon className={classes.FilterIcon} />}{" "}
//             {!bestFor && <ExpandMoreIcon className={classes.FilterIcon} />}
//           </div>
//           {bestFor && (
//             <div className={classes.FilterCheckboxContainer}>
//               {" "}
//               <div>
//                 <FormControlLabel
//                   control={<BlackCheckBox />}
//                   label="wet weather condition"
//                   className={classes.FilterCheckboxLabel}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//         <div className={classes.FilterGroup}>
//           <div
//             className={classes.FilterName}
//             onClick={() => setCollaborator((collaborator) => !collaborator)}
//           >
//             Collaborator &&
//             {collaborator && <ExpandLessIcon className={classes.FilterIcon} />}
//             {!collaborator && <ExpandMoreIcon className={classes.FilterIcon} />}
//             <div className={classes.FilterCheckboxContainer}>
//               <div>
//                 <FormControlLabel
//                   control={<BlackCheckBox />}
//                   label="Pendleton"
//                   className={classes.FilterCheckboxLabel}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Grid>
//   );
// };

// export default ListProductFilter;
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";

import Skeleton from "@material-ui/lab/Skeleton";
import {
  filterColorData,
  filterColorHandler,
  filterSizeHandler,
} from "../../../features/product/productSlice";

const useStyles = makeStyles((theme) => ({
  Filter: {
    backgroundColor: "white",
    float: "left",
    width: 190,
    fontSize: 16,
  },
  FilterTop: {
    paddingBottom: 40,
  },
  FilterItem: {
    color: "black",
    textDecoration: "none",
    "&:hover": {
      color: "#757575",
    },
    fontSize: 16,
  },
  FilterGroup: {
    paddingBottom: 20,
    borderTop: "1px solid #e5e5e5",
  },
  FilterName: {
    padding: "12px 0",
    cursor: "pointer",
    color: "black",
  },
  FilterIcon: {
    float: "right",
  },
  FilterCheckboxContainer: {
    paddingLeft: 5,
  },
  FilterCheckboxLabel: {
    "&:hover": {
      color: "#757575",
    },
  },
  Color: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    paddingTop: 3,
    color: "white",
    fontWeight: "bold",
  },
  ColorContainer: {
    cursor: "pointer",
  },
  ColorName: {
    marginTop: 5,
    fontSize: 12,
    "&:hover": {
      color: "#757575",
    },
  },
  size: {
    padding: "5px 10px",
    textAlign: "center",
    border: "1px #CCCCCC solid",
    borderRadius: 5,
    cursor: "pointer",
  },
}));

const BlackCheckbox = withStyles({
  root: {
    width: 30,
    height: 30,
    color: "#cccccc",
    "&$checked": {
      color: "black",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function ListProductFilter(props) {
  const classes = useStyles();

  const [Gender, setGender] = useState(true);
  const [Colour, setColour] = useState(true);
  const [Brand, setBrand] = useState(true);
  const [Sports, setSports] = useState(true);
  const [Athletes, setAthletes] = useState(true);
  const [BestFor, setBestFor] = useState(true);
  const [Collaborator, setCollaborator] = useState(true);

  const dispatch = useDispatch();

  //call data từ store
  const filterColor = useSelector((state) => state.product.filterColor);
  console.log("filterColor", filterColor);

  const filterSize = useSelector((state) => state.product.filterSize);
  console.log("filterSize", filterSize);
  const data = useSelector((state) => state.product.data);
  const isLoading = useSelector((state) => state.product.isLoading);

  //handle array color
  const clickFilterColor = (filter) => {
    if (filter) {
      if (filterColor.indexOf(filter) > -1) {
        const temp = JSON.parse(JSON.stringify(filterColor));
        temp.splice(filterColor.indexOf(filter), 1);
        dispatch(filterColorHandler(temp));
        props.handleFilter("");
      } else {
        props.handleFilter(filter);
        const temp = JSON.parse(JSON.stringify(filterColor));

        temp.push(filter);
        dispatch(filterColorHandler(temp));
      }
    } else {
      dispatch(filterColorHandler([]));
      dispatch(filterSizeHandler([]));
    }
  };

  //handle array size
  const clickFilterSize = (filter) => {
    if (filter) {
      if (filterSize.indexOf(filter) > -1) {
        const temp = JSON.parse(JSON.stringify(filterSize));
        temp.splice(filterSize.indexOf(filter), 1);
        dispatch(filterSizeHandler(temp));
        props.handleFilter("");
      } else {
        props.handleFilter(filter);
        const temp = JSON.parse(JSON.stringify(filterSize));
        temp.push(filter);
        dispatch(filterSizeHandler(temp));
      }
    } else {
      dispatch(filterColorHandler([]));
      dispatch(filterSizeHandler([]));
    }
  };
  const clickFilterGender = (genderInput) => {
    const tempData = data;
    const filterDataByGender = tempData.filter(
      (item) => item.gender === genderInput
    );
    dispatch(filterColorData(filterDataByGender));
  };
  //collect size
  var mySize = new Set();
  var Size = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].sizes.length; j++) {
      mySize.add(data[i].sizes[j].size);
    }
  }
  for (let item of mySize) {
    Size.push(item);
  }

  const listSize = Size.map((item) => (
    <Grid item xs={4}>
      {filterSize.indexOf(item) === -1 ? (
        <div
          className={classes.size}
          onClick={() => {
            clickFilterSize(item);
          }}
        >
          {item}
        </div>
      ) : (
        <div
          className={classes.size}
          style={{ border: "1px black solid" }}
          onClick={() => {
            clickFilterSize(item);
            props.handleFilter(item);
          }}
        >
          {item}
        </div>
      )}
    </Grid>
  ));
  var listSizeLazyLoad = [];
  for (let i = 0; i < 15; i++) {
    listSizeLazyLoad.push(
      <Grid item xs={4}>
        <Skeleton>
          <div className={classes.size}>40</div>
        </Skeleton>
      </Grid>
    );
  }
  //collect color
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  var myColor = new Set();
  var Color = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].imgDetails.length; j++) {
      const colorSplit = data[i].imgDetails[j].color.split("/");
      for (let n = 0; n < colorSplit.length; n++) {
        myColor.add(colorSplit[n]);
      }
    }
  }
  for (let item of myColor) {
    Color.push(item);
  }
  const listColor = Color.map((item) => (
    <Grid
      item
      xs={4}
      className={classes.ColorContainer}
      onClick={async () => {
        clickFilterColor(item);
      }}
    >
      {item === "white" ? (
        <center>
          {filterColor.indexOf(item) === -1 ? (
            <div
              className={classes.Color}
              style={{ backgroundColor: item, border: "1px #CCCCCC solid" }}
            ></div>
          ) : (
            <div
              className={classes.Color}
              style={{
                backgroundColor: item,
                color: "black",
                border: "1px #CCCCCC solid",
              }}
            >
              &#10003;
            </div>
          )}
          <div className={classes.ColorName}>{capitalizeFirstLetter(item)}</div>
        </center>
      ) : (
        <center>
          {filterColor.indexOf(item) === -1 ? (
            <div
              className={classes.Color}
              style={{ backgroundColor: item }}
            ></div>
          ) : (
            <div className={classes.Color} style={{ backgroundColor: item }}>
              &#10003;
            </div>
          )}
          <div className={classes.ColorName}>{capitalizeFirstLetter(item)}</div>
        </center>
      )}
    </Grid>
  ));
  var listColorLazyLoad = [];
  for (let i = 0; i < 12; i++) {
    listColorLazyLoad.push(
      <Grid item xs={4} className={classes.ColorContainer}>
        <Skeleton>
          <div
            className={classes.Color}
            style={{
              backgroundColor: "white",
              color: "black",
              border: "1px #CCCCCC solid",
            }}
          >
            &#10003;
          </div>
        </Skeleton>
        <Skeleton>
          <div className={classes.ColorName}>black</div>
        </Skeleton>
      </Grid>
    );
  }

  return (
    <Grid item md={2}>
      <div className={classes.Filter}>
        <div className={classes.FilterTop}>
          <a href="#a" className={classes.FilterItem}>
            Shoes
          </a>
        </div>
        <div className={classes.FilterGroup}>
          <div
            className={classes.FilterName}
            onClick={() => setGender(!Gender)}
          >
            Gender
            {Gender && <ExpandLessIcon className={classes.FilterIcon} />}
            {!Gender && <ExpandMoreIcon className={classes.FilterIcon} />}
          </div>
          {Gender && (
            <div className={classes.FilterCheckboxContainer}>
              <div>
                <FormControlLabel
                  control={<BlackCheckbox />}
                  label="Men"
                  className={classes.FilterCheckboxLabel}
                  onClick={() => {
                    clickFilterGender("male");
                  }}
                />
              </div>
              <div>
                <FormControlLabel
                  control={<BlackCheckbox />}
                  label="Women"
                  className={classes.FilterCheckboxLabel}
                  onClick={() => {
                    clickFilterGender("female");
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <div className={classes.FilterGroup}>
          <div
            className={classes.FilterName}
            onClick={() => setColour(!Colour)}
          >
            Colour{" "}
            {filterColor.length > 0 && <span>({filterColor.length})</span>}
            {Colour && <ExpandLessIcon className={classes.FilterIcon} />}
            {!Colour && <ExpandMoreIcon className={classes.FilterIcon} />}
          </div>
          {Colour && (
            <div>
              {isLoading ? (
                <Grid container spacing={2}>
                  {listColorLazyLoad}
                </Grid>
              ) : (
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={4}
                    className={classes.ColorContainer}
                    onClick={() => {
                      clickFilterColor("");
                      props.handleFilter("");
                    }}
                  >
                    <center>
                      {filterColor !== "" ? (
                        <div
                          className={classes.Color}
                          style={{ backgroundColor: "black" }}
                        ></div>
                      ) : (
                        <div
                          className={classes.Color}
                          style={{ backgroundColor: "black" }}
                        >
                          &#10003;
                        </div>
                      )}
                      <div className={classes.ColorName}>Multi-Colour</div>
                    </center>
                  </Grid>
                  {listColor}
                </Grid>
              )}
            </div>
          )}
        </div>
        <div className={classes.FilterGroup}>
          <div className={classes.FilterName} onClick={() => setBrand(!Brand)}>
            Size {filterSize.length > 0 && <span>({filterSize.length})</span>}
            {Brand && <ExpandLessIcon className={classes.FilterIcon} />}
            {!Brand && <ExpandMoreIcon className={classes.FilterIcon} />}
          </div>
          {Brand && (
            <div>
              {isLoading ? (
                <Grid container spacing={1}>
                  {listSizeLazyLoad}
                </Grid>
              ) : (
                <Grid container spacing={1}>
                  {listSize}
                </Grid>
              )}
            </div>
          )}
        </div>
        <div className={classes.FilterGroup}>
          <div
            className={classes.FilterName}
            onClick={() => setSports(!Sports)}
          >
            Sports
            {Sports && <ExpandLessIcon className={classes.FilterIcon} />}
            {!Sports && <ExpandMoreIcon className={classes.FilterIcon} />}
          </div>
          {Sports && (
            <div className={classes.FilterCheckboxContainer}>
              <div>
                <FormControlLabel
                  control={<BlackCheckbox />}
                  label="Lifestyle"
                  className={classes.FilterCheckboxLabel}
                />
              </div>
              <div>
                <FormControlLabel
                  control={<BlackCheckbox />}
                  label="Basketball"
                  className={classes.FilterCheckboxLabel}
                />
              </div>
              <div>
                <FormControlLabel
                  control={<BlackCheckbox />}
                  label="Dance"
                  className={classes.FilterCheckboxLabel}
                />
              </div>
            </div>
          )}
        </div>
        <div className={classes.FilterGroup}>
          <div
            className={classes.FilterName}
            onClick={() => setAthletes(!Athletes)}
          >
            Athletes
            {Athletes && <ExpandLessIcon className={classes.FilterIcon} />}
            {!Athletes && <ExpandMoreIcon className={classes.FilterIcon} />}
          </div>
          {Athletes && (
            <div className={classes.FilterCheckboxContainer}>
              <div>
                <FormControlLabel
                  control={<BlackCheckbox />}
                  label="Kylian Mbappé"
                  className={classes.FilterCheckboxLabel}
                />
              </div>
            </div>
          )}
        </div>
        <div className={classes.FilterGroup}>
          <div
            className={classes.FilterName}
            onClick={() => setBestFor(!BestFor)}
          >
            Best For
            {BestFor && <ExpandLessIcon className={classes.FilterIcon} />}
            {!BestFor && <ExpandMoreIcon className={classes.FilterIcon} />}
          </div>
          {BestFor && (
            <div className={classes.FilterCheckboxContainer}>
              <div>
                <FormControlLabel
                  control={<BlackCheckbox />}
                  label="Wet Weather Conditions"
                  className={classes.FilterCheckboxLabel}
                />
              </div>
            </div>
          )}
        </div>
        <div className={classes.FilterGroup}>
          <div
            className={classes.FilterName}
            onClick={() => setCollaborator(!Collaborator)}
          >
            Collaborator
            {Collaborator && <ExpandLessIcon className={classes.FilterIcon} />}
            {!Collaborator && <ExpandMoreIcon className={classes.FilterIcon} />}
          </div>
          {Collaborator && (
            <div className={classes.FilterCheckboxContainer}>
              <div>
                <FormControlLabel
                  control={<BlackCheckbox />}
                  label="Pendleton"
                  className={classes.FilterCheckboxLabel}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Grid>
  );
}
export default ListProductFilter;
