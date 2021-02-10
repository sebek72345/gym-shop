import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import MenuIcon from "@material-ui/icons/Menu";
import Cart from "./Cart/Cart";
import logo from "../../assets/mainLogo .png";
import "./Header.scss";
import { routes } from "../../routes";
import firebaseApp from "../../firebase/initialization";
import { ProductContext } from "../../context";

const GenerateCategory = ({ big }) => {
  const dateToGenerateLi = [
    { route: routes.mats, name: "mats" },
    { route: routes.machineAttachments, name: "machine attachments" },
    { route: routes.hygiene, name: "hygiene" },
    { route: routes.measurmentTools, name: "measurement tools" },
  ];
  return (
    <ul className={big ? "assortment-list" : "assortment-list--small"}>
      {dateToGenerateLi.map((li) => (
        <li key={li.name}>
          <NavLink to={li.route} activeClassName="active-link">
            {li.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
function Header() {
  const { currentUser, setCurrentUser, setProductsInCart } = useContext(
    ProductContext
  );
  const [isLoged, setIsLoged] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        firebaseApp
          .firestore()
          .collection("userData")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("Document data:", doc.data());
              setIsLoged(true);
              setCurrentUser(doc.data().login);
            } else {
              setIsLoged(false);
              setCurrentUser(null);
            }
          });
      }
    });
  }, []);

  const toggleModal = (e) => {
    const modal = document.querySelector(".modal");
    if (modalIsOpen) {
      modal.style.transform = "translateX(0)";
    } else {
      modal.style.transform = "translateX(100%)";
    }
    setModalIsOpen(!modalIsOpen);
  };
  return (
    <div className="header">
      <div className="header-container">
        <Link to={process.env.PUBLIC_URL + routes.home}>
          <div className="logo-container">
            <img src={logo} alt="logo" className="logo" />
          </div>
        </Link>
        <div className="header-left">
          <div className="contact-wrapper">
            <address className="contact">
              <div className="contact-phone">
                <EmailIcon />
                <a href="tel:+48723452352">723 452 352</a>
              </div>
              <div className="contact-email">
                <PhoneIcon />
                <a href="mailto:shop@best.com">shop@best.com</a>
              </div>
            </address>
          </div>
          {isLoged ? (
            <>
              <Link
                to={routes.login}
                className="header-login"
                onClick={() => {
                  firebaseApp.auth().signOut();
                  setProductsInCart([]);
                }}
              >
                Sign Out
              </Link>
              <div className="data-user">
                <p>You`re loged as: </p>
                <span>{currentUser}</span>
              </div>
            </>
          ) : (
            <>
              <Link
                to={process.env.PUBLIC_URL + routes.login}
                className="header-login"
              >
                Login
              </Link>
              <Link
                to={process.env.PUBLIC_URL + routes.signUp}
                className="header-signup"
              >
                Sign Up
              </Link>
            </>
          )}

          <Cart />
          <MenuIcon onClick={toggleModal} className="hamburger" />
        </div>
      </div>
      <div
        className="modal"
        onClick={toggleModal}
        onKeyDown={toggleModal}
        role="button"
        tabIndex={0}
      >
        <GenerateCategory />
      </div>
      <div className="assortment">
        <GenerateCategory big />
      </div>
    </div>
  );
}

const MemorizedHeader = React.memo(Header);
export default MemorizedHeader;
