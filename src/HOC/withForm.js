//  add renderForm(callback), renderBySchema(callback, nowAnkid), getFields(), expect fields ([]) & formIdname(``) in props
//  add check functions by props
//  method renderForm(c) - connect c with onSumbit or no, (props has customSubtim). render form for add fields
//  method renderBySchema(c, id) - set callback to this.callback., id - REQUIRE, id of ank in schema to render form.
import React, {Component} from "react";
import {PropTypes} from "prop-types";
import staticFunctions from "../FUNC/staticFunc";
import {mockPageInfo} from "../MOCK/staticSets";

const {getMapInsteadAr, checkInArOfObjByKeyAndVal, checkValueBySchema, removeElements} = staticFunctions;
let checkColoredProgressLoc = false;
const fakeCallback = (eltsToColor, formIdname, checkColoredProgress) => () => {
  const {errorTimeShow} = mockPageInfo;
  // console.log(`check failed`);
  if (!checkColoredProgress) {
    checkColoredProgress = true;
    removeElements(document.querySelectorAll(`.error_check_msg`));
    const fakeDiv = document.createElement(`DIV`); // Create a <p> node
    fakeDiv.classList.add(`checkFailFormIn`, `error_check_msg`);
    const t = document.createTextNode(`Не выбран ответ/поле.`); // Create a text node
    fakeDiv.appendChild(t); // Append the text to <div>
    document.getElementsByTagName(`form`)[0].appendChild(fakeDiv); // Append <p> to <div> with id="myDIV"
    setTimeout(() => {
      removeElements(document.querySelectorAll(`.error_check_msg`));
    }, errorTimeShow);
    eltsToColor.map((el) =>{
      const arrr = window.document.getElementsByName(`${formIdname}:q${el.qid}`);
      if (arrr[0] !== undefined) {
        const allChild = arrr[0].parentNode.parentNode.children;
        for (let i = 0; i < allChild.length; i++) {
          allChild[i].classList.add(`checkFailFormIn`);
        }
        setTimeout(() => {
          if (arrr[0] !== undefined) {
            for (let i = 0; i < allChild.length; i++) {
              allChild[i].classList.remove(`checkFailFormIn`);
            }
          }
          checkColoredProgress = false;
        }, errorTimeShow);
      }
    });
  }
};
const coloredArByName = (arToColor) => {
  const {errorTimeShow} = mockPageInfo;
  if (!checkColoredProgressLoc) {
    checkColoredProgressLoc = true;
    arToColor.map((el) =>{
      const arrr = window.document.getElementsByName(`${el.name}`);
      if (arrr[0] !== undefined) {
        arrr[0].classList.add(`checkFailFormIn`);
        setTimeout(() => {
          if (arrr[0] !== undefined) {
            arrr[0].classList.remove(`checkFailFormIn`);
          }
          checkColoredProgressLoc = false;
        }, errorTimeShow);
      }
    });
  }
};
const ff = (func, eltsToCh, formIdname, checkColoredProgress) => {
  const letCh = [];
  eltsToCh.map((el) => {
    if (!checkValueBySchema(el.require.schema, el)) {
      letCh.push(el);
    }
  });
  if (letCh.length > 0) {
    return fakeCallback(letCh, formIdname, checkColoredProgress);
  }
  return func;
};
const withForm = (ComponentIn) => {
  class WithForm extends Component {
    static getFields(array) {
      const newArForState = new Array(0);
      array.map((el, index) => {
        newArForState.push(Object.assign({}, el, {
          id: index,
          placeholder: el.placeholder === undefined ? `` : el.placeholder,
          value: el.value === undefined ? `` : el.value,
        }));
      });
      return newArForState;
    }
    static getCheckedFields(fields) {
      let fAr = [];
      fields.map((el) => {
        fAr.push(Object.assign({}, el, {
          check: checkValueBySchema(el.require.schema, el),
        }));
      });
      return fAr;
    }
    static getErrorsInCheck(ar) {
      let withError = [];
      ar.map((el) => {
        if (!checkValueBySchema(el.require.schema, el)) {
          withError.push(el);
        }
      });
      return withError;
    }
    constructor(props) {
      super(props);
      this.props = props;
      this.state = {
        fields: WithForm.getFields(props.fields),
      };
      this.checkColoredProgress = false;
    }
    renderForm(callback, submitName) {
      const {customSubmit, needCheck, formIdname} = this.props;
      if (customSubmit !== true) {
        if (needCheck === true) {
          this.callback = ff(callback, this.state.fields, formIdname, this.checkColoredProgress);
        }
        this.callback = callback;
      }
      const {fields} = this.state;
      return <React.Fragment>{
        fields.map((el, index) => {
          if (el.type === `number` || el.type === `string`) {
            return <React.Fragment key={`FrOfinp${index}:${el.type}:${el.name}`}><div className={`userInput`}>
              {el.name}
              <input placeholder={`${el.placeholder}`} onChange={ (event) => {
                const newS = this.state.fields.slice();
                newS[index].value = event.target.value;
                this.setState({fields: newS});
              }}
              autoComplete="off"
              key={`inp${index}:${el.type}:${el.name}`}
              type='text' size={el.range} value={el.value} name={el.name} /><br/></div>
            </React.Fragment>;
          } else if (el.type === `textarea`) {
            return <React.Fragment key={`FrInptextA${index}:${el.type}:${el.name}`}><div className={`userInput`}>
              <div className={`textareaText`}>{el.name}</div>
              <textarea placeholder={el.placeholder} onChange={(e) => {
                this.changeValue(e, index);
              }} key={`textA${index}:${el.type}:${el.name}`} name={el.name} cols={el.range.cols} rows={el.range.rows} value={el.value} />
            </div></React.Fragment>;
          } else if (el.type === `radiobutton`) {
            return <React.Fragment key={`inp${index}:${el.type}:${el.name}`} ><input placeholder={`${el.placeholder}`} onChange={ () => {
              const newS = this.state.fields.slice();
              newS[index].value = newS[index].value === `checked` ? `` : `checked`;
              this.setState({fields: newS});
            }}
            type='radio' size={el.range} value={el.value} name={el.name}
            id={`inp${index}:${el.type}:${el.name}`}
            checked={this.state.fields[index].value}
            /> <label htmlFor={`inp${index}:${el.type}:${el.name}`}>{el.placeholder}</label></React.Fragment>;
          }
          return `undefined type : ${el.type}`;
        })}
      {customSubmit === true ? `` : <button type="submit">{submitName === undefined ? `Отправить` : submitName}</button>}
      </React.Fragment>;
    }
    renderBySchema(callback, nowAnkid) {
      const {schema, answers, needCheck, formIdname} = this.props;
      const {fields} = this.state;
      if (schema === undefined || answers === undefined) {
        return <div>No schema or answers!</div>;
      }
      if (needCheck === true) {
        this.callback = ff(callback, fields, formIdname, this.checkColoredProgress);
      } else {
        this.callback = callback;
      }
      const schemaMap = getMapInsteadAr(schema, `ankid`);
      const answersMap = getMapInsteadAr(answers, `aid`);
      return <React.Fragment>
        { schemaMap[nowAnkid].questions.map((el, index) => {
          return <React.Fragment key={`q:${el.value}:${index}`}><div className={`questValDiv`}>{el.value}</div>
            <div className={`radioDivQs`}>
              {el.aids.map((el2, in2) => {
                return <React.Fragment key={`bySchema${el.qid}:${in2}:${el2}of${index}`}><div className={`radioDivQ`} onClick={(e) => {
                  const thisInputRadio = e.target.querySelector(`input`);
                  if (thisInputRadio !== null) {
                    thisInputRadio.click();
                  }
                }}>
                  <input onChange={ () => {
                    const newS = this.state.fields.slice();
                    const ind = checkInArOfObjByKeyAndVal(newS, `qid`, el.qid);
                    newS[ind].value = el2;
                    this.setState({fields: newS});
                  }}
                  type='radio'
                  name={`${formIdname}:q${el.qid}`}
                  id={`inpAnswer${in2}:${answersMap[el2]}:${el2}:${el.qid}`}
                  />
                  <label htmlFor={`inpAnswer${in2}:${answersMap[el2]}:${el2}:${el.qid}`}>{answersMap[el2].value}
                  </label></div>
                </React.Fragment>;
              })}
            </div><br/>
          </React.Fragment>;
        })}
      </React.Fragment>;
    }
    changeValue(e, index) {
      const newS = this.state.fields.slice();
      newS[index].value = e.target.value;
      this.setState({fields: newS});
    }
    getFields() {
      const {needCheck} = this.props;
      if (needCheck === true) {
        const checked = WithForm.getCheckedFields(this.state.fields);
        const withError = WithForm.getErrorsInCheck(checked);
        // console.log(`now from getFields() checked.l = ${checked.length}, error: ${withError.length}`);
        // fakeCallback(withError, formIdname);
        coloredArByName(withError);
        return checked;
      }
      return this.state.fields;
    }
    render() {
      const {props} = this;
      const {formClassname, formIdname, needFormTag} = props;
      if (needFormTag === false) {
        return <ComponentIn
          {...props}
          renderForm={(callback) => {
            return this.renderForm(callback);
          }}
          renderBySchema={(callback, nowAnkid) => {
            return this.renderBySchema(callback, nowAnkid);
          }}
          getFields={() => {
            return this.getFields();
          }}
        />;
      }
      return <form className={formClassname === undefined ? `` : formClassname} id={formIdname === undefined ? `` : formIdname}
        onSubmit={(e) => {
          e.preventDefault();
          this.callback(this.state.fields);
        }}>
        <ComponentIn
          {...props}
          renderForm={(callback) => {
            return this.renderForm(callback);
          }}
          renderBySchema={(callback, nowAnkid) => {
            return this.renderBySchema(callback, nowAnkid);
          }}
          getFields={() => {
            return this.getFields();
          }}
        />
      </form>;
    }
  }
  WithForm.propTypes = {
    fields: PropTypes.array.isRequired,
    formIdname: PropTypes.string.isRequired,
    schema: PropTypes.array,
    answers: PropTypes.array,
    formClassname: PropTypes.string,
    customSubmit: PropTypes.bool,
    needCheck: PropTypes.bool,
    needFormTag: PropTypes.bool,
  };
  return WithForm;
};
export default withForm;
