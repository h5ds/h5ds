import { fontFamilyData } from './fontFamily';
import { message } from 'antd';

// 加载字体
export const loadFont = name => {
  return new Promise((resolve, reject) => {
    let { url } = fontFamilyData.find(d => d.name === name) || {};
    // const { style } = this.state;
    if (url) {
      let xhr = new XMLHttpRequest();
      xhr.open('get', url);
      xhr.responseType = 'blob';
      xhr.onprogress = e => {
        if (e.lengthComputable) {
          let percentComplete = e.loaded / e.total;
          console.log('文字已经加载：', percentComplete);
        }
      };
      xhr.onload = e => {
        // console.log('onload 文字', e.target, name);
        //加载成功！
        if (e.target.status == 200) {
          resolve(name);
        }
      };
      xhr.ontimeout = () => {
        message.error('请求超时！');
        reject(false);
      };
      xhr.send();
    } else {
      //设置字体
      resolve(name);
    }
  });
};
