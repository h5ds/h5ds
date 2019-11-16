const config = {
  appType: 'phone',
  version: '5.0.0', // packages.version, // 版本号
  appWidth: 320,
  appHeight: 514,
  canvasScale: 1
};

const setConfig = type => {
  config.appType = type;
  switch (type) {
    case 'phone':
      {
        config.appWidth = 320;
        config.appHeight = 514;
      }
      break;
    case 'pc':
      {
        config.appWidth = 800;
        config.appHeight = 600;
      }
      break;
    case 'ppt':
      {
        config.appWidth = 1280; // scale = 1.5
        config.appHeight = 720;
        config.canvasScale = (window.innerWidth - 700) / 1280; // 140 + 350 + 10 + 200
      }
      break;
    case 'horizontal-phone':
      {
        config.appWidth = 514;
        config.appHeight = 320;
      }
      break;
  }
};

export { config, setConfig };
