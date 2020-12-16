import React from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Form, Formik, Field } from "formik";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Button from "../../components/Button/Button";
import firebaseApp from "../../firebase/initialization";
import InputPassword from "../../components/InputPassword/InputPassword";
import loginImage from "../../assets/login.png";
import { routes } from "../../routes";
import "./Login.scss";

const LoginValidation = yup.object().shape({
  email: yup.string().email("Invalid email").required("Enter email"),
  password: yup.string().min(4).max(16).required(),
});

export default function SignUp({ history }) {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginValidation}
      onSubmit={(values, { resetForm }) => {
        firebaseApp
          .auth()
          .signInWithEmailAndPassword(values.email, values.password)
          .then((user) => {
            console.log(user.data());
          })
          .then(() => {
            NotificationManager.success("Success message", "Login success");
            history.push("/");
            resetForm();
          })
          .catch((err) => {
            NotificationManager.error(`${err}`);
            resetForm();
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

            <Button name="Sign Up" type="submit" />
            <Link to={routes.login} className="form-outerLink">
              <span>Login</span>
            </Link>
          </Form>
          <div className="register-image-wrapper">
            <img src={loginImage} alt="register" className="register-image" />
          </div>
          <NotificationContainer />
        </div>
      )}
    </Formik>
  );
}
