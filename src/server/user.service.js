import BasicService from './BasicService';
import { storage } from '../utils';
/**
 * @desc 测试用
 */
class UserService extends BasicService {
  constructor() {
    super();
    // 保存token
    const token = storage.get('x-token');
    if (token) {
      this.setToken(token);
    }
  }

  // 注册
  async register(params) {
    const { data } = this.post(`/user/register`, params);
    return data;
  }

  // 登录
  async login(params) {
    const { data } = this.post(`/user/login`, params);
    return data;
  }

  // 退出登录
  async logout() {
    const { data } = this.get(`/user/logout`);
    return data;
  }

  // 获取用户信息
  async getUserInfo() {
    const { data } = await this.get(`/user/userinfo`);
    return data;
  }

  // 通过token获取用户信息，debug=true的时候使用的方法
  async getUserInfoByToken(token = '123456') {
    const { data } = await this.get(`/user/userinfo/${token}`);
    return data;
  }
}

export const userService = new UserService();
