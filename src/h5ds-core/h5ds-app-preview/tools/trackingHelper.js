import urlparse from 'url-parse';
class TrackingHelper {
  constructor() {
    this.baseData = {};
    this.reportUrl = location.href; // 默认记录当前的url
  }

  setReportUrl(apiHost) {
    this.reportUrl = apiHost;
  }

  setUid(uid) {
    this.reportUrl.uid = uid;
  }

  setAppId(appId) {
    this.baseData.appId = appId;
  }

  doReport(url, data) {
    if (!url) {
      throw new Error('请设置上报地址');
    }
    data = Object.assign({}, data, this._getBaseData(), this.baseData);
    // 优先使用sendBeacon
    if (window.navigator.sendBeacon) {
      this._doReportBySendBeacon(url, data);
    } else {
      this._doReportByImg(url, data);
    }
  }

  _data2QueryString(data) {
    const urlObj = urlparse('');
    urlObj.set('query', data);
    return urlObj.href.split('?')[1];
  }

  _getBaseData() {
    return {
      nl: navigator.language,
      np: navigator.platform,
      nje: navigator.javaEnabled(),
      nmtp: navigator.maxTouchPoints,
      nce: navigator.cookieEnabled,
      nd: navigator.doNotTrack,
      ndm: navigator.deviceMemory,
      ndc: navigator.hardwareConcurrency,
      sr: `${screen.width}*${screen.height}`,
      scd: screen.colorDepth,
      dc: document.charset || document.characterSet,
      dr: document.referrer,
      t: Date.now()
    };
  }

  _makeRndString() {
    return Math.random().toString(16);
  }

  _doReportByImg(url, data) {
    const imgUrl = `${url}?${this._data2QueryString(data)}`;
    const rndKey = `report_img_${this._makeRndString()}`;
    // 为什么要挂载到全局对象上？避免遇到GC，导致发送失败
    const img = (window[rndKey] = new Image());
    img.onload = img.onerror = function() {
      window[rndKey] = null; // 手动清理
    };
    img.src = imgUrl;
  }

  _doReportBySendBeacon(url, data) {
    const formData = new FormData();
    Object.keys(data).forEach(k => formData.append(k, data[k]));
    window.navigator.sendBeacon(url, formData);
  }

  sendPageView() {
    const path = location.pathname;
    this.doReport(this.reportUrl, { path });
  }
}

export const trackingHelper = new TrackingHelper();
