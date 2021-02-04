//  require HOC withCustomState
import React, {Fragment} from "react";
import {PropTypes} from "prop-types";
import QRcode from "qrcode.react";
import {Loading} from "./loading.jsx";

const QR = (props) => {
  const {getStateCustom, connectSetState, setStateCustom, connectGetState} = props;
  connectSetState(setStateCustom);
  connectGetState(getStateCustom);
  if (getStateCustom() === -1) {
    return <Loading msg={`Выберите параметры для генерации QR`}/>;
  }
  return <Fragment><div className={`qrGen`}>QRCode: (открывается через любой сканер QR - vk, insta, facebook и тд.)<br/><br/><br/>
    <QRcode size={getStateCustom().size} id={`QrGenerator`} value={getStateCustom().value}/></div>
  </Fragment>;
};
QR.propTypes = {
  getStateCustom: PropTypes.func.isRequired,
  setStateCustom: PropTypes.func.isRequired,
  connectSetState: PropTypes.func.isRequired,
  connectGetState: PropTypes.func.isRequired,
};
export {
  QR
};
