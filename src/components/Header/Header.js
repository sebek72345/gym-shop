import React from "react";
import Cart from "./Cart/Cart";
import logo from "../../assets/mainLogo .png";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import "./Header.scss";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
export default function Header() {
  return (
    <div className="header">
      <div className="header-container">
        <Link to={routes.home}>
          <div className="logo-container">
            <img src={logo} alt="logo" className="logo" />
          </div>
        </Link>
        <div className="header-left">
          <div className="contact-wrapper">
            <address className="contact">
              <div className="contact-phone">
                <EmailIcon />
                <p>723 452 352</p>
              </div>
              <div className="contact-email">
                <PhoneIcon />
                <p>shop@best.com</p>
              </div>
            </address>
          </div>
          <Link to={routes.signin} className="header-login">
            Login/Sign Up
          </Link>
          <Cart />
        </div>
      </div>
      <div className="assortment">
        <ul className="">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}
