import {PropTypes} from "prop-types";
import React from "react";

const CountAnk = (props) => {
  const {getData, postedId} = props;
  if (getData() === -1) {
    return <div className={`count_reviews`}><img alt='placeholder' src='assets/img/placeholder_3.gif'/></div>;
  }
  return <div className={`count_reviews`}>Уникальный номер сообщения: {postedId};<br/>Всего подобных сообщений: {getData().count === undefined ? <img alt='placeholder' src='assets/img/placeholder_3.gif'/> : getData().count}.</div>;
};
CountAnk.propTypes = {
  getData: PropTypes.func.isRequired,
  postedId: PropTypes.number.isRequired,
};
export {
  CountAnk,
};
