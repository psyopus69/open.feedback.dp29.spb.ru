import React from "react";
import {PropTypes} from "prop-types";
import withAsyncData from "../HOC/withAsyncData";
import {CountAnk} from "./countAnk.jsx";
import {sqlRequests} from "../API/sqlRequests";

const CountAnkWrapped = withAsyncData(CountAnk);
const PageSuccess = (props) => {
  const {ankid, postedId} = props;
  return <React.Fragment><div className={`successPage`}>
    <div className={`successPageText`}>Спасибо за Сообщение!</div>
    <div className={`successPageCounter`}>
      <CountAnkWrapped
        postedId={postedId}
        method={{
          sql: sqlRequests.getInterviewsCount,
          params: `&countAnkId=${ankid}`,
        }}
        autostart={true}
      /></div>
  </div>
  </React.Fragment>;
};
PageSuccess.propTypes = {
  ankid: PropTypes.number.isRequired,
  postedId: PropTypes.number.isRequired,
};
export {
  PageSuccess,
};

