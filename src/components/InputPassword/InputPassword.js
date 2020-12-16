import React, { useState } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import "./InputPassword.scss";

export default function InputPassword({
  values,
  handleBlur,
  handleChange,
  name,
}) {
  const [visablePassword, setVisablePassword] = useState(false);
  return (
    <div className="password-wrapper">
      <input
        type={visablePassword ? "text" : "password"}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values}
        className="input-form"
        placeholder="password"
      />
      <VisibilityIcon
        className="form-eye"
        onClick={() => setVisablePassword(!visablePassword)}
      />
    </div>
  );
}
