import React from "react";
import Button from "../../components/Button/Button";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import { useHistory } from "react-router-dom";
import "./NotFound.scss";
export default function NotFound() {
  const history = useHistory();
  console.log(history);
  const location = history.location.pathname;
  return (
    <div className="notFound">
      <SentimentVeryDissatisfiedIcon style={{ fontSize: "52px" }} />
      <h1 className="notFound-header">404 Not Found</h1>
      <h2 className="notFound-description">
        The resource raquested could not be found. Can't reach a
        <p className="notFound-link"> {location}</p> website.
        <br /> If you want to go back, click button below
      </h2>
      <Button name="Go Back" goBack={() => history.goBack()} />
    </div>
  );
}
