// api 请求服务器
const DEV_API = 'http://api.com/v1/api/';
const PRO_API = 'http://api.com/v1/api/';
const debug = false;

let apiUrl = DEV_API;
if (process.env.NODE_ENV !== 'development') {
  apiUrl = PRO_API;
}

export { apiUrl, debug };
