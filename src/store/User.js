import { action, observable, transaction } from 'mobx';
import { storage, util } from '../utils';

import { debug } from '../config';
import { userService } from '../server/index';

export default class User {
  // app 数据
  @observable
  info = storage.get('x-user-info');

  @observable
  token = storage.get('x-token');

  @action
  setUserInfo = async data => {
    transaction(() => {
      storage.set('x-user-info', data);
      storage.set('x-token', data.token);
      this.info = data;
      this.token = data.token;
    });
  };

  @action
  clearUserInfo = () => {
    transaction(() => {
      storage.clear();
      this.info = null;
      this.token = null;
    });
  };

  // 在 debug 模式下，默认token是 123456.如果url传入了token参数，就获取url的token
  @action
  getUserInfo = async () => {
    if (!this.info && debug) {
      const data = await userService.getUserInfoByToken(util.getUrlQuery('token'));
      this.setUserInfo(data);
    }
    return this.info;
  };

  @action
  isLogin = () => {
    return this.token ? true : false;
  };
}
