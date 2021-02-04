import React from "react";
import {PropTypes} from "prop-types";

const PageError = (props) => {
  const {msg} = props;
  return <div className={`send_error`}>{msg}</div>;
};
PageError.propTypes = {
  msg: PropTypes.string.isRequired,
};
export {
  PageError,
};
