import React, { useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "./Discount.scss";
import Button from "../../../components/Button/Button";
import firebaseApp from "../../../firebase/initialization";

export default function Discount() {
  const [inputValue, setInputValue] = useState("");
  const [correctEmail, setCorrectEmail] = useState(true);
  const docId = "9aAd2SVvGH26GUpMshiy";
  const collName = "newsLetterUserList";
  const updateNewsletterList = async (e) => {
    e.preventDefault();
    const input = document.getElementById("input-discount");
    if (/(.+)@(.+){2,}\.(.+){2,}/.test(input.value)) {
      const previousEmail = await firebaseApp
        .firestore()
        .collection(collName)
        .doc(docId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            return doc.data().emails;
          }
          return null;
        });
      firebaseApp
        .firestore()
        .collection(collName)
        .doc(docId)
        .set({ emails: [...previousEmail, inputValue] }, { merge: true })
        .then(() => {
          setInputValue("");
          setCorrectEmail(true);
          NotificationManager.success(
            "Success message",
            "You have a 5% discount"
          );
        })
        .catch((err) => console.log(err));
    } else {
      setCorrectEmail(false);
    }
  };
  return (
    <div className="discount">
      <div className="discount-description">
        <h2 className="discount-description-h2">
          Do you want to receive a extra 5% discount ?
        </h2>
        <span className="discount-description-span">
          It is so simple! All you need to do, is to sing to our newsletter and
          get 5% off to your next order! You must be loged!
        </span>
      </div>
      <form className="discount-form" onSubmit={updateNewsletterList}>
        <input
          type="text"
          id="input-discount"
          placeholder="Enter your email"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        {!correctEmail && (
          <p
            style={{ color: "#ddd", textShadow: "2px 2px 2px #180b0b" }}
            className="error-email"
          >
            Wrong email
          </p>
        )}
        <Button name="Sign me!" type="submit" />
        <NotificationContainer />
      </form>
    </div>
  );
}
