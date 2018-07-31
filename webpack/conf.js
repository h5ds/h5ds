import path from "path";

export const dist = "../dist"; // 打包目录
export const src = "../src"; // 源码目录
export const version = '4.0.0'; //  版本号
export const resolve = function(url) {
  return path.resolve(__dirname, url);
};
