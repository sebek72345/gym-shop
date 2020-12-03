import React from "react";
import { Formik, Form, Field } from "formik";
import "./Contact.scss";
import envelopIcon from "../../assets/envelope.png";
export default function Contact() {
  return (
    <div className="contact">
      <div className="contact-envelop">
        <img src={envelopIcon} alt="envelop" className="" />
      </div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          message: "",
        }}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        {() => (
          <Form>
            <label htmlFor="name">Name: </label>
            <Field name="name" />

            <label htmlFor="email">Email: </label>
            <Field name="email" />

            <label htmlFor="message">Message: </label>
            <Field name="message" component="textarea" />

            <button type="submit">Send</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
