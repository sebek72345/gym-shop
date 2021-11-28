import React from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import emailjs from "emailjs-com";
import * as yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import "react-notifications/lib/notifications.css";
import Button from "../../components/Button/Button";
import "./Contact.scss";
import envelopIcon from "../../assets/envelope.png";

export default function Contact() {
  return (
    <>
      <h2 className="contact-description">
        If you have any questions, feel free to contact us.
      </h2>
      <div className="contact-wrapper">
        <div className="contact">
          <div className="contact-envelope">
            <img src={envelopIcon} alt="envelope" className="envelope-pic" />
          </div>
          <Formik
            initialValues={{
              name: "",
              email: "",
              message: "",
            }}
            onSubmit={(values, { resetForm }) => {
              const templateParams = {
                name: values.name,
                email: values.email,
                content: values.message,
              };

            
            }}
            validationSchema={yup.object().shape({
              name: yup.string().required("Name is required"),
              email: yup
                .string()
                .email("Put valid email")
                .required("Email is required"),
              message: yup.string().required("Text message is required"),
            })}
          >
            {() => (
              <Form className="form">
                <label htmlFor="name">Your Name: </label>
                <Field name="name" className="form-name" id="name" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="form-error"
                />

                <label htmlFor="email">Your Email: </label>
                <Field
                  name="email"
                  className="form-email"
                  id="email"
                  type="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="form-error"
                />

                <label htmlFor="message">Message: </label>
                <Field
                  name="message"
                  component="textarea"
                  className="form-textarea"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="form-error"
                />
                <Button className="form-submit" name="Send e-mail" />
              </Form>
            )}
          </Formik>
          <NotificationContainer timeOut={2000} />
        </div>
      </div>
    </>
  );
}
