class AppUtil {
  getPid(layers, pids) {
    if (!layers) {
      return;
    }
    layers.forEach(layer => {
      pids.push(layer.pid);
      if (layer.pid === 'h5ds_combin') {
        this.getPid(layer.data, pids);
      }
    });
  }

  /**
   * 通过pageData获取pid
   */
  getPidByPageData(data) {
    let pids = [];
    this.getPid(data.layers, pids);
    pids = Array.from(new Set(pids));
    // 去掉默认的
    pids = pids.filter(d => !['h5ds_combin', 'h5ds_img', 'h5ds_shape', 'h5ds_sound', 'h5ds_text'].includes(d));
    return pids.filter(d => d);
  }

  // 通过数据，获取当前使用了哪些插件
  getPidByData(data) {
    let pids = [];
    const { pages = [], fixeds = [], popups = [] } = data;

    [...pages, ...fixeds, ...popups].forEach(page => {
      this.getPid(page.layers, pids);
    });
    pids = Array.from(new Set(pids));
    // 去掉默认的
    pids = pids.filter(d => !['h5ds_combin', 'h5ds_img', 'h5ds_shape', 'h5ds_sound', 'h5ds_text'].includes(d));

    return pids.filter(d => d);
  }
}

export const appUtil = new AppUtil();
