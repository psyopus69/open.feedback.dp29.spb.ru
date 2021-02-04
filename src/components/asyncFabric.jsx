//  required 2 HOCS - withAsyncFabric(for render all data, when done async load) &&
//  withCustomState(for screenRender. It throws into howRenderAll(setStateCustom) for connect
//  elements, that will be render after downloading with screenSwitch function)
//  howRenderAll = (setStateCustom, nowAnkidIn, startPostIn) => (ar) => ...
//  split all tables, make map of schema, get neededDoctor,  render html with one element - formWrapper Component, with
//  callback= (userdata) => (fields) => {
//             sendFeed(setStateCustom, nowAnkidIn, startPostIn)(fields, neededDoc, userdata);
//           }// special callback for withForm component. It connect comp with renderScreen func of mainComp with element's, which will be render in
//  asyncFabric in children withForm by adding lint ro results obj func to parent (child of this :D)
import React from "react";
import {PropTypes} from "prop-types";
import staticFunctions from "../FUNC/staticFunc";
import withForm from "../HOC/withForm";
import {FeedbackForm} from "./feedbackForm.jsx";
import {PageError} from "./pageError.jsx";
import {PageSuccess} from "./pageSuccess.jsx";
import forFeedPage from "../FUNC/feedbackPageStatic";
import {Loading} from "./loading.jsx";

let startPost = false; // flag for apply post request, it take for check, is already get request.
const howRenderAll = (setStateCustom, nowAnkidIn, startPostIn, setPostedId) => function withSetStateCustom(ar) { // for asyncFabric, when all tables load :D func take ar some params () & then take a mass of tables
  const {checkInArOfObjByKeyAndVal, getMapInsteadAr, getSearch} = staticFunctions;
  const {prepareFieldsForHocWithForm, sendFeed} = forFeedPage;
  if (ar.length > 0) {
    const FeedbackFormWrapped = withForm(FeedbackForm);
    let indexF = checkInArOfObjByKeyAndVal(ar, `name`, `doctors`);
    const doctors = ar[indexF].data;
    if (getSearch(`name`) === null) {
      return <PageError msg={`Ошибка . Не задан параметр врач`} />;
    }
    if (checkInArOfObjByKeyAndVal(doctors, `href`, getSearch(`name`)) === false) {
      return <PageError msg={`Ошибка . Врач "${getSearch(`name`)}" не найден.`} />;
    }
    indexF = checkInArOfObjByKeyAndVal(ar, `name`, `schema`);
    const schema = ar[indexF].data;
    indexF = checkInArOfObjByKeyAndVal(ar, `name`, `answers`);
    const answers = ar[indexF].data;
    const mapSchema = getMapInsteadAr(schema, `ankid`);
    if (mapSchema[nowAnkidIn] === undefined) {
      return <PageError msg={`Анкета не активна`} />;
    }
    const ankName = getMapInsteadAr(mapSchema[nowAnkidIn].questions, `qid`)[1].ankname;
    const getFields = prepareFieldsForHocWithForm(mapSchema[nowAnkidIn].questions);
    const neededDoc = doctors[checkInArOfObjByKeyAndVal(doctors, `href`, getSearch(`name`))];
    const retD = (neededDocIn) => {
      if (neededDocIn.href === `Anketa29` || neededDoc.href === `Anketa61`) {
        return <React.Fragment>Подразделение: {neededDocIn.href === `Anketa29` ? `29` : `61`}</React.Fragment>;
      }
      return <div className={`doctorAtrDiv`}>
        {/* eslint-disable-next-line no-nested-ternary */}
        {neededDocIn === undefined ? `undefined` : (neededDocIn.name.indexOf(`Регистратура`) > -1 ? neededDocIn.name : `ФИО Врача: ${neededDocIn.name}`)};<br/>
        Подразделение: {neededDocIn === undefined ? `undefined` : neededDocIn.branch};
      </div>;
    };
    return <React.Fragment>
      <div className={`ankVers`}>
      Anketa v 1.2.1
      </div>
      <div className={`mainAnk`}>
        <div className={`mainAnkName`}>{ankName}</div>
        {retD(neededDoc)}
        <FeedbackFormWrapped
          needCheck={true}
          ankid={nowAnkidIn}
          formClassname={`feedbackForm`}
          formIdname={`feedbackFormId${nowAnkidIn}`}
          fields={getFields}
          schema={schema}
          answers={answers}
          callback={(userdata) => (fields) => {
            sendFeed(setStateCustom, nowAnkidIn, startPostIn, setPostedId)(fields, neededDoc, userdata);
          }}/>
      </div>
    </React.Fragment>;
  }
  return <Loading />;
};
let postedId;
const renderScreen = (props, nowAnkidIn, startPostIn) => {
  const {getStateCustom, setStateCustom, renderAllData} = props;
  switch (getStateCustom()) {
    case -1: {
      return renderAllData(howRenderAll(setStateCustom, nowAnkidIn, startPostIn, (num) => {
        postedId = num;
      }));
    }
    case 0: {
      return <PageSuccess
        ankid={nowAnkidIn} postedId={postedId}
      />;
    }
    case 400: {
      return <PageError msg={`Ошибка 400. Неожиданный ответ сервера. Попробуйте позже.`} />;
    }
  }
  return <div>Not known screen, id = {getStateCustom()}</div>;
};
const AsyncFabric = (props) => {
  const {getSearch} = staticFunctions;
  const {getAllData} = props;
  if (getAllData().length === 0) {
    return <Loading />;
  }
  const ankid = getSearch(`ankid`);
  if (ankid === `` || ankid === null) {
    if (ankid === null) {
      return <PageError msg={`Ошибка. Не указан параметр номера анкеты.`}/>;
    }
    return <PageError msg={`Ошибка. Не указан номер анкеты.`} />;
  }
  if (getSearch(`name`) === `` || getSearch(`name`) === null) {
    if (getSearch(`name`) === null) {
      return <PageError msg={`Ошибка. Не указан параметр имя врача.`}/>;
    }
    return <PageError msg={`Ошибка. Не указано имя врача.`}/>;
  }
  return renderScreen(props, parseInt(ankid, 10), startPost);
};
AsyncFabric.propTypes = {
  getAllData: PropTypes.func.isRequired,
  renderAllData: PropTypes.func.isRequired,
  getStateCustom: PropTypes.func.isRequired,
  setStateCustom: PropTypes.func.isRequired,
};
export {
  AsyncFabric,
};
