import React, {PureComponent} from "react";
import {PropTypes} from "prop-types";

const withCustomState = (Component) => {
  class WithState extends PureComponent {
    constructor(props) {
      super(props);
      this.props = props;
      this.state = {
        stateF: props.initState === undefined ? -1 : props.initState,
      };
    }
    setStateCustom(value, callback) {
      this.setState({
        stateF: value,
      }, () => {
        if (callback !== undefined) {
          callback(this.state.stateF);
        }
      });
    }
    render() {
      const {stateF} = this.state;
      return <Component
        {...this.props}
        getStateCustom={() => {
          return stateF;
        }}
        setStateCustom={(value, calback) => {
          this.setStateCustom(value, calback);
        }}
      />;
    }
  }
  WithState.propTypes = {
    initState: PropTypes.object,
  };
  return WithState;
};

export default withCustomState;
