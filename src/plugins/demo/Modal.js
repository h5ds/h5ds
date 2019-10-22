import { Button, Modal } from 'antd';
import React, { Component } from 'react';

export default class ModalBox extends Component {
  state = {
    visible: false
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleClick = () => {
    alert('看console');
    const layer = this.props.h5ds.getLayer();
    console.log(this.props, JSON.parse(JSON.stringify(layer)));
  };

  componentDidMount() {
    if (!window.pubSubInstance) {
      window.pubSubInstance = new window.PubSub();
    }
    window.pubSubInstance.subscribe('demo.show.modal', () => {
      this.setState({ visible: true });
    });
    window.pubSubInstance.subscribe('demo.hide.modal', () => {
      this.setState({ visible: false });
    });
  }

  componentWillUnmount() {
    window.pubSubInstance.unsubscribe('demo.show.modal');
    window.pubSubInstance.unsubscribe('demo.hide.modal');
  }

  render() {
    return (
      <Modal title="Basic Modal" visible={this.state.visible} onCancel={this.handleCancel}>
        <p>
          <Button onClick={this.handleClick}>点我啊</Button>
        </p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    );
  }
}
