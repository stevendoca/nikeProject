import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const useStyles = makeStyles({
  ProductContainer: {
    padding: "0 44px",
    fontSize: 16,
    lineHeight: 1.7,
    // [theme.breakpoints.down('md')]: {
    //     padding: '0 8px'
    // },
  },
  ProductImage: {
    width: "100%",
  },
  subDetail: {
    marginTop: "24px",
    padding: "16px",
    color: "#757575",
    textAlign: "center",
    lineHeight: 1.75,
  },
  Detail: {
    marginTop: "24px",
    lineHeight: 1.75,
  },
  ul: {
    marginTop: 32,
    marginBottom: 24,
    padding: "0 0 0 20px",
  },
  viewDetail: {
    textDecoration: "underline",
    cursor: "pointer",
  },
  viewDetailDialog: {
    fontSize: 16,
    padding: 16,
    maxHeight: "none",
  },
  ShipReviewContainer: {
    padding: "28px 0",
    fontSize: 20,
    cursor: "pointer",
  },
  Button: {
    float: "right",
  },
  RateStar: {
    display: "flex",
    alignItems: "baseline",
  },
  RateName: {
    color: "#757575",
    marginLeft: 16,
    float: "right",
  },
});

const ProductMoreDetail = () => {
  // css classes
  const classes = useStyles();

  const [viewDetail, setViewDetail] = useState(false);
  const [ship, setShip] = useState(false);
  const [review, setReview] = useState(false);

  return (
    <Grid container className={classes.ProductContainer} spacing={2}>
      {/* small Screen */}
      <Grid item xs={12}>
        <div className={classes.subDetail}>
          This product is excluded from site promotions and discounts.
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.Detail}>
          Elevate your game with the force of OG hoops. From leather that's
          smoother than backboard glass to the aggressive stance that says
          "bring it on", it's everything you know best: crisp overlays, bold
          accents and the perfect amount of flash to make you shine. Its padded,
          mid-cut collar with the classic strap closure offers heritage styling
          and added support. Perforations keep you cool as you heat up the
          streets. It never left, but the Nike Air Force 1 Mid '07 is back.
          <ul className={classes.ul}>
            <li>Colour Shown: White/White</li>
            <li>Style: 315123-111</li>
          </ul>
          <span
            className={classes.viewDetail}
            onClick={() => setViewDetail(!viewDetail)}
          >
            View Product Details
          </span>
          {/* what is PaperProps */}
          {/* lam sao de gan dialog vao view product detail */}
          <Dialog
            open={viewDetail}
            onClose={() => setViewDetail(!viewDetail)}
            PaperProps={{ style: { maxHeight: "none" } }}
          >
            <div className={classes.viewDetailDialog}>
              <p>LEGENDARY STYLE STARTS FROM THE FEET.</p>
              <p>
                Elevate your game with the force of OG hoops. From leather
                that's smoother than backboard glass to the aggressive stance
                that says "bring it on", it's everything you know best: crisp
                overlays, bold accents and the perfect amount of flash to make
                you shine. Its padded, mid-cut collar with the classic strap
                closure offers heritage styling and added support. Perforations
                keep you cool as you heat up the streets. It never left, but the
                Nike Air Force 1 Mid '07 is back.
              </p>
              <div>
                Benefits
                <div>
                  <ul className={classes.ul}>
                    <li>
                      For over 35 years it's been comfort and durability
                      straight out of the box. From stitched overlays to
                      pristine leather, to the cupsole design, it's got you
                      covered so you can wear them from the suburbs to the
                      streets and everywhere in between.
                    </li>
                    <li>
                      Originally designed for performance hoops, the Air
                      cushioning delivers lasting comfort while the plush
                      midsole adds to the soft ride.
                    </li>
                    <li>
                      The mid-cut collar adds a sleek, streamlined look while
                      soft padding around the ankle feels like a pillow.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              Product Details
              <div className={classes.ul}>
                <p>Metal dubrae on the laces with "AF1"</p>
                <p>Variable-width lacing system</p>
                <p>Perforations on the toe and sides</p>
                <p>Hook-and-loop closure lets you customise styling and fit</p>
                <p>Non-marking rubber outsole for traction and durability</p>
                <p>
                  Not intended for use as Personal Protective Equipment (PPE)
                </p>
                <p>Colour Shown: White/White</p>
                <p>Style: 315123-111</p>
                <p>Country/Region of Origin: Vietnam</p>
              </div>
            </div>
          </Dialog>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          className={classes.ShipReviewContainer}
          onClick={() => {
            setShip(!ship);
            setReview(false);
          }}
        >
          {" "}
          Free Delivery and Returns
          {!ship && <ExpandMoreIcon className={classes.Button} />}
          {ship && <ExpandLessIcon className={classes.Button} />}
        </div>
        {ship && (
          <div>
            <p>Your order of 5.000.000₫ or more gets free standard delivery.</p>
            <div>
              <ul className={classes.ul}>
                <li>Standard delivered 4-5 Business Days</li>
                <li>Express delivered 2-4 Business Days</li>
              </ul>
            </div>
            <p>
              Orders are processed and delivered Monday-Friday (excluding public
              holidays)
            </p>
            <p>Nike Members enjoy free returns.</p>
          </div>
        )}
      </Grid>
      <Grid item xs={12}>
        <div
          className={classes.ShipReviewContainer}
          onClick={() => {
            setReview(!review);
            setShip(false);
          }}
        >
          Reviews(20)
          {!review && <ExpandMoreIcon className={classes.Button} />}
          {review && <ExpandLessIcon className={classes.Button} />}
          <span className={classes.Button}>
            <StarIcon />
            <StarIcon />
            <StarHalfIcon />
            <StarBorderIcon />
          </span>
        </div>
        {review && (
          <div>
            <div>
              <p>
                <span className={classes.RateStar}>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <span className={classes.RateName}>A. -30 Nov 2020</span>
                </span>
              </p>
              <p>Good</p>
            </div>
            <div>
              <p>
                <span className={classes.RateStar}>
                  <StarBorderIcon /> <StarBorderIcon /> <StarBorderIcon />{" "}
                  <StarBorderIcon />
                </span>
              </p>
              <p>Very Good</p>
            </div>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default ProductMoreDetail;
