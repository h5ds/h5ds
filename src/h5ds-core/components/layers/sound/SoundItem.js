import React, { Component } from 'react';

class SoundItem extends Component {
  render() {
    const { data, onClick, isSelectSound, playMusic } = this.props;
    const name = data.name;
    return (
      <li onClick={onClick}>
        {name ? (
          <span className="name" title={name}>
            <span className={'mp3-play-icon' + (isSelectSound ? ' mp3-play-iconing' : '')}>
              <i />
              <i />
              <i />
              <i />
            </span>
            <span>{name}</span>
          </span>
        ) : null}
        <span className="try" onClick={playMusic}>
          {isSelectSound ? '暂停' : '播放'}
        </span>
      </li>
    );
  }
}

export default SoundItem;
