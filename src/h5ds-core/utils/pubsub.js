/**
 * 发布/订阅模式
 * pubsub.js 必须在require.js 之前载入
 */
import PubSub from 'PubSub';

// 只初始化一次
if (!window.pubSubEditor) {
  window.pubSubEditor = new PubSub();
  // 全部采用同步事件处理
  window.pubSubEditor.publish = window.pubSubEditor.publishSync;
}
const pubsubEvent = window.pubSubEditor;

export { pubsubEvent };
