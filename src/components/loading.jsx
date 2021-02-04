import React from "react";
import {PropTypes} from "prop-types";

const Loading = (props) => {
  const {msg} = props;
  return <div className={`loadingMainScreen`}>{msg === undefined ? `Загрузка ...` : msg}<img alt='placeholder' src='assets/img/placeholder_3.gif'/></div>;
};
Loading.propTypes = {
  msg: PropTypes.string,
};
export {
  Loading
};
