//  required 1 HOC withAsyncFabric
//  prepare 2 tables according to given scema for withAsyncFabric.
import React from "react";
import {PropTypes} from "prop-types";
import {Loading} from "./loading.jsx";
import {GeneratorForm} from "./generatorForm.jsx";
import staticFunctions from "../FUNC/staticFunc";
import {PageError} from "./pageError.jsx";

const Generator = (props) => {
  const {checkInArOfObjByKeyAndVal} = staticFunctions;
  const {getSearch, checkLP} = staticFunctions;
  if (getSearch(`log`) === `` || getSearch(`log`) === null || getSearch(`pas`) === `` || getSearch(`pas`) === null) {
    return <PageError msg={`Ошибка. Не указан логин или пароль.`}/>;
  }
  const psOb = checkLP(getSearch(`log`), getSearch(`pas`));
  if (!psOb) {
    return <PageError msg={`Ошибка. Указан не верный логин или пароль.`}/>;
  }
  const {getAllData} = props;
  const data = getAllData();
  if (data.length === 0) {
    return <Loading />;
  }
  const schema = data[checkInArOfObjByKeyAndVal(data, `name`, `schema`)].data;
  const doctors = data[checkInArOfObjByKeyAndVal(data, `name`, `doctors`)].data;
  return <div className={`generatorPage`}>Роль: {psOb.role}<br/>Имя: {psOb.name}<br/><br/>
    <GeneratorForm schema={schema} doctors={doctors} />
  </div>;
};
Generator.propTypes = {
  getAllData: PropTypes.func.isRequired,
};
export {
  Generator,
};
