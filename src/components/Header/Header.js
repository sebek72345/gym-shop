import React, { useEffect, useState } from "react";
import Cart from "./Cart/Cart";
import logo from "../../assets/mainLogo .png";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import "./Header.scss";
import { Link, NavLink } from "react-router-dom";
import { routes } from "../../routes";
import firebaseApp from "../../firebase/initialization";
export default function Header() {
  const [isLoged, setIsLoged] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        setIsLoged(true);
        /* setCurrentUser(user); */
      } else {
        setIsLoged(false);
        /* setCurrentUser(null); */
      }
    });
  });

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
          {isLoged ? (
            <Link
              to={routes.login}
              className="header-login"
              onClick={() => firebaseApp.auth().signOut()}
            >
              Sign Out
            </Link>
          ) : (
            <>
              <Link to={routes.login} className="header-login">
                Login
              </Link>
              <Link to={routes.signUp} className="header-signup">
                Sign Up
              </Link>
            </>
          )}

          <Cart />
        </div>
      </div>
      <div className="assortment">
        <ul className="assortment-list">
          <li>
            <NavLink to={routes.mats} activeClassName="active-link">
              mats
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.machineAttachments}
              activeClassName="active-link"
            >
              machine attachments
            </NavLink>
          </li>
          <li>
            <NavLink to={routes.hygiene} activeClassName="active-link">
              hygiene
            </NavLink>
          </li>
          <li>
            <NavLink to={routes.measurmentTools} activeClassName="active-link">
              measurement tools
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
