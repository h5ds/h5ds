/**
 * @desc 加载资源的方法
 */
export class LoadSource {
  constructor(sources) {
    this.progress = null;
    this.manifest = this.setSource(sources);
    this.sources = sources;
  }

  /**
   * @desc 图片预加载
   * @param 预加载src
   */
  imgLazy(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = function() {
        resolve(img);
      };
      img.onerror = function() {
        console.error('图片加载失败', img);
        reject(img);
      };
    });
  }

  /**
   * @desc 音乐预加载
   */
  soundLazy(src) {
    return new Promise((resolve, reject) => {
      const audio = new Audio(src);
      audio.onloadedmetadata = () => {
        resolve(audio);
      };
      audio.onerror = () => {
        console.error('sound加载失败', src);
        reject(src);
      };
      audio.src = src;
    });
  }

  /**
   * @desc js预加载
   */
  jsLazy(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.charset = 'utf-8';
      script.src = src;
      document.head.appendChild(script);
      script.onload = () => {
        resolve(script);
      };
      script.onerror = () => {
        console.error('js加载失败', src);
        reject(src);
      };
    });
  }

  /**
   * @desc 开始执行载入
   * @return promise
   */
  load() {
    const sources = this.manifest;
    return new Promise(async (resolve, reject) => {
      const error = [];
      const success = [];
      for (let i = 0; i < sources.length; i++) {
        let { src, id, type } = sources[i];
        switch (type) {
          case 'image':
            await this.imgLazy(src)
              .then(() => {
                success.push({ src, id, type });
                this.progress && this.progress({ src, id, type, success: true, loaded: (i + 1) / sources.length });
              })
              .catch(() => {
                error.push({ src, id, type });
                this.progress && this.progress({ src, id, type, success: false, loaded: (i + 1) / sources.length });
              });
            break;
          case 'js':
            await this.jsLazy(src)
              .then(() => {
                success.push({ src, id, type });
                this.progress && this.progress({ src, id, type, success: true, loaded: (i + 1) / sources.length });
              })
              .catch(() => {
                error.push({ src, id, type });
                this.progress && this.progress({ src, id, type, success: false, loaded: (i + 1) / sources.length });
              });
            break;
          case 'sound':
            await this.soundLazy(src)
              .then(() => {
                success.push({ src, id, type });
                this.progress && this.progress({ src, id, type, success: true, loaded: (i + 1) / sources.length });
              })
              .catch(() => {
                error.push({ src, id, type });
                this.progress && this.progress({ src, id, type, success: false, loaded: (i + 1) / sources.length });
              });
            break;
        }
      }
      this.complete && this.complete({ error, success });
      if (success.length === sources.length) {
        this.success && this.success();
        resolve({ error, success });
      } else {
        this.error && this.error();
        reject({ error, success });
      }
    });
  }

  /**
   * @desc 事件绑定
   */
  on(eventName, func) {
    switch (eventName) {
      case 'progress':
        this.progress = func;
        break;
      case 'error':
        this.error = func;
        break;
      case 'complete':
        this.complete = func;
        break;
      case 'success':
        this.success = func;
        break;
    }
  }

  /**
   * @desc 设置需要载入的数据
   */
  setSource(sources) {
    if (!sources) {
      return;
    }
    // const temp = util.randomID();
    const manifest = sources.map((d, i) => {
      let type = '*';
      let suffix = d.replace(/.+\.(.+)/, '$1');
      if (['jpg', 'gif', 'png', 'jpeg'].indexOf(suffix) !== -1) {
        type = 'image';
      } else if (['mp3', 'wav', 'ogg', 'acc', 'webm'].indexOf(suffix) !== -1) {
        type = 'sound';
      } else if (['js', 'es'].indexOf(suffix) !== -1) {
        type = 'js';
      }
      return {
        src: d,
        id: 'source_' + i,
        type
      };
    });
    this.manifest = manifest;
    return manifest;
  }
}
