import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "../../components/Button/Button";
import InputPassword from "../../components/InputPassword/InputPassword";
import signUpImage from "../../assets/SignUp.png";
import firebaseApp from "../../firebase/initialization";
import { routes } from "../../routes";

import "./SignUp.scss";

export default function SignUp() {
  const [visablePassword, setVisablePassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      lastName: Yup.string()
        .min(2, "Mininum 2 characters")
        .required("Required!"),
      email: Yup.string().email("Invalid email format").required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Required!"),
    }),
    onSubmit: (values, { resetForm }) => {
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then(({ user }) => {
          if (user) {
            console.log(user);
            firebaseApp.firestore().collection("users").add({
              firstName: values.firstName,
              lastName: values.lastName,
              password: values.password,
            });
          }
        })
        .then((res) => resetForm());
    },
  });

  return (
    <div className="register-wrapper">
      <form onSubmit={formik.handleSubmit} className="register">
        <h2>Sign Up</h2>
        <div>
          <input
            type="text"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            placeholder="First name"
            className="input-form"
          />
          {formik.errors.firstName && formik.touched.firstName && (
            <p>{formik.errors.firstName}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            placeholder="Last name"
            className="input-form"
          />
          {formik.errors.lastName && formik.touched.lastName && (
            <p>{formik.errors.lastName}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Email"
            className="input-form"
          />
          {formik.errors.email && formik.touched.email && (
            <p>{formik.errors.email}</p>
          )}
        </div>
        <InputPassword
          values={formik.values.email}
          onChange={formik.handleChange}
          className="re"
        />
        <div>
          <input
            type="password"
            name="confirm_password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            placeholder="Confirm Password"
            className="input-form"
          />
          {formik.errors.confirm_password &&
            formik.touched.confirm_password && (
              <p>{formik.errors.confirm_password}</p>
            )}
        </div>

        <Button name="Sign Up" type="submit" />
        <Link to={routes.login} className="form-outerLink">
          <span>Login</span>
        </Link>
      </form>
      <div className="register-image-wrapper">
        <img src={signUpImage} alt="register" className="register-image" />
      </div>
    </div>
  );
}
