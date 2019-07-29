const config = {
  pluginsHost: 'http://localhost:9999', // 插件加载地址
  publishHost: `http://localhost:8888`, // 发布应用的地址
  debug: true // 如果是 debug模式，basic 123456
};

if (process.env.NODE_ENV === 'production') {
  config.pluginsHost = 'http://localhost:7000'; // 去这个域名下面加载插件
  config.publishHost = 'http://localhost:7000/apps'; // 预览的时候调用这个
}

export { config };
