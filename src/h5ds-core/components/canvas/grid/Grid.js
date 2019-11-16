import './grid.less';

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('h5ds')
@observer
class Grid extends Component {
  state = {
    show: false
  };

  componentDidMount() {
    window.pubSubEditor.subscribe('h5ds.show.grid', () => {
      this.setState({ show: !this.state.show });
    });
  }

  componentWillUnmount() {
    window.pubSubEditor.unsubscribe('h5ds.show.grid');
  }

  render() {
    const { show } = this.state;
    const { width, height } = this.props;
    const { gridSize, gridAdsorb } = this.props.h5ds.edata;
    const cName = ['h5ds-grid', 'h5ds-js-grid'];
    if (show) {
      cName.push('h5ds-grid-show');
    }
    return (
      <div className={cName.join(' ')} data-adsorb={gridAdsorb} data-size={gridSize}>
        <ul className="h5ds-grid-row">
          {Array(Math.ceil(parseInt(height, 10) / gridSize))
            .fill(1)
            .map((elem, index) => {
              return (
                <li
                  key={index}
                  style={{
                    top: gridSize * index
                  }}
                />
              );
            })}
        </ul>
        <ul className="h5ds-grid-col">
          {Array(Math.ceil(parseInt(width, 10) / gridSize))
            .fill(1)
            .map((elem, index) => {
              return (
                <li
                  key={index}
                  style={{
                    left: gridSize * index
                  }}
                />
              );
            })}
        </ul>
      </div>
    );
  }
}

export default Grid;
