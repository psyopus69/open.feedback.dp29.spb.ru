import React, {Fragment} from "react";
import {PropTypes} from "prop-types";
import {mockPageInfo} from "../MOCK/staticSets";
import {QR} from "./qr.jsx";
import withCustomState from "../HOC/withCustomState";
import staticFunctions from "../FUNC/staticFunc";

let forChildSetState;
let forChildGetState;
const setStateChild = (funcSetState) => {
  forChildSetState = funcSetState;
};
const getStateChild = (funcGetState) => {
  forChildGetState = funcGetState;
};
const changeSize = (how) => {
  if (forChildGetState() === -1) {
    return;
  }
  forChildSetState(Object.assign({}, forChildGetState(), {
    size: how === `inc` ? (parseInt(forChildGetState().size, 10) + 50) : (parseInt(forChildGetState().size, 10) - 50),
  }));
};
const generateLink = () => {
  const {generatorForm, globalDomainName} = mockPageInfo;
  const {minWidth} = generatorForm;
  let name = document.getElementById(`selectDoc`);
  name = name.options[name.selectedIndex].id;
  let ank = document.getElementById(`selectAnk`);
  ank = ank.options[ank.selectedIndex].id;
  document.getElementById(`forLink`).innerHTML = `${globalDomainName}/feedback?name=${name}&ankid=${ank}`;
  forChildSetState(Object.assign({}, forChildGetState(), {
    value: `${globalDomainName}/feedback?name=${encodeURIComponent(name)}&ankid=${ank}`,
    size: forChildGetState().size === undefined ? minWidth / 2 : forChildGetState().size,
  }));
};
const renderFields = (fields, doctors, schema) => {
  const {goLink, getText, copyLink} = staticFunctions;
  const {generatorForm} = mockPageInfo;
  const QRWrapped = withCustomState(QR);
  return <Fragment>
    <div className={`ankVers`}>
    Generator v 1.1.0
    </div>
    <div className={`docs`}>{fields[0].name}: <select onClick={() => {
      generateLink();
    }} id={`selectDoc`}>
      {doctors.map((el, index) => {
        return <option onClick={() => {
          if (window.innerWidth < generatorForm.minWidth) {
            generateLink();
          }
        }} id={el.href} key={`doc:${el.href}${index}`}>{el.name}</option>;
      })}
    </select>
    </div>
    <div className={`anks`}>{fields[1].name}: <select onClick={() => {
      generateLink();
    }} id={`selectAnk`}>
      {schema.map((el, index) => {
        return <option onClick={() => {
          if (window.innerWidth < generatorForm.minWidth) {
            generateLink();
          }
        }} id={el.ankid} key={`ankid:${el.ankid}${index}`}>Анкета {el.ankid} - {el.questions[0].ankname}</option>;
      })}
    </select>
    </div>
    <button className={`button_getLink`} onClick={() => {
      goLink(getText(`forLink`));
    }}>Проверить</button>
    <button id={`copy_link`} className={`button_getLink`} onClick={() => {
      copyLink(`forLink`);
    }}>Копировать</button><br/>
    Ссылка:<br/>
    <div id={`forLink`} className={`forLink`} /><br/>
    <button id={`copy_link`} className={`button_getLink`} onClick={() => {
      changeSize(`inc`);
    }}>Увеличить QR</button>
    <button id={`copy_link`} className={`button_getLink`} onClick={() => {
      changeSize();
    }}>Уменьшить QR</button><br/>
    <QRWrapped connectSetState={setStateChild} connectGetState={getStateChild} />
  </Fragment>;
};
const GeneratorForm = (props) => {
  const {generatorFields} = mockPageInfo;
  const {fields} = generatorFields;
  const {doctors, schema} = props;
  return <Fragment>Генератор ссылок.<br/>
    {renderFields(fields, doctors, schema)}
  </Fragment>;
};
GeneratorForm.propTypes = {
  schema: PropTypes.array.isRequired,
  doctors: PropTypes.array.isRequired,
};
export {
  GeneratorForm,
};
