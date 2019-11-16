import './style.less';

import React, { PureComponent } from 'react';

export class Artword extends PureComponent {
  /**
   * @desc 获取 background, backgroundClip 样式，给span设置上
   */
  getSpanStyle = style => {
    const styl = [];
    const keyName = {
      background: 'background',
      backgroundClip: '-webkit-background-clip',
      color: 'color',
      textFillColor: '-webkit-text-fill-color',
      textStroke: 'text-stroke',
      opacity: 'opacity',
      textShadow: 'text-shadow',
      backgroundImage: 'background-image',
      top: 'top',
      left: 'left',
      zIndex: 'z-index'
    };
    for (let key in style) {
      if (keyName[key]) {
        styl.push(`${keyName[key]}: ${style[key]}`);
      }
    }
    return styl.join(';'); // styl;
  };

  /**
   * @desc 获取艺术字样式
   */
  getStyle = (type, colors, size) => {
    const upStyle = {};
    const downStyle = {};
    let otherStyle = null;
    switch (type) {
      case 'border':
        upStyle.color = colors[0];
        upStyle.textFillColor = `${size}px ${colors[0]}`;
        upStyle.WebkitTextFillColor = `${size}px ${colors[0]}`;
        downStyle.textStroke = `${size}px ${colors[1]}`;
        downStyle.WebkitTextStroke = `${size}px ${colors[1]}`;
        break;
      case '3d':
        upStyle.color = colors[0];
        upStyle.textFillColor = `${size}px ${colors[0]}`;
        upStyle.WebkitTextFillColor = `${size}px ${colors[0]}`;
        downStyle.color = colors[0];
        downStyle.textShadow = new Array(size)
          .fill(1)
          .map((d, i) => {
            if (i + 1 < size) {
              return `0px ${i + 1}px 0px ${colors[1]}`;
            } else {
              return `0px ${size}px ${size}px ${colors[1]}`;
            }
          })
          .join(',');
        break;
      case 'kaTong':
        upStyle.color = colors[0];
        upStyle.background = `url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAHklEQVQImWNkYGBgYGD4//8/A5wF5SBYyAr+//8PAPOCFO0Q2zq7AAAAAElFTkSuQmCC) repeat`;
        upStyle.textShadow = `${size / 2}px -${size / 2}px ${colors[0]}, ${size / 2}px -${size / 2}px white`;
        upStyle.textFillColor = `transparent`;
        upStyle.WebkitTextFillColor = `transparent`;
        upStyle.backgroundClip = `text`;
        upStyle.WebkitBackgroundClip = `text`;
        downStyle.opacity = 0;
        break;
      case 'jiaXin':
        upStyle.color = colors[0];
        upStyle.textFillColor = `${size}px ${colors[0]}`;
        upStyle.WebkitTextFillColor = `${size}px ${colors[0]}`;
        downStyle.textStroke = `${size}px ${colors[1]}`;
        downStyle.WebkitTextStroke = `${size}px ${colors[1]}`;
        otherStyle = {
          zIndex: 99,
          textStroke: `${size + size / 2}px ${colors[0]}`,
          WebkitTextStroke: `${size + size / 2}px ${colors[0]}`
        };
        break;
      case 'yinYing':
        upStyle.color = colors[0];
        upStyle.textShadow = `0px ${size / 2}px ${size / 2}px ${colors[1]}`;
        downStyle.opacity = 0;
        break;
      case 'niHong':
        upStyle.textStroke = `1px ${colors[0]}`;
        upStyle.WebkitTextStroke = `1px ${colors[0]}`;
        upStyle.color = 'transparent';
        downStyle.color = 'transparent';
        downStyle.textShadow = `0px 0px ${size}px ${colors[0]}`;
        break;
      case 'cuoJue':
        upStyle.left = 0;
        upStyle.backgroundClip = 'text';
        upStyle.WebkitBackgroundClip = 'text';
        upStyle.textFillColor = 'transparent';
        upStyle.WebkitTextFillColor = 'transparent';
        upStyle.backgroundImage = `linear-gradient(0deg, ${colors[1]} 50%, rgba(255, 255, 255, 0) 50%)`;
        downStyle.left = -2;
        downStyle.backgroundClip = 'text';
        downStyle.WebkitBackgroundClip = 'text';
        downStyle.textFillColor = 'transparent';
        downStyle.WebkitTextFillColor = 'transparent';
        downStyle.backgroundImage = `linear-gradient(0deg, ${colors[2]} 100%, rgba(255, 255, 255, 0) 50%)`;
        otherStyle = {
          zIndex: 201,
          left: 2,
          color: colors[0]
        };
        break;
      case 'jianBian':
        upStyle.left = 0;
        upStyle.backgroundClip = 'text';
        upStyle.WebkitBackgroundClip = 'text';
        upStyle.textFillColor = 'transparent';
        upStyle.WebkitTextFillColor = 'transparent';
        upStyle.backgroundImage = `linear-gradient(0deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`;
        downStyle.opacity = 0;
        break;
      case 'qieGe':
        upStyle.backgroundClip = 'text';
        upStyle.WebkitBackgroundClip = 'text';
        upStyle.textFillColor = 'transparent';
        upStyle.WebkitTextFillColor = 'transparent';
        upStyle.backgroundImage = `linear-gradient(0deg, ${colors[0]} 50%, rgba(255, 255, 255, 0) 50%)`;
        downStyle.backgroundClip = 'text';
        downStyle.WebkitBackgroundClip = 'text';
        downStyle.textFillColor = 'transparent';
        downStyle.WebkitTextFillColor = 'transparent';
        downStyle.backgroundImage = `linear-gradient(0deg, ${colors[1]} 100%, rgba(255, 255, 255, 0) 50%)`;
        break;
      case 'fire':
        upStyle.color = colors[0];
        downStyle.opacity = 0;
        break;
      case 'snow':
        upStyle.textFillColor = colors[0];
        upStyle.textFillColor = colors[0];
        upStyle.WebkitTextFillColor = colors[0];
        downStyle.color = '#fff';
        downStyle.textShadow = `${colors[1]} 0px ${size / 2}px ${size / 2}px`;
        downStyle.textStroke = `${size / 2}px ${colors[1]}`;
        downStyle.WebkitTextStroke = `${size / 2}px ${colors[1]}`;
        otherStyle = {
          zIndex: 201,
          background: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAeCAYAAAARgF8NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDOEJGMEM5MDMwRUYxMUU5OUU1QkJFMjJGQjU2M0JBMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDOEJGMEM5MTMwRUYxMUU5OUU1QkJFMjJGQjU2M0JBMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM4QkYwQzhFMzBFRjExRTk5RTVCQkUyMkZCNTYzQkEzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkM4QkYwQzhGMzBFRjExRTk5RTVCQkUyMkZCNTYzQkEzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+PM6S9AAAAFlJREFUeNpi/P///1cGBgYuIP4FxGwMEABjf2MEKvjPgAcwMRAAowqGm4JveOTBCQbEwJVoGCl3AwtSImVAS7QQO9DSLIzDSLIVDOg6aRfU/9EDjXJHAgQYAOqPGQ3i3HYXAAAAAElFTkSuQmCC) repeat-x`,
          textFillColor: 'transparent',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text'
        };
        break;
      case 'louKong':
        upStyle.top = -size / 2;
        upStyle.left = size / 2;
        upStyle.textStroke = `1px ${colors[1]}`;
        upStyle.WebkitTextStroke = `1px ${colors[1]}`;
        upStyle.textFillColor = `transparent`;
        upStyle.WebkitTextFillColor = `transparent`;
        downStyle.color = colors[0];
        break;
    }

    return { upStyle, downStyle, otherStyle };
  };

  render() {
    const { type, size = 10, colors = ['#000'], style = {}, shtml } = this.props;
    const cName = ['h5ds-artword', 'h5ds-artword-' + type];
    const { upStyle, downStyle, otherStyle } = this.getStyle(type, colors, size);

    if (!type) {
      return <div style={style} className={cName.join(' ')} dangerouslySetInnerHTML={{ __html: shtml }} />;
    }

    // 判断是否有dangerouslySetInnerHTML参数，这个是项目中使用的
    if (shtml) {
      return (
        <div style={style} className={cName.join(' ')}>
          <div
            style={upStyle}
            className="h5ds-artword-up"
            dangerouslySetInnerHTML={{
              __html: shtml
            }}
          />
          <div
            style={downStyle}
            className="h5ds-artword-down"
            dangerouslySetInnerHTML={{
              __html: shtml
            }}
          />
          {otherStyle ? (
            <div
              style={otherStyle}
              className="h5ds-artword-up"
              dangerouslySetInnerHTML={{
                __html: shtml
              }}
            />
          ) : null}
        </div>
      );
    } else {
      // 该方法未在项目中使用
      return (
        <div style={style} className={cName.join(' ')}>
          <div style={upStyle} className="h5ds-artword-up">
            {this.props.children}
          </div>
          <div style={downStyle} className="h5ds-artword-down">
            {this.props.children}
          </div>
          {otherStyle ? (
            <div style={otherStyle} className="h5ds-artword-up">
              {this.props.children}
            </div>
          ) : null}
        </div>
      );
    }
  }
}
