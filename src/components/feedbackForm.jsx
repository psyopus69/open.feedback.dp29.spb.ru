//  set into renderBySchema callback = callback(() => {
//       return getOb();
//     } // for connect callback input vars with link on func to get object to send.
//  getOb is a link, which use only in setF func in setFields props in children withFormWrapped component
import React from "react";
import {PropTypes} from "prop-types";
import {mockPageInfo} from "../MOCK/staticSets";
import withForm from "../HOC/withForm";
import {UserdataForm} from "./userdataForm.jsx";
import staticFunc from "../FUNC/staticFunc";

const UserdataFormWrapped = withForm(UserdataForm);
const FeedbackForm = (props) => {
  const {getSearch} = staticFunc;
  let getOb;
  const setF = (func) => {
    getOb = func;
  };
  const {callback, renderBySchema, ankid} = props;
  return <React.Fragment>
    {renderBySchema(callback(() => {
      return getOb();
    }), ankid)}
    <UserdataFormWrapped needCheck={true} formIdname={`userdataForm`} customSubmit={true} needFormTag={false} fields={getSearch(`userdataNeed`) === `false` ? [] : mockPageInfo.formUserFields.fields} setGetFields={(fIn) => {
      setF(fIn);
    }} /><br/>
    <button type='submit'>Отправить</button>
  </React.Fragment>;
};
FeedbackForm.propTypes = {
  callback: PropTypes.func.isRequired,
  renderBySchema: PropTypes.func.isRequired,
  ankid: PropTypes.number.isRequired,
};
export {
  FeedbackForm,
};
