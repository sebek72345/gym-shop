import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    maxWidth: 250,
    height: 400,
    borderRadius: "20px",
    boxShadow: "3px 3px 7px 2px #ddd",
    transition: ".4s",
    cursor: "pointer",
    marginBottom: "30px",
    position: "relative",

    "&:hover": {
      transform: "scale(1.05) translate(0px,-5px)",
      boxShadow: "3px 3px 3px 5px #ddd",
    },
  },
  media: {
    height: 180,
    backgroundSize: "contain",
    margin: "5px 0",
  },
});

export default function CustomCard({
  price,
  previousPrice,
  image,
  name,
  slug,
}) {
  const classes = useStyles();
  return (
    <Link to={`/products/${slug}`}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          title="Contemplative Reptile"
          image={image}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" style={{ fontSize: "18px" }}>
            {name}
          </Typography>
          <div
            className="price"
            style={{ position: "absolute", right: "10px", bottom: "10%" }}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              align="right"
              style={{ textDecoration: "line-through" }}
            >
              ${previousPrice}
            </Typography>
            <Typography
              variant="body2"
              color="textPrimary"
              component="p"
              align="right"
              style={{ fontSize: "24px" }}
            >
              $ {price}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
