import React, { userState, useReducer, useState, useContext } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

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
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }

  if (action.type === "COLLAGE_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const authCxt = useContext(AuthContext);

  ///////////////////////////cleanUP end //////////////////////////
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

  // const { isValid: emailIsValid } = emailState;
  // const { isValid: setPasswordIsValid } = passwordState;

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
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({
      type: "PASS_BLUR",
    });
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
    console.log(collageState.value);
    console.log(emailState.value);
    console.log(passwordState.value);
    authCxt.onLogin(emailState.value, passwordState.value, collageState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <Input
          id="clg"
          label="Collage"
          type="text"
          isValid={collageState.isValid}
          value={collageState.value}
          onChange={collageChangeHandler}
          onBlur={validateCollageHandler}
        />
        {/*  */}
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
