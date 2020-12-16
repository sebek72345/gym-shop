import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Button from "../../components/Button/Button";
import InputPassword from "../../components/InputPassword/InputPassword";
import signUpImage from "../../assets/SignUp.png";
import firebaseApp from "../../firebase/initialization";
import { routes } from "../../routes";
import "./SignUp.scss";

const SignUpValidation = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Mininum 2 characters")
    .max(15, "Maximum 15 characters")
    .required("Required!"),
  lastName: Yup.string().min(2, "Mininum 2 characters").required("Required!"),
  login: Yup.string().min(2, "Mininum 2 characters").required("Required!"),
  email: Yup.string().email("Invalid email format").required("Required!"),
  password: Yup.string().min(8, "Minimum 8 characters").required("Required!"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Password's not match")
    .required("Required!"),
});
function SignUp({ history }) {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        login: "",
        email: "",
        password: "",
        confirm_password: "",
      }}
      validationSchema={SignUpValidation}
      onSubmit={(values, { resetForm }) => {
        firebaseApp
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password)
          .then((userCredentials) => {
            if (userCredentials.user) {
              userCredentials.user.updateProfile({
                displayName: values.login,
              });
            }
            firebaseApp.auth().onAuthStateChanged((user) => {
              firebaseApp.firestore().collection("userData").doc(user.uid).set({
                lastName: values.lastName,
                firstName: values.firstName,
                login: values.login,
              });
            });

            resetForm();
            NotificationManager.success(
              "Success message",
              "Well done, You created account"
            );
            setTimeout(() => {
              /* history.push("/"); */
            }, 1000);
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <div className="register-wrapper">
          <Form onSubmit={handleSubmit} className="register">
            <h2>Sign Up</h2>

            <Field
              type="text"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="input-form"
            />

            <Field
              type="text"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="input-form"
            />
            <Field
              type="text"
              name="login"
              value={values.login}
              onChange={handleChange}
              placeholder="Login"
              className="input-form"
            />

            <Field
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Email"
              className="input-form"
            />

            <InputPassword
              name="password"
              values={values.password}
              handleBlur={handleBlur}
              handleChange={handleChange}
            />

            <Field
              type="text"
              name="confirm_password"
              value={values.confirm_password}
              placeholder="Confirm Password"
              className="input-form"
              onChange={handleChange}
            />

            <Button name="Sign Up" type="submit" />
            <Link to={routes.login} className="form-outerLink">
              <span>Login</span>
            </Link>
          </Form>
          <div className="register-image-wrapper">
            <img src={signUpImage} alt="register" className="register-image" />
          </div>
          <NotificationContainer />
        </div>
      )}
    </Formik>
  );
}

export default SignUp;
