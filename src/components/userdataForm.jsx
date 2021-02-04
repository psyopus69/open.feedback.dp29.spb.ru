//  get renderForm && getFields from HOC, by setGetFields connect this.state with parent by send link to function.
import React from "react";
import {PropTypes} from "prop-types";

const UserdataForm = (props) => {
  const {renderForm, setGetFields, getFields, fields} = props;
  setGetFields(getFields);
  return <React.Fragment>{fields.length === 0 ? `` : <div className={`userdataMainDiv`}><div className={`userdataLogoText`}>Данные посетителя (пациента):</div>{renderForm()}</div>}</React.Fragment>;
};
UserdataForm.propTypes = {
  renderForm: PropTypes.func.isRequired,
  getFields: PropTypes.func.isRequired,
  setGetFields: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
};
export {
  UserdataForm,
};
