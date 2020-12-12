import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { Form } from "formik";
import firebaseApp from "../../firebase/initialization";
import InputPassword from "../../components/InputPassword/InputPassword";
import { withFormik } from "formik";
import loginImage from "../../assets/login.png";
import * as yup from "yup";
import { routes } from "../../routes";
import "./Login.scss";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const LoginForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  return (
    <>
      <div className="login-wrapper">
        <Form onSubmit={handleSubmit} className="login">
          <h2>Sign In</h2>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className="input-form"
            placeholder="email"
          />
          <span name="email" className="login-error">
            {touched.email ? errors.email : null}
          </span>
          <InputPassword values handleBlur handleChange />

          <span name="email" className="login-error">
            {touched.password ? errors.password : null}
          </span>

          {<Button name="Login" className="login-btn" type="submit" />}
          {/* <button type="submit">Login</button> */}
          <Link to={routes.signUp} className="form-outerLink">
            <span>Sign Up</span>
          </Link>
        </Form>
        <div className="login-image-wrapper">
          <img src={loginImage} alt="login" className="login-image" />
        </div>
      </div>
      <NotificationContainer />
    </>
  );
};

const LoginValidation = yup.object().shape({
  email: yup.string().email("Invalid email").required("Enter email"),
  password: yup.string().min(4).max(16).required(),
});

const LoginFormEnhanced = withFormik({
  handleSubmit: (values, { resetForm }) => {
    console.log("s");
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then((user) => {
        console.log(user);
      })
      .then(() => {
        NotificationManager.success("Success message", "Login success");
        let history = useHistory();
        history.push("/");
        resetForm();
      })
      .catch((err) => NotificationManager.error("Error: " + err));
  },
  validationSchema: LoginValidation,
})(LoginForm);

export default LoginFormEnhanced;
