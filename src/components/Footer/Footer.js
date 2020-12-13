import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import { routes } from "../../routes";

export default function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer">
        <div className="footer-links">
          <Link to={routes.contact}>
            <li>Contact</li>
          </Link>
          <Link to={routes.deliver}>
            <li>Deliver Methods</li>
          </Link>
          <Link to={routes.termsConditions}>
            <li>Terms & Conditions</li>
          </Link>
          <Link to={routes.aboutUs}>
            <li>About Us</li>
          </Link>
        </div>
        <div className="footer-copyright">Copyright © Sebastian Sokół</div>
      </div>
    </div>
  );
}
