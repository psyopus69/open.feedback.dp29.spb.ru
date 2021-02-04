import React from "react";
import {PropTypes} from "prop-types";
import staticFunctions from "../FUNC/staticFunc";
import {PageError} from "./pageError.jsx";
import {Loading} from "./loading.jsx";
import {mockPageInfo} from "../MOCK/staticSets";

const getStatisticOneField = (statistic, ankid, qid, aid, href, ankidNeeded) => {
  let counter = 0;
  statistic.map((el) => {
    el.answers.map((el2) => { // str
      let str = el2.split(`:`);
      const thisHref = str[0];
      str = str[1]; // str[0] - href.
      str = str.split(`,`); // pairs qid_aid
      str.map((el3) => {
        let st;
        st = el3.split(`_`); // pairs qid,aid
        if (qid === parseInt(st[0], 10) && aid === parseInt(st[1], 10) && ankid === parseInt(el.ankid, 10) && ((href === `` || href === mockPageInfo.hrefs.statistic.all) ? true : (thisHref === href)) && (ankidNeeded === `` ? true : (ankidNeeded === el.ankid))) {
          counter++;
          // console.log(`thisHref = ${thisHref}; el.href = ${href}; ankidNeeded = ${ankidNeeded} , ankid = ${el.ankid}`);
        }
      });
    });
  });
  return counter;
};
const changeLinkBtn = (needOnlyURL, needForAllURL, firstLoad) => {
  const {globalDomainName} = mockPageInfo;
  const {changeValueById, getSearch} = staticFunctions;
  if (needOnlyURL === true && firstLoad === true) {
    return `${globalDomainName}/statistic?log=${getSearch(`log`)}&pas=${getSearch(`pas`)}&name=${getSearch(`name`)}&ankid=${getSearch(`ankid`)}`;
  }
  if (needOnlyURL === true && needForAllURL === true) {
    return `${globalDomainName}/statistic?log=${getSearch(`log`)}&pas=${getSearch(`pas`)}&name=${mockPageInfo.hrefs.statistic.all}&ankid=`;
  }
  let name = document.getElementById(`selectDoc`);
  name = name.options[name.selectedIndex].id;
  if (name === ``) {
    return null;
  }
  let ank = document.getElementById(`selectAnk`);
  ank = ank.options[ank.selectedIndex].id;
  const url = `${globalDomainName}/statistic?log=${getSearch(`log`)}&pas=${getSearch(`pas`)}&name=${name}&ankid=${ank}`;
  if (needOnlyURL === true) {
    return url;
  }
  changeValueById(`checkLinkBtn`, url);
  return null;
};
const renderBySchema = (ankidIn, docObj, psObj, doctors) => function WithAnkidIn(getAllData) {
  const {getMapInsteadAr, checkInArOfObjByKeyAndVal, goLink, getSearch} = staticFunctions;
  const dataIn = getAllData();
  let in1 = checkInArOfObjByKeyAndVal(dataIn, `name`, `statistic`);
  const statistic = dataIn[in1].data;
  in1 = checkInArOfObjByKeyAndVal(dataIn, `name`, `answers`);
  const answers = dataIn[in1].data;
  in1 = checkInArOfObjByKeyAndVal(dataIn, `name`, `schema`);
  const schema = dataIn[in1].data;
  const schemaMap = () => {
    if (ankidIn !== ``) {
      let ff = [];
      ff.push(getMapInsteadAr(schema, `ankid`)[ankidIn]);
      return ff;
    }
    return getMapInsteadAr(schema, `ankid`);
  };
  const answersMap = getMapInsteadAr(answers, `aid`);
  if (dataIn.length > 0) {

    let forC = 0;
    const incA = (statisticIn, el4, el, el2, hrefIn, ankidNeeded) => {
      const ff = getStatisticOneField(statisticIn, el4, el, el2, hrefIn, ankidNeeded);
      forC += ff;
      return ff;
    };
    const resetA = () => {
      const f = forC;
      forC = 0;
      return f;
    };
    const getAnsw = (ankidIn2) => {
      if (ankidIn2 === ``) {
        let s = 0;
        statistic.map((el) => {
          if (el !== undefined) { //  if no reviews yet :D:D
            s += el.answers.length;
          }
        });
        return s;
      }
      if (statistic[checkInArOfObjByKeyAndVal(statistic, `ankid`, ankidIn)] === undefined) { //  if no reviews yet :D:D
        return 0;
      }
      return statistic[checkInArOfObjByKeyAndVal(statistic, `ankid`, ankidIn)].answers.length;
    };
    let newDoc = doctors.slice();
    newDoc.unshift({
      name: `Общая статистика`,
      href: `all`,
    });
    let newAnks = schema.slice();
    newAnks.unshift({
      questions: [{
        ankname: `Общая статистика`,
      }],
      ankid: ``,
    });
    return <React.Fragment>
      <div className={`statParams`}><div className={`ankVers`}>PageStatistic 1.1.0</div>
        Параметры:<br/>
      Роль: {psObj.role}<br/>
      Врач: {docObj.name === `` ? `Все активные` : docObj.name}<br/>
      Ссылка : /{docObj.href === `` ? `Все активные` : docObj.href}<br/>
      № анкет(ы): {ankidIn === `` ? `Все активные` : ankidIn}<br/><br/>
      Анкет по всем врачам: {getAnsw(ankidIn)}<br/>
      Параметры:<br/>
        <div className={`admPanel_stat`}>
          <select className={`button_getLink`} defaultValue={`DEFAULT`} id={`selectDoc`} onClick={() => {
            changeLinkBtn();
          }}>
            <option id={getSearch(`name`)} value={`DEFAULT`} disabled>Врач: {getSearch(`name`) === `all` ? `Общая статистика` : getSearch(`name`)}</option>
            {newDoc.map((el, index) => {
              return <option id={el.href} key={`doc:${el.href}${index}`}>{el.name}</option>;
            })}
          </select><br/>
          <select className={`button_getLink`} defaultValue={`DEFAULT`} id={`selectAnk`} onClick={() => {
            changeLinkBtn();
          }}>
            <option id={getSearch(`ankid`)} value={`DEFAULT`} disabled>Анкета №: {getSearch(`ankid`) === `` ? `Общая статистика` : getSearch(`ankid`)}</option>
            {newAnks.map((el, index) => {
              return <option id={el.ankid} key={`ankid:${el.ankid}${index}`}>Анкета {el.ankid} - {el.questions[0].ankname}</option>;
            })}
          </select><br/>
          <button className={`button_getLink`} id={`checkLinkBtn`} value={changeLinkBtn(true, null, true)} onClick={(e) => {
            goLink(e.target.value, `_self`);
          }}>Просмотр</button>
        </div>
      </div> <div className={`statAnkDiv`}>{
        schemaMap().map((el4, in4) => {
          return <React.Fragment key={`statAnk${el4.qid}:${in4}`}>
            <div className={`selfAnkStatistic`}>
              <div className={`ankNum`}>Анкета №{el4.ankid}: {el4.questions[0].ankname}</div>
              {el4.questions.map((el, index) => {
                return <React.Fragment key={`q:${el.value}:${index}`}>{el.value}<div className={`radioDivQs`}>
                  <div className={`radioDivQs`}>
                    {el.aids.map((el2, in2) => {
                      return <React.Fragment key={`bySchema${el.qid}:${in2}:${el2}of${index}`}>
                        <div className={`radioDivQ`}>
                          <input type='radio'
                            className={el.addClasses === undefined ? `` : (el.addClasses.map(
                                // eslint-disable-next-line max-nested-callbacks
                                (el3) => {
                                  return `${el3}`;
                                }))}
                            name={`nowAnkid:q${el.qid}`}
                            id={`inpAnswer${in2}:${answersMap[el2]}:${el2}:${el.qid}`}
                          />
                          <label htmlFor={`inpAnswer${in2}:${answersMap[el2]}:${el2}:${el.qid}`}>{answersMap[el2].value}
                          </label>
                          <React.Fragment>
                            {`  :  `} {incA(statistic, el4.ankid, el.qid, el2, docObj.href === null ? `` :
                              docObj.href, ankidIn === null ? `` : ankidIn)}
                          </React.Fragment>
                        </div>
                      </React.Fragment>;
                    })}
                  Всего ответов :{resetA()}
                  </div>
                </div>
                </React.Fragment>;
              })}</div>
          </React.Fragment>;
        })
      }</div>
    </React.Fragment>;
  }
  return <Loading />;
};
const renderScreen = (props) => {
  const {getSearch, checkLP} = staticFunctions;
  if (getSearch(`log`) === `` || getSearch(`log`) === null || getSearch(`pas`) === `` || getSearch(`pas`) === null) {
    return <PageError msg={`Ошибка. Не указан логин или пароль.`}/>;
  }
  const psOb = checkLP(getSearch(`log`), getSearch(`pas`));
  if (!psOb) {
    return <PageError msg={`Ошибка. Указан не верный логин или пароль.`}/>;
  }
  const {getMapInsteadAr, checkInArOfObjByKeyAndVal} = staticFunctions;
  const {getAllData} = props;
  const forCheckData = getAllData();
  const mapSchema = getMapInsteadAr(forCheckData[checkInArOfObjByKeyAndVal(forCheckData, `name`, `schema`)].data, `ankid`);
  if (getSearch(`ankid`) === null) {
    return <PageError msg={`Не задан параметр номера анкеты`} />;
  }
  if (mapSchema[getSearch(`ankid`)] === undefined && getSearch(`ankid`) !== ``) {
    return <PageError msg={`Анкета не активна`} />;
  }
  const thisHref = getSearch(`name`);
  if (thisHref === null) {
    return <PageError msg={`Не задан параметр имени врача!`} />;
  }
  if (thisHref === ``) {
    return <PageError msg={`Не задано имя врача!`} />;
  }
  const doctors = forCheckData[checkInArOfObjByKeyAndVal(forCheckData, `name`, `doctors`)];
  let needBack = false;
  for (let i = 0; i < doctors.data.length; i++) {
    if (doctors.data[i].href === thisHref) {
      needBack = doctors.data[i];
      break;
    }
  }
  if (thisHref === mockPageInfo.hrefs.statistic.all) {
    needBack = {
      name: `Все врачи`,
      href: mockPageInfo.hrefs.statistic.all,
    };
  }
  if (needBack === false) {
    return <PageError msg={`Врач: ${getSearch(`name`)} - не найден`}/>;
  }
  return <div className={`pageStatistic`}>Статистика анкетирования ДГП29
    {renderBySchema(getSearch(`ankid`), needBack, psOb, doctors.data)(getAllData)}
  </div>;
};
const PageStatistic = (props) => {
  const {getAllData} = props;
  if (getAllData().length > 0) {
    return renderScreen(props);
  }
  return <Loading />;
};
PageStatistic.propTypes = {
  getAllData: PropTypes.func.isRequired,
};
export {
  PageStatistic,
};
