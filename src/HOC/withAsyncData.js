//  add prop getData(), setMethod({} for ax then), startGetData(callback)
//  method startGetData(callback) need for end of dwl & connect component after setState (callback will be done after rerender component, so ...).
//  main method - getData - return this.state, which reSet after startGetData();
import React, {Component} from "react";
import {PropTypes} from "prop-types";
import staticFunctions from "../FUNC/staticFunc";
import {api} from "../API/api";

const {compareArrays} = staticFunctions;
const withAsyncData = (ComponentIn) => {
  class WithAsyncData extends Component {
    constructor(props) {
      super(props);
      this.props = props;
      this.state = {
        data: [],
      };
    }
    componentDidMount() {
      const {autostart, method, callback} = this.props;
      if (autostart === true) {
        if (method !== undefined) {
          this.method = method;
          this.startGetData(callback);
        } else {
          // eslint-disable-next-line no-console
          console.log(`set method before startGetData!`);
        }
      }
    }
    setMethod(obj) {
      this.method = obj;
    }
    startGetData(callback) {
      const {data} = this.state;
      if (this.method !== undefined) {
        const ax = api({
          sql: this.method.sql,
          params: this.method.params,
        });
        ax.get(``)
          .then((resp) => {
            if (!compareArrays(data, resp.data)) {
              this.setState({
                data: resp.data,
              }, () => {
                if (callback !== undefined) {
                  callback(this.state.data);
                }
              });
            }
          });
      } else {
        // eslint-disable-next-line no-console
        console.log(`set method previously getData() !!!`);
      }
    }
    getData() {
      return this.state.data;
    }
    render() {
      const {props} = this;
      return <ComponentIn
        {...props}
        setMethod={(obj) => {
          this.setMethod(obj);
        }}
        startGetData={(callback) => {
          this.startGetData(callback);
        }}
        getData={() => {
          return this.getData();
        }}
      />;
    }
  }
  WithAsyncData.propTypes = {
    autostart: PropTypes.bool,
    method: PropTypes.object,
    callback: PropTypes.func,
  };
  return WithAsyncData;
};
export default withAsyncData;
