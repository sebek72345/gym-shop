import React, { useState } from "react";
import "./Discount.scss";
import Button from "../../../components/Button/Button";
import firebaseApp from "../../../firebase/initialization";
import admin from "firebase-admin";
export default function Discount() {
  const [inputValue, setInputValue] = useState("");
  const updateNewsletterList = async (e) => {
    e.preventDefault();
    /* const getPreviousSubscribers = await firebaseApp
      .firestore()
      .collection("newsLetterUserList")
      .doc("9aAd2SVvGH26GUpMshiy")
      .get()
      .then((doc) => {
        console.log();
        doc.data().SubscribeList.push(inputValue);
        console.log(doc.exists);
      })
      .catch((err) => console.log(err)); */
    console.log(firebaseApp.firestore);
    firebaseApp
      .firestore()
      .collection("newsLetterUserList")
      .doc("9aAd2SVvGH26GUpMshiy")
      .set({ email: inputValue }, { merge: true })
      .then((doc) => {
        setInputValue("");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="discount">
      <div className="discount-description">
        <h2 className="discount-description-h2">
          Do you want to receive a extra 5% discount ?
        </h2>
        <span className="discount-description-span">
          It's so simple! All you need to do, is to sing to our newsletter and
          get 5% off to your next order!{" "}
        </span>
      </div>
      <form className="discount-form" onSubmit={updateNewsletterList}>
        <input
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <Button name="Sign me!" type="submit" />
      </form>
    </div>
  );
}
