import {pS} from "../MOCK/staticSets";

const compareArrays = (ar1, ar2) => {
  return JSON.stringify(ar1) === JSON.stringify(ar2);
};
const checkInArOfObjByKeyAndVal = (array, keySearch, value) => {
  for (let i = 0; i < array.length; i++) {
    let keys = Object.keys(array[i]);
    for (let j = 0; j < keys.length; j++) {
      if (keys[j] === keySearch && array[i][keys[j]] === value) {
        return i;
      }
    }
  }
  return false;
};
const getMapInsteadAr = (ar, mainKey) => { // mainKey - int!
  const fakeMap = [];
  ar.map((el) => {
    Object.keys(el).map((el2, ind2) => {
      if (el2 === mainKey) {
        fakeMap[parseInt(Object.values(el)[ind2], 10)] = el;
      }
    });
  });
  return fakeMap;
};
const getPathname = () => {
  return window.location.pathname;
};
const getSearch = (paramName) => {
  const params = new URLSearchParams(window.location.search); // Returns:'?'
  return params.get(paramName);
};
const checkValueBySchema = (schema, valObj) => {
  const {min, max, type} = schema;
  if (typeof (valObj.value) !== type) {
    if (type !== `any`) {
      return false;
    }
  }
  if (typeof (valObj.value) === `string`) {
    if (valObj.value.length > max || valObj.value.length < min) {
      return false;
    }
  } else if (typeof (valObj.value) === `number`) {
    if (valObj.value > max || valObj.value < min) {
      return false;
    }
  }
  return true;
};
const removeElements = (elms) => elms.forEach((el) => el.remove());
const checkLP = (l, p) => {
  // console.log(`l:p = ${l}:${p};  S[0].login:pS[0].password = ${pS[0].login}:${pS[0].password} `);
  for (let i = 0; i < pS.length; i++) {
    if (l === pS[i].login && p === pS[i].password) {
      return Object.assign({}, pS[i], {
        login: `checked`,
        password: `checked`,
      });
    }
  }
  return false;
};
const goLink = (link, target) => {
  window.open(link, target === undefined ? `_blank` : target);
};
const getText = (id) => {
  return document.getElementById(id).textContent;
};
const copyLink = (containerid) => {
  if (document.selection) {
    const range = document.body.createTextRange();
    range.moveToElementText(document.getElementById(containerid));
    range.select().createTextRange();
    document.execCommand(`copy`);
  } else if (window.getSelection) {
    window.getSelection().removeAllRanges();
    const range = document.createRange();
    range.selectNode(document.getElementById(containerid));
    window.getSelection().addRange(range);
    document.execCommand(`copy`);
    window.getSelection().removeAllRanges();
  }
};
const changeValueById = (id, value) => {
  document.getElementById(id).value = value;
};
const staticFunctions = {
  compareArrays,
  checkInArOfObjByKeyAndVal,
  getMapInsteadAr,
  getPathname,
  getSearch,
  checkValueBySchema,
  removeElements,
  checkLP,
  goLink,
  getText,
  copyLink,
  changeValueById,
};

export default staticFunctions;
