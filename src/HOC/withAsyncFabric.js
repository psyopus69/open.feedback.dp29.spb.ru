//  add method renderAllData, expect tableShema && api in props for set this component
//  callback in method did after rerender child component, so...
//  main method make axios requests for tablesSchema & when all done, set all in this.state
import React, {Component} from "react";
import {PropTypes} from "prop-types";

const withAsyncFabric = (ComponentIn) => {
  class WithAsyncFabric extends Component {
    constructor(props) {
      super(props);
      this.props = props;
      this.state = {
        tables: [],
      };
      this.doneCollectCounter = 0;
      this.doneCollectCounterS = props.tablesSchema.length;
      this.prepareState = [];
    }
    checkCollect() {
      const {doneCollectCounter, doneCollectCounterS} = this;
      if (doneCollectCounter === doneCollectCounterS) {
        this.setState({
          tables: this.prepareState,
        });
      }
    }
    getMainState() {
      const {api, params, tablesSchema} = this.props;
      for (let i = 0; i < tablesSchema.length; i++) {
        const ax = api({
          sql: tablesSchema[i].sql,
          params,
        });
        ax.get(``)
          .then((resp) => {
            this.prepareState.push({
              name: tablesSchema[i].name,
              data: resp.data,
            });
            this.doneCollectCounter++;
            this.checkCollect();
          });
      }
    }
    renderData(callback) {
      const {tables} = this.state;
      return callback(tables);
    }
    componentDidMount() {
      this.getMainState();
    }
    render() {
      const {props} = this;
      return <React.Fragment>
        <ComponentIn
          {...props}
          renderAllData={(callback) => {
            return this.renderData(callback);
          }}
          getAllData={() => {
            return this.state.tables;
          }}
        />
      </React.Fragment>;
    }
  }
  WithAsyncFabric.propTypes = {
    tablesSchema: PropTypes.array.isRequired,
    api: PropTypes.func.isRequired,
    params: PropTypes.string,
  };
  return WithAsyncFabric;
};
export default withAsyncFabric;
