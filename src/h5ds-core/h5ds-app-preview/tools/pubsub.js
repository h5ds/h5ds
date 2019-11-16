/**
 * 发布/订阅模式
 * pubsub.js 必须在require.js 之前载入
 */
import PubSub from 'PubSub';

if(!window.pubSubLayer) {
  window.pubSubLayer = new PubSub();
  window.pubSubLayer.publish = window.pubSubLayer.publishSync;
}
const pubsubEvent = window.pubSubLayer;

export { pubsubEvent };
