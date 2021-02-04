import {api} from "../API/api";
import {sqlRequests} from "../API/sqlRequests";
import staticFunctions from "./staticFunc";

const prepareUserdata = (userdata) => {
  const needOb = userdata();
  let fAr = [];
  needOb.map((el) => {
    fAr.push(JSON.stringify({
      paramName: el.name,
      value: el.value,
    }));
  });
  return fAr;
};
const prepareFieldsForHocWithForm = (ar) => {
  let getFields = [];
  ar.map((el) => {
    getFields.push({
      name: el.value,
      qid: el.qid,
      type: `radiobutton`,
      require: {
        schema: {
          min: 1,
          max: 999,
          type: `any`
        },
      },
    });
  });
  return getFields;
};
const answersFromFields = (fields) => {
  return fields.map((el) => {
    return `${el.qid}_${el.value}`;
  });
};
const getAx = (fields, nowAnkidIn, neededDoc) => {
  return api({
    params: `&answers=${answersFromFields(fields)}&ankidPost=${nowAnkidIn}&href=${neededDoc.href}`,
    sql: sqlRequests.postFeedback,
  });
};
let axPostFlag = false; // for axios multi use for ONE request block
const sendFeed = (setStateCustom, nowAnkidIn, startPostIn, setPostedId) => (fields, neededDoc, userdata) => {
  // console.log(`startPostIn: ${startPostIn}; axFlag: ${axPostFlag}`);
  const userdataOb = userdata();
  if (staticFunctions.checkInArOfObjByKeyAndVal(userdataOb, `check`, false) !== false) {
    return;
  }
  const ax = getAx(fields, nowAnkidIn, neededDoc, userdata);
  if (neededDoc === undefined) {
    setStateCustom(406);
    return;
  }
  if (!startPostIn && !axPostFlag) {
    startPostIn = true;
    axPostFlag = true;
    // ax.post(``, JSON.stringify(prepareUserdata(userdata))).then((resp) => {
    ax.post(``, prepareUserdata(userdata)).then((resp) => {
      startPostIn = false;
      if (resp.status === 404) {
        setStateCustom(404);
        startPostIn = false;
      } else if (resp.status === 400) {
        setStateCustom(400);
        startPostIn = false;
      }
      if (resp.data.answer === `success`) {
        setPostedId(parseInt(resp.data.ankPostedId, 10));
        setStateCustom(0);
        startPostIn = false;
        return;
      }
      setStateCustom(400);
      axPostFlag = false;
    });
  }
};
const forFeedPage = {
  prepareFieldsForHocWithForm,
  sendFeed,
};
export default forFeedPage;
