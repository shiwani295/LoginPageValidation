import React, { userState, useReducer, useState } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReduer = (state, action) => {
  //state is last snapshot //action comes from the email password handler type and value
  if (action.type === "USER_INPUT") {
    console.log(action);
    return { value: action.val, isValid: action.val.includes("@") };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") }; //state,value last value whichyou enter in email
  }
  return { value: "", isValid: false };
};

//2nd step
const passwordReducer = (state, action) => {
  if (action.type === "USER_PASSINPUT") {
    console.log(action);
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "PASS_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

//collage reducer
const collageReducer = (state, action) => {
  if (action.type === "USER_COLLAGEINPUT") {
    console.log(action);
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }

  if (action.type === "COLLAGE_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  //emailUseReducer
  const [emailState, dispatchEmail] = useReducer(emailReduer, {
    value: "",
    isValid: false,
  });

  //Password UseReducer 1 step
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });

  //Collage UseREducer
  const [collageState, dispatchCollage] = useReducer(collageReducer, {
    value: "",
    isValid: false,
  });

  /////Email HANDLAR
  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(
      event.target.value.includes("@") &&
        passwordState.isValid &&
        collageState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_PASSINPUT", val: event.target.value });
    setFormIsValid(
      event.target.value.trim().length > 6 &&
        emailState.isValid &&
        collageState.isValid
    );
  };

  const collageChangeHandler = (event) => {
    //setEnteredCollage(event.target.value);
    dispatchCollage({ type: "USER_COLLAGEINPUT", val: event.target.value });
    setFormIsValid(
      event.target.value.trim().length > 0 &&
        emailState.isValid &&
        passwordState.isValid
    );
  };

  ////////////////VALIDATE HANDLAR
  const validateEmailHandler = () => {
    //setEmailIsValid(emailState.isValid.includes("@"));
    dispatchEmail({
      type: "INPUT_BLUR",
    });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({
      type: "PASS_BLUR",
    });

    //setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const validateCollageHandler = () => {
    // setCollageIsValid(enteredCollage.trim().length > 0);
    dispatchCollage({
      type: "COLLAGE_BLUR",
    });
  };

  //////////Submit Handlar
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, collageState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} 
        ${emailState.isValid === false ? classes.invalid : ""}`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collageState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="clg">Collage</label>
          <input
            type="text"
            id="clg"
            value={collageState.value}
            onChange={collageChangeHandler}
            onBlur={validateCollageHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
