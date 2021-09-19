import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const primaryColor = "blue";

const useStyles = makeStyles(() => ({
  root: {
    margin: "10px auto",
    position:"relative",
    "& label.Mui-focused": {
      color: primaryColor,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: primaryColor,
      },
    },
    "& .MuiFormLabel-root.Mui-error":{
      fontSize:14
    },
    "& .MuiFormLabel-root.Mui-required":{
      fontSize:14
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink" :{
      transform: "translate(14px, -6px) scale(0.87)"
    }
  }
}));

const MuiTextField = ({
  label,
  type,
  name,
  input,
  disabled,
  multiline,
  required,
  placeholder,
  rows = 1,
  value,
  meta: { touched, invalid, error },
}) => {
  const classes = useStyles();

  return (
    <TextField
      name={name}
      placeholder={placeholder}
      className={classes.root}
      multiline={multiline}
      rows={rows}
      value={value}
      label={label}
      disabled={disabled}
      type={type}
      required={required}
      InputLabelProps={
        placeholder
          ? {
            shrink: true,
          }
          : null
      }
      margin="normal"
      variant="outlined"
      fullWidth
      helperText={touched && error}
      error={touched && invalid}
      {...input}
    />
  );
};

export default MuiTextField;
