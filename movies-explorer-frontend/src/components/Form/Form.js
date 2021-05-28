import {
  Link
} from "react-router-dom";

import React from "react";
import './form.css';


function Form(props) {
return (
    <form className={'form '}>
      {props.children}
    </form>
)
}
export default Form;
