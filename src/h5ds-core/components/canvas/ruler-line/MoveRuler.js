import React, { Component } from 'react';

export default class MoveRuler extends Component {
  state = {
    left: 0,
    top: 0
  };

  componentDidMount() {
    $('.h5ds-center').on('mousemove', e => {
      this.setState({
        left: e.pageX - 140,
        top: e.pageY - 60
      });
    });
  }

  componentWillUnmount() {
    $('.h5ds-center').off('mousemove');
  }

  render() {
    return (
      <React.Fragment>
        <span className="h5ds-ruler-span-x" style={{ height: this.props.lineWidth, left: this.state.left }} />
        <span className="h5ds-ruler-span-y" style={{ width: this.props.lineWidth, top: this.state.top }} />
      </React.Fragment>
    );
  }
}
